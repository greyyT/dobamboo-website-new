import { getRequestConfig } from 'next-intl/server';

import getAllIntl from '@/services/i18n/get-all-intl';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const remoteMessages = await getAllIntl(locale);

  const defaultMessages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages: {
      ...defaultMessages,
      ...remoteMessages,
    },
  };
});
