import bookmarkPlugin from '@notion-render/bookmark-plugin';
import { NotionRenderer } from '@notion-render/client';
import hljsPlugin from '@notion-render/hljs-plugin';
import Image from 'next/image';
import React from 'react';

import { getPageContent, notionClient } from '@/services/notion';
import { BlogResponse } from '@/types/blog';
import { formatDateToOrdinal } from '@/utils/formatter';

import { NavigationBreadcrumb } from './navigation-breadcrumb';

import './blog.css';

interface IBlogDetailPageProps {
  blog: BlogResponse;
  slug: string;
}

const BlogDetailPage = async ({ blog, slug }: IBlogDetailPageProps) => {
  const notionRenderer = new NotionRenderer({
    client: notionClient,
  });

  notionRenderer.use(hljsPlugin({}));
  notionRenderer.use(bookmarkPlugin(undefined));

  const content = await getPageContent(blog.id);
  const html = await notionRenderer.render(...content);

  const title = blog?.properties?.Title?.title[0]?.plain_text;
  const date = blog?.properties?.Date?.date.start as string;
  const bannerImage = blog?.properties?.CoverImage?.url as string;

  return (
    <article className="flex-1 md:pr-20">
      <NavigationBreadcrumb name={title} slug={slug} />
      <h1 className="text-5xl font-black text-paragraph pt-6">{title}</h1>
      <p className="text-sm mt-4 text-title">{formatDateToOrdinal(new Date(date))}</p>
      <Image src={bannerImage} alt={title} sizes="100vw" width={1200} height={0} className="h-auto mt-8" />
      <div
        className="blog mt-4 leading-6 text-base space-y-3 text-paragraph"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </article>
  );
};

export default BlogDetailPage;
