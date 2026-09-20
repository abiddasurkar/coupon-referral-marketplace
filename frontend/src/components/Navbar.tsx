"use client";

import React from "react";
import { MessageCircle, PlusCircle, Tag, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenSubmitModal: () => void;
  totalDeals: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSubmitModal,
  totalDeals,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Tag className="w-5 h-5 -rotate-12" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-gray-900">
                Coupon<span className="text-emerald-600">Hub</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200/60">
                <Sparkles className="w-3 h-3 text-emerald-600" /> WhatsApp Native
              </span>
            </div>
            <p className="text-xs text-gray-500 hidden sm:block">
              {totalDeals} verified community coupons & referral codes
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://wa.me/?text=Check%20out%20CouponHub%20for%20verified%20coupons%20and%20referral%20deals!"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200/80"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-500" />
            <span>Join Alerts Group</span>
          </a>

          <button
            onClick={onOpenSubmitModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm shadow-emerald-600/30 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit a Code</span>
            <span className="hidden sm:inline-block text-[11px] bg-emerald-800/50 px-1.5 py-0.5 rounded text-emerald-100">
              Earn UPI
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
