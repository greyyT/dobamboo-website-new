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
    <section className="flex-[3_1_0%]">
      <header className="ml-5">
        <Title>{title}</Title>
        <p className="text-subtitle text-sm leading-[1.6] mt-1">{description}</p>
      </header>
      <div className="flex justify-between items-center">
        <p className="text-[15px] text-heading pt-5 font-semibold">Products</p>
        <div className="flex gap-1">
          <SelectFilter />
        </div>
      </div>
      <ProductList
        locale={locale}
        initialProducts={initialProducts}
        categoryId={subCategory ? subCategory.id : category?.id}
      />
    </section>
  );
};

export default ProductShowcase;
