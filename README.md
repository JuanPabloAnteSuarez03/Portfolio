# Juan Pablo Ante — Portfolio

**English** · [Español](README.es.md)

Bilingual (ES/EN) personal portfolio. Next.js 16 (App Router) + TypeScript + Tailwind v4, fully static — 25 prerendered routes, no server runtime.

🔗 **Live:** https://juanpabloante.vercel.app

---

## Stack

| Concern | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind v4 (tokens in `@theme`, no `tailwind.config.ts`) |
| Fonts | `next/font/google` — Space Grotesk, Inter, JetBrains Mono, self-hosted |
| Images | `next/image`, static imports (dimensions + blur automatic) |
| OG images | `next/og` (`ImageResponse`), generated at build time |
| Screenshots | `playwright-core` against the system Chrome (see `scripts/capture.mjs`) |
| Hosting | Vercel |

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000 — `/` redirects to `/es`
npm run build        # both languages must come out prerendered
npm run start        # serve the production build
npx tsc --noEmit     # run before every push — see below
npm run capture      # regenerate project screenshots (manual, never in CI)
```

---

## How it's organized

```
src/
├─ app/
│  ├─ [lang]/                    Every real page lives under this segment
│  │  ├─ layout.tsx              Root layout — <html lang>, generateMetadata, Nav/Footer
│  │  ├─ page.tsx                Home
│  │  ├─ not-found.tsx           404 within a known language
│  │  ├─ opengraph-image.tsx     Home OG image
│  │  └─ projects/[slug]/
│  │     ├─ page.tsx             Case study
│  │     └─ opengraph-image.tsx  Per-project OG image
│  ├─ not-found.tsx              Root 404 — no [lang] layout above it, see gotchas
│  ├─ sitemap.ts · robots.ts
│  └─ globals.css                Design tokens (Tailwind v4 @theme) + hand-rolled animations
├─ content/
│  ├─ projects.ts                The 4 case studies, bilingual and typed — content edits go here
│  └─ profile.ts                 Personal info, education, contact
├─ i18n/
│  ├─ config.ts                  Locale list, hreflang/OG locale tags
│  └─ dictionaries/{es,en}.ts    UI strings
├─ components/
│  ├─ home/                      Hero, ProjectCard, StackSection, About, Contact
│  ├─ project/                   ProjectHeader, ProjectShowcase, ProjectNav
│  ├─ showcase/                  BrowserFrame, AppWindowFrame, ScreenshotPan, Gallery, Lightbox, LiveEmbed
│  ├─ layout/                    Nav, MobileMenu, LanguageSwitcher, HomeLink, Footer, ScrollProgress
│  ├─ seo/                       JSON-LD (Person, CreativeWork)
│  └─ ui/                        Button, Container, Section, Tag, Reveal, RevealGrid
├─ lib/                          cn, fonts, site (metadataBase/hreflang helper), use-reveal-pending
└─ types/content.ts              The `L<T>` bilingual type and the Project/CaseStudy shape
```

`docs/PLAN.md` is the original design doc — architecture, phased plan, verification steps. It's historical at this point (all 8 phases are done) but still the most complete write-up of *why* things are built the way they are.

---

## Bilingual routing

`/es/...` and `/en/...` are real routes, not a client-side language switch. `/` redirects to `/es` via `next.config.ts` (resolved at the CDN, no middleware). Every page is prerendered for both languages via `generateStaticParams` + `dynamicParams = false`.

**Type-checked sync between languages.** `en.ts` is annotated with the type derived from `es.ts`. A missing key in English is a compile error, not a silent bug — run `npx tsc --noEmit` before every push. The same discipline applies to `src/content/projects.ts`: every field that should be bilingual uses the `L<T>` type (`{ es: string; en: string }`), so forgetting a translation fails the build instead of shipping half-translated content.

---

## Showcase system

The home grid never embeds a live iframe — four third-party page loads on the landing page would defeat the point of a fast portfolio, and a mobile viewport squeezed into a card is unreadable. Instead:

- **`ScreenshotPan`** — a full-page screenshot inside a browser frame that pans on hover via CSS container queries (`translateY(calc(-100% + 100cqh))`), with no JS measuring anything. A button replicates the gesture for touch and keyboard.
- **`Gallery` + `Lightbox`** — for what has no visitable URL (an authenticated app, a desktop app): a poster image that opens a keyboard-navigable lightbox with a real focus trap.
- **`AppWindowFrame`** vs **`BrowserFrame`** — a desktop title bar with no URL pill communicates "this isn't a website" at a glance (used for the PyQt6 desktop app).
- **`LiveEmbed`** — the actual live site, loaded on demand inside an iframe scaled from a 1280px viewport via `ResizeObserver`. Only on the case-study page, only ≥768px, only after an explicit click — this is the "wow" moment, not the default.

Screenshots are captured with `scripts/capture.mjs` (`playwright-core` against the already-installed system Chrome, to avoid a ~300MB Playwright download) and committed to `src/assets/`, never generated during the build — a build can't depend on a client's server being up.

---

## Scroll effects

- **`ScrollProgress`** — a 3px accent-colored bar at the very top, updated with `scaleX` in a `requestAnimationFrame`, no CSS transition (it has to track the real scroll position frame by frame; a transition would always lag one step behind).
- **`Reveal`** — wraps each `Section`'s content; fades and slides up on scroll into view.
- **`RevealGrid` / `RevealList`** — same idea for card grids, but each direct child gets its own `transition-delay` via `:nth-child` in CSS, so items cascade in instead of the whole grid appearing as one block. No extra wrapper div per item — this is what lets `RevealList` render a real `<ul>`/`<li>` without breaking the nesting.
- **`fade-in-up`** — a plain CSS `@keyframes` animation (no JS, no scroll dependency) for whatever sits above the fold — the Hero, the case-study header — so it doesn't just snap into view the instant the page finishes loading.

All of it is designed around one constraint: **nothing may ever be permanently invisible without JavaScript.** The reveal components default to visible on the server and on the first client render; only in a `useLayoutEffect` — which runs before the browser's first paint — do they decide whether there's anything to hide, so there's never a frame where visible content flashes to hidden. `prefers-reduced-motion` needs no branching anywhere: a single global rule forces `animation-duration`/`transition-duration` to `0.01ms`, and every one of these effects inherits it automatically.

---

## SEO & accessibility

- `generateMetadata` per route with `metadataBase`, a title template, canonical + `hreflang` (`es-CO` / `en` / `x-default`), Open Graph and Twitter cards.
- Per-project OG images generated at build time with `next/og` — no external font downloads, so the build never depends on a third-party network for an image.
- `Person` and `CreativeWork` JSON-LD.
- `sitemap.xml` with language alternates, `robots.txt`.
- Verified with `axe-core` across every page, in both viewport sizes, after scrolling to reveal all lazy content: **0 violations**.
- Full keyboard pass: visible focus rings, correct tab order, a real focus trap in the lightbox (including the scrollable image region — a 4000px-tall screenshot is only readable by keyboard if that region itself can receive focus).

---

## Content rules

**No invented data.** Everything in `src/content/projects.ts` is verifiable against the repos, the live sites, or the CV. Anything only Juan Pablo can supply goes in a project's `pending[]` array, rendered as an amber dev-only note — visible in `npm run dev`, stripped in production (`PendingNote.tsx` checks `NODE_ENV`).

Each project's `role` field states the real scope of the work — full builds, backend-only, "landing built alone, design delivered by someone else" — deliberately, so the portfolio doesn't over- or under-state what was actually done.

---

## Gotchas

**`grid-bg` uses `mask-image`, which masks the element *and* its content.** It always goes on an empty absolute layer behind the content, never on the section's own container — otherwise the text fades out along with the grid.

**CSS transition-delay for the grid cascade lives on the *unprefixed* rule, not the `-pending` one.** A CSS transition takes its `transition-delay` from the end (new) computed style, not the start — defining the delay only under `.reveal-grid-pending` loses it at the exact moment that class is removed to reveal the grid.

**The root `not-found.tsx` can't declare its own `<html>`.** With `dynamicParams = false`, an unmatched route never enters the `[lang]` segment, so Next generates a default root layout for `/_not-found` — nesting another `<html>` inside it would produce two. `lang` and `<title>` are set client-side instead, in `NotFoundContent`, which also infers the language from the URL's first segment.

---

## Verification

```bash
npm run dev           # / must redirect to /es
npx tsc --noEmit       # fails if en.ts (or any bilingual field) is missing a key
npm run build          # all 25 routes must come out static, no ƒ markers
```
