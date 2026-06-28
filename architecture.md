# Architecture — Pyramid Vastu Yantra Website

## Business priority (read this first)

**Services are the priority, products are secondary.** The business is Vastu consultation + cupping/healing therapy. The 5 pyramid/yantra products are a supporting catalog, not the main draw. Homepage and overall site weighting should reflect this — services get full dedicated pages with real depth, products get a simpler shop + detail page pattern.

No payment gateway in this phase. No user accounts. Site funnels visitors toward WhatsApp/contact, not checkout.

## Tech stack

- **Frontend**: Next.js (App Router) + React + Tailwind CSS + Framer Motion
- **Backend**: Supabase (Postgres + Storage + Auth) — chosen over WordPress/Elementor and over Laravel because it keeps everything in one JS/TS ecosystem that matches the Cursor + React workflow. WordPress would require abandoning the component-based design system; Laravel is a needless second language/ecosystem for a small team.
- **Admin**: custom-built protected route (`/admin`), not a CMS UI — lighter, fully matches the site's own design system, full control.
- **Hosting**: Vercel (matches existing Mero Works workflow — NepalYatra, Ember & Salt precedent).
- **Animation libraries**: Framer Motion (primary), selected ReactBits components (Scroll Reveal approved; see design.md for rejected ones).

## Site map

1. `/` — Homepage
2. `/vastu-advisory` — Service page 1 (consultation)
3. `/cupping-healing` — Service page 2 (therapy)
4. `/shop` — Product catalog (5 products, placeholder data initially)
5. `/shop/[slug]` — Product detail page
6. `/about` — Brand story, credibility
7. `/contact` — Contact form, WhatsApp, social links (IG/FB), YouTube embed
8. `/admin` — Protected admin dashboard (product CRUD; auth-gated via Supabase Auth)

## Homepage section order (services-first weighting)

1. Hero — sacred geometry video (plays once, freezes on final frame), headline, primary CTA
2. Brand intro / philosophy — short, credibility-building copy
3. **Services block** — two substantial cards: Vastu Advisory / Cupping & Healing — each links to its own full page. This is the primary homepage content, not an afterthought.
4. Shop teaser — smaller section, "Explore our Pyramids & Yantras," links to `/shop`. Secondary visual weight vs. services.
5. Advisor / WhatsApp section (NepalYatra-style: advisor photo + name + WhatsApp deep link with pre-filled message per service, fallback to contact form)
6. Footer — nav, socials (IG, FB, YouTube), contact info

## Service page template (shared, reused for both services)

Both `/vastu-advisory` and `/cupping-healing` use one `ServicePageLayout` component fed different content data. Sections, in order:

1. Hero (service name, short tagline, image)
2. What it is / overview
3. Process — how it works, step by step
4. Benefits
5. Who it's for / FAQ (optional, can be added later)
6. Advisor card + WhatsApp CTA (pre-filled message specific to that service)

This is a deliberate "build once, diverge later if needed" decision — if the two services end up needing meaningfully different layouts after real content is in, split the template then. Don't over-engineer two custom layouts speculatively.

## Data shapes

### Product
```ts
type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;       // NPR
  description: string;
  benefits?: string[];  // Vastu/energy significance
  material?: string;
  size?: string;
  images: string[];     // Supabase Storage URLs
  inStock: boolean;
  createdAt: string;
};
```

### Service (static content initially, not DB-driven — only 2 services, no admin CRUD needed for these yet)
```ts
type Service = {
  slug: 'vastu-advisory' | 'cupping-healing';
  name: string;
  tagline: string;
  overview: string;
  process: { title: string; description: string }[];
  benefits: string[];
  advisorWhatsAppMessage: string; // pre-filled text per service
};
```

### Advisor
```ts
type Advisor = {
  name: string;
  role: string;
  languages: string[];
  photo: string;
  whatsappNumber: string;
};
```

## Advisor / "calendar" system — important scoping note

There is **no real booking/calendar engine** in this phase. Confirmed via the NepalYatra reference: their "Talk to an Advisor" section is just an advisor card with a WhatsApp deep-link (pre-filled message) and a contact-form fallback — no date/slot picker, no scheduling backend. We are replicating exactly this pattern, not building Calendly. If real time-slot booking is needed later (e.g. therapy session volume grows), that's an explicitly separate future phase — not in scope now.

## Admin scope (Phase-gated, see build-plan.md)

- Auth-gated route, Supabase Auth (email/password, single admin user is fine for now)
- Product list view
- Add product form (name, price, description, benefits, material, size, image upload to Supabase Storage, in-stock toggle)
- Edit / delete product
- (Optional, lower priority, from original PDF brief) simple blog post CRUD — only build if time/budget allows after core admin works

## Security baseline (no compromises, per brief)

- HTTPS via Vercel (automatic)
- Supabase Auth for admin login — no custom auth rolled by hand
- Row Level Security (RLS) policies on Supabase tables: public read on products, write restricted to authenticated admin only
- Environment variables for all Supabase keys — never hardcoded, never committed
- Input validation on all forms (contact form, admin product form) both client and server side
- No payment data touches this system in this phase (deferred), so PCI-DSS scope is currently zero — revisit when checkout is actually built
- Rate-limiting / spam protection on the public contact form (basic honeypot or similar — full firewall/WAF discussion deferred until traffic justifies it)

## Explicitly out of scope (this phase)

- Payment gateway (eSewa/Khalti) integration
- User accounts / customer login
- Real-time calendar/slot booking
- Blog (unless time allows after core build, see above)
