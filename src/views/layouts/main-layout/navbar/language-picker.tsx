'use client';

import { GlobeIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { FC, useTransition } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Intl from '@/constants/intl';
import { usePathname, useRouter } from '@/i18n/navigation';

interface ILanguagePickerProps {
  locale: Intl;
}

const LanguagePicker: FC<ILanguagePickerProps> = ({ locale }) => {
  // Define useState for holding current state of selected language
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Handle user's change action
  const onValueChange = (value: string) => {
    if (!searchParams) {
      return;
    }

    const queryFromParams = searchParams.entries().reduce<Record<string, string>>((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

    startTransition(() => {
      router.replace(
        {
          pathname,
          query: queryFromParams,
        },
        {
          locale: value,
        },
      );
    });
  };

  return (
    <div className="language-picker">
      <Select onValueChange={onValueChange} value={locale} disabled={isPending}>
        <SelectTrigger className="w-56 text-title">
          <div className="flex gap-2 items-center">
            <GlobeIcon className="opacity-60 h-5" />
            <SelectValue placeholder="Select a language" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={Intl.EN}>English</SelectItem>
          <SelectItem value={Intl.VI}>Tiếng Việt</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguagePicker;
