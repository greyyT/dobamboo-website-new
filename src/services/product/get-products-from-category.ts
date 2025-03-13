import { Category, Language } from '@prisma/client';

import Intl from '@/constants/intl';
import { DEFAULT_ITEMS_PER_PAGE } from '@/constants/pagination';
import db from '@/lib/db';
import { CategoryWithSubcategories } from '@/types/category';
import { IProductApiResponse } from '@/types/product';

function checkIsMainCategory(category: CategoryWithSubcategories | Category): category is CategoryWithSubcategories {
  return (category as CategoryWithSubcategories).children !== undefined;
}

export default async function getProductsFromCategory(
  category: CategoryWithSubcategories | Category | null,
  locale: Intl,
): Promise<IProductApiResponse> {
  'use cache';
  const categoryIds = category
    ? [category.id, ...(checkIsMainCategory(category) ? category.children.map(c => c.id) : [])]
    : undefined;

  const products = await db.product.findMany({
    where: {
      translations: {
        some: {
          locale: locale.toUpperCase() as Language,
        },
      },
      ...(category && {
        categoryId: {
          in: categoryIds,
        },
      }),
    },
    include: {
      translations: {
        where: {
          locale: locale.toUpperCase() as Language,
        },
      },
    },
    take: DEFAULT_ITEMS_PER_PAGE,
  });

  const totalProducts = await db.product.count({
    where: {
      translations: {
        some: {
          locale: locale.toUpperCase() as Language,
        },
      },
      ...(category && {
        categoryId: {
          in: categoryIds,
        },
      }),
    },
  });

  return { results: products, total: totalProducts };
}
