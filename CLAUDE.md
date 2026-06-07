# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Next.js dev server (port 3000, Turbopack)
npm run build        # next build (TypeScript + static generation)
npm run start        # next start (serve built output)
npm run lint         # next lint (ESLint)
npm run qa           # next build + Playwright tests
```

Run a single Playwright test file:
```bash
npx playwright test tests/qa/site.spec.ts
```

Update Playwright snapshots after intentional visual changes:
```bash
npx playwright test --update-snapshots
```

## Architecture

Next.js 16 App Router portfolio site. CV content lives in `src/data/cv.ts` as typed constants. `app/page.tsx` is a Server Component that assembles all sections — CV text renders as static HTML at build time.

**`app/page.tsx`** — Server Component page shell. Wraps all sections in `ScrollProvider` (client), assembles Server and Client Components.

**`src/data/cv.ts`** — All typed CV content constants (profile, experiences, projects, skills, education, contact, navItems) and shared Tailwind class strings.

**`src/components/ScrollProvider.tsx`** — `'use client'`, Lenis + GSAP orchestration. Provides Lenis via `ScrollContext`. Uses GSAP ticker to drive Lenis's rAF (correct integration pattern for scroll + animation sync). Picks up `data-parallax` elements on mount.

**`src/context/ScrollContext.tsx`** — React Context providing Lenis instance. `useScroll()` hook used by Header, ProgressBar, BackToTop, HeroSection.

**`src/components/HeroSection.tsx`** — `'use client'`, hero layout + lazy HeroScene + GSAP parallax + scroll glow effect.

**`src/components/ProjectsSection.tsx`** — `'use client'`, GSAP pin + entry animation with `gsap.matchMedia()` for desktop/mobile.

**`src/components/SectionReveal.tsx`** — `'use client'`, IntersectionObserver reveal wrapper. Add `id` prop to create anchor targets.

**`src/components/Header.tsx`** — `'use client'`, nav + mobile menu + scroll-based blur + active section tracking via `[data-nav-section]` elements.

**Server Components** (`ExperienceSection`, `AboutSection`, `SkillsSection`, `EducationSection`, `ContactSection`) — pure HTML + Tailwind, no hooks, import from `src/data/cv.ts`.

## Testing

Playwright QA (`tests/qa/site.spec.ts`) runs against the Next.js production server on port 4173. Tests are split by viewport: `desktop-chromium` (1440×1200) and `mobile-chromium` (Pixel 7). Snapshot baselines live in `tests/qa/site.spec.ts-snapshots/`. Visual regression uses `maxDiffPixelRatio: 0.03`.

Tests cover: hero text presence, no horizontal overflow, back-to-top button, mobile menu toggle, and contact section reachability.
