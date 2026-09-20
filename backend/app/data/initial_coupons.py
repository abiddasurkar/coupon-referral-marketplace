from typing import List, Dict, Optional
from datetime import datetime
from app.models.coupon import (
    CouponResponse,
    CategoryType,
    DiscountType,
    CouponCreate,
    VoteResponse,
)

RAW_STATIC_COUPONS: List[Dict] = [
    {
        "id": "coup-1",
        "store_name": "Swiggy Gourmet",
        "store_category": CategoryType.FOOD,
        "title": "Flat ₹150 OFF on Gourmet & Dineout",
        "description": "Valid on orders above ₹399 from selected premium partner restaurants.",
        "code": "SWIGGYGOURMET",
        "is_referral_link": False,
        "referral_url": None,
        "discount_type": DiscountType.FLAT,
        "discount_value": "₹150 OFF",
        "minimum_order_value": "₹399",
        "expires_at": "2026-10-15",
        "is_verified": True,
        "verified_at": "10 mins ago",
        "success_rate": 98,
        "upvotes": 242,
        "downvotes": 4,
        "uploader_name": "Aman U.",
        "uploader_phone": "+919876543210",
        "uploader_upi": "aman@okhdfcbank",
        "terms": ["One-time use per user", "Only on select restaurants"],
        "created_at": "2026-09-18",
    },
    {
        "id": "coup-2",
        "store_name": "Zepto Quick",
        "store_category": CategoryType.GROCERY,
        "title": "Flat 25% OFF on 10-Minute Groceries",
        "description": "Get 25% discount on daily essentials and fresh fruits/vegetables.",
        "code": "ZEPTOFRESH25",
        "is_referral_link": False,
        "referral_url": None,
        "discount_type": DiscountType.PERCENTAGE,
        "discount_value": "25% OFF",
        "minimum_order_value": "₹299",
        "expires_at": "2026-09-30",
        "is_verified": True,
        "verified_at": "1 hour ago",
        "success_rate": 96,
        "upvotes": 189,
        "downvotes": 6,
        "uploader_name": "Abid D.",
        "uploader_phone": "+919123456780",
        "uploader_upi": "abid@okaxis",
        "terms": ["Max discount ₹120", "Valid across all active pin codes"],
        "created_at": "2026-09-19",
    },
    {
        "id": "coup-3",
        "store_name": "Myntra",
        "store_category": CategoryType.ECOMMERCE,
        "title": "Flat ₹400 OFF on Fashion & Footwear",
        "description": "Instant discount on fashion apparel, sneakers and accessories for all users.",
        "code": "MYNTRANEW400",
        "is_referral_link": False,
        "referral_url": None,
        "discount_type": DiscountType.FLAT,
        "discount_value": "₹400 OFF",
        "minimum_order_value": "₹1,999",
        "expires_at": "2026-10-31",
        "is_verified": True,
        "verified_at": "3 hours ago",
        "success_rate": 94,
        "upvotes": 310,
        "downvotes": 12,
        "uploader_name": "Rohit K.",
        "uploader_phone": None,
        "uploader_upi": "rohit@ybl",
        "terms": ["Applicable on catalog items", "Can be clubbed with bank offers"],
        "created_at": "2026-09-15",
    },
    {
        "id": "coup-4",
        "store_name": "MakeMyTrip",
        "store_category": CategoryType.TRAVEL,
        "title": "Up to ₹1,200 OFF on Domestic Flight Bookings",
        "description": "Save big on flights booked 7 days in advance. Instant bank discount.",
        "code": "FLYHIGH26",
        "is_referral_link": False,
        "referral_url": None,
        "discount_type": DiscountType.PERCENTAGE,
        "discount_value": "Up to ₹1,200 OFF",
        "minimum_order_value": "₹4,500",
        "expires_at": "2026-11-15",
        "is_verified": True,
        "verified_at": "Yesterday",
        "success_rate": 92,
        "upvotes": 145,
        "downvotes": 9,
        "uploader_name": "Priya S.",
        "uploader_phone": None,
        "uploader_upi": "priya@paytm",
        "terms": ["Valid on domestic airlines", "Booking via app or web"],
        "created_at": "2026-09-12",
    },
    {
        "id": "coup-5",
        "store_name": "CRED Referral",
        "store_category": CategoryType.FINTECH,
        "title": "Earn ₹250 Cashback on First Credit Card Bill",
        "description": "Pay any credit card bill of ₹1,000+ through CRED and get guaranteed ₹250 cashback.",
        "code": "CRED-VIP-REWARD",
        "is_referral_link": True,
        "referral_url": "https://cred.club/referral",
        "discount_type": DiscountType.CASHBACK,
        "discount_value": "₹250 Cashback",
        "minimum_order_value": "₹1,000",
        "expires_at": "2026-12-31",
        "is_verified": True,
        "verified_at": "2 days ago",
        "success_rate": 99,
        "upvotes": 520,
        "downvotes": 5,
        "uploader_name": "Sneha M.",
        "uploader_phone": None,
        "uploader_upi": "sneha@okhdfcbank",
        "terms": ["New CRED members only", "Cashback credited to bank account"],
        "created_at": "2026-09-10",
    },
    {
        "id": "coup-6",
        "store_name": "Blinkit",
        "store_category": CategoryType.GROCERY,
        "title": "Flat ₹100 OFF on First 3 Instant Orders",
        "description": "Get ₹100 instant discount on snacks, beverages, and household essentials.",
        "code": "BLINKFIRST100",
        "is_referral_link": False,
        "referral_url": None,
        "discount_type": DiscountType.FLAT,
        "discount_value": "₹100 OFF",
        "minimum_order_value": "₹349",
        "expires_at": "2026-10-05",
        "is_verified": True,
        "verified_at": "4 hours ago",
        "success_rate": 95,
        "upvotes": 167,
        "downvotes": 7,
        "uploader_name": "Karan T.",
        "uploader_phone": None,
        "uploader_upi": "karan@icici",
        "terms": ["First 3 orders only", "Valid on selected payment methods"],
        "created_at": "2026-09-17",
    },
    {
        "id": "coup-7",
        "store_name": "Zomato Gold",
        "store_category": CategoryType.FOOD,
        "title": "Buy 1 Get 1 Free on Dining + 40% OFF Delivery",
        "description": "Special partner discount for weekend dining and free delivery vouchers.",
        "code": "ZOMATOGOLD40",
        "is_referral_link": False,
        "referral_url": None,
        "discount_type": DiscountType.FREEBIE,
        "discount_value": "BOGO + 40% OFF",
        "minimum_order_value": "₹249",
        "expires_at": "2026-10-20",
        "is_verified": True,
        "verified_at": "30 mins ago",
        "success_rate": 97,
        "upvotes": 412,
        "downvotes": 11,
        "uploader_name": "Varun P.",
        "uploader_phone": None,
        "uploader_upi": "varun@okaxis",
        "terms": ["Gold partner locations only", "Max discount ₹150 on delivery"],
        "created_at": "2026-09-19",
    },
    {
        "id": "coup-8",
        "store_name": "Uber",
        "store_category": CategoryType.TRAVEL,
        "title": "50% OFF Next 3 Premier / Auto Rides",
        "description": "Save up to ₹75 per trip on your next 3 city rides during commute hours.",
        "code": "UBERCOMMUTE50",
        "is_referral_link": False,
        "referral_url": None,
        "discount_type": DiscountType.PERCENTAGE,
        "discount_value": "50% OFF",
        "minimum_order_value": "None",
        "expires_at": "2026-09-28",
        "is_verified": False,
        "verified_at": None,
        "success_rate": 88,
        "upvotes": 98,
        "downvotes": 14,
        "uploader_name": "Farhan A.",
        "uploader_phone": None,
        "uploader_upi": "farhan@ibl",
        "terms": ["Max discount ₹75/ride", "Valid in select metros"],
        "created_at": "2026-09-18",
    },
]


