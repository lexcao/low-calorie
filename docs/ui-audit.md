# UI audit

Benchmarked against Awwwards, Webby, and FWA winners: one material world, type with a point of view, motion that is the product, and a layout that does not look assembled from a component kit. The page audited is the current 三餐签 landing page (indigo Tailwind hero, instant meal insert, editorial block directly underneath).

Direction chosen for the fix: a paper lot desk. Morning light, the logo’s own paper `#FAFAF7`, ink `#141414`, and green `#2F9E5B`. Drawing a slip is the only authored motion. Dark follows the existing dark wordmark (`#0C0C0C`, `#F3F3EF`, `#4CC27E`). The wordmark SVG files are not redrawn.

## Typography

The tagline, buttons, and meals all sit on Tailwind’s system sans at nearby sizes (`text-base` through `text-xl`). There is no display voice, no measure, and no scale step large enough to separate a meal name from a label. Award pages treat type as the material. Gap: self-host one family, set a real scale, and give meal names the size of a result, not a list row.

## Whitespace

The wordmark, tagline, two equal buttons, a third button, the empty line, and the FAQ share one continuous stack with `mt-3` / `mt-8` rhythm. The first screen does not have a stage, and the essay has no quiet margin before it. Gap: isolate the draw, then a long pause, then the explanation.

## Visual hierarchy

「一天」 is a filled indigo button, 「一周」 is a tinted twin, and 「试试好运」 is a bordered afterthought. The product’s heart is the draw, but it looks like the least important control. The FAQ repeats the tagline at the same size as the subtitle. Gap: one primary draw, a clear result, and an essay that reads as secondary.

## Color

Indigo `#4F46E5` and gray-500/600 are the Tailwind marketing default. They do not appear in the wordmark. Green, the only chromatic color in the mark, is unused. Secondary text is neutral gray on a near-white page. Gap: paint with the logo’s paper, ink, and green only.

## Motion

Choosing a meal swaps in a card with no transition. Day and week routes appear fully formed. Award motion is one gesture tied to the action, eased out, and absent when `prefers-reduced-motion` is set. Gap: a short draw (the three-bar rhythm already in the mark) and a slip that unseals. Keep it under about a second on a phone.

## Micro-interactions

Hover is a background tint. Focus is a stock indigo outline. There is an empty sentence, and no pressed state. The result does not feel received. Gap: press, focus, and a result that lands; the empty state should say that nothing has been drawn yet.

## Responsive layout

The home page fits a 390px screen, and the week list no longer overflows. The two home buttons become full-width blocks, which is fine, but the week and day pages are still the same gray cards with no change in composition between a phone and a desk. Gap: a single slip column on a phone, the same slips with more air on a desk, hit targets at least 48px, and no cropped wordmark.

## Originality

The structure is the default SaaS hero: centered headline, two buttons, feature-like cards, then an FAQ. Nothing about it says “draw a meal slip,” which is the whole product. Gap: make the page the instrument, not a template with Chinese copy poured in.
