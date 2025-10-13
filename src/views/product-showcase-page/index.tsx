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
    <div className="flex justify-center mt-2 lg:mt-11 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl flex flex-col">
        <NavigationBreadcrumb category={category} subCategory={subCategory} />

        {/* Mobile and Desktop Layout */}
        <div className="flex flex-col lg:flex-row mt-6 lg:mt-11 gap-4 lg:gap-6">
          {/* Sidebar - Hidden on mobile by default, can be toggled */}
          <div className="lg:w-80 lg:flex-shrink-0">
            <Sidebar categories={categories} activeCategory={category} activeSubCategory={subCategory} />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <ProductShowcase locale={locale} category={category} subCategory={subCategory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcasePage;
