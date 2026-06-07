'use client'
import { createContext, useContext } from 'react'
import type Lenis from 'lenis'

export const ScrollContext = createContext<Lenis | null>(null)

export function useScroll(): Lenis | null {
  return useContext(ScrollContext)
}
