'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import { formatPrice } from '@/lib/formatters';
import {
  Heart,
  ShoppingCart,
  Star,
  Check,
  Loader2,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdding || product.stockCount === 0) return;

    setIsAdding(true);
    setTimeout(() => {
      addToCart(product, 1);
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1800);
    }, 350);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-amber-400/80 p-3.5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative">
      {/* Top badges & Wishlist */}
      <div className="absolute top-5 right-5 left-5 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1">
          {product.discountPercent > 0 && (
            <span className="bg-rose-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-lg shadow-sm">
              %{product.discountPercent} تخفیف
            </span>
          )}
          {product.isSpecialOffer && (
            <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              پیشنهاد ویژه
            </span>
          )}
        </div>

        <button
          onClick={handleWishlistClick}
          className={`pointer-events-auto p-2 rounded-xl backdrop-blur-md transition-all ${
            inWishlist
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 hover:bg-white text-slate-400 hover:text-rose-500 shadow-xs'
          }`}
          title={inWishlist ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-600' : ''}`} />
        </button>
      </div>

      <div>
        {/* Product Image */}
        <Link
          href={`/product/${product.id}`}
          className="block relative w-full aspect-4/3 rounded-xl bg-slate-100 overflow-hidden mb-3"
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Brand & OEM */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 px-0.5">
          <span className="text-slate-600 font-medium">{product.brand}</span>
          <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">
            {product.sku}
          </span>
        </div>

        {/* Title */}
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
            {product.title}
          </h3>
        </Link>

        {/* Short Car Compatibility Hint */}
        <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1.5 line-clamp-1">
          <span className="text-amber-600 font-semibold shrink-0">مناسب:</span>
          <span className="truncate">{product.compatibleVehicles.slice(0, 2).join('، ')}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2">
          <div className="flex items-center text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
          </div>
          <span className="font-bold text-slate-800 tabular-nums">{product.rating}</span>
          <span className="text-slate-400">({product.reviewsCount} نظر)</span>
        </div>
      </div>

      {/* Pricing & Add to cart CTA */}
      <div className="pt-3.5 mt-3 border-t border-slate-100 space-y-2.5">
        <div className="flex items-baseline justify-between">
          <div className="text-[11px] text-slate-400">
            {product.discountPercent > 0 && (
              <span className="line-through tabular-nums block text-[11px]">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="text-left">
            <span className="text-sm sm:text-base font-extrabold text-slate-950 tabular-nums">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        {product.stockCount > 0 ? (
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              justAdded
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-slate-950 shadow-xs'
            }`}
          >
            {isAdding ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>در حال افزودن...</span>
              </>
            ) : justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>به سبد اضافه شد</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>افزودن به سبد</span>
              </>
            )}
          </button>
        ) : (
          <div className="w-full py-2.5 bg-slate-100 text-slate-400 text-xs font-semibold rounded-xl text-center flex items-center justify-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>ناموجود در انبار</span>
          </div>
        )}
      </div>
    </div>
  );
}
