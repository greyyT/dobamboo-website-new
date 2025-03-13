import axios from 'axios';

import Intl from '@/constants/intl';
import { QueryParams } from '@/constants/query-params';
import { IProductWithTranslation } from '@/types/product';

type ProductSearchResponse = {
  data: IProductWithTranslation[];
};

export default async function fetchProductSearch(
  searchValue: string,
  locale: Intl,
): Promise<IProductWithTranslation[]> {
  try {
    const res = await axios.get<ProductSearchResponse>('/api/products/search', {
      params: {
        [QueryParams.SEARCH]: searchValue,
        [QueryParams.LOCALE]: locale,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
