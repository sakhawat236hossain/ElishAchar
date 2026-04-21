export default function SecondHero({ onOrderClick }) {
  return (
    <section className="w-full py-12 md:py-20 px-4 md:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <h2 className="text-xl md:text-2xl font-bold">শতভাগ হালাল</h2>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              গরুর মাংসের ঝুরা আচার
            </h1>

            <p className="text-gray-200 leading-relaxed text-base md:text-lg">
              আরেকটি দুর্দান্ত পণ্য - গরুর মাংসের ঝুরা আচার। শতভাগ হালাল এবং দেশি উপাদান দিয়ে তৈরি এই আচার আপনার খাবারকে আরও সুস্বাদু করে তুলবে।
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-gray-700 p-4 rounded-lg shadow">
                <p className="text-sm text-gray-300">পরিমাণ</p>
                <p className="text-2xl font-bold text-white">৫০০ গ্রাম</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg shadow">
                <p className="text-sm text-gray-300">মূল্য</p>
                <p className="text-2xl font-bold text-white">৳৮০০</p>
              </div>
            </div>

            <button
              onClick={onOrderClick}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              অর্ডার করুন এখনই
            </button>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm h-80 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl shadow-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🥘</div>
                <p className="text-gray-700 font-semibold">গরুর মাংসের ঝুরা আচার</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
