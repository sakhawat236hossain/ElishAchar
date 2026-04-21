export default function BestSelling({ onOrderClick }) {
  const products = [
    {
      id: 1,
      name: 'ইলিশ মাছের আচার',
      emoji: '🐟',
      price: '৳১০০০',
      quantity: '৫০০ গ্রাম',
    },
    {
      id: 2,
      name: 'গরুর মাংসের ঝুরা',
      emoji: '🥘',
      price: '৳৮০০',
      quantity: '৫০০ গ্রাম',
    },
    {
      id: 3,
      name: 'মিশ্র সবজির আচার',
      emoji: '🥒',
      price: '৳৬০০',
      quantity: '৫০০ গ্রাম',
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          আমাদের বেস্ট সেলিং পণ্যসমূহ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="w-full h-48 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                <div className="text-6xl">{product.emoji}</div>
              </div>

              {/* Product Info */}
              <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{product.name}</h3>
              <p className="text-gray-600 text-sm text-center mb-4">{product.quantity}</p>

              {/* Price */}
              <div className="text-center mb-6">
                <p className="text-2xl font-bold text-green-600">{product.price}</p>
              </div>

              {/* Order Button */}
              <button
                onClick={onOrderClick}
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
              >
                অর্ডার করুন
              </button>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={onOrderClick}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 text-lg"
          >
            এখনই অর্ডার করুন
          </button>
        </div>
      </div>
    </section>
  );
}
