'use client'

import { TopLeft, BottomRight } from '@/block/AngularFrame'
import { EASTER_EGGS_ENABLED, LOGO_COMBO_EVENT } from '@/lib/easter-eggs'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Hidden easter eggs for the site. All of them are gated behind
 * EASTER_EGGS_ENABLED (set NEXT_PUBLIC_EASTER_EGGS=false to disable everything):
 *
 *  - Type "vee"          → full-screen transmission for Vanshika Tyagi.
 *  - Konami code         → glitch burst + toast.
 *  - DevTools console     → styled banner + hire-me note.
 *  - 5 rapid logo clicks → toast (dispatched by Header via LOGO_COMBO_EVENT).
 *
 * The Vanshika message is intentionally NOT internationalized — it is a single
 * personal note, a deliberate exception to the project's i18n rule.
 */

const SECRET = 'vee'
// Reset the keystroke buffer if the user pauses — keeps the code from
// triggering accidentally while typing normally.
const IDLE_RESET_MS = 1500
const TOAST_MS = 3200

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

function isFormField(target: EventTarget | null) {
  const el = target as HTMLElement | null
  return !!el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function EasterEggs() {
  if (!EASTER_EGGS_ENABLED) return null
  return <EasterEggsActive />
}

function EasterEggsActive() {
  const [loveOpen, setLoveOpen] = useState(false)
  const [burst, setBurst] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const bufferRef = useRef('')
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const konamiIdxRef = useRef(0)
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const burstTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const closeLove = useCallback(() => setLoveOpen(false), [])

  const showToast = useCallback((message: string) => {
    setToast(message)
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    toastTimerRef.current = setTimeout(() => setToast(null), TOAST_MS)
  }, [])

  const fireBurst = useCallback(() => {
    if (prefersReducedMotion()) return
    setBurst(true)
    if (burstTimerRef.current) clearTimeout(burstTimerRef.current)
    burstTimerRef.current = setTimeout(() => setBurst(false), 1200)
  }, [])

  // DevTools console message — logged once.
  useEffect(() => {
    const title = 'color:#fcee0a;font-size:20px;font-weight:900;font-family:monospace'
    const dim = 'color:#7e8896;font-family:monospace'
    const cyan = 'color:#00e5ff;font-family:monospace'
    // eslint-disable-next-line no-console
    console.log(
      '%c// YOU FOUND ME\n%cPoking around the console? I like you already.\n%cLet’s build something: %chttps://github.com/HUMBLEF0OL',
      title,
      dim,
      dim,
      cyan
    )
  }, [])

  // Keystroke eggs: "vee" buffer + Konami sequence.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (isFormField(e.target)) return

      // Konami code (arrows + b/a).
      const expected = KONAMI[konamiIdxRef.current]
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (key === expected) {
        konamiIdxRef.current += 1
        if (konamiIdxRef.current === KONAMI.length) {
          konamiIdxRef.current = 0
          fireBurst()
          showToast('KONAMI ACCEPTED // SYSTEM BREACH')
        }
      } else {
        // Restart, allowing the current key to begin a fresh sequence.
        konamiIdxRef.current = key === KONAMI[0] ? 1 : 0
      }

      // "vee" letter buffer.
      if (e.key.length === 1 && /[a-z]/i.test(e.key)) {
        bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-SECRET.length)
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
        idleTimerRef.current = setTimeout(() => {
          bufferRef.current = ''
        }, IDLE_RESET_MS)

        if (bufferRef.current === SECRET) {
          bufferRef.current = ''
          setLoveOpen(true)
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [fireBurst, showToast])

  // Logo click combo (dispatched by Header).
  useEffect(() => {
    function onLogoCombo() {
      fireBurst()
      showToast('LOGO UNLOCKED // NICE CLICKING')
    }
    window.addEventListener(LOGO_COMBO_EVENT, onLogoCombo)
    return () => window.removeEventListener(LOGO_COMBO_EVENT, onLogoCombo)
  }, [fireBurst, showToast])

  // Lock body scroll + Escape while the love overlay is open.
  useEffect(() => {
    if (!loveOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeLove()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [loveOpen, closeLove])

  // Clean up lingering timers on unmount.
  useEffect(
    () => () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
      if (burstTimerRef.current) clearTimeout(burstTimerRef.current)
    },
    []
  )

  return (
    <>
      {burst && (
        <div aria-hidden className="egg-burst pointer-events-none fixed inset-0 z-[9998]" />
      )}

      {toast && (
        <div
          role="status"
          className="clip-notch-10 bg-op-console border-op-cyan text-op-cyan fixed right-5 bottom-5 z-[9999] border px-4 py-3 font-mono text-[0.75rem] tracking-[0.12em] uppercase shadow-[0_0_24px_rgba(0,229,255,0.25)]"
        >
          {toast}
        </div>
      )}

      {loveOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="A transmission for Vanshika Tyagi"
          onClick={closeLove}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(7,8,10,0.86)] px-6 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="clip-notch-13 bg-op-console border-op-line-strong relative w-full max-w-[640px] border px-8 py-10 shadow-[0_0_60px_rgba(0,229,255,0.15)] sm:px-12 sm:py-14"
          >
            <TopLeft className="bg-op-cyan" />
            <BottomRight className="bg-op-magenta" />

            <button
              type="button"
              onClick={closeLove}
              aria-label="Close"
              className="text-op-dim hover:text-op-text absolute top-4 right-5 font-mono text-lg leading-none transition-colors"
            >
              ✕
            </button>

            <p className="text-op-cyan mb-6 font-mono text-[0.75rem] tracking-[0.2em] uppercase">
              {'// incoming transmission — priority ∞'}
            </p>

            <h2
              className="anton tm-glitch text-op-text"
              data-text="VANSHIKA TYAGI"
              style={{
                fontSize: 'clamp(2rem,7vw,3.75rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.005em',
              }}
            >
              VANSHIKA TYAGI
            </h2>

            <p
              className="border-op-cyan text-op-muted mt-8 max-w-[52ch] border-l-2 pl-4"
              style={{ fontSize: 'clamp(1rem,1.4vw,1.1875rem)', lineHeight: 1.6 }}
            >
              In a grid of a billion signals, you&apos;re the only one I&apos;d never decode away.
              My favorite constant in every equation, the warmth behind all this cold neon. Thank
              you for being my home base.
            </p>

            <p className="text-op-yellow mt-8 font-mono text-[0.8125rem] tracking-[0.16em] uppercase">
              {'— always yours'}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
