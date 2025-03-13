import React, { ReactNode } from 'react';

import { getBlogPosts } from '@/services/notion';

import BlogSidebar from './blog-sidebar';

interface IBlogLayoutProps {
  children: ReactNode;
}

const BlogLayout = async ({ children }: IBlogLayoutProps) => {
  const { data: blogs } = await getBlogPosts();

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
