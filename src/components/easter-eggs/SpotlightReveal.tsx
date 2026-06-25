'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * "love" reveal: the lights go out. A neon spotlight glides after the cursor
 * and hidden notes glow into view as the light nears them — you hunt for the
 * love. Found notes stay lit; dust drifts in the beam; finding them all
 * dissolves the fog and connects the notes into a constellation.
 *
 * Notes are NOT clipped by the cursor's circular mask (a circle can't reveal a
 * whole line of text). Instead the fog only darkens empty space, and each note
 * sits above it with its opacity driven by how close the beam is — so a note
 * fades in fully and legibly when the light reaches it.
 */
type Note = { text: string; top: number; left: number; color: string; size: number }

const NOTES: Note[] = [
  { text: 'still my favorite person', top: 20, left: 28, color: '#00e5ff', size: 1.3 },
  { text: '2 years · infinite reasons', top: 28, left: 72, color: '#fcee0a', size: 1.3 },
  { text: 'you light up the circuit', top: 52, left: 20, color: '#00e5ff', size: 1.2 },
  { text: 'my favorite constant', top: 50, left: 80, color: '#fcee0a', size: 1.2 },
  { text: 'home base ♥', top: 74, left: 32, color: '#ff2a6d', size: 1.4 },
  { text: '— always, for vee', top: 80, left: 68, color: '#eaeef0', size: 1.1 },
]

const BASE_RADIUS = 170
// Cursor-only fog hole. Notes are revealed by proximity, not by this mask.
const FOG_MASK =
  'radial-gradient(circle var(--egg-r,170px) at var(--egg-x,50%) var(--egg-y,50%), transparent 0, transparent 30%, #000 76%)'

