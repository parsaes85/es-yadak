import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سبد خرید',
  description:
    'مشاهده، ویرایش و مدیریت قطعات یدکی خودرو موجود در سبد خرید شما در esyadak.',
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
