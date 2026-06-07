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

Next.js 16 App Router portfolio site rebuilt with Chakra UI v3. CV content lives in `src/data/cv.ts` as typed constants. `app/page.tsx` is a Server Component that assembles all sections.

**`app/layout.tsx`** — Wraps the app in `<Provider>` (Chakra UI + next-themes). Has `suppressHydrationWarning` on `<html>`.

**`app/page.tsx`** — Server Component page shell. Assembles Header and section components.

**`src/components/ui/`** — Auto-generated Chakra UI snippets: `provider.tsx`, `color-mode.tsx`, `toaster.tsx`, `tooltip.tsx`. Do not edit these manually; regenerate with `npx @chakra-ui/cli snippet add`.

**`src/components/Header.tsx`** — `'use client'`, Chakra UI nav bar. Fixed position, scroll-based frosted glass, mobile Drawer menu.

**`src/data/cv.ts`** — All typed CV content constants (profile, experiences, projects, skills, education, contact, navItems).

## Chakra UI v3

- Provider is at `src/components/ui/provider.tsx` and wraps the app in `app/layout.tsx`.
- Use **semantic tokens** (`bg.subtle`, `fg.default`, `border.subtle`) for theme-aware styles.
- Use `colorPalette` (not `colorScheme`) on interactive components: `<Button colorPalette="violet">`.
- Components that use hooks or browser events must be `'use client'`; static/data-only components can remain Server Components.
- Chakra UI coexists with Tailwind CSS v4 — prefer Chakra primitives for layout and interactive components, Tailwind for one-off utility classes if needed.

## Testing

Playwright QA (`tests/qa/site.spec.ts`) runs against the Next.js production server on port 4173. Tests are split by viewport: `desktop-chromium` (1440×1200) and `mobile-chromium` (Pixel 7). Snapshot baselines live in `tests/qa/site.spec.ts-snapshots/`. Visual regression uses `maxDiffPixelRatio: 0.03`.

Tests cover: hero text presence, no horizontal overflow, back-to-top button, mobile menu toggle, and contact section reachability.
