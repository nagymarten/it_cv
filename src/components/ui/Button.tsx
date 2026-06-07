import { type ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href: string
  variant?: 'primary' | 'ghost'
  className?: string
  onClick?: () => void
}

export function Button({ children, href, variant = 'primary', className = '', onClick }: ButtonProps) {
  const base = 'inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400'
  const variants = {
    primary: 'bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow-[0_10px_30px_rgba(109,93,252,0.28)]',
    ghost: 'border border-white/15 bg-white/5 text-slate-100',
  }
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </a>
  )
}
