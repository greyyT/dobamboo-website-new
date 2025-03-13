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
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <CustomBreadcrumbLink href="/">Home</CustomBreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-active-breadcrumb" />
        <BreadcrumbItem>
          <p className="text-active-breadcrumb font-medium">{product.translations[0].name}</p>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NavigationBreadcrumb;
