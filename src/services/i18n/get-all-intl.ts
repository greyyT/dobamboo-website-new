import { Language } from '@prisma/client';

import db from '@/lib/db';

export default async function getAllIntl(locale: string) {
  'use cache';

  const [rawMessages] = await Promise.all([
    db.intl.findMany({
      where: {
        locale: locale.toUpperCase() as Language,
      },
    }),
  ]);

  const remoteMessages = rawMessages.reduce<Record<string, Record<string, string>>>((acc, messages) => {
    acc[messages.view] = {
      ...acc[messages.view],
      ...(messages.value as Record<string, string>),
    };
    return acc;
  }, {});

  return remoteMessages;
}
