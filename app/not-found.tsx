import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ShoppingBag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'صفحه پیدا نشد (خطای ۴۰۴)',
  description: 'صفحه مورد نظر در فروشگاه اینترنتی لوازم یدکی خودرو esyadak یافت نشد.',
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-lg mb-4">
        <Image
          src="/assets/esyadak_logo.jpg"
          alt="لوگو esyadak"
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-sm font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full mb-3">
        خطای ۴۰۴
      </span>
      <h1 className="text-3xl font-black text-slate-900 mb-3">
        صفحه مورد نظر در esyadak پیدا نشد!
      </h1>
      <p className="text-slate-600 max-w-md text-sm leading-relaxed mb-8">
        صفحه‌ای که به دنبال آن بودید ممکن است حذف شده باشد، نام آن تغییر یافته باشد یا موقتاً در دسترس نباشد.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-5 py-3 rounded-xl transition shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>بازگشت به صفحه اصلی</span>
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm px-5 py-3 rounded-xl transition shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>مشاهده فروشگاه قطعات</span>
        </Link>
      </div>
    </div>
  );
}
