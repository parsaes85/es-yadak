'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { ArrowLeft, TrendingUp } from 'lucide-react';

export default function BestSellers() {
  const { products } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  const bestSellers = products.filter((p) => p.isBestSeller);

  const displayedProducts =
    filterCategory === 'all'
      ? bestSellers
      : bestSellers.filter((p) => p.categoryId === filterCategory);

  const handleFilterClick = (cat: string) => {
    if (cat === filterCategory) return;
    setIsLoading(true);
    setFilterCategory(cat);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              پرفروش‌ترین قطعات یدکی خودرو
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            محبوب‌ترین قطعات با بیشترین رضایت فنی خریداران در ماه گذشته
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
          <button
            onClick={() => handleFilterClick('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 ${
              filterCategory === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            همه پرفروش‌ها
          </button>
          <button
            onClick={() => handleFilterClick('braking')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 ${
              filterCategory === 'braking'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ترمز و لنت
          </button>
          <button
            onClick={() => handleFilterClick('engine')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 ${
              filterCategory === 'engine'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            موتوری و تایم
          </button>
          <button
            onClick={() => handleFilterClick('consumables')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 ${
              filterCategory === 'consumables'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            روغن و فیلترها
          </button>
        </div>
      </div>

      {/* Grid with Skeleton loading support */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => <ProductSkeleton key={idx} />)
          : displayedProducts
              .slice(0, 4)
              .map((product) => <ProductCard key={product.id} product={product} />)}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-amber-600 bg-white border border-slate-200 hover:border-amber-400 px-5 py-2.5 rounded-xl shadow-xs transition-colors"
        >
          <span>مشاهده تمامی محصولات در کاتالوگ فروشگاه</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
