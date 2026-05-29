# Footy Feud

An online AFL **card-game** built as a production-ready full-stack demo on
Next.js 15 (App Router), TypeScript, Tailwind, shadcn/ui and Supabase.

Footy Feud is a head-to-head stat-comparison card game (think Top Trumps for
Aussie Rules). You build a deck of AFL player cards, draw against the CPU,
pick the stat you think will win, and try to take every card.

## Features

- Next.js 15 App Router with React 19
- Supabase auth (email/password) with email-confirmation callback route
- Middleware-enforced **protected routes** (`/dashboard`, `/cards`, `/play`, `/leaderboard`)
- **CRUD** for AFL player cards via Server Actions + Zod validation
- Head-to-head Footy Feud gameplay vs CPU, persisted to `games` table
- Global leaderboard backed by a Supabase view
- Tailwind + shadcn/ui components with **dark mode** via `next-themes`
- Loading + error UI at app, route and component levels
- SEO: `metadata`, OpenGraph, `robots.ts`, `sitemap.ts`
- Type-safe DB layer (`src/types/database.ts`)
- Responsive: works from phone to desktop

## Quick start

```bash
# 1. install
npm install      # or pnpm install / bun install

# 2. configure environment
cp .env.example .env.local
# fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. provision database
# Open Supabase → SQL editor → paste supabase/schema.sql → run
# (creates teams, cards, games tables + RLS + leaderboard view)

# 4. enable Email/Password auth in Supabase Authentication → Providers

# 5. run
npm run dev
```

App is now on http://localhost:3000.

## Project structure

```
web/
├── middleware.ts              # Supabase session refresh + auth gates
├── next.config.ts
├── tailwind.config.ts
├── components.json            # shadcn/ui config
├── supabase/
│   └── schema.sql             # tables, RLS, leaderboard view, seed data
└── src/
    ├── app/
    │   ├── layout.tsx         # root layout: theme, navbar, footer, toaster
    │   ├── page.tsx           # landing
    │   ├── loading.tsx        # app-level suspense fallback
    │   ├── error.tsx          # app-level error boundary
    │   ├── not-found.tsx
    │   ├── robots.ts / sitemap.ts
    │   ├── (auth)/
    │   │   ├── login/         # log in
    │   │   ├── signup/        # sign up
    │   │   └── callback/      # email confirmation OAuth handler
    │   ├── (protected)/
    │   │   ├── layout.tsx     # defense-in-depth auth check
    │   │   ├── dashboard/     # stats overview
    │   │   ├── cards/         # CRUD: list, new, [id]/edit, server actions
    │   │   ├── play/          # game vs CPU
    │   │   └── leaderboard/   # global ladder (view-backed)
    │   └── api/health/
    ├── components/
    │   ├── ui/                # shadcn/ui primitives
    │   ├── layout/            # navbar, footer, user menu
    │   ├── player-card.tsx    # the visual playing card
    │   ├── theme-provider.tsx
    │   └── theme-toggle.tsx
    ├── hooks/
    │   └── use-toast.ts
    ├── lib/
    │   ├── supabase/          # client.ts, server.ts, middleware.ts
    │   ├── validators/        # zod schemas for cards & game results
    │   ├── game/              # deck shuffle + CPU generator + compareStat
    │   ├── site.ts            # SEO + site metadata
    │   └── utils.ts
    └── types/database.ts      # generated-style DB types
```

## How a round works

1. We shuffle your deck (must be ≥ 5 cards) and generate a CPU deck of the same size.
2. Each turn both decks reveal their top card. The CPU card is **face-down** until you pick.
3. You choose one of five stats: kicks, handballs, marks, tackles, goals.
4. Highest value wins the round; ties don't move the score.
5. When either deck runs out the game ends. The result is persisted via a Server Action and contributes to your leaderboard record.

## Scripts

| Script             | What it does                |
| ------------------ | --------------------------- |
| `npm run dev`      | Next.js dev server on :3000 |
| `npm run build`    | Production build            |
| `npm run start`    | Run the production build    |
| `npm run lint`     | ESLint                      |
| `npm run typecheck`| `tsc --noEmit`              |

## License

MIT. Not affiliated with the AFL.
