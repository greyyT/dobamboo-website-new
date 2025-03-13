import React from 'react';

import Intl from '@/constants/intl';
import { notFound } from '@/i18n/navigation';
import getAllCategories from '@/services/category/get-all-categories';

import NavigationBreadcrumb from './navigation-breadcrumb';
import ProductShowcase from './product-showcase';
import Sidebar from './sidebar';

interface IProductShowcasePageProps {
  slug: string[] | undefined;
  locale: Intl;
}

const ProductShowcasePage = async ({ slug, locale }: IProductShowcasePageProps) => {
  const categories = await getAllCategories();

  const category = categories.find(c => c.slug === slug?.[0]) ?? null;
  const subCategory = category ? (category.children.find(c => c.slug === slug?.[1]) ?? null) : null;

  if (subCategory && (!category || subCategory.parentId !== category.id)) {
    notFound(locale);
  }

  return (
    <div className="flex justify-center mt-2 lg:mt-11 px-4">
      <div className="w-300 max-w-full flex flex-col lg:px-4">
        <NavigationBreadcrumb category={category} subCategory={subCategory} />
        <div className="flex mt-11 gap-4">
          <Sidebar categories={categories} activeCategory={category} activeSubCategory={subCategory} />
          <ProductShowcase locale={locale} category={category} subCategory={subCategory} />
        </div>
      </div>
    </div>
  );
};

export default ProductShowcasePage;
