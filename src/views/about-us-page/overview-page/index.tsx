'use client';

import { useSearchParams } from 'next/navigation';

import { AboutUsSearchParams, AboutUsTabKey } from '@/constants/query-params';
import { cn } from '@/lib/utils';

import OverviewInfo from './overview-info';
import OverviewStats from './overview-stats';

const OverviewPage = () => {
  const searchParams = useSearchParams();
  const isActive = searchParams.get(AboutUsSearchParams.Tab) !== AboutUsTabKey.OurStory;

  return (
    <div className={cn(!isActive && 'hidden')}>
      <OverviewInfo />
      <OverviewStats />
    </div>
  );
};

export default OverviewPage;
