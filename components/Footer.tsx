'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Send,
  CheckCircle2,
  ChevronLeft,
} from 'lucide-react';

export default function Footer() {
  const { showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsSubscribed(true);
    showToast('ایمیل شما برای دریافت تخفیف‌های ویژه با موفقیت ثبت شد', 'success');
    setNewsletterEmail('');
    setTimeout(() => setIsSubscribed(false), 4000);
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-14 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & About (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-md shrink-0">
                <Image
                  src="/assets/esyadak_logo.jpg"
                  alt="لوگو فروشگاه ای‌اس یدک esyadak"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-black text-white block tracking-tight">ای‌اس یدک</span>
                <span className="text-xs text-slate-400">فروشگاه تخصصی لوازم یدکی خودرو</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed text-justify max-w-md">
              فروشگاه اینترنتی ای‌اس یدک به عنوان مرجع آنلاین تامین قطعات یدکی انواع خودروهای ایرانی (ایران‌خودرو و سایپا)
              و خودروهای وارداتی (هیوندای، کیا، رنو و چینی)، اصالت ۱۰۰٪ فیزیکی کلیه قطعات سیستم ترمز،
              موتوری، جلوبندی، تعلیق و مصرفی را با فاکتور رسمی و ضمانت ۷ روزه بازگشت وجه تضمین می‌نماید.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs font-bold text-white block mb-2">
                عضویت در خبرنامه و اطلاع از تخفیف‌های شگفت‌انگیز:
              </span>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="ایمیل خود را وارد کنید..."
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ثبت</span>
                </button>
              </form>
              {isSubscribed && (
                <span className="text-[11px] text-emerald-400 mt-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  ایمیل شما با موفقیت در خبرنامه ثبت گردید.
                </span>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white border-b border-slate-800 pb-2">
              دسترسی‌های سریع
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/shop" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>کاتالوگ کامل قطعات</span>
                </Link>
              </li>
              <li>
                <Link href="/shop?special=true" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>پیشنهادات شگفت‌انگیز</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>وبلاگ و راهنمای تعویض قطعه</span>
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>پیگیری سفارشات و تیکت‌ها</span>
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>ورود و ثبت‌نام حساب کاربری</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>درباره ای‌اس یدک</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service & Terms */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white border-b border-slate-800 pb-2">
              خدمات مشتریان
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/terms" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>قوانین ضمانت ۷ روزه بازگشت</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>شیوه‌ها و هزینه‌های ارسال</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>راهنمای استعلام اصالت قطعات</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>فرم تماس و ارسال انتقادات</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info & Certificates */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white border-b border-slate-800 pb-2">
              اطلاعات تماس و نمادها
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>تهران، خیابان چراغ برق (ملت)، مجتمع قطعات خودرو، واحد ۱۸</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>۰۲۱-۸۸۹۹۰۰۱۱ (پشتیبانی ۲۴ ساعته)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>شنبه تا پنجشنبه: ۸:۳۰ الی ۲۰:۰۰</span>
              </div>
            </div>

            {/* Trust symbols */}
            <div className="pt-2 flex gap-2">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 flex flex-col items-center justify-center text-center w-24">
                <ShieldCheck className="w-6 h-6 text-emerald-400 mb-1" />
                <span className="text-[10px] text-slate-300 font-semibold">اینماد الکترونیک</span>
                <span className="text-[8px] text-slate-500">پنج ستاره تایید</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 flex flex-col items-center justify-center text-center w-24">
                <Award className="w-6 h-6 text-amber-400 mb-1" />
                <span className="text-[10px] text-slate-300 font-semibold">ضمانت اصالت</span>
                <span className="text-[8px] text-slate-500">کد هولوگرام شرکتی</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© تمامی حقوق مادی و معنوی این وبسایت متعلق به فروشگاه لوازم یدکی ای‌اس یدک (esyadak.com) می‌باشد.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>esyadak.com</span>
            <span>·</span>
            <span>تضمین اصالت قطعات خودرو</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
