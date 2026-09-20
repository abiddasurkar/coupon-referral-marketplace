import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.data.initial_coupons import repository

client = TestClient(app)


@pytest.fixture(autouse=True)
def reset_db():
    """Reset repository to fresh static state before each test."""
    repository.reset()


def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "coupon-referral-api"


def test_list_all_coupons():
    response = client.get("/api/coupons")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 8
    # verify item structure
    first = data[0]
    assert "store_name" in first
    assert "code" in first
    assert "discount_value" in first


def test_filter_coupons_by_category():
    response = client.get("/api/coupons?category=food")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert all(c["store_category"] == "food" for c in data)


def test_search_coupons():
    response = client.get("/api/coupons?q=swiggy")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert "swiggy" in data[0]["store_name"].lower()


def test_filter_verified_only():
    response = client.get("/api/coupons?only_verified=true")
    assert response.status_code == 200
    data = response.json()
    assert all(c["is_verified"] is True for c in data)


def test_get_single_coupon():
    response = client.get("/api/coupons/coup-1")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "coup-1"
    assert data["store_name"] == "Swiggy Gourmet"


def test_get_nonexistent_coupon():
    response = client.get("/api/coupons/coup-non-existent")
    assert response.status_code == 404


def test_create_coupon():
    payload = {
        "store_name": "Dominos Pizza",
        "store_category": "food",
        "title": "Flat ₹100 OFF on Medium Pizzas",
        "description": "Valid on all orders above ₹400.",
        "code": "DOMINOS100",
        "is_referral_link": False,
        "discount_type": "flat",
        "discount_value": "₹100 OFF",
        "minimum_order_value": "₹400",
        "expires_at": "2026-11-30",
        "uploader_name": "Aman Test",
        "uploader_phone": "+919876543210",
        "uploader_upi": "aman@upi",
        "terms": ["Valid on web and app"],
    }
    response = client.post("/api/coupons", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["code"] == "DOMINOS100"
    assert data["store_name"] == "Dominos Pizza"
    assert data["is_verified"] is True
    assert "id" in data


def test_vote_on_coupon():
    # Initial upvotes for coup-1
    initial = client.get("/api/coupons/coup-1").json()
    initial_upvotes = initial["upvotes"]

    vote_resp = client.post("/api/coupons/coup-1/vote", json={"vote_type": "up"})
    assert vote_resp.status_code == 200
    data = vote_resp.json()
    assert data["upvotes"] == initial_upvotes + 1

    # Vote on non-existent coupon
    fail_resp = client.post("/api/coupons/fake-id/vote", json={"vote_type": "up"})
    assert fail_resp.status_code == 404


def test_get_categories():
    response = client.get("/api/categories")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    categories = [c["id"] for c in data]
    assert "all" in categories
    assert "food" in categories
    assert "grocery" in categories
