"use client";

import React from "react";
import { CategoryType } from "@/types/coupon";
import {
  UtensilsCrossed,
  ShoppingBag,
  Plane,
  CreditCard,
  Film,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  Package,
} from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  onlyVerified: boolean;
  onToggleVerified: () => void;
  sortBy: "popular" | "newest" | "discount";
  onSelectSort: (sort: "popular" | "newest" | "discount") => void;
  categoryCounts: Record<CategoryType, number>;
}

const CATEGORIES: { id: CategoryType; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: "all", label: "All Deals", icon: Sparkles },
  { id: "food", label: "Food & Dining", icon: UtensilsCrossed },
  { id: "grocery", label: "Quick Grocery", icon: Package },
  { id: "ecommerce", label: "E-Commerce", icon: ShoppingBag },
  { id: "travel", label: "Travel & Cabs", icon: Plane },
  { id: "fintech", label: "Fintech & UPI", icon: CreditCard },
  { id: "entertainment", label: "Entertainment", icon: Film },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  onlyVerified,
  onToggleVerified,
  sortBy,
  onSelectSort,
  categoryCounts,
}) => {
  return (
    <div className="space-y-4">
      {/* Category Pills Scrollable */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer border ${
                isSelected
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/30"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-gray-500"}`} />
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.5 text-[10px] font-semibold rounded-full ${
                  isSelected
                    ? "bg-emerald-700 text-emerald-100"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100 text-xs sm:text-sm">
        {/* Verified Toggle */}
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={onlyVerified}
            onChange={onToggleVerified}
            className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 focus:ring-2 accent-emerald-600 cursor-pointer"
          />
          <span className="flex items-center gap-1 font-medium text-gray-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Verified Deals Only
          </span>
        </label>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-500 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) =>
              onSelectSort(e.target.value as "popular" | "newest" | "discount")
            }
            className="bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:border-emerald-500 cursor-pointer"
          >
            <option value="popular">Most Upvoted</option>
            <option value="discount">Highest Discount</option>
            <option value="newest">Newest Added</option>
          </select>
        </div>
      </div>
    </div>
  );
};
