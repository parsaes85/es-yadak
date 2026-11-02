'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/ProductSkeleton';
import {
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  Search,
  X,
  Check,
  ChevronDown,
  Car,
  Tag,
  ShieldCheck,
  ArrowUpDown,
} from 'lucide-react';
import { formatPrice } from '@/lib/formatters';

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, categories, carBrands, selectedVehicle, clearVehicleFilter } = useApp();

  // Search params
  const paramCategory = searchParams.get('category') || '';
  const paramSub = searchParams.get('sub') || '';
  const paramCar = searchParams.get('car') || '';
  const paramSearch = searchParams.get('q') || '';
  const paramSpecial = searchParams.get('special') === 'true';
  const paramWishlist = searchParams.get('wishlist') === 'true';

  // State
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [onlySpecialOffers, setOnlySpecialOffers] = useState<boolean | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(6000000);
  const [sortBy, setSortBy] = useState<'featured' | 'cheapest' | 'expensive' | 'discount' | 'bestseller'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Derived active values
  const activeCategory = selectedCategory !== null ? selectedCategory : paramCategory;
  const activeSub = selectedSub !== null ? selectedSub : paramSub;
  const activeSpecial = onlySpecialOffers !== null ? onlySpecialOffers : paramSpecial;

  // Unique brands list from products
  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    products.forEach((p) => brandsSet.add(p.brand));
    return Array.from(brandsSet);
  }, [products]);

  // Filtering products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search query
      if (paramSearch) {
        const q = paramSearch.toLowerCase();
        const matches =
          p.title.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.compatibleVehicles.some((v) => v.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Car filter from url query or selectedVehicle in context
      if (paramCar) {
        const carQuery = paramCar.toLowerCase();
        const matchesCar = p.compatibleVehicles.some((v) =>
          v.toLowerCase().includes(carQuery)
        );
        if (!matchesCar) return false;
      } else if (selectedVehicle) {
        const activeBrand = carBrands.find((b) => b.id === selectedVehicle.brandId);
        const activeModel = activeBrand?.models.find((m) => m.id === selectedVehicle.modelId);
        if (activeModel) {
          const modelName = activeModel.name.toLowerCase();
          const matches = p.compatibleVehicles.some((v) =>
            v.toLowerCase().includes(modelName)
          );
          if (!matches) return false;
        }
      }

      // Category
      if (activeCategory && p.categoryId !== activeCategory) {
        return false;
      }

      // Subcategory
      if (activeSub && p.subcategoryId !== activeSub) {
        return false;
      }

      // Brand
      if (selectedBrand && p.brand !== selectedBrand) {
        return false;
      }

      // Stock
      if (inStockOnly && p.stockCount <= 0) {
        return false;
      }

      // Special offers
      if (activeSpecial && !p.isSpecialOffer && p.discountPercent <= 0) {
        return false;
      }

      // Price
      if (p.price > maxPrice) {
        return false;
      }

      return true;
    });
  }, [
    products,
    paramSearch,
    paramCar,
    selectedVehicle,
    carBrands,
    activeCategory,
    activeSub,
    selectedBrand,
    inStockOnly,
    activeSpecial,
    maxPrice,
  ]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'cheapest') {
      return list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'expensive') {
      return list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'discount') {
      return list.sort((a, b) => b.discountPercent - a.discountPercent);
    } else if (sortBy === 'bestseller') {
      return list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Reset filters
  const handleResetFilters = () => {
    setIsLoading(true);
    setSelectedCategory('');
    setSelectedSub('');
    setSelectedBrand('');
    setInStockOnly(false);
    setOnlySpecialOffers(false);
    setMaxPrice(6000000);
    clearVehicleFilter();
    router.push('/shop');
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleCategorySelect = (catId: string) => {
    setIsLoading(true);
    if (activeCategory === catId) {
      setSelectedCategory('');
      setSelectedSub('');
    } else {
      setSelectedCategory(catId);
      setSelectedSub('');
    }
    setTimeout(() => setIsLoading(false), 200);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            فروشگاه و کاتالوگ قطعات خودرو
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            مشاهده، مقایسه قیمت و خرید آنلاین انواع لوازم یدکی با تضمین اصالت و سلامت کالا
          </p>
        </div>

        {/* Total found count */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>تعداد کالاهای منطبق:</span>
          <span className="font-bold text-slate-900 font-mono bg-white px-2.5 py-1 rounded-lg border border-slate-200 tabular-nums">
            {filteredProducts.length} قطعه
          </span>
        </div>
      </div>

      {/* Active Car Alert / Search Query Alert */}
      {(paramSearch || paramCar || selectedVehicle) && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-amber-50 border border-amber-200/80 rounded-2xl text-xs">
          <div className="flex items-center gap-2 text-amber-900">
            <Car className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              {paramCar
                ? `در حال نمایش قطعات سازگار با خودروی «${paramCar}»`
                : selectedVehicle
                ? 'فیلتر هوشمند خودرو فعال است'
                : `نتایج جستجو برای: «${paramSearch}»`}
            </span>
          </div>
          <button
            onClick={handleResetFilters}
            className="text-[11px] font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>پاک کردن فیلتر خودرو</span>
          </button>
        </div>
      )}

      {/* Mobile filter button */}
      <div className="lg:hidden flex items-center justify-between gap-2">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex-1 py-2.5 px-4 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 shadow-xs flex items-center justify-center gap-2"
        >
          <Filter className="w-4 h-4 text-amber-500" />
          <span>فیلترهای پیشرفته</span>
        </button>

        {/* Sort selector for mobile */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-800 font-semibold focus:outline-none"
        >
          <option value="featured">پیش‌فرض</option>
          <option value="bestseller">پرفروش‌ترین</option>
          <option value="cheapest">ارزان‌ترین</option>
          <option value="expensive">گران‌ترین</option>
          <option value="discount">بیشترین تخفیف</option>
        </select>
      </div>

      {/* Main Grid: Sidebar Filters + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar (Col 1) */}
        <aside
          className={`lg:block ${
            isMobileFilterOpen
              ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto'
              : 'hidden'
          } lg:sticky lg:top-24 space-y-6 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs`}
        >
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900">فیلترهای جستجو</h3>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-slate-900">فیلترها</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-[11px] text-slate-400 hover:text-rose-500 transition-colors"
            >
              پاک کردن همه
            </button>
          </div>

          {/* Filter 1: Categories Accordion */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 mb-2.5">گروه قطعه</h4>
            <div className="space-y-1">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <div key={cat.id}>
                    <button
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-colors ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] opacity-70">
                        ({products.filter((p) => p.categoryId === cat.id).length})
                      </span>
                    </button>

                    {isSelected && (
                      <div className="pr-3 pl-1 py-1 space-y-0.5 border-r-2 border-amber-400 mr-2 my-1">
                        <button
                          onClick={() => setSelectedSub('')}
                          className={`block text-[11px] py-1 text-right w-full ${
                            !activeSub ? 'text-amber-600 font-bold' : 'text-slate-500'
                          }`}
                        >
                          همه زیرگروه‌های {cat.name}
                        </button>
                        {cat.subcategories.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => setSelectedSub(sub.id)}
                            className={`block text-[11px] py-1 text-right w-full ${
                              activeSub === sub.id
                                ? 'text-amber-600 font-bold'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            {sub.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Filter 2: Part Brand */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 mb-2.5">برند سازنده قطعه</h4>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              <button
                onClick={() => setSelectedBrand('')}
                className={`w-full text-right text-xs p-1.5 rounded-lg ${
                  !selectedBrand ? 'text-amber-600 font-bold bg-amber-50' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                تمام برندها
              </button>
              {availableBrands.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b === selectedBrand ? '' : b)}
                  className={`w-full flex items-center justify-between text-xs p-1.5 rounded-lg ${
                    selectedBrand === b
                      ? 'text-amber-600 font-bold bg-amber-50'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{b}</span>
                  {selectedBrand === b && <Check className="w-3.5 h-3.5 text-amber-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 3: Price Range Slider */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-800">حداکثر قیمت:</h4>
              <span className="text-xs font-extrabold text-amber-600 tabular-nums">
                {formatPrice(maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min="500000"
              max="6000000"
              step="100000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>۵۰۰,۰۰۰</span>
              <span>۶,۰۰۰,۰۰۰ تومان</span>
            </div>
          </div>

          {/* Filter 4: Toggles */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
              <span>فقط کالاهای موجود در انبار</span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
              <span>فقط پیشنهادات تخفیف‌دار</span>
              <input
                type="checkbox"
                checked={Boolean(activeSpecial)}
                onChange={(e) => setOnlySpecialOffers(e.target.checked)}
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 w-4 h-4"
              />
            </label>
          </div>

          {/* Mobile Apply Button */}
          {isMobileFilterOpen && (
            <div className="pt-4">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
              >
                مشاهده {filteredProducts.length} کالا
              </button>
            </div>
          )}
        </aside>

        {/* Product Grid (Col 3 on Desktop) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Sorting Bar (Desktop) */}
          <div className="hidden lg:flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-amber-500" />
                مرتب‌سازی:
              </span>
              <div className="flex items-center gap-1 text-xs">
                {[
                  { key: 'featured', label: 'پیشنهادی' },
                  { key: 'bestseller', label: 'پرفروش‌ترین' },
                  { key: 'cheapest', label: 'ارزان‌ترین' },
                  { key: 'expensive', label: 'گران‌ترین' },
                  { key: 'discount', label: 'بیشترین تخفیف' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setSortBy(item.key as any)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      sortBy === item.key
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <span className="text-xs text-slate-400">
              نمایش {sortedProducts.length} کالا
            </span>
          </div>

          {/* Active Filter Chips */}
          {(activeCategory || selectedBrand || inStockOnly || activeSpecial) && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-400 text-[11px]">فیلترهای فعال:</span>
              {activeCategory && (
                <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <span>{categories.find((c) => c.id === activeCategory)?.name}</span>
                  <button onClick={() => setSelectedCategory('')}>
                    <X className="w-3 h-3 text-slate-400 hover:text-rose-600" />
                  </button>
                </span>
              )}
              {selectedBrand && (
                <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <span>برند: {selectedBrand}</span>
                  <button onClick={() => setSelectedBrand('')}>
                    <X className="w-3 h-3 text-slate-400 hover:text-rose-600" />
                  </button>
                </span>
              )}
              {inStockOnly && (
                <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <span>فقط موجودی انبار</span>
                  <button onClick={() => setInStockOnly(false)}>
                    <X className="w-3 h-3 text-slate-400 hover:text-rose-600" />
                  </button>
                </span>
              )}
              {activeSpecial && (
                <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <span>پیشنهاد ویژه</span>
                  <button onClick={() => setOnlySpecialOffers(false)}>
                    <X className="w-3 h-3 text-slate-400 hover:text-rose-600" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Product Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <ProductSkeleton key={idx} />
              ))}
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800">هیچ قطعه‌ای مطابق با فیلترهای انتخابی یافت نشد</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                می‌توانید فیلتر برند یا دسته‌بندی را تغییر داده یا فیلترها را ریست نمایید.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>پاک کردن همه فیلترها</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <ProductSkeleton key={idx} />
          ))}
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
