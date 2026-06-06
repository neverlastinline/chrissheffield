# Medal Rush 3D

A single-file **3D arcade collect-a-thon** in the Brisbane Lions synthwave
style. Roll a glowing golden orb around a neon arena and grab as many medals
as you can before the 60-second clock runs out.

Built with [three.js](https://threejs.org/) (loaded from a CDN) in one HTML
file — no build step, no install. Just open it in a browser.

## How to play

| Action | Desktop | Mobile |
|---|---|---|
| Move | **WASD** / Arrow keys | Drag anywhere on screen |
| Dash | hold **Shift** | push the joystick to the edge |
| Start / restart | **SPACE** / **ENTER** or the button | tap the button |

Touch a medal to collect it. New medals spawn as you grab them, so the arena
always stays full.

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

## Tech

- One HTML file: inline CSS + a single `<script>`
- `three.js` r128 for the WebGL scene (shadows, fog, neon lights, particles)
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
