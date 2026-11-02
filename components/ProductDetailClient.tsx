'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { formatPrice } from '@/lib/formatters';
import ProductCard from '@/components/ProductCard';
import {
  Heart,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Check,
  Plus,
  Minus,
  Wrench,
  Car,
  ChevronLeft,
  ArrowRight,
  Share2,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

interface ProductDetailClientProps {
  id: string;
}

export default function ProductDetailClient({ id }: ProductDetailClientProps) {
  const router = useRouter();
  const { products, addToCart, toggleWishlist, isInWishlist, categories, showToast } = useApp();

  const product = products.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState<string>(product?.image || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'compatibility' | 'reviews'>('specs');

  // Review submission state
  const [reviews, setReviews] = useState([
    {
      id: 'rev-1',
      author: 'مهرداد رضایی (مالک ۲۰۶ تیپ ۵)',
      rating: 5,
      date: '۱۴۰۳/۰۷/۲۲',
      comment:
        'واقعاً کیفیت قطعه عالی بود. بسته‌بندی پلمپ و هولوگرام اصالت ایساکو داشت. بعد از نصب شتاب ماشین محسوس بهتر شد و ترمزگیری بدون صداست.',
    },
    {
      id: 'rev-2',
      author: 'کامران یزدانی',
      rating: 4.8,
      date: '۱۴۰۳/۰۸/۰۲',
      comment:
        'ارسال سریع بود و بسته‌بندی عالی با فوم ضدضربه انجام شده بود. با کارشناس پشتیبانی هم تطابق دادم سریع راهنمایی کردند.',
    },
  ]);

  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">کالای مورد نظر یافت نشد</h2>
        <p className="text-xs text-slate-500">ممکن است این قطعه از کاتالوگ حذف شده باشد.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-xs"
        >
          <span>بازگشت به کاتالوگ فروشگاه</span>
        </Link>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.categoryId);
  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (isAdding) return;
    setIsAdding(true);
    setTimeout(() => {
      addToCart(product, quantity);
      setIsAdding(false);
    }, 400);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    setIsSubmittingReview(true);
    setTimeout(() => {
      const newRev = {
        id: `rev-${Date.now()}`,
        author: newReviewAuthor,
        rating: newReviewRating,
        date: 'همین الان',
        comment: newReviewComment,
      };
      setReviews([newRev, ...reviews]);
      setNewReviewAuthor('');
      setNewReviewComment('');
      setIsSubmittingReview(false);
      showToast('نظر ارزشمند شما با موفقیت ثبت شد', 'success');
    }, 500);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('لینک صفحه محصول در کلیپ‌بورد کپی شد', 'info');
    }
  };

  return (
    <div className="space-y-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 overflow-x-auto pb-1">
        <Link href="/" className="hover:text-slate-700 shrink-0">
          خانه
        </Link>
        <ChevronLeft className="w-3 h-3 shrink-0" />
        <Link href="/shop" className="hover:text-slate-700 shrink-0">
          فروشگاه
        </Link>
        {category && (
          <>
            <ChevronLeft className="w-3 h-3 shrink-0" />
            <Link
              href={`/shop?category=${category.id}`}
              className="hover:text-slate-700 shrink-0"
            >
              {category.name}
            </Link>
          </>
        )}
        <ChevronLeft className="w-3 h-3 shrink-0" />
        <span className="text-slate-700 font-bold truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Product Section: Gallery + Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        {/* Gallery (Cols 5) */}
        <div className="lg:col-span-5 space-y-3">
          {/* Main Large Image */}
          <div className="relative aspect-4/3 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shadow-inner">
            <Image
              src={selectedImage || product.image}
              alt={product.title}
              fill
              priority
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-3 right-3 bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-md">
                %{product.discountPercent} تخفیف
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {product.images.map((img, idx) => {
                const isCurrent = (selectedImage || product.image) === img;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      isCurrent
                        ? 'border-amber-500 scale-95 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} thumbnail ${idx}`}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                );
              })}
            </div>
          )}

          {/* Assurance bullet tags */}
          <div className="pt-3 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-500 border-t border-slate-100">
            <div className="p-2 bg-slate-50 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <span>اصالت ۱۰۰٪</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <Truck className="w-4 h-4 text-amber-600 mx-auto mb-1" />
              <span>ارسال اکسپرس</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <RotateCcw className="w-4 h-4 text-sky-600 mx-auto mb-1" />
              <span>۷ روز ضمانت بازگشت</span>
            </div>
          </div>
        </div>

        {/* Product Info & Buy Action (Cols 7) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            {/* Brand & OEM Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">برند قطعه:</span>
                <span className="font-bold text-slate-900 bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-lg border border-amber-200/60">
                  {product.brand}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500">شماره فنی OEM:</span>
                <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                  {product.sku}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  title="اشتراک‌گذاری قطعه"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2 rounded-xl transition-colors ${
                    inWishlist
                      ? 'text-rose-600 bg-rose-50'
                      : 'text-slate-400 hover:text-rose-600 hover:bg-slate-100'
                  }`}
                  title="علاقه‌مندی"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-600' : ''}`} />
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
              {product.title}
            </h1>

            {/* Rating & reviews */}
            <div className="flex items-center gap-3 text-xs text-slate-500 pb-2">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold text-slate-900 tabular-nums">{product.rating}</span>
              </div>
              <span>·</span>
              <span className="hover:text-amber-600 cursor-pointer" onClick={() => setActiveTab('reviews')}>
                {reviews.length} دیدگاه ثبت شده کاربران
              </span>
              <span>·</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold text-[11px]">
                {product.stockCount > 0 ? `موجود در انبار (${product.stockCount} عدد)` : 'ناموجود'}
              </span>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              {product.shortDescription}
            </p>

            {/* Compatible vehicles snippet */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5 mb-2">
                <Car className="w-4 h-4 text-amber-600" />
                سازگار با خودروهای:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.compatibleVehicles.map((car, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-white text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200"
                  >
                    {car}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Purchase Action Box */}
          <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/90 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-500">قیمت برای مصرف‌کننده:</span>
              <div className="text-left">
                {product.discountPercent > 0 && (
                  <div className="text-xs text-slate-400 line-through tabular-nums mb-0.5">
                    {formatPrice(product.originalPrice)}
                  </div>
                )}
                <div className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">
                  {formatPrice(product.price)}
                </div>
              </div>
            </div>

            {/* Quantity Stepper & Add to Cart Button */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              {/* Stepper */}
              <div className="flex items-center justify-between border border-slate-200 bg-white rounded-xl px-2 py-1.5 sm:w-36">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                  disabled={quantity >= product.stockCount}
                  className="p-1 hover:bg-slate-100 text-slate-600 rounded-lg disabled:opacity-30 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdding || product.stockCount === 0}
                className="flex-1 py-3 px-6 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isAdding ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>در حال افزودن به سبد...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>افزودن {quantity > 1 ? `${quantity} عدد ` : ''}به سبد خرید</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Technical Specs / Compatibility / Reviews */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 gap-6 text-xs sm:text-sm font-bold pb-1">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 relative transition-colors ${
              activeTab === 'specs' ? 'text-amber-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            مشخصات فنی و استانداردهای ساخت
            {activeTab === 'specs' && (
              <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('compatibility')}
            className={`pb-3 relative transition-colors ${
              activeTab === 'compatibility'
                ? 'text-amber-600'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            جدول دقیق سازگاری خودروها
            {activeTab === 'compatibility' && (
              <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 relative transition-colors ${
              activeTab === 'reviews' ? 'text-amber-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            نظرات خریداران ({reviews.length})
            {activeTab === 'reviews' && (
              <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Tab 1: Specifications */}
        {activeTab === 'specs' && (
          <div className="py-6 space-y-6">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              {product.description}
            </p>

            <div className="rounded-2xl border border-slate-200/80 overflow-hidden">
              <table className="w-full text-xs">
                <tbody>
                  {Object.entries(product.specifications).map(([key, val], idx) => (
                    <tr
                      key={key}
                      className={idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'}
                    >
                      <td className="p-3.5 font-bold text-slate-700 w-1/3 border-b border-slate-100">
                        {key}
                      </td>
                      <td className="p-3.5 text-slate-600 border-b border-slate-100">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Vehicle Compatibility */}
        {activeTab === 'compatibility' && (
          <div className="py-6 space-y-4">
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-900">
              این قطعه با خودروهای ذکر شده در جدول زیر سازگاری صددرصدی و تاییدیه کارخانه‌ای دارد:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {product.compatibleVehicles.map((car, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50/50"
                >
                  <Car className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800">{car}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Reviews & Add review */}
        {activeTab === 'reviews' && (
          <div className="py-6 space-y-8">
            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">
                        {rev.author.slice(0, 1)}
                      </div>
                      <span className="text-xs font-bold text-slate-800">{rev.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-mono text-slate-700 ml-1 font-bold">
                          {rev.rating}
                        </span>
                      </div>
                      <span>·</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pr-9">{rev.comment}</p>
                </div>
              ))}
            </div>

            {/* Add Review Form */}
            <div className="pt-6 border-t border-slate-200">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-3">
                ثبت تجربه و دیدگاه شما درباره این قطعه:
              </h4>
              <form onSubmit={handleReviewSubmit} className="space-y-3 max-w-lg">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    نام شما:
                  </label>
                  <input
                    type="text"
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="مثلاً: علی عباسی"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    امتیاز شما به کیفیت قطعه:
                  </label>
                  <div className="flex items-center gap-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        className="p-1 text-amber-500 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= newReviewRating ? 'fill-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-600 mr-2 tabular-nums">
                      {newReviewRating} از ۵
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    متن نظر شما:
                  </label>
                  <textarea
                    rows={3}
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="کیفیت ساخت، سهولت در نصب، عملکرد در ترمزگیری یا کارکرد موتور..."
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  {isSubmittingReview ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>در حال ثبت...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>ارسال نظر</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">قطعات مرتبط و پیشنهادی</h3>
            <Link
              href={`/shop?category=${product.categoryId}`}
              className="text-xs font-semibold text-amber-600 hover:underline"
            >
              مشاهده سایر قطعات این گروه
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
