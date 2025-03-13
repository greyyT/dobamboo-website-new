import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  CustomBreadcrumbLink,
} from '@/components/ui/breadcrumb';

interface INavigationBreadcrumbProps {
  name: string;
  slug: string;
}

export const NavigationBreadcrumb = ({ name, slug }: INavigationBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <CustomBreadcrumbLink href="/blog">Dobamboo Blog</CustomBreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-active-breadcrumb" />
        <BreadcrumbItem>
          <CustomBreadcrumbLink className="text-active-breadcrumb" href={`/blog/${slug}`}>
            {name}
          </CustomBreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
