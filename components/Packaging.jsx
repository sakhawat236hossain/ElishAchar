export default function Packaging() {
  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          📦 প্যাকেজিং ও পরিমাণ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm h-80 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl shadow-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-700 font-semibold">প্রিমিয়াম প্যাকেজিং</p>
              </div>
            </div>
          </div>

          {/* Right Information */}
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">পরিমাণ</h3>
              <p className="text-gray-700">৫০০ গ্রাম - ১ কেজি</p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">প্যাকেজিং মান</h3>
              <p className="text-gray-700">ফুড-গ্রেড জারে প্যাক করা হয় যা সম্পূর্ণ নিরাপদ এবং স্বাস্থ্যকর।</p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">সংরক্ষণ মেয়াদ</h3>
              <p className="text-gray-700">৬ মাস পর্যন্ত সংরক্ষণযোগ্য (ঠান্ডা ও শুষ্ক স্থানে)</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">ডেলিভারি</h3>
              <p className="text-gray-700">হোম ডেলিভারিতে পাবেন ইনশাআল্লাহ - সম্পূর্ণ নিরাপদে আপনার দোরগোড়ায়।</p>
            </div>

            <button className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
              অর্ডার করুন এখনই
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
