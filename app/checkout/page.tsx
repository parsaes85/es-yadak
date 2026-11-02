'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { formatPrice } from '@/lib/formatters';
import { Order } from '@/lib/types';
import {
  Check,
  CreditCard,
  Truck,
  MapPin,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Wallet,
  Printer,
  ShoppingBag,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    user,
    subtotal,
    discountAmount,
    shippingFee,
    totalPrice,
    createOrder,
    walletBalance,
    payWithWallet,
    showToast,
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Step 1: Address info state
  const [name, setName] = useState(user?.name || 'علی محمدی');
  const [phone, setPhone] = useState(user?.phone || '۰۹۱۲۳۴۵۶۷۸۹');
  const [province, setProvince] = useState(user?.province || 'تهران');
  const [city, setCity] = useState(user?.city || 'تهران');
  const [address, setAddress] = useState(
    user?.address || 'خیابان شریعتی، بالاتر از پل رومی، پلاک ۴۲، واحد ۳'
  );
  const [postalCode, setPostalCode] = useState(user?.postalCode || '۱۹۶۴۸۱۲۳۴۵');

  // Step 2: Shipping method state
  const [shippingMethod, setShippingMethod] = useState<'express' | 'tipax' | 'post'>('tipax');

  // Step 3: Payment method state
  const [paymentMethod, setPaymentMethod] = useState<'shetab' | 'wallet'>('shetab');

  // If no items in cart and haven't completed order yet
  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto space-y-4 my-8">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">سبد خرید شما خالی است</h2>
        <p className="text-xs text-slate-500">
          برای دسترسی به تسویه حساب، ابتدا باید کالایی را به سبد خرید اضافه نمایید.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-xs"
        >
          <span>مشاهده فروشگاه</span>
        </Link>
      </div>
    );
  }

  // Handle final payment
  const handleFinalizeOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      if (paymentMethod === 'wallet') {
        const paid = payWithWallet(totalPrice);
        if (!paid) {
          setIsProcessing(false);
          return;
        }
      }

      const order = createOrder({
        customerInfo: {
          name,
          phone,
          province,
          city,
          address,
          postalCode,
        },
        shippingMethod:
          shippingMethod === 'express'
            ? 'پیک موتوری فوری (ویژه تهران)'
            : shippingMethod === 'tipax'
            ? 'ارسال اکسپرس تیپاکس'
            : 'پست پیشتاز جمهوری اسلامی',
        paymentMethod:
          paymentMethod === 'shetab'
            ? 'درگاه آنلاین شاپرک (بانک سامان)'
            : 'پرداخت آنی از کیف پول اعتباری',
      });

      setCompletedOrder(order);
      setStep(4);
      setIsProcessing(false);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Step Stepper Indicator */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 right-12 left-12 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />

          {/* Step 1 */}
          <div className="flex flex-col items-center gap-1.5 relative z-10">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                step >= 1 ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-100 text-slate-400'
              }`}
            >
              {step > 1 ? <Check className="w-4 h-4" /> : '۱'}
            </div>
            <span className="text-[11px] font-bold text-slate-800">آدرس تحویل</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-1.5 relative z-10">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                step >= 2 ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-100 text-slate-400'
              }`}
            >
              {step > 2 ? <Check className="w-4 h-4" /> : '۲'}
            </div>
            <span className="text-[11px] font-bold text-slate-800">شیوه ارسال</span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-1.5 relative z-10">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                step >= 3 ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-100 text-slate-400'
              }`}
            >
              {step > 3 ? <Check className="w-4 h-4" /> : '۳'}
            </div>
            <span className="text-[11px] font-bold text-slate-800">پرداخت فاکتور</span>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center gap-1.5 relative z-10">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                step === 4 ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-400'
              }`}
            >
              <Check className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-slate-800">فاکتور نهایی</span>
          </div>
        </div>
      </div>

      {/* STEP 1: Address Details */}
      {step === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <MapPin className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">مشخصات گیرنده و آدرس ارسال قطعه</h2>
          </div>

          {!user && (
            <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-center justify-between text-xs">
              <span className="text-slate-700">
                قبلاً در esyadak حساب دارید؟ جهت تکمیل خودکار اطلاعات و پرداخت با کیف پول وارد شوید:
              </span>
              <Link
                href="/login?redirect=/checkout"
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition-colors shrink-0"
              >
                ورود به حساب
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                نام و نام خانوادگی تحویل‌گیرنده:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                شماره تلفن همراه (جهت هماهنگی پیک):
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">استان:</label>
              <input
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">شهر:</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500 focus:bg-white"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                نشانی دقیق پستی (خیابان، کوچه، پلاک، زنگ یا تعمیرگاه مقصد):
              </label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">کد پستی ۱۰ رقمی:</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                required
              />
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center border-t border-slate-100">
            <Link href="/cart" className="text-xs text-slate-500 hover:text-slate-800">
              ← بازگشت به سبد خرید
            </Link>
            <button
              onClick={() => {
                if (!name || !phone || !address) {
                  showToast('لطفاً فیلدهای ضروری آدرس را پر نمایید', 'error');
                  return;
                }
                setStep(2);
              }}
              className="py-3 px-6 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>مرحله بعد: شیوه ارسال</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Shipping Method */}
      {step === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Truck className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">انتخاب روش حمل و زمان ارسال</h2>
          </div>

          <div className="space-y-3">
            {/* Option 1: Tipax */}
            <label
              className={`flex items-start justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                shippingMethod === 'tipax'
                  ? 'border-amber-500 bg-amber-50/40 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === 'tipax'}
                  onChange={() => setShippingMethod('tipax')}
                  className="mt-1 text-amber-500 focus:ring-amber-500"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    تیپاکس اکسپرس (سراسر کشور - تحویل درب منزل)
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    بسته‌بندی ایمن ضدضربه، زمان تحویل ۲۴ الی ۴۸ ساعت کاری با کد رهگیری پیامکی
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-700">
                {shippingFee === 0 ? 'رایگان' : formatPrice(shippingFee)}
              </span>
            </label>

            {/* Option 2: Express Courier */}
            <label
              className={`flex items-start justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                shippingMethod === 'express'
                  ? 'border-amber-500 bg-amber-50/40 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === 'express'}
                  onChange={() => setShippingMethod('express')}
                  className="mt-1 text-amber-500 focus:ring-amber-500"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    پیک فوری موتوری ۲ الی ۳ ساعته (ویژه تهران و حومه)
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    ارسال مستقیم از انبار مرکزی ملت به محل تعمیرگاه یا منزل شما
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-700">
                {shippingFee === 0 ? 'رایگان' : formatPrice(shippingFee)}
              </span>
            </label>

            {/* Option 3: Post */}
            <label
              className={`flex items-start justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                shippingMethod === 'post'
                  ? 'border-amber-500 bg-amber-50/40 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === 'post'}
                  onChange={() => setShippingMethod('post')}
                  className="mt-1 text-amber-500 focus:ring-amber-500"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    پست پیشتاز جمهوری اسلامی ایران
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    مناسب برای روستاها و شهرستان‌های دورافتاده (۳ الی ۴ روز کاری)
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-700">
                {shippingFee === 0 ? 'رایگان' : formatPrice(shippingFee)}
              </span>
            </label>
          </div>

          <div className="pt-4 flex justify-between items-center border-t border-slate-100">
            <button
              onClick={() => setStep(1)}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              → ویرایش آدرس
            </button>
            <button
              onClick={() => setStep(3)}
              className="py-3 px-6 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>مرحله بعد: انتخاب روش پرداخت</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Payment Method & Review */}
      {step === 3 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <CreditCard className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">روش پرداخت و تایید نهایی</h2>
          </div>

          {/* Payment options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Option A: Online Gateway */}
            <label
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                paymentMethod === 'shetab'
                  ? 'border-amber-500 bg-amber-50/40 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'shetab'}
                  onChange={() => setPaymentMethod('shetab')}
                  className="mt-1 text-amber-500 focus:ring-amber-500"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-amber-600" />
                    درگاه پرداخت آنلاین شتاب
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    پرداخت ایمن از طریق کلیه کارت‌های عضو شبکه شتاب با رمز پویا
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold mt-3">
                تاییدیه شاپرک / درگاه بانک سامان
              </span>
            </label>

            {/* Option B: Wallet Balance */}
            <label
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                paymentMethod === 'wallet'
                  ? 'border-amber-500 bg-amber-50/40 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'wallet'}
                  onChange={() => setPaymentMethod('wallet')}
                  className="mt-1 text-amber-500 focus:ring-amber-500"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Wallet className="w-4 h-4 text-amber-600" />
                    پرداخت از کیف پول اعتباری
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    کسر آنی بدون نیاز به رمز دوم و کارمزد بانکی
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">موجودی شما:</span>
                <span
                  className={`font-bold tabular-nums ${
                    walletBalance >= totalPrice ? 'text-emerald-700' : 'text-rose-600'
                  }`}
                >
                  {formatPrice(walletBalance)}
                </span>
              </div>
            </label>
          </div>

          {paymentMethod === 'wallet' && walletBalance < totalPrice && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                موجودی کیف پول شما کافی نیست. لطفاً گزینه درگاه شتاب را انتخاب فرمایید یا در پنل
                کاربری کیف پول خود را شارژ نمایید.
              </span>
            </div>
          )}

          {/* Final invoice summary box */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 mb-2">خلاصه هزینه نهایی:</h4>
            <div className="flex justify-between text-slate-600">
              <span>جمع قیمت کالاها:</span>
              <span className="tabular-nums font-semibold">{formatPrice(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>تخفیف اعمال‌شده:</span>
                <span className="tabular-nums font-bold">-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>هزینه حمل و نقل:</span>
              <span className="tabular-nums font-semibold">
                {shippingFee === 0 ? 'رایگان' : formatPrice(shippingFee)}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
              <span>مبلغ نهایی فاکتور:</span>
              <span className="tabular-nums text-amber-600">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center border-t border-slate-100">
            <button
              onClick={() => setStep(2)}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              → بازگشت به مرحله قبل
            </button>

            <button
              onClick={handleFinalizeOrder}
              disabled={isProcessing || (paymentMethod === 'wallet' && walletBalance < totalPrice)}
              className="py-3.5 px-8 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>در حال برقراری ارتباط و صدور فاکتور...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>پرداخت و ثبت نهایی سفارش</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Official Final Invoice Receipt */}
      {step === 4 && completedOrder && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-lg space-y-8 animate-in fade-in duration-300">
          {/* Success Banner */}
          <div className="text-center space-y-2 pb-6 border-b border-slate-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-slate-900">سفارش شما با موفقیت ثبت و تایید گردید</h2>
            <p className="text-xs text-slate-500">
              فاکتور رسمی صادر شد و پیامک تایید سفارش به شماره {completedOrder.customerInfo.phone} ارسال
              گردید.
            </p>
          </div>

          {/* Official Invoice Sheet */}
          <div className="p-6 bg-slate-50/80 border border-slate-200 rounded-2xl space-y-6">
            {/* Invoice Top Meta */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-300 bg-slate-950 shrink-0">
                  <Image
                    src="/assets/esyadak_logo.jpg"
                    alt="لوگو ای‌اس یدک"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-base text-slate-900">فروشگاه لوازم یدکی خودرو ای‌اس یدک (esyadak.com)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                      وضعیت: {completedOrder.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 mt-0.5 block">
                    کد ملی شرکت: ۱۰۱۰۳۴۸۹۱۰۰ · شماره ثبت: ۵۴۸۹۲
                  </span>
                </div>
              </div>

              <div className="text-left text-xs text-slate-600 space-y-1">
                <div>
                  شماره سفارش: <strong className="font-mono text-slate-900">{completedOrder.id}</strong>
                </div>
                <div>
                  کد رهگیری پستی:{' '}
                  <strong className="font-mono text-amber-700">{completedOrder.trackingCode}</strong>
                </div>
                <div>تاریخ ثبت: {completedOrder.date}</div>
              </div>
            </div>

            {/* Receiver & Shipping Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div>
                <span className="text-slate-400 block mb-0.5">تحویل‌گیرنده:</span>
                <span className="font-bold">{completedOrder.customerInfo.name}</span> (
                {completedOrder.customerInfo.phone})
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">روش ارسال و پرداخت:</span>
                <span className="font-bold">{completedOrder.shippingMethod}</span> ·{' '}
                <span>{completedOrder.paymentMethod}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-400 block mb-0.5">آدرس مقصد:</span>
                <span>
                  {completedOrder.customerInfo.province}، {completedOrder.customerInfo.city}،{' '}
                  {completedOrder.customerInfo.address} (کد پستی:{' '}
                  <span className="font-mono">{completedOrder.customerInfo.postalCode}</span>)
                </span>
              </div>
            </div>

            {/* Invoice Items Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-xs text-right">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">ردیف</th>
                    <th className="p-3">شرح قطعه یدکی</th>
                    <th className="p-3">برند / کد OEM</th>
                    <th className="p-3 text-center">تعداد</th>
                    <th className="p-3 text-left">مبلغ واحد</th>
                    <th className="p-3 text-left">مبلغ کل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {completedOrder.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-3 text-slate-400 font-mono">{idx + 1}</td>
                      <td className="p-3 font-semibold text-slate-900">{item.product.title}</td>
                      <td className="p-3 text-slate-500 font-mono text-[11px]">
                        {item.product.brand} ({item.product.sku})
                      </td>
                      <td className="p-3 text-center font-bold font-mono">{item.quantity}</td>
                      <td className="p-3 text-left font-mono">{formatPrice(item.product.price)}</td>
                      <td className="p-3 text-left font-bold font-mono">
                        {formatPrice(item.product.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 font-bold border-t border-slate-200 text-slate-800">
                  <tr>
                    <td colSpan={5} className="p-3 text-left">
                      جمع اقلام:
                    </td>
                    <td className="p-3 text-left font-mono">{formatPrice(completedOrder.subtotal)}</td>
                  </tr>
                  {completedOrder.discount > 0 && (
                    <tr className="text-emerald-700">
                      <td colSpan={5} className="p-3 text-left">
                        مجموع تخفیف:
                      </td>
                      <td className="p-3 text-left font-mono">-{formatPrice(completedOrder.discount)}</td>
                    </tr>
                  )}
                  <tr>
                    <td colSpan={5} className="p-3 text-left">
                      هزینه حمل و بسته‌بندی:
                    </td>
                    <td className="p-3 text-left font-mono">
                      {completedOrder.shippingFee === 0 ? 'رایگان' : formatPrice(completedOrder.shippingFee)}
                    </td>
                  </tr>
                  <tr className="text-sm text-slate-950 bg-amber-50">
                    <td colSpan={5} className="p-3.5 text-left font-black">
                      مبلغ نهایی پرداخت شده:
                    </td>
                    <td className="p-3.5 text-left font-black text-amber-700 font-mono">
                      {formatPrice(completedOrder.total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>چاپ فاکتور رسمی</span>
            </button>

            <div className="flex gap-2">
              <Link
                href="/profile"
                className="py-2.5 px-5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                مشاهده در پنل کاربری و رهگیری
              </Link>
              <Link
                href="/"
                className="py-2.5 px-5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                بازگشت به صفحه اصلی
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
