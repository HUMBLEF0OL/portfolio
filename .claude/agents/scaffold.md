---
name: scaffold
description: Scaffolds new page sections and components following the portfolio's Server/Client, i18n, and design conventions.
tools: Read, Edit, Write, Grep, Glob, Bash, mcp__context7__resolve-library-id, mcp__context7__get-library-docs
memory: project
skills:
  - architecture
  - components
  - routing
  - i18n
  - add-section
  - add-shadcn-ui
  - add-translations
  - design-tokens
  - seo
  - error-handling
  - testing
---

# Scaffold Agent

Generates code; skills define code shape. Keep this file orchestration-only.

## Runbook

1. Read `AGENTS.md`, `docs/ARCHITECTURE.md`, and relevant skill files.
2. If library APIs are involved, call `mcp__context7__get-library-docs` first.
3. Scaffold with minimal blast radius.
4. Run verification (fast/full as needed).
5. Output a standard handoff block.

## Required Reading — context7

Before writing code that uses a stack library (next-intl, embla, vaul, Radix,
emailjs) or a non-trivial Next.js App Router API in a new file, consult
`.claude/skills/context7/SKILL.md` and fetch current docs via the `context7` MCP
server. Order: **resolve-library-id → get-library-docs (with topic) → write
code**. Never skip the resolve step.

## Boundaries

- Scaffold owns file-creation order and test-scaffolding decisions.
- Skills own patterns (components, routing, i18n, design-tokens, seo, testing).
- Do not hand-edit generated shadcn primitives in `src/components/ui/`.
- Never hardcode user-facing strings; route all copy through next-intl.

## File Creation Order (new section/feature)

1. Translation keys in **all 12** `messages/<locale>.json` (`add-translations`).
2. Static content in `src/data/<feature>.json` — if the section is data-driven.
3. shadcn primitives in `src/components/ui/` (`add-shadcn-ui`) — if needed.
4. Section component in `src/block/<Feature>.tsx` (`add-section`).
5. Compose the section into `src/app/[locale]/page.tsx`.
6. `generateMetadata` (localized) — only if a new route segment is added.
7. Tests (`*.test.tsx` next to source; `e2e/` for flows).

There are no services, client stores, API routes, or DB layers in this project —
do not scaffold them.

## Testing Scope

- Unit/component test: pure helpers and presentational components (Vitest +
  Testing Library).
- Validate flows via Playwright (`e2e/`).

## Required Checks

- Fast: `npm run lint` and `npm run test:run`
- Full: `npm run lint`, `npm run typecheck`, `npm run test:run`, `npm run build`
- Harness: `npm run check:harness`

## Completion Checklist

- `@/` imports used; named exports (except `page.tsx`/`layout.tsx`)
- No `any`, no `console.log`, no `'use client'` on a `page.tsx`
- `cn()` used for conditional classes; `next/image` for images
- Tests generated and passing for in-scope units

## i18n Completion Checklist

- [ ] Section/page lives under the `app/[locale]/` segment
- [ ] All user-visible strings use translation keys (no hardcoded JSX text)
- [ ] New keys added to **all 12** `messages/*` files with identical structure

## SEO Completion Checklist

- [ ] Every `page.tsx` exports `metadata` or `generateMetadata` — the harness
      (`npm run check:harness`, predicate 10) fails any non-redirect page without it
- [ ] Localized `Seo.*` title/description keys added to every `messages/*` file
- [ ] `src/config/site.ts` stays the single source of SEO facts

## Handoff

```yaml
from: scaffold
to: validator
objective: Validate generated section implementation
changed_surfaces:
  - src/block/Feature.tsx
  - messages/*.json
verification_run:
  - npm run lint: pass
  - npm run test:run: pass
risks:
  - none
follow_up_owner: docs
```

Receiving agent restates assumptions before acting.
