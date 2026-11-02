'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { formatPrice } from '@/lib/formatters';
import { Ticket, Order } from '@/lib/types';
import {
  User,
  Wallet,
  ShoppingBag,
  MessageSquare,
  Car,
  Settings,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
  Loader2,
  LogOut,
  Sparkles,
  ShieldCheck,
  Eye,
  Printer,
  ChevronLeft,
} from 'lucide-react';

export default function ProfilePage() {
  const {
    user,
    logout,
    updateProfile,
    walletBalance,
    walletTransactions,
    chargeWallet,
    orders,
    tickets,
    createTicket,
    replyTicket,
    simulateSupportReply,
    carBrands,
    showToast,
    setAuthModalOpen,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'wallet' | 'tickets' | 'profile' | 'garage'>('overview');

  // Wallet top-up state
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState<number>(1000000);
  const [isCharging, setIsCharging] = useState(false);

  // New Ticket state
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('مشاوره فنی قطعات');
  const [ticketPriority, setTicketPriority] = useState<'معمولی' | 'متوسط' | 'فوری'>('متوسط');
  const [ticketMessage, setTicketMessage] = useState('');
  const [activeTicketId, setActiveTicketId] = useState<string | null>(tickets[0]?.id || null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);

  // Selected Order for Modal View
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<Order | null>(null);

  // Profile Edit State
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [profileNationalCode, setProfileNationalCode] = useState(user?.nationalCode || '');
  const [profileProvince, setProfileProvince] = useState(user?.province || '');
  const [profileCity, setProfileCity] = useState(user?.city || '');
  const [profileAddress, setProfileAddress] = useState(user?.address || '');
  const [profilePostalCode, setProfilePostalCode] = useState(user?.postalCode || '');

  // Garage Edit State
  const [savedBrand, setSavedBrand] = useState(user?.carBrand || 'peugeot');
  const [savedModel, setSavedModel] = useState(user?.carModel || '206-v5');
  const [savedYear, setSavedYear] = useState(user?.carYear || '۱۳۹۲ تا ۱۴۰۱');

  if (!user) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-md mx-auto space-y-4 my-8">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">جهت ورود به پنل کاربری لاگین کنید</h2>
        <p className="text-xs text-slate-500">
          برای مشاهده سوابق خرید، کیف پول و تیکت‌های پشتیبانی وارد حساب خود شوید.
        </p>
        <Link
          href="/login?redirect=/profile"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors"
        >
          <User className="w-4 h-4" />
          <span>ورود به حساب کاربری</span>
        </Link>
      </div>
    );
  }

  const handleChargeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topUpAmount <= 0) return;
    setIsCharging(true);
    setTimeout(() => {
      chargeWallet(topUpAmount);
      setIsCharging(false);
      setIsTopUpOpen(false);
    }, 700);
  };

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;

    createTicket(ticketSubject, ticketCategory, ticketPriority, ticketMessage);
    setIsNewTicketOpen(false);
    setTicketSubject('');
    setTicketMessage('');
  };

  const handleSendReply = (ticketId: string) => {
    if (!replyMessage.trim()) return;
    setIsSendingReply(true);
    setTimeout(() => {
      replyTicket(ticketId, replyMessage);
      setReplyMessage('');
      setIsSendingReply(false);
    }, 400);
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profileName,
      phone: profilePhone,
      email: profileEmail,
      nationalCode: profileNationalCode,
      province: profileProvince,
      city: profileCity,
      address: profileAddress,
      postalCode: profilePostalCode,
    });
  };

  const handleGarageSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      carBrand: savedBrand,
      carModel: savedModel,
      carYear: savedYear,
    });
    showToast('خودروی پیش‌فرض گاراژ با موفقیت ذخیره شد', 'success');
  };

  const activeTicket = tickets.find((t) => t.id === activeTicketId) || tickets[0];

  return (
    <div className="space-y-8">
      {/* Top Banner / User Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg">
            {user.name.slice(0, 1)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white">{user.name}</h1>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                کاربر طلایی
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
              <span className="font-mono">{user.phone}</span>
              <span>·</span>
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        {/* Quick KPI stats in header */}
        <div className="flex items-center gap-4 sm:gap-6 bg-slate-800/80 border border-slate-700/80 p-3.5 rounded-2xl relative z-10">
          <div>
            <span className="text-[11px] text-slate-400 block">موجودی کیف پول</span>
            <span className="text-sm font-extrabold text-amber-400 tabular-nums">
              {formatPrice(walletBalance)}
            </span>
          </div>
          <div className="w-px h-8 bg-slate-700" />
          <div>
            <span className="text-[11px] text-slate-400 block">سفارش‌های ثبت شده</span>
            <span className="text-sm font-extrabold text-white tabular-nums">
              {orders.length} سفارش
            </span>
          </div>
          <div className="w-px h-8 bg-slate-700" />
          <button
            onClick={() => setIsTopUpOpen(true)}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition-colors flex items-center gap-1 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>شارژ کیف پول</span>
          </button>
        </div>
      </div>

      {/* Main Panel Layout: Sidebar Tabs + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar (Cols 3) */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-3 shadow-xs space-y-1">
          {[
            { id: 'overview', label: 'نمای کلی حساب', icon: User },
            { id: 'orders', label: 'سفارش‌های من', icon: ShoppingBag, count: orders.length },
            { id: 'wallet', label: 'کیف پول و تراکنش‌ها', icon: Wallet },
            { id: 'tickets', label: 'تیکت‌های پشتیبانی', icon: MessageSquare, count: tickets.length },
            { id: 'garage', label: 'گاراژ خودروی من', icon: Car },
            { id: 'profile', label: 'اطلاعات و نشانی‌ها', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-slate-950 text-amber-400' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100 mt-2">
            <button
              onClick={logout}
              className="w-full flex items-center gap-2.5 p-3 rounded-2xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>خروج از حساب</span>
            </button>
          </div>
        </div>

        {/* Content Area (Cols 9) */}
        <div className="lg:col-span-9 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                خلاصه فعالیت‌های کاربری
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">کیف پول اعتباری</span>
                    <Wallet className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-lg font-black text-slate-900 tabular-nums">
                    {formatPrice(walletBalance)}
                  </div>
                  <button
                    onClick={() => setActiveTab('wallet')}
                    className="text-[11px] text-amber-600 font-bold hover:underline"
                  >
                    مشاهده ریز تراکنش‌ها ←
                  </button>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">سفارش‌های در حال پردازش</span>
                    <ShoppingBag className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-lg font-black text-slate-900 tabular-nums">
                    {orders.filter((o) => o.status === 'در حال پردازش').length} سفارش
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-[11px] text-amber-600 font-bold hover:underline"
                  >
                    پیگیری مرسولات ←
                  </button>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">تیکت‌های باز پشتیبانی</span>
                    <MessageSquare className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-lg font-black text-slate-900 tabular-nums">
                    {tickets.filter((t) => t.status !== 'بسته شده').length} تیکت
                  </div>
                  <button
                    onClick={() => setActiveTab('tickets')}
                    className="text-[11px] text-amber-600 font-bold hover:underline"
                  >
                    مشاهده پاسخ کارشناسان ←
                  </button>
                </div>
              </div>

              {/* Saved Address Snapshot */}
              <div className="p-5 bg-slate-50/70 rounded-2xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="text-xs font-bold text-slate-800 block mb-1">
                    نشانی پیش‌فرض جهت ارسال سفارشات:
                  </span>
                  <p className="text-xs text-slate-500">
                    {user.province}، {user.city}، {user.address} (کد پستی:{' '}
                    <span className="font-mono">{user.postalCode}</span>)
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="text-xs font-bold text-amber-600 hover:underline shrink-0"
                >
                  ویرایش آدرس
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS HISTORY */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900">تاریخچه سفارشات من</h2>
                <span className="text-xs text-slate-400 font-mono">{orders.length} فاکتور ثبت شده</span>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-2">
                  <ShoppingBag className="w-10 h-10 mx-auto text-slate-300" />
                  <p className="text-xs font-semibold">تاکنون سفارشی از ای‌اس یدک ثبت نکرده‌اید.</p>
                  <Link
                    href="/shop"
                    className="inline-block mt-2 text-xs text-amber-600 font-bold hover:underline"
                  >
                    شروع خرید قطعات →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-xs text-slate-900">
                            {order.id}
                          </span>
                          <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
                            {order.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-3">
                          <span>تاریخ: {order.date}</span>
                          <span>·</span>
                          <span className="font-mono">کد رهگیری: {order.trackingCode}</span>
                        </div>
                      </div>

                      {/* Items preview */}
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-2"
                          >
                            <span className="font-semibold text-slate-800">{item.product.title}</span>
                            <span className="text-[11px] text-slate-400">({item.quantity} عدد)</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <div className="text-xs text-slate-600">
                          <span>مبلغ کل فاکتور:</span>{' '}
                          <strong className="text-sm font-bold text-slate-900 tabular-nums">
                            {formatPrice(order.total)}
                          </strong>
                        </div>
                        <button
                          onClick={() => setSelectedOrderForModal(order)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>مشاهده فاکتور</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: WALLET & TRANSACTIONS */}
          {activeTab === 'wallet' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900">کیف پول و تاریخچه تراکنش‌ها</h2>
                <button
                  onClick={() => setIsTopUpOpen(true)}
                  className="py-2 px-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>افزایش موجودی</span>
                </button>
              </div>

              {/* Wallet Card */}
              <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs text-slate-400 block mb-1">موجودی قابل استفاده:</span>
                  <div className="text-2xl font-black text-amber-400 tabular-nums">
                    {formatPrice(walletBalance)}
                  </div>
                </div>
                <div className="text-xs text-slate-400 max-w-xs">
                  امکان پرداخت بی‌درنگ کلیه فاکتورهای لوازم یدکی بدون نیاز به هدایت به درگاه شتاب و ورود
                  مجدد رمز دوم پویا.
                </div>
              </div>

              {/* Transactions List */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-800">ریز تراکنش‌های اخیر</h3>
                <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
                  {walletTransactions.map((trx) => (
                    <div
                      key={trx.id}
                      className="p-4 flex items-center justify-between text-xs bg-white hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                            trx.type === 'charge'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {trx.type === 'charge' ? (
                            <ArrowDownLeft className="w-4 h-4" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <span className="font-bold text-slate-800 block">{trx.description}</span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {trx.date} · {trx.trackingCode}
                          </span>
                        </div>
                      </div>
                      <div className="text-left font-mono font-bold tabular-nums">
                        <span
                          className={trx.type === 'charge' ? 'text-emerald-700' : 'text-slate-900'}
                        >
                          {trx.type === 'charge' ? '+' : '-'}
                          {formatPrice(trx.amount)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SUPPORT TICKETS WITH REAL-TIME CHAT SIMULATION */}
          {activeTab === 'tickets' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900">سامانه تیکت‌های پشتیبانی فنی</h2>
                <button
                  onClick={() => setIsNewTicketOpen(true)}
                  className="py-2 px-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ارسال تیکت جدید</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Tickets list (Cols 4) */}
                <div className="md:col-span-4 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 block px-1">
                    لیست پیام‌ها
                  </span>
                  {tickets.map((t) => {
                    const isSelected = (activeTicket?.id || '') === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setActiveTicketId(t.id)}
                        className={`w-full text-right p-3 rounded-2xl border transition-all ${
                          isSelected
                            ? 'bg-amber-50 border-amber-400 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[10px] text-slate-400">{t.id}</span>
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                              t.status === 'پاسخ داده شده'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {t.status}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{t.subject}</h4>
                        <span className="text-[10px] text-slate-400 block mt-1">{t.createdAt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Ticket Conversation Thread (Cols 8) */}
                <div className="md:col-span-8 bg-slate-50 rounded-2xl border border-slate-200 p-4 flex flex-col justify-between min-h-[360px]">
                  {activeTicket ? (
                    <>
                      <div>
                        {/* Thread Header */}
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                          <div>
                            <h3 className="text-xs font-bold text-slate-900">{activeTicket.subject}</h3>
                            <span className="text-[10px] text-slate-400">
                              دسته‌بندی: {activeTicket.category} · اولویت: {activeTicket.priority}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => simulateSupportReply(activeTicket.id)}
                            className="text-[10px] font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
                            title="شبیه‌سازی پاسخ از سمت مکانیک/کارشناس"
                          >
                            <Sparkles className="w-3 h-3 text-amber-600" />
                            <span>شبیه‌سازی پاسخ فوری کارشناس</span>
                          </button>
                        </div>

                        {/* Messages Area */}
                        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                          {activeTicket.messages.map((m) => {
                            const isUser = m.sender === 'user';
                            return (
                              <div
                                key={m.id}
                                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                              >
                                <div
                                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                                    isUser
                                      ? 'bg-amber-500 text-slate-950 font-medium rounded-bl-xs'
                                      : 'bg-white text-slate-800 border border-slate-200 rounded-br-xs shadow-xs'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 mb-1 opacity-70 text-[10px]">
                                    <span>{isUser ? 'شما' : 'کارشناس فنی esyadak'}</span>
                                    <span>·</span>
                                    <span>{m.timestamp}</span>
                                  </div>
                                  <p>{m.message}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Reply Input */}
                      <div className="mt-4 pt-3 border-t border-slate-200 flex gap-2">
                        <input
                          type="text"
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          placeholder="پاسخ خود را بنویسید..."
                          onKeyDown={(e) => e.key === 'Enter' && handleSendReply(activeTicket.id)}
                          className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleSendReply(activeTicket.id)}
                          disabled={isSendingReply || !replyMessage.trim()}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                        >
                          {isSendingReply ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Send className="w-3.5 h-3.5" />
                          )}
                          <span>ارسال</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center text-xs text-slate-400">
                      یک تیکت را برای مشاهده پیام‌ها انتخاب نمایید.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: GARAGE */}
          {activeTab === 'garage' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900">گاراژ خودروی من</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  با ثبت خودرو در گاراژ، کاتالوگ فروشگاه به صورت خودکار قطعات مناسب ماشین شما را پیشنهاد می‌دهد.
                </p>
              </div>

              <form onSubmit={handleGarageSave} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    برند خودرو:
                  </label>
                  <select
                    value={savedBrand}
                    onChange={(e) => setSavedBrand(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                  >
                    {carBrands.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    مدل خودرو:
                  </label>
                  <select
                    value={savedModel}
                    onChange={(e) => setSavedModel(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                  >
                    {carBrands
                      .find((b) => b.id === savedBrand)
                      ?.models.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    سال ساخت و تیپ:
                  </label>
                  <input
                    type="text"
                    value={savedYear}
                    onChange={(e) => setSavedYear(e.target.value)}
                    placeholder="مثال: ۱۳۹۸ تیپ ۵"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="py-2.5 px-6 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  ذخیره تغییرات خودرو
                </button>
              </form>
            </div>
          )}

          {/* TAB 6: PROFILE DETAILS */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900">مشخصات کاربری و اطلاعات فردی</h2>
              </div>

              <form onSubmit={handleProfileSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      نام و نام خانوادگی:
                    </label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      شماره تماس همراه:
                    </label>
                    <input
                      type="text"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      آدرس ایمیل:
                    </label>
                    <input
                      type="email"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">کد ملی:</label>
                    <input
                      type="text"
                      value={profileNationalCode}
                      onChange={(e) => setProfileNationalCode(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">استان:</label>
                    <input
                      type="text"
                      value={profileProvince}
                      onChange={(e) => setProfileProvince(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">شهر:</label>
                    <input
                      type="text"
                      value={profileCity}
                      onChange={(e) => setProfileCity(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      آدرس کامل پستی:
                    </label>
                    <textarea
                      rows={2}
                      value={profileAddress}
                      onChange={(e) => setProfileAddress(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      کد پستی ۱۰ رقمی:
                    </label>
                    <input
                      type="text"
                      value={profilePostalCode}
                      onChange={(e) => setProfilePostalCode(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="py-2.5 px-6 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    ذخیره اطلاعات حساب
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: TOP-UP WALLET */}
      {isTopUpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsTopUpOpen(false)}
          />
          <div className="relative bg-white rounded-3xl p-6 max-w-sm w-full z-10 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900">افزایش موجودی کیف پول</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              مبلغ مورد نظر را انتخاب یا وارد نمایید تا حساب شما به صورت آنی شارژ گردد:
            </p>

            {/* Presets */}
            <div className="grid grid-cols-3 gap-2">
              {[500000, 1000000, 2000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTopUpAmount(amt)}
                  className={`py-2 text-[11px] font-bold rounded-xl border transition-all ${
                    topUpAmount === amt
                      ? 'border-amber-500 bg-amber-50 text-amber-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {(amt / 1000).toLocaleString('fa-IR')} ه.ت
                </button>
              ))}
            </div>

            <form onSubmit={handleChargeSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  مبلغ به تومان:
                </label>
                <input
                  type="number"
                  step="100000"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(Number(e.target.value))}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500 font-mono"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsTopUpOpen(false)}
                  className="flex-1 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={isCharging}
                  className="flex-1 py-2.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-600 rounded-xl shadow-xs flex items-center justify-center gap-1.5"
                >
                  {isCharging ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>شارژ آنی کیف پول</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: NEW TICKET */}
      {isNewTicketOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsNewTicketOpen(false)}
          />
          <div className="relative bg-white rounded-3xl p-6 max-w-md w-full z-10 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900">ارسال تیکت جدید به پشتیبانی فنی</h3>

            <form onSubmit={handleCreateTicketSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  موضوع تیکت:
                </label>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="مثال: استعلام اصالت دیسک ترمز برمبو یا زمان تعویض"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">بخش:</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                  >
                    <option value="مشاوره فنی قطعات">مشاوره فنی قطعات</option>
                    <option value="پیگیری سفارش و مرسوله">پیگیری سفارش و مرسوله</option>
                    <option value="گارانتی و خدمات پس از فروش">گارانتی و خدمات</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">اولویت:</label>
                  <select
                    value={ticketPriority}
                    onChange={(e) => setTicketPriority(e.target.value as any)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                  >
                    <option value="معمولی">معمولی</option>
                    <option value="متوسط">متوسط</option>
                    <option value="فوری">فوری</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  متن پیام شما:
                </label>
                <textarea
                  rows={4}
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="مشخصات خودرو، سال تولید یا شماره فنی قطعه مورد نظر را شرح دهید..."
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewTicketOpen(false)}
                  className="flex-1 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-600 rounded-xl shadow-xs"
                >
                  ارسال تیکت
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: INVOICE VIEWER */}
      {selectedOrderForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setSelectedOrderForModal(null)}
          />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full z-10 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-slate-300 bg-slate-950 shrink-0">
                  <Image
                    src="/assets/esyadak_logo.jpg"
                    alt="لوگو ای‌اس یدک"
                    width={44}
                    height={44}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    فاکتور رسمی سفارش {selectedOrderForModal.id}
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    کد رهگیری: {selectedOrderForModal.trackingCode} · تاریخ: {selectedOrderForModal.date}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrderForModal(null)}
                className="text-xs bg-slate-100 hover:bg-slate-200 p-1.5 rounded-lg"
              >
                بستن
              </button>
            </div>

            {/* Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-right">
                <thead className="bg-slate-50 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">قطعه</th>
                    <th className="p-2.5 text-center">تعداد</th>
                    <th className="p-2.5 text-left">مبلغ کل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedOrderForModal.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-semibold text-slate-800">{item.product.title}</td>
                      <td className="p-2.5 text-center font-mono">{item.quantity}</td>
                      <td className="p-2.5 text-left font-mono">
                        {formatPrice(item.product.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                  <tr>
                    <td colSpan={2} className="p-2.5 text-left">
                      مبلغ نهایی:
                    </td>
                    <td className="p-2.5 text-left text-amber-700 font-mono">
                      {formatPrice(selectedOrderForModal.total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => window.print()}
                className="py-2 px-4 bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>چاپ نسخه کاغذی</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
