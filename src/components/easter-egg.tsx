'use client'

import { DecryptionLetter } from '@/components/easter-eggs/DecryptionLetter'
import { GitLogReveal } from '@/components/easter-eggs/GitLogReveal'
import { SpotlightReveal } from '@/components/easter-eggs/SpotlightReveal'
import { EASTER_EGGS_ENABLED, LOGO_COMBO_EVENT } from '@/lib/easter-eggs'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Easter-egg controller for Vanshika Tyagi (2-year anniversary). Detects the
 * triggers and renders one reveal at a time. All gated behind
 * EASTER_EGGS_ENABLED (set NEXT_PUBLIC_EASTER_EGGS=false to disable):
 *
 *  - Type "vee"          → DecryptionLetter (terminal decrypts a love letter).
 *  - Type "love"         → SpotlightReveal (hunt hidden notes with a spotlight).
 *  - 5 rapid logo clicks → GitLogReveal (a git history of "us").
 *
 * The DevTools console greeting lives separately in ConsoleGreeting (always on,
 * non-personal). These reveals are intentionally NOT internationalized — they
 * are personal notes, a deliberate exception to the project's i18n rule.
 */

type Reveal = 'letter' | 'spotlight' | 'gitlog'

// Idle window after which the typed-word buffer resets.
const IDLE_RESET_MS = 1500
const WORD_TRIGGERS: { word: string; reveal: Reveal }[] = [
  { word: 'vee', reveal: 'letter' },
  { word: 'love', reveal: 'spotlight' },
]
const BUFFER_LEN = 8

function isFormField(target: EventTarget | null) {
  const el = target as HTMLElement | null
  return !!el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))
}

export function EasterEggs() {
  if (!EASTER_EGGS_ENABLED) return null
  return <EasterEggsActive />
}

function EasterEggsActive() {
  const [active, setActive] = useState<Reveal | null>(null)
  const activeRef = useRef<Reveal | null>(null)
  activeRef.current = active

  const bufferRef = useRef('')
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const close = useCallback(() => setActive(null), [])
  const open = useCallback((reveal: Reveal) => {
    // Ignore new triggers while a reveal is on screen.
    if (activeRef.current) return
    setActive(reveal)
  }, [])

  // Keystroke triggers: typed words.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (isFormField(e.target)) return

      // Typed-word buffer.
      if (e.key.length === 1 && /[a-z]/i.test(e.key)) {
        bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-BUFFER_LEN)
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
        idleTimerRef.current = setTimeout(() => {
          bufferRef.current = ''
        }, IDLE_RESET_MS)

        const hit = WORD_TRIGGERS.find((t) => bufferRef.current.endsWith(t.word))
        if (hit) {
          bufferRef.current = ''
          open(hit.reveal)
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [open])

  // Logo click combo (dispatched by Header).
  useEffect(() => {
    function onLogoCombo() {
      open('gitlog')
    }
    window.addEventListener(LOGO_COMBO_EVENT, onLogoCombo)
    return () => window.removeEventListener(LOGO_COMBO_EVENT, onLogoCombo)
  }, [open])

  // Lock body scroll + Escape while a reveal is open.
  useEffect(() => {
    if (!active) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [active])

  if (!active) return null

  switch (active) {
    case 'letter':
      return <DecryptionLetter onClose={close} />
    case 'spotlight':
      return <SpotlightReveal onClose={close} />
    case 'gitlog':
      return <GitLogReveal onClose={close} />
  }
}
