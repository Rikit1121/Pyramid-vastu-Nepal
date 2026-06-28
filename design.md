# Design System — Pyramid Vastu Yantra

This file is the single source of truth for visual design. Every phase prompt to Cursor should reference this file. Do not invent new colors, fonts, radii, or shadow styles outside what's defined here — extend by adding new named tokens here first, then use them.

## Brand direction

Premium, minimal, grounded in the real materials and geometry of the product (copper, sacred geometry, ancient craftsmanship) — not generic "spiritual website" cliché (no chakra swirls, no stock zen photography, no purple gradients). Restraint is the signal of premium. One bold signature moment per page, everything else quiet.

---

## Colors

```css
--bg-deep: #0E0D12;       /* primary background, near-black with violet undertone */
--surface: #1A1820;       /* card/section backgrounds, slightly lifted off bg-deep */
--copper: #B87333;        /* primary accent — buttons, key highlights, materially true to product */
--gold-line: #D4AF6A;     /* muted antique gold — line-work, borders, secondary accent */
--ivory-text: #EDE8DD;    /* body text on dark backgrounds — never pure white */
--border-hairline: rgba(212, 175, 106, 0.15); /* card borders, dividers */
```

Usage rules:
- `--copper` is the primary CTA/action color. Use it for buttons, active states, key icons.
- `--gold-line` is for line-work, hairline borders, decorative geometry — not large fills.
- Never use pure black (`#000`) or pure white (`#FFF`) anywhere.
- Backgrounds stay dark throughout (`--bg-deep` / `--surface`) — this is a dark-theme site, no light-mode sections.

## Typography

- **Display/headers**: A high-contrast serif with architectural/carved character — Fraunces or similar. Used at large sizes, generous letter-spacing on short headlines (hero, section titles).
- **Body/UI**: A clean geometric sans — Inter or General Sans. Used for body copy, nav, buttons, forms.
- Never use more than these two font families.
- Headlines: tighter line-height, generous tracking on short lines. Body: comfortable line-height (1.6–1.7) for readability on dark backgrounds.

## Buttons

- **Primary**: copper fill, ivory text, border-radius 4px (not pill-shaped). Subtle gold-glow border on hover. Transition 200ms ease — slow, deliberate, never bouncy/spring.
- **Secondary**: transparent background, 1px copper border, fills with copper on hover.
- No drop shadows on buttons. Glow only (see Shadows section).

## Cards (product cards, service cards, etc.)

- Border-radius: 6px
- Background: `--surface`
- Border: 1px solid `--border-hairline`
- Hover: border opacity increases, optional 2–4px translateY lift. No heavy box-shadow bloom.

## Shadows / Glow

- Avoid traditional soft drop-shadows — they read as generic SaaS/template.
- Use soft radial **glow** instead, in copper or gold at low opacity (10–20%), behind key elements: hero geometry graphic, CTA buttons on hover, active nav states.
- Glow = "energy," not "elevation." This is a deliberate departure from standard shadow-based depth.

## Border radius (system-wide scale)

- 4px — buttons, inputs, small UI elements
- 6px — cards, panels
- 0px — image frames where a sharp architectural edge is wanted (used sparingly, intentionally)

## Icons

- Outline/line-style only, 1.5px stroke weight. No filled icons, no rounded blobby icon-library defaults.
- If using Lucide React (already in the stack), stick strictly to outline variants, consistent stroke width.

## Motion system

- **Signature moment**: the hero video (Flower of Life / sacred geometry build-up) plays once on load, freezes on final frame, then UI/headline reveals on top. This is the one big "wow" moment — see architecture.md for implementation notes.
- **Scroll reveals**: fade + 12px translateY, staggered slightly per element, 400–500ms ease-out. Used for section text, card grids entering viewport. (ReactBits "Scroll Reveal" approved for body text in story/about sections — use sparingly, not on every paragraph.)
- **Hover states**: minimal — border/glow intensity change only. No scale-up, no rotation, no bounce.
- **Explicitly avoided**: parallax overload, floating particles as decoration, click-spark effects, text-shuffle/scramble animations, marquee/flowing-menu nav effects, anything that reads as "added because it looked cool in a component demo" rather than serving the content.
- One optional secondary motion idea (build later, not Phase 1): a restrained, non-spinning circular/orbital arrangement for a featured-products section, echoing mandala geometry — only if it can be made to feel architectural rather than playful/carousel-like.

## Hero video asset

- Source: 10-second clip, sacred geometry (Flower of Life → Metatron's Cube) building up in gold light over a mountain sunrise interior scene.
- Treatment: play once on page load, muted, no audio track (strip audio — re-encode to H.264 MP4 without it), freeze/hold on final frame (or crossfade to a static export of the last frame) rather than looping.
- Provide a poster image = static export of the final frame, shown before video loads and as the mobile fallback.
- Dark gradient overlay (bottom-up or radial from center) on top of the video for text legibility, tuned to blend toward `--bg-deep`.
- Do not reuse the full dramatic 10s version elsewhere on the site. If the motif is needed again (dividers, about page), cut a separate short, soft, audio-free loop from the early build-up portion only.

## Explicitly rejected references

- Himalaya Palace (restaurant demo site) — single-page anchor-link structure, not multi-page catalog architecture. Visual mood not strong enough to anchor on. Do not reference its layout.
- ReactBits: Shuffle text, Click Spark — rejected, wrong register for this brand (too playful/loud/tech for a premium heritage-craft brand).

## Approved exceptions

- **FlowingMenu (ReactBits)** — used on the homepage (`/`) as the section strip immediately after the Hero (`components/home/FlowingNav.tsx`). Approved by the client as a deliberate design choice. Do not remove it or flag it as a violation. Implemented in `components/shared/FlowingMenu.tsx` with brand-appropriate colors and `fm-` prefixed CSS classes in `globals.css`.
