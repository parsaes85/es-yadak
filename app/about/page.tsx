import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Truck, Users, Award, CheckCircle2, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'درباره ما | معرفی فروشگاه esyadak',
  description:
    'آشنایی با فروشگاه اینترنتی و تخصصی لوازم یدکی خودرو esyadak، تامین مستقیم قطعات استاندارد موتوری و تعلیق با ضمانت اصالت فیزیکی.',
};

export default function AboutPage() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          درباره فروشگاه لوازم یدکی خودرو esyadak
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
          تامین تخصصی، مطمئن و مستقیم قطعات خودرو در esyadak.com
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          داستان esyadak با هدف حذف واسطه‌های غیرمجاز و جلوگیری از توزیع قطعات تقلبی و
          استوک در بازار لوازم یدکی خودرو آغاز شد.
        </p>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-16/7 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl">
        <Image
          src="/images/blog_service.jpg"
          alt="انبار و تیم فنی esyadak"
          fill
          className="object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-6 right-6 left-6 text-white max-w-xl">
          <span className="text-xs text-amber-400 font-bold block mb-1">تعهد اخلاقی و فنی esyadak</span>
          <h3 className="text-lg font-black">
            «ایمنی جاده‌ها در گرو استفاده از قطعه استاندارد است»
          </h3>
        </div>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">اصالت و سلامت تضمین‌شده</h3>
          <p className="text-xs text-slate-500 leading-relaxed text-justify">
            تمامی کالاهای ورودی به انبارهای esyadak توسط مهندسین مکانیک مورد ارزیابی فنی و استعلام
            هولوگرام سازندگان بین‌المللی (برمبو، بوش، تکستار، کنتیننتال، والئو) قرار می‌گیرند.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">لجستیک و ارسال برق‌آسا</h3>
          <p className="text-xs text-slate-500 leading-relaxed text-justify">
            با در اختیار داشتن انبار مرکزی در قطب بازار لوازم یدکی تهران (خیابان ملت)، سفارش‌های
            پایتخت در کمتر از ۳ ساعت و سفارش‌های شهرستان ظرف ۲۴ الی ۴۸ ساعت با تیپاکس تحویل داده می‌شوند.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">مشاوره تخصصی رایگان</h3>
          <p className="text-xs text-slate-500 leading-relaxed text-justify">
            انتخاب اشتباه قطعه موجب اتلاف وقت و هزینه خریدار می‌شود. کارشناسان پشتیبانی فنی esyadak پیش از
            ثبت سفارش، شماره شاسی و مدل اتومبیل شما را به صورت دقیق بررسی می‌نمایند.
          </p>
        </div>
      </div>

      {/* Story text */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
        <h2 className="text-base font-bold text-slate-900">چرا خریداران به esyadak اعتماد دارند؟</h2>
        <p>
          فروشگاه آنلاین esyadak با پشتوانه بیش از یک دهه تجربه حضور در بازار فیزیکی قطعات خودرو،
          امروز بستری مدرن برای مالکان انواع خودروهای داخلی (پژو ۲۰۶، ۲۰۷، پارس، دنا، شاهین، تارا،
          سمند، کوییک) و خودروهای محبوب وارداتی و مونتاژی (هیوندای سانتافه و سوناتا، کیا سراتو و
          اسپورتیج، رنو ساندرو و L90، و خودروهای چینی جک و چری) فراهم آورده است.
        </p>
        <p>
          ما در esyadak معتقدیم خرید قطعه یدکی خودرو نباید با شک و تردید در مورد تقلبی بودن همراه باشد. از این رو،
          تمام قطعات با ۷ روز ضمانت بازگشت بی‌قیدوشرط وجه و فاکتور رسمی عرضه می‌شوند.
        </p>
      </div>

      {/* CTA strip */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-base font-bold text-white">نیاز به راهنمایی در انتخاب قطعه دارید؟</h3>
          <p className="text-xs text-slate-400 mt-1">
            همین حالا با خط ویژه پشتیبانی esyadak تماس بگیرید یا در سامانه تیکت پیام بگذارید.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/contact"
            className="py-2.5 px-5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-colors"
          >
            تماس با ما
          </Link>
          <Link
            href="/shop"
            className="py-2.5 px-5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-colors"
          >
            ورود به فروشگاه esyadak
          </Link>
        </div>
      </div>
    </div>
  );
}
