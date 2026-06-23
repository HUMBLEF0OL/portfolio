---
name: error-handling
description: Error boundary usage, route error files, and surfacing failures (e.g. the emailjs contact form). Use when implementing error states, handling failures, or wrapping subtrees with error boundaries.
paths:
  - src/app/**/error.tsx
  - src/app/not-found.tsx
  - src/block/Contact.tsx
---

# Error Handling Patterns

The portfolio has no toast library or HTTP client — surface errors with
route-level error files, a local error boundary where useful, and inline state
for the contact form.

## Next.js Error Files

| File                          | Purpose                                                    |
| ----------------------------- | --------------------------------------------------------- |
| `src/app/[locale]/error.tsx`  | Catches render errors in the locale tree (client comp.)   |
| `src/app/global-error.tsx`    | Catches errors in the root layout (renders own html/body) |
| `src/app/not-found.tsx`       | Renders on `notFound()` or unmatched routes               |

```tsx
// src/app/[locale]/error.tsx
'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error) // allowed in error handlers
  return (
    <div className="py-16 text-center">
      <h2 className="text-highlight text-xl font-semibold">Something went wrong</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

## Local Error Boundary (optional, for subtrees)

A class `ErrorBoundary` is the one allowed class component (per `CONSTRAINTS.md`).
Use it only to isolate a subtree that may throw on render; render a fallback and
`console.error` the error.

## Contact form (emailjs) — inline error state

The contact form submits via `emailjs-com`. Handle failure with local state, not
a global toast:

```tsx
'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export function ContactStatus() {
  const t = useTranslations('Contact')
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  // on emailjs .send().then(() => setStatus('ok')).catch(() => setStatus('error'))
  return status === 'error' ? <p role="alert">{t('error')}</p> : null
}
```

## Rules

- Never swallow errors silently — log (`console.error`) or surface to the user.
- User-facing error copy goes through next-intl, never hardcoded.
- Wrap async work in try/catch; throw to a route `error.tsx` or return an
  explicit error state.
- `console.error` / `console.warn` are allowed in error boundaries and handlers
  only — not in normal code paths (`no-console` ESLint rule).
