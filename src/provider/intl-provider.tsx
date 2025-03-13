import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';

interface IIntlProviderProps {
  locale: string;
  children: ReactNode;
}

const IntlProvider = async ({ locale, children }: IIntlProviderProps) => {
  const messages = await getMessages({ locale });

  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
};

export default IntlProvider;
