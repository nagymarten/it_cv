import { type ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  className?: string
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span className={`rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 ${className}`}>
      {children}
    </span>
  )
}
