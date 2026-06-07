# Lenis Scroll Animáció Demo — Design Spec

**Dátum:** 2026-06-07  
**Státusz:** Jóváhagyott  

---

## Összefoglalás

Egy vizuálisan lenyűgöző scroll-animáció demo oldal az `app/page.tsx`-be, amely bemutatja a már meglévő Lenis + GSAP ScrollTrigger stack képességeit. Lorem ipsum tartalommal, fekete minimál monospace stílusban, 5 vegyes magasságú szekción keresztül.

---

## Döntések

| Kérdés | Választás |
|---|---|
| Animáció stílus | Parallax + Fade-in (y: 60→0, opacity: 0→1) |
| Vizuális hangulat | Fekete minimál mono (fekete alap, monospace font, fehér/szürke árnyalatok, nulla szín) |
| Szekció struktúra | 5 vegyes magasságú szekció |
| Implementáció | Önálló section komponensek, saját useEffect + GSAP per szekció |

---

## Fájlstruktúra

```
app/page.tsx                          ← Server Component, összefogja a szekciókat
src/components/sections/
  HeroSection.tsx                     ← 100vh
  IntroSection.tsx                    ← 60vh
  GridSection.tsx                     ← 80vh
  QuoteSection.tsx                    ← 50vh
  ClosingSection.tsx                  ← 100vh
```

A `SmoothScroll` wrapper és a Lenis/GSAP setup érintetlen marad (`app/layout.tsx`, `src/components/SmoothScroll.tsx`).

---

## Szekciók részletesen

### 1. HeroSection (100vh)

- Teljes képernyős, fekete háttér, középre igazított tartalom
- Nagy monospace headline (pl. `clamp(3rem, 8vw, 7rem)`), fehér szín
- Animáció: a headline betűi/szavai egyenként úsznak be alulról stagger-rel (`gsap.from` + `stagger: 0.04`)
- Parallax: a headline `y` pozíciója scroll progresshez kötve lassan feljebb csúszik (`scrub: 1`), miközben a szekció kicsúszik a viewportból
- Scroll indicator: animált lefelé mutató nyíl/szöveg (`SCROLL ↓`), CSS opacity pulsálással
- Lorem ipsum tartalom: `"Lorem ipsum / dolor sit amet."`

### 2. IntroSection (60vh)

- Fekete háttér, bal-igazított, max-width container
- 3 bekezdés lorem ipsum szöveg
- Animáció: minden bekezdés önálló `ScrollTrigger`, alulról fade-in, 150ms egymás utáni késéssel
- Kis monospace section label felül: `"01 / INTRO"`

### 3. GridSection (80vh)

- 2×3 grid (desktop) / 1 oszlop (mobile), 6 kártya
- Minden kártya: szám + rövid lorem ipsum cím + 1 soros leírás
- Animáció: `ScrollTrigger.batch()` — kártyák csoportosan, bal→jobb sorrendben jelennek meg, 80ms stagger
- Kártyák stílusa: vékony border (`1px solid #222`), belső padding, monospace font

### 4. QuoteSection (50vh)

- Teljes szélesség, vertikálisan és vízszintesen középre igazított
- Egyetlen nagy idézet lorem ipsum szöveg (pl. `"Ut enim ad minim veniam, quis nostrud exercitation."`)
- Animáció: `scale: 0.95 → 1` + `opacity: 0 → 1`, word-by-word stagger (`gsap.from` minden `<span>`-ra)
- Finom elválasztó vonal (`<hr style="border-color: #222">`) felette és alatta

### 5. ClosingSection (100vh)

- Teljes képernyős, középre igazított záró szöveg
- Monospace "cursor" effekt: CSS animált `|` karakter a szöveg végén (blink)
- Animáció: szöveg felülről esik be (`y: -40 → 0`) + `opacity: 0 → 1`
- Tartalom: `"— fin."` vagy hasonló minimál záró

---

## Technikai részletek

### Animáció pattern (minden szekciónál)

```tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function XxxSection() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // gsap.from(...) animációk itt
    }, ref)
    return () => ctx.revert()
  }, [])

  return <section ref={ref}>...</section>
}
```

A `gsap.context()` + `ctx.revert()` biztosítja a helyes cleanup-ot React Strict Mode alatt is.

### Chakra UI

- Layout primitívek: `Box`, `Container`, `VStack`, `SimpleGrid`, `Text`
- Semantic tokenek ahol releváns (`bg="black"`, `color="white"`)
- Monospace font: Chakra `fontFamily="mono"` prop

### Meglévő infrastruktúra (nem változik)

- `SmoothScroll.tsx` — Lenis init + GSAP ticker összekapcsolása
- `app/layout.tsx` — `SmoothScroll` + `Provider` + `Header` wrapper
- `src/data/cv.ts` — érintetlen

---

## Hatáskör

**Benne van:**
- `app/page.tsx` frissítése (5 szekció összefűzése)
- 5 új section komponens `src/components/sections/` alatt
- Lorem ipsum tartalom (statikus string literálok, nem külső adat)

**Nincs benne:**
- `SmoothScroll.tsx` módosítása
- Valódi CV adat bekötése
- Tesztek frissítése (Playwright snapshot-ok manuálisan frissítendők: `npx playwright test --update-snapshots`)
