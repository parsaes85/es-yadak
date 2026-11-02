'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Cpu, Disc, SlidersHorizontal, Zap, Droplet, Car, ArrowLeft } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu,
  Disc,
  SlidersHorizontal,
  Zap,
  Droplet,
  Car,
};

export default function CategoryStrip() {
  const { categories, products } = useApp();

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            دسته‌بندی‌های تخصصی قطعات
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            دسترسی سریع و تفکیک‌شده به بخش‌های فنی خودرو
          </p>
        </div>
        <Link
          href="/shop"
          className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
        >
          <span>مشاهده کاتالوگ جامع</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || Cpu;
          const count = products.filter((p) => p.categoryId === cat.id).length;

          return (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className="group bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-amber-400 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 group-hover:bg-amber-500 text-amber-600 group-hover:text-slate-950 flex items-center justify-center transition-colors duration-300 mb-3 shadow-xs">
                <IconComponent className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
                {cat.name}
              </h3>
              <span className="text-[11px] text-slate-400 mt-1">
                {cat.subcategories.length} زیرگروه قطعه
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
