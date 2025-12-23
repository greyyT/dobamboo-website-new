'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import WillRender from '@/components/will-render';
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
      slidesPerView={1}
      autoplay={{ delay: 3000 }}
      spaceBetween={20}
      loop
      modules={[Autoplay]}
      speed={800}
      className="w-full relative"
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      }}
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
              <WillRender when={!!category.image}>
                <Image src={category.image ?? ''} alt="Image src" fill objectFit="cover" />
              </WillRender>
            </div>
            <p className="text-title uppercase mt-2.5 text-sm leading-5">{listNames[idx]}</p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
