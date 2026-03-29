import Intl from '@/constants/intl';
import BlogListPage from '@/views/blog-list-page';

interface IBlogPageProps {
  params: Promise<{ locale: Intl }>;
}

export default async function Page({ params }: IBlogPageProps) {
  const { locale } = await params;

  return <BlogListPage locale={locale} />;
}
