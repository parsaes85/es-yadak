import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'فروشگاه و کاتالوگ قطعات یدکی',
  description:
    'کاتالوگ کامل و خرید انواع لوازم یدکی خودرو با فیلتر تخصصی برند خودرو، بازه قیمت، دسته‌بندی قطعات و موجودی انبار در esyadak.',
  openGraph: {
    title: 'فروشگاه و کاتالوگ قطعات یدکی خودرو | esyadak',
    description:
      'کاتالوگ کامل و خرید انواع لوازم یدکی خودرو با فیلتر تخصصی برند خودرو، بازه قیمت و موجودی انبار.',
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
