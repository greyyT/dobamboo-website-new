import { Product, ProductTranslation } from '@prisma/client';

export interface IProductWithTranslation extends Product {
  translations: ProductTranslation[];
}

export interface IProductApiResponse {
  results: IProductWithTranslation[];
  total: number;
}
