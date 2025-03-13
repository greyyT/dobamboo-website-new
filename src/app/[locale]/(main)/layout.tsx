import React, { ReactNode } from 'react';

import Intl from '@/constants/intl';
import MainLayoutView from '@/views/layouts/main-layout';

interface IMainLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: Intl }>;
}

export default async function MainLayout({ children, params }: IMainLayoutProps) {
  const { locale } = await params;

  return <MainLayoutView locale={locale}>{children}</MainLayoutView>;
}
