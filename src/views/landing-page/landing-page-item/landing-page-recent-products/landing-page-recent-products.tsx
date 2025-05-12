import { getLocale } from 'next-intl/server';
import React from 'react';

import getNewProducts from '@/services/product/get-new-products';

import LandingPageRecentProductsSwiper from './landing-page-recent-products-swiper';

const LandingPageRecentProducts = async () => {
  const locale = await getLocale();

  const featuredProducts = await getNewProducts(locale);

  return (
    <section className="mt-12">
      <div className="w-full flex justify-center relative mb-8">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-zinc-800" />
        <h1 className="uppercase font-bold text-2xl z-10 px-4 bg-white">New Products</h1>
      </div>
      <LandingPageRecentProductsSwiper products={featuredProducts} />
    </section>
  );
};

export default LandingPageRecentProducts;
