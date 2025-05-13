'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import { FC, useState } from 'react';

import WillRender from '@/components/will-render';
import Intl from '@/constants/intl';
import { Route } from '@/constants/route';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { CategoryWithSubcategories } from '@/types/category';

import ContactInfo from './contact-info';
import DesktopNavigation from './desktop-navigation';
import LanguagePicker from './language-picker';
import MobileMenu from './mobile-menu';
import SearchBar from './search-bar';

interface INavbarProps {
  locale: Intl;
  categories: CategoryWithSubcategories[];
}

const Navbar: FC<INavbarProps> = ({ locale, categories }) => {
  const [isSearchOn, setIsSearchOn] = useState(false);

  return (
    <nav className="flex items-center flex-col px-4">
      <div className="flex items-center gap-8 py-4 w-300 max-w-full relative lg:border-b border-solid border-title/15">
        <div className="hidden lg:flex items-center gap-8">
          <Link href={Route.HOME} className="">
            <Image src="/images/logo.png" alt="Logo" width={100} height={100} priority />
          </Link>
        </div>
        <div className="w-full hidden lg:flex flex-col justify-center mt-2">
          <div className="flex items-center justify-between">
            <LanguagePicker locale={locale} />
            <ContactInfo />
          </div>
          <div className="flex items-center justify-between">
            <DesktopNavigation categories={categories} />
            <button
              onClick={() => setIsSearchOn(!isSearchOn)}
              className={cn(`flex items-center px-2.5 py-3 cursor-pointer`, isSearchOn && 'bg-title/5')}
            >
              <Search className="text-title" />
            </button>
          </div>
        </div>
      </div>
      <div className="block lg:hidden w-full">
        <MobileMenu />
      </div>
      <WillRender when={isSearchOn}>
        <div className="w-300 max-w-full lg:py-2.5 flex lg:justify-center">
          <SearchBar locale={locale} closeSearch={() => setIsSearchOn(false)} />
        </div>
      </WillRender>
    </nav>
  );
};

export default Navbar;
