# World of Wood Decoration

A world-class, dark-luxury marketing site for **World of Wood Decoration** — an
international architectural wood atelier that designs and manufactures exclusive
wooden interiors for palaces, villas, mosques, hotels and private residences.

Built as an enterprise-grade, fully custom Next.js application: no templates, no
demo code, every section bespoke and animated.

---

## ✨ Highlights

- **Dark luxury design system** — warm espresso surfaces, brushed-brass accents,
  editorial serif display type, fluid clamp-based typography.
- **Premium motion** — Lenis smooth scroll driven by the GSAP ticker, Framer
  Motion reveals, magnetic buttons, a bespoke trailing cursor, word-mask heading
  reveals, parallax imagery and a scroll-drawn GSAP timeline.
- **A subtle 3D accent** — a lazy-loaded React Three Fiber sculpture in the
  Materials section (mounted only when scrolled into view).
- **Fully bilingual (EN / AR)** with automatic **RTL** layout, localized routing,
  metadata and hreflang alternates via `next-intl`.
- **SEO ready** — dynamic per-page metadata, canonical + hreflang, JSON-LD
  structured data, dynamic OpenGraph images, `sitemap.xml` and `robots.txt`.
- **Accessible & performant** — semantic markup, skip link, focus styles,
  `prefers-reduced-motion` support, `next/image` optimization, route-level code
  splitting and `optimizePackageImports`.

## 🧱 Tech stack

| Concern            | Choice                                             |
| ------------------ | -------------------------------------------------- |
| Framework          | **Next.js 16** (App Router, Turbopack) + React 19  |
| Language           | **TypeScript** (strict)                            |
| Styling            | **Tailwind CSS v4** (CSS-first `@theme` tokens)    |
| Animation          | **Framer Motion**, **GSAP** (ScrollTrigger)        |
| Smooth scroll      | **Lenis**                                          |
| Carousels          | **Swiper**                                         |
| 3D                 | **Three.js** + **React Three Fiber** + **drei**    |
| Forms & validation | **React Hook Form** + **Zod**                      |
| i18n               | **next-intl** (EN / AR, RTL)                        |
| Icons              | **React Icons**                                    |

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (optional but recommended)
cp .env.example .env.local   # then edit values

# 3. Run the dev server
npm run dev                  # http://localhost:3000

# 4. Production build & serve
npm run build
npm start

# Quality
npm run lint                 # ESLint (flat config)
npm run typecheck            # tsc --noEmit
```

> Requires Node.js ≥ 18.18 (developed on Node 24).

### Environment variables

| Variable               | Purpose                                             |
| ---------------------- | --------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap, OG, robots. |
| `CONTACT_INBOX_EMAIL`  | Destination inbox for the contact enquiry endpoint. |

## 🗂️ Architecture

```
src/
├─ app/
│  ├─ [locale]/                # Localized route tree (root layout lives here)
│  │  ├─ layout.tsx            # <html>, fonts, providers, Header/Footer, SEO
│  │  ├─ page.tsx              # Home (composed from sections)
│  │  ├─ about/ services/ contact/
│  │  ├─ projects/             # Listing + [slug] detail (SSG)
│  │  ├─ opengraph-image.tsx   # Dynamic OG image (next/og)
│  │  └─ not-found.tsx         # Localized 404
│  ├─ api/contact/route.ts     # Validated enquiry endpoint
│  ├─ globals.css              # Design system (Tailwind v4 @theme + layers)
│  ├─ sitemap.ts · robots.ts   # SEO route handlers
│  └─ not-found.tsx            # Global fallback document
├─ components/
│  ├─ layout/                  # SmoothScroll, Header, Footer, Logo, switchers
│  ├─ sections/                # Page sections (Hero, Services, Process, …)
│  ├─ three/                   # React Three Fiber scene
│  ├─ seo/                     # JSON-LD
│  └─ ui/                      # Reusable primitives (Button, Reveal, Cursor, …)
├─ hooks/useGSAP.ts            # Scoped GSAP context hook
├─ i18n/                       # next-intl routing, navigation, request config
├─ lib/                        # site config, projects data, motion, seo, utils, zod
└─ proxy.ts                    # next-intl middleware (Next 16 "proxy" convention)

messages/                      # en.json · ar.json translation catalogs
```

### Design principles

- **Reusable primitives** live in `components/ui`; sections compose them.
- **Content is data-driven**: portfolio lives in `lib/projects.ts`, all UI copy in
  `messages/*.json` — add a locale by dropping in a new catalog + routing entry.
- **Server Components by default**; client components are used only where
  interaction/animation requires it.

## 🌍 Internationalization

Locales are defined in `src/i18n/routing.ts` (`en` default, `ar` RTL). The
`localePrefix` is `as-needed`, so English is served at `/` and Arabic at `/ar`.
Direction (`dir="rtl"`) and the Arabic font are switched automatically in the
locale layout, and logical CSS properties (`ms-`, `pe-`, `start-`) keep every
component mirror-safe.

## 🖼️ Imagery

Reference photography is loaded through `next/image` from Unsplash (configured in
`next.config.ts`). **Replace these with the client's own project photography** for
launch — update the URLs in `src/lib/projects.ts` and the section components, or
point them at your DAM/CMS and add its hostname to `images.remotePatterns`.

## ⚡ Performance & Lighthouse

The app is engineered for top-tier Core Web Vitals: static generation for all
content routes, `next/image` (AVIF/WebP, responsive `sizes`), font `display:swap`,
lazy + in-view-gated 3D, package-import optimization and reduced-motion support.
Real-world Lighthouse scores depend on the host and CDN; serve behind a modern
CDN and replace remote imagery with optimized assets on your own origin for the
best numbers.

## 📦 Deployment

Optimized for **Vercel** (zero-config). Set `NEXT_PUBLIC_SITE_URL` and
`CONTACT_INBOX_EMAIL` in the project's environment, then `git push`. Any Node
host supporting Next.js 16 works with `npm run build && npm start`.

To deliver real enquiry emails, wire an email provider (Resend / SendGrid / SES)
at the marked integration point in `src/app/api/contact/route.ts`.

---

© World of Wood Decoration — Architectural Wood Atelier.
