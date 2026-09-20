"use client";

import React, { useState } from "react";
import { Coupon, CouponSubmission, CategoryType } from "@/types/coupon";
import { X, Sparkles, CheckCircle2, IndianRupee, ShieldAlert } from "lucide-react";

interface SubmitCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (submission: CouponSubmission) => void;
}

export const SubmitCouponModal: React.FC<SubmitCouponModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<CouponSubmission>({
    storeName: "",
    storeCategory: "food",
    title: "",
    description: "",
    code: "",
    isReferralLink: false,
    referralUrl: "",
    discountValue: "",
    minimumOrderValue: "",
    expiresAt: "",
    uploaderName: "",
    uploaderPhone: "",
    uploaderUpi: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.storeName || !formData.title || !formData.code) return;

    onSubmit(formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      // Reset form
      setFormData({
        storeName: "",
        storeCategory: "food",
        title: "",
        description: "",
        code: "",
        isReferralLink: false,
        referralUrl: "",
        discountValue: "",
        minimumOrderValue: "",
        expiresAt: "",
        uploaderName: "",
        uploaderPhone: "",
        uploaderUpi: "",
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Coupon Submitted Successfully!
            </h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Your deal is now visible in the community feed. Once verified by redemptions,
              UPI rewards will be sent to <strong>{formData.uploaderUpi || "your UPI ID"}</strong>.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2 border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Earn ₹10 - ₹50 per verified redemption</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Submit a Coupon or Referral Code
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Share a working deal with the community. We verify and notify users on WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Store Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Store / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.storeName}
                    onChange={(e) =>
                      setFormData({ ...formData, storeName: e.target.value })
                    }
                    placeholder="e.g. Swiggy, Amazon, Zepto"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.storeCategory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        storeCategory: e.target.value as CategoryType,
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden bg-white"
                  >
                    <option value="food">Food & Dining</option>
                    <option value="grocery">Quick Grocery</option>
                    <option value="ecommerce">E-Commerce & Fashion</option>
                    <option value="travel">Travel & Cabs</option>
                    <option value="fintech">Fintech & Cards</option>
                    <option value="entertainment">Entertainment & OTT</option>
                  </select>
                </div>
              </div>

              {/* Deal Title */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Offer Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g. Flat ₹150 OFF on first order above ₹399"
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                />
              </div>

              {/* Code & Discount Value */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Coupon Code / Referral Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value.toUpperCase() })
                    }
                    placeholder="e.g. SAVE150"
                    className="w-full px-3.5 py-2 font-mono font-bold text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Discount Value (Badge) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.discountValue}
                    onChange={(e) =>
                      setFormData({ ...formData, discountValue: e.target.value })
                    }
                    placeholder="e.g. ₹150 OFF or 25% OFF"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                  />
                </div>
              </div>

              {/* Referral Link & Min Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Min Order Value (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.minimumOrderValue}
                    onChange={(e) =>
                      setFormData({ ...formData, minimumOrderValue: e.target.value })
                    }
                    placeholder="e.g. ₹499"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Expiry Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.expiresAt}
                    onChange={(e) =>
                      setFormData({ ...formData, expiresAt: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden bg-white"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Offer Details / Terms
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Any restrictions (e.g. valid for new users, only on web app, etc.)"
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                />
              </div>

              {/* Reward Details Box */}
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/70 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <IndianRupee className="w-4 h-4 text-emerald-600" />
                  <span>Uploader Rewards Payout Info</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.uploaderName}
                      onChange={(e) =>
                        setFormData({ ...formData, uploaderName: e.target.value })
                      }
                      placeholder="e.g. Abid"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-gray-300 rounded-lg outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={formData.uploaderPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, uploaderPhone: e.target.value })
                      }
                      placeholder="+91 9876543210"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-gray-300 rounded-lg outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      UPI ID (For Payouts)
                    </label>
                    <input
                      type="text"
                      value={formData.uploaderUpi}
                      onChange={(e) =>
                        setFormData({ ...formData, uploaderUpi: e.target.value })
                      }
                      placeholder="yourname@okhdfcbank"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-gray-300 rounded-lg outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-md shadow-emerald-600/30 transition-transform hover:scale-[1.01] cursor-pointer"
                >
                  Submit Deal
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
