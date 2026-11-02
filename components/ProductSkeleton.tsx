'use client';

import React from 'react';

export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs flex flex-col justify-between animate-pulse">
      <div>
        {/* Image placeholder */}
        <div className="w-full aspect-4/3 bg-slate-200 rounded-xl mb-3" />

        {/* Brand & Badge row */}
        <div className="flex items-center justify-between mb-2">
          <div className="h-3 w-16 bg-slate-200 rounded" />
          <div className="h-3 w-10 bg-slate-200 rounded" />
        </div>

        {/* Title */}
        <div className="h-4 w-5/6 bg-slate-200 rounded mb-1.5" />
        <div className="h-3.5 w-3/4 bg-slate-100 rounded mb-3" />

        {/* OEM code */}
        <div className="h-3 w-24 bg-slate-100 rounded mb-4" />
      </div>

      <div className="pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <div className="h-4 w-20 bg-slate-200 rounded" />
          <div className="h-3 w-12 bg-slate-100 rounded" />
        </div>
        <div className="h-9 w-full bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
}
