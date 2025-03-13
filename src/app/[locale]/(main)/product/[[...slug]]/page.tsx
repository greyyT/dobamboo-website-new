import Intl from '@/constants/intl';
import getAllCategories from '@/services/category/get-all-categories';
import ProductShowcasePage from '@/views/product-showcase-page';

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true;

// The default heuristic to cache any fetch requests that set their cache option
// to 'force-cache' or are discovered before a Dynamic API is used. Semantically
// equivalent to revalidate: Infinity which effectively means the resource should
// be cached indefinitely
export const revalidate = false;

export async function generateStaticParams() {
  const categories = await getAllCategories();

  return [
    { slug: [] },
    ...categories
      .map(category => {
        if (category.children.length === 0) {
          return { slug: [category.slug] };
        } else {
          return [
            { slug: [category.slug] },
            ...category.children.map(subcategory => ({
              slug: [category.slug, subcategory.slug],
            })),
          ];
        }
      })
      .flat(),
  ];
}

interface IProductPageProps {
  params: Promise<{ slug?: string[]; locale: Intl }>;
}

export default async function ProductPage({ params }: IProductPageProps) {
  const { slug, locale } = await params;

  return <ProductShowcasePage slug={slug} locale={locale} />;
}
