'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { formatPrice } from '@/lib/formatters';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Tag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Loader2,
} from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    subtotal,
    discountAmount,
    shippingFee,
    totalPrice,
    couponCode,
    applyCoupon,
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    setIsApplying(true);
    setTimeout(() => {
      applyCoupon(inputCoupon);
      setIsApplying(false);
      setInputCoupon('');
    }, 400);
  };

  const freeShippingThreshold = 1500000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto space-y-4 my-8">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">سبد خرید شما در حال حاضر خالی است</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          می‌توانید با استفاده از فیلتر انتخاب خودرو یا کاتالوگ فروشگاه، قطعات مورد نظر اتومبیل خود را
          به سبد خرید اضافه نمایید.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
        >
          <span>رفتن به فروشگاه قطعات</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-black text-slate-900">سبد خرید قطعات خودرو</h1>
          <p className="text-xs text-slate-500 mt-1">
            بررسی اقلام انتخابی و محاسبه هزینه‌های ارسال و تخفیف‌ها
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>خالی کردن سبد</span>
        </button>
      </div>

      {/* Free Shipping Alert */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-xs">
        {subtotal >= freeShippingThreshold ? (
          <div className="flex items-center gap-2 text-emerald-800 font-bold">
            <Truck className="w-5 h-5 text-emerald-600" />
            <span>تبریک! سفارش شما به سقف ارسال رایگان رسید و هیچ هزینه ارسالی دریافت نمی‌گردد.</span>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-1.5 font-medium">
                <Truck className="w-4 h-4 text-amber-600" />
                با افزودن{' '}
                <strong className="text-amber-700 tabular-nums">
                  {formatPrice(remainingForFree)}
                </strong>{' '}
                دیگر به سبد، هزینه ارسال رایگان خواهد شد.
              </span>
              <span className="font-bold text-amber-600 font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-amber-200/70 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Cart Grid: Items (8 cols) + Summary (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List (Cols 8) */}
        <div className="lg:col-span-8 space-y-3">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-xs hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-slate-100 border border-slate-200 relative overflow-hidden shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 block">
                    {item.product.brand} · کد: {item.product.sku}
                  </span>
                  <Link
                    href={`/product/${item.product.id}`}
                    className="text-xs sm:text-sm font-bold text-slate-900 hover:text-amber-600 line-clamp-1"
                  >
                    {item.product.title}
                  </Link>
                  <span className="text-[11px] text-slate-500 block">
                    قیمت واحد: {formatPrice(item.product.price)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                {/* Quantity */}
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    className="p-1.5 hover:bg-slate-200 text-slate-600 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-slate-900 tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    disabled={item.quantity >= item.product.stockCount}
                    className="p-1.5 hover:bg-slate-200 text-slate-600 disabled:opacity-30 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Total Item Price */}
                <div className="text-left min-w-[120px]">
                  <span className="text-sm font-black text-slate-950 tabular-nums block">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="حذف کالا"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card (Cols 4) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5 lg:sticky lg:top-24">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            خلاصه فاکتور سفارش
          </h3>

          {/* Coupon Form */}
          <form onSubmit={handleApplyCoupon} className="space-y-2">
            <label className="block text-[11px] font-semibold text-slate-600">
              کد تخفیف دارید؟
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  placeholder="مثال: YADAK10 یا NOROOZ"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 pr-8 focus:outline-none focus:border-amber-500 uppercase font-mono"
                />
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
              </div>
              <button
                type="submit"
                disabled={isApplying || !inputCoupon}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center gap-1"
              >
                {isApplying && <Loader2 className="w-3 h-3 animate-spin" />}
                <span>اعمال کد</span>
              </button>
            </div>

            {couponCode && (
              <div className="text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl flex items-center justify-between">
                <span>کد فعال: {couponCode}</span>
                <span className="font-bold tabular-nums">-{formatPrice(discountAmount)}</span>
              </div>
            )}
          </form>

          {/* Summary Breakdown */}
          <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
            <div className="flex justify-between">
              <span>قیمت کالاها ({cart.length} قلم):</span>
              <span className="tabular-nums font-semibold text-slate-900">
                {formatPrice(subtotal)}
              </span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>سود شما از خرید:</span>
                <span className="tabular-nums font-bold">-{formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>هزینه بسته‌بندی و ارسال:</span>
              <span className="tabular-nums font-semibold text-slate-900">
                {shippingFee === 0 ? (
                  <span className="text-emerald-600 font-bold">رایگان</span>
                ) : (
                  formatPrice(shippingFee)
                )}
              </span>
            </div>

            <div className="flex justify-between text-sm font-black text-slate-900 pt-3 border-t border-slate-200">
              <span>مبلغ نهایی قابل پرداخت:</span>
              <span className="tabular-nums text-amber-600">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            onClick={() => router.push('/checkout')}
            className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-slate-950 font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>ادامه فرآیند خرید و تسویه حساب</span>
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ضمانت اصالت و سلامت فیزیکی قطعات</span>
          </div>
        </div>
      </div>
    </div>
  );
}
