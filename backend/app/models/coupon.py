from enum import Enum
from typing import List, Optional, Literal
from pydantic import BaseModel, Field


class CategoryType(str, Enum):
    ALL = "all"
    FOOD = "food"
    GROCERY = "grocery"
    ECOMMERCE = "ecommerce"
    TRAVEL = "travel"
    FINTECH = "fintech"
    ENTERTAINMENT = "entertainment"


class DiscountType(str, Enum):
    PERCENTAGE = "percentage"
    FLAT = "flat"
    CASHBACK = "cashback"
    FREEBIE = "freebie"


class CouponBase(BaseModel):
    store_name: str = Field(..., description="Brand or store name, e.g. Swiggy, Amazon")
    store_category: CategoryType = Field(..., description="Store category")
    title: str = Field(..., description="Title of the discount offer")
    description: str = Field(..., description="Detailed description or terms")
    code: str = Field(..., description="Promo code or referral voucher code")
    is_referral_link: bool = Field(False, description="Whether this is a referral link")
    referral_url: Optional[str] = Field(None, description="External referral URL if applicable")
    discount_type: DiscountType = Field(DiscountType.FLAT, description="Type of discount")
    discount_value: str = Field(..., description="Display value, e.g. Flat ₹150 OFF, 25% OFF")
    minimum_order_value: Optional[str] = Field(None, description="Minimum order amount required")
    expires_at: Optional[str] = Field(None, description="Expiry date in YYYY-MM-DD")
    uploader_name: Optional[str] = Field("Community Member", description="Uploader display name")
    uploader_phone: Optional[str] = Field(None, description="Uploader WhatsApp number for verification")
    uploader_upi: Optional[str] = Field(None, description="Uploader UPI ID for reward payouts")
    terms: List[str] = Field(default_factory=list, description="List of terms and conditions")


class CouponCreate(CouponBase):
    pass


class CouponResponse(CouponBase):
    id: str = Field(..., description="Unique coupon identifier")
    is_verified: bool = Field(True, description="Verification status")
    verified_at: Optional[str] = Field(None, description="When verified, e.g. '10 mins ago'")
    success_rate: int = Field(100, description="Community success percentage (0-100)")
    upvotes: int = Field(0, description="Positive confirmation count")
    downvotes: int = Field(0, description="Negative confirmation count")
    created_at: str = Field(..., description="Creation date ISO string")


class VoteRequest(BaseModel):
    vote_type: Literal["up", "down"]


class VoteResponse(BaseModel):
    id: str
    upvotes: int
    downvotes: int
    success_rate: int
    message: str


class CategorySummary(BaseModel):
    id: str
    label: str
    count: int
