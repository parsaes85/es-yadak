'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import {
  X,
  ChevronDown,
  User,
  ShoppingBag,
  Heart,
  Wallet,
  Phone,
  FileText,
  HelpCircle,
  Car,
  ChevronLeft,
  Cpu,
  Disc,
  SlidersHorizontal,
  Zap,
  Droplet,
} from 'lucide-react';
import { formatPrice } from '@/lib/formatters';

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu,
  Disc,
  SlidersHorizontal,
  Zap,
  Droplet,
  Car,
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { categories, user, walletBalance, cartCount, wishlist, setAuthModalOpen } = useApp();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-0 bottom-0 right-0 left-0 h-dvh min-h-screen w-full z-50 lg:hidden flex overflow-hidden">
      {/* Backdrop - Full viewport height blur */}
      <div
        className="fixed inset-0 top-0 bottom-0 right-0 left-0 h-dvh min-h-screen w-full bg-slate-950/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container - Full viewport height (h-dvh h-screen) */}
      <div className="relative w-4/5 max-w-xs sm:max-w-sm bg-white h-dvh min-h-screen shadow-2xl flex flex-col z-10 overflow-hidden">
        {/* Header - Fixed top */}
        <div className="shrink-0 p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shrink-0">
              <Image
                src="/assets/esyadak_logo.jpg"
                alt="لوگو ای‌اس یدک"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-black text-base block text-white leading-none">ای‌اس یدک</span>
              <span className="text-[10px] text-slate-300 block mt-1">مرجع تخصصی قطعات خودرو</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
            aria-label="بستن منو"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card Section - Fixed subheader */}
        <div className="shrink-0 p-4 bg-slate-50 border-b border-slate-200/70">
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 font-bold text-sm shrink-0">
                  {user.name.slice(0, 1)}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block truncate max-w-[130px]">{user.name}</span>
                  <span className="text-[11px] text-slate-500 font-mono block">{user.phone}</span>
                </div>
              </div>
              <Link
                href="/profile"
                onClick={onClose}
                className="text-xs text-amber-600 font-bold hover:underline px-2.5 py-1 rounded-lg bg-amber-50"
              >
                پنل من
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>ورود یا ثبت‌نام در سایت</span>
            </Link>
          )}

          {user && (
            <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-amber-600" />
                موجودی کیف پول:
              </span>
              <span className="font-bold text-slate-900 tabular-nums">
                {formatPrice(walletBalance)}
              </span>
            </div>
          )}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Categories Section */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 block mb-2 px-1">
              دسته‌بندی‌های لوازم یدکی
            </span>
            <div className="space-y-1.5">
              {categories.map((cat) => {
                const IconComponent = ICON_MAP[cat.icon] || Cpu;
                const isExpanded = expandedCategory === cat.id;

                return (
                  <div key={cat.id} className="rounded-xl overflow-hidden border border-slate-200/80 bg-white">
                    <button
                      onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                      className="w-full flex items-center justify-between p-3 text-right text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <IconComponent className="w-4 h-4 text-amber-500" />
                        <span>{cat.name}</span>
                      </div>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-amber-600' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="bg-slate-50/70 p-2 space-y-1 border-t border-slate-100">
                        <Link
                          href={`/shop?category=${cat.id}`}
                          onClick={onClose}
                          className="block py-1.5 px-3 rounded-lg text-xs font-semibold text-amber-600 hover:bg-amber-100/50"
                        >
                          ← مشاهده همه قطعات {cat.name}
                        </Link>
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/shop?category=${cat.id}&sub=${sub.id}`}
                            onClick={onClose}
                            className="block py-1.5 px-3 rounded-lg text-xs text-slate-600 hover:text-slate-900 hover:bg-white transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="pt-2 border-t border-slate-100 space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 block px-1 mb-1">
              صفحات و خدمات
            </span>
            <Link
              href="/shop"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-slate-500" />
                <span>کاتالوگ کامل فروشگاه</span>
              </div>
              <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/blog"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-slate-500" />
                <span>وبلاگ و راهنمای فنی نگهداری</span>
              </div>
              <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-slate-500" />
                <span>درباره ای‌اس یدک</span>
              </div>
              <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-500" />
                <span>تماس با پشتیبانی و انبار</span>
              </div>
              <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Drawer Footer - Fixed bottom */}
        <div className="shrink-0 p-3 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-500">
          <span>تلفن مشاوره فنی: ۰۲۱-۸۸۹۹۰۰۱۱</span>
        </div>
      </div>
    </div>
  );
}
