from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query, status
from app.models.coupon import (
    CouponResponse,
    CouponCreate,
    VoteRequest,
    VoteResponse,
    CategorySummary,
)
from app.data.initial_coupons import repository

router = APIRouter(prefix="/api/coupons", tags=["Coupons"])


@router.get("", response_model=List[CouponResponse])
async def list_coupons(
    category: Optional[str] = Query("all", description="Category filter (e.g. food, grocery, ecommerce)"),
    q: Optional[str] = Query(None, description="Search keyword for store, title, or code"),
    only_verified: bool = Query(False, description="Filter only verified coupons"),
    sort_by: str = Query("popular", description="Sort by: popular, newest, or discount"),
):
    """Retrieve coupons with filtering, searching, and sorting."""
    return repository.get_all(
        category=category,
        query=q,
        only_verified=only_verified,
        sort_by=sort_by,
    )


@router.get("/{coupon_id}", response_model=CouponResponse)
async def get_coupon(coupon_id: str):
    """Get single coupon details by ID."""
    coupon = repository.get_by_id(coupon_id)
    if not coupon:
        raise HTTPException(status_code=404, detail="Coupon not found")
    return coupon


@router.post("", response_model=CouponResponse, status_code=status.HTTP_201_CREATED)
async def create_coupon(payload: CouponCreate):
    """Submit a new coupon or referral code."""
    if not payload.store_name.strip() or not payload.code.strip():
        raise HTTPException(status_code=422, detail="Store name and code are required")
    return repository.create(payload)


@router.post("/{coupon_id}/vote", response_model=VoteResponse)
async def vote_coupon(coupon_id: str, payload: VoteRequest):
    """Record an upvote or downvote for a coupon's validity."""
    result = repository.vote(coupon_id, payload.vote_type)
    if not result:
        raise HTTPException(status_code=404, detail="Coupon not found")
    return result


category_router = APIRouter(prefix="/api/categories", tags=["Categories"])

CATEGORY_LABELS = {
    "all": "All Deals",
    "food": "Food & Dining",
    "grocery": "Quick Grocery",
    "ecommerce": "E-Commerce & Fashion",
    "travel": "Travel & Cabs",
    "fintech": "Fintech & Cards",
    "entertainment": "Entertainment & OTT",
}


@category_router.get("", response_model=List[CategorySummary])
async def get_categories():
    """Get all categories with active deal counts."""
    counts = repository.get_categories_count()
    return [
        CategorySummary(id=k, label=CATEGORY_LABELS.get(k, k.capitalize()), count=v)
        for k, v in counts.items()
    ]
