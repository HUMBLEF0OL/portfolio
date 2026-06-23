'use client'

import { cn } from '@/lib/utils'
import { useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'

type GlitchTextProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  as?: ElementType
}

/** RGB-split glitch burst on hover. No-op under reduced motion. */
export function GlitchText({ children, className, style, as: Tag = 'span' }: GlitchTextProps) {
  const ref = useRef<HTMLElement | null>(null)

  const onEnter = () => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let i = 0
    const id = setInterval(() => {
      if (i >= 7) {
        clearInterval(id)
        el.style.textShadow = 'none'
        el.style.transform = 'none'
        return
      }
      const x = Math.floor(Math.random() * 4)
      const y = Math.floor(Math.random() * 4)
      const tx = Math.floor(Math.random() * 7) - 3
      el.style.textShadow = `-${x}px 0 #FF2A6D, ${y}px 0 #00E5FF`
      el.style.transform = `translateX(${tx}px)`
      i++
    }, 40)
  }

  return (
    <Tag ref={ref} onMouseEnter={onEnter} style={style} className={cn('inline-block', className)}>
      {children}
    </Tag>
  )
}
