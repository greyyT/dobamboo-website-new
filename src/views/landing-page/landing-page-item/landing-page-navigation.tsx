'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

import { Link } from '@/i18n/navigation';
import { LandingPageItemData, LandingPageType } from '@/types/landing-page-item-data';

interface ILandingPageNavigationProps {
  data: Extract<LandingPageItemData, { type: LandingPageType.NAVIGATION }>;
}

const internalPageRegex = /^\/page(\/|$)/i;
const localePrefixRegex = /^\/(en|vi)(\/|$)/i;

function normalizeInternalHref(url: string) {
  const trimmed = url.trim();
  let href = trimmed.replace(localePrefixRegex, '/').replace(internalPageRegex, '/');

  if (!href.startsWith('/')) href = `/${href}`;
  return href;
}

function parseRedirectUrl(url: string, useInternalLink?: boolean) {
  const trimmed = (url ?? '').trim();
  const isAbsoluteHttpUrl = /^https?:\/\//i.test(trimmed);
  const looksLikeInternalPath = trimmed.startsWith('/') && !trimmed.startsWith('//');
  const isLegacyInternal = internalPageRegex.test(trimmed);

  const isInternal =
    useInternalLink === true ? true : looksLikeInternalPath || isLegacyInternal;

  return {
    href: isInternal ? normalizeInternalHref(trimmed) : trimmed,
    isExternal: !isInternal && isAbsoluteHttpUrl,
  };
}

function NavigationLink({
  href,
  isExternal,
  className,
  children,
}: {
  href: string;
  isExternal: boolean;
  className: string;
  children: ReactNode;
}) {
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function LandingPageNavigation({ data }: ILandingPageNavigationProps) {
  const navigations = (data.data ?? []).filter(
    (item) => Boolean(item?.imageUrl?.trim()) && Boolean(item?.redirectUrl?.trim()),
  );

  if (!navigations.length) {
    return null;
  }

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {/* Mobile: Single column stack */}
      <div className="flex flex-col gap-4 sm:hidden">
        {navigations.map((item, idx) => {
          const { href, isExternal } = parseRedirectUrl(item.redirectUrl, item.useInternalLink);

          return (
            <NavigationLink
              href={href}
              isExternal={isExternal}
              key={idx}
              className="relative w-full h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
            <Image
              src={item.imageUrl}
              alt={`Navigation ${idx + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw"
            />
            </NavigationLink>
          );
        })}
      </div>

      {/* Tablet: Two columns for 3+ items, single row for 2 items */}
      <div className="hidden sm:flex lg:hidden">
        {navigations.length <= 2 ? (
          // Two items: side by side
          <div className="flex gap-4 w-full">
            {navigations.map((item, idx) => {
              const { href, isExternal } = parseRedirectUrl(item.redirectUrl, item.useInternalLink);

              return (
                <NavigationLink
                  href={href}
                  isExternal={isExternal}
                  key={idx}
                  className="relative flex-1 h-56 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                <Image
                  src={item.imageUrl}
                  alt={`Navigation ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(min-width: 640px) 50vw"
                />
                </NavigationLink>
              );
            })}
          </div>
        ) : (
          // Three or more items: grid layout
          <div className="grid grid-cols-2 gap-4 w-full">
            {navigations.map((item, idx) => {
              const { href, isExternal } = parseRedirectUrl(item.redirectUrl, item.useInternalLink);

              return (
                <NavigationLink
                  href={href}
                  isExternal={isExternal}
                  key={idx}
                  className={`relative h-56 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                    navigations.length % 2 !== 0 && idx === navigations.length - 1 ? 'col-span-2' : ''
                  }`}
                >
                <Image
                  src={item.imageUrl}
                  alt={`Navigation ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(min-width: 640px) 50vw"
                />
                </NavigationLink>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop: Horizontal layout */}
      <div className="hidden lg:flex gap-6 xl:gap-8">
        {navigations.map((item, idx) => {
          const { href, isExternal } = parseRedirectUrl(item.redirectUrl, item.useInternalLink);

          return (
            <NavigationLink
              href={href}
              isExternal={isExternal}
              key={idx}
              className="relative flex-1 h-64 xl:h-72 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
            <Image
              src={item.imageUrl}
              alt={`Navigation ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(min-width: 1024px) 33vw"
            />
            {/* Optional: Add overlay for better text readability if needed */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </NavigationLink>
          );
        })}
      </div>
    </div>
  );
}
