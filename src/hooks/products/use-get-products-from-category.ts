import { useQuery } from '@tanstack/react-query';

import Intl from '@/constants/intl';
import { QueryKey } from '@/constants/query-key';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '@/constants/query-params';
import fetchProductsFromCategory from '@/services/product/fetch-products-from-category';
import { PaginationProps } from '@/types/pagination';

interface IGetProductsFromCategoryOptionsProps {
  pagination?: PaginationProps;
}

export default function useGetProductsFromCategory(
  categoryId: string | undefined,
  locale: Intl,
  options?: IGetProductsFromCategoryOptionsProps,
) {
  const { pagination } = options || {};

  return useQuery({
    queryKey: [QueryKey.PRODUCTS_FROM_CATEGORY, categoryId, pagination?.limit, pagination?.offset, pagination?.q],
    queryFn: () =>
      fetchProductsFromCategory(categoryId, locale, {
        ...pagination,
      }),
    enabled: pagination?.limit !== DEFAULT_LIMIT || pagination?.offset !== DEFAULT_OFFSET || !!pagination?.q,
  });
}
