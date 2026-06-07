import { sectionLabelClass, revealBaseClass, profile } from '@/data/cv'

export default function AboutSection() {
  return (
    <section className="scroll-mt-28">
      <div className={`mx-auto grid w-[min(1120px,calc(100%-1rem))] gap-8 py-16 md:w-[min(1120px,calc(100%-2rem))] lg:grid-cols-[0.9fr_1.1fr] ${revealBaseClass}`}>
        <div data-parallax data-depth="0.08">
          <p className={sectionLabelClass}>About</p>
          <h2 className="text-4xl font-semibold text-white">{profile.name}</h2>
        </div>
        <div className="grid gap-5 text-slate-300" data-parallax data-depth="0.12">
          <p>{profile.summary}</p>
          <p>
            I enjoy translating complex product requirements into clean user-facing experiences, with a strong focus on maintainability, clarity, and dependable delivery.
          </p>
        </div>
      </div>
    </section>
  )
}
