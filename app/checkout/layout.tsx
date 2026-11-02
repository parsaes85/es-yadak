import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تسویه‌حساب و ثبت نهایی سفارش',
  description:
    'تکمیل اطلاعات آدرس، انتخاب شیوه ارسال و پرداخت وجه سفارش قطعات خودرو در فروشگاه اینترنتی esyadak.',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
