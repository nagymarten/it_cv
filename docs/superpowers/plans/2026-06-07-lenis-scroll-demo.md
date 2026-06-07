# Lenis Scroll Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 5-section scroll animation demo page using Lenis + GSAP ScrollTrigger with a black minimal monospace aesthetic.

**Architecture:** Each section is a self-contained `'use client'` React component with its own `useRef` + `useEffect` + `gsap.context()` animation setup. `app/page.tsx` is a Server Component that assembles all five sections. The existing `SmoothScroll` wrapper (Lenis + GSAP ticker) in `app/layout.tsx` is untouched.

**Tech Stack:** Next.js 16 App Router, Chakra UI v3, GSAP 3 + ScrollTrigger, Lenis 1.3, TypeScript

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `src/components/sections/HeroSection.tsx` | Create | 100vh hero, headline stagger + parallax scrub |
| `src/components/sections/IntroSection.tsx` | Create | 60vh intro, 3 paragraphs stagger fade-in |
| `src/components/sections/GridSection.tsx` | Create | 80vh grid, 6 cards ScrollTrigger.batch stagger |
| `src/components/sections/QuoteSection.tsx` | Create | 50vh quote, word-by-word reveal |
| `src/components/sections/ClosingSection.tsx` | Create | 100vh closing, top-down entry + CSS cursor blink |
| `app/page.tsx` | Modify | Assemble all 5 sections |

> **Note on testing:** This project uses Playwright E2E snapshot tests (`tests/qa/site.spec.ts`). After implementing all sections, existing snapshots will need updating: `npx playwright test --update-snapshots`. No new test files are needed.

---

### Task 1: HeroSection

**Files:**
- Create: `src/components/sections/HeroSection.tsx`

**What it does:** Full-screen (100vh) hero with a large monospace headline split into words. Words stagger in from below on mount. The headline has a subtle parallax scrub effect as the user scrolls down. A pulsing scroll indicator (`SCROLL ↓`) sits at the bottom.

- [ ] **Step 1: Create `src/components/sections/HeroSection.tsx`**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { Box, Text } from '@chakra-ui/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet.']

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word stagger entrance
      gsap.from('.hero-word', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
      })

      // Parallax scrub on headline
      gsap.to('.hero-headline', {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Scroll indicator fade out on scroll
      gsap.to('.scroll-indicator', {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '20% top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Box
      as="section"
      ref={sectionRef}
      minH="100vh"
      bg="black"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      <Box className="hero-headline" textAlign="center" px={8}>
        <Text
          as="h1"
          fontFamily="mono"
          fontWeight="800"
          color="white"
          lineHeight="1.1"
          letterSpacing="-0.03em"
          fontSize="clamp(3rem, 8vw, 7rem)"
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={{ base: '0.3em', md: '0.4em' }}
        >
          {HEADLINE.map((word, i) => (
            <Box key={i} as="span" className="hero-word" display="inline-block">
              {word}
            </Box>
          ))}
        </Text>
      </Box>

      {/* Scroll indicator */}
      <Box
        className="scroll-indicator"
        position="absolute"
        bottom="40px"
        left="50%"
        transform="translateX(-50%)"
        textAlign="center"
      >
        <Text
          fontFamily="mono"
          fontSize="11px"
          letterSpacing="0.2em"
          color="#555"
          css={{
            animation: 'pulse-opacity 2s ease-in-out infinite',
            '@keyframes pulse-opacity': {
              '0%, 100%': { opacity: 0.4 },
              '50%': { opacity: 1 },
            },
          }}
        >
          SCROLL ↓
        </Text>
      </Box>
    </Box>
  )
}
```

- [ ] **Step 2: Start the dev server and verify HeroSection renders**

```bash
npm run dev
```

Open http://localhost:3000. Verify:
- Black background fills screen
- "Lorem ipsum dolor sit amet." headline appears (words may flash in — that's the animation)
- "SCROLL ↓" text pulses at the bottom

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "feat: add HeroSection with word stagger and parallax scrub"
```

---

### Task 2: IntroSection

**Files:**
- Create: `src/components/sections/IntroSection.tsx`

**What it does:** 60vh section with a section label (`01 / INTRO`) and 3 lorem ipsum paragraphs that each fade in from below on scroll, triggered individually with 150ms stagger delay between them.

- [ ] **Step 1: Create `src/components/sections/IntroSection.tsx`**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { Box, Container, Text, VStack } from '@chakra-ui/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PARAGRAPHS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error.',
]

export default function IntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.intro-para').forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: i * 0.15,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Box
      as="section"
      ref={sectionRef}
      minH="60vh"
      bg="black"
      display="flex"
      alignItems="center"
      py={20}
    >
      <Container maxW="2xl" px={{ base: 6, md: 12 }}>
        <VStack align="flex-start" gap={8}>
          <Text
            fontFamily="mono"
            fontSize="11px"
            letterSpacing="0.25em"
            color="#444"
          >
            01 / INTRO
          </Text>

          {PARAGRAPHS.map((text, i) => (
            <Text
              key={i}
              className="intro-para"
              fontFamily="mono"
              fontSize={{ base: 'sm', md: 'md' }}
              color="#999"
              lineHeight="1.9"
            >
              {text}
            </Text>
          ))}
        </VStack>
      </Container>
    </Box>
  )
}
```

- [ ] **Step 2: Wire into `app/page.tsx` temporarily and verify**

Add just these two sections to `app/page.tsx` to verify scroll-triggered animation:

```tsx
import HeroSection from '@/components/sections/HeroSection'
import IntroSection from '@/components/sections/IntroSection'

