# Refresh diagnosis

Checked on 2026-11-05 against the live site `https://cal.lexcao.io/` and a local production build of the then-current Svelte app (`npm run build`, Rollup). The build copies `public/index.html` through unchanged and only emits `public/build/bundle.js` and `public/build/bundle.css`.

## What the page emits

| Signal | Live HTML and local build |
| --- | --- |
| `<title>` | `低卡` |
| meta description | absent |
| `<html lang>` | `en` (visible copy is Chinese) |
| canonical | absent |
| Open Graph | absent |
| Twitter | absent |
| JSON-LD | absent |
| favicon | `/favicon.png` is a real 240×240 PNG (9440 bytes) |
| robots.txt | not a robot file. `GET /robots.txt` is `200 text/html` with `content-disposition: filename="index.html"` |
| sitemap.xml | same fallback: the homepage HTML, not XML |
| og image | `GET /og.png` is the same HTML fallback |
| no-JS body | empty. The only body content on the live response is Cloudflare Rocket Loader, which rewrites the bundle `<script>` tag. Recipe text exists only after `bundle.js` runs |

Hash routes `/#/day` and `/#/week` are not separate documents. There is no `vercel.json` in the repo. Cloudflare, DNS, and zone settings were left alone.

## Lighthouse-style checks

Measured in Chrome, including a 390×844 mobile emulation and `prefers-color-scheme: dark`.

- Tap targets. Header links `返回` and `一天` / `一周` are about 32×24px. `试试好运` is a `<span>` (about 130×45px) with a click handler, so it is not keyboard-focusable.
- Focus. The production CSS has no focus outline of its own. Links keep the browser default. The random action cannot take focus.
- Contrast. Body text is gray-900 on gray-50. The indigo buttons are comfortable. 12px labels use gray-500 (`#6B7280`) on white, about 4.8:1, just over the 4.5:1 AA line. `返回` uses `opacity-75` and still clears contrast; the problem there is the hit area, not the color.
- Layout shift. The HTML body is empty, then the client renders the whole UI. The home page starts with an empty `mt-36` spacer (144px) plus large `mt-*` on `<main>`. Choosing `试试好运` inserts a card under the buttons. On the week view the weekday label is `position: absolute` and shares its top edge with the card, so it sits on the card border.
- Mobile overflow. At 390px the document does not scroll sideways. Week cards are full-bleed (`px` starts at `sm`) and keep breakfast, lunch, and dinner in one row, so each ingredient column is about 48px wide. The day view’s slash-separated line fits.
- Dark mode. Not supported. `tailwind.config.js` sets `darkMode: false`. With the dark color scheme emulated, the background stays `#f9fafb`. A few `dark:` classes on the cards never apply.
- Empty and loading. Before `试试好运`, the home page has no hint. There is no loading state; without JavaScript the page is blank. The day view formats the date with `toLocaleDateString()` and no locale (an en-US browser showed `11/5/2026`).

## Build notes

`package.json` has no test or lint script. `package-lock.json` pinned tarball URLs at `registry.nlark.com` and `registry.npm.taobao.org`. Those hosts fail DNS or TLS from a current install, so `npm ci` could not run until the URLs were pointed at `registry.npmjs.org`. Versions and integrity hashes were left as locked.
