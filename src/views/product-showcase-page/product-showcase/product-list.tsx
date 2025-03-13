'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

import { Button } from '@/components/ui/button';
import WillRender from '@/components/will-render';
import Intl from '@/constants/intl';
import { DEFAULT_ITEMS_PER_PAGE } from '@/constants/pagination';
import { QueryParams } from '@/constants/query-params';
import useGetProductsFromCategory from '@/hooks/products/use-get-products-from-category';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { DialogName, useDialogStore } from '@/provider/dialog-provider';
import { IProductApiResponse } from '@/types/product';
import { getIntlFormat } from '@/utils/formatter';

import CustomPagination from './custom-pagination';

interface IProductListProps {
  initialProducts: IProductApiResponse;
  categoryId: string | undefined;
  locale: Intl;
}

const ProductList: FC<IProductListProps> = ({ initialProducts, categoryId, locale }) => {
  const router = useRouter();
  const pathname = usePathname();

  const openDialog = useDialogStore(state => state.openDialog);
  const searchParams = useSearchParams();

  const t = useTranslations('Default');

  const page = parseInt(searchParams.get(QueryParams.PAGE) || '1');
  const pageSize = parseInt(searchParams.get(QueryParams.PAGE_SIZE) || DEFAULT_ITEMS_PER_PAGE.toString());
  const search = searchParams.get(QueryParams.SEARCH);

  const offset = page && pageSize ? (page - 1) * pageSize : 0;
  const limit = pageSize;

  const { data: productsResponse } = useGetProductsFromCategory(categoryId, locale, {
    pagination: {
      offset: offset,
      limit: limit,
      ...(search && { [QueryParams.SEARCH]: search }),
    },
  });

  const { results: products, total: totalProducts } = productsResponse || initialProducts;

  const onPageChange = (page: string | number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set(QueryParams.PAGE, page.toString());

    router.push(`${pathname}?${current.toString()}`);
  };

  if (totalProducts === 0 || products.length === 0) {
    return (
      <div className="mt-11 grid grid-cols-4 gap-7">
        <div className="col-span-4">{t(getIntlFormat('product', 'noProducts'))}</div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-11 grid grid-cols-4 gap-7">
        {products
          ? products.map(product => (
              <div key={product.id} aria-label="Product Card">
                <div className="relative group">
                  <Link href={`/${product.slug}`} className="block" aria-label="Product Link">
                    <div className="pb-[150%] relative">
                      <Image
                        src={product.images[0]}
                        alt={product.translations[0].name}
                        fill
                        className="object-cover w-full h-auto"
                        sizes="200px"
                      />
                    </div>
                  </Link>
                  <Button
                    onClick={() => openDialog(DialogName.PRODUCT_PREVIEW, { product })}
                    className="hidden group-hover:block text-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#5a7178] rounded-none text-[13px] hover:bg-[#7c8689]"
                  >
                    Quick View
                  </Button>
                </div>
                <Link href={`/${product.slug}`} className="block" aria-label="Product Link">
                  <p className="pt-[10px] text-title text-sm capitalize hover:text-slate-800">
                    {product.translations[0].name}
                  </p>
                </Link>
                <p className="mt-[10px]">{product.SKU}</p>
              </div>
            ))
          : null}
      </div>
      <WillRender when={totalProducts > pageSize}>
        <div className="flex w-full justify-center mt-10">
          <CustomPagination totalItems={totalProducts} page={page} pageSize={pageSize} onPageChange={onPageChange} />
        </div>
      </WillRender>
    </>
  );
};

export default ProductList;
