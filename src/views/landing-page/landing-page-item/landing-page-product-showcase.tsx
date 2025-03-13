import { View } from '@prisma/client';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { Link } from '@/i18n/navigation';
import getCategoriesByIds from '@/services/category/get-categories-by-ids';
import { LandingPageItemData, LandingPageType } from '@/types/landing-page-item-data';
import { getIntlFormat } from '@/utils/formatter';

interface ILandingPageProductShowcaseProps {
  data: Extract<LandingPageItemData, { type: LandingPageType.PRODUCT_SHOWCASE }>;
}

const LandingPageProductShowcase = async ({ data }: ILandingPageProductShowcaseProps) => {
  const categories = await getCategoriesByIds(data.data);

  const t = await getTranslations(View.CATEGORY);

  return (
    <section className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-10">
      {categories.map(category => (
        <Link
          key={category.id}
          href={category.parent ? `/product/${category.parent.slug}/${category.slug}` : `/product/${category.slug}`}
          className="relative"
        >
          <Image src={category.image ?? ''} alt="Display" width={600} height={800} className="object-cover" />
          <p className="text-title uppercase mt-2.5 text-sm leading-5">{t(getIntlFormat(category.id, 'name'))}</p>
        </Link>
      ))}
    </section>
  );
};

export default LandingPageProductShowcase;
