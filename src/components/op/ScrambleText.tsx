'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/<>[]{}'

/** Text that scrambles into its final value on mount and on hover. */
export function ScrambleText({
  text,
  className,
  startDelay = 520,
}: {
  text: string
  className?: string
  startDelay?: number
}) {
  const [out, setOut] = useState(text)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const scramble = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOut(text)
      return
    }
    let frame = 0
    const total = text.length
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(() => {
      const revealed = Math.floor(frame / 2)
      const next = text
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' '
          if (i < revealed) return ch
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join('')
      setOut(next)
      frame++
      if (revealed >= total) {
        setOut(text)
        if (timer.current) clearInterval(timer.current)
      }
    }, 40)
  }

  useEffect(() => {
    const id = setTimeout(scramble, startDelay)
    return () => {
      clearTimeout(id)
      if (timer.current) clearInterval(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <span onMouseEnter={scramble} className={cn(className)}>
      {out}
    </span>
  )
}
