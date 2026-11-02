'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import {
  Calendar,
  Clock,
  User,
  ChevronLeft,
  Share2,
  ShieldCheck,
} from 'lucide-react';

interface BlogDetailClientProps {
  id: string;
}

export default function BlogDetailClient({ id }: BlogDetailClientProps) {
  const { blogPosts, showToast } = useApp();

  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">مقاله مورد نظر یافت نشد</h2>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-xs"
        >
          <span>بازگشت به مقالات وبلاگ</span>
        </Link>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('لینک مقاله در کلیپ‌بورد کپی شد', 'info');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-slate-700">
          خانه
        </Link>
        <ChevronLeft className="w-3 h-3" />
        <Link href="/blog" className="hover:text-slate-700">
          وبلاگ فنی
        </Link>
        <ChevronLeft className="w-3 h-3" />
        <span className="text-slate-700 font-bold truncate max-w-xs">{post.title}</span>
      </nav>

      {/* Main Article Card */}
      <article className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        {/* Category tag */}
        <div className="flex items-center justify-between">
          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full">
            {post.category}
          </span>
          <button
            onClick={handleShare}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            title="اشتراک گذاری مقاله"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
          {post.title}
        </h1>

        {/* Author & Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-100">
          <span className="flex items-center gap-1.5 font-semibold text-slate-700">
            <User className="w-4 h-4 text-amber-600" />
            <span>{post.author}</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>تاریخ انتشار: {post.date}</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>{post.readTime}</span>
          </span>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Excerpt Lead */}
        <div className="p-4 bg-amber-50/70 border-r-4 border-amber-500 rounded-xl text-xs sm:text-sm font-semibold text-amber-950 leading-relaxed text-justify">
          {post.excerpt}
        </div>

        {/* Article Body */}
        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify space-y-4 pt-2">
          {post.content.split('\n\n').map((para, idx) => {
            if (para.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-base font-bold text-slate-900 pt-4 pb-1">
                  {para.replace('### ', '')}
                </h3>
              );
            }
            if (para.startsWith('- ') || para.startsWith('۱. ') || para.startsWith('۲. ')) {
              return (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 my-2">
                  <p className="whitespace-pre-line">{para}</p>
                </div>
              );
            }
            return <p key={idx}>{para}</p>;
          })}
        </div>

        {/* Technical Safety Note */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex items-start gap-3 bg-slate-50 p-4 rounded-2xl">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>توصیه کارشناسان ای‌اس یدک:</strong> در صورت عدم تسلط بر امور فنی و مکانیکی خودرو،
            اکیداً پیشنهاد می‌شود تعویض قطعات حساس نظیر تسمه تایم، دیسک و لنت ترمز را به مکانیک مجرب
            دارای پروانه کسب بسپارید تا ایمنی خودرو حفظ گردد.
          </p>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="space-y-4 pt-4">
          <h3 className="text-base font-bold text-slate-900">سایر مقالات و راهنماهای مرتبط</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedPosts.map((r) => (
              <Link
                key={r.id}
                href={`/blog/${r.id}`}
                className="group bg-white p-4 rounded-2xl border border-slate-200 hover:border-amber-400 flex items-center gap-3 transition-all"
              >
                <div className="w-16 h-16 rounded-xl bg-slate-100 relative overflow-hidden shrink-0">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {r.title}
                  </h4>
                  <span className="text-[11px] text-slate-400 mt-1 block">{r.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
