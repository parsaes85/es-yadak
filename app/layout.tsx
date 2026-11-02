import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ToastContainer from '@/components/ToastContainer';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-vazirmatn',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || 'https://esyadak.com'),
  title: {
    default: 'esyadak | فروشگاه تخصصی لوازم یدکی خودرو ای‌اس یدک',
    template: '%s | esyadak ای‌اس یدک',
  },
  description:
    'فروشگاه آنلاین و تخصصی قطعات خودرو esyadak (esyadak.com) - خرید مستقیم انواع لوازم یدکی موتوری، سیستم ترمز، جلوبندی، تعلیق و برقی با ضمانت اصالت فیزیکی کالا.',
  keywords: [
    'لوازم یدکی خودرو',
    'قطعات خودرو',
    'esyadak',
    'ای‌اس یدک',
    'فروشگاه لوازم یدکی',
    'دیسک ترمز',
    'لنت ترمز',
    'تسمه تایم',
    'شمع موتور',
    'جلوبندی و تعلیق',
  ],
  authors: [{ name: 'esyadak', url: 'https://esyadak.com' }],
  creator: 'esyadak',
  publisher: 'esyadak',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'esyadak | فروشگاه تخصصی لوازم یدکی خودرو',
    description:
      'فروشگاه آنلاین و جامع قطعات و لوازم یدکی خودروهای ایرانی و وارداتی esyadak با ضمانت اصالت کالا.',
    url: 'https://esyadak.com',
    siteName: 'esyadak ای‌اس یدک',
    locale: 'fa_IR',
    type: 'website',
    images: [
      {
        url: '/assets/esyadak_logo.jpg',
        width: 1200,
        height: 630,
        alt: 'فروشگاه تخصصی لوازم یدکی خودرو esyadak',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'esyadak | فروشگاه تخصصی لوازم یدکی خودرو',
    description:
      'فروشگاه آنلاین و جامع قطعات و لوازم یدکی خودروهای ایرانی و وارداتی esyadak با ضمانت اصالت کالا.',
    images: ['/assets/esyadak_logo.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={`scroll-smooth ${vazirmatn.variable}`}>
      <body
        className={`${vazirmatn.className} min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased`}
        suppressHydrationWarning
      >
        <AppProvider>
          <Header />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-12">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
