import { Route } from './route';

interface NavbarItem {
  title: string;
  href: string;
}

export const NAVBAR_ITEMS: NavbarItem[] = [
  {
    title: 'home',
    href: Route.HOME,
  },
  {
    title: 'product',
    href: '/product',
  },
  {
    title: 'aboutUs',
    href: '/about-us',
  },
  {
    title: 'contact',
    href: '/contact',
  },
  {
    title: 'blog',
    href: '/blog',
  },
];
