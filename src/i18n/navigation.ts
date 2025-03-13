import { createNavigation } from 'next-intl/navigation';

import { Route } from '@/constants/route';

import { routing } from './routing';

const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

const notFound = (locale: string) => {
  redirect({
    locale,
    href: {
      pathname: Route.NOT_FOUND,
    },
  });
};

export { getPathname, Link, notFound, redirect, usePathname, useRouter };
