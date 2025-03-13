'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DEFAULT_ITEMS_PER_PAGE, PRODUCTS_PER_PAGE_OPTIONS } from '@/constants/pagination';
import { QueryParams } from '@/constants/query-params';
import { usePathname, useRouter } from '@/i18n/navigation';

const SelectFilter = () => {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onValueChange = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set(QueryParams.PAGE_SIZE, value);

    router.push(`${pathname}?${current.toString()}`);
  };

  return (
    <Select
      onValueChange={onValueChange}
      value={`${searchParams.get(QueryParams.PAGE_SIZE) || DEFAULT_ITEMS_PER_PAGE}`}
    >
      <SelectTrigger className="text-title w-32 rounded-none border-[1.5px] border-title">
        <SelectValue placeholder="24 per page" />
      </SelectTrigger>
      <SelectContent className="rounded-none">
        {PRODUCTS_PER_PAGE_OPTIONS.map(option => (
          <SelectItem key={option} className="rounded-none hover:bg-slate-400/60" value={option.toString()}>
            {option} per page
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
