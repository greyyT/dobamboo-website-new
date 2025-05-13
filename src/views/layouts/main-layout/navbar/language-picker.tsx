'use client';

import { GlobeIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import Intl, { LOCALES } from '@/constants/intl';
import { usePathname, useRouter } from '@/i18n/navigation';

interface ILanguagePickerProps {
  locale: Intl;
}

const LanguagePicker: FC<ILanguagePickerProps> = ({ locale }) => {
  // Define useState for holding current state of selected language
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle user's change action
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

  const MAPPED_LOCALE: Record<Intl, string> = {
    [Intl.EN]: 'English',
    [Intl.VI]: 'Tiếng Việt',
  };

  return (
    <HoverCard openDelay={100} closeDelay={150}>
      <HoverCardTrigger>
        <Button variant="outline" size="sm" className="items-center cursor-pointer text-title">
          <GlobeIcon size={16} className="-mr-0.5 mb-0.5" /> {MAPPED_LOCALE[locale]}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="p-2 flex flex-col w-auto items-start min-w-30">
        {LOCALES.map(item => (
          <Button
            key={item}
            variant={'ghost'}
            className="w-full justify-start cursor-pointer"
            onClick={() => {
              onValueChange(item);
            }}
            size={'sm'}
          >
            {MAPPED_LOCALE[item]}
          </Button>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
};

export default LanguagePicker;
