import { Coupon, CouponSubmission, CategoryType } from "@/types/coupon";
import { INITIAL_COUPONS } from "@/data/mockCoupons";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Interface for backend response (snake_case)
interface BackendCoupon {
  id: string;
  store_name: string;
  store_category: string;
  title: string;
  description: string;
  code: string;
  is_referral_link: boolean;
  referral_url?: string | null;
  discount_type: "percentage" | "flat" | "cashback" | "freebie";
  discount_value: string;
  minimum_order_value?: string | null;
  expires_at?: string | null;
  is_verified: boolean;
  verified_at?: string | null;
  success_rate: number;
  upvotes: number;
  downvotes: number;
  uploader_name: string;
  uploader_upi?: string | null;
  terms?: string[];
  created_at: string;
}

// Transform backend snake_case to frontend camelCase
function transformCoupon(b: BackendCoupon): Coupon {
  return {
    id: b.id,
    storeName: b.store_name,
    storeCategory: b.store_category as CategoryType,
    title: b.title,
    description: b.description,
    code: b.code,
    isReferralLink: b.is_referral_link,
    referralUrl: b.referral_url || undefined,
    discountType: b.discount_type,
    discountValue: b.discount_value,
    minimumOrderValue: b.minimum_order_value || undefined,
    expiresAt: b.expires_at || "2026-12-31",
    isVerified: b.is_verified,
    verifiedAt: b.verified_at || undefined,
    successRate: b.success_rate,
    upvotes: b.upvotes,
    downvotes: b.downvotes,
    uploaderName: b.uploader_name,
    uploaderRewardUpi: b.uploader_upi || undefined,
    terms: b.terms,
    createdAt: b.created_at,
  };
}

export async function fetchCouponsFromApi(params?: {
  category?: string;
  q?: string;
  onlyVerified?: boolean;
  sortBy?: string;
}): Promise<{ coupons: Coupon[]; isFromBackend: boolean }> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.category && params.category !== "all") {
      searchParams.set("category", params.category);
    }
    if (params?.q) {
      searchParams.set("q", params.q);
    }
    if (params?.onlyVerified) {
      searchParams.set("only_verified", "true");
    }
    if (params?.sortBy) {
      searchParams.set("sort_by", params.sortBy);
    }

    const res = await fetch(`${API_BASE_URL}/api/coupons?${searchParams.toString()}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 10 },
      signal: AbortSignal.timeout(3000), // 3s timeout
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data: BackendCoupon[] = await res.json();
    return {
      coupons: data.map(transformCoupon),
      isFromBackend: true,
    };
  } catch {
    // Graceful fallback to static initial dataset
    return {
      coupons: INITIAL_COUPONS,
      isFromBackend: false,
    };
  }
}

export async function createCouponApi(
  submission: CouponSubmission
): Promise<Coupon> {
  const payload = {
    store_name: submission.storeName,
    store_category: submission.storeCategory,
    title: submission.title,
    description: submission.description,
    code: submission.code,
    is_referral_link: submission.isReferralLink,
    referral_url: submission.referralUrl || null,
    discount_type: "flat",
    discount_value: submission.discountValue,
    minimum_order_value: submission.minimumOrderValue || null,
    expires_at: submission.expiresAt || null,
    uploader_name: submission.uploaderName || "Community Member",
    uploader_phone: submission.uploaderPhone || null,
    uploader_upi: submission.uploaderUpi || null,
    terms: [],
  };

  try {
    const res = await fetch(`${API_BASE_URL}/api/coupons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(4000),
    });

    if (!res.ok) {
      throw new Error(`Failed to submit: ${res.statusText}`);
    }

    const data: BackendCoupon = await res.json();
    return transformCoupon(data);
  } catch {
    // Fallback: create client-side coupon object if backend is offline
    return {
      id: `coup-${Date.now()}`,
      storeName: submission.storeName,
      storeCategory: submission.storeCategory,
      title: submission.title,
      description: submission.description || "Community submitted deal.",
      code: submission.code,
      isReferralLink: submission.isReferralLink,
      referralUrl: submission.referralUrl,
      discountType: "flat",
      discountValue: submission.discountValue,
      minimumOrderValue: submission.minimumOrderValue || "None",
      expiresAt: submission.expiresAt || "2026-12-31",
      isVerified: true,
      verifiedAt: "Just now",
      successRate: 100,
      upvotes: 1,
      downvotes: 0,
      uploaderName: submission.uploaderName || "Community Member",
      uploaderRewardUpi: submission.uploaderUpi,
      createdAt: new Date().toISOString().split("T")[0],
    };
  }
}

export async function voteCouponApi(
  couponId: string,
  voteType: "up" | "down"
): Promise<{ success: boolean; upvotes?: number; downvotes?: number; successRate?: number }> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/coupons/${couponId}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ vote_type: voteType }),
      signal: AbortSignal.timeout(3000),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        success: true,
        upvotes: data.upvotes,
        downvotes: data.downvotes,
        successRate: data.success_rate,
      };
    }
  } catch {
    // Silent fail over network, caller updates state optimistically
  }

  return { success: false };
}
