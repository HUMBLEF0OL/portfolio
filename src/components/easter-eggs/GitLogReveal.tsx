'use client'

import { TopLeft, BottomRight } from '@/block/AngularFrame'

/**
 * Logo-combo reveal: a fake `git blame happiness.ts` — every good line in this
 * life traces back to one author. The joke: 100% blamed on vee.
 *
 * EDIT: replace these placeholder lines with your real ones (every line is
 * attributed to "vee"; tweak hashes/text freely).
 */
const BLAME: { hash: string; line: number; text: string }[] = [
  { hash: 'a1b2c3d', line: 1, text: 'every morning worth waking up for' },
  { hash: '9f8e7d6', line: 2, text: 'the color in a grayscale grid' },
  { hash: '4c5b6a7', line: 3, text: 'my favorite constant in every equation' },
  { hash: '7a8b9c0', line: 4, text: 'the calm after every long day' },
  { hash: '1a2b3c4', line: 5, text: 'home — redefined' },
  { hash: '0d1e2f3', line: 6, text: 'every love song that finally makes sense' },
]

export function GitLogReveal({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="The commit history of us"
      onClick={onClose}
      className="egg-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(7,8,10,0.86)] px-6 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="egg-panel egg-scanlines clip-notch-13 bg-op-console border-op-line-strong relative w-full max-w-[640px] overflow-hidden border px-7 py-8 shadow-[0_0_60px_rgba(0,229,255,0.15)] sm:px-10 sm:py-10"
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

        <p className="text-op-dim2 mb-4 font-mono text-[0.8125rem]">
          <span className="text-op-cyan">$</span> git blame happiness.ts
        </p>

        <div className="space-y-2 font-mono text-[0.8125rem] leading-relaxed sm:text-[0.875rem]">
          {BLAME.map((b, i) => (
            <div
              key={b.hash}
              className="egg-row flex items-start gap-2"
              style={{ animationDelay: `${i * 110}ms` }}
            >
              <span className="text-op-yellow shrink-0">{b.hash}</span>
              <span className="text-op-cyan shrink-0">
                (vee 2y{' '}
                <span className="text-op-dim2 tabular-nums">{String(b.line).padStart(2, ' ')}</span>
                )
              </span>
              <span className="text-op-muted">{b.text}</span>
            </div>
          ))}
          <div
            className="egg-row text-op-dim2 egg-cursor pt-2"
            style={{ animationDelay: `${BLAME.length * 110 + 120}ms` }}
          >
            <span className="text-op-magenta select-none"># </span>
            100% of the good parts — authored by vee ♥
          </div>
        </div>
      </div>
    </div>
  )
}
