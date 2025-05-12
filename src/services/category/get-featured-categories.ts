import { Category } from '@prisma/client';

import db from '@/lib/db';

export default async function getFeaturedCategories(): Promise<(Category & { parent: Category | null })[]> {
  'use cache';

  const categories = await db.category.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      parent: true,
    },
  });

  return categories;
}
