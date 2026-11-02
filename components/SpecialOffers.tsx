'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import ProductCard from './ProductCard';
import { Flame, Clock, ArrowLeft } from 'lucide-react';
import { toPersianDigits } from '@/lib/formatters';

export default function SpecialOffers() {
  const { products } = useApp();

  // Simulated countdown timer (starts from 14h:32m:45s and ticks)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const specialProducts = products.filter((p) => p.isSpecialOffer).slice(0, 4);

  return (
    <section className="bg-gradient-to-l from-rose-900 via-rose-950 to-slate-950 text-white rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative ambient lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-rose-800/40">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/40">
              <Flame className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">
                  پیشنهادات شگفت‌انگیز esyadak
                </h2>
                <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  تخفیف محدود
                </span>
              </div>
              <p className="text-xs text-rose-200/80 mt-1">
                تخفیف ویژه دوره‌ای بر روی قطعات اصلی و استراتژیک خودرو
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-rose-700/40">
            <Clock className="w-4 h-4 text-rose-400" />
            <span className="text-xs text-rose-200 font-medium ml-1">زمان باقی‌مانده:</span>
            <div className="flex items-center gap-1 font-mono font-bold text-sm">
              <span className="bg-rose-600 text-white px-2 py-1 rounded-lg tabular-nums">
                {toPersianDigits(String(timeLeft.hours).padStart(2, '0'))}
              </span>
              <span>:</span>
              <span className="bg-rose-600 text-white px-2 py-1 rounded-lg tabular-nums">
                {toPersianDigits(String(timeLeft.minutes).padStart(2, '0'))}
              </span>
              <span>:</span>
              <span className="bg-rose-600 text-white px-2 py-1 rounded-lg tabular-nums">
                {toPersianDigits(String(timeLeft.seconds).padStart(2, '0'))}
              </span>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {specialProducts.map((p) => (
            <div key={p.id} className="text-slate-900">
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="mt-6 text-center">
          <Link
            href="/shop?special=true"
            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 px-6 py-2.5 rounded-xl shadow-lg transition-colors"
          >
            <span>مشاهده همه محصولات تخفیف‌دار</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
