# Brisbane Lions — Goal Kick Championship 198X

A single-file, retro-arcade goal-kicking game starring the Brisbane Lions AFL team.
HTML/CSS/JS in one file, no build step, no dependencies — runs straight from a browser.

**Play live:** https://neverlastinline.github.io/chrissheffield/

![Game style: 1980s arcade, CRT scanlines, synthwave grid, pixel-art lion mascot, four white goal posts at the horizon, oscillating power and aim meters at the bottom.](#)

> 🥇 **New:** [**Medal Rush 3D**](medal-rush/) — a single-file 3D arcade
> collect-a-thon. Roll a glowing orb around a neon arena and grab medals
> against the clock. ([play it](https://neverlastinline.github.io/chrissheffield/medal-rush/) · [details](medal-rush/README.md))

> 🌼 **Also new:** [**Mid Century Flower**](mid-century-flower/) — a single-file
> gallery of atomic-age botanical art. Geometric blooms in mustard, burnt orange
> and teal, hand-drawn in pure SVG. ([view it](https://neverlastinline.github.io/chrissheffield/mid-century-flower/) · [details](mid-century-flower/README.md))

## How to play

You get 10 set shots at goal. The shots get progressively harder.

1. Press **SPACE** on the title screen to start.
2. Press **SPACE** to start the **POWER** meter oscillating.
3. Press **SPACE** again to lock power. The **AIM** meter starts.
4. Press **SPACE** to lock aim — the ball flies toward the posts.
5. Press **SPACE** to continue to the next kick.

You can also click anywhere instead of pressing space.

### Scoring (AFL)

| Result | Points |
|---|---|
| **GOAL** — ball through the two inner posts | 6 |
| **BEHIND** — ball through an inner + outer post | 1 |
| **OUT ON THE FULL** — ball wide of the outer post | 0 |
| **SHORT** — not enough power to reach the posts | 0 |

Final score is displayed AFL-style as `goals.behinds.points` (e.g. `04.05.029`).

Your best total is saved in `localStorage` and shown as **HI** in the HUD.

## Difficulty curve

Each of the 10 kicks has a preset **distance**, **angle from straight**, and **wind**:

| # | Distance | Angle | Wind |
|---|---|---|---|
| 1 | 30 m | straight | calm |
| 2 | 35 m | 10° L | calm |
| 3 | 35 m | 15° R | +2 |
| 4 | 40 m | 20° L | -3 |
| 5 | 45 m | 25° R | +5 |
| 6 | 45 m | 30° L | -7 |
| 7 | 50 m | 35° R | +9 |
| 8 | 55 m | 40° L | -12 |
| 9 | 60 m | 40° R | +13 |
| 10 | 60 m | 45° L | -15 |

On top of that, both meters speed up by ~13% per kick, so by the last shot they
oscillate roughly twice as fast as the first.

Power and aim difficulty scale with distance and angle:

- Minimum power to reach goal goes from ~28 (30 m) to ~79 (60 m). Below it → SHORT.
- Aim error and wind effect both amplify with distance.
- Sharp angles add extra wind sensitivity.

At 60 m on a sharp angle with a 15 m/s breeze you'll need to aim ~20 units into
the wind to land a goal — read the **WIND** indicator and compensate.

## HUD

| Cell | Meaning |
|---|---|
| **1P** | Live score, AFL format `G.B.P` |
| **KICK** | Current shot / 10 |
| **SHOT** | Distance and angle, e.g. `55m L40°` |
| **WIND** | Direction (`<`/`>`) and strength |
| **HI** | All-time high score (saved locally) |

## Visual style

- Synthwave perspective grid + sunset gradient
- Pixel-art lion kicker (drawn from a tiny character grid, no images)
- Four white goal posts at the horizon, maroon padding at the base
- Ball arcs from the kicker to the resolved post on every kick
- CRT scanlines, vignette, blinking "PRESS START" prompt
- Brisbane Lions colour palette: maroon, royal blue, gold

## Running it

It's one file. To play locally:

```bash
git clone https://github.com/neverlastinline/chrissheffield.git
cd chrissheffield
open index.html        # macOS
# or just double-click index.html in your file manager
```

No build, no install. Any modern browser works.

## Deployment

`.github/workflows/pages.yml` deploys `index.html` to GitHub Pages on every push
to `main` or the active feature branch.

## Tech

- Plain HTML + CSS + a single inline `<script>` (~700 lines total)
- `<canvas>` for the field, posts, kicker and ball
- CSS for the synthwave backdrop, HUD, meters, scanline/CRT overlay
- High score persisted to `localStorage` under the key `lionsHi`
- No external libraries, no fonts, no images, no network calls

## Credits

Built as a fun retro tribute. Not affiliated with the AFL or the Brisbane Lions.
Go Lions.
