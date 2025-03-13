import Intl from '@/constants/intl';
import { notFound } from '@/i18n/navigation';
import getAllProducts from '@/services/product/get-all-products';
import getProductFromSlug from '@/services/product/get-product-from-slug';
import ProductDetailPage from '@/views/product-detail-page';

export const dynamicParams = true;
export const revalidate = false;

export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map(product => ({
    slug: product.slug,
  }));
}

interface IProductPageProps {
  params: Promise<{ slug: string; locale: Intl }>;
}

export default async function ProductPage({ params }: IProductPageProps) {
  const { slug, locale } = await params;

  const product = await getProductFromSlug(slug, locale);

  if (!product) {
    notFound(locale);
    return;
  }

  return <ProductDetailPage product={product} />;
}
