import { Language } from '@prisma/client';
import { NextRequest } from 'next/server';

import Intl from '@/constants/intl';
import { QueryParams } from '@/constants/query-params';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const locale = searchParams.get(QueryParams.LOCALE) ?? Intl.EN;
  const categoryId = searchParams.get(QueryParams.CATEGORY_ID);
  const search = searchParams.get(QueryParams.SEARCH);

  if (!(locale.toUpperCase() in Intl)) {
    return Response.json({ total: 0 }, { status: 404 });
  }

  const category = categoryId
    ? await db.category.findFirst({
        where: {
          id: categoryId,
        },
        include: {
          children: true,
        },
      })
    : null;

  const categoryIds = category ? [category.id, ...category.children.map(child => child.id)] : [];

  const total = await db.product.count({
    where: {
      translations: {
        some: {
          locale: locale.toUpperCase() as Language,
          ...(search && {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          }),
        },
      },
      ...(categoryId && {
        categoryId: {
          in: categoryIds,
        },
      }),
    },
  });

  return Response.json({ total });
}
