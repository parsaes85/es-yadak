'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Truck,
  ArrowRight,
  Car,
  KeyRound,
  Check,
  AlertCircle,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login';
  const redirectUrl = searchParams.get('redirect') || '/';

  const { user, login, register, carBrands, showToast, logout } = useApp();

  const tabFromQuery = searchParams.get('tab') === 'register' ? 'register' : 'login';
  const [tabOverride, setTabOverride] = useState<'login' | 'register' | null>(null);
  const activeTab = tabOverride ?? tabFromQuery;

  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Login form fields
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // OTP Login state
  const [otpPhone, setOtpPhone] = useState('');
  const [otpStep, setOtpStep] = useState<'phone' | 'code'>('phone');
  const [otpCode, setOtpCode] = useState('');
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Register form fields
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('peugeot');
  const [selectedModel, setSelectedModel] = useState('206-v5');
  const [agreedTerms, setAgreedTerms] = useState(true);

  // OTP Countdown timer
  useEffect(() => {
    if (!isTimerActive) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerActive]);

  // Handle standard password login
  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!phoneOrEmail.trim()) {
      setErrorMsg('لطفاً شماره موبایل یا ایمیل خود را وارد نمایید.');
      return;
    }
    if (!loginPassword.trim() || loginPassword.length < 4) {
      setErrorMsg('رمز عبور باید حداقل شامل ۴ نویسه باشد.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login(phoneOrEmail, loginPassword);
      setIsLoading(false);
      router.push(redirectUrl);
    }, 600);
  };

  // Handle OTP request
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!otpPhone.trim() || otpPhone.length < 10) {
      setErrorMsg('لطفاً شماره موبایل معتبر (مانند ۰۹۱۲۳۴۵۶۷۸۹) وارد فرمایید.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpStep('code');
      setOtpCode('58241'); // Pre-fill mock code for convenience
      setTimer(60);
      setIsTimerActive(true);
      showToast('کد تایید ۵ رقمی تستی به شماره شما پیامک شد: ۵۸۲۴۱', 'info');
    }, 700);
  };

  // Handle OTP verification
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!otpCode.trim() || otpCode.length !== 5) {
      setErrorMsg('کد تایید باید ۵ رقم باشد.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login(otpPhone, 'otp-login');
      setIsLoading(false);
      router.push(redirectUrl);
    }, 600);
  };

  // Handle Quick Demo Login
  const handleDemoLogin = () => {
    setErrorMsg('');
    setIsLoading(true);
    setTimeout(() => {
      login('۰۹۱۲۳۴۵۶۷۸۹', 'demo1234');
      setIsLoading(false);
      router.push(redirectUrl);
    }, 500);
  };

  // Handle Registration
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!regName.trim()) {
      setErrorMsg('لطفاً نام و نام خانوادگی خود را وارد فرمایید.');
      return;
    }
    if (!regPhone.trim() || regPhone.length < 10) {
      setErrorMsg('لطفاً شماره موبایل معتبر وارد فرمایید.');
      return;
    }
    if (!regPassword.trim() || regPassword.length < 4) {
      setErrorMsg('رمز عبور باید حداقل ۴ نویسه باشد.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMsg('تکرار رمز عبور با رمز عبور وارد شده همخوانی ندارد.');
      return;
    }
    if (!agreedTerms) {
      setErrorMsg('پذیرش قوانین و مقررات ای‌اس یدک الزامی است.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      register(regName, regPhone, regEmail, regPassword);
      setIsLoading(false);
      router.push(redirectUrl);
    }, 700);
  };

  // If already logged in, show user welcome state
  if (user) {
    return (
      <div className="max-w-xl mx-auto my-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-xl font-black text-slate-900">شما از قبل وارد حساب شده‌اید</h1>
            <p className="text-sm text-slate-600 mt-2">
              سلام <span className="font-bold text-amber-600">{user.name}</span> عزیز! هم‌اکنون به پنل
              کاربری و خدمات فروشگاه ای‌اس یدک دسترسی دارید.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-right space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-600">
              <span>شماره تماس:</span>
              <span className="font-mono font-bold text-slate-900">{user.phone}</span>
            </div>
            {user.email && (
              <div className="flex justify-between items-center text-slate-600">
                <span>ایمیل ثبت‌شده:</span>
                <span className="font-mono text-slate-900">{user.email}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link
              href="/profile"
              className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>مشاهده پنل کاربری</span>
            </Link>
            <Link
              href="/shop"
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>بازگشت به فروشگاه</span>
            </Link>
          </div>

          <button
            onClick={logout}
            className="text-xs text-rose-600 hover:text-rose-700 font-semibold hover:underline"
          >
            خروج از این حساب کاربری
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-4 sm:my-8">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-amber-600 flex items-center gap-1 transition-colors">
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          <span>صفحه اصلی</span>
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">
          {activeTab === 'login' ? 'ورود به حساب' : 'ثبت‌نام کاربر جدید'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Auth Form Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          {/* Header Brand Banner */}
          <div className="bg-slate-950 text-white p-6 sm:p-7 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shrink-0 shadow-md">
                <Image
                  src="/assets/esyadak_logo.jpg"
                  alt="لوگو فروشگاه ای‌اس یدک esyadak"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-xl tracking-tight text-white font-sans">
                    esyadak
                  </span>
                  <span className="text-[10px] bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded-md">
                    ای‌اس یدک
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  مرجع تخصصی خرید قطعات و لوازم یدکی خودرو
                </p>
              </div>
            </div>

            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors hidden sm:block"
            >
              بازگشت به سایت
            </Link>
          </div>

          {/* Navigation Tabs (Login / Register) */}
          <div className="flex border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1.5">
            <button
              type="button"
              onClick={() => {
                setTabOverride('login');
                setErrorMsg('');
              }}
              className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'login'
                  ? 'bg-white text-slate-950 shadow-xs border border-slate-200/80 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <User className="w-4 h-4 text-amber-500" />
              <span>ورود به حساب کاربری</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTabOverride('register');
                setErrorMsg('');
              }}
              className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'register'
                  ? 'bg-white text-slate-950 shadow-xs border border-slate-200/80 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>ثبت‌نام کاربر جدید</span>
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            {errorMsg && (
              <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* TAB 1: LOGIN */}
            {activeTab === 'login' && (
              <div className="space-y-6">
                {/* Login Method Toggle */}
                <div className="flex items-center justify-center gap-2 p-1 bg-slate-100 rounded-xl max-w-xs mx-auto text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod('password');
                      setErrorMsg('');
                    }}
                    className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition-all ${
                      loginMethod === 'password'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    رمز عبور
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod('otp');
                      setErrorMsg('');
                    }}
                    className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition-all ${
                      loginMethod === 'otp'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    کد یک‌بارمصرف (پیامک)
                  </button>
                </div>

                {/* Password Mode Form */}
                {loginMethod === 'password' && (
                  <form onSubmit={handlePasswordLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        شماره موبایل یا ایمیل:
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={phoneOrEmail}
                          onChange={(e) => setPhoneOrEmail(e.target.value)}
                          placeholder="۰۹۱۲۳۴۵۶۷۸۹ یا example@mail.com"
                          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3.5 py-3 focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                          required
                        />
                        <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-700">کلمه عبور:</label>
                        <button
                          type="button"
                          onClick={() => {
                            showToast(
                              'برای ورود تستی از دکمه «ورود سریع تستی» در پایین استفاده کنید',
                              'info'
                            );
                          }}
                          className="text-[11px] text-amber-600 hover:underline"
                        >
                          رمز را فراموش کرده‌اید؟
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="کلمه عبور خود را وارد نمایید"
                          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-10 py-3 focus:outline-none focus:border-amber-500 focus:bg-white"
                          required
                        />
                        <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>در حال اعتبارسنجی و ورود...</span>
                        </>
                      ) : (
                        <>
                          <KeyRound className="w-4 h-4" />
                          <span>ورود به حساب کاربری esyadak</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* OTP Mode Form */}
                {loginMethod === 'otp' && (
                  <div>
                    {otpStep === 'phone' ? (
                      <form onSubmit={handleSendOtp} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            شماره تلفن همراه جهت دریافت کد تایید:
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              value={otpPhone}
                              onChange={(e) => setOtpPhone(e.target.value)}
                              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3.5 py-3 focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                              required
                            />
                            <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1.5">
                            یک کد اعتبارسنجی ۵ رقمی به این شماره ارسال خواهد شد.
                          </p>
                        </div>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>در حال ارسال پیامک...</span>
                            </>
                          ) : (
                            <>
                              <Phone className="w-4 h-4" />
                              <span>دریافت کد پیامکی</span>
                            </>
                          )}
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-xs">
                          <span className="text-slate-700">
                            کد پیامک‌شده به شماره <strong className="font-mono">{otpPhone}</strong>:
                          </span>
                          <button
                            type="button"
                            onClick={() => setOtpStep('phone')}
                            className="text-amber-700 hover:underline font-bold text-[11px]"
                          >
                            ویرایش شماره
                          </button>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            کد ۵ رقمی تایید:
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            placeholder="۵۸۲۴۱"
                            className="w-full text-center tracking-[0.5em] text-lg font-black bg-slate-50 border border-slate-200 rounded-xl py-3 focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                            required
                          />
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-500">
                          {isTimerActive ? (
                            <span>ارسال مجدد کد پس از: {timer} ثانیه</span>
                          ) : (
                            <button
                              type="button"
                              onClick={handleSendOtp}
                              className="text-amber-600 hover:underline font-bold"
                            >
                              ارسال مجدد کد تایید
                            </button>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>در حال بررسی کد...</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4" />
                              <span>تایید و ورود به esyadak</span>
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* Quick 1-Click Demo Login */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="text-center">
                    <span className="text-[11px] text-slate-400 bg-white px-2 relative -top-3">
                      یا ورود سریع تستی جهت ارزیابی سایت
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200/80 active:scale-[0.99] text-slate-800 font-bold text-xs rounded-xl border border-slate-200/80 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>ورود با ۱ کلیک با حساب کاربر نمونه (علی محمدی)</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: REGISTER */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    نام و نام خانوادگی:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="مثال: رضا احمدی"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3.5 py-3 focus:outline-none focus:border-amber-500 focus:bg-white"
                      required
                    />
                    <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      شماره تلفن همراه:
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3.5 py-3 focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                        required
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      ایمیل (اختیاری):
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="user@example.com"
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3.5 py-3 focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                    </div>
                  </div>
                </div>

                {/* Car Garage Selection (Optional) */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Car className="w-4 h-4 text-amber-500" />
                    <span>خودروی شخصی شما (جهت پیشنهاد هوشمند قطعات سازگار):</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select
                      value={selectedBrand}
                      onChange={(e) => {
                        setSelectedBrand(e.target.value);
                        const found = carBrands.find((b) => b.id === e.target.value);
                        if (found && found.models.length > 0) {
                          setSelectedModel(found.models[0].id);
                        }
                      }}
                      className="w-full text-xs bg-white border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                    >
                      {carBrands.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name} ({b.country})
                        </option>
                      ))}
                    </select>

                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full text-xs bg-white border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                    >
                      {carBrands
                        .find((b) => b.id === selectedBrand)
                        ?.models.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      تعیین رمز عبور:
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="حداقل ۴ نویسه"
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-10 py-3 focus:outline-none focus:border-amber-500 focus:bg-white"
                        required
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      تکرار رمز عبور:
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="تکرار همان کلمه عبور"
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3.5 py-3 focus:outline-none focus:border-amber-500 focus:bg-white"
                        required
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                    </div>
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 pt-1">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span>
                    <Link href="/terms" className="text-amber-600 hover:underline">
                      قوانین و شرایط استفاده
                    </Link>{' '}
                    از فروشگاه قطعات خودرو ای‌اس یدک را مطالعه کرده و می‌پذیرم.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>در حال ساخت حساب کاربری...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>تکمیل ثبت‌نام و ورود به ای‌اس یدک</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Side: Automotive Assurance & Features Side Panel */}
        <div className="lg:col-span-5 space-y-6">
          {/* Trust & Guarantee Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-slate-800 space-y-6">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">
                WHY ESYADAK
              </span>
              <h2 className="text-lg font-black mt-1">مزایای عضویت در ای‌اس یدک</h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                با عضویت در فروشگاه تخصصی لوازم یدکی esyadak، تجربه خریدی مطمئن با گارانتی اصالت کالا و
                تطابق فنی قطعات با شاسی خودروی خود خواهید داشت.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">ضمانت ۱۰۰٪ اصالت فیزیکی قطعات</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    تمامی قطعات با برچسب اصالت و استاندارد مستقیم از واردکنندگان معتبر عرضه می‌شوند.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">ارسال اکسپرس و تحویل فوری</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    ارسال ۲ ساعته در تهران با پیک موتوری و تیپاکس/پیشتاز به تمام نقاط کشور.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">پارکینگ اختصاصی قطعات خودروی شما</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    ذخیره اطلاعات خودرو در پروفایل و فیلتر خودکار قطعات کامپتیبل بدون اشتباه فنی.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 flex items-center justify-between text-xs">
              <span className="text-slate-300">نیاز به راهنمایی در ورود دارید؟</span>
              <a
                href="tel:02188776655"
                className="text-amber-400 font-bold hover:underline font-mono"
              >
                ۰۲۱-۸۸۷۷۶۶۵۵
              </a>
            </div>
          </div>

          {/* Customer Reviews Snippet */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>پشتیبانی فنی قطعات</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              کارشناسان فنی ای‌اس یدک قبل از ارسال قطعه، شماره شاسی (VIN) اتومبیل شما را بررسی کرده تا از
              سازگاری قطعه اطمینان ۱۰۰٪ حاصل نمایند.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto my-12 p-8 text-center bg-white rounded-3xl border border-slate-200">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto mb-3" />
          <p className="text-xs text-slate-500 font-bold">در حال بارگذاری صفحه ورود و ثبت‌نام ای‌اس یدک...</p>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
