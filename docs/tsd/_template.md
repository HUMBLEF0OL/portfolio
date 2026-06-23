# <Feature> — Technical Specification

> Bootstrap TSD. Generated from `docs/brd/<feature>.md` via `/tsd`. Reviewed by
> humans. Consumed by `/plan` to produce the implementation plan.

## Overview & scope

Short statement of what is being built and what is explicitly out.

## Architecture

High-level architecture on this stack — Next.js App Router (Server/Client
split), next-intl locale routing, Tailwind v4 CSS-first design tokens. See
`docs/ARCHITECTURE.md` and `docs/PACKAGES.md`. Diagram optional.

## Routes & navigation

Route table: path · purpose · primary components. Note any new `[locale]`
segments and whether the page needs `generateMetadata`.

## Components inventory

- **UI primitives** consumed (from `src/components/ui/*`)
- **Page sections** introduced (under `src/block/*`)
- **Shared components** introduced (under `src/components/*`)

## Content & i18n

Translation keys to add (namespace + keys) across all 12 `messages/*` files, and
any static content in `src/data/*.json`.

## SEO

Metadata/canonical/hreflang impact; whether `site.ts`, `sitemap.ts`, or
`generateMetadata` change.

## Error & empty states

How each surface degrades.

## Test plan

- Unit/component tests (Vitest + Testing Library) — what to cover
- E2E tests (Playwright) — happy path + critical edge

## Open questions

Anything the BRD did not answer.
