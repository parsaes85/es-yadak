'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import SmartSearchBar from './SmartSearchBar';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import {
  ShoppingCart,
  Heart,
  User,
  Menu,
  Phone,
  Truck,
  ShieldCheck,
  Wallet,
  Sparkles,
} from 'lucide-react';
import { formatPrice } from '@/lib/formatters';

export default function Header() {
  const pathname = usePathname();
  const { cartCount, wishlist, user, walletBalance, setIsCartOpen, setAuthModalOpen } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'صفحه اصلی', href: '/' },
    { label: 'فروشگاه قطعات', href: '/shop' },
    { label: 'وبلاگ و مقالات فنی', href: '/blog' },
    { label: 'درباره ما', href: '/about' },
    { label: 'تماس با ما', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* 1. Top Announcement Bar */}
      <div className="bg-slate-950 text-white text-[11px] py-1.5 px-3 sm:px-4 border-b border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 truncate">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium truncate">
              <Truck className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">ارسال رایگان سفارش‌های بالای ۱,۵۰۰,۰۰۰ تومان به سراسر کشور</span>
            </span>
            <span className="hidden md:inline-block text-slate-700">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>تضمین اصالت فیزیکی تمامی قطعات</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-300 shrink-0 text-[10px] sm:text-[11px]">
            <span className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3 h-3 text-amber-400 shrink-0" />
              <span>مشاوره و پشتیبانی: ۰۲۱-۸۸۹۹۰۰۱۱</span>
            </span>
            {user && (
              <span className="hidden lg:flex items-center gap-1.5 text-amber-300">
                <Wallet className="w-3 h-3 shrink-0" />
                <span>اعتبار کیف پول: {formatPrice(walletBalance)}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Middle Bar: Brand, Search, User, Cart */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Side (in RTL, Right side): Hamburger & Brand Wordmark */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors"
            aria-label="منوی موبایل"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm group-hover:scale-105 transition-all duration-200 border border-slate-800 bg-slate-950 shrink-0">
              <Image
                src="/assets/esyadak_logo.jpg"
                alt="لوگو فروشگاه ای‌اس یدک esyadak"
                width={44}
                height={44}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-none">
                ای‌اس یدک
              </span>
              <span className="hidden sm:block text-[10px] text-slate-500 font-semibold leading-tight mt-0.5">
                مرجع تخصصی قطعات خودرو
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Smart Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-2">
          <SmartSearchBar />
        </div>

        {/* Right Side (in RTL, Left side): Wishlist, User, Cart */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Wishlist Icon */}
          <Link
            href="/shop?wishlist=true"
            className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors shrink-0 relative"
            title="علاقه‌مندی‌ها"
          >
            <Heart className="w-5 h-5 text-slate-700" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums shadow-xs">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* User Profile Button - Exact h-10 height matching Cart button */}
          {user ? (
            <Link
              href="/profile"
              className="h-10 flex items-center gap-2 px-3 sm:px-3.5 rounded-xl bg-slate-100 hover:bg-amber-100/60 border border-slate-200/80 transition-colors shrink-0 shadow-2xs"
            >
              <div className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
                {user.name.slice(0, 1)}
              </div>
              <span className="hidden sm:inline-block text-xs font-bold text-slate-800 max-w-[100px] truncate leading-none">
                {user.name}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="h-10 flex items-center gap-1.5 px-3 sm:px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs shrink-0"
            >
              <User className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="hidden sm:inline-block">ورود / عضویت</span>
            </Link>
          )}

          {/* Cart Trigger Button - Exact h-10 height */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="h-10 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-extrabold text-xs shadow-md transition-all relative shrink-0"
          >
            <ShoppingCart className="w-4 h-4 shrink-0" />
            <span className="hidden xs:inline-block">سبد خرید</span>
            <span className="w-5 h-5 rounded-full bg-slate-950 text-amber-400 text-[11px] font-mono flex items-center justify-center tabular-nums shrink-0">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar in 2nd row */}
      <div className="md:hidden px-3 sm:px-4 pb-2.5">
        <SmartSearchBar />
      </div>

      {/* 3. Bottom Navigation Bar: Mega Menu & Fast Links */}
      <div className="hidden lg:block border-t border-slate-100 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Mega Menu Trigger */}
            <MegaMenu />

            {/* Nav links */}
            <nav className="flex items-center gap-5 text-xs font-semibold text-slate-600">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`py-2 transition-colors relative hover:text-amber-600 ${
                      isActive ? 'text-amber-600 font-bold' : ''
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-amber-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link
              href="/shop?special=true"
              className="flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-bold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>تخفیف‌های امروز</span>
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/terms" className="hover:text-slate-800 transition-colors">
              قوانین ضمانت بازگشت
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}
