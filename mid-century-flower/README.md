# Mid Century Flower

A single-file gallery site for **atomic-age botanical art** — geometric flowers
in the warm, confident style of 1950s–60s mid-century modern design.

**View live:** https://neverlastinline.github.io/chrissheffield/mid-century-flower/

Every artwork is hand-drawn in **pure inline SVG** — solid colour fields, black
outlines, radial symmetry. No photographs, no stock images, no external
libraries, no build step. Just open `index.html` in any browser.

## What's inside

A one-page site with:

- A **hero** featuring a large atomic starburst bloom
- A scrolling **marquee strip** of taglines
- A **gallery** of six unique flower prints, each its own SVG:

  | # | Title | Vibe |
  |---|-------|------|
  | 01 | Daisy Wheel | Eleven cream petals on mustard |
  | 02 | Tulip Trio | Three tulips in a teal field |
  | 03 | Atomic Burst | Thin spokes with dot tips |
  | 04 | Poppy Rows | A 3×3 grid of poppies |
  | 05 | Single Stem | Minimal stem-and-leaf composition |
  | 06 | Sun Disc | Concentric scalloped rings |

- An **about** section explaining the idea
- A **footer** with a vector seed-head motif

## Palette

Mustard `#e3a92c` · Burnt Orange `#d2592b` · Rust `#9c3d20` · Teal `#2f6f6a` ·
Olive `#57632e` · Sage `#7d8c4e` · Plum `#6b3a52` · Pink `#d98a87` ·
Cream `#fbf4e3` · Ink `#2b2118`

## Running it

```bash
open mid-century-flower/index.html   # macOS
# or just double-click the file
```

No install, no network calls. Works in any modern browser.

## Tech

- Plain HTML + CSS, all styling inline in `<head>`
- Flower art is inline `<svg>` using `<use>` + `rotate()` for radial symmetry
- Responsive grid (3 → 2 → 1 columns), sticky nav, CSS marquee animation
- No JavaScript, no fonts, no images, no dependencies
