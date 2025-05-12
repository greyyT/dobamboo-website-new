import { Route } from './route';

interface NavbarItem {
  title: string;
  href: Route;
}

export const NAVBAR_ITEMS: NavbarItem[] = [
  {
    title: 'home',
    href: Route.HOME,
  },
  {
    title: 'product',
    href: Route.PRODUCT,
  },
  {
    title: 'aboutUs',
    href: Route.ABOUT_US,
  },
  {
    title: 'contact',
    href: Route.CONTACT,
  },
  {
    title: 'blog',
    href: Route.BLOG,
  },
];
