'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface IProductCarousel {
  name: string;
  images: string[];
  size?: 'sm' | 'md' | 'lg';
}

const ProductCarousel = ({ images, name, size = 'lg' }: IProductCarousel) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const onImageClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className="flex flex-col items-center w-full" aria-label="Product Images Carousel">
      {/* Main Carousel */}
      <div className="relative w-full max-w-lg">
        <Carousel
          setApi={setApi}
          className={cn(
            'w-full',
            size === 'lg' && 'max-w-md sm:max-w-lg',
            size === 'md' && 'max-w-sm sm:max-w-md',
            size === 'sm' && 'max-w-xs',
          )}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {images.map((image, idx) => (
              <CarouselItem key={idx} className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`Product ${name} Image ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-cover w-full h-full"
                  priority={idx === 0}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows - Desktop */}
          <CarouselPrevious className="hidden sm:flex w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 -left-6 sm:-left-8 lg:-left-12 xl:-left-16 hover:bg-slate-700/5 transition-colors" />
          <CarouselNext className="hidden sm:flex w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 -right-6 sm:-right-8 lg:-right-12 xl:-right-16 hover:bg-slate-700/5 transition-colors" />
        </Carousel>

        {/* Mobile Navigation Indicators */}
        <div className="flex sm:hidden justify-center mt-4 gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => onImageClick(idx)}
              className={cn('w-2 h-2 rounded-full transition-colors', current === idx ? 'bg-gray-800' : 'bg-gray-300')}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails - Desktop & Tablet */}
      <div
        className={cn(
          'hidden sm:flex justify-center gap-3 lg:gap-4 xl:gap-5 mt-6 lg:mt-8 xl:mt-10',
          'max-w-full overflow-x-auto pb-2',
        )}
      >
        {images.map((image, idx) => (
          <button
            key={idx}
            onClick={() => onImageClick(idx)}
            className={cn(
              'opacity-40 hover:opacity-70 transition-opacity relative cursor-pointer flex-shrink-0 rounded overflow-hidden',
              current === idx && 'opacity-100 ring-2 ring-gray-800',
              size === 'lg' && 'w-12 h-16 sm:w-14 sm:h-20 lg:w-16 lg:h-24',
              size === 'md' && 'w-10 h-14 sm:w-12 sm:h-16',
              size === 'sm' && 'w-8 h-12',
            )}
            aria-label={`View image ${idx + 1}`}
          >
            <Image
              src={image}
              alt={`Product ${name} thumbnail ${idx + 1}`}
              fill
              sizes="80px"
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>

      {/* Mobile Thumbnails - Horizontal Scrollable */}
      <div className="flex sm:hidden w-full overflow-x-auto gap-2 mt-4 pb-2">
        {images.map((image, idx) => (
          <button
            key={idx}
            onClick={() => onImageClick(idx)}
            className={cn(
              'opacity-60 transition-opacity relative cursor-pointer flex-shrink-0 rounded overflow-hidden w-16 h-20',
              current === idx && 'opacity-100 ring-2 ring-gray-800',
            )}
            aria-label={`View image ${idx + 1}`}
          >
            <Image
              src={image}
              alt={`Product ${name} thumbnail ${idx + 1}`}
              fill
              sizes="64px"
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
