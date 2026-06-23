---
name: components
description: React component patterns — server vs client components, styling with cn(), props interfaces. Use when creating page sections or shared components.
paths: src/components/**, src/block/**
---

# Component Patterns

## Server Component (default)

```tsx
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  className?: string
}

export async function FeatureCard({ className }: FeatureCardProps) {
  const t = await getTranslations('Feature')
  return (
    <div className={cn('angular-tl-br-lg border-border border bg-background p-4', className)}>
      <h3 className="text-highlight">{t('title')}</h3>
    </div>
  )
}
```

## Client Component (only when needed)

```tsx
'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface AccordionProps {
  className?: string
  children: ReactNode
}

export function Accordion({ className, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('Accordion')
  return (
    <div className={cn('border-border rounded border', className)}>
      <button onClick={() => setIsOpen(!isOpen)}>{t('toggle')}</button>
      {isOpen && children}
    </div>
  )
}
```

## Rules

- **Server Components by default** — no directive needed.
- Add `'use client'` **only** for: hooks, event handlers, browser APIs, or
  real-time state. Never on a `page.tsx` — push it into child components.
- Always accept and merge `className` with `cn()` from `@/lib/utils`.
- Props use typed interfaces — never inline `any`.
- Named exports always (except `page.tsx` / `layout.tsx`).
- shadcn primitives in `src/components/ui/` stay pure — no business logic; do
  not hand-edit them unless intentionally customizing.
- Page sections live in `src/block/` (PascalCase) and compose primitives + data
  + translations. Use the theme color tokens and angular-clip utilities (see the
  `design-tokens` skill).
- Never hardcode user-facing strings — read copy via next-intl
  (`getTranslations` server / `useTranslations` client).
- Use the `next/image` `Image` component for images.
