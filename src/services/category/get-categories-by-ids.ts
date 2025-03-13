import { Category } from '@prisma/client';

import db from '@/lib/db';

export default async function getCategoriesByIds(
  categoryIds: string[],
): Promise<(Category & { parent: Category | null })[]> {
  'use cache';

  const categories = await db.category.findMany({
    where: {
      id: {
        in: categoryIds,
      },
    },
    include: {
      parent: true,
    },
  });

  return categories;
}
