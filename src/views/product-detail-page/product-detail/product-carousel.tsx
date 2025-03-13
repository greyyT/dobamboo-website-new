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
    <div className="flex-1 flex flex-col items-center" aria-label="Product Images Carousel">
      <Carousel
        setApi={setApi}
        className={cn(size === 'lg' && 'w-[370px]', size === 'md' && 'w-[250px]', size === 'sm' && 'w-[150px]')}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((image, idx) => (
            <CarouselItem key={idx} className="relative pb-[150%] h-0">
              {/* TODO: Apply image maginfier on this image */}
              <Image
                src={image}
                alt={`Product ${name} Image ${idx + 1}`}
                fill
                sizes={'300px'}
                className="object-cover w-full h-auto"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="w-14 h-14 -left-20 hover:bg-slate-700/5" size="default" />
        <CarouselNext className="w-14 h-14 -right-20 hover:bg-slate-700/5" size="default" />
      </Carousel>
      <div className={cn('flex justify-center gap-5', size === 'lg' && 'mt-10', size === 'md' && 'mt-6')}>
        {images.map((image, idx) => (
          <div
            key={idx}
            onClick={() => onImageClick(idx)}
            className={cn(
              'opacity-40 relative cursor-pointer',
              current === idx && 'opacity-100',
              size === 'lg' && 'w-[33px] h-[50px]',
              size === 'md' && 'w-[25px] h-[40px]',
              size === 'sm' && 'w-[15px] h-[25px]',
            )}
          >
            <Image
              src={image}
              alt={`Product ${name} Image ${idx + 1}`}
              fill
              sizes="50px"
              className="object-cover w-full h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
