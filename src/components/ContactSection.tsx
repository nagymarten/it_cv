import { sectionLabelClass, cardClass, revealBaseClass, contact } from '@/data/cv'

export default function ContactSection() {
  return (
    <section className="scroll-mt-28">
      <div className={`${cardClass} ${revealBaseClass} mx-auto mb-10 w-[min(1120px,calc(100%-1rem))] overflow-hidden p-6 pb-8 md:w-[min(1120px,calc(100%-2rem))] md:p-8 md:pb-10`}>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
        <p className={sectionLabelClass}>Contact</p>
        <h2 className="mt-3 text-4xl font-semibold text-white">Let&apos;s build something solid and thoughtful.</h2>
        <p className="mt-3 max-w-4xl text-slate-300">
          Available for frontend and full stack opportunities, product-focused collaboration, and modern web projects.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <a
            className="flex min-h-14 items-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-slate-200 transition hover:border-violet-300/35 hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 touch-manipulation"
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </a>
          <a
            className="flex min-h-14 items-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-slate-200 transition hover:border-violet-300/35 hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 touch-manipulation"
            href={`tel:${contact.phone.replace(/\s+/g, '')}`}
          >
            {contact.phone}
          </a>
          <span className="flex min-h-14 items-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
            {contact.linkedin}
          </span>
          <span className="flex min-h-14 items-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
            {contact.github}
          </span>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(109,93,252,0.28)] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
            href={`mailto:${contact.email}`}
          >
            Start a conversation
          </a>
        </div>
      </div>
    </section>
  )
}
