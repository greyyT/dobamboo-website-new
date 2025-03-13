import { ReactNode } from 'react';

import BlogLayout from '@/views/layouts/blog-layout';

export default function Layout({ children }: { children: ReactNode }) {
  return <BlogLayout>{children}</BlogLayout>;
}
