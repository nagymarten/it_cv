'use client'
import { useEffect, useRef, useState } from 'react'
import { useScroll } from '@/context/ScrollContext'
import { navItems, contact } from '@/data/cv'

export default function Header() {
  const lenis = useScroll()
  const [activeSection, setActiveSection] = useState('#about')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Scroll-based header blur
  useEffect(() => {
    if (!lenis) return
    const handler = ({ scroll }: { scroll: number }) => {
      const el = headerRef.current
      if (!el) return
      const scrolled = scroll > 20
      el.classList.toggle('border-white/10', scrolled)
      el.classList.toggle('bg-[rgba(10,10,15,0.82)]', scrolled)
      el.classList.toggle('shadow-[0_10px_40px_rgba(0,0,0,0.18)]', scrolled)
      el.classList.toggle('border-white/5', !scrolled)
      el.classList.toggle('bg-[rgba(10,10,15,0.58)]', !scrolled)
    }
    lenis.on('scroll', handler)
    return () => { lenis.off('scroll', handler) }
  }, [lenis])

  // Active section tracking
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) {
          setActiveSection(`#${visible.target.id}`)
        }
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: '-20% 0px -20% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-20 border-b border-white/5 bg-[rgba(10,10,15,0.58)] px-4 py-4 backdrop-blur-xl transition-all duration-300 supports-[padding:env(safe-area-inset-top)]:pt-[env(safe-area-inset-top)] md:px-8"
    >
      <div className="flex items-center justify-between gap-4">
        <a className="text-sm uppercase tracking-[0.18em] text-white" href="#top">
          Martin Nagy
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <span className="text-lg leading-none">{mobileMenuOpen ? '×' : '☰'}</span>
        </button>

        <nav aria-label="Primary navigation" className="hidden items-center justify-center gap-5 text-sm text-slate-300 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.href
            return (
              <a
                key={item.href}
                className={`rounded-full px-3 py-2 transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 ${
                  isActive ? 'bg-white/8 text-white' : 'hover:text-white'
                }`}
                href={item.href}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <a
          className="hidden min-h-12 items-center justify-center rounded-full border border-violet-300/35 bg-violet-400/10 px-4 py-3 text-sm text-slate-100 transition hover:bg-violet-400/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 md:inline-flex"
          href={`mailto:${contact.email}`}
        >
          Let&apos;s talk
        </a>
      </div>

      {mobileMenuOpen && (
        <div className="mt-4 grid gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-4 md:hidden">
          {navItems.map((item) => {
            const isActive = activeSection === item.href
            return (
              <a
                key={item.href}
                className={`rounded-2xl px-4 py-3 text-sm transition ${isActive ? 'bg-white/8 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            )
          })}
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-violet-300/35 bg-violet-400/10 px-4 py-3 text-sm text-slate-100 transition hover:bg-violet-400/20"
            href={`mailto:${contact.email}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Let&apos;s talk
          </a>
        </div>
      )}
    </header>
  )
}
