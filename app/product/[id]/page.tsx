import type { Metadata } from 'next';
import data from '@/data/data.json';
import ProductDetailClient from '@/components/ProductDetailClient';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = data.products.find((p) => p.id === id);

  if (!product) {
    return {
      title: 'قطعه مورد نظر پیدا نشد',
      description: 'قطعه یدکی مورد نظر در انبار فروشگاه اینترنتی esyadak یافت نشد.',
    };
  }

  const category = data.categories.find((c) => c.id === product.categoryId);
  const categoryName = category ? category.name : '';

  return {
    title: `${product.title} | برند ${product.brand}`,
    description: product.shortDescription || product.description.slice(0, 160),
    keywords: [
      product.title,
      product.brand,
      product.sku,
      categoryName,
      'لوازم یدکی خودرو',
      'esyadak',
    ],
    openGraph: {
      title: `${product.title} - ${product.brand} | esyadak`,
      description: product.shortDescription || product.description.slice(0, 160),
      type: 'website',
      images: [
        {
          url: product.image,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} - ${product.brand}`,
      description: product.shortDescription || product.description.slice(0, 160),
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  return <ProductDetailClient id={id} />;
}
