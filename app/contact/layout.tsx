import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تماس با ما و پشتیبانی',
  description:
    'راه‌های ارتباط با کارشناسان فنی و پشتیبانی فروشگاه لوازم یدکی خودرو esyadak - آدرس، تلفن و فرم پیام.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
