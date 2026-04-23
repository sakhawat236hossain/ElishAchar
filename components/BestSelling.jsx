'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";

export default function BestSelling({ onOrderClick }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products/get');
        const result = await res.json();
        if (result.success) {
          setProducts(result.data);
        }
      } catch (error) {
        console.error("ডাটা ফেচ করতে সমস্যা হয়েছে", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // স্লাইস করা প্রোডাক্টস
  const visibleProducts = products.slice(0, visibleCount);

 if (loading) return (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600"></div>
  </div>
);

  return (
    <section className="w-full py-12 px-4 md:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">আমাদের বেস্ট সেলিং পণ্যসমূহ</h2>
          <p className="text-gray-600 text-sm">সেরা স্বাদের নিশ্চয়তা</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{product.weight}</p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xl font-bold text-green-600">৳{product.price}</p>
                </div>
                <button
                  onClick={onOrderClick}
                  className="w-full py-2 cursor-pointer bg-gray-900 hover:bg-green-600 text-white font-bold rounded-lg transition-all duration-300 active:scale-95"
                >
                  অর্ডার করুন
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* See More / See Less Button Logic */}
        {products.length > 6 && (
          <div className="text-center mt-10">
            {visibleCount < products.length ? (
              <button
                onClick={() => setVisibleCount(visibleCount + 6)}
                className="px-8 py-3 cursor-pointer  bg-white border border-gray-300 hover:border-gray-900 font-bold rounded-full transition-all duration-300"
              >
                আরও দেখুন
              </button>
            ) : (
              <button
                onClick={() => setVisibleCount(6)}
                className="px-8 py-3 cursor-pointer bg-white border border-gray-300 hover:border-gray-900 font-bold rounded-full transition-all duration-300"
              >
                কম দেখুন
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}