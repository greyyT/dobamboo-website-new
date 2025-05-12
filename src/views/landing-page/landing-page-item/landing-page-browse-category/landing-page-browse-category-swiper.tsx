'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import getFeaturedCategories from '@/services/category/get-featured-categories';

interface ILandingPageBrowseCategorySwiperProps {
  categories: Awaited<ReturnType<typeof getFeaturedCategories>>;
  listNames: string[];
}

export default function LandingPageBrowseCategorySwiper({
  categories,
  listNames,
}: ILandingPageBrowseCategorySwiperProps) {
  const locale = useLocale();

  return (
    <Swiper
      slidesPerView={4}
      autoplay={{ delay: 3000 }}
      spaceBetween={40}
      loop
      modules={[Autoplay]}
      speed={800}
      className="w-full relative"
    >
      {categories.map((category, idx) => (
        <SwiperSlide key={idx} className="w-full">
          <Link
            key={category.id}
            href={
              category.parent
                ? `${locale}/product/${category.parent.slug}/${category.slug}`
                : `${locale}/product/${category.slug}`
            }
            className="relative"
          >
            <div className="w-full h-100 relative">
              <Image src={category.image ?? ''} alt="Image src" fill objectFit="cover" />
            </div>
            <p className="text-title uppercase mt-2.5 text-sm leading-5">{listNames[idx]}</p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
