import React, { ReactNode } from 'react';

import Intl from '@/constants/intl';
import getAllCategories from '@/services/category/get-all-categories';

import Footer from './footer';
import Navbar from './navbar/navbar';

interface IMainLayoutViewProps {
  children: ReactNode;
  locale: Intl;
}

const MainLayoutView = async ({ children, locale }: IMainLayoutViewProps) => {
  const categories = await getAllCategories();

  return (
    <>
      <Navbar categories={categories} locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayoutView;
