import type { Metadata } from 'next';
import React from 'react';
import HeroSection from '@/components/HeroSection';
import VehicleSelector from '@/components/VehicleSelector';
import SpecialOffers from '@/components/SpecialOffers';
import PromoBanners from '@/components/PromoBanners';
import CategoryStrip from '@/components/CategoryStrip';
import BestSellers from '@/components/BestSellers';
import TrustBadges from '@/components/TrustBadges';
import HomeBlogSection from '@/components/HomeBlogSection';
import FaqAccordion from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: 'فروشگاه تخصصی لوازم یدکی خودرو',
  description:
    'فروشگاه آنلاین و تخصصی قطعات خودرو esyadak - خرید مستقیم انواع لوازم یدکی موتوری، سیستم ترمز، جلوبندی، تعلیق و برقی با ضمانت اصالت فیزیکی کالا.',
};

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Advanced Multi-step Vehicle Filter */}
      <VehicleSelector />

      {/* 3. Special Offers with Countdown Timer */}
      <SpecialOffers />

      {/* 4. Category Showcase */}
      <CategoryStrip />

      {/* 5. Promotional Banners */}
      <PromoBanners />

      {/* 6. Best Sellers with Category Switcher & Skeleton Loading */}
      <BestSellers />

      {/* 7. E-Commerce Trust Badges & Guarantees */}
      <TrustBadges />

      {/* 8. Technical Automotive Blog Posts */}
      <HomeBlogSection />

      {/* 9. FAQ Section */}
      <FaqAccordion />
    </div>
  );
}
