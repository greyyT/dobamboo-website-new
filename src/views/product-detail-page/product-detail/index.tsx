import { IProductWithTranslation } from '@/types/product';

import ProductCarousel from './product-carousel';
import ProductInfo from './product-info';

interface IProductDetailProps {
  product: IProductWithTranslation;
}

const ProductDetail = ({ product }: IProductDetailProps) => {
  return (
    <section className="mt-6 sm:mt-8 lg:mt-11">
      {/* Product Layout Container */}
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
        {/* Product Images */}
        <div className="w-full lg:w-1/2 xl:w-2/5">
          <ProductCarousel images={product.images} name={product.translations[0].name} />
        </div>

        {/* Product Information */}
        <div className="w-full lg:w-1/2 xl:w-3/5">
          <header aria-label="Product Information" className="mb-6 sm:mb-8">
            <h1
              className="text-paragraph text-xl sm:text-2xl lg:text-3xl leading-[1.2] font-bold mb-2"
              aria-label="Product Name Header"
            >
              {product.translations[0].name}
            </h1>
            <p aria-label="Product SKU" className="text-sm sm:text-base text-[#595f63] leading-[1.6]">
              SKU: {product.SKU}
            </p>
          </header>

          <ProductInfo
            description={product.translations[0].description}
            dimensions={product.translations[0].dimensions}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
