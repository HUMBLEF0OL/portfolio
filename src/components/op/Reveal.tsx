'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** Reveal delay in ms (staggering). */
  delay?: number
  /** Initial upward offset in px. */
  rise?: number
  className?: string
  as?: ElementType
}

/**
 * Scroll-reveal wrapper: fades + rises into view via IntersectionObserver.
 * Respects prefers-reduced-motion (renders visible immediately) and reveals
 * above-the-fold content without animation jank.
 */
export function Reveal({
  children,
  delay = 0,
  rise = 14,
  className,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true)
            io.disconnect()
          }
        })
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.01 }
    )
    io.observe(el)
    // Safety fallback: never leave content invisible if the observer is slow
    // to fire or never does (degraded environments, headless capture).
    const safety = setTimeout(() => setShown(true), 1200)
    return () => {
      io.disconnect()
      clearTimeout(safety)
    }
  }, [])

  return (
    <Tag
      ref={ref}
      className={cn(
        'transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
        className
      )}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateY(${rise}px)`,
        transitionDelay: shown ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </Tag>
  )
}
