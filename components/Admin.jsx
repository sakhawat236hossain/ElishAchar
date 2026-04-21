'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filter, setFilter] = useState('all');

  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'admin';

  useEffect(() => {
    if (isLoggedIn) {
      loadOrdersFromStorage();
      
      // Poll localStorage every 1 second for real-time updates
      const pollInterval = setInterval(() => {
        loadOrdersFromStorage();
      }, 1000);
      
      const handleStorageChange = () => {
        loadOrdersFromStorage();
      };
      window.addEventListener('storage', handleStorageChange);
      
      return () => {
        clearInterval(pollInterval);
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, [isLoggedIn]);

  const loadOrdersFromStorage = () => {
    const stored = localStorage.getItem('admin_orders');
    if (stored) {
      try {
        setOrders(JSON.parse(stored));
      } catch (e) {
        console.log('No stored orders');
      }
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
    } else {
      setLoginError('ভুল ইউজারনেম বা পাসওয়ার্ড');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('admin_orders', JSON.stringify(updatedOrders));
  };

  const deleteOrder = (orderId) => {
    if (confirm('এই অর্ডার মুছতে কি নিশ্চিত?')) {
      const updatedOrders = orders.filter((order) => order.id !== orderId);
      setOrders(updatedOrders);
      localStorage.setItem('admin_orders', JSON.stringify(updatedOrders));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'অপেক্ষমাণ';
      case 'processing':
        return 'প্রক্রিয়াধীন';
      case 'shipped':
        return 'প্রেরণকৃত';
      case 'delivered':
        return 'বিতরণকৃত';
      default:
        return 'অজানা';
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
  };

  // লগইন পৃষ্ঠা
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">⚙️ অ্যাডমিন</h1>
              <p className="text-slate-600">আলেশা বাজার - ড্যাশবোর্ড</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-slate-700 font-bold mb-2">ইউজারনেম</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 focus:border-slate-600 focus:outline-none font-semibold"
                  placeholder="admin"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-2">পাসওয়ার্ড</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 focus:border-slate-600 focus:outline-none font-semibold"
                  placeholder="••••••••"
                  required
                />
              </div>

              {loginError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700 font-semibold">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg"
              >
                লগইন করুন
              </button>
            </form>

            <div className="mt-6 p-4 bg-slate-50 rounded-lg text-center text-sm text-slate-600">
              <p className="font-semibold mb-2">ডেমো লগইন:</p>
              <p>ইউজারনেম: <code className="bg-white px-2 py-1 rounded font-bold">admin</code></p>
              <p>পাসওয়ার্ড: <code className="bg-white px-2 py-1 rounded font-bold">admin</code></p>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-slate-600 hover:text-slate-900 font-semibold transition-colors"
              >
                ← হোম পেজে ফিরুন
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // অ্যাডমিন ড্যাশবোর্ড
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* হেডার */}
      <div className="bg-slate-800 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div>
              <h1 className="text-3xl font-bold text-white">⚙️ অ্যাডমিন ড্যাশবোর্ড</h1>
              <p className="text-slate-300 text-sm">আলেশা বাজার অর্ডার ম্যানেজমেন্ট</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                ← হোম
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                লগআউট
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* পরিসংখ্যান কার্ড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
            <div className="text-4xl font-bold">{stats.total}</div>
            <p className="text-blue-100 mt-2">মোট অর্ডার</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-6 text-white shadow-lg">
            <div className="text-4xl font-bold">{stats.pending}</div>
            <p className="text-yellow-100 mt-2">অপেক্ষমাণ</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
            <div className="text-4xl font-bold">{stats.processing}</div>
            <p className="text-purple-100 mt-2">প্রক্রিয়াধীন</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-6 text-white shadow-lg">
            <div className="text-4xl font-bold">{stats.shipped}</div>
            <p className="text-indigo-100 mt-2">প্রেরণকৃত</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
            <div className="text-4xl font-bold">{stats.delivered}</div>
            <p className="text-green-100 mt-2">বিতরণকৃত</p>
          </div>
        </div>

        {/* রাজস্ব */}
        <div className="bg-slate-700 rounded-lg p-6 text-white mb-8 shadow-lg">
          <p className="text-slate-300">মোট রাজস্ব</p>
          <h2 className="text-4xl font-bold mt-2">৳{stats.totalRevenue.toLocaleString('bn-BD')}</h2>
        </div>

        {/* ফিল্টার */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { value: 'all', label: 'সব অর্ডার' },
            { value: 'pending', label: 'অপেক্ষমাণ' },
            { value: 'processing', label: 'প্রক্রিয়াধীন' },
            { value: 'shipped', label: 'প্রেরণকৃত' },
            { value: 'delivered', label: 'বিতরণকৃত' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                filter === f.value
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* অর্ডার লিস্ট */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-slate-700 rounded-lg p-8 text-center text-slate-300">
              <p className="text-lg">কোনো অর্ডার নেই</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-slate-700 rounded-lg overflow-hidden shadow-lg">
                {/* অর্ডার হেডার */}
                <button
                  onClick={() => toggleOrderDetails(order.id)}
                  className="w-full p-6 hover:bg-slate-600 transition-colors text-left flex justify-between items-center"
                >
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="text-white font-bold text-lg">{order.id}</span>
                      <span className={`px-4 py-2 rounded-full font-bold text-sm ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <div className="text-slate-300 mt-2">
                      <p><strong>{order.customer.name}</strong> • {order.customer.phone}</p>
                      <p className="text-sm">{new Date(order.orderDate).toLocaleDateString('bn-BD')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-400">৳{order.total}</p>
                    <p className="text-slate-400 text-sm">{order.products.length} পণ্য</p>
                  </div>
                </button>

                {/* বিস্তারিত বিবরণ */}
                {expandedOrder === order.id && (
                  <div className="border-t border-slate-600 p-6 bg-slate-800 space-y-6">
                    {/* গ্রাহক তথ্য */}
                    <div>
                      <h4 className="text-white font-bold mb-3">গ্রাহক তথ্য</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
                        <div>
                          <p className="text-slate-400 text-sm">নাম</p>
                          <p className="font-semibold text-white">{order.customer.name}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">ফোন</p>
                          <p className="font-semibold text-white">{order.customer.phone}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-slate-400 text-sm">ঠিকানা</p>
                          <p className="font-semibold text-white">{order.customer.address}</p>
                        </div>
                      </div>
                    </div>

                    {/* পণ্য */}
                    <div>
                      <h4 className="text-white font-bold mb-3">অর্ডারকৃত পণ্য</h4>
                      <div className="space-y-2">
                        {order.products.map((product, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-slate-700 p-3 rounded">
                            <span className="text-slate-200">{product.name}</span>
                            <span className="text-white font-bold">৳{product.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* খরচ সারসংক্ষেপ */}
                    <div className="bg-slate-700 p-4 rounded">
                      <div className="flex justify-between text-slate-300 mb-2">
                        <span>সাবটোটাল:</span>
                        <span className="text-white font-semibold">৳{order.subtotal}</span>
                      </div>
                      <div className="flex justify-between text-slate-300 mb-3 pb-3 border-b border-slate-600">
                        <span>ডেলিভারি:</span>
                        <span className="text-white font-semibold">৳{order.shipping}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-white">মোট:</span>
                        <span className="text-2xl font-bold text-green-400">৳{order.total}</span>
                      </div>
                    </div>

                    {/* পেমেন্ট এবং সময় */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-slate-400 text-sm">পেমেন��ট পদ্ধতি</p>
                        <p className="font-semibold text-white">{order.paymentMethod}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">অর্ডার তারিখ</p>
                        <p className="font-semibold text-white">{new Date(order.orderDate).toLocaleDateString('bn-BD')}</p>
                      </div>
                    </div>

                    {/* স্ট্যাটাস আপডেট */}
                    <div>
                      <h4 className="text-white font-bold mb-3">স্ট্যাটাস আপডেট করুন</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {[
                          { value: 'pending', text: 'অপেক্ষমাণ' },
                          { value: 'processing', text: 'প্রক্রিয়াধীন' },
                          { value: 'shipped', text: 'প্রেরণকৃত' },
                          { value: 'delivered', text: 'বিতরণকৃত' },
                        ].map((s) => (
                          <button
                            key={s.value}
                            onClick={() => updateOrderStatus(order.id, s.value)}
                            className={`px-4 py-2 rounded font-semibold transition-colors ${
                              order.status === s.value
                                ? 'bg-green-600 text-white'
                                : 'bg-slate-600 text-slate-200 hover:bg-slate-500'
                            }`}
                          >
                            {s.text}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* অ্যাকশন */}
                    <div className="flex gap-3 pt-4 border-t border-slate-600">
                      <button
                        onClick={() => deleteOrder(order.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
                      >
                        মুছুন
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
