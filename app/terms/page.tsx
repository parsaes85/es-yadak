import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { ShieldCheck, RotateCcw, Truck, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'قوانین و ضمانت اصالت کالا',
  description:
    'قوانین، ضوابط، ضمانت اصالت فیزیکی ۱۰۰٪ قطعات، و مهلت تست و بازگشت ۷ روزه در فروشگاه لوازم یدکی خودرو esyadak.',
};

export default function TermsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          قوانین، مقررات و ضمانت‌های فروشگاه esyadak
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          شفافیت در ارائه خدمات، تضمین اصالت فیزیکی و شرایط بازگرداندن ۷ روزه قطعات در esyadak.com
        </p>
      </div>

      {/* Rules list */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
        {/* Section 1 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <h3>۱. ضمانت اصالت ۱۰۰٪ فیزیکی کالا</h3>
          </div>
          <p className="text-slate-600">
            کلیه قطعات عرضه شده در فروشگاه اینترنتی esyadak از واردکنندگان رسمی و کارخانجات معتبر داخلی تهیه
            می‌گردند. هر قطعه با بارکد اختصاصی، شماره فنی OEM معتبر و لیبل رهگیری کارخانه تحویل خریدار
            می‌شود. در صورت اثبات عدم اصالت یا تقلبی بودن قطعه توسط کارشناس رسمی اتحادیه، وجه پرداختی به
            همراه خسارت کامل عودت داده خواهد شد.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <RotateCcw className="w-5 h-5 text-amber-500" />
            <h3>۲. شرایط ضمانت ۷ روزه مرجوعی و انصراف از خرید</h3>
          </div>
          <p className="text-slate-600">
            خریداران محترم تا ۷ روز پس از دریافت بسته، در شرایط زیر می‌توانند درخواست مرجوعی ثبت نمایند:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-600 pr-2">
            <li>عدم تطابق قطعه ارسال شده با سفارش ثبت شده در سایت یا مشخصات خودرو.</li>
            <li>وجود شکستگی، ترک فیزیکی یا لهیدگی ناشی از حمل و نقل.</li>
            <li>پلمپ بودن بسته‌بندی کالا در صورت انصراف سلیقه‌ای مشتری از خرید.</li>
          </ul>
          <p className="text-slate-500 text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-100">
            توجه: قطعات برقی (نظیر سنسورها، کوئل و ECU) در صورتی که روی خودرو بسته شده باشند و آثار سوختگی
            ناشی از اتصالی برق سیم‌کشی داشته باشند، شامل گارانتی مرجوعی نخواهند بود مگر با تایید کارشناس
            فنی شرکت.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Truck className="w-5 h-5 text-amber-500" />
            <h3>۳. روش‌ها و زمان تحویل سفارشات</h3>
          </div>
          <p className="text-slate-600">
            سفارش‌های شهر تهران در روزهای کاری ظرف ۲ الی ۴ ساعت با پیک موتوری تحویل می‌گردند. سفارش‌های سایر
            استان‌ها از طریق سرویس تیپاکس یا پست پیشتاز ظرف ۲۴ تا ۴۸ ساعت کاری با کد رهگیری آنلاین ارسال
            می‌شوند.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <FileText className="w-5 h-5 text-amber-500" />
            <h3>۴. حفظ حریم خصوصی و امنیت داده‌ها</h3>
          </div>
          <p className="text-slate-600">
            اطلاعات شخصی، شماره‌های تماس و آدرس‌های پستی ثبت‌شده در سایت با رعایت بالاترین استانداردهای
            امنیتی محافظت شده و تنها به منظور ارسال مرسولات و صدور فاکتور رسمی مورد استفاده قرار می‌گیرند.
          </p>
        </section>
      </div>

      <div className="text-center">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors"
        >
          <span>مشاهده و خرید قطعات از فروشگاه</span>
        </Link>
      </div>
    </div>
  );
}
