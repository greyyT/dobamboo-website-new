import { defineRouting } from 'next-intl/routing';

import Intl from '@/constants/intl';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [Intl.EN, Intl.VI],

  // Used when no locale matches
  defaultLocale: Intl.EN,
});
