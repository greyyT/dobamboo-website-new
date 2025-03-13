import { Category } from '@prisma/client';

export type CategoryWithSubcategories = Category & {
  children: Category[];
};
