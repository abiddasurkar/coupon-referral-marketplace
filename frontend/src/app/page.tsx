"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CategoryFilter } from "@/components/CategoryFilter";
import { CouponCard } from "@/components/CouponCard";
import { SubmitCouponModal } from "@/components/SubmitCouponModal";
import { WhatsAppBotBanner } from "@/components/WhatsAppBotBanner";
import { Footer } from "@/components/Footer";
import { INITIAL_COUPONS } from "@/data/mockCoupons";
import { Coupon, CouponSubmission, CategoryType } from "@/types/coupon";
import {
  fetchCouponsFromApi,
  createCouponApi,
  voteCouponApi,
} from "@/lib/api";
import { PlusCircle, AlertCircle } from "lucide-react";

export default function Home() {
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "discount">("popular");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Sync with API
  useEffect(() => {
    let isCancelled = false;

    async function loadData() {
      const result = await fetchCouponsFromApi({
        category: selectedCategory,
        q: searchQuery,
        onlyVerified,
        sortBy,
      });
      if (!isCancelled) {
        setCoupons(result.coupons);
        setIsBackendConnected(result.isFromBackend);
      }
    }

    loadData();

    return () => {
      isCancelled = true;
    };
  }, [selectedCategory, searchQuery, onlyVerified, sortBy]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      all: coupons.length,
      food: 0,
      grocery: 0,
      ecommerce: 0,
      travel: 0,
      fintech: 0,
      entertainment: 0,
    };

    coupons.forEach((c) => {
      if (counts[c.storeCategory] !== undefined) {
        counts[c.storeCategory]++;
      }
    });

    return counts;
  }, [coupons]);

  // Filtered & Sorted Coupons (client-side safety / offline support)
  const filteredCoupons = useMemo(() => {
    return coupons
      .filter((c) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchStore = c.storeName.toLowerCase().includes(q);
          const matchTitle = c.title.toLowerCase().includes(q);
          const matchDesc = c.description.toLowerCase().includes(q);
          const matchCode = c.code.toLowerCase().includes(q);
          if (!matchStore && !matchTitle && !matchDesc && !matchCode) {
            return false;
          }
        }

        if (selectedCategory !== "all" && c.storeCategory !== selectedCategory) {
          return false;
        }

        if (onlyVerified && !c.isVerified) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "popular") {
          return b.upvotes - a.upvotes;
        }
        if (sortBy === "newest") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === "discount") {
          return b.successRate - a.successRate;
        }
        return 0;
      });
  }, [coupons, searchQuery, selectedCategory, onlyVerified, sortBy]);

  // Handle voting
  const handleVote = async (id: string, type: "up" | "down") => {
    // Optimistic UI update
    setCoupons((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newUp = type === "up" ? item.upvotes + 1 : item.upvotes;
          const newDown = type === "down" ? item.downvotes + 1 : item.downvotes;
          const newRate = Math.round((newUp / (newUp + newDown)) * 100);
          return {
            ...item,
            upvotes: newUp,
            downvotes: newDown,
            successRate: newRate,
          };
        }
        return item;
      })
    );

    // Call backend API if active
    await voteCouponApi(id, type);
  };

  // Handle coupon submission
  const handleCouponSubmission = async (data: CouponSubmission) => {
    const createdCoupon = await createCouponApi(data);
    setCoupons((prev) => [createdCoupon, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Backend / Static Sync Status Indicator */}
      <div className="bg-gray-900 text-gray-300 text-[11px] py-1 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isBackendConnected ? "bg-emerald-400 animate-pulse" : "bg-teal-400"
              }`}
            />
            <span>
              {isBackendConnected
                ? "Live Connected: FastAPI Backend (:8000)"
                : "Static Dataset: Verified Community Seed"}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-gray-400">
            <span>Next.js 16 + Tailwind</span>
            <span>•</span>
            <span>Zero-Cost MVP Architecture</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navbar
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        totalDeals={coupons.length}
      />

      {/* Hero with Search */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grow">
        {/* Category & Filter Toolbar */}
        <div className="mb-8">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onlyVerified={onlyVerified}
            onToggleVerified={() => setOnlyVerified(!onlyVerified)}
            sortBy={sortBy}
            onSelectSort={setSortBy}
            categoryCounts={categoryCounts}
          />
        </div>

        {/* Section Header with count */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              {selectedCategory === "all"
                ? "Trending Verified Coupons"
                : `${selectedCategory.toUpperCase()} Coupons & Deals`}
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-gray-200 text-gray-700">
              {filteredCoupons.length}
            </span>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Have a working code? Share it</span>
          </button>
        </div>

        {/* Coupons Grid */}
        {filteredCoupons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCoupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                onVote={handleVote}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-gray-200 shadow-xs max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900">No coupons found</h3>
            <p className="text-xs text-gray-500 mt-1">
              Try tweaking your search term or category filters, or be the first to share one!
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setOnlyVerified(false);
              }}
              className="mt-4 px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* WhatsApp Bot Integration Callout */}
        <WhatsAppBotBanner />
      </main>

      {/* Footer */}
      <Footer />

      {/* Submit Coupon Modal */}
      <SubmitCouponModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmit={handleCouponSubmission}
      />
    </div>
  );
}
