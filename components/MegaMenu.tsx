'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  ChevronDown,
  Cpu,
  Disc,
  SlidersHorizontal,
  Zap,
  Droplet,
  Car,
  Layers,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu,
  Disc,
  SlidersHorizontal,
  Zap,
  Droplet,
  Car,
};

export default function MegaMenu() {
  const { categories, carBrands } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0]?.id || 'engine');

  const activeCategory = categories.find((c) => c.id === activeCategoryId) || categories[0];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-slate-800 hover:text-amber-600 hover:bg-slate-100/80 text-sm font-semibold transition-colors"
      >
        <Layers className="w-4 h-4 text-amber-500" />
        <span>دسته‌بندی قطعات</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-amber-600' : ''
          }`}
        />
      </button>

      {/* Mega Menu Overlay Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-[820px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-12 min-h-[380px]">
            {/* Column 1: Main Category Vertical Tabs */}
            <div className="col-span-4 bg-slate-50/80 p-3 border-l border-slate-100 flex flex-col gap-1">
              <span className="text-[11px] font-bold text-slate-400 px-3 py-1">
                گروه‌های اصلی قطعات
              </span>
              {categories.map((cat) => {
                const IconComponent = ICON_MAP[cat.icon] || Cpu;
                const isActive = cat.id === activeCategoryId;
                return (
                  <button
                    key={cat.id}
                    onMouseEnter={() => setActiveCategoryId(cat.id)}
                    onClick={() => setActiveCategoryId(cat.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-right text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100/90 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent
                        className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-500'}`}
                      />
                      <span>{cat.name}</span>
                    </div>
                    <ArrowLeft
                      className={`w-3.5 h-3.5 transition-transform ${
                        isActive ? 'text-slate-950 -translate-x-1' : 'text-slate-300'
                      }`}
                    />
                  </button>
                );
              })}

              <div className="mt-auto p-3 bg-white rounded-xl border border-slate-200/60 shadow-sm text-xs">
                <div className="flex items-center gap-1.5 text-amber-600 font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>تضمین اصالت ۱۰۰٪</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  تمامی قطعات با لیبل اصالت کالا و گارانتی مرجوعی ۷ روزه عرضه می‌شوند.
                </p>
              </div>
            </div>

            {/* Column 2: Subcategories Grid */}
            <div className="col-span-8 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {activeCategory.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {activeCategory.description}
                    </p>
                  </div>
                  <Link
                    href={`/shop?category=${activeCategory.id}`}
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                  >
                    <span>مشاهده همه این گروه</span>
                    <ArrowLeft className="w-3 h-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {activeCategory.subcategories.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/shop?category=${activeCategory.id}&sub=${sub.id}`}
                      onClick={() => setIsOpen(false)}
                      className="p-3 rounded-xl border border-slate-100 hover:border-amber-400 hover:bg-amber-50/30 transition-all group"
                    >
                      <h4 className="text-xs font-semibold text-slate-800 group-hover:text-amber-600 transition-colors">
                        {sub.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        لوازم فابریک و ارتقایافته
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Car Brands shortcut strip */}
              <div className="pt-4 border-t border-slate-100 mt-6">
                <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                  دسترسی سریع بر اساس برند خودرو:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {carBrands.slice(0, 6).map((brand) => (
                    <Link
                      key={brand.id}
                      href={`/shop?brand=${brand.id}`}
                      onClick={() => setIsOpen(false)}
                      className="text-[11px] bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 px-2.5 py-1 rounded-lg transition-colors"
                    >
                      {brand.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
