import Image from 'next/image';
import React from 'react';

import { Link } from '@/i18n/navigation';
import { getBlogPosts } from '@/services/notion';
import { formatDateToOrdinal } from '@/utils/formatter';

const BlogListPage = async () => {
  const { data: blogs } = await getBlogPosts();

  return (
    <main className="flex-1 space-y-8 pr-8">
      <div className="space-y-8 pr-8">
        {blogs.map(post => (
          <Link key={post.id} href={`/blog/${post.properties.Slug.rich_text[0].plain_text}`} className="flex gap-8">
            <div className="relative w-[300px] h-[200px] flex-shrink-0">
              <Image
                src={post.properties.CoverImage.url as string}
                alt={post.properties.Slug.rich_text[0].text.content}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-extrabold text-heading text-xl uppercase">
                {post.properties.Title.title[0].plain_text}
              </h3>
              <p className="text-xs text-title">
                {formatDateToOrdinal(new Date(post.properties.Date.date.start as string))}
              </p>
              <p className="text-sm mt-3 text-title">{post.properties.Description.rich_text[0].plain_text}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default BlogListPage;
