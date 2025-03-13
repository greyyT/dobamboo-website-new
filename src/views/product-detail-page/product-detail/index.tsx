import { IProductWithTranslation } from '@/types/product';

import ProductCarousel from './product-carousel';
import ProductInfo from './product-info';

interface IProductDetailProps {
  product: IProductWithTranslation;
}

const ProductDetail = ({ product }: IProductDetailProps) => {
  return (
    <section className="mt-11 flex flex-col-revere gap-8 lg:flex-row lg:gap-15 ">
      <ProductCarousel images={product.images} name={product.translations[0].name} />
      <div className="flex-1">
        <header aria-label="Product Information">
          <h1 className="text-paragraph text-2xl leading-[1.2] font-bold" aria-label="Product Name Header">
            {product.translations[0].name}
          </h1>
          <p aria-label="Product SKU" className="text-sm text-[#595f63] leading-[1.6]">
            SKU: {product.SKU}
          </p>
        </header>
        <ProductInfo
          description={product.translations[0].description}
          dimensions={product.translations[0].dimensions}
        />
      </div>
    </section>
  );
};

export default ProductDetail;
