'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { BookOpen, Calendar, Clock, ArrowLeft, User } from 'lucide-react';

export default function HomeBlogSection() {
  const { blogPosts } = useApp();

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              آخرین مقالات و راهنماهای فنی خودرو
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            آموزش‌های کاربردی نگهداری ماشین، تشخیص عیوب قطعات و راهنمای خرید تخصصی
          </p>
        </div>

        <Link
          href="/blog"
          className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 self-start sm:self-auto"
        >
          <span>مشاهده همه مقالات وبلاگ</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogPosts.slice(0, 3).map((post) => (
          <article
            key={post.id}
            className="group bg-white rounded-3xl border border-slate-200/80 hover:border-amber-400/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image */}
              <Link
                href={`/blog/${post.id}`}
                className="block relative aspect-16/10 bg-slate-100 overflow-hidden"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-3 right-3 bg-slate-950/80 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md">
                  {post.category}
                </span>
              </Link>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{post.date}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <Link href={`/blog/${post.id}`}>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-xs text-slate-500 mt-2.5 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-slate-100 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                <User className="w-3 h-3 text-slate-400" />
                <span className="truncate max-w-[140px]">{post.author}</span>
              </span>
              <Link
                href={`/blog/${post.id}`}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                <span>مطالعه مقاله</span>
                <ArrowLeft className="w-3 h-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
