# Autonomous Agent Build Plan & Zero-Cost MVP Stack

Comprehensive roadmap and technical stack specification for launching the **Coupon Referral Marketplace** MVP using 100% free-tier, open-source, and pay-per-use tools.

---

## Phase 1: Manual Validation (100% Free)

Before writing production backend and frontend code, validate the core value proposition manually:

| Need | Tool | Cost | Details |
|---|---|---|---|
| **Communication** | WhatsApp (personal number or free WhatsApp Business app) | Free | Direct concierge outreach |
| **Deal Intake** | Google Forms | Free | Simple intake for user coupons & referral codes |
| **Database** | Google Sheets | Free | Structured sheet tracking deals, users, status |
| **Payouts to Uploaders** | UPI (GPay / PhonePe / Paytm direct transfer) | Free | Instant, zero-fee peer-to-peer payout |
| **Verification Calls** | Phone / WhatsApp Audio | Free | Manual spot-checking of code validity |
| **Reminders & Cadence** | Google Calendar | Free | Task scheduling and follow-ups |
| **Basic Analytics** | Google Sheets / Looker Studio | Free | Funnel metrics, conversion tracking |
| **Landing Page / Waitlist** | Carrd (free) / Vercel HTML | Free | Single page capturing email/phone waitlist |

---

## Phase 2: Technical Build — Free-Tier Stack

### 1. Frontend
| Layer | Tool | Free Tier Limit |
|---|---|---|
| **Framework** | Next.js (App Router) + Tailwind CSS | Fully free, open source |
| **Hosting** | Vercel | Free hobby tier (automated CI/CD from GitHub) |
| **Domain** | `yourapp.vercel.app` subdomain | Free (upgrade to custom domain ~$10/yr later) |

### 2. Backend
| Layer | Tool | Free Tier Limit |
|---|---|---|
| **Framework** | Python 3.11+ with FastAPI | Fully free, open source |
| **Hosting** | Render (Free Web Service) / Railway / Fly.io | Free tier (spins down after 15m inactivity) |
| **Background Jobs** | APScheduler / Celery + Redis | Free, open source scheduling |

### 3. Database, Auth & Storage
| Layer | Tool | Free Tier Limit |
|---|---|---|
| **PostgreSQL Database** | Supabase / Neon | 500MB – 1GB database storage free |
| **Authentication** | Supabase Auth | Free (email/password, Magic Link, OTP) |
| **File Storage** | Supabase Storage / Cloudflare R2 | 1GB+ free (coupon screenshots, proofs) |
| **Caching & Session Store** | Upstash Redis | 10,000 commands/day free (bot state management) |

### 4. WhatsApp Integration Strategy

| Option | Cost | Practical Assessment |
|---|---|---|
| **Manual WhatsApp** | Free | Recommended during Phase 1 validation |
| **WhatsApp Cloud API (Meta Official)** | Free up to ~1,000 conversations/mo | **Recommended for Phase 2** — avoids ban risk, stable webhook delivery |
| **Baileys / whatsapp-web.js (Unofficial)** | Free | **Avoid in production** — violates WhatsApp ToS and risks permanent number ban |

> **Strategy:** Run concierge testing manually in Phase 1, then transition directly to the official Meta WhatsApp Cloud API free tier for automated bot handling in Phase 2.

### 5. Payments & Payouts
| Layer | Tool | Cost Structure |
|---|---|---|
| **Uploader Rewards / Payouts** | Razorpay Payouts / Cashfree | Zero fixed fee; transaction fee only when funds move |
| **Early Manual Payouts** | UPI deep links / manual UPI | 100% free |

### 6. Testing & CI/CD
| Layer | Tool | Cost |
|---|---|---|
| **Backend Testing** | Pytest + HTTPX | Free, open source |
| **Frontend / E2E Testing** | Playwright | Free, open source |
| **CI/CD Automation** | GitHub Actions | 2,000 free runner minutes/month |

### 7. AI & Development Tooling
| Layer | Tool | Cost |
|---|---|---|
| **AI Coding Agent** | Antigravity CLI (`agy`) | Google account sign-in, generous free tier |
| **Version Control & Collaboration** | GitHub (Public Repo) | Unlimited free minutes & storage |

---

## Recommended Zero-Cost Combo Summary

```
Frontend:        Next.js + Tailwind CSS  →  Hosted on Vercel (Free)
Backend:         FastAPI (Python)        →  Hosted on Render (Free Web Service)
Database:        Supabase (PostgreSQL)   →  500MB Free Tier
Auth & Storage:  Supabase Auth & Storage →  Free Tier
Session Cache:   Upstash Redis           →  10k commands/day Free
WhatsApp:        Meta WhatsApp Cloud API →  1,000 free conversations/month
Payments:        Cashfree / Razorpay     →  Pay-per-transaction only
Testing & CI:    Pytest + Playwright     →  GitHub Actions (Free)
AI Agent:        Antigravity CLI (`agy`) →  Google Ecosystem
```

---

## Honest Limitations & Mitigation Plan

- **Render Cold Starts:** The free web service sleeps after 15 minutes of inactivity, leading to a ~30-second delay on the first subsequent API request.
  - *Mitigation:* Acceptable for MVP alpha testers; can keep warm with a free cron ping or upgrade to Render Starter ($7/mo) when active traffic begins.
- **Supabase Free Tier Inactivity:** Unused Supabase projects pause after 1 week of inactivity.
  - *Mitigation:* Routine CI test runs or scheduled health checks keep the project active.
- **Scaling Budget Trigger:** Once platform volume reaches consistent daily active users and merchant revenues, allocate ~$15–$30/month for dedicated compute (Render/Railway paid tier + Supabase Pro), funded directly from platform earnings.