export default function Page() {
  return (
    <main id="top" style={{ paddingTop: '64px' }}>
      <HeroSection />
      <IntroSection />
    </main>
  )
}
```

Scroll down past the hero — the 3 paragraphs should fade in from below one after another.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/IntroSection.tsx app/page.tsx
git commit -m "feat: add IntroSection with staggered paragraph fade-in"
```

---

### Task 3: GridSection

**Files:**
- Create: `src/components/sections/GridSection.tsx`

**What it does:** 80vh section with a 2×3 grid (desktop) / 1-column (mobile) of 6 cards. Cards use `ScrollTrigger.batch()` so they animate in as a group with 80ms stagger, left to right. Each card has a number, title, and one-line description, with a `1px solid #222` border.

- [ ] **Step 1: Create `src/components/sections/GridSection.tsx`**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { Box, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  { num: '01', title: 'Lorem ipsum', desc: 'Consectetur adipiscing elit, sed do eiusmod.' },
  { num: '02', title: 'Dolor sit amet', desc: 'Ut labore et dolore magna aliqua enim.' },
  { num: '03', title: 'Consectetur elit', desc: 'Quis nostrud exercitation ullamco laboris.' },
  { num: '04', title: 'Sed do eiusmod', desc: 'Nisi ut aliquip ex ea commodo consequat.' },
  { num: '05', title: 'Tempor incididunt', desc: 'Duis aute irure dolor in reprehenderit.' },
  { num: '06', title: 'Ut labore dolore', desc: 'Excepteur sint occaecat cupidatat non.' },
]

