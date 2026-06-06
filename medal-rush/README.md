# Medal Rush 3D

A single-file **3D arcade collect-a-thon** in the Brisbane Lions synthwave
style. Steer the **3D lion mascot** around a neon arena and grab as many medals
as you can before the 60-second clock runs out — then put your name on the
**online leaderboard**.

Built with [three.js](https://threejs.org/) (loaded from a CDN) in one HTML
file — no build step, no install. Just open it in a browser.

## How to play

| Action | Desktop | Mobile |
|---|---|---|
| Move | **WASD** / Arrow keys | Drag anywhere on screen |
| Dash | hold **Shift** | push the joystick to the edge |
| Start / restart | **SPACE** / **ENTER** or the button | tap the button |

The lion turns to face the way it's running, with an animated gallop and a
wagging tail. Touch a medal to collect it — new medals spawn as you grab them,
so the arena always stays full.

## Scoring

| Medal | Points |
|---|---|
| 🥇 Gold | 6 |
| 🥈 Silver | 3 |
| 🥉 Bronze | 1 |

Grab medals in quick succession to build a **COMBO** multiplier (up to ×8) —
each medal within ~2 seconds of the last keeps the chain alive. Gold medals are
rare, so a gold mid-combo is worth a small fortune.

Your final score earns a podium rank:

| Score | Rank |
|---|---|
| 180+ | 🥇 Gold medal performance |
| 100–179 | 🥈 Silver |
| < 100 | 🥉 Bronze |

Your best score is saved to `localStorage` under `medalRushBest`.

## Online leaderboard

When you finish a run you can enter a name and submit your score. The game
shows the global **top 10**, and there's a 🏆 **LEADERBOARD** button on the
title screen to view it any time.

It works in two modes:

- **Out of the box** — scores save to a **local** leaderboard in your browser
  (`localStorage` key `medalRushBoard`). No setup, but scores aren't shared.
- **Global** — point the game at a free [Supabase](https://supabase.com)
  project and the board becomes a real cross-player leaderboard.

### Turn on the global leaderboard

1. Create a free project at [supabase.com](https://supabase.com).
2. In the **SQL Editor**, paste and run [`supabase.sql`](supabase.sql). It
   creates the `medal_rush_scores` table and row-level-security policies that
   let anonymous visitors **read** the board and **insert one score** — but not
   edit or delete anyone else's.
3. In **Project Settings → API**, copy the **Project URL** and the public
   **anon** key.
4. Paste them into the `SUPABASE_URL` and `SUPABASE_ANON_KEY` constants near
   the top of [`index.html`](index.html), then redeploy.

The anon key is **safe to commit** to a public static site — that's exactly
what Supabase's anon role + RLS are designed for. If the server is ever
unreachable, the game falls back to the local board so a score is never lost.

## Tech

- One HTML file: inline CSS + a single `<script>`
- `three.js` r128 for the WebGL scene (shadows, fog, neon lights, particles)
- The lion mascot is modelled procedurally from three.js primitives (no asset
  files): a maned head, gallop-animated legs, and a wagging tail
- Online leaderboard via the Supabase REST API (anon key + RLS), with a
  `localStorage` fallback
- WebAudio for pickup / combo / start / game-over SFX — no audio files
- CRT scanline + vignette overlay to match the rest of the repo
- Loads three.js from a CDN with three fallback hosts; shows a friendly error
  if the network is unavailable

## Running it

```bash
# from the repo root
open medal-rush/index.html      # macOS
# or double-click the file in your file manager
```

A modern browser with WebGL is required.
