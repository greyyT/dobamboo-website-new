import { Category, View } from '@prisma/client';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  CustomBreadcrumbLink,
} from '@/components/ui/breadcrumb';
import { Route } from '@/constants/route';
import { cn } from '@/lib/utils';
import { getIntlFormat } from '@/utils/formatter';

interface INavigationBreadcrumbProps {
  category: Category | null;
  subCategory: Omit<Category, 'children'> | null;
}

const NavigationBreadcrumb: FC<INavigationBreadcrumbProps> = ({ category, subCategory }) => {
  const t = useTranslations(View.CATEGORY);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={Route.HOME}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className={cn(!category && 'text-active-breadcrumb')} />
        <BreadcrumbItem>
          <CustomBreadcrumbLink className={cn(!category && 'text-active-breadcrumb font-medium')} href={Route.PRODUCT}>
            Product
          </CustomBreadcrumbLink>
        </BreadcrumbItem>
        {category && (
          <>
            <BreadcrumbSeparator className={cn(!subCategory && 'text-active-breadcrumb')} />
            <BreadcrumbItem>
              <CustomBreadcrumbLink
                href={`${Route.PRODUCT}/${category.slug}`}
                className={cn(!subCategory && 'text-active-breadcrumb font-medium')}
              >
                {t(getIntlFormat(category.id, 'name'))}
              </CustomBreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        {category && subCategory && (
          <>
            <BreadcrumbSeparator className="text-active-breadcrumb" />
            <BreadcrumbItem>
              <CustomBreadcrumbLink
                href={`${Route.PRODUCT}/${category.slug}/${subCategory.slug}`}
                className="text-active-breadcrumb font-medium"
              >
                {t(getIntlFormat(subCategory.id, 'name'))}
              </CustomBreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NavigationBreadcrumb;
