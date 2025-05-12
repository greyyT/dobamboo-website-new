import React from 'react';

import { getBlogPosts } from '@/services/notion';

import LandingPageLatestNewsSwiper from './landing-page-latest-news-swiper';

const LandingPageLatestNews = async () => {
  const { data: blogs } = await getBlogPosts();

  return (
    <section className="mt-12">
      <div className="w-full flex justify-center relative mb-8">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-zinc-800" />
        <h1 className="uppercase font-bold text-2xl z-10 px-4 bg-white">Latest news</h1>
      </div>
      <LandingPageLatestNewsSwiper blogs={blogs} />
    </section>
  );
};

export default LandingPageLatestNews;
