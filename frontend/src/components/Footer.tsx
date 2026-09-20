"use client";

import React from "react";
import { Tag, Heart, MessageCircle } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-12 text-sm text-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Tag className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-lg text-gray-900">
              Coupon<span className="text-emerald-600">Hub</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
            A WhatsApp-native referral marketplace for verified coupons, promo codes, and discount links.
            Share working deals, earn direct UPI rewards.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <a
              href="https://github.com/abiddasurkar/coupon-referral-marketplace"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 font-medium"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub Repository</span>
            </a>
            <span>•</span>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-800 font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Alerts</span>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 text-xs tracking-wider uppercase mb-3">
            Popular Categories
          </h4>
          <ul className="space-y-2 text-xs">
            <li>Food & Dining (Swiggy, Zomato)</li>
            <li>Instant Grocery (Zepto, Blinkit)</li>
            <li>E-Commerce (Amazon, Myntra)</li>
            <li>Travel & Flights (MakeMyTrip, Uber)</li>
            <li>Fintech & Credit Cards (CRED)</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 text-xs tracking-wider uppercase mb-3">
            Zero-Cost MVP Architecture
          </h4>
          <ul className="space-y-2 text-xs text-gray-500">
            <li>Frontend: Next.js + Tailwind on Vercel</li>
            <li>Backend: FastAPI on Render</li>
            <li>Database: Supabase Postgres</li>
            <li>Bot: WhatsApp Cloud API Free Tier</li>
            <li>Rewards: Direct UPI & Cashfree</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>© {new Date().getFullYear()} Coupon Referral Marketplace. Community driven & open source.</p>
        <p className="flex items-center gap-1">
          Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for smart shoppers
        </p>
      </div>
    </footer>
  );
};
