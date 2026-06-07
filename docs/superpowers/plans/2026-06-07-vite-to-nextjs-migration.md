# Vite → Next.js App Router Migration Plan

**Date:** 2026-06-07  
**Branch:** main (in-place)  
**Base SHA:** 17e3d5eb2ba473f9ae9485c07e75520c62740249

## Decisions

- **Rendering:** App Router static generation (build-time HTML, best SEO)
- **Structure:** Server/Client split — CV content = Server Components (static HTML), animations = Client Components (`'use client'`)
- **Strategy:** In-place migration on main branch

## Target Architecture

```
app/
  layout.tsx           # RootLayout, Metadata (SEO), Lenis CSS, globals.css import
  page.tsx             # Server Component — assembles all sections
  globals.css          # @import "tailwindcss" (Tailwind v4)
src/
  data/
    cv.ts              # All typed CV constants (profile, experiences, projects…)
  components/
    # Client Components ('use client')
    ScrollProvider.tsx # Lenis init + GSAP global effects via Context
    Header.tsx         # Sticky nav + mobile menu + active section tracking
    HeroSection.tsx    # Hero layout + HeroScene + GSAP parallax + stats
    ProjectsSection.tsx # Project cards + GSAP pin animation
    SectionReveal.tsx  # IntersectionObserver reveal wrapper (passes children)
    ProgressBar.tsx    # Fixed scroll progress bar
    BackToTop.tsx      # Fixed back-to-top button
    HeroScene.tsx      # (existing, add 'use client' directive)
    # Server Components (pure HTML, no hooks)
    ExperienceSection.tsx
    AboutSection.tsx
    SkillsSection.tsx
    EducationSection.tsx
    ContactSection.tsx
```

## Shared CSS constants

Move to `src/data/cv.ts` (or keep inline in components that use them):
- `sectionLabelClass`
- `cardClass`
- `revealBaseClass`

---

## Task 1: Dependencies, config, and app directory scaffolding

### What to do

**Remove packages:**
- vite, @vitejs/plugin-react, @tailwindcss/vite

**Add packages:**
- next@15 (latest stable)
- @tailwindcss/postcss

**Delete files:**
- vite.config.ts
- index.html
- tsconfig.app.json
- tsconfig.node.json

**Create files:**

`next.config.ts`:
```ts
import type { NextConfig } from 'next'
const nextConfig: NextConfig = {}
export default nextConfig
```

`postcss.config.mjs`:
```js
const config = { plugins: { '@tailwindcss/postcss': {} } }
export default config
```

`tsconfig.json` (replace current root one):
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Update `package.json` scripts:**
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "qa": "next build && playwright test"
}
```

**Update `vercel.json`:**
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs"
}
```

**Update `.gitignore`** — add `.next/` if not already present.

**Create `app/globals.css`:**
```css
@import "tailwindcss";
@import "lenis/dist/lenis.css";
```

**Create `app/layout.tsx`:**
```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Martin Nagy — Full Stack Developer',
  description: 'Software developer with hands-on experience building modern web products with React, Angular, TypeScript, and C#.',
  openGraph: {
    title: 'Martin Nagy — Full Stack Developer',
    description: 'Software developer building modern web products.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  )
}
```

**Create placeholder `app/page.tsx`** (will be implemented in Task 4):
```tsx
export default function Page() {
  return <main>Migration in progress</main>
}
```

**Delete `src/index.css`** (replaced by app/globals.css).

### Acceptance criteria
- `npm run build` succeeds (placeholder page)
- `npm run dev` starts Next.js dev server
- No Vite config files remain
- `vercel.json` has `"framework": "nextjs"`

---

## Task 2: Data layer and Server Component sections

### What to do

**Create `src/data/cv.ts`** — extract all typed constants from `src/App.tsx`:
- Type definitions: `ExperienceItem`, `ProjectItem`
- Constants: `profile`, `experiences`, `projects`, `skills`, `education`, `contact`, `navItems`
- Shared CSS classes: `sectionLabelClass`, `cardClass`, `revealBaseClass`

