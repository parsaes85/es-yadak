'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FaqAccordion() {
  const { faq } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="w-5 h-5 text-amber-500" />
        <h2 className="text-lg font-black text-slate-900">سوالات متداول خریداران لوازم یدکی</h2>
      </div>
      <p className="text-xs text-slate-500 mb-6">
        پاسخ کارشناسان esyadak به پرتکرارترین پرسش‌های کاربران درباره اصالت، ارسال و تطابق خودرو
      </p>

      <div className="space-y-3">
        {faq.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/80 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-right bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 mr-2 ${
                    isOpen ? 'rotate-180 text-amber-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="p-4 bg-white text-xs sm:text-[13px] text-slate-600 leading-relaxed border-t border-slate-100">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
