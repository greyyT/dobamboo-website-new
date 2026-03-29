import { ReactNode } from 'react';

import Intl from '@/constants/intl';
import BlogLayout from '@/views/layouts/blog-layout';

interface IBlogLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: Intl }>;
}

export default async function Layout({ children, params }: IBlogLayoutProps) {
  const { locale } = await params;

  return <BlogLayout locale={locale}>{children}</BlogLayout>;
}
