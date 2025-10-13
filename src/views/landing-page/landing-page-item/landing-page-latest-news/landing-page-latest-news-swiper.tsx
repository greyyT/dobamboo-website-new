'use client';

import Image from 'next/image';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Separator } from '@/components/ui/separator';
import { Link } from '@/i18n/navigation';
import { BlogResponse } from '@/types/blog';

interface ILandingPageLatestNewsSwiperProps {
  blogs: BlogResponse[];
}

export default function LandingPageLatestNewsSwiper({ blogs }: ILandingPageLatestNewsSwiperProps) {
  const featuredBlogs = blogs.slice(0, 8);

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
      {featuredBlogs.map((blog, idx) => {
        const startDate = new Date(blog.properties.Date.date.start as string);
        const formattedDate = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

        return (
          <SwiperSlide key={idx} className="w-full">
            <Link key={blog.id} href={`/blog/${blog.properties.Slug.rich_text[0].plain_text}`} className="relative">
              <div className="w-full h-40 relative">
                <Image
                  src={blog.properties.CoverImage.url as string}
                  alt={blog.properties.Slug.rich_text[0].text.content}
                  fill
                  objectFit="cover"
                />
              </div>
              <h3 className="text-title uppercase mt-2.5 text-base font-semibold leading-5 text-center line-clamp-2">
                {blog.properties.Title.title[0].plain_text}
              </h3>
              <Separator className="my-3" />
              <p className="text-sm text-title font-medium mb-2">{formattedDate}</p>
              <p className="text-sm text-title line-clamp-3">{blog.properties.Description.rich_text[0].plain_text}</p>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
