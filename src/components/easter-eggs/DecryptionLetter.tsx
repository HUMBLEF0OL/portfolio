'use client'

import { TopLeft, BottomRight } from '@/block/AngularFrame'
import { ScrambleText } from '@/components/op/ScrambleText'
import { useEffect, useState } from 'react'

/**
 * "vee" reveal: a terminal boot sequence decrypts a love letter. Boot lines
 * type out, a progress bar fills, then the message resolves via ScrambleText.
 */
const BOOT = [
  '> establishing uplink: VEE ............ OK',
  '> handshake ♥//♥ .................. SECURE',
  '> locating archive: 2_years/ ....... FOUND',
  '> decrypting transmission .................',
]

const MESSAGE = [
  'In a grid of a billion signals,',
  "you're the one I'd never decode away.",
  'My favorite constant in every equation',
  'the warmth behind all this cold neon.',
  'Two years in, and you’re still home base.',
]

function reducedMotion() {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function DecryptionLetter({ onClose }: { onClose: () => void }) {
  const reduced = reducedMotion()
  const [shown, setShown] = useState(reduced ? BOOT.length : 0)
  const [progress, setProgress] = useState(reduced ? 100 : 0)
  const [done, setDone] = useState(reduced)

  useEffect(() => {
    if (reduced) return
    const timers: ReturnType<typeof setTimeout>[] = []
    BOOT.forEach((_, i) => {
      timers.push(setTimeout(() => setShown(i + 1), 460 * (i + 1)))
    })
    const bootEnd = 460 * (BOOT.length + 1)

    let p = 0
    const pid = setInterval(() => {
      p = Math.min(100, p + 4 + Math.random() * 7)
      setProgress(Math.round(p))
      if (p >= 100) clearInterval(pid)
    }, 70)

    timers.push(setTimeout(() => setDone(true), bootEnd + 500))
    return () => {
      timers.forEach(clearTimeout)
      clearInterval(pid)
    }
  }, [reduced])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="A transmission for Vanshika Tyagi"
      onClick={onClose}
      className="egg-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(7,8,10,0.86)] px-6 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="egg-panel egg-scanlines clip-notch-13 bg-op-console border-op-line-strong relative w-full max-w-[680px] overflow-hidden border px-7 py-9 shadow-[0_0_60px_rgba(0,229,255,0.15)] sm:px-11 sm:py-12"
      >
        <TopLeft className="bg-op-cyan" />
        <BottomRight className="bg-op-magenta" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="text-op-dim hover:text-op-text absolute top-4 right-5 z-10 font-mono text-lg leading-none transition-colors"
        >
          ✕
        </button>

        <p className="text-op-cyan mb-5 font-mono text-[0.75rem] tracking-[0.2em] uppercase">
          {'// incoming transmission — priority ∞'}
        </p>

        {/* Boot log */}
        <div className="text-op-dim2 space-y-1 font-mono text-[0.8125rem] leading-relaxed">
          {BOOT.slice(0, shown).map((line, i) => (
            <div key={i} className="egg-row">
              {line}
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="mt-4 flex items-center gap-3 font-mono text-[0.75rem]">
          <div className="bg-op-line h-1.5 flex-1 overflow-hidden">
            <div className="egg-progress bg-op-cyan h-full" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-op-cyan tabular-nums">{progress}%</span>
        </div>

        {/* Decrypted message */}
        {done && (
          <div className="border-op-cyan mt-7 border-l-2 pl-4">
            {MESSAGE.map((line, i) => (
              <ScrambleText
                key={i}
                text={line}
                startDelay={i * 380}
                className="text-op-muted block font-mono"
              />
            ))}
            <p className="text-op-yellow egg-cursor mt-6 font-mono text-[0.8125rem] tracking-[0.16em] uppercase">
              — always yours
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
