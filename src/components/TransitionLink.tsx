"use client"

import { useRouter } from "next/navigation"
import { usePageTransition } from "./TransitionProvider"
import type { AnchorHTMLAttributes, ReactNode } from "react"

interface TransitionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
}

export function TransitionLink({ href, children, onClick, ...rest }: TransitionLinkProps) {
  const router = useRouter()
  const { startTransition } = usePageTransition()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    startTransition(href)

    // allow parent-provided onClick (e.g., to close mobile menu)
    if (onClick) onClick(e)

    setTimeout(() => {
      router.push(href)
    }, 500) // match inDuration
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
