# Martin Nagy — Portfolio CV

Personal portfolio and CV site built with Next.js 16 App Router, deployed on Vercel.

## Stack

- **Next.js 16** — App Router, static generation
- **React 19** — Server Components + Client Components
- **TypeScript** — strict mode
- **Tailwind CSS v4** — via PostCSS
- **GSAP + ScrollTrigger** — scroll animations
- **Lenis** — smooth scroll (GSAP ticker integration)
- **Playwright** — visual regression tests

## Commands

```bash
npm run dev      # Dev server (port 3000, Turbopack)
npm run build    # Static build
npm run start    # Serve built output
npm run lint     # ESLint
npm run qa       # Build + Playwright tests
```

## Architecture

CV content lives in `src/data/cv.ts`. `app/page.tsx` is a Server Component — all text renders as static HTML at build time. Animations and interactivity are isolated in `'use client'` components (`ScrollProvider`, `Header`, `HeroSection`, `ProjectsSection`, etc.).

See `CLAUDE.md` for full architecture details.
