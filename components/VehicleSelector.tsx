'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Car, ChevronLeft, Check, RotateCcw, Sparkles } from 'lucide-react';

export default function VehicleSelector() {
  const router = useRouter();
  const { carBrands, selectedVehicle, setSelectedVehicle, clearVehicleFilter } = useApp();

  const [brandId, setBrandId] = useState<string>(selectedVehicle?.brandId || '');
  const [modelId, setModelId] = useState<string>(selectedVehicle?.modelId || '');
  const [year, setYear] = useState<string>(selectedVehicle?.year || '');

  // Computed models based on brand
  const selectedBrandObj = carBrands.find((b) => b.id === brandId);
  const availableModels = selectedBrandObj ? selectedBrandObj.models : [];

  // Computed years based on model
  const selectedModelObj = availableModels.find((m) => m.id === modelId);
  const availableYears = selectedModelObj ? selectedModelObj.years : [];

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBrandId(e.target.value);
    setModelId('');
    setYear('');
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModelId(e.target.value);
    setYear('');
  };

  const handleApplyFilter = () => {
    if (!brandId || !modelId) return;
    const vehicleData = {
      brandId,
      modelId,
      year: year || (availableYears[0] ?? 'تمام سال‌ها'),
    };
    setSelectedVehicle(vehicleData);

    const modelName = selectedModelObj?.name || '';
    router.push(`/shop?car=${encodeURIComponent(modelName)}`);
  };

  const currentCarName = selectedVehicle
    ? carBrands
        .find((b) => b.id === selectedVehicle.brandId)
        ?.models.find((m) => m.id === selectedVehicle.modelId)?.name
    : null;

  return (
    <div className="w-full bg-slate-900 text-white rounded-3xl p-6 lg:p-7 shadow-xl border border-slate-800 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -top-16 -left-16 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">انتخاب هوشمند خودرو</h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-medium">
                  سازگاری قطعی قطعات
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                با انتخاب مشخصات دقیق اتومبیل، فقط قطعات ۱۰۰٪ سازگار با خودروی خود را مشاهده کنید.
              </p>
            </div>
          </div>

          {selectedVehicle && (
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-xl text-xs">
              <span className="text-slate-400">خودروی فعال:</span>
              <span className="font-bold text-amber-400">{currentCarName}</span>
              <button
                onClick={clearVehicleFilter}
                className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
                title="حذف فیلتر خودرو"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* 3 Step Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 items-end">
          {/* Step 1: Brand */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              ۱. برند خودروسازی:
            </label>
            <select
              value={brandId}
              onChange={handleBrandChange}
              className="w-full bg-slate-800 text-slate-100 text-xs rounded-xl px-3.5 py-3 border border-slate-700 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
            >
              <option value="">-- انتخاب کمپانی --</option>
              {carBrands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Model */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              ۲. مدل و نسخه خودرو:
            </label>
            <select
              value={modelId}
              onChange={handleModelChange}
              disabled={!brandId}
              className="w-full bg-slate-800 text-slate-100 text-xs rounded-xl px-3.5 py-3 border border-slate-700 focus:outline-none focus:border-amber-500 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <option value="">-- انتخاب مدل اتومبیل --</option>
              {availableModels.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Step 3: Year / Trim */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              ۳. سال ساخت / تیپ:
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              disabled={!modelId}
              className="w-full bg-slate-800 text-slate-100 text-xs rounded-xl px-3.5 py-3 border border-slate-700 focus:outline-none focus:border-amber-500 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <option value="">-- تمام سال‌های تولید --</option>
              {availableYears.map((y, idx) => (
                <option key={idx} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Action button */}
          <div>
            <button
              onClick={handleApplyFilter}
              disabled={!brandId || !modelId}
              className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>مشاهده قطعات سازگار</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick model recommendations pills */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 overflow-x-auto pb-1">
          <span className="shrink-0 flex items-center gap-1 text-slate-300">
            <Sparkles className="w-3 h-3 text-amber-400" />
            خودروهای پرطرفدار:
          </span>
          <button
            onClick={() => {
              setBrandId('peugeot');
              setModelId('206-v5');
              setYear('۱۳۹۲ تا ۱۴۰۱');
            }}
            className="shrink-0 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700/60 transition-colors"
          >
            پژو ۲۰۶ تیپ ۵
          </button>
          <button
            onClick={() => {
              setBrandId('ikco');
              setModelId('dena-plus');
              setYear('۱۳۹۶ تا ۱۴۰۰');
            }}
            className="shrink-0 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700/60 transition-colors"
          >
            دنا پلاس توربو
          </button>
          <button
            onClick={() => {
              setBrandId('saipa');
              setModelId('shahin');
              setYear('۱۴۰۰ تا ۱۴۰۳');
            }}
            className="shrink-0 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700/60 transition-colors"
          >
            شاهین
          </button>
          <button
            onClick={() => {
              setBrandId('renault');
              setModelId('sandero');
              setYear('۱۳۹۴ تا ۱۳۹۸');
            }}
            className="shrink-0 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700/60 transition-colors"
          >
            رنو ساندرو
          </button>
        </div>
      </div>
    </div>
  );
}
