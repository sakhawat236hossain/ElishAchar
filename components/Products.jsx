"use client";

import { useState, useEffect } from "react";

const SHIPPING = 50;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // নতুন: বাটন লোডিং স্টেট
  const [formData, setFormData] = useState({ 
    name: "", 
    phone: "", 
    address: "",
    paymentMethod: "Cash on Delivery", 
    note: "" 
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/get");
        const result = await res.json();
        if (result.success) setProducts(result.data);
      } catch (error) {
        console.error("পণ্য লোড করতে সমস্যা:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleProduct = (productId) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectedProductsList = products.filter((p) => selectedProducts[p._id]);
  const subtotal = selectedProductsList.reduce((sum, p) => sum + p.price, 0);
  const total = subtotal + SHIPPING;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedProductsList.length === 0) return alert("দয়া করে অন্তত একটি পণ্য সিলেক্ট করুন");

    setIsSubmitting(true); // বাটন ডিজেবল এবং লোডিং শুরু

    const orderData = {
      customer: formData,
      products: selectedProductsList,
      subtotal,
      total,
      orderDate: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/orders/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const result = await response.json();
      
      if (result.success) {
        setOrderPlaced(true); // সাকসেস মেসেজ দেখাবে
      } else {
        alert("অর্ডার সফল হয়নি, আবার চেষ্টা করুন।");
      }
    } catch (error) {
      alert("সার্ভার এরর, পরে চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false); // লোডিং বন্ধ
    }
  };

  if (loading) return <div className="text-center py-20">পণ্য লোড হচ্ছে...</div>;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* বাম পাশ - প্রোডাক্ট লিস্ট */}
        <div>
          <h2 className="text-3xl font-bold mb-8">আমাদের সকল পণ্য</h2>
          <div className="space-y-4">
            {products.slice(0, visibleCount).map((product) => (
              <div 
                key={product._id} 
                className={`flex gap-4 p-4 border-2 rounded-xl transition-all ${
                  selectedProducts[product._id] ? "border-green-600 bg-green-50" : "border-gray-200"
                }`}
              >
                <input 
                  type="checkbox" 
                  checked={!!selectedProducts[product._id]} 
                  onChange={() => toggleProduct(product._id)}
                  className="w-6 h-6 mt-4 cursor-pointer"
                />
                <img src={product.image || "/placeholder.jpg"} alt={product.name} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{product.name}</h4>
                  <p className="text-gray-500 text-sm">{product.description}</p>
                  <p className="font-bold text-green-700 mt-1">৳{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < products.length && (
            <button 
              onClick={() => setVisibleCount(visibleCount + 4)}
              className="mt-6 w-full py-3 bg-gray-100 font-bold rounded-lg hover:bg-gray-200"
            >
              আরও দেখুন
            </button>
          )}
        </div>

        {/* ডান পাশ - অর্ডার সামারি এবং ফর্ম */}
        <div className="space-y-6">
          {orderPlaced ? (
            // অর্ডার সফল হলে এই অংশ দেখাবে
            <div className="bg-green-100 p-8 rounded-xl text-center border-2 border-green-500">
              <h3 className="text-2xl font-bold text-green-800 mb-2">অভিনন্দন!</h3>
              <p className="text-green-700">আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                নতুন অর্ডার করুন
              </button>
            </div>
          ) : (
            // অর্ডার না হওয়া পর্যন্ত ফর্ম দেখাবে
            <>
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h3 className="text-xl font-bold mb-4">অর্ডার সামারি</h3>
                {selectedProductsList.map((p) => (
                  <div key={p._id} className="flex justify-between py-1">
                    <span>{p.name}</span>
                    <span>৳{p.price}</span>
                  </div>
                ))}
                <div className="border-t mt-4 pt-4 font-bold text-xl flex justify-between">
                  <span>মোট:</span>
                  <span>৳{total}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl border space-y-4">
                <input name="name" onChange={handleFormChange} className="w-full p-3 rounded border" placeholder="আপনার নাম" required />
                <input name="phone" onChange={handleFormChange} className="w-full p-3 rounded border" placeholder="ফোন নাম্বার" required />
                <textarea name="address" onChange={handleFormChange} className="w-full p-3 rounded border" placeholder="আপনার ঠিকানা" required />
                
                <select name="paymentMethod" onChange={handleFormChange} className="w-full p-3 rounded border">
                  <option value="Cash on Delivery">ক্যাশ অন ডেলিভারি (COD)</option>
                  <option value="Bkash">বিকাশ (Bkash)</option>
                </select>
                <textarea name="note" onChange={handleFormChange} className="w-full p-3 rounded border" placeholder="অর্ডার নোট (ঐচ্ছিক)" />

                <button 
                  type="submit" 
                  disabled={isSubmitting} // সাবমিট চলাকালীন বাটন বন্ধ
                  className={`w-full font-bold py-3 rounded-lg text-white ${
                    isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isSubmitting ? "অর্ডার করা হচ্ছে..." : "অর্ডার করুন"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}