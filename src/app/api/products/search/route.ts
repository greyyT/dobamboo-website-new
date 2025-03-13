import { Language } from '@prisma/client';
import { NextRequest } from 'next/server';

import Intl from '@/constants/intl';
import { QueryParams } from '@/constants/query-params';
import db from '@/lib/db';
import { IProductWithTranslation } from '@/types/product';

const SEARCH_LIMIT = 3;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const searchValue = searchParams.get(QueryParams.SEARCH);
  const locale = searchParams.get(QueryParams.LOCALE) ?? Intl.EN;

  if (!(locale.toUpperCase() in Intl)) {
    return Response.json({ data: 'Locale not found' }, { status: 404 });
  }

  if (!searchValue) {
    return Response.json({ data: [] });
  }

  const productsTranslations = await db.productTranslation.findMany({
    where: {
      locale: locale.toUpperCase() as Language,
      name: {
        contains: searchValue,
        mode: 'insensitive',
      },
    },
    include: {
      product: true,
    },
    take: SEARCH_LIMIT,
  });

  const products = productsTranslations.reduce<IProductWithTranslation[]>((acc, cur) => {
    const { product, ...translation } = cur;
    const productWithTranslation = {
      ...product,
      translations: [translation],
    };

    acc.push(productWithTranslation);
    return acc;
  }, []);

  return Response.json({ data: products });
}
