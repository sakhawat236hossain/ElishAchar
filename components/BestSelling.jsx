import Image from "next/image";

export default function BestSelling({ onOrderClick }) {
  const products = [
    {
      id: 1,
      name: 'ইলিশ মাছের আচার',
      image: '/elish.png',
      price: '৳১০০০',
      quantity: '৫০০ গ্রাম',
    },
    {
      id: 2,
      name: 'গরুর মাংসের ঝুরা',
      image: '/goru.jpg', 
      price: '৳৮০০',
      quantity: '৫০০ গ্রাম',
    },
    {
      id: 3,
      name: 'মিশ্র সবজির আচার',
      image: '/mix.jpg', 
      price: '৳৬০০',
      quantity: '৫০০ গ্রাম',
    },
  ];

  return (
    <section className="w-full py-12 px-4 md:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto"> {/* max-w কমিয়ে দেওয়া হয়েছে */}
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            আমাদের বেস্ট সেলিং পণ্যসমূহ
          </h2>
          <p className="text-gray-600 text-sm">সেরা স্বাদের নিশ্চয়তা</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* গ্যাপ কমিয়ে ৬ করা হয়েছে */}
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image Section */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Product Info */}
              <div className="p-4"> {/* প্যাডিং কমানো হয়েছে */}
                <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{product.quantity}</p>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-xl font-bold text-green-600">{product.price}</p>
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
      </div>
    </section>
  );
}