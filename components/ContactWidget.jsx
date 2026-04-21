"use client"; // Next.js এ ব্যবহার করলে এটি অবশ্যই লাগবে
import { useState } from 'react';

export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-3">
      {isOpen && (
        <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/*     */}
          {/* WhatsApp */}
<a
  href="https://wa.me/8801XXXXXXXXX"
  target="_blank"
  rel="noopener noreferrer"
  className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform overflow-hidden"
>
  <img src="WhatsApp.png" alt="WhatsApp" className="w-8 h-8" />
</a>
            
          
          {/* Phone Call */}
          <a
            href="tel:+8801851121472" 
            className="w-14 h-14 cursor-pointer bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform text-white text-2xl"
          >
            📞
          </a>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 cursor-pointer bg-gray-900 rounded-full flex items-center justify-center shadow-2xl hover:bg-gray-800 transition-all duration-300 text-white text-3xl"
      >
        {isOpen ? '✖' : '📩'}
      </button>
    </div>
  );
}