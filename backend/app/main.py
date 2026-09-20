from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Coupon Referral Marketplace API",
    description="Backend API for Coupon & Referral Code Marketplace",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    }
