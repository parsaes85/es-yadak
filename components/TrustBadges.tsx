'use client';

import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones, Award } from 'lucide-react';

export default function TrustBadges() {
  const items = [
    {
      icon: ShieldCheck,
      title: 'ضمانت اصالت ۱۰۰٪ کالا',
      desc: 'فروش مستقیم قطعات اورجینال با هولوگرام معتبر شرکتی',
    },
    {
      icon: Truck,
      title: 'ارسال سریع به سراسر کشور',
      desc: 'تحویل ۳ ساعته در تهران و ارسال فوری با تیپاکس به شهرستان‌ها',
    },
    {
      icon: RotateCcw,
      title: '۷ روز ضمانت بازگشت وجه',
      desc: 'امکان عودت و تعویض قطعه در صورت عدم تطابق یا نقص فنی',
    },
    {
      icon: Headphones,
      title: 'مشاوره رایگان مکانیک',
      desc: 'پاسخگویی کارشناسان فنی خودرو برای انتخاب قطعه دقیق',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="flex items-start gap-3.5 p-2">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200/60 text-amber-600 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
