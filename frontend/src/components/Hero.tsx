"use client";

import React from "react";
import { Search, ShieldCheck, Zap, Coins, MessageSquareCode } from "lucide-react";

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenSubmitModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onOpenSubmitModal,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-teal-50/30 to-white py-12 sm:py-16 border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-6 border border-emerald-300/60 shadow-xs">
          <MessageSquareCode className="w-3.5 h-3.5 text-emerald-600" />
          <span>WhatsApp-Native Coupon & Referral Community</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Never Pay Full Price.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
            Codes That Actually Work.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          A peer-to-peer verified marketplace for discounts, coupons, and referral links.
          Upload your unused codes, earn instant UPI rewards when others save.
        </p>

        {/* Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative flex items-center shadow-lg rounded-2xl bg-white border border-gray-200/90 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/15 transition-all">
            <div className="pl-4.5 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search stores (Swiggy, Amazon, Zepto, Cred) or keywords..."
              className="w-full py-4 pl-3 pr-4 text-gray-800 bg-transparent text-sm sm:text-base outline-hidden placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="mr-3 px-2 py-1 text-xs font-semibold text-gray-500 hover:text-gray-800 rounded-md bg-gray-100 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Value Props Row */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 border border-gray-200/60 shadow-xs">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Verified & Active</h4>
              <p className="text-xs text-gray-500">
                Crowd-tested with real-time community upvotes & expiry checks.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 border border-gray-200/60 shadow-xs">
            <div className="p-2 rounded-lg bg-teal-50 text-teal-600">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Earn UPI Rewards</h4>
              <p className="text-xs text-gray-500">
                Earn payouts when other shoppers redeem your working coupons.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 border border-gray-200/60 shadow-xs">
            <div className="p-2 rounded-lg bg-green-50 text-green-600">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">WhatsApp Instant Alerts</h4>
              <p className="text-xs text-gray-500">
                Receive top deals directly via bot alerts on your favorite messaging app.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
