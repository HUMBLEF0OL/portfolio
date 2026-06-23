# Architecture

This document describes the architecture of the portfolio: folder organization,
naming conventions, and the boundaries between concerns. For library-specific
patterns (component split, i18n wiring, design tokens, SEO, testing), read the
matching file under `.claude/skills/`.

---

## Folder Structure

```
portfolio/
├── docs/
│   ├── ARCHITECTURE.md            # This file
│   ├── PACKAGES.md                # Stack + versions (mirrors package.json)
│   ├── WORKFLOWS.md               # Dev flow, git, testing, packages (process index)
│   ├── AGENT_OPS.md               # Handoff, routing, memory, session protocol
│   ├── VERIFICATION.md            # Verify cmds, Fresh Session Test, ACID, audit
│   ├── archive/{progress,decisions}/  # Source maps for rolled-off state
│   ├── specs/ · plans/ · tsd/ · brd/  # Spec/plan scaffolding (+ _template/_format)
│   └── superpowers/{specs,plans}/ # Brainstorming/planning output (coexists)
├── scripts/
│   ├── check-harness.mjs          # Harness structure gate (npm run check:harness)
│   ├── check-co-modification.mjs  # src/** ⇒ PROGRESS.md staged (pre-commit)
│   ├── check-co-modification.test.mjs  # gate self-test (npm run test:gates)
│   └── check-updates.js           # Dependency / audit checker
├── messages/                      # next-intl catalogs — one JSON per locale (12)
├── e2e/                           # Playwright end-to-end tests
├── public/                        # Static assets (audio/, projects/, images)
├── src/                           # Each top-level module carries an ARCHITECTURE.md
│   ├── app/                       # Next.js App Router (+ ARCHITECTURE.md)
│   │   ├── globals.css            # Tailwind v4 @theme + angular-clip design system
│   │   ├── layout.tsx             # Root: html/body, providers, metadataBase
│   │   ├── page.tsx               # Redirect-only → /<locale>
│   │   ├── not-found.tsx
│   │   ├── robots.ts · sitemap.ts · manifest.ts   # SEO surfaces (read site.ts)
│   │   └── [locale]/              # Locale segment: layout.tsx + page.tsx
│   ├── config/                    # site.ts — single source of SEO facts (+ ARCHITECTURE.md)
│   ├── block/                     # Page-level sections, PascalCase (+ ARCHITECTURE.md)
│   ├── components/                # ui/ (shadcn primitives) + shared (+ ARCHITECTURE.md)
│   ├── data/                      # Static JSON content keyed to translations (+ ARCHITECTURE.md)
│   ├── i18n/                      # next-intl config: routing/request/navigation (+ ARCHITECTURE.md)
│   ├── lib/                       # utils.ts (cn) and helpers (+ ARCHITECTURE.md)
│   ├── assets/                    # Imported image assets (+ ARCHITECTURE.md)
│   ├── styles/                    # Extra CSS, e.g. glitch.css (+ ARCHITECTURE.md)
│   └── middleware.ts              # next-intl locale middleware (file, exempt)
├── .nvmrc                         # Pinned Node major (Environment subsystem)
├── AGENTS.md · CONSTRAINTS.md · INITIALIZATION.md · PROGRESS.md · DECISIONS.md
├── package.json · tsconfig.json · next.config.ts · postcss.config.mjs
└── eslint.config.mjs · .prettierrc · .commitlintrc.json
```

---

## Naming Conventions

| Item            | Convention              | Example                |
| --------------- | ----------------------- | ---------------------- |
| Page sections   | PascalCase (`src/block`)| `Projects.tsx`         |
| shadcn UI       | kebab files (generated) | `components/ui/card.tsx`|
| Shared comps    | kebab-case              | `theme-provider.tsx`   |
| Hooks           | `use` prefix, camelCase | `useTheme`             |
| Route folders   | bracket segment         | `app/[locale]/`        |
| Translation keys| dot.namespaced          | `projects.skinbattle.title` |

---

## Imports

- Always use the `@/` alias for `src/` imports.
- Group: 1) react/next, 2) external libs, 3) internal `@/` imports.
- Use the navigation wrappers from `@/i18n/navigation` (`Link`, `redirect`,
  `useRouter`, `usePathname`) — never raw `next/link` / `next/navigation`.

---

## Component Hierarchy

```
components/ui/ (shadcn primitives)   → No business logic, just styling and props
  ↓
block/ (page sections)               → Compose primitives + data + translations
  ↓
app/[locale]/page.tsx                → Composes sections, route-level (Server Component)
```

Default to **Server Components**; add `"use client"` only for hooks, browser
APIs, or event handlers — and never on a `page.tsx` (push it into children).

---

## Internationalization

- `src/i18n/routing.ts` defines the 12 locales + `defaultLocale`. `request.ts`
  loads `messages/<locale>.json`; `navigation.ts` exports the locale-aware
  navigation wrappers.
- Server Components read copy via `getTranslations`; Client Components via
  `useTranslations`. Data files in `src/data/*.json` reference translation keys.
- Every user-facing string lives in `messages/*` and must exist in all 12 files.

---

## Design System

Tailwind v4 is configured CSS-first in `src/app/globals.css` via `@theme` and
custom `@utility` classes — there is **no** `tailwind.config.*`. Use the theme
color tokens (`text-highlight`, `bg-background`, `text-foreground`,
`border-border`, `text-primary`), the angular-clip utilities (`angular-tl-br-lg`,
`angular-all-md`, …), and the `AngularFrame` corner components. See the
`design-tokens` skill.

---

## SEO

`src/config/site.ts` is the single source of locale-neutral SEO facts (name,
url, locales, ogImage, …). `robots.ts`, `sitemap.ts`, and `manifest.ts` read it;
the root `layout.tsx` sets `metadataBase` from it; `[locale]/page.tsx` builds
localized metadata via `generateMetadata`. See the `seo` skill.

---

## Key Code Locations

| What                 | Where                      |
| -------------------- | -------------------------- |
| SEO config           | `src/config/site.ts`       |
| `cn()` class util    | `src/lib/utils.ts`         |
| Theme provider       | `src/components/theme-provider.tsx` |
| Locale routing       | `src/i18n/routing.ts`      |
| Translation catalogs | `messages/<locale>.json`   |
| Design system        | `src/app/globals.css`      |
