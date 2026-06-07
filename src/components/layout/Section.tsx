import { type ReactNode } from 'react'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  /** Extra attributes forwarded to <section> (e.g. ref, data-nav-section) */
  [key: string]: unknown
}

export function Section({ id, children, className = '', ...rest }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 ${className}`} {...rest}>
      {children}
    </section>
  )
}
