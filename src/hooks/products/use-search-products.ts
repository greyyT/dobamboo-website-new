import { useQuery } from '@tanstack/react-query';

import Intl from '@/constants/intl';
import { QueryKey } from '@/constants/query-key';
import fetchProductSearch from '@/services/product/fetch-product-search';

export default function useSearchProducts(searchValue: string, locale: Intl) {
  return useQuery({
    queryKey: [QueryKey.SEARCH_PRODUCTS, searchValue],
    queryFn: () => fetchProductSearch(searchValue, locale),
    enabled: !!searchValue,
  });
}
