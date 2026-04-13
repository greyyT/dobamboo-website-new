import { Language, View } from '@prisma/client';

import db from '@/lib/db';
import { LandingPageItemData, LandingPageType } from '@/types/landing-page-item-data';

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function applyNavigationIntlToData(data: unknown, navigationIntl: unknown) {
  if (!Array.isArray(data)) return data;
  if (!isRecord(navigationIntl)) return data;

  return data.map((item, idx) => {
    const intlValue = navigationIntl[String(idx)];
    if (typeof intlValue !== 'string' || intlValue.trim() === '') return item;

    if (isRecord(item)) {
      return {
        ...item,
        imageUrl: intlValue,
      };
    }

    return {
      imageUrl: intlValue,
    };
  });
}

export async function getAllLandingPageItems(locale: string): Promise<LandingPageItemData[]> {
  'use cache';

  const landingPageItems = await db.landingPageView.findMany({
    orderBy: {
      order: 'asc',
    },
  });

  const navigationItemIds = landingPageItems
    .filter(item => item.type === LandingPageType.NAVIGATION)
    .map(item => item.id);

  if (!navigationItemIds.length) {
    return landingPageItems as LandingPageItemData[];
  }

  const intlItems = await db.intl.findMany({
    where: {
      key: { in: navigationItemIds },
      view: View.LANDING_PAGE,
      locale: locale.toUpperCase() as Language,
    },
  });

  const intlByKey = intlItems.reduce<Record<string, unknown>>((acc, intl) => {
    const value = intl.value as unknown;
    if (!isRecord(value)) return acc;
    const scoped = value[intl.key];
    if (scoped !== undefined) {
      acc[intl.key] = scoped;
    }
    return acc;
  }, {});

  const itemsWithIntl = landingPageItems.map(item => {
    if (item.type !== LandingPageType.NAVIGATION) return item;

    const navigationIntl = intlByKey[item.id];
    const mergedData = applyNavigationIntlToData(item.data as unknown, navigationIntl);

    return {
      ...item,
      data: mergedData,
    };
  });

  return itemsWithIntl as LandingPageItemData[];
}
