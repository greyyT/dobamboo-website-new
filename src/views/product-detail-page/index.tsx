import React, { FC } from 'react';

import { IProductWithTranslation } from '@/types/product';

import NavigationBreadcrumb from './navigation-breadcrumb';
import ProductDetail from './product-detail';

interface IProductDetailPageProps {
  product: IProductWithTranslation;
}

const ProductDetailPage: FC<IProductDetailPageProps> = ({ product }) => {
  return (
    <main className="flex justify-center mt-2 lg:mt-11 px-4">
      <div className="w-full max-w-screen-xl flex flex-col lg:px-4">
        <NavigationBreadcrumb product={product} />
        <ProductDetail product={product} />
      </div>
    </main>
  );
};

export default ProductDetailPage;
