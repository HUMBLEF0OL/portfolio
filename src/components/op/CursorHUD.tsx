'use client'

import { useEffect, useRef, useState } from 'react'
import { useFinePointer, useReducedMotion } from './use-op'

const pad = (n: number) => String(Math.max(0, Math.round(n))).padStart(4, '0')

/**
 * Custom cursor reticle + bottom-left HUD coordinate readout.
 * Desktop + fine-pointer + no-reduced-motion only. `label` is the HUD tag
 * (e.g. "SYS ONLINE", "OPERATOR_FILE", "CASE_FILE").
 */
export function CursorHUD({ label = 'SYS ONLINE' }: { label?: string }) {
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const active = fine && !reduced

  const cursorRef = useRef<HTMLDivElement | null>(null)
  const [coord, setCoord] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!active) return
    const root = document.documentElement
    root.style.cursor = 'none'
    const cur = cursorRef.current

    // The reticle follows the pointer imperatively every event (cheap style
    // writes, no React). The HUD coordinate readout is throttled to one React
    // render per animation frame so rapid mousemove can't flood reconciliation.
    let lastX = 0
    let lastY = 0
    let rafId: number | null = null
    const flush = () => {
      rafId = null
      setCoord({ x: lastX, y: lastY })
    }
    const onMove = (e: MouseEvent) => {
      if (cur) {
        cur.style.left = `${e.clientX}px`
        cur.style.top = `${e.clientY}px`
        cur.style.opacity = '1'
      }
      lastX = e.clientX
      lastY = e.clientY
      if (rafId === null) rafId = requestAnimationFrame(flush)
    }
    const onOver = (e: MouseEvent) => {
      if (!cur) return
      const t = e.target as HTMLElement | null
      const hot = t?.closest('a,button,input,select,textarea,[data-cursor-hover]')
      cur.style.width = hot ? '46px' : '28px'
      cur.style.height = hot ? '46px' : '28px'
      cur.style.borderColor = hot ? '#FCEE0A' : 'rgba(0,229,255,0.85)'
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      root.style.cursor = ''
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [active])

  if (!active) return null

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed hidden md:block"
        style={{
          zIndex: 9998,
          width: '28px',
          height: '28px',
          opacity: 0,
          border: '1px solid rgba(0,229,255,0.85)',
          background: 'radial-gradient(circle at center,#FCEE0A 0,#FCEE0A 1.6px,transparent 2.4px)',
          transform: 'translate(-50%,-50%)',
          transition: 'width .18s, height .18s, opacity .25s, border-color .18s',
        }}
      />
      <div
        aria-hidden
        className="text-op-dim pointer-events-none fixed hidden items-center gap-[14px] font-mono text-[0.6875rem] md:flex"
        style={{ left: '22px', bottom: '13px', zIndex: 9000, letterSpacing: '0.16em' }}
      >
        <span className="text-op-cyan">{`X·${pad(coord.x)} Y·${pad(coord.y)}`}</span>
        <span style={{ color: '#233240' }}>{'//'}</span>
        <span className="text-op-yellow inline-flex items-center gap-2">
          <span className="tm-pulse-dot bg-op-yellow inline-block h-1.5 w-1.5 rounded-full" />
          {label}
        </span>
      </div>
    </>
  )
}
