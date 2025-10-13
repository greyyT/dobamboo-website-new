import { FC } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  CustomBreadcrumbLink,
} from '@/components/ui/breadcrumb';
import { IProductWithTranslation } from '@/types/product';

interface INavigationBreadcrumbProps {
  product: IProductWithTranslation;
}

const NavigationBreadcrumb: FC<INavigationBreadcrumbProps> = ({ product }) => {
  return (
    <div className="py-2 sm:py-3 lg:py-4">
      <Breadcrumb>
        <BreadcrumbList className="flex-wrap">
          <BreadcrumbItem>
            <CustomBreadcrumbLink href="/" className="text-sm sm:text-base">
              Home
            </CustomBreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-active-breadcrumb mx-1 sm:mx-2" />
          <BreadcrumbItem className="min-w-0">
            <p className="text-active-breadcrumb font-medium text-sm sm:text-base truncate max-w-48 sm:max-w-64 lg:max-w-none">
              {product.translations[0].name}
            </p>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default NavigationBreadcrumb;
