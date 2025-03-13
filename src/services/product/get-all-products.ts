import { Product } from '@prisma/client';

import db from '@/lib/db';

export default async function getAllProducts(): Promise<Product[]> {
  'use cache';

  return await db.product.findMany();
}
