import db from '@/lib/db';
import { CategoryWithSubcategories } from '@/types/category';

export default async function getAllCategories(): Promise<CategoryWithSubcategories[]> {
  'use cache';

  const categoriesWithSubCategories = await db.category.findMany({
    where: {
      parent: null,
    },
    include: {
      children: true,
    },
  });

  return categoriesWithSubCategories;
}
