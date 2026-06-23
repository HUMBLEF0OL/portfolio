'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

type CountUpProps = {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  durationMs?: number
  className?: string
}

/** Animated count-up that fires once when scrolled into view. Honors reduced motion. */
export function CountUp({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  durationMs = 1100,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  // Seed with the FINAL value so SSR / no-JS / crawlers see the real number;
  // the count-from-zero animation only kicks in after mount, in view.
  const [display, setDisplay] = useState(() => prefix + value.toFixed(decimals) + suffix)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const final = prefix + value.toFixed(decimals) + suffix

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(final)
      return
    }

    const run = () => {
      if (started.current) return
      started.current = true
      setDisplay(prefix + (0).toFixed(decimals) + suffix)
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / durationMs)
        const eased = 1 - Math.pow(1 - p, 3)
        setDisplay(prefix + (value * eased).toFixed(decimals) + suffix)
        if (p < 1) requestAnimationFrame(tick)
        else setDisplay(final)
      }
      requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run()
            io.disconnect()
          }
        })
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.01 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, prefix, suffix, decimals, durationMs])

  return (
    <span ref={ref} className={cn('font-numeric tabular-nums', className)}>
      {display}
    </span>
  )
}
