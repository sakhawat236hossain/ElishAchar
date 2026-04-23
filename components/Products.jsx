"use client";

import { useState, useEffect } from "react";

const SHIPPING = 50;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery",
    note: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null); // অর্ডারের ডাটা এখানে থাকবে

  // পিডিএফ জেনারেট করার ফাংশন
  const handleDownloadInvoice = async () => {
    if (!placedOrder) return;

    const { jsPDF } = await import("jspdf/dist/jspdf.umd.min.js");
    const { default: autoTable } = await import("jspdf-autotable");

    const doc = new jsPDF();

    // ১. হেডার
    doc.setFillColor(22, 163, 74);
    doc.rect(0, 0, 210, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("ALESHA BAZAR", 14, 20);
    doc.setTextColor(0, 0, 0);

    // ২. অর্ডার ইনফরমেশন
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Order ID: #${placedOrder.orderId}`, 14, 40);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 45);
    doc.text(`Customer Name: ${placedOrder.customer.name}`, 14, 50);
    doc.text(`Phone: ${placedOrder.customer.phone}`, 14, 55);
    doc.text(`Address: ${placedOrder.customer.address}`, 14, 60);

    // ৩. প্রোডাক্ট টেবিল
    const tableColumn = ["Product Name", "Price"];
    const tableRows = placedOrder.products.map((p) => [p.name, `${p.price}`]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 70,
      headStyles: { fillColor: [22, 163, 74] },
      theme: "striped",
    });

    // ৪. টোটাল সেকশন
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Subtotal: ${placedOrder.subtotal} Taka`, 140, finalY);
    doc.text(`Delivery Charge: 50 Taka`, 140, finalY + 7);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Amount: ${placedOrder.total} Taka`, 140, finalY + 14);

    // ৫. অতিরিক্ত সেকশন (ইংরেজিতে)
    const infoY = finalY + 30;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    // Payment Method
    doc.setFont("helvetica", "bold");
    doc.text("Payment Method:", 14, infoY);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Cash on Delivery (COD) - Please pay the delivery man upon receiving the product.",
      14,
      infoY + 7,
    );

    // Policy
    doc.setFont("helvetica", "bold");
    doc.text("Return & Refund Policy:", 14, infoY + 20);
    doc.setFont("helvetica", "normal");
    doc.text(
      "- Returns are accepted within 7 days if the product is damaged.",
      14,
      infoY + 27,
    );
    doc.text(
      "- This order was placed successfully without any advance payment.",
      14,
      infoY + 32,
    );

    // Contact
    doc.setFont("helvetica", "bold");
    doc.text("Need Help? Contact Us:", 14, infoY + 45);
    doc.setFont("helvetica", "normal");
    doc.text("Hotline: 01851121472", 14, infoY + 52);
    doc.text("Email: support@aleshabazar.com", 14, infoY + 57);
    doc.text("Website: www.aleshabazar.com", 14, infoY + 62);

    // ৬. ফুটার
    doc.setDrawColor(22, 163, 74);
    doc.line(14, infoY + 75, 195, infoY + 75);
    doc.text("Thank you for shopping with Alesha Bazar!", 14, infoY + 82);

    doc.save(`Invoice_${placedOrder.orderId}.pdf`);
  };
  // পণ্য লোড করা
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

  // অর্ডার সাবমিট লজিক
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedProductsList.length === 0)
      return alert("দয়া করে অন্তত একটি পণ্য সিলেক্ট করুন");

    setIsSubmitting(true);

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
        // এখানে অর্ডার ডাটা এবং আইডি সেভ করলাম পিডিএফ তৈরির জন্য
        setPlacedOrder({ ...orderData, orderId: result.orderId });
        setOrderPlaced(true);
      } else {
        alert("অর্ডার সফল হয়নি, আবার চেষ্টা করুন।");
      }
    } catch (error) {
      alert("সার্ভার এরর, পরে চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return <div className="text-center py-20">পণ্য লোড হচ্ছে...</div>;

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
                  selectedProducts[product._id]
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!selectedProducts[product._id]}
                  onChange={() => toggleProduct(product._id)}
                  className="w-6 h-6 mt-4 cursor-pointer"
                />
                <img
                  src={product.image || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{product.name}</h4>
                  <p className="text-gray-500 text-sm">{product.description}</p>
                  <p className="font-bold text-green-700 mt-1">
                    ৳{product.price}
                  </p>
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
            <div className="bg-green-100 p-8 rounded-xl text-center border-2 border-green-500">
              <h3 className="text-2xl font-bold text-green-800 mb-2">
                অভিনন্দন!
              </h3>
              <p className="text-green-700">
                আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।
              </p>

              {/* ডাউনলোড বাটন */}
              <button
                onClick={handleDownloadInvoice}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
              >
                📄 ইনভয়েস ডাউনলোড করুন
              </button>

              <button
                onClick={() => window.location.reload()}
                className="mt-4 w-full bg-gray-600 text-white py-3 rounded-lg font-bold hover:bg-gray-700 transition"
              >
                নতুন অর্ডার করুন
              </button>
            </div>
          ) : (
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

              <form
                onSubmit={handleSubmit}
                className="bg-gray-50 p-6 rounded-xl border space-y-4"
              >
                <input
                  name="name"
                  onChange={handleFormChange}
                  className="w-full p-3 rounded border"
                  placeholder="আপনার নাম"
                  required
                />
                <input
                  name="phone"
                  onChange={handleFormChange}
                  className="w-full p-3 rounded border"
                  placeholder="ফোন নাম্বার"
                  required
                />
                <textarea
                  name="address"
                  onChange={handleFormChange}
                  className="w-full p-3 rounded border"
                  placeholder="আপনার ঠিকানা"
                  required
                />

                <select
                  name="paymentMethod"
                  onChange={handleFormChange}
                  className="w-full p-3 rounded border"
                >
                  <option value="Cash on Delivery">
                    ক্যাশ অন ডেলিভারি (COD)
                  </option>
                  <option value="Bkash">বিকাশ (Bkash)</option>
                </select>
                <textarea
                  name="note"
                  onChange={handleFormChange}
                  className="w-full p-3 rounded border"
                  placeholder="অর্ডার নোট (ঐচ্ছিক)"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-bold py-3 rounded-lg text-white ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
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
