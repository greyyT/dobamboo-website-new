import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/sonner';
import Intl from '@/constants/intl';
import Pathname from '@/constants/pathname';
import { redirect } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import DialogProvider from '@/provider/dialog-provider';
import IntlProvider from '@/provider/intl-provider';
import TanstackQueryProvider from '@/provider/query-provider';

import '../globals.css';

export const metadata: Metadata = {
  title: 'Trevita',
  description: 'A shop that sells stuffs that are made from bamboo',
};

export const dynamicParams = true;
export const revalidate = false;

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    redirect({
      locale: Intl.EN,
      href: {
        pathname: Pathname.HOME_PAGE,
      },
    });
  }

  return (
    <html lang={locale}>
      <body className={`font-raleway antialiased`}>
        <IntlProvider locale={locale}>
          <TanstackQueryProvider>
            <Toaster />
            <DialogProvider />
            {children}
          </TanstackQueryProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
