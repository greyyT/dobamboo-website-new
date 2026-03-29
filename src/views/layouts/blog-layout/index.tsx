import React, { ReactNode } from 'react';

import Intl from '@/constants/intl';
import { getBlogPosts } from '@/services/notion';

import BlogSidebar from './blog-sidebar';

interface IBlogLayoutProps {
  children: ReactNode;
  locale: Intl;
}

const BlogLayout = async ({ children, locale }: IBlogLayoutProps) => {
  const { data: blogs } = await getBlogPosts(locale);

  return (
    <main className="flex justify-center mt-5 lg:mt-11 px-4">
      <div className="w-full max-w-screen-xl flex">
        {children}
        <BlogSidebar blogs={blogs} />
      </div>
    </main>
  );
};

export default BlogLayout;
