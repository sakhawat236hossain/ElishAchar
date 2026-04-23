"use client";

import OrderDetailsModal from "./OrderDetailsModal/OrderDetailsModal";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("all");

  // আপনার লজিকগুলো অপরিবর্তিত রাখা হয়েছে
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin";

  useEffect(() => {
    if (isLoggedIn) {
      loadOrdersFromStorage();
      const pollInterval = setInterval(loadOrdersFromStorage, 1000);
      window.addEventListener("storage", loadOrdersFromStorage);
      return () => {
        clearInterval(pollInterval);
        window.removeEventListener("storage", loadOrdersFromStorage);
      };
    }
  }, [isLoggedIn]);

  const loadOrdersFromStorage = () => {
    const stored = localStorage.getItem("admin_orders");
    if (stored) {
      try {
        setOrders(JSON.parse(stored));
      } catch (e) {
        console.log("No stored orders");
      }
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      setLoginError("ভুল ইউজারনেম বা পাসওয়ার্ড");
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order,
    );
    setOrders(updatedOrders);
    localStorage.setItem("admin_orders", JSON.stringify(updatedOrders));
  };

  const deleteOrder = (orderId) => {
    if (confirm("এই অর্ডার মুছতে কি নিশ্চিত?")) {
      const updatedOrders = orders.filter((order) => order.id !== orderId);
      setOrders(updatedOrders);
      localStorage.setItem("admin_orders", JSON.stringify(updatedOrders));
    }
  };

  const stats = {
    total: orders.length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    pending: orders.filter((o) => o.status === "pending").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  };

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-sm shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            অ্যাডমিন প্যানেল
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-800 text-white p-3 rounded-lg border border-slate-700"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 text-white p-3 rounded-lg border border-slate-700"
            />
            {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold">
              লগইন
            </button>
          </form>

          <p className="text-slate-400 text-sm mt-4">
            অ্যাডমিন লগইন করতে হলে ইউজারনেম: admin, পাসওয়ার্ড: admin
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link to={"/"} className="text-2xl font-bold text-white" href="/">
            ড্যাশবোর্ড
          </Link>
          <p className="text-slate-400">অর্ডার ম্যানেজমেন্ট সিস্টেম</p>
        </div>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="bg-red-900/30 text-red-400 px-4 py-2 rounded-lg hover:bg-red-900/50 transition"
        >
          লগআউট
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "মোট অর্ডার", value: stats.total },
          { label: "রাজস্ব (৳)", value: stats.totalRevenue.toLocaleString() },
          { label: "অপেক্ষমাণ", value: stats.pending },
          { label: "সফল ডেলিভারি", value: stats.delivered },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-slate-900 border border-slate-800 p-4 rounded-xl"
          >
            <p className="text-slate-400 text-sm">{item.label}</p>
            <p className="text-2xl font-bold text-white">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex gap-2 overflow-x-auto">
          {["all", "pending", "processing", "shipped", "delivered"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-lg capitalize text-sm ${filter === s ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400 text-sm">
                <th className="p-4">ID</th>
                <th className="p-4">কাস্টমার</th>
                <th className="p-4">টাকা</th>
                <th className="p-4">স্ট্যাটাস</th>
                <th className="p-4">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-sm">
                    {order.id.slice(-6)}
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-white">
                      {order.customer.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {order.customer.phone}
                    </p>
                  </td>
                  <td className="p-4 font-bold text-green-400">
                    ৳{order.total}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status === "delivered" ? "bg-green-900/30 text-green-400" : "bg-yellow-900/30 text-yellow-400"}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedOrder(order)} // এখানে অর্ডার সেট করুন
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      বিস্তারিত
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
    
  );
}
