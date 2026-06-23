'use client'

import { useEffect, useRef } from 'react'

const POOL = '0123456789=<>[]{}/\\$#@*%+!?:;ABCDEFGHJKLMNPQRSTUVWXYZ0101'
const FS = 17

/**
 * Hero "matrix rain" background canvas. Cyan/yellow/magenta glyph columns that
 * fall and brighten near the cursor. Pauses offscreen; renders a static grid
 * under reduced motion.
 */
export function HeroCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const parent = canvas.parentElement
    if (!parent) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    let W = 0
    let H = 0
    let cols = 0
    let drops: number[] = []
    let speeds: number[] = []
    let tints: string[] = []
    let mx = 0.5
    let raf = 0
    let running = true

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(W / FS)
      drops = new Array(cols).fill(0).map(() => Math.random() * (H / FS))
      speeds = new Array(cols).fill(0).map(() => 0.05 + Math.random() * 0.1)
      tints = new Array(cols).fill(0).map(() => {
        const r = Math.random()
        if (r < 0.1) return '252,238,10'
        if (r < 0.18) return '255,42,109'
        return '0,229,255'
      })
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = 'rgba(0,229,255,0.1)'
      ctx.font = `700 ${FS}px ui-monospace, monospace`
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < Math.ceil(H / FS); y += 3) {
          ctx.fillText('·', x * FS, y * FS)
        }
      }
    }

    let scheduled = false
    const start = () => {
      if (scheduled || !running) return
      scheduled = true
      raf = requestAnimationFrame(frame)
    }

    const frame = () => {
      scheduled = false
      if (!running) return
      ctx.fillStyle = 'rgba(7,8,10,0.085)'
      ctx.fillRect(0, 0, W, H)
      ctx.font = `700 ${FS}px ui-monospace, monospace`
      for (let i = 0; i < cols; i++) {
        const x = i * FS
        const near = Math.max(0, 1 - Math.abs(x / W - mx) * 5.9)
        const g1 = POOL[Math.floor(Math.random() * POOL.length)]
        const g2 = POOL[Math.floor(Math.random() * POOL.length)]
        const y = drops[i] * FS
        ctx.fillStyle = `rgba(214,252,255,${0.58 + near * 0.22})`
        ctx.fillText(g1, x, y)
        ctx.fillStyle = `rgba(${tints[i]},${0.22 + near * 0.18})`
        ctx.fillText(g2, x, y - FS)
        drops[i] += speeds[i] * (1 + near * 0.5)
        if (y > H && Math.random() > 0.975) drops[i] = 0
      }
      start()
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduced) {
      drawStatic()
      return () => window.removeEventListener('resize', resize)
    }

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect()
      mx = (e.clientX - rect.left) / rect.width
    }
    parent.addEventListener('mousemove', onMove)

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        running = entry.isIntersecting
        if (running) start()
        else {
          cancelAnimationFrame(raf)
          scheduled = false
        }
      })
    })
    io.observe(parent)

    start()

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      parent.removeEventListener('mousemove', onMove)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className={className} />
}
