"use client"

import { createContext, useContext, useState } from "react"

type TransitionContextType = {
  startTransition: (href: string) => string
  isTransitioning: boolean
}

const TransitionContext = createContext<TransitionContextType | null>(null)

export function usePageTransition() {
  const ctx = useContext(TransitionContext)
  if (!ctx) throw new Error("usePageTransition must be used within TransitionProvider")
  return ctx
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const startTransition = (href: string): string => {
    setIsTransitioning(true)
    return href // ✅ Now returns a string, not void
  }

  return (
    <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
      {children}
    </TransitionContext.Provider>
  )
}
