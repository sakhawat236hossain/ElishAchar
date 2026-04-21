export default function SafetySection() {
  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Safety Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-600 text-white py-4 px-6">
            <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2">
              🔒 ১০০% হাইজেনিক ও নিরাপদ
            </h3>
          </div>
          <div className="p-6 md:p-8">
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              আমাদের প্রতিটি আচারের বোতল তৈরি হয় অত্যন্ত পরিষ্কার ও স্বাস্থ্যকর পরিবেশে। ঘরের মতো বিশ্বাসযোগ্য স্বাদ আর মান আমরা দিচ্ছি প্রতিটি প্যাকেজে। আমাদের সকল পণ্য সম্পূর্ণ হালাল এবং প্রাকৃতিক উপাদান দিয়ে তৈরি।
            </p>
          </div>
        </div>

        {/* Delivery Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white py-4 px-6">
            <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2">
              🚚 সারাদেশে ক্যাশ অন হোম ডেলিভারি
            </h3>
          </div>
          <div className="p-6 md:p-8">
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              সারাদেশে ক্যাশ অন হোম ডেলিভারি দেয়া হয়। পণ্য হাতে পেয়ে টাকা পরিশোধ করুন - সম্পূর্ণ নিরাপদ এবং সুবিধাজনক। আমরা দ্রুততম সময়ে আপনার দোরগোড়ায় পৌঁছে দিই।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
