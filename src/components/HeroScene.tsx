type HeroSceneProps = {
  scrollY: number
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

export function HeroScene({ scrollY }: HeroSceneProps) {
  const normalizedScroll = Math.min(scrollY / 1600, 1)

  return (
    <div className="relative h-[340px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.22),transparent_30%),radial-gradient(circle_at_72%_62%,rgba(34,211,238,0.14),transparent_26%),linear-gradient(180deg,#05070d_0%,#0a0d16_45%,#09090d_100%)] md:h-[460px]">
      <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_30%,transparent_65%)]" />

      {rings.map((ring) => (
        <div
          key={ring.id}
          className="absolute rounded-full border"
          style={{
            width: ring.size,
            height: ring.size,
            top: ring.top,
            left: ring.left,
            borderColor: ring.border,
            transform: `translate3d(0, ${normalizedScroll * ring.factorY * 180}px, 0) rotate(${normalizedScroll * ring.rotate * 360}deg)`,
          }}
        />
      ))}

      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.22), ${orb.color} 38%, rgba(0,0,0,0) 74%)`,
            filter: `blur(${orb.blur}px)`,
            transform: `translate3d(${orb.baseX + normalizedScroll * orb.factorX * 280}px, ${orb.baseY + normalizedScroll * orb.factorY * 260}px, 0) rotate(${normalizedScroll * orb.rotate * 360}deg) scale(${1 + normalizedScroll * 0.08})`,
          }}
        />
      ))}

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            top: particle.top,
            left: particle.left,
            background: particle.color,
            boxShadow: `0 0 22px ${particle.color}`,
            transform: `translate3d(${normalizedScroll * particle.factorX * 220}px, ${normalizedScroll * particle.factorY * -260}px, 0)`,
          }}
        />
      ))}

      <div
        className="absolute left-[14%] top-[18%] h-40 w-40 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
        style={{ transform: `translate3d(${normalizedScroll * 22}px, ${normalizedScroll * -30}px, 0) rotate(${normalizedScroll * 18}deg)` }}
      />
      <div
        className="absolute bottom-[18%] right-[12%] h-28 w-28 rounded-[1.75rem] border border-white/10 bg-white/[0.06] backdrop-blur-sm"
        style={{ transform: `translate3d(${normalizedScroll * -26}px, ${normalizedScroll * 20}px, 0) rotate(${normalizedScroll * -24}deg)` }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#09090d] via-[#09090d]/70 to-transparent" />
    </div>
  )
}
