export default function WhyChooseUs() {
  const reasons = [
    {
      emoji: '🐟',
      title: 'শুদ্ধ পদ্মা-মেঘনার দেশি ইলিশ মাছ',
      description: 'শুধুমাত্র দেশের সেরা ইলিশ মাছ নির্বাচন করা হয় প্রতিটি ব্যাচে।',
    },
    {
      emoji: '🧄',
      title: 'খাঁটি মসলা আর দেশি রেসিপি',
      description: 'প্রজন্মের পর প্রজন্ম ধরে চলে আসা ঐতিহ্যবাহী রেসিপি ব্যবহার করি আমরা।',
    },
    {
      emoji: '🌶️',
      title: 'হালকা ঝাল আর দারুণ ফ্লেভার',
      description: 'প্রতিটি স্বাদের জন্য নিখুঁত ভারসাম্য - সুস্বাদু এবং স্বাস্থ্যকর।',
    },
    {
      emoji: '🧴',
      title: 'কোনো প্রিজারভেটিভ নেই',
      description: 'সম্পূর্ণ প্রাকৃতিক উপাদান দিয়ে তৈরি - আপনার পরিবারের জন্য সেরা।',
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
          কেন খাবেন আমাদের ইলিশ মাছের আচার?
        </h2>
        <p className="text-center text-gray-600 mb-12">আমাদের অনন্য বৈশিষ্ট্য এবং গুণমান জানুন</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left Image */}
          <div className="flex justify-center items-center order-2 md:order-1">
            <div className="w-full max-w-sm h-80 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl shadow-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl mb-4">🐟</div>
                <p className="text-gray-700 font-semibold text-lg">প্রিমিয়াম মানের আচার</p>
              </div>
            </div>
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-1 gap-4 order-1 md:order-2">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-green-500"
              >
                <div className="flex gap-4">
                  <div className="text-3xl flex-shrink-0">{reason.emoji}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
