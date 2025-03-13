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
      <div className="grid grid-cols-mobile lg:grid-cols-3 items-center py-2 lg:px-8 w-300 max-w-full lg:border-b border-solid border-title/15">
        <div className="hidden lg:block">
          <LanguagePicker locale={locale} />
        </div>
        <Link href={Route.HOME} className="justify-self-center flex items-center">
          <Image src="/images/logo.png" alt="Logo" width={160} height={160} priority />
        </Link>
        <div className="justify-self-end space-y-1">
          <button
            onClick={() => setIsSearchOn(!isSearchOn)}
            className={cn(`flex lg:hidden items-center p-2.5 cursor-pointer`, isSearchOn && 'bg-title/5')}
          >
            <Search className="text-title" />
          </button>
          <div className="hidden lg:flex flex-col items-end">
            <ContactInfo />
          </div>
        </div>
      </div>
      <div className="block lg:hidden">
        <MobileMenu />
      </div>
      <div className="hidden lg:flex justify-between w-300 max-w-full border-b border-solid border-title/15 relative">
        <DesktopNavigation categories={categories} />
        <button
          onClick={() => setIsSearchOn(!isSearchOn)}
          className={cn(`flex items-center px-2.5 cursor-pointer`, isSearchOn && 'bg-title/5')}
        >
          <Search className="text-title" />
        </button>
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
