# CLAUDE.md

Project rules for Claude Code when working in this repository.

## Project overview

A personal portfolio built with **Next.js 15 (App Router) + React 19 + TypeScript**, styled with **Tailwind CSS v4** and **shadcn/ui** (New York style), and fully internationalized with **next-intl** (12 locales). It has a cyberpunk / "neural grid" visual theme using a custom angular-clip design system.

## Tech stack

- **Framework**: Next.js 15.3 (App Router, `--turbopack` dev), React 19
- **Language**: TypeScript (strict mode), path alias `@/*` → `src/*`
- **Styling**: Tailwind CSS v4 (CSS-first config in `src/app/globals.css`, no `tailwind.config`)
- **UI**: shadcn/ui (`src/components/ui/`), Radix primitives, `lucide-react` icons
- **i18n**: next-intl with locale-prefixed routing under `src/app/[locale]/`
- **Email**: `emailjs-com` for the contact form
- **Carousel**: `embla-carousel-react`; **Drawer**: `vaul`; **Themes**: `next-themes`

## Commands

- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — run Next.js ESLint

Always run `npm run lint` after changes and a `npm run build` for non-trivial work to catch type errors.

## Project structure

- `src/app/` — App Router. Root `layout.tsx`, `page.tsx`, `not-found.tsx`; locale segment in `src/app/[locale]/`.
- `src/block/` — page-level section components (Header, Home, About, Projects, Skills, Experience, Contact, Footer, etc.). PascalCase files.
- `src/components/ui/` — shadcn/ui primitives. Do not hand-edit unless customizing; prefer `npx shadcn@latest add <component>`.
- `src/components/` — shared non-ui components (e.g. `theme-provider.tsx`).
- `src/data/` — static JSON content (`profile.json`, `project.json`, `skills.json`, `xp.json`, `languages.json`).
- `src/i18n/` — next-intl config: `routing.ts`, `request.ts`, `navigation.ts`.
- `messages/` — translation catalogs, one JSON per locale (`en.json`, `es.json`, …).
- `src/styles/` — extra CSS (`glitch.css`).
- `public/` — static assets (`audio/`, `projects/`).

## Conventions

### Components

- Use **functional components** with TypeScript. Default to **Server Components**; add `"use client"` only when using hooks, browser APIs, or event handlers (see `Projects.tsx`).
- Place page sections in `src/block/`, reusable primitives in `src/components/`.
- Merge class names with the `cn()` helper from `@/lib/utils`. Never concatenate Tailwind classes manually when conditional.
- Use the `next/image` `Image` component for images (remote patterns are open in `next.config.ts`).

### Internationalization (important)

- **Never hardcode user-facing strings.** All copy lives in `messages/<locale>.json` and is read via next-intl.
  - Server Components: `const t = await getTranslations("Namespace")`.
  - Client Components: `const t = useTranslations("Namespace")`.
- When adding or changing a key, update **all 12 locale files** in `messages/` (en, es, fr, it, pt, ru, ja, ko, zh, ar, hi, de). Keep the same key structure across every file. `en.json` is the source of truth.
- For navigation/links use the wrappers from `@/i18n/navigation` (`Link`, `redirect`, `useRouter`, `usePathname`), not raw `next/link` / `next/navigation`, so locale prefixes are preserved.
- Data in `src/data/*.json` references translations by key (e.g. `titleKey: "projects.skinbattle.title"`); add the matching keys to every `messages/*.json`.

### Styling / design system

- Tailwind v4 is configured in `src/app/globals.css` via `@theme` and `@utility`/custom classes — there is no `tailwind.config.*`.
- Use the theme color tokens (e.g. `text-highlight`, `bg-background`, `text-foreground`, `border-border`, `text-primary`) instead of raw colors.
- Use the custom **angular clip** utilities for the cyber aesthetic: `angular-tl-br-lg`, `angular-all-md`, `angular-tl-tr-xl`, etc.
- Use the `AngularFrame` corner components (`TopLeft`, `TopRight`, `BottomLeft`, `BottomRight` from `@/block/AngularFrame`) to add framed corners.

## Do / Don't

- DO keep edits minimal and scoped to the request; match existing patterns.
- DO keep all locale files in sync when touching copy.
- DON'T introduce a `tailwind.config.js` (Tailwind v4 is CSS-first here).
- DON'T add hardcoded strings, new dependencies, or refactors that weren't requested.
- DON'T hand-edit generated shadcn primitives in `src/components/ui/` unless intentionally customizing.
