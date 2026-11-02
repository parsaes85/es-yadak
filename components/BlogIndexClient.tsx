'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { BookOpen, Calendar, Clock, User, ArrowLeft, Search } from 'lucide-react';

export default function BlogIndexClient() {
  const { blogPosts } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'همه مقالات' },
    { id: 'راهنمای فنی و نگهداری', label: 'راهنمای فنی و نگهداری' },
    { id: 'سیستم ترمز و ایمنی', label: 'سیستم ترمز و ایمنی' },
    { id: 'نگهداری و روغن‌ها', label: 'روغن و فیلترها' },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-500" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              وبلاگ و راهنمای تخصصی نگهداری خودرو
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            مقالات معتبر مهندسی خودرو، زمان‌بندی تعویض قطعات مصرفی و راهکارهای افزایش طول عمر پیشرانه
          </p>
        </div>

        {/* Search input in blog */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در مقالات فنی..."
            className="w-full text-xs bg-white border border-slate-200 rounded-xl py-2.5 pr-9 pl-3 focus:outline-none focus:border-amber-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors shrink-0 ${
              selectedCategory === c.id
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="group bg-white rounded-3xl border border-slate-200/80 hover:border-amber-400/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
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

              <div className="p-5">
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
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
                  <h2 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-xs text-slate-500 mt-2.5 line-clamp-3 leading-relaxed text-justify">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
              <span className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                <User className="w-3 h-3 text-slate-400" />
                <span className="truncate max-w-[140px]">{post.author}</span>
              </span>
              <Link
                href={`/blog/${post.id}`}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                <span>مطالعه مقاله</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
