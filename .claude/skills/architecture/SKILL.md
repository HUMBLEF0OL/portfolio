---
name: architecture
description: Project file organization, naming conventions, and import patterns. Use when creating new files, organizing code, or deciding where to place modules.
paths: src/**
---

# Architecture

## File Organization

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css         # Tailwind v4 @theme + angular-clip design system
│   ├── layout.tsx          # Root: html/body, providers, metadataBase
│   ├── page.tsx            # Redirect-only → /<locale>
│   ├── not-found.tsx
│   ├── robots.ts · sitemap.ts · manifest.ts   # SEO surfaces (read site.ts)
│   └── [locale]/           # Locale segment: layout.tsx + page.tsx
├── config/                 # site.ts — single source of SEO facts
├── block/                  # Page-level sections (PascalCase): Home, About, …
├── components/
│   ├── ui/                 # shadcn/ui primitives (generated)
│   └── *.tsx               # Shared components (e.g. theme-provider)
├── data/                   # Static JSON content keyed to translations
├── i18n/                   # next-intl: routing.ts, request.ts, navigation.ts
├── lib/                    # utils.ts (cn) and helpers
├── assets/                 # Imported image assets
├── styles/                 # Extra CSS (e.g. glitch.css)
└── middleware.ts           # next-intl locale middleware
```

There are **no** `services/`, `types/`, `lib/store/`, `lib/api/`, or `app/api/`
directories — the portfolio has no backend, data-layer, or client-store concerns.

## Naming Conventions

| Type             | Pattern                 | Example                |
| ---------------- | ----------------------- | ---------------------- |
| Page section     | PascalCase `.tsx`       | `Projects.tsx`         |
| shadcn primitive | kebab `.tsx` (generated)| `components/ui/card.tsx` |
| Shared component | kebab-case `.tsx`       | `theme-provider.tsx`   |
| Hook             | `use` + camelCase       | `useTheme`             |
| Data file        | camelCase `.json`       | `project.json`         |
| Translation key  | dot.namespaced          | `projects.skinbattle.title` |

## Import Patterns

Always use the `@/` alias. Group imports: 1) react/next, 2) external libs,
3) internal `@/`. For navigation, import from `@/i18n/navigation` (not raw
`next/link` / `next/navigation`).

```ts
import { useState } from 'react'
import type { Metadata } from 'next'

import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
```

## Key Rules

- TypeScript strict mode — no `any`, proper interfaces and generics.
- Functional components only.
- Named exports for everything except `page.tsx` and `layout.tsx`.
- `const` always, `let` only when reassignment is needed, never `var`.
- Config values in `src/config/site.ts` — never hardcode the site URL/locales.
- No `tailwind.config.*` — the design system is CSS-first in `globals.css`.