function reducedMotion() {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function SpotlightReveal({ onClose }: { onClose: () => void }) {
  const reduced = reducedMotion()
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const noteRefs = useRef<(HTMLParagraphElement | null)[]>([])

  const foundRef = useRef<boolean[]>(NOTES.map(() => false))
  const [foundCount, setFoundCount] = useState(reduced ? NOTES.length : 0)
  const allFound = foundCount >= NOTES.length

  useEffect(() => {
    if (reduced) return
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(2, window.devicePixelRatio || 1)
    let W = 0
    let H = 0
    let raf = 0
    let t = 0

    // Eased spotlight: target follows the pointer, spot lags behind it.
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const spot = { x: target.x, y: target.y }
    let radius = BASE_RADIUS
    let finale = 0 // 0→1 once everything is found

    type Mote = { x: number; y: number; vx: number; vy: number; r: number; ph: number; c: string }
    let motes: Mote[] = []
    const MOTE_COLORS = ['255,255,255', '0,229,255', '255,42,109']

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      motes = Array.from({ length: 64 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 0.6 + Math.random() * 1.6,
        ph: Math.random() * Math.PI * 2,
        c: MOTE_COLORS[Math.floor(Math.random() * MOTE_COLORS.length)],
      }))
    }

    const notePx = (n: Note) => ({ x: (n.left / 100) * W, y: (n.top / 100) * H })

    const frame = () => {
      t += 0.016
      // ease the spotlight toward the cursor + gentle breathing radius
      spot.x += (target.x - spot.x) * 0.16
      spot.y += (target.y - spot.y) * 0.16
      radius = BASE_RADIUS + Math.sin(t * 1.6) * 10
      wrap.style.setProperty('--egg-x', `${spot.x}px`)
      wrap.style.setProperty('--egg-y', `${spot.y}px`)
      wrap.style.setProperty('--egg-r', `${radius}px`)

      // Reveal whole notes by proximity to the beam (not by a circular clip).
      const reveal = radius * 1.5
      let newly = false
      NOTES.forEach((n, i) => {
        const el = noteRefs.current[i]
        if (!el) return
        const p = notePx(n)
        const dist = Math.hypot(p.x - spot.x, p.y - spot.y)
        if (!foundRef.current[i] && dist < radius * 0.95) {
          foundRef.current[i] = true
          newly = true
        }
        // Fragments only stay lit once ALL are found (finale). During the hunt
        // each note is visible only while the beam is near it.
        const op = finale > 0 ? 1 : Math.max(0, Math.min(1, (reveal - dist) / (reveal * 0.5)))
        el.style.opacity = String(op)
      })
      if (newly) setFoundCount(foundRef.current.filter(Boolean).length)

      const done = foundRef.current.every(Boolean)
      if (done) finale = Math.min(1, finale + 0.012)

      // render dust + (on finale) constellation lines
      ctx.clearRect(0, 0, W, H)

      if (finale > 0) {
        const pts = NOTES.map(notePx)
        ctx.lineWidth = 1
        ctx.strokeStyle = `rgba(0,229,255,${0.5 * finale})`
        ctx.beginPath()
        for (let i = 0; i < pts.length; i++) {
          const a = pts[i]
          const b = pts[(i + 1) % pts.length]
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
        }
        ctx.stroke()
        for (const p of pts) {
          ctx.beginPath()
          ctx.fillStyle = `rgba(255,42,109,${0.85 * finale})`
          ctx.shadowColor = '#ff2a6d'
          ctx.shadowBlur = 8 * finale
          ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.shadowBlur = 0
      }

      for (const m of motes) {
        m.x += m.vx
        m.y += m.vy
        if (m.x < 0) m.x = W
        if (m.x > W) m.x = 0
        if (m.y < 0) m.y = H
        if (m.y > H) m.y = 0
        const d = Math.hypot(m.x - spot.x, m.y - spot.y)
        // motes glow inside the beam; once everything is found they linger faintly
        const beam = Math.max(0, 1 - d / (radius * 1.35))
        const twinkle = 0.55 + 0.45 * Math.sin(t * 2 + m.ph)
        const a = Math.max(beam, finale * 0.25) * twinkle
        if (a <= 0.02) continue
        ctx.beginPath()
        ctx.fillStyle = `rgba(${m.c},${a})`
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(frame)
    }

    const onMouse = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
    }
    const onTouch = (e: TouchEvent) => {
      const p = e.touches[0]
      if (p) {
        target.x = p.clientX
        target.y = p.clientY
      }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('touchmove', onTouch, { passive: true })
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [reduced])

  const stop = useCallback((e: React.MouseEvent) => e.stopPropagation(), [])

  return (
    <div
      ref={wrapRef}
      role="dialog"
      aria-modal="true"
      aria-label="A hidden message for Vanshika"
      onClick={onClose}
      className="egg-overlay fixed inset-0 z-[9999] overflow-hidden bg-[#07080a]"
      style={
        { cursor: reduced ? 'auto' : 'none', '--egg-r': `${BASE_RADIUS}px` } as React.CSSProperties
      }
    >
      {/* Dark fog: only darkens empty space; a hole follows the cursor. Dissolves on completion. */}
      {!reduced && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
          style={{
            background: '#07080a',
            opacity: allFound ? 0 : 1,
            WebkitMaskImage: FOG_MASK,
            maskImage: FOG_MASK,
          }}
        />
      )}

      {/* Dust + constellation canvas (above the fog so dust reads inside the beam). */}
      {!reduced && (
        <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0" />
      )}

      {/* Notes — above the fog; opacity driven by beam proximity so whole lines reveal. */}
      <div className="pointer-events-none absolute inset-0">
        {NOTES.map((n, i) => (
          <p
            key={i}
            ref={(el) => {
              noteRefs.current[i] = el
            }}
            className={`egg-note anton absolute -translate-x-1/2 -translate-y-1/2 text-center whitespace-nowrap ${
              reduced || allFound ? 'egg-note--found' : ''
            }`}
            style={{
              top: `${n.top}%`,
              left: `${n.left}%`,
              color: n.color,
              fontSize: `${n.size}rem`,
              textShadow: `0 0 18px ${n.color}`,
              opacity: reduced ? 1 : 0,
            }}
          >
            {n.text}
          </p>
        ))}
      </div>

      {/* Glow ring tracking the cursor. */}
      {!reduced && !allFound && (
        <div
          aria-hidden
          className="egg-spot-ring pointer-events-none absolute h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
      )}

      {/* CRT vignette + scanlines. */}
      <div
        aria-hidden
        className="egg-scanlines pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 38%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Closing message once every note is found. */}
      {allFound && (
        <div onClick={stop} className="egg-final absolute inset-x-0 top-1/2 px-6 text-center">
          <p
            className="anton text-op-text"
            style={{ fontSize: 'clamp(1.75rem,6vw,3.25rem)', textShadow: '0 0 28px #ff2a6d' }}
          >
            you found all of me ♥
          </p>
          <p className="text-op-cyan mt-3 font-mono text-[0.8125rem] tracking-[0.16em] uppercase">
            two years · still counting
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="text-op-dim hover:text-op-text absolute top-4 right-5 z-10 font-mono text-lg leading-none transition-colors"
        style={{ cursor: 'pointer' }}
      >
        ✕
      </button>

      {/* Progress + hint. */}
      <p className="text-op-dim2 absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[0.7rem] tracking-[0.2em] uppercase">
        {reduced
          ? 'press esc to close'
          : allFound
            ? 'esc to close'
            : `fragments ${foundCount}/${NOTES.length} · move to reveal`}
      </p>
    </div>
  )
}
