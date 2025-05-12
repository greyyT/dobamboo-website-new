'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import getFeaturedProducts from '@/services/product/get-featured-products';

interface ILandingPageBrowseProductsSwiperProps {
  products: Awaited<ReturnType<typeof getFeaturedProducts>>;
}

export default function LandingPageBrowseProductsSwiper({ products }: ILandingPageBrowseProductsSwiperProps) {
  const filteredProductsWithoutName = useMemo(() => {
    return products.filter(product => product.translations.length > 0);
  }, [products]);

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
      {filteredProductsWithoutName.map((product, idx) => (
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
