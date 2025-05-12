'use client';

import { Loader2, Search } from 'lucide-react';
import Image from 'next/image';
import React, { FC, Fragment, useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import WillRender from '@/components/will-render';
import Intl from '@/constants/intl';
import { SupportedKeys } from '@/constants/misc';
import { QueryParams } from '@/constants/query-params';
import { Route } from '@/constants/route';
import useSearchProducts from '@/hooks/products/use-search-products';
import useCustomLodashDebounce from '@/hooks/utils/useCustomLodashDebounce';
import { Link, useRouter } from '@/i18n/navigation';

const DEBOUNCE_TIME_FOR_SEARCH = 275;

interface ISearchBarProps {
  locale: Intl;
  closeSearch(): void;
}

const SearchBar: FC<ISearchBarProps> = ({ locale, closeSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [searchContent, setSearchContent] = useState('');
  const [debouncedSearchContent, setDebouncedSearchContent] = useState('');

  const debounceUpdateSearchContent = useCustomLodashDebounce((searchValue: string) => {
    setDebouncedSearchContent(searchValue);
  }, DEBOUNCE_TIME_FOR_SEARCH);

  const onUpdateSearchContent = useCallback(
    (value: string) => {
      setSearchContent(value);
      debounceUpdateSearchContent(value);
    },
    [debounceUpdateSearchContent],
  );

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === SupportedKeys.ENTER) {
      router.push({
        pathname: Route.PRODUCT,
        query: {
          [QueryParams.SEARCH]: searchContent,
        },
      });
      closeSearch();
    }
  };

  const { data: products, isLoading } = useSearchProducts(debouncedSearchContent, locale);

  return (
    <div className="flex relative">
      <div className="relative items-center">
        <Search className="absolute h-4 top-1/2 left-2 -translate-y-1/2 text-title" />
        <Input
          type="text"
          autoFocus
          placeholder="Search for products..."
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          onKeyDown={onEnterPress}
          className="pl-9 w-128 max-w-full leading-5 text-subtitle text-sm border-slate-600/30"
          value={searchContent}
          onChange={e => onUpdateSearchContent(e.target.value)}
        />
      </div>
      <WillRender when={isOpen}>
        <div className="absolute left-0 right-0 top-full p-2 border mt-2 rounded-xs z-10 bg-[#f4f1e8] shadow">
          <WillRender>
            <WillRender.If when={searchContent.length === 0}>
              <p className="text-sm text-subtitle p-2">Input the name of the products you want to find.</p>
            </WillRender.If>
            <WillRender.If when={searchContent !== debouncedSearchContent || isLoading}>
              <div className="w-full h-full flex items-center py-4 justify-center">
                <Loader2 className="animate-spin size-5" />
              </div>
            </WillRender.If>
            <WillRender.If when={!products || products.length === 0}>
              <p className="text-sm text-subtitle">No products found.</p>
            </WillRender.If>
            <WillRender.Else>
              <ul className="space-y-2">
                {products?.map((product, idx) => (
                  <Fragment key={product.id}>
                    <li>
                      <Link
                        href={`/${product.slug}`}
                        className="flex items-center gap-2 p-4 rounded-sm hover:bg-title/5"
                        onMouseDown={() => {
                          router.push(`/${product.slug}`);
                          closeSearch();
                          onUpdateSearchContent('');
                        }}
                      >
                        <Image src={product.images[0]} alt={product.translations[0].name} width={40} height={40} />
                        <div className="space-y-1">
                          <p className="text-sm font-medium line-clamp-1">{product.translations[0].name}</p>
                          <p className="text-xs font-light line-clamp-2">{product.translations[0].description}</p>
                        </div>
                      </Link>
                    </li>
                    <WillRender when={idx !== products.length - 1 || (idx === 2 && products.length === 3)}>
                      <Separator />
                    </WillRender>
                  </Fragment>
                ))}
              </ul>
              <WillRender when={(products?.length ?? 0) === 3}>
                <div className="py-3 w-full flex items-center justify-center text-sm">
                  <Button
                    onMouseDown={() => {
                      router.push(`${Route.PRODUCT}/?${QueryParams.SEARCH}=${searchContent}`);
                      closeSearch();
                      onUpdateSearchContent('');
                    }}
                    variant="ghost"
                    className="transition cursor-pointer"
                  >
                    Show more
                  </Button>
                </div>
              </WillRender>
            </WillRender.Else>
          </WillRender>
        </div>
      </WillRender>
    </div>
  );
};

export default SearchBar;
