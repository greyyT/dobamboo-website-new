'use client';

import Image from 'next/image';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Link } from '@/i18n/navigation';
import getNewProducts from '@/services/product/get-new-products';

interface ILandingPageRecentProductsSwiperProps {
  products: Awaited<ReturnType<typeof getNewProducts>>;
}

export default function LandingPageRecentProductsSwiper({ products }: ILandingPageRecentProductsSwiperProps) {
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
      {products.map((product, idx) => (
        <SwiperSlide key={idx} className="w-full">
          <Link key={product.id} href={`/${product.slug}`} className="relative">
            <div className="w-full h-100 relative">
              <Image src={product.images[0] ?? ''} alt="Image src" fill objectFit="cover" />
            </div>
            <p className="text-title uppercase mt-2.5 text-sm leading-5">{product.translations[0].name}</p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
