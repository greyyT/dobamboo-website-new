import { getBlogBySlug, getBlogPosts } from '@/services/notion';
import BlogDetailPage from '@/views/blog-detail-page';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  return {
    title: blog.properties.Title.title[0].plain_text,
    description: 'The latest blog posts from our team',
  };
}

export async function generateStaticParams() {
  const { data } = await getBlogPosts();

  return data.map(post => ({
    slug: post?.properties?.Slug?.rich_text[0]?.plain_text,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  return <BlogDetailPage blog={blog} slug={slug} />;
}
