import { Prisma } from '@prisma/client';

import db from '@/lib/db';
import { CustomLayoutItemData, CustomLayoutItemType, CustomViewResponse } from '@/types/custom-view';

type CustomViewWithItems = Prisma.CustomViewGetPayload<{
  include: {
    items: {
      include: { translations: true };
    };
  };
}>;

function mapToCustomViewResponse(view: CustomViewWithItems): CustomViewResponse {
  return {
    id: view.id,
    slug: view.slug,
    createdAt: view.createdAt.toISOString(),
    updatedAt: view.updatedAt.toISOString(),
    items: view.items.map(item => ({
      id: item.id,
      type: item.type as CustomLayoutItemType,
      order: item.order,
      translations: item.translations.map(t => ({
        id: t.id,
        locale: t.locale,
        data: t.data as unknown as CustomLayoutItemData,
      })),
    })),
  };
}

export default async function getCustomViewBySlug(slug: string): Promise<CustomViewResponse | null> {
  'use cache';

  const customView = await db.customView.findUnique({
    where: { slug },
    include: {
      items: {
        orderBy: { order: 'asc' },
        include: { translations: true },
      },
    },
  });

  if (!customView) return null;

  return mapToCustomViewResponse(customView);
}
