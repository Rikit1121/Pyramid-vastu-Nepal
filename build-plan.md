# Build Plan — Pyramid Vastu Yantra

Rule of thumb used throughout: **Opus to decide, Sonnet to execute repeatedly.** Structural/architectural decisions and anything visually finicky get the stronger model. Repetitive, pattern-already-established work gets the cheaper model. Build now, animate later — phases below intentionally defer fine animation polish to its own later phase rather than mixing it into every page build.

---

### Phase 0 — Project scaffold
**Model: Opus**
- Next.js + TypeScript + Tailwind init
- Folder structure per architecture.md
- Tailwind theme config wired to design.md tokens (colors, radius, fonts as CSS variables)
- Install core deps: Framer Motion, Lucide React, Supabase client
- Drop in design.md, architecture.md, .cursorrules into repo root
- Get this wrong and every later phase inherits the mistake — worth paying for quality once, upfront.

### Phase 1 — Layout shell + navigation
**Model: Sonnet** (pattern is simple once scaffold exists)
- Root layout, nav bar, footer
- Page routing skeleton for all 8 pages (even if content is empty/placeholder)
- Basic responsive behavior

### Phase 2 — Homepage: hero + video
**Model: Opus**
- This is the signature moment — motion timing and "does this feel premium" judgment calls justify the stronger model.
- Hero video implementation: play-once, freeze-on-final-frame behavior, poster image fallback, gradient overlay, mobile fallback to static image
- Headline/CTA reveal timing on top of the settled video

### Phase 3 — Homepage: remaining sections
**Model: Sonnet**
- Brand intro/philosophy block
- Services teaser cards (2x, linking to service pages)
- Shop teaser section
- Advisor/WhatsApp section (NepalYatra pattern: card + deep link + contact fallback)
- Footer content (socials, YouTube link)
- Static/no advanced animation yet — basic fade-ins only, fine-tuning comes in the animation phase

### Phase 4 — Service page template + both service pages
**Model: Sonnet** for content sections; **Opus** if the shared-template structure itself needs a design decision (e.g. how data-driven the template should be)
- Build `ServicePageLayout` component, fed by Service data
- Populate `/vastu-advisory` and `/cupping-healing` with real content once you have it (placeholder copy is fine to start)
- Advisor CTA block on each, with per-service pre-filled WhatsApp message

### Phase 5 — Shop catalog + product detail
**Model: Sonnet**
- Product grid at `/shop`, using placeholder data matching the `Product` type
- Product detail page `/shop/[slug]`
- Card component (reused from design.md card spec)
- "Enquire Now" CTA (WhatsApp/contact, not cart)

### Phase 6 — About + Contact pages
**Model: Sonnet**
- About: brand story (straightforward content page)
- Contact: form + WhatsApp + social links + YouTube embed (playable video on page, per requirement)

### Phase 7 — Supabase backend wiring
**Model: Opus**
- Schema design (products table, RLS policies)
- Supabase Auth setup for single admin user
- Storage bucket setup for product images
- Typed Supabase client in `/lib/supabase.ts`
- This is backend/security-critical — worth the stronger model to get RLS and auth right the first time, since mistakes here are security mistakes, not just visual ones.

### Phase 8 — Admin dashboard
**Model: Sonnet** for the CRUD forms themselves (repetitive, well-defined once schema exists); **Opus** to review the auth-gating and security wiring once built
- Protected `/admin` route
- Product list, add/edit/delete forms, image upload
- Wire to real Supabase data (this also replaces placeholder data on `/shop` with live data)

### Phase 9 — Animation & motion polish pass
**Model: Opus**
- Now layer in the refined motion system across all pages: scroll reveals (ReactBits Scroll Reveal for story text), hover states, stagger timing
- This is explicitly deferred until structure is done, per "build now, animate later"
- Visual judgment calls (does this feel premium, is this too much per the earlier ReactBits discussion) benefit from the stronger model

### Phase 10 — Consistency / final review pass
**Model: Opus**
- One full pass across all pages checking: does page 5 match page 1's spacing/tone, are design.md tokens used consistently, any drift from the design system
- Catching cross-page drift is exactly the failure mode worth paying for one strong pass to prevent

---

## Notes on running this in Cursor

- Start a **new Cursor chat per phase** where reasonable — keeps context focused and avoids the model dragging earlier phases' assumptions into later, unrelated work.
- At the start of each phase's first prompt, explicitly point Cursor at `design.md` and `architecture.md` again, even though `.cursorrules` should pick them up automatically — explicit reference reduces drift.
- If a Sonnet-assigned phase produces something that feels off visually, that's a normal signal to escalate just that one component/section to Opus rather than redoing the whole phase in Opus.
