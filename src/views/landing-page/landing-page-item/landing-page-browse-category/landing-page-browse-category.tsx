import { View } from '@prisma/client';
import { getTranslations } from 'next-intl/server';

import getFeaturedCategories from '@/services/category/get-featured-categories';
import { getIntlFormat } from '@/utils/formatter';

import LandingPageBrowseCategorySwiper from './landing-page-browse-category-swiper';

type Categories = Awaited<ReturnType<typeof getFeaturedCategories>>;

const LandingPageBrowseCategory = async () => {
  const rawFeaturedCategories = await getFeaturedCategories();

  const t = await getTranslations(View.CATEGORY);

  const [listNames, featuredCategories] = rawFeaturedCategories.reduce<[string[], Categories]>(
    (acc, cur) => {
      const key = getIntlFormat(cur.id, 'name');

      if (t.has(key)) {
        const name = t(key);
        acc[0].push(name);
        acc[1].push(cur);
      }

      return acc;
    },
    [[], []],
  );

  return (
    <section className="mt-12">
      <div className="w-full flex justify-center relative mb-8">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-zinc-800" />
        <h1 className="uppercase font-bold text-2xl z-10 bg-white px-4">Browse our category</h1>
      </div>
      <LandingPageBrowseCategorySwiper categories={featuredCategories} listNames={listNames} />
    </section>
  );
};

export default LandingPageBrowseCategory;
