# The AI Coding Playbook — paid digital guide

A deliberately tiny, single-feature app that sells one piece of knowledge: a
sales page → **Stripe one-time checkout** → an unlocked web page **+** a
downloadable PDF. No database, no user accounts, no webhooks.

## How it works

The buyer's Stripe **Checkout Session ID** is their access token:

1. `/` — sales landing with a "Get the Playbook" button.
2. Button → `POST /api/checkout` → creates a Stripe Checkout Session and redirects to Stripe's hosted payment page.
3. After paying, Stripe redirects to `/success?session_id={CHECKOUT_SESSION_ID}`.
4. `/success` retrieves the session server-side and, **only if `payment_status === "paid"`**, renders the full guide + a download button.
5. `GET /api/download?session_id=...` re-verifies the paid session, then streams `content/guide.pdf` (which lives outside `/public`, so it can't be grabbed without paying).

## Editing the content

All guide content lives in **`lib/guide-data.mjs`** — a single source of truth used
by both the web page and the PDF. Edit it, then regenerate the PDF:

```bash
npm run pdf   # rebuilds content/guide.pdf
```

## Environment variables

Copy `.env.example` and fill in:

| Var | What | Where to get it |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | Your Stripe secret key | https://dashboard.stripe.com/apikeys (use `sk_test_…` to validate, `sk_live_…` to take real money) |
| `STRIPE_PRICE_ID` | The one-time price ID | Already created: `price_1Td0TuLAoTGM5GaZCNE90tqx` ($19 USD, live) |

The site URL is derived from the request, so no URL env var is needed.

## Local development

```bash
npm install
cp .env.example .env.local   # then add your real STRIPE_SECRET_KEY
npm run dev                  # http://localhost:3000
```

Test a full purchase with Stripe **test** mode and card `4242 4242 4242 4242`
(any future expiry, any CVC).

## Deploy (Vercel)

Set the project **root directory** to `playbook`, add the two env vars above,
and deploy. That's it.

## Scripts

- `npm run dev` — local dev server
- `npm run build` / `npm start` — production build & serve
- `npm run typecheck` — TypeScript check
- `npm run pdf` — regenerate the downloadable PDF from `lib/guide-data.mjs`
