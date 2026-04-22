"use client";

import { useState } from "react";

const products = [
  {
    id: 1,
    name: "ইলিশ মাছের আচার",
    emoji: "🐟",
    price: 1000,
    quantity: "৫০০ গ্রাম",
    description: "খাঁটি ইলিশ মাছের সাথে মশলা ভেজানো স্বাদে ভরপুর আচার",
  },
  {
    id: 2,
    name: "গরুর মাংসের ঝুরা",
    emoji: "🥘",
    price: 800,
    quantity: "৫০০ গ্রাম",
    description: "কোমল গরুর মাংস এবং ঐতিহ্যবাহী মশলার সমন্বয়",
  },
  {
    id: 3,
    name: "মিশ্র সবজির আচার",
    emoji: "🥒",
    price: 600,
    quantity: "৫০০ গ্রাম",
    description: "তাজা সবজি এবং মৃদু মশলার স্বাস্থ্যকর মিশ্রণ",
  },
];

const SHIPPING = 50;

export default function Products({ onOrderClick }) {
  const [selectedProducts, setSelectedProducts] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleProductChange = (productId) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectedProductsList = products.filter((p) => selectedProducts[p.id]);
  const subtotal = selectedProductsList.reduce((sum, p) => sum + p.price, 0);
  const total = subtotal + SHIPPING;

  const generateInvoiceFile = async () => {
    try {
      const pdfMake = (await import("pdfmake/build/pdfmake")).default;
      const pdfFonts = (await import("pdfmake/build/vfs_fonts")).default;

      pdfMake.vfs =
        pdfFonts.vfs || (pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : {});
      const orderId = `ALB-${Date.now().toString().slice(-8)}`;
      const orderDate = new Date();

      const docDefinition = {
        content: [
          {
            text: "আলেশা বাজার",
            fontSize: 24,
            bold: true,
            color: "#16a34a",
            alignment: "center",
            margin: [0, 0, 0, 10],
          },
          {
            text: "শতভাগ হালাল হোমমেড আচার সরবরাহকারী",
            fontSize: 11,
            color: "#666666",
            alignment: "center",
            margin: [0, 0, 0, 15],
          },
          {
            text: `অর্ডার আইডি: ${orderId}`,
            fontSize: 12,
            bold: true,
            color: "#16a34a",
            alignment: "center",
            fillColor: "#dcfce7",
            margin: [0, 0, 0, 20],
            padding: [8, 8, 8, 8],
          },
          {
            text: "অর্ডার বিবরণ",
            fontSize: 13,
            bold: true,
            margin: [0, 0, 0, 10],
            color: "#1f2937",
          },
          {
            columns: [
              {
                text: `তারিখ: ${orderDate.toLocaleDateString("bn-BD")}`,
                fontSize: 10,
              },
              {
                text: `সময়: ${orderDate.toLocaleTimeString("bn-BD")}`,
                fontSize: 10,
              },
            ],
            margin: [0, 0, 0, 15],
          },
          {
            text: "গ্রাহক তথ্য",
            fontSize: 13,
            bold: true,
            margin: [0, 0, 0, 10],
            color: "#1f2937",
          },
          {
            stack: [
              `নাম: ${formData.name}`,
              `ফোন: ${formData.phone}`,
              `ঠিকানা: ${formData.address}`,
            ],
            fontSize: 10,
            margin: [0, 0, 0, 15],
          },
          {
            text: "অর্ডারকৃত পণ্য",
            fontSize: 13,
            bold: true,
            margin: [0, 0, 0, 10],
            color: "#1f2937",
          },
          {
            table: {
              headerRows: 1,
              widths: ["*", 80],
              body: [
                [
                  { text: "পণ্য", bold: true, fontSize: 10 },
                  { text: "দাম", bold: true, fontSize: 10, alignment: "right" },
                ],
                ...selectedProductsList.map((p) => [
                  `${p.emoji} ${p.name}`,
                  { text: `৳${p.price}`, alignment: "right" },
                ]),
              ],
            },
            margin: [0, 0, 0, 20],
          },
          {
            fillColor: "#f0fdf4",
            padding: [12, 12, 12, 12],
            table: {
              widths: ["*", 100],
              body: [
                [
                  { text: "সাবটোটাল:", fontSize: 10 },
                  { text: `৳${subtotal}`, alignment: "right", fontSize: 10 },
                ],
                [
                  { text: "ডেলিভারি চার্জ:", fontSize: 10 },
                  { text: `৳${SHIPPING}`, alignment: "right", fontSize: 10 },
                ],
                [
                  { text: "মোট:", fontSize: 12, bold: true, color: "#16a34a" },
                  {
                    text: `৳${total}`,
                    alignment: "right",
                    fontSize: 12,
                    bold: true,
                    color: "#16a34a",
                  },
                ],
              ],
            },
            margin: [0, 0, 0, 20],
          },
          {
            fillColor: "#dbeafe",
            padding: [12, 12, 12, 12],
            stack: [
              {
                text: "পেমেন্ট তথ্য",
                fontSize: 11,
                bold: true,
                color: "#0660d6",
                margin: [0, 0, 0, 8],
              },
              `পেমেন্ট পদ্ধতি: 💵 ক্যাশ অন ডেলিভারি (COD)`,
              `ডেলিভারি সময়: ২-৩ ব্যবসায়িক দিন`,
              `\n✓ অগ্রিম পেমেন্টের প্রয়োজন নেই`,
              `✓ ডেলিভারির সময় সরাসরি প্রদান করুন`,
              `✓ সম্পূর্ণ নিরাপদ এবং নির্ভরযোগ্য`,
            ],
            fontSize: 9,
            margin: [0, 0, 0, 20],
          },
          {
            text: [
              "ধন্যবাদ আপনার অর্ডারের জন্য!\n",
              "আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।\n",
              "ফোন: 01616123500",
            ],
            alignment: "center",
            fontSize: 10,
            margin: [0, 20, 0, 0],
          },
        ],
      };

      pdfMake.default
        .createPdf(docDefinition)
        .download(`আলেশা_বাজার_ইনভয়েস_${orderId}.pdf`);

      return orderId;
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("পিডিএফ তৈরিতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedProductsList.length === 0) {
      alert("দয়া করে কমপক্ষে একটি পণ্য নির্বাচন করুন");
      return;
    }

    // ১. generateInvoiceFile ফাংশন কল করে পিডিএফ তৈরি এবং orderId পাওয়া যাবে
    const orderId = await generateInvoiceFile();
    if (!orderId) return;

    // ২. ডাটাবেজে পাঠানোর জন্য অবজেক্ট তৈরি
    const orderData = {
      id: orderId,
      customer: formData,
      products: selectedProductsList.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: 1,
      })),
      subtotal,
      shipping: SHIPPING,
      total,
      orderDate: new Date().toISOString(),
      paymentMethod: "Cash on Delivery",
      status: "pending",
    };

    // ৩. API কল করে ডাটাবেজে পাঠানো
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        setOrderPlaced(true);
      } else {
        alert("অর্ডারটি ডাটাবেজে সেভ হয়নি। দয়া করে আবার চেষ্টা করুন।");
      }
    } catch (error) {
      console.error("Order Submission Error:", error);
      alert("সার্ভার এরর! দয়া করে যোগাযোগ করুন।");
    }
  };

  if (orderPlaced) {
    return (
      <div className="flex items-center justify-center p-4 min-h-[400px]">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            অর্ডার সফল!
          </h2>
          <p className="text-gray-600 mb-6">
            আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে। আমরা শীঘ্রই আপনার সাথে
            যোগাযোগ করব।
          </p>
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <p className="text-gray-700">
              <strong>গ্রাহক নাম:</strong> {formData.name}
            </p>
            <p className="text-gray-700">
              <strong>মোট টাকা:</strong>{" "}
              <span className="text-2xl font-bold text-green-700">
                ৳{total}
              </span>
            </p>
          </div>
          <button
            onClick={() => {
              setOrderPlaced(false);
              setSelectedProducts({});
              setFormData({ name: "", phone: "", address: "" });
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg w-full transition-colors"
          >
            আরও অর্ডার করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          আমাদের সকল পণ্য
        </h2>
        <p className="text-center text-gray-600 mb-12">
          সরাসরি এখানে অর্ডার করুন এবং পাবেন বিশেষ ছাড়
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* বাম পাশ - পণ্য নির্বাচন */}
          <div className="bg-gradient-to-b from-green-50 to-white rounded-xl shadow-lg p-6 border-2 border-green-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              পণ্য নির্বাচন করুন
            </h3>

            <div className="space-y-4 mb-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all"
                  onClick={() => handleProductChange(product.id)}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts[product.id] || false}
                      onChange={() => handleProductChange(product.id)}
                      className="w-6 h-6 rounded border-gray-300 text-green-600 cursor-pointer mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{product.emoji}</span>
                        <h4 className="text-lg font-bold text-gray-900">
                          {product.name}
                        </h4>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        {product.description}
                      </p>
                      <p className="text-gray-600 text-sm">
                        পরিমাণ: {product.quantity}
                      </p>
                      <p className="text-green-700 font-bold text-lg mt-2">
                        ৳{product.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* অর্ডার সারসংক্ষেপ */}
            {selectedProductsList.length > 0 && (
              <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  নির্বাচিত পণ্য
                </h4>
                <div className="space-y-3 mb-4">
                  {selectedProductsList.map((product) => (
                    <div
                      key={product.id}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700">
                        {product.emoji} {product.name}
                      </span>
                      <span className="font-bold text-gray-900">
                        ৳{product.price}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t-2 border-green-200 pt-3 space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>সাবটোটাল:</span>
                    <span className="font-semibold">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>ডেলিভারি চার্জ:</span>
                    <span className="font-semibold">৳{SHIPPING}</span>
                  </div>
                  <div className="border-t-2 border-green-200 pt-3 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      মোট:
                    </span>
                    <span className="text-3xl font-bold text-green-700">
                      ৳{total}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ডান পাশ - ফর্ম */}
          <div className="space-y-6">
            {/* গ্রাহক তথ্য ফর্ম */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                আপনার তথ্য
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    আপনার নাম *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none"
                    placeholder="আপনার সম্পূর্ণ নাম"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    মোবাইল নাম্বার *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none"
                    placeholder="0১xxxxxxxxx"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    সম্পূর্ণ ঠিকানা *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none"
                    placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
                    rows="4"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={selectedProductsList.length === 0}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg"
                >
                  অর্ডার করুন (৳{total})
                </button>
              </form>
            </div>

            {/* ক্যাশ অন ডেলিভারি তথ্য */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
              <h4 className="text-xl font-bold text-blue-900 mb-4">
                💵 ক্যাশ অন ডেলিভারি (COD)
              </h4>
              <div className="space-y-3 text-blue-900">
                <div className="flex items-start gap-3">
                  <span className="text-xl">✓</span>
                  <div>
                    <p className="font-semibold">অগ্রিম পেমেন্ট নেই</p>
                    <p className="text-sm text-blue-800">
                      কোনো অগ্রিম অর্থ প্রদান করতে হবে না
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">✓</span>
                  <div>
                    <p className="font-semibold">ডেলিভারিতে পেমেন্ট করুন</p>
                    <p className="text-sm text-blue-800">
                      পণ্য গ্রহণের সময় টাকা প্রদান করুন
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">✓</span>
                  <div>
                    <p className="font-semibold">দ্রুত ডেলিভারি</p>
                    <p className="text-sm text-blue-800">
                      ২-৩ ব্যবসায়িক দিনে সরবরাহ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
