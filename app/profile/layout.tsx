import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'پنل کاربری و سفارشات',
  description:
    'مدیریت حساب کاربری، مشاهده سوابق سفارش‌ها، کیف پول و تیکت‌های پشتیبانی در esyadak.',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