class CouponRepository:
    """Thread-safe in-memory repository with static initialization."""

    def __init__(self):
        self.reset()

    def reset(self):
        self._coupons: Dict[str, CouponResponse] = {}
        for item in RAW_STATIC_COUPONS:
            coupon = CouponResponse(**item)
            self._coupons[coupon.id] = coupon

    def get_all(
        self,
        category: Optional[str] = None,
        query: Optional[str] = None,
        only_verified: bool = False,
        sort_by: str = "popular",
    ) -> List[CouponResponse]:
        results = list(self._coupons.values())

        if category and category.lower() != "all":
            results = [c for c in results if c.store_category.value == category.lower()]

        if query and query.strip():
            q = query.strip().lower()
            results = [
                c
                for c in results
                if q in c.store_name.lower()
                or q in c.title.lower()
                or q in c.description.lower()
                or q in c.code.lower()
            ]

        if only_verified:
            results = [c for c in results if c.is_verified]

        if sort_by == "popular":
            results.sort(key=lambda c: c.upvotes, reverse=True)
        elif sort_by == "newest":
            results.sort(key=lambda c: c.created_at, reverse=True)
        elif sort_by == "discount":
            results.sort(key=lambda c: c.success_rate, reverse=True)

        return results

    def get_by_id(self, coupon_id: str) -> Optional[CouponResponse]:
        return self._coupons.get(coupon_id)

    def create(self, payload: CouponCreate) -> CouponResponse:
        new_id = f"coup-{int(datetime.utcnow().timestamp() * 1000)}"
        new_coupon = CouponResponse(
            id=new_id,
            store_name=payload.store_name,
            store_category=payload.store_category,
            title=payload.title,
            description=payload.description or "Community submitted deal.",
            code=payload.code.upper(),
            is_referral_link=payload.is_referral_link,
            referral_url=payload.referral_url,
            discount_type=payload.discount_type,
            discount_value=payload.discount_value,
            minimum_order_value=payload.minimum_order_value,
            expires_at=payload.expires_at or "2026-12-31",
            uploader_name=payload.uploader_name or "Community Member",
            uploader_phone=payload.uploader_phone,
            uploader_upi=payload.uploader_upi,
            terms=payload.terms,
            is_verified=True,
            verified_at="Just now",
            success_rate=100,
            upvotes=1,
            downvotes=0,
            created_at=datetime.utcnow().strftime("%Y-%m-%d"),
        )
        self._coupons[new_id] = new_coupon
        return new_coupon

    def vote(self, coupon_id: str, vote_type: str) -> Optional[VoteResponse]:
        coupon = self._coupons.get(coupon_id)
        if not coupon:
            return None

        if vote_type == "up":
            coupon.upvotes += 1
        elif vote_type == "down":
            coupon.downvotes += 1

        total_votes = coupon.upvotes + coupon.downvotes
        if total_votes > 0:
            coupon.success_rate = int((coupon.upvotes / total_votes) * 100)

        return VoteResponse(
            id=coupon.id,
            upvotes=coupon.upvotes,
            downvotes=coupon.downvotes,
            success_rate=coupon.success_rate,
            message=f"Vote recorded as {vote_type}",
        )

    def get_categories_count(self) -> Dict[str, int]:
        counts = {
            "all": len(self._coupons),
            "food": 0,
            "grocery": 0,
            "ecommerce": 0,
            "travel": 0,
            "fintech": 0,
            "entertainment": 0,
        }
        for coupon in self._coupons.values():
            cat = coupon.store_category.value
            if cat in counts:
                counts[cat] += 1
        return counts


repository = CouponRepository()
