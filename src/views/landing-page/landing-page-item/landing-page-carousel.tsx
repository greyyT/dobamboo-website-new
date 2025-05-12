'use client';

import 'swiper/css';

import { ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useRef } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import { cn } from '@/lib/utils';
import { LandingPageItemData, LandingPageType } from '@/types/landing-page-item-data';

interface ILandingPageCarouselProps {
  data: Extract<LandingPageItemData, { type: LandingPageType.CAROUSEL }>;
}

const LandingPageCarousel: FC<ILandingPageCarouselProps> = ({ data }) => {
  const swiperRef = useRef<SwiperClass>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <Swiper
      slidesPerView={1}
      slidesPerGroup={1}
      autoplay={{ delay: 5000 }}
      loop
      speed={1200}
      modules={[Autoplay]}
      onInit={swiper => {
        swiperRef.current = swiper;
      }}
      onActiveIndexChange={swiper => {
        setActiveIndex(swiper.realIndex);
      }}
      className="h-140 w-full relative"
    >
      {data.data.map((imageSrc, idx) => (
        <SwiperSlide key={idx} className="w-full">
          <div className="w-full h-full relative">
            <Image src={imageSrc} alt="Image src" fill objectFit="cover" />
            <div className="absolute bottom-8 left-8">
              <h1 className="font-inter font-bold text-6xl text-slate-100">Buy now at Trevita</h1>
              <p className="font-inter text-sm text-slate-200 mt-2 max-w-140">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
                dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula
                massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est
              </p>
              <div className="flex">
                <Link
                  href="/product"
                  className="text-base text-white font-medium flex items-center mt-4 border-b border-solid border-white"
                >
                  Shop now
                  <ArrowRightIcon size={14} className="ml-0.5 -rotate-45 " />
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="absolute bottom-2 left-0 right-0 flex h-4 justify-center z-50">
        {data.data.length > 1 && (
          <div className="flex items-center space-x-2">
            {data.data.map((_, idx) => (
              <div
                key={idx}
                className={cn('w-2 h-2 rounded-full', idx === activeIndex ? 'bg-white' : 'bg-slate-100/40')}
                onClick={() => swiperRef.current?.slideTo(idx)}
              />
            ))}
          </div>
        )}
      </div>
    </Swiper>
  );
};

export default LandingPageCarousel;
