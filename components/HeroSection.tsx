'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShieldCheck, Wrench, CheckCircle2 } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] lg:items-stretch">
        {/* Text & CTAs (Span 7) */}
        <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-between z-10">
          <div className="space-y-4 max-w-xl">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 rounded-full text-xs text-amber-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>تامین‌کننده مستقیم قطعات اورجینال با هولوگرام شرکتی</span>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-white leading-tight tracking-tight">
              قطعات یدکی مطمئن،
              <span className="block text-amber-400 mt-1">حرکت بی‌دغدغه در هر جاده</span>
            </h1>

            {/* Subheading */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
              بزرگترین کاتالوگ آنلاین قطعات سیستم ترمز، موتور، جلوبندی و لوازم مصرفی خودروهای داخلی و
              وارداتی. ارسال سریع، مشاوره تخصصی مکانیک خودرو و تضمین ۷ روزه سلامت فیزیکی قطعات.
            </p>

            {/* Quick feature checklist */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>گارانتی تعویض بی قید و شرط</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>تطابق ۱۰۰٪ با شماره فنی شاسی</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ارسال اکسپرس همان روز در تهران</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>قیمت رقابتی بدون واسطه</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-8">
            <Link
              href="/shop"
              className="py-3 px-6 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <span>مشاهده کاتالوگ قطعات</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <Link
              href="/shop?special=true"
              className="py-3 px-5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition-colors flex items-center gap-2"
            >
              <span>پیشنهادات شگفت‌انگیز امروز</span>
            </Link>
          </div>
        </div>

        {/* Cinematic Imagery (Span 5) */}
        <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
          <Image
            src="/images/hero.jpg"
            alt="قطعات باکیفیت خودرو esyadak"
            fill
            priority
            className="object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient overlay to soften into the dark content */}
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
