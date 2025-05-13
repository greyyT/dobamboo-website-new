'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AboutUsSearchParams, AboutUsTabKey } from '@/constants/query-params';
import { useSearchQuery } from '@/hooks/use-search-query';

const TabSelect = () => {
  const { onChangeKey } = useSearchQuery();

  return (
    <nav className="w-full flex justify-center mt-4">
      <Tabs defaultValue="account">
        <TabsList className="bg-white p-0">
          <TabsTrigger
            className="data-[state=active]:bg-white data-[state=active]:shadow-none rounded-none data-[state=active]:border-b-2 border-b border-slate-400 data-[state=active]:border-black transition-none transition-colors text-base px-5"
            value="account"
            onClick={() => onChangeKey(AboutUsSearchParams.Tab, undefined)}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-white data-[state=active]:shadow-none rounded-none data-[state=active]:border-b-2 border-b border-slate-400 data-[state=active]:border-black transition-none transition-colors text-base px-5"
            value="password"
            onClick={() => onChangeKey(AboutUsSearchParams.Tab, AboutUsTabKey.OurStory)}
          >
            Our story
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </nav>
  );
};

export default TabSelect;
