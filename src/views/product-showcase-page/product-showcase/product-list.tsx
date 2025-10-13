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
      <div className="mt-8 lg:mt-11">
        <div className="text-center py-12 lg:py-16">
          <p className="text-subtitle text-base lg:text-lg">{t(getIntlFormat('product', 'noProducts'))}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Responsive Product Grid */}
      <div className="mt-8 lg:mt-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
        {products
          ? products.map(product => (
              <div key={product.id} aria-label="Product Card" className="group">
                <div className="relative overflow-hidden rounded-lg lg:rounded-none">
                  <Link href={`/${product.slug}`} className="block" aria-label="Product Link">
                    <div className="aspect-[3/4] relative bg-gray-100">
                      <Image
                        src={product.images[0]}
                        alt={product.translations[0].name}
                        fill
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      />
                    </div>
                  </Link>

                  {/* Quick View Button - Desktop Only */}
                  <Button
                    onClick={() => openDialog(DialogName.PRODUCT_PREVIEW, { product })}
                    className="hidden lg:block lg:group-hover:block text-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#5a7178] rounded-none text-[13px] hover:bg-[#7c8689] transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    Quick View
                  </Button>
                </div>

                {/* Product Info */}
                <div className="pt-3 lg:pt-[10px] space-y-2">
                  <Link href={`/${product.slug}`} className="block" aria-label="Product Link">
                    <p className="text-title text-sm lg:text-sm capitalize hover:text-slate-800 transition-colors line-clamp-2">
                      {product.translations[0].name}
                    </p>
                  </Link>
                  <p className="text-subtitle text-sm">{product.SKU}</p>
                </div>

                {/* Mobile Quick View Button */}
                <div className="lg:hidden mt-3">
                  <Button
                    onClick={() => openDialog(DialogName.PRODUCT_PREVIEW, { product })}
                    variant="outline"
                    size="sm"
                    className="w-full text-[13px]"
                  >
                    Quick View
                  </Button>
                </div>
              </div>
            ))
          : null}
      </div>

      {/* Pagination */}
      <WillRender when={totalProducts > pageSize}>
        <div className="flex w-full justify-center mt-8 lg:mt-10">
          <CustomPagination totalItems={totalProducts} page={page} pageSize={pageSize} onPageChange={onPageChange} />
        </div>
      </WillRender>
    </>
  );
};

export default ProductList;