export default function GridSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch('.grid-card', {
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 50,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.08,
          }),
        start: 'top 88%',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Box
      as="section"
      ref={sectionRef}
      minH="80vh"
      bg="black"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      py={20}
      px={{ base: 6, md: 16 }}
    >
      <Text
        fontFamily="mono"
        fontSize="11px"
        letterSpacing="0.25em"
        color="#444"
        mb={12}
      >
        02 / WORKS
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: 4, md: 6 }}>
        {CARDS.map((card) => (
          <Box
            key={card.num}
            className="grid-card"
            border="1px solid"
            borderColor="#222"
            p={6}
            _hover={{ borderColor: '#444' }}
            transition="border-color 0.2s"
          >
            <VStack align="flex-start" gap={3}>
              <Text fontFamily="mono" fontSize="10px" color="#444" letterSpacing="0.2em">
                {card.num}
              </Text>
              <Text fontFamily="mono" fontSize="sm" color="white" fontWeight="600">
                {card.title}
              </Text>
              <Text fontFamily="mono" fontSize="xs" color="#666" lineHeight="1.7">
                {card.desc}
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx` and verify**

```tsx
import HeroSection from '@/components/sections/HeroSection'
import IntroSection from '@/components/sections/IntroSection'
import GridSection from '@/components/sections/GridSection'

export default function Page() {
  return (
    <main id="top" style={{ paddingTop: '64px' }}>
      <HeroSection />
      <IntroSection />
      <GridSection />
    </main>
  )
}
```

Scroll to the grid — cards should stagger in from below as a batch.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/GridSection.tsx app/page.tsx
git commit -m "feat: add GridSection with ScrollTrigger.batch card stagger"
```

---

### Task 4: QuoteSection

**Files:**
- Create: `src/components/sections/QuoteSection.tsx`

**What it does:** 50vh centered section with a single large quote split into individual word `<span>` elements. On scroll, the quote scales from 0.95→1 and each word fades in with a 0.05s stagger. Thin `1px solid #222` dividers above and below.

- [ ] **Step 1: Create `src/components/sections/QuoteSection.tsx`**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { Box, Text } from '@chakra-ui/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const QUOTE = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip.'
const WORDS = QUOTE.split(' ')

export default function QuoteSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.quote-word')

      gsap.from(sectionRef.current, {
        scale: 0.95,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from(words, {
        opacity: 0,
        y: 15,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Box
      as="section"
      ref={sectionRef}
      minH="50vh"
      bg="black"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={{ base: 8, md: 20 }}
    >
      <Box w="full" h="1px" bg="#1a1a1a" mb={16} />

      <Text
        as="blockquote"
        fontFamily="mono"
        fontSize={{ base: 'lg', md: '2xl', lg: '3xl' }}
        color="white"
        fontWeight="700"
        lineHeight="1.4"
        textAlign="center"
        maxW="4xl"
        letterSpacing="-0.02em"
      >
        {WORDS.map((word, i) => (
          <Box
            key={i}
            as="span"
            className="quote-word"
            display="inline-block"
            mr="0.3em"
          >
            {word}
          </Box>
        ))}
      </Text>

      <Box w="full" h="1px" bg="#1a1a1a" mt={16} />
    </Box>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx` and verify**

```tsx
import HeroSection from '@/components/sections/HeroSection'
import IntroSection from '@/components/sections/IntroSection'
import GridSection from '@/components/sections/GridSection'
import QuoteSection from '@/components/sections/QuoteSection'

export default function Page() {
  return (
    <main id="top" style={{ paddingTop: '64px' }}>
      <HeroSection />
      <IntroSection />
      <GridSection />
      <QuoteSection />
    </main>
  )
}
```

Scroll to the quote — words should fan in one by one with a slight scale-up on the section.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/QuoteSection.tsx app/page.tsx
git commit -m "feat: add QuoteSection with word-by-word scroll reveal"
```

---

### Task 5: ClosingSection

**Files:**
- Create: `src/components/sections/ClosingSection.tsx`

**What it does:** 100vh full-screen closing section. Text (`— fin.`) drops in from above (`y: -40 → 0`). A CSS-animated blinking cursor (`|`) follows the text. The section is the final visual anchor of the page.

- [ ] **Step 1: Create `src/components/sections/ClosingSection.tsx`**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { Box, Text } from '@chakra-ui/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ClosingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.closing-text', {
        y: -40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Box
      as="section"
      ref={sectionRef}
      minH="100vh"
      bg="black"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text
        className="closing-text"
        fontFamily="mono"
        fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
        fontWeight="800"
        color="white"
        letterSpacing="-0.03em"
        display="inline-flex"
        alignItems="baseline"
        gap={1}
      >
        — fin.
        <Box
          as="span"
          display="inline-block"
          w="3px"
          h={{ base: '2rem', md: '3rem' }}
          bg="white"
          ml={2}
          css={{
            animation: 'blink 1.1s step-end infinite',
            '@keyframes blink': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0 },
            },
          }}
        />
      </Text>
    </Box>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx` and verify**

```tsx
import HeroSection from '@/components/sections/HeroSection'
import IntroSection from '@/components/sections/IntroSection'
import GridSection from '@/components/sections/GridSection'
import QuoteSection from '@/components/sections/QuoteSection'
import ClosingSection from '@/components/sections/ClosingSection'

export default function Page() {
  return (
    <main id="top" style={{ paddingTop: '64px' }}>
      <HeroSection />
      <IntroSection />
      <GridSection />
      <QuoteSection />
      <ClosingSection />
    </main>
  )
}
```

Scroll to the bottom — `— fin.` should drop in from above, cursor blinking.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ClosingSection.tsx app/page.tsx
git commit -m "feat: add ClosingSection with top-drop animation and cursor blink"
```

---

### Task 6: Final page assembly + TypeScript check

**Files:**
- Modify: `app/page.tsx` — ensure final version with all 5 sections
- Run TypeScript compiler to confirm no type errors

- [ ] **Step 1: Ensure `app/page.tsx` has all 5 sections**

```tsx
import HeroSection from '@/components/sections/HeroSection'
import IntroSection from '@/components/sections/IntroSection'
import GridSection from '@/components/sections/GridSection'
import QuoteSection from '@/components/sections/QuoteSection'
import ClosingSection from '@/components/sections/ClosingSection'

export default function Page() {
  return (
    <main id="top" style={{ paddingTop: '64px' }}>
      <HeroSection />
      <IntroSection />
      <GridSection />
      <QuoteSection />
      <ClosingSection />
    </main>
  )
}
```

- [ ] **Step 2: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no output (zero errors). If errors appear, fix them before continuing.

- [ ] **Step 3: Run build to confirm production build passes**

```bash
npm run build
```

Expected: `✓ Compiled successfully` with no type or lint errors.

- [ ] **Step 4: Note on Playwright snapshots**

Existing Playwright snapshot tests (`tests/qa/site.spec.ts`) will fail because the page now has content. After verifying the visual output manually, update snapshots:

```bash
npx playwright test --update-snapshots
```

- [ ] **Step 5: Final commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble all 5 Lenis scroll demo sections in page.tsx"
```
