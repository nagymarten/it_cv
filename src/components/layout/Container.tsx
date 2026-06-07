import { type ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`mx-auto w-[min(1120px,calc(100%-1rem))] md:w-[min(1120px,calc(100%-2rem))] ${className}`}>
      {children}
    </div>
  )
}
