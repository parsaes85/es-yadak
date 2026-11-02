'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Tag,
  ShieldCheck,
  Truck,
  Loader2,
} from 'lucide-react';
import { formatPrice } from '@/lib/formatters';

export default function CartDrawer() {
  const router = useRouter();
  const {
    isCartOpen,
    setIsCartOpen,
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

  if (!isCartOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-sm">سبد خرید شما</h3>
            <span className="text-xs bg-slate-800 text-amber-400 px-2 py-0.5 rounded-full font-mono">
              {cart.length} قلم
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Alert Bar */}
        {cart.length > 0 && (
          <div className="bg-amber-50/80 border-b border-amber-200/60 p-3 text-xs">
            {subtotal >= freeShippingThreshold ? (
              <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>تبریک! سفارش شما مشمول «ارسال رایگان اکسپرس» شد.</span>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between text-slate-700 mb-1.5">
                  <span className="text-[11px] flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-amber-600" />
                    تا ارسال رایگان:
                  </span>
                  <span className="font-bold text-amber-700 tabular-nums">
                    {formatPrice(remainingForFree)}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-amber-200/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-bold text-slate-700">سبد خرید شما خالی است</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                می‌توانید از طریق کاتالوگ فروشگاه، قطعات مناسب خودروی خود را انتخاب نمایید.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  router.push('/shop');
                }}
                className="mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-colors"
              >
                مشاهده کاتالوگ قطعات
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="p-3 rounded-2xl border border-slate-200/80 bg-white flex gap-3 shadow-xs hover:border-slate-300 transition-all"
              >
                <div className="w-20 h-20 rounded-xl bg-slate-100 border border-slate-200 relative overflow-hidden shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <Link
                        href={`/product/${item.product.id}`}
                        onClick={() => setIsCartOpen(false)}
                        className="text-xs font-bold text-slate-800 hover:text-amber-600 line-clamp-1"
                      >
                        {item.product.title}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-300 hover:text-rose-500 p-0.5 transition-colors"
                        title="حذف از سبد"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      برند: {item.product.brand} · کد: {item.product.sku}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-slate-800 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stockCount}
                        className="p-1 hover:bg-slate-200 text-slate-600 disabled:opacity-30 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-left">
                      <span className="text-xs font-extrabold text-slate-900 tabular-nums block">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Checkout & Summary Footer */}
        {cart.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200/80 space-y-3">
            {/* Coupon form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  placeholder="کد تخفیف (مثلاً YADAK10)"
                  className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 pr-8 focus:outline-none focus:border-amber-500 uppercase font-mono"
                />
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
              </div>
              <button
                type="submit"
                disabled={isApplying || !inputCoupon}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition-colors disabled:opacity-50 flex items-center gap-1"
              >
                {isApplying && <Loader2 className="w-3 h-3 animate-spin" />}
                <span>اعمال</span>
              </button>
            </form>

            {couponCode && (
              <div className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center justify-between">
                <span>کد تخفیف فعال: {couponCode}</span>
                <span className="font-bold tabular-nums">-{formatPrice(discountAmount)}</span>
              </div>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-1">
              <div className="flex justify-between">
                <span>مجموع اقلام:</span>
                <span className="tabular-nums font-semibold">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>تخفیف:</span>
                  <span className="tabular-nums font-semibold">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>هزینه ارسال:</span>
                <span className="tabular-nums font-semibold">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-600 font-bold">رایگان</span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>مبلغ نهایی قابل پرداخت:</span>
                <span className="tabular-nums text-amber-600">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  router.push('/checkout');
                }}
                className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-slate-950 font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>ادامه و ثبت نهایی سفارش</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>پرداخت امن و تضمین سلامت فیزیکی قطعات</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
