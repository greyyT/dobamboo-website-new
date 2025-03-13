'use client';

import 'swiper/css';

import Image from 'next/image';
import React, { FC } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { LandingPageItemData, LandingPageType } from '@/types/landing-page-item-data';

interface ILandingPageCarouselProps {
  data: Extract<LandingPageItemData, { type: LandingPageType.CAROUSEL }>;
}

const LandingPageCarousel: FC<ILandingPageCarouselProps> = ({ data }) => {
  return (
    <Swiper
      slidesPerView={1}
      autoplay={{ delay: 5000 }}
      loop
      modules={[Autoplay]}
      speed={1200}
      className="h-140 w-full relative mb-20"
    >
      {data.data.map((imageSrc, idx) => (
        <SwiperSlide key={idx} className="w-full">
          <Image src={imageSrc} alt="Image src" fill objectFit="cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default LandingPageCarousel;
