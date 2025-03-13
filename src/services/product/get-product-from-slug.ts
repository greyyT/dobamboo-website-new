import { Language } from '@prisma/client';

import Intl from '@/constants/intl';
import db from '@/lib/db';
import { IProductWithTranslation } from '@/types/product';

export default async function getProductFromSlug(slug: string, locale: Intl): Promise<IProductWithTranslation | null> {
  'use cache';

  const product = await db.product.findUnique({
    where: {
      slug,
      translations: {
        some: {
          locale: locale.toUpperCase() as Language,
        },
      },
    },
    include: {
      translations: {
        where: {
          locale: locale.toUpperCase() as Language,
        },
      },
    },
  });

  return product;
}
