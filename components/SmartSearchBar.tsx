'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ChevronLeft, Wrench } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatPrice } from '@/lib/formatters';
import Link from 'next/link';
import Image from 'next/image';

export default function SmartSearchBar() {
  const router = useRouter();
  const { products, carBrands } = useApp();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trimmed = query.trim().toLowerCase();

  // Filter matching products
  const matchingProducts = trimmed
    ? products
        .filter(
          (p) =>
            p.title.toLowerCase().includes(trimmed) ||
            p.sku.toLowerCase().includes(trimmed) ||
            p.brand.toLowerCase().includes(trimmed) ||
            p.compatibleVehicles.some((v) => v.toLowerCase().includes(trimmed))
        )
        .slice(0, 5)
    : [];

  // Filter matching car models
  const matchingCars: { brand: string; model: string; modelId: string }[] = [];
  if (trimmed) {
    carBrands.forEach((b) => {
      b.models.forEach((m) => {
        if (m.name.toLowerCase().includes(trimmed) || b.name.toLowerCase().includes(trimmed)) {
          if (matchingCars.length < 3) {
            matchingCars.push({ brand: b.name, model: m.name, modelId: m.id });
          }
        }
      });
    });
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmed) return;
    setIsOpen(false);
    router.push(`/shop?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div ref={dropdownRef} className="relative w-full max-w-xl">
      <form onSubmit={handleSearchSubmit} className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="جستجوی نام قطعه، شماره فنی OEM، برند یا مدل خودرو (مثلاً لنت ۲۰۶، دیسک برمبو)..."
          className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-400 text-xs sm:text-sm rounded-xl py-2.5 pr-10 pl-10 border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-200"
        />
        <Search className="absolute right-3.5 w-4 h-4 text-slate-400 pointer-events-none" />

        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute left-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && trimmed && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden z-50">
          {matchingCars.length > 0 && (
            <div className="p-2 border-b border-slate-100 bg-slate-50/70">
              <span className="text-[11px] font-semibold text-slate-500 px-2 flex items-center gap-1.5 mb-1.5">
                <Wrench className="w-3 h-3 text-amber-600" />
                خودروهای مطابق با جستجو
              </span>
              <div className="flex flex-wrap gap-1.5">
                {matchingCars.map((car, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      router.push(`/shop?car=${encodeURIComponent(car.model)}`);
                    }}
                    className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 hover:border-amber-500 hover:text-amber-600 transition-colors flex items-center gap-1"
                  >
                    <span>{car.model}</span>
                    <span className="text-[10px] text-slate-400">({car.brand})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchingProducts.length > 0 ? (
            <div className="divide-y divide-slate-100">
              <div className="px-3 pt-2 pb-1 text-[11px] font-semibold text-slate-400">
                قطعات پیشنهادی
              </div>
              {matchingProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-2.5 hover:bg-amber-50/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 relative rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-800 line-clamp-1 group-hover:text-amber-600 transition-colors">
                        {p.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="text-slate-600">{p.brand}</span>
                        <span>·</span>
                        <span className="font-mono text-[10px] bg-slate-100 px-1 rounded">{p.sku}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left shrink-0 pl-1">
                    <span className="text-xs font-bold text-slate-900 block tabular-nums">
                      {formatPrice(p.price)}
                    </span>
                    <ChevronLeft className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-600 group-hover:-translate-x-1 transition-all inline-block mt-1" />
                  </div>
                </Link>
              ))}

              <div className="p-2.5 bg-slate-50 text-center">
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="text-xs text-amber-600 hover:text-amber-700 font-semibold"
                >
                  مشاهده همه نتایج برای «{query}» →
                </button>
              </div>
            </div>
          ) : (
            matchingCars.length === 0 && (
              <div className="p-6 text-center text-slate-500 text-xs">
                موردی برای «{query}» یافت نشد. می‌توانید با دسته‌بندی یا شماره فنی قطعه جستجو کنید.
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
