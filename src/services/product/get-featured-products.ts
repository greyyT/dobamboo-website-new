import { Language, Product, ProductTranslation } from '@prisma/client';

import db from '@/lib/db';

export default async function getFeaturedProducts(
  locale: string,
): Promise<(Product & { translations: ProductTranslation[] })[]> {
  'use cache';

  return await db.product.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      translations: {
        where: {
          locale: locale.toUpperCase() as Language,
        },
      },
    },
  });
}
