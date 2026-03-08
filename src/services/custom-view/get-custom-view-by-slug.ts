import db from '@/lib/db';
import { CustomViewResponse } from '@/types/custom-view';

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

  return customView as unknown as CustomViewResponse;
}
