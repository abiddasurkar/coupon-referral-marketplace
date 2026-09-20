"use client";

import React from "react";
import { MessageCircle, Bell, Sparkles, CheckCheck } from "lucide-react";

export const WhatsAppBotBanner: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-emerald-900 via-teal-900 to-gray-900 text-white rounded-3xl my-12 overflow-hidden shadow-xl mx-4 sm:mx-6 lg:mx-8">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left copy */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WhatsApp Native Automation</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Get Instant Deals Directly in Your WhatsApp Chat
          </h2>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Never open a browser to hunt for expired codes again. Just ping our WhatsApp bot
            with the brand name or join our community alert channel for flash discounts.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/?text=Hi%20CouponHub!%20Send%20me%20today%27s%20best%20deals"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-sm shadow-lg shadow-emerald-500/30 transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-gray-950" />
              <span>Try WhatsApp Bot</span>
            </a>

            <a
              href="https://wa.me/?text=Join%20Daily%20Coupon%20Drops"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4 text-emerald-300" />
              <span>Subscribe to Daily Drops</span>
            </a>
          </div>
        </div>

        {/* Right WhatsApp Mockup Chat Window */}
        <div className="bg-[#0b141a] rounded-2xl p-4 border border-emerald-500/20 shadow-2xl max-w-md mx-auto w-full font-sans text-xs space-y-3">
          {/* Mockup Header */}
          <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
              CH
            </div>
            <div>
              <div className="font-bold text-gray-100 flex items-center gap-1.5">
                <span>CouponHub Bot</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <p className="text-[10px] text-emerald-400">Official Cloud API Bot • Online</p>
            </div>
          </div>

          {/* User message */}
          <div className="flex justify-end">
            <div className="bg-[#005c4b] text-gray-100 px-3.5 py-2 rounded-2xl rounded-tr-xs max-w-[80%] shadow-xs">
              <p>!deal swiggy</p>
              <span className="text-[9px] text-emerald-300 flex justify-end mt-1 items-center gap-0.5">
                09:12 AM <CheckCheck className="w-3 h-3 text-cyan-400" />
              </span>
            </div>
          </div>

          {/* Bot reply */}
          <div className="flex justify-start">
            <div className="bg-[#202c33] text-gray-200 px-3.5 py-2.5 rounded-2xl rounded-tl-xs max-w-[85%] space-y-1.5 shadow-xs">
              <p className="font-bold text-emerald-400">🎉 Found 2 verified Swiggy coupons!</p>
              <div className="p-2 bg-[#111b21] rounded-lg border border-gray-700/60 font-mono text-[11px]">
                <p className="text-white font-bold">Code: SWIGGYGOURMET</p>
                <p className="text-gray-400 text-[10px]">Flat ₹150 OFF on orders &gt; ₹399</p>
                <p className="text-emerald-400 text-[10px]">98% verified by community</p>
              </div>
              <p className="text-[10px] text-gray-400">
                Tap to copy or reply with <strong>!report</strong> if expired.
              </p>
              <span className="text-[9px] text-gray-400 flex justify-end">09:12 AM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
