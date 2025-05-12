import { Language, Product, ProductTranslation } from '@prisma/client';

import db from '@/lib/db';

export default async function getNewProducts(
  locale: string,
): Promise<(Product & { translations: ProductTranslation[] })[]> {
  'use cache';

  return await db.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      translations: {
        where: {
          locale: locale.toUpperCase() as Language,
        },
      },
    },
    take: 8,
  });
}
