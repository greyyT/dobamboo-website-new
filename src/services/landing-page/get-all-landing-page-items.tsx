import db from '@/lib/db';
import { LandingPageItemData } from '@/types/landing-page-item-data';

export async function getAllLandingPageItems(): Promise<LandingPageItemData[]> {
  'use cache';

  return (await db.landingPageView.findMany({
    orderBy: {
      order: 'asc',
    },
  })) as LandingPageItemData[];
}
