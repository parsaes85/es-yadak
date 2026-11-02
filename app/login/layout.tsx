import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ورود و ثبت‌نام',
  description:
    'ورود به حساب کاربری یا ثبت‌نام در فروشگاه تخصصی لوازم یدکی خودرو esyadak با کد تایید پیامکی یا رمز عبور.',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
