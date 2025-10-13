import { Category, View } from '@prisma/client';
import { getTranslations } from 'next-intl/server';

import Intl from '@/constants/intl';
import getProductsFromCategory from '@/services/product/get-products-from-category';
import { CategoryWithSubcategories } from '@/types/category';
import { getIntlFormat } from '@/utils/formatter';

import ProductList from './product-list';
import SelectFilter from './select-filter';
import Title from './title';

interface IProductShowcaseProps {
  category: CategoryWithSubcategories | null;
  subCategory: Category | null;
  locale: Intl;
}

const ProductShowcase = async ({ category, subCategory, locale }: IProductShowcaseProps) => {
  const initialProducts = await getProductsFromCategory(subCategory ?? category, locale);

  const t = await getTranslations(View.CATEGORY);

  const title =
    category || subCategory
      ? t(getIntlFormat(subCategory ? subCategory.id : category ? category.id : '', 'name'))
      : 'Product';
  const description =
    category || subCategory
      ? t(getIntlFormat(subCategory ? subCategory.id : category ? category.id : '', 'description'))
      : '';

  return (
    <section className="w-full">
      {/* Header Section */}
      <header className="px-4 lg:ml-5 lg:px-0">
        <Title>{title}</Title>
        <p className="text-subtitle text-sm leading-[1.6] mt-1 max-w-3xl">{description}</p>
      </header>

      {/* Products Header with Filter */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-4 lg:px-0 mt-6 lg:mt-0">
        <p className="text-base lg:text-[15px] text-heading pt-2 lg:pt-5 font-semibold">Products</p>
        <div className="flex gap-1 justify-end sm:justify-start">
          <SelectFilter />
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4 lg:px-0">
        <ProductList
          locale={locale}
          initialProducts={initialProducts}
          categoryId={subCategory ? subCategory.id : category?.id}
        />
      </div>
    </section>
  );
};

export default ProductShowcase;
