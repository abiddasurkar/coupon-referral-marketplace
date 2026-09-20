from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.coupons import router as coupons_router, category_router

app = FastAPI(
    title="Coupon Referral Marketplace API",
    description="Backend API for WhatsApp-native Coupon & Referral Marketplace",
    version="0.1.0",
)

# CORS configuration allowing local dev and preview environments
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://abiddasurkar.github.io",
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(coupons_router)
app.include_router(category_router)


@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "service": "coupon-referral-api",
        "version": "0.1.0",
    }


@app.get("/")
async def root():
    return {
        "message": "Welcome to Coupon Referral Marketplace API",
        "docs": "/docs",
        "health": "/api/health",
        "endpoints": {
            "coupons": "/api/coupons",
            "categories": "/api/categories",
        },
    }
