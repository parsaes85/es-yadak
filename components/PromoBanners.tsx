'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Sparkles, Disc, Wrench } from 'lucide-react';

export default function PromoBanners() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Banner 1: Brake Systems */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between min-h-[220px] group">
        <div className="absolute inset-0 z-0 opacity-40 group-hover:scale-105 transition-transform duration-700">
          <Image
            src="/images/brake_disc.jpg"
            alt="دیسک و لنت ترمز برمبو و تکستار"
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-1" />

        <div className="relative z-10 max-w-xs space-y-2">
          <span className="text-[11px] font-bold text-amber-400 bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
            <Disc className="w-3.5 h-3.5" />
            سیستم ترمز و ایمنی
          </span>
          <h3 className="text-lg sm:text-xl font-black text-white">
            دیسک و لنت‌های اورجینال برمبو و تکستار
          </h3>
          <p className="text-xs text-slate-300">
            ترمزگیری بدون سوت و لرزش با آلیاژ ضدحرارت و فرمولاسیون سرامیکی
          </p>
        </div>

        <div className="relative z-10 pt-4">
          <Link
            href="/shop?category=braking"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 group-hover:translate-x-1 transition-all"
          >
            <span>مشاهده و خرید قطعات ترمز</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Banner 2: Engine Timing & Components */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between min-h-[220px] group">
        <div className="absolute inset-0 z-0 opacity-40 group-hover:scale-105 transition-transform duration-700">
          <Image
            src="/images/engine_parts.jpg"
            alt="کیت تسمه تایم و قطعات موتوری"
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-1" />

        <div className="relative z-10 max-w-xs space-y-2">
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5" />
            قطعات پیشرانه و موتور
          </span>
          <h3 className="text-lg sm:text-xl font-black text-white">
            کیت کامل تسمه تایم و شمع‌های ژاپنی
          </h3>
          <p className="text-xs text-slate-300">
            ضمانت کارکرد ۸۰,۰۰۰ کیلومتر تسمه کنتیننتال و شمع‌های سوزنی NGK
          </p>
        </div>

        <div className="relative z-10 pt-4">
          <Link
            href="/shop?category=engine"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 group-hover:translate-x-1 transition-all"
          >
            <span>مشاهده و خرید قطعات موتوری</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
