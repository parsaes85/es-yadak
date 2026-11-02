import type { Metadata } from 'next';
import data from '@/data/data.json';
import BlogDetailClient from '@/components/BlogDetailClient';

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = data.blogPosts.find((p) => p.id === id);

  if (!post) {
    return {
      title: 'مقاله پیدا نشد',
      description: 'مقاله فنی مورد نظر در وبلاگ esyadak یافت نشد.',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | esyadak`,
      description: post.excerpt,
      type: 'article',
      images: [
        {
          url: post.image,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  return <BlogDetailClient id={id} />;
}
