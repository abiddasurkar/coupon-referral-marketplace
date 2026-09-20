"use client";

import React, { useState } from "react";
import { Coupon } from "@/types/coupon";
import {
  Copy,
  Check,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
  Clock,
  MessageCircle,
  Share2,
} from "lucide-react";

interface CouponCardProps {
  coupon: Coupon;
  onVote: (id: string, type: "up" | "down") => void;
}

export const CouponCard: React.FC<CouponCardProps> = ({ coupon, onVote }) => {
  const [copied, setCopied] = useState(false);
  const [userVoted, setUserVoted] = useState<"up" | "down" | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleVote = (type: "up" | "down") => {
    if (userVoted === type) return;
    setUserVoted(type);
    onVote(coupon.id, type);
  };

  const shareText = encodeURIComponent(
    `🔥 Found a verified deal for *${coupon.storeName}* on CouponHub:\n` +
      `🎁 *${coupon.discountValue}* - ${coupon.title}\n` +
      `🎟️ Code: *${coupon.code}*\n` +
      (coupon.minimumOrderValue && coupon.minimumOrderValue !== "None"
        ? `📦 Min Order: ${coupon.minimumOrderValue}\n`
        : "") +
      `⏳ Valid until: ${coupon.expiresAt}\n\n` +
      `Check more deals here: https://coupon-referral-marketplace.vercel.app`
  );

  const whatsappShareUrl = `https://wa.me/?text=${shareText}`;

  // Store avatar initials & background
  const initials = coupon.storeName.slice(0, 2).toUpperCase();

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200/80 hover:border-emerald-500/40 shadow-xs hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Top Banner Ribbon */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          {/* Store Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-gray-900 to-gray-700 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              {initials}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base leading-snug">
                {coupon.storeName}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                {coupon.isVerified ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/50">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified {coupon.verifiedAt || "Active"}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
                    <Clock className="w-3 h-3 text-amber-600" />
                    Community Submitted
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Discount Pill */}
          <span className="inline-block text-xs sm:text-sm font-extrabold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg border border-emerald-300/40 shrink-0">
            {coupon.discountValue}
          </span>
        </div>

        {/* Title and Description */}
        <div className="mt-4">
          <h4 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug">
            {coupon.title}
          </h4>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2">
            {coupon.description}
          </p>
        </div>

        {/* Terms or Minimum Order */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
          {coupon.minimumOrderValue && coupon.minimumOrderValue !== "None" && (
            <span className="bg-gray-100 px-2 py-0.5 rounded-md font-medium text-gray-600">
              Min: {coupon.minimumOrderValue}
            </span>
          )}
          <span className="bg-gray-100 px-2 py-0.5 rounded-md font-medium text-gray-600">
            Expires: {coupon.expiresAt}
          </span>
          <span className="text-emerald-700 font-semibold">
            {coupon.successRate}% Success
          </span>
        </div>
      </div>

      {/* Action Zone: Coupon Code Box & WhatsApp Send */}
      <div className="p-5 pt-2 border-t border-gray-100/90 bg-gray-50/50 space-y-3">
        {/* Code Bar */}
        <div className="flex items-center gap-2">
          {coupon.isReferralLink && coupon.referralUrl ? (
            <a
              href={coupon.referralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white border-2 border-dashed border-emerald-400/80 rounded-xl hover:bg-emerald-50/40 transition-colors group/btn"
            >
              <span className="font-mono font-bold text-sm text-emerald-800 tracking-wider">
                {coupon.code}
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <span>Open Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>
          ) : (
            <div className="w-full flex items-center justify-between px-3.5 py-2 bg-white border-2 border-dashed border-emerald-400/80 rounded-xl">
              <span className="font-mono font-bold text-sm text-emerald-800 tracking-wider select-all">
                {coupon.code}
              </span>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  copied
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Direct WhatsApp Share Button */}
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Share this deal on WhatsApp"
            className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 transition-colors shrink-0 flex items-center justify-center cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-500" />
          </a>
        </div>

        {/* Voting and Social Proof */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          <span className="truncate">
            Uploaded by <strong className="text-gray-700 font-medium">{coupon.uploaderName}</strong>
          </span>

          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[11px] text-gray-400 mr-1 hidden sm:inline">Worked?</span>
            <button
              onClick={() => handleVote("up")}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                userVoted === "up"
                  ? "bg-emerald-100 text-emerald-800"
                  : "hover:bg-gray-200/60 text-gray-600"
              }`}
            >
              <ThumbsUp className="w-3 h-3" />
              <span>{coupon.upvotes + (userVoted === "up" ? 1 : 0)}</span>
            </button>
            <button
              onClick={() => handleVote("down")}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                userVoted === "down"
                  ? "bg-rose-100 text-rose-800"
                  : "hover:bg-gray-200/60 text-gray-600"
              }`}
            >
              <ThumbsDown className="w-3 h-3" />
              <span>{coupon.downvotes + (userVoted === "down" ? 1 : 0)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
