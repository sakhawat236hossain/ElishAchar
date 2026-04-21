'use client';

import { useState } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import ProductDetails from '@/components/ProductDetails';
import VideoSection from '@/components/VideoSection';
import ReviewCarousel from '@/components/ReviewCarousel';
import HowToEat from '@/components/HowToEat';
import Packaging from '@/components/Packaging';
import WhyChooseUs from '@/components/WhyChooseUs';
import OrderSection from '@/components/OrderSection';
import SecondHero from '@/components/SecondHero';
import BestSelling from '@/components/BestSelling';
import SafetySection from '@/components/SafetySection';
import Products from '@/components/Products';
import Checkout from '@/components/Checkout';
import Footer from '@/components/Footer';

export default function Home() {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <main className="w-full">
      {/* Admin Link - Hidden in corner */}
      <div className="fixed bottom-4 right-4 z-40">
        <Link
          href="/admin"
          className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg transition-all duration-200 transform hover:scale-110"
          title="Admin Dashboard"
        >
          ⚙️ অ্যাডমিন
        </Link>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <Checkout onClose={() => setShowCheckout(false)} />
        </div>
      )}

      <Hero onOrderClick={() => setShowCheckout(true)} />
      <ProductDetails onOrderClick={() => setShowCheckout(true)} />
      <VideoSection />
      <ReviewCarousel />
      <HowToEat />
      <Packaging />
      <WhyChooseUs />
      <OrderSection />
      <SecondHero onOrderClick={() => setShowCheckout(true)} />
      <BestSelling onOrderClick={() => setShowCheckout(true)} />
      <SafetySection />
      <Products onOrderClick={() => setShowCheckout(true)} />
      <Footer />
    </main>
  );
}
