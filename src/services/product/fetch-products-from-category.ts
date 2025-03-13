import axios from 'axios';

import Intl from '@/constants/intl';
import { PaginationProps } from '@/types/pagination';
import { IProductApiResponse } from '@/types/product';

export default async function fetchProductsFromCategory(
  categoryId: string | undefined,
  locale: Intl,
  pagination?: PaginationProps,
): Promise<IProductApiResponse> {
  try {
    const res = await axios.get<IProductApiResponse>('/api/products', {
      params: {
        categoryId,
        locale,
        ...pagination,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
