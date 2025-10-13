'use client';

import { View } from '@prisma/client';
import { GlobeIcon, Menu, Search } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { FC, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import WillRender from '@/components/will-render';
import Intl, { LOCALES } from '@/constants/intl';
import { NAVBAR_ITEMS } from '@/constants/navbar';
import { Route } from '@/constants/route';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { CategoryWithSubcategories } from '@/types/category';
import { getIntlFormat } from '@/utils/formatter';

import ContactInfo from './contact-info';
import SearchBar from './search-bar';

interface IMobileMenuProps {
  locale: Intl;
  categories: CategoryWithSubcategories[];
}

// Mobile Language Picker using Select component
const MobileLanguagePicker: FC<{ locale: Intl }> = ({ locale }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const MAPPED_LOCALE: Record<Intl, string> = {
    [Intl.EN]: 'English',
    [Intl.VI]: 'Tiếng Việt',
  };

  const onValueChange = (value: string) => {
    if (!searchParams) {
      return;
    }

    const queryFromParams = searchParams.entries().reduce<Record<string, string>>((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

    router.replace(
      {
        pathname,
        query: queryFromParams,
      },
      {
        locale: value,
      },
    );
  };

  return (
    <Select value={locale} onValueChange={onValueChange}>
      <SelectTrigger className="w-full justify-start min-w-0">
        <div className="flex items-center gap-2 flex-1">
          <GlobeIcon size={16} className="flex-shrink-0" />
          <SelectValue className="flex-1">{MAPPED_LOCALE[locale]}</SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent className="w-full">
        {LOCALES.map(item => (
          <SelectItem key={item} value={item}>
            {MAPPED_LOCALE[item]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const MobileMenu: FC<IMobileMenuProps> = ({ locale, categories }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const tDefault = useTranslations('Default');
  const tCategory = useTranslations(View.CATEGORY);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
    setExpandedCategory(null);
  };

  const categoriesHaveIntl = categories.reduce<CategoryWithSubcategories[]>((acc, cur) => {
    if (!tCategory.has(getIntlFormat(cur.id, 'name'))) {
      return acc;
    }

    if (cur.children.length > 0) {
      const children = cur.children.filter(subcategory => tCategory.has(getIntlFormat(subcategory.id, 'name')));
      acc.push({ ...cur, children });
    } else {
      acc.push(cur);
    }

    return acc;
  }, []);

  return (
    <>
      {/* Mobile Header */}
      <div className="flex items-center justify-between py-4 w-full">
        <Link href={Route.HOME} className="flex-shrink-0">
          <Image src="/images/logo.png" alt="Logo" width={80} height={80} priority />
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSearch}
            className={cn('text-title hover:bg-title/10', isSearchOpen && 'bg-title/10')}
          >
            <Search className="w-5 h-5" />
          </Button>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-title hover:bg-title/10">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0 flex flex-col">
              <SheetHeader className="border-b border-title/15 p-4 flex-shrink-0">
                <SheetTitle className="text-left">
                  <Link href={Route.HOME} onClick={closeSheet}>
                    <Image src="/images/logo.png" alt="Logo" width={60} height={60} priority />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              {/* Navigation Items - Takes remaining space */}
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {NAVBAR_ITEMS.map(item => (
                  <div key={item.href}>
                    {item.title === 'product' ? (
                      <div className="space-y-2">
                        <Link
                          href={item.href}
                          className="block text-title font-semibold uppercase tracking-wide text-sm py-3 px-3 hover:bg-title/5 rounded-md transition-colors"
                          onClick={closeSheet}
                        >
                          {tDefault(getIntlFormat('navbar', item.title))}
                        </Link>

                        {/* Product Categories */}
                        <div className="ml-2 space-y-1">
                          {categoriesHaveIntl.map(category => (
                            <div key={category.id} className="space-y-1">
                              <button
                                onClick={() => toggleCategory(category.id)}
                                className="w-full text-left text-subtitle font-medium text-sm py-2 px-3 hover:bg-title/5 rounded-md flex items-center justify-between transition-colors"
                              >
                                {tCategory(getIntlFormat(category.id, 'name'))}
                                <span
                                  className={cn(
                                    'transition-transform duration-200 text-xs',
                                    expandedCategory === category.id ? 'rotate-180' : '',
                                  )}
                                >
                                  ▼
                                </span>
                              </button>

                              <WillRender when={expandedCategory === category.id && category.children.length > 0}>
                                <div className="ml-4 space-y-1">
                                  {category.children.map(subcategory => (
                                    <Link
                                      key={subcategory.id}
                                      href={`/product/${category.slug}/${subcategory.slug}`}
                                      className="block text-title text-sm py-2 px-3 hover:bg-title/5 rounded-md transition-colors"
                                      onClick={closeSheet}
                                    >
                                      {tCategory(getIntlFormat(subcategory.id, 'name'))}
                                    </Link>
                                  ))}
                                </div>
                              </WillRender>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block text-title font-semibold uppercase tracking-wide text-sm py-3 px-3 hover:bg-title/5 rounded-md transition-colors"
                        onClick={closeSheet}
                      >
                        {tDefault(getIntlFormat('navbar', item.title))}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Language Picker and Contact Info at Bottom */}
              <div className="p-4 space-y-3 border-t border-title/15 flex-shrink-0">
                <MobileLanguagePicker locale={locale} />
                <ContactInfo />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search */}
      <WillRender when={isSearchOpen}>
        <div className="pb-4">
          <SearchBar locale={locale} closeSearch={() => setIsSearchOpen(false)} />
        </div>
      </WillRender>
    </>
  );
};

export default MobileMenu;
