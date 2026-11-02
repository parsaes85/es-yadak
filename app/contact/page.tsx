'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  MessageSquare,
  Building,
} from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      showToast('پیام شما با موفقیت دریافت شد؛ کارشناسان فنی با شما تماس خواهند گرفت', 'success');
      setName('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 700);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">تماس با کارشناسان esyadak</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          مشاوره رایگان خرید، استعلام موجودی انبار مرکزی esyadak و پیگیری مرسولات ارسالی
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards (Cols 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              اطلاعات دفاتر و انبارهای توزیع
            </h3>

            <div className="flex items-start gap-3.5 text-xs text-slate-600">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-slate-900 mb-0.5">انبار و دفتر مرکزی:</strong>
                <span>تهران، میدان بهارستان، خیابان ملت (چراغ برق)، پاساژ بزرگ یدک، پلاک ۱۸</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-xs text-slate-600">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-slate-900 mb-0.5">تلفن‌های واحد مشاوره و فروش:</strong>
                <span className="font-mono block">۰۲۱-۸۸۹۹۰۰۱۱ (۱۰ خط ویژه)</span>
                <span className="font-mono block text-slate-400 mt-0.5">۰۹۱۲-۹۸۷۶۵۴۳ (واتساپ و تلگرام)</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-xs text-slate-600">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-slate-900 mb-0.5">ساعات پاسخگویی و تحویل حضوری:</strong>
                <span>شنبه تا چهارشنبه: ۸:۳۰ صبح الی ۲۰:۰۰ شب</span>
                <span className="block text-slate-400">پنجشنبه‌ها: ۸:۳۰ صبح الی ۱۵:۰۰ بعد از ظهر</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-xs text-slate-600">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-slate-900 mb-0.5">مکاتبات سازمانی و ایمیل:</strong>
                <span className="font-mono">support@esyadak.com</span>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual Placeholder */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 p-6 text-white text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-md">
              <Building className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold">موقعیت مکانی انبار مرکزی در بازار ملت تهران</h4>
            <p className="text-[11px] text-slate-400">
              دسترسی سریع از طریق ایستگاه متروی ملت یا بهارستان (تحویل حضوری با هماهنگی قبلی)
            </p>
          </div>
        </div>

        {/* Contact Message Form (Cols 7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <MessageSquare className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">ارسال پیام یا درخواست استعلام قیمت</h2>
          </div>

          {isSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>پیام شما با موفقیت ثبت شد. کارشناسان فنی در سریع‌ترین زمان پاسخگو خواهند بود.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  نام و نام خانوادگی:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: آرش نادری"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  شماره تلفن همراه جهت تماس:
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                موضوع پیام یا قطعه درخواستی:
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="مثال: استعلام دیسک چرخ عقب سانتافه ۲۰۱۶ یا لنت ترمز تکستار"
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                متن پیام و توضیحات:
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="توضیحات تکمیلی یا شماره شاسی خودرو را در این بخش یادداشت فرمایید..."
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500 focus:bg-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="py-3 px-6 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>در حال ارسال پیام...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>ارسال پیام به واحد پشتیبانی</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
