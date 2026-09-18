# Basavashree Education

A Pan-India online learning and course platform built with Next.js (App Router), TypeScript and Tailwind CSS v4, branded around the Basavashree Education logo (deep navy, royal/sky blue, gold accent).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

- `app/` — pages and API routes (home, courses, categories, about, contact, login/register, checkout, dashboard, legal pages)
- `components/` — layout (navbar/footer), homepage sections, and reusable UI (buttons, cards, icons)
- `lib/data/` — static course, category and nav data
- `lib/payments/namma-api.ts` — the only module that talks to Namma API
- `lib/store.ts` — file-backed store (`data/store.json`) standing in for a real database
- `lib/auth-client.ts` — minimal localStorage-based session for demo login/register/dashboard

## Namma API Payment Integration

Payments run through **Namma API** end to end:

```
Course → Checkout → Customer Details → Namma API Payment Gateway
  → Payment Verification → Enrollment Confirmation → Course Access
```

- `POST /api/orders` — creates a local order and a Namma API payment order (`lib/payments/namma-api.ts` → `createPaymentOrder`), returns `orderId`, `checkoutUrl`, `status`.
- `POST /api/payment/verify` — re-checks status with Namma API (`getTransactionStatus`) and, on success, creates the enrollment record.
- `POST /api/payment/webhook` — receives `transaction.status.updated` events from Namma API; verifies the `X-Signature` header via HMAC-SHA256 before trusting the payload.
- `GET /api/enrollments` / `GET /api/payment/history` — power the student dashboard.

### Configuring real credentials

Copy `.env.example` to `.env.local` and set:

```
NAMMA_API_BASE_URL=...
NAMMA_API_KEY=...
NAMMA_WEBHOOK_SECRET=...
```

These are read only on the server (`lib/payments/namma-api.ts`) and are never sent to the client. Until they're set, the app runs in **mock payment mode**: `/payment/gateway/[orderId]` stands in for the hosted Namma checkout page with "Simulate Successful/Failed Payment" buttons, so the full flow (including failure + retry) can be demoed without live credentials. Once real credentials are added, point Namma API's dashboard webhook URL at `/api/payment/webhook` and the mock gateway page is no longer used — `createPaymentOrder` will return Namma's real `checkoutUrl` instead.

## Known limitations (by design, for this stage)

- **Auth** is a demo-only localStorage session (`lib/auth-client.ts`) — no password hashing or server-side sessions. Swap for real auth (e.g. NextAuth) before production.
- **Data store** (`lib/store.ts`) is a JSON file for orders/enrollments — swap for a real database, keeping the same function signatures.
- **Course/category content** is static seed data in `lib/data/` — move to a CMS or database when ready to manage content dynamically.
