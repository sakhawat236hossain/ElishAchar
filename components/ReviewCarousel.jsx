import { useState } from 'react';

const reviews = [
  {
    id: 1,
    name: 'রহিম সাহেব',
    image: '👨',
    rating: 5,
    text: 'অসাধারণ স্বাদ! মায়ের রান্নার কথা মনে পড়ে গেল। প্যাকেজিংও খুবই ভালো ছিল।',
  },
  {
    id: 2,
    name: 'ফাতিমা বেগম',
    image: '👩',
    rating: 5,
    text: 'এত সুস্বাদু আচার আগে কখনো খাইনি! ঘর ভেঙে বাজারে যাওয়ার দরকার নেই।',
  },
  {
    id: 3,
    name: 'করিম ভাই',
    image: '👨',
    rating: 5,
    text: 'বন্ধুদের কাছে সবাই সুপারিশ করেছি। গুণমান এবং স্বাদ অতুলনীয়।',
  },
  {
    id: 4,
    name: 'নাজমা আপা',
    image: '👩',
    rating: 5,
    text: 'বাজারের যেকোনো আচারের চেয়ে ভালো। দামও ন্যায্য দিয়েছেন।',
  },
  {
    id: 5,
    name: 'আমিন হোসেন',
    image: '👨',
    rating: 5,
    text: 'প্রতি সপ্তাহে অর্ডার করি এখন। পরিবারের সবাই ভালোবাসে।',
  },
];

export default function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const currentReview = reviews[currentIndex];

  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
          গ্রাহকদের মতামত
        </h2>
        <p className="text-center text-gray-600 mb-12">আমাদের সন্তুষ্ট গ্রাহকরা কি বলেছেন</p>

        <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 p-8 md:p-12 rounded-xl shadow-lg">
          {/* Review Card */}
          <div className="min-h-64 flex flex-col justify-center">
            <div className="text-center">
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div className="text-6xl">{currentReview.image}</div>
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(currentReview.rating)].map((_, i) => (
                  <span key={i} className="text-2xl">⭐</span>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-lg md:text-xl mb-4 leading-relaxed italic">
                "{currentReview.text}"
              </p>

              {/* Name */}
              <p className="text-gray-900 font-bold text-lg">{currentReview.name}</p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full bg-white hover:bg-green-100 border-2 border-green-600 text-green-600 font-bold text-xl transition-all duration-300 flex items-center justify-center"
              aria-label="Previous review"
            >
              ←
            </button>

            {/* Indicators */}
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-green-600 w-8' : 'bg-gray-300 w-3'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-white hover:bg-green-100 border-2 border-green-600 text-green-600 font-bold text-xl transition-all duration-300 flex items-center justify-center"
              aria-label="Next review"
            >
              →
            </button>
          </div>

          {/* Counter */}
          <div className="text-center mt-6 text-sm text-gray-600">
            {currentIndex + 1} / {reviews.length}
          </div>
        </div>
      </div>
    </section>
  );
}