**Create Server Components** (no hooks, no `'use client'`, pure JSX + Tailwind):

`src/components/ExperienceSection.tsx` — renders `<section id="experience">` with the experience cards list. Import data from cv.ts. No state, no effects.

`src/components/AboutSection.tsx` — renders `<section id="about">` with the about text grid.

`src/components/SkillsSection.tsx` — renders the skills grid (Frontend / Backend / Tools / Workflow cards).

`src/components/EducationSection.tsx` — renders education + languages + certification.

`src/components/ContactSection.tsx` — renders `<section id="contact">` with contact links and CTA button.

All sections use `data-parallax` and `data-depth` attributes where the current `App.tsx` has them (keep the attributes — they're picked up client-side by ScrollProvider).

For the reveal class: each section wraps its animated content in a `<div className="transition duration-700 ease-out will-change-transform motion-reduce:transform-none motion-reduce:transition-none">` — the actual opacity/translate classes will be toggled by `SectionReveal` (Task 3). Pass `data-reveal-id="sectionName"` attribute so the client wrapper knows which section it is.

### Acceptance criteria
- `src/data/cv.ts` exports all types and data constants
- 5 Server Component files created, no `'use client'` directive
- Components import data from `src/data/cv.ts`
- `npm run build` still succeeds

---

## Task 3: Client Components

### What to do

**`src/components/HeroScene.tsx`** — add `'use client'` as first line. No other changes.

**`src/components/ScrollProvider.tsx`** — `'use client'`
- Initializes Lenis with the same config as current App.tsx
- Registers GSAP ScrollTrigger
- Runs the `data-parallax` GSAP effect (toArray('[data-parallax]'))
- Provides Lenis instance via React Context (`ScrollContext`)
- Export `useScroll()` hook for children to subscribe to scroll events
- Renders `{children}`

**`src/components/Header.tsx`** — `'use client'`
- Sticky nav with blur/border scroll effect (subscribes to Lenis via `useScroll()`)
- Mobile menu toggle state
- Active section tracking via IntersectionObserver on `section[id]` elements
- Renders nav items from `navItems` (imported from cv.ts)
- Accepts no props, self-contained

**`src/components/ProgressBar.tsx`** — `'use client'`
- Fixed `div` at top of page with gradient bar
- Subscribes to `useScroll()`, calculates width from scroll position
- Same `Math.min(scroll / 2200, 1) * 100` formula as App.tsx

**`src/components/BackToTop.tsx`** — `'use client'`
- Fixed bottom-right anchor
- Subscribes to `useScroll()`, shows/hides based on scroll > 800
- Same CSS transition classes as App.tsx

**`src/components/SectionReveal.tsx`** — `'use client'`
- Props: `id: string`, `children: React.ReactNode`, `className?: string`
- Uses IntersectionObserver (same thresholds: `[0.2, 0.45, 0.7]`, rootMargin `-20%`)
- Toggles `translate-y-0 opacity-100` vs `translate-y-6 opacity-0` on its root div
- The `hero` section is pre-revealed (no animation needed, starts visible)

**`src/components/HeroSection.tsx`** — `'use client'`
- Owns `scrollYRef` (useRef)
- Subscribes to `useScroll()` to update scrollYRef and heroGlow effect
- Renders the hero layout: text column + visual column (HeroScene + snapshot card)
- Renders hero stats
- GSAP ScrollTrigger for hero parallax and stats stagger animation
- `heroTextRef`, `heroVisualRef`, `heroStatsRef`, `heroGlowRef` managed here

**`src/components/ProjectsSection.tsx`** — `'use client'`
- Owns `projectCardsRef`, `projectsSectionRef`
- GSAP pin animation (desktop) and scroll timeline
- `data-projects-heading` attribute on heading for GSAP targeting
- Renders project cards from `projects` data (imported from cv.ts)

### Acceptance criteria
- All 8 client components created with `'use client'` directive
- `ScrollContext` exported from ScrollProvider
- `useScroll()` hook returns Lenis instance
- `npm run build` succeeds

---

## Task 4: Page assembly and cleanup

### What to do

**Implement `app/page.tsx`** as a proper Server Component:

```tsx
import ScrollProvider from '@/components/ScrollProvider'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ExperienceSection from '@/components/ExperienceSection'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import SkillsSection from '@/components/SkillsSection'
import EducationSection from '@/components/EducationSection'
import ContactSection from '@/components/ContactSection'
import ProgressBar from '@/components/ProgressBar'
import BackToTop from '@/components/BackToTop'
import SectionReveal from '@/components/SectionReveal'

export default function Page() {
  return (
    <ScrollProvider>
      {/* Skip link */}
      <a href="#top" className="sr-only focus:not-sr-only ...">Skip to main content</a>
      
      {/* Background gradient blobs (data-parallax, handled by ScrollProvider) */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-12%] top-[-8%] h-[28rem] w-[28rem] rounded-full bg-violet-500/18 blur-[120px]" data-parallax data-depth="0.18" />
        <div className="absolute right-[-10%] top-[18%] h-[26rem] w-[26rem] rounded-full bg-cyan-400/12 blur-[120px]" data-parallax data-depth="0.24" />
        <div className="absolute bottom-[-14%] left-[24%] h-[24rem] w-[24rem] rounded-full bg-fuchsia-500/10 blur-[140px]" data-parallax data-depth="0.14" />
      </div>

      <ProgressBar />
      <Header />

      <main id="top">
        <HeroSection />

        <SectionReveal id="about"><AboutSection /></SectionReveal>
        <SectionReveal id="experience"><ExperienceSection /></SectionReveal>
        <ProjectsSection /> {/* manages its own reveal + GSAP */}
        <SectionReveal id="skills"><SkillsSection /></SectionReveal>
        <SectionReveal id="education"><EducationSection /></SectionReveal>
        <SectionReveal id="contact"><ContactSection /></SectionReveal>
      </main>

      <BackToTop />
    </ScrollProvider>
  )
}
```

**Delete old Vite files:**
- `src/App.tsx`
- `src/main.tsx`
- `src/assets/react.svg`
- `src/assets/vite.svg`
- `public/favicon.svg` (optional — keep if desired as Next.js favicon goes in `app/favicon.ico` or `public/`)

**Update `playwright.config.ts`:**
- `webServer.command`: `"next start -p 4173"` (requires `next build` first, which `qa` script now does)
- `webServer.url`: keep `http://127.0.0.1:4173`

### Acceptance criteria
- `npm run build` completes without errors
- `npm run dev` serves the portfolio at localhost:3000
- All sections visible and styled correctly
- No Vite files remain

---

## Task 5: Verification and CLAUDE.md update

### What to do

1. Run `npm run build` — must pass with 0 errors
2. Run `npm run dev`, open browser, verify:
   - Hero section renders with HeroScene
   - All CV sections visible
   - Nav works (smooth scroll to sections)
   - Mobile menu works
   - Scroll animations work (parallax, reveal, hero parallax, projects pin)
   - Progress bar animates
   - Back to top shows after scrolling
3. Run `npm run qa` (build + Playwright) — update snapshots if needed: `npx playwright test --update-snapshots`
4. Update `CLAUDE.md` commands section:
   - `npm run dev` → Next.js dev server (port 3000)
   - `npm run build` → `next build`
   - `npm run start` → `next start`
   - `npm run qa` → `next build && playwright test`
   - Update snapshot update command

### Acceptance criteria
- `npm run build` green
- Visual check passes (all sections render, animations work)
- CLAUDE.md reflects new commands
