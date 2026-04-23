'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Swiper এর প্রয়োজনীয় স্টাইল ইমপোর্ট
import 'swiper/css';
import 'swiper/css/navigation';

export default function BestSelling({ onOrderClick }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products/get');
        const result = await res.json();
        if (result.success) {
          setProducts(result.data);
        }
      } catch (error) {
        console.error("ডাটা ফেচ করতে সমস্যা হয়েছে", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600"></div>
    </div>
  );

  return (
    <section className="w-full py-12 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* হেডলাইন এবং নেভিগেশন বাটন */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">আমাদের বেস্ট সেলিং পণ্যসমূহ</h2>
            <p className="text-gray-600 text-sm">সেরা স্বাদের নিশ্চয়তা</p>
          </div>
          
          {/* বাটনগুলো */}
          <div className="flex gap-2">
            <button className="prev-btn p-3 bg-white border border-gray-300 hover:bg-green-600 hover:text-white rounded-full transition-all duration-300 shadow-sm">
              ←
            </button>
            <button className="next-btn p-3 bg-white border border-gray-300 hover:bg-green-600 hover:text-white rounded-full transition-all duration-300 shadow-sm">
              →
            </button>
          </div>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          navigation={{
            prevEl: '.prev-btn',
            nextEl: '.next-btn',
          }}
          slidesPerView={1}
          slidesPerGroup={1} // মোবাইলে ১টি করে স্লাইড হবে
          breakpoints={{
            640: { 
              slidesPerView: 2,
              slidesPerGroup: 2 
            },
            768: { 
              slidesPerView: 3,
              slidesPerGroup: 3 
            },
            1024: { 
              slidesPerView: 4, 
              slidesPerGroup: 4 // ডেস্কটপে ৪টি করে স্লাইড হবে
            },
          }}
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id} className="h-auto">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{product.weight}</p>
                  <p className="text-xl font-bold text-green-600 mb-4">৳{product.price}</p>
                  <button
                    onClick={() => onOrderClick(product)} // এখানে প্রোডাক্ট পাস করতে পারেন যদি প্রয়োজন হয়
                    className="w-full py-2 bg-gray-900 hover:bg-green-600 text-white font-bold rounded-lg transition-all duration-300 active:scale-95"
                  >
                    অর্ডার করুন
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}