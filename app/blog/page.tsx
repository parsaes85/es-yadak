import type { Metadata } from 'next';
import BlogIndexClient from '@/components/BlogIndexClient';

export const metadata: Metadata = {
  title: 'وبلاگ و راهنمای تخصصی نگهداری خودرو',
  description:
    'مقالات معتبر مهندسی خودرو، زمان‌بندی تعویض قطعات مصرفی و راهکارهای افزایش طول عمر پیشرانه در وبلاگ تخصصی esyadak.',
  openGraph: {
    title: 'وبلاگ و راهنمای تخصصی نگهداری خودرو | esyadak',
    description:
      'مقالات معتبر مهندسی خودرو، زمان‌بندی تعویض قطعات مصرفی و راهکارهای افزایش طول عمر پیشرانه.',
  },
};

export default function BlogPage() {
  return <BlogIndexClient />;
}
