# Package Registry

The authoritative list of installed packages and their versions is
`package.json`. This document summarizes the stack. Per-library usage patterns
live in the matching file under `.claude/skills/`.

## Selected Stack

| Category   | Choice                                                        |
| ---------- | ------------------------------------------------------------- |
| Framework  | Next.js 15.3 (App Router, Turbopack dev)                      |
| Language   | TypeScript 5 (strict mode), `@/*` → `src/*`                   |
| UI runtime | React 19                                                      |
| Styling    | Tailwind CSS v4 (CSS-first, no config file)                   |
| UI kit     | shadcn/ui (New York), Radix primitives, lucide                |
| i18n       | next-intl 4 (3 locales, locale-prefixed routing)              |
| Email      | mailto: link (contact form — no backend/library)              |
| Carousel   | embla-carousel-react · Drawer: vaul · Themes: next-themes     |
| Testing    | Vitest 3 + Testing Library + jsdom · Playwright               |
| Tooling    | ESLint 9 (flat) · Prettier · commitlint · lint-staged · Husky |

## Runtime dependencies

`@radix-ui/react-{dialog,select,slot,tabs}`, `class-variance-authority`, `clsx`,
`embla-carousel-react`, `lucide-react`, `next`, `next-intl`,
`next-themes`, `react`, `react-dom`, `react-barcode`, `tailwind-merge`, `vaul`.

## Dev dependencies (toolchain)

`@commitlint/cli`, `@commitlint/config-conventional`, `@eslint/eslintrc`,
`@playwright/test`, `@tailwindcss/postcss`, `@testing-library/{jest-dom,react,user-event}`,
`@types/{node,react,react-dom}`, `@vitejs/plugin-react-swc`, `eslint`,
`eslint-config-next`, `husky`, `jsdom`, `lint-staged`, `prettier`,
`prettier-plugin-tailwindcss`, `tailwindcss`, `tw-animate-css`, `typescript`,
`vitest`.

## Package Addition Criteria

Before adding a new package, it must pass ALL of:

1. **Necessity** — Can this be done with existing packages or native APIs?
2. **Size** — Is the bundle impact acceptable? (check bundlephobia.com)
3. **Maintenance** — Actively maintained? (>1 release in past 6 months)
4. **Compatibility** — Works with Next.js 15.3, React 19, Tailwind v4?
5. **Convention** — Aligns with existing patterns?

A new **runtime** dependency is a Human-in-Loop checkpoint (`CONSTRAINTS.md`);
dev-only tooling deps follow the criteria above.

## Update Strategy

Monthly/quarterly update cadence and commands are owned by
`docs/WORKFLOWS.md` → "Package Update Strategy" (`npm run update:check`).
