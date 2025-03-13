import { useSearchParams } from 'next/navigation';

import { usePathname, useRouter } from '@/i18n/navigation';

export const useSearchQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChangeKey = (key: string, value: string | undefined) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!value) {
      current.delete(key);
    } else {
      current.set(key, value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  };

  return { router, onChangeKey, pathname, searchParams };
};
