import Image from 'next/image';
import Link from 'next/link';

import { Route } from '@/constants/route';
import { BlogResponse } from '@/types/blog';
import { getCoverImageUrl } from '@/utils/formatter';

interface IBlogSidebarProps {
  blogs: BlogResponse[];
}

const BlogSidebar = ({ blogs }: IBlogSidebarProps) => {
  const recentBlogs = blogs.slice(0, 3);

  return (
    <aside className="w-60 pl-4 border-l border-solid border-slate-300 h-full md:block hidden">
      <div className="sticky top-2 lg:top-4">
        <h1 className="text-subtitle text-lg font-semibold">Recent Posts</h1>
        <div className="space-y-4 mt-6">
          {recentBlogs?.map(post => {
            const slug = post.properties.Slug?.rich_text?.[0]?.plain_text;
            const coverUrl = getCoverImageUrl(post.properties.CoverImage);
            const title = post.properties.Title?.title?.[0]?.plain_text;

            if (!slug || !coverUrl || !title) return null;

            return (
              <Link href={`/${Route.BLOG}/${slug}`} key={post.id} className="flex gap-2 items-center">
                <div className="relative pb-[20%] flex-1">
                  <Image src={coverUrl} alt={slug} fill sizes="300" className="object-cover size-20" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-heading line-clamp-2 text-sm">{title}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
