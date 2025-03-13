'use client';

import { useSearchParams } from 'next/navigation';
import React, { FC } from 'react';

import { QueryParams } from '@/constants/query-params';

interface ITitleProps {
  children: string;
}

const Title: FC<ITitleProps> = ({ children }) => {
  const searchParams = useSearchParams();

  const searchValue = searchParams.get(QueryParams.SEARCH);

  return (
    <h1 className="text-heading text-2xl leading-[1.2] font-bold">
      {searchValue ? `Search results for "${searchValue}"` : children}
    </h1>
  );
};

export default Title;
