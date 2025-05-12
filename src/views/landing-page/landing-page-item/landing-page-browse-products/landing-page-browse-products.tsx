import { getLocale } from 'next-intl/server';
import React from 'react';

import getFeaturedProducts from '@/services/product/get-featured-products';

import LandingPageBrowseProductsSwiper from './landing-page-browse-products-swiper';

const LandingPageBrowseProducts = async () => {
  const locale = await getLocale();

  const featuredProducts = await getFeaturedProducts(locale);

  return (
    <section className="mt-12">
      <div className="w-full flex justify-center relative mb-8">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-zinc-800" />
        <h1 className="uppercase font-bold text-2xl z-10 px-4 bg-white">Weekly featured products</h1>
      </div>
      <LandingPageBrowseProductsSwiper products={featuredProducts} />
    </section>
  );
};

export default LandingPageBrowseProducts;
