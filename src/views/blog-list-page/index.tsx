import Image from 'next/image';
import React from 'react';

import Intl from '@/constants/intl';
import { Link } from '@/i18n/navigation';
import { getBlogPosts } from '@/services/notion';
import { formatDateToOrdinal, getCoverImageUrl } from '@/utils/formatter';

interface IBlogListPageProps {
  locale: Intl;
}

const BlogListPage = async ({ locale }: IBlogListPageProps) => {
  const { data: blogs } = await getBlogPosts(locale);

  return (
    <main className="flex-1 space-y-8 pr-8">
      <div className="space-y-8 pr-8">
        {blogs.map(post => {
          const slug = post.properties.Slug?.rich_text[0]?.plain_text;
          const coverUrl = getCoverImageUrl(post.properties.CoverImage);
          const title = post.properties.Title?.title[0]?.plain_text;
          const date = post.properties.Date?.date?.start;
          const description = post.properties.Description?.rich_text[0]?.plain_text;

          if (!slug || !coverUrl || !title || !date) return null;

          return (
            <Link key={post.id} href={`/blog/${slug}`} className="flex gap-8">
              <div className="relative w-[300px] h-[200px] flex-shrink-0">
                <Image src={coverUrl} alt={slug} fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-extrabold text-heading text-xl uppercase">{title}</h3>
                <p className="text-xs text-title">{formatDateToOrdinal(new Date(date))}</p>
                <p className="text-sm mt-3 text-title">{description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default BlogListPage;
