export type CategoryType =
  | "all"
  | "food"
  | "grocery"
  | "ecommerce"
  | "travel"
  | "fintech"
  | "entertainment";

export interface Coupon {
  id: string;
  storeName: string;
  storeLogoUrl?: string;
  storeCategory: CategoryType;
  title: string;
  description: string;
  code: string;
  isReferralLink: boolean;
  referralUrl?: string;
  discountType: "percentage" | "flat" | "cashback" | "freebie";
  discountValue: string;
  minimumOrderValue?: string;
  expiresAt: string;
  isVerified: boolean;
  verifiedAt?: string;
  successRate: number;
  upvotes: number;
  downvotes: number;
  uploaderName: string;
  uploaderRewardUpi?: string;
  terms?: string[];
  createdAt: string;
}

export interface CouponSubmission {
  storeName: string;
  storeCategory: CategoryType;
  title: string;
  description: string;
  code: string;
  isReferralLink: boolean;
  referralUrl?: string;
  discountValue: string;
  minimumOrderValue?: string;
  expiresAt: string;
  uploaderName: string;
  uploaderPhone: string;
  uploaderUpi: string;
}
