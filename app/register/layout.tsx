import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ثبت‌نام کاربر جدید',
  description:
    'ثبت‌نام در فروشگاه اینترنتی لوازم یدکی خودرو esyadak و دریافت ۵۰۰,۰۰۰ ریال اعتبار اولیه کیف پول.',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
