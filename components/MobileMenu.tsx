'use client';

import React, { useState } from 'react';
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
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
              <span className="font-black text-sm block font-sans">esyadak</span>
              <span className="text-[10px] text-slate-300">ای‌اس یدک | مرجع تخصصی قطعات خودرو</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 bg-slate-50 border-b border-slate-200/70">
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 font-bold">
                  {user.name.slice(0, 1)}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">{user.name}</span>
                  <span className="text-[11px] text-slate-500 font-mono">{user.phone}</span>
                </div>
              </div>
              <Link
                href="/profile"
                onClick={onClose}
                className="text-xs text-amber-600 font-semibold hover:underline"
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

        {/* Categories Section */}
        <div className="p-4 flex-1">
          <span className="text-[11px] font-bold text-slate-400 block mb-2 px-1">
            دسته‌بندی‌های لوازم یدکی
          </span>
          <div className="space-y-1">
            {categories.map((cat) => {
              const IconComponent = ICON_MAP[cat.icon] || Cpu;
              const isExpanded = expandedCategory === cat.id;

              return (
                <div key={cat.id} className="rounded-xl overflow-hidden border border-slate-100">
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                    className="w-full flex items-center justify-between p-3 text-right text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent className="w-4 h-4 text-amber-500" />
                      <span>{cat.name}</span>
                    </div>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                        isExpanded ? 'rotate-180 text-amber-600' : ''
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="bg-slate-50/70 p-2 space-y-1 border-t border-slate-100">
                      <Link
                        href={`/shop?category=${cat.id}`}
                        onClick={onClose}
                        className="block py-1.5 px-3 rounded-lg text-xs font-medium text-amber-600 hover:bg-amber-100/50"
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

          {/* Quick Links */}
          <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 block px-1">
              صفحات و خدمات
            </span>
            <Link
              href="/shop"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100"
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
              className="flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100"
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
              className="flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100"
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-slate-500" />
                <span>درباره esyadak</span>
              </div>
              <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100"
            >
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-500" />
                <span>تماس با پشتیبانی و انبار</span>
              </div>
              <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Footer in Drawer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-500">
          <span>تلفن مشاوره فنی: ۰۲۱-۸۸۹۹۰۰۱۱</span>
        </div>
      </div>
    </div>
  );
}
