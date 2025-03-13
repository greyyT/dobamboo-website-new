import { Language } from '@prisma/client';
import { NextRequest } from 'next/server';

import Intl from '@/constants/intl';
import { DEFAULT_LIMIT, DEFAULT_OFFSET, QueryParams } from '@/constants/query-params';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const offset = parseInt(searchParams.get(QueryParams.OFFSET) ?? DEFAULT_OFFSET.toString());
  const limit = parseInt(searchParams.get(QueryParams.LIMIT) ?? DEFAULT_LIMIT.toString());
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

  const products = await db.product.findMany({
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
    include: {
      translations: {
        where: {
          locale: locale.toUpperCase() as Language,
        },
      },
    },
    take: limit,
    skip: offset,
  });

  const totalProducts = await db.product.count({
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

  return Response.json({ results: products, total: totalProducts });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { product: productBody, translation } = body;

  const product = await db.product.create({
    data: productBody,
  });

  const productTranslation = await db.productTranslation.create({
    data: {
      ...translation,
      productId: product.id,
    },
  });

  return Response.json({
    ...product,
    translation: productTranslation,
  });
}
