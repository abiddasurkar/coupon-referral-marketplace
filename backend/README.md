# Backend API - Coupon Referral Marketplace

FastAPI backend providing REST APIs and webhook integrations for the Coupon Referral Marketplace.

## Getting Started

### Local Setup

1. Create and activate a virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the development server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

4. Interactive API documentation is available at:
   - Swagger UI: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

### Running Tests

```bash
pytest
```
