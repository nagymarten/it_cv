'use client'
import { useEffect, useRef } from 'react'

type HeroSceneProps = {
  scrollYRef: { current: number }
}

const orbs = [
  {
    id: 'violet-core',
    size: 220,
    top: '10%',
    left: '12%',
    color: 'rgba(139, 92, 246, 0.34)',
    blur: 16,
    baseX: 0,
    baseY: 0,
    factorX: 0.04,
    factorY: -0.1,
    rotate: 0.06,
  },
  {
    id: 'cyan-orb',
    size: 150,
    top: '48%',
    left: '62%',
    color: 'rgba(34, 211, 238, 0.24)',
    blur: 10,
    baseX: 0,
    baseY: 0,
    factorX: -0.03,
    factorY: 0.08,
    rotate: -0.05,
  },
  {
    id: 'indigo-orb',
    size: 110,
    top: '18%',
    left: '68%',
    color: 'rgba(99, 102, 241, 0.22)',
    blur: 8,
    baseX: 0,
    baseY: 0,
    factorX: 0.02,
    factorY: 0.05,
    rotate: 0.08,
  },
]

const rings = [
  {
    id: 'ring-a',
    size: 320,
    top: '2%',
    left: '38%',
    border: 'rgba(196, 181, 253, 0.28)',
    factorY: -0.06,
    rotate: 0.035,
  },
  {
    id: 'ring-b',
    size: 220,
    top: '38%',
    left: '6%',
    border: 'rgba(103, 232, 249, 0.18)',
    factorY: 0.04,
    rotate: -0.04,
  },
]

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: `particle-${index}`,
  size: 5 + (index % 4) * 3,
  top: `${12 + ((index * 17) % 68)}%`,
  left: `${6 + ((index * 11) % 86)}%`,
  color: index % 2 === 0 ? 'rgba(196, 181, 253, 0.55)' : 'rgba(103, 232, 249, 0.45)',
  factorY: (index % 5) * 0.015 + 0.015,
  factorX: (index % 3) * 0.01,
}))

export function HeroScene({ scrollYRef }: HeroSceneProps) {
  const ringsRef = useRef<(HTMLDivElement | null)[]>([])
  const orbsRef = useRef<(HTMLDivElement | null)[]>([])
  const particlesRef = useRef<(HTMLDivElement | null)[]>([])
  const floatBoxRef = useRef<HTMLDivElement | null>(null)
  const tiltBoxRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let rafId: number
    const tick = () => {
      const n = Math.min(scrollYRef.current / 1600, 1)

      ringsRef.current.forEach((el, i) => {
        if (!el) return
        const ring = rings[i]
        el.style.transform = `translate3d(0, ${n * ring.factorY * 320}px, 0) rotate(${n * ring.rotate * 720}deg)`
      })

      orbsRef.current.forEach((el, i) => {
        if (!el) return
        const orb = orbs[i]
        el.style.transform = `translate3d(${orb.baseX + n * orb.factorX * 520}px, ${orb.baseY + n * orb.factorY * 420}px, 0) rotate(${n * orb.rotate * 720}deg) scale(${1 + n * 0.14})`
      })

      particlesRef.current.forEach((el, i) => {
        if (!el) return
        const p = particles[i]
        el.style.transform = `translate3d(${n * p.factorX * 420}px, ${n * p.factorY * -460}px, 0)`
      })

      if (floatBoxRef.current) {
        floatBoxRef.current.style.transform = `translate3d(${n * 46}px, ${n * -72}px, 0) rotate(${n * 32}deg)`
      }
      if (tiltBoxRef.current) {
        tiltBoxRef.current.style.transform = `translate3d(${n * -58}px, ${n * 44}px, 0) rotate(${n * -38}deg)`
      }

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [scrollYRef])

  return (
    <div aria-hidden="true" className="relative h-[340px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.22),transparent_30%),radial-gradient(circle_at_72%_62%,rgba(34,211,238,0.14),transparent_26%),linear-gradient(180deg,#05070d_0%,#0a0d16_45%,#09090d_100%)] md:h-[460px]">
      <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_30%,transparent_65%)]" />

      {rings.map((ring, i) => (
        <div
          key={ring.id}
          ref={(el) => { ringsRef.current[i] = el }}
          className="absolute rounded-full border"
          style={{
            width: ring.size,
            height: ring.size,
            top: ring.top,
            left: ring.left,
            borderColor: ring.border,
          }}
        />
      ))}

      {orbs.map((orb, i) => (
        <div
          key={orb.id}
          ref={(el) => { orbsRef.current[i] = el }}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.22), ${orb.color} 38%, rgba(0,0,0,0) 74%)`,
            filter: `blur(${orb.blur}px)`,
          }}
        />
      ))}

      {particles.map((particle, i) => (
        <div
          key={particle.id}
          ref={(el) => { particlesRef.current[i] = el }}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            top: particle.top,
            left: particle.left,
            background: particle.color,
            boxShadow: `0 0 22px ${particle.color}`,
          }}
        />
      ))}

      <div
        ref={floatBoxRef}
        className="absolute left-[14%] top-[18%] h-40 w-40 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
      />
      <div
        ref={tiltBoxRef}
        className="absolute bottom-[18%] right-[12%] h-28 w-28 rounded-[1.75rem] border border-white/10 bg-white/[0.06] backdrop-blur-sm"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#09090d] via-[#09090d]/70 to-transparent" />
    </div>
  )
}
