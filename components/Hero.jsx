export default function Hero({ onOrderClick }) {
  return (
    <section className="w-full py-12 md:py-20 px-4 md:px-8 bg-gradient-to-r from-green-50 to-emerald-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm h-80 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl shadow-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🐟</div>
                <p className="text-gray-600 font-semibold">ইলিশ মাছের আচার</p>
              </div>
            </div>
          </div>

          {/* Right Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <h2 className="text-xl md:text-2xl font-bold text-green-700">শতভাগ হালাল</h2>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              ইলিশ মাছের আচার
            </h1>

            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              বাংলার ঐতিহ্য আর ঘ্রাণের অনন্য সংমিশ্রণ – পরিচয় করিয়ে দিচ্ছি "ইলিশ মাছের আচার"। শতভাগ দেশি উপকরণ আর ঘরের রান্নার স্বাদে প্রস্তুত এই আচার আপনাকে ফিরিয়ে নিয়ে যাবে মায়ের হাতের রান্নায়।
            </p>

            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
              <div className="flex items-start gap-2">
                <span className="text-xl">🔒</span>
                <p className="text-gray-800 font-semibold">১০০% হাইজেনিক ও নিরাপদ</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-2xl font-bold text-green-600">৫০০ গ্রাম</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-2xl font-bold text-green-600">৳১০০০</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-sm text-gray-600">প্রতিটি</p>
              </div>
            </div>

            <button
              onClick={onOrderClick}
              className="w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              অর্ডার করুন এখনই
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-12 pt-8 border-t-2 border-green-200">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-green-600">৩৫০০+</p>
            <p className="text-gray-600 text-sm md:text-base">সন্তুষ্ট গ্রাহক</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-green-600">১৫০০+</p>
            <p className="text-gray-600 text-sm md:text-base">পজিটিভ রিভিউ</p>
          </div>
        </div>
      </div>
    </section>
  );
}
