# Agentic Workflow Harness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the starter boilerplate's agentic workflow harness into this portfolio, adapted to its real stack (Next 15 App Router · React 19 · TS strict · Tailwind v4 CSS-first · next-intl 12 locales · shadcn/ui · emailjs), ending with `npm run check:harness` exit 0 and all verification gates green.

**Architecture:** Five layers + a checker contract, landed in 6 phases that each end green and committable. Source of all copied/adapted files: `E:\Projects and Learning\boilerplate\starter`. Husky is activated **only in Phase 6** (its `pre-commit` runs `check-harness`, which needs the complete file set). Through Phases 1–5 the checker scripts are run manually.

**Tech Stack:** Node ≥20.19 (`.nvmrc` 22), ESLint 9 flat config, Vitest 4 + Testing Library + jsdom, Playwright, Husky 9 + commitlint + lint-staged + Prettier, next-intl, Next 15.3.

**Design spec:** `docs/superpowers/specs/2026-06-23-agentic-workflow-harness-design.md` (authoritative; this plan implements it).

## Global Constraints

- **Stack is fixed.** Next 15.3.4 / React 19 / next-intl 4 / Tailwind v4 CSS-first. NO new runtime dependencies; all additions are `devDependencies`. NO `tailwind.config.*`.
- **i18n:** 12 locales `['en','es','fr','it','pt','ru','ja','ko','zh','ar','hi','de']`, defaultLocale `'en'` (from `src/i18n/routing.ts`). Any new user-facing copy MUST be added to **all 12** `messages/<locale>.json` via the `add-translations` discipline. `siteConfig.locales`/`defaultLocale` MUST mirror `routing.ts` exactly.
- **Site URL:** `siteConfig.url` MUST equal `https://humblefool.vercel.app/` (the value already in root `layout.tsx` `metadataBase`). Do NOT create a second source of truth.
- **Husky-last:** Do NOT add a `prepare: husky` script or create `.husky/` until Phase 6.
- **Co-modification gate:** once active (Phase 6), every commit touching `src/**` must also stage `PROGRESS.md`. From Phase 2 onward, stage `PROGRESS.md` with any `src/**` change so history is retroactively gate-clean. Escape hatch: `SKIP_STATE_CHECK=1`.
- **Verification before Done:** never mark a phase complete without running its gate commands and seeing them pass.
- **Dropped from starter:** auth, proxy, api, db, migrations, data-fetching, state-management, forms, validation, figma, skill-master/test-designer/tester, `reset.mjs`/clean-slate, `llms.txt`, `routes.ts`/`seoRoutes`, `ai`/`verification` SEO config fields.

---

## File Structure (what gets created/modified)

**Created — repo root governance (Layer A):** `AGENTS.md`, `CONSTRAINTS.md`, `PROGRESS.md`, `DECISIONS.md`, `INITIALIZATION.md`, `CHANGELOG.md`.
**Created — docs harness (Layer B):** `docs/ARCHITECTURE.md`, `docs/WORKFLOWS.md`, `docs/AGENT_OPS.md`, `docs/VERIFICATION.md`, `docs/PACKAGES.md`, `docs/archive/progress/README.md`, `docs/archive/decisions/README.md`, `docs/plans/_template.md`, `docs/specs/_format.md`(or keep existing), `docs/tsd/_template.md`, `docs/brd/_format.md`, `.gitkeep`s.
**Created — `.claude/` (Layer C):** `agents/{docs,scaffold,validator,updater}.md`; `commands/{converge,plan,tsd,review,validate,scaffold,docs}.md`; `skills/{architecture,components,i18n,seo,design-tokens,testing,error-handling,security,routing,context7}/SKILL.md` (10 added); `settings.json`, `settings.local.json`, `agent-memory/validator/MEMORY.md` + `.gitkeep`; `.mcp.json` (repo root).
  - **Pre-existing, keep:** `.claude/skills/{add-section,add-shadcn-ui,add-translations}` (verify present).
**Created — enforcement (Layer D):** `scripts/check-harness.mjs`, `scripts/check-co-modification.mjs`, `scripts/check-co-modification.test.mjs`, `scripts/check-updates.js`; `eslint.config.mjs`, `.prettierrc`, `.commitlintrc.json`, `.nvmrc`, `vitest.config.ts`, `vitest.setup.ts`, `playwright.config.ts`, `e2e/example.spec.ts`, `src/lib/utils.test.ts`; `.husky/pre-commit`, `.husky/commit-msg` (Phase 6).
**Created — SEO (Layer E):** `src/config/site.ts`, `src/config/ARCHITECTURE.md`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/manifest.ts`, 8 more `src/<dir>/ARCHITECTURE.md`.
**Modified:** `package.json` (scripts/engines/lint-staged/devDeps), `src/app/layout.tsx` (reconcile metadata to `site.ts`), `src/app/[locale]/layout.tsx` (+`generateStaticParams`+`setRequestLocale`), `src/app/[locale]/page.tsx` (+`generateMetadata`), all 12 `messages/*.json` (SEO keys).

---

## Phase 1 — Enforcement tooling + deps (NO husky)

**Goal:** dev tooling installed, baseline green, checker scripts present (later-phase predicates may be red — verified manually). Source files under `E:\Projects and Learning\boilerplate\starter`.

**Files:**
- Modify: `package.json`
- Create: `eslint.config.mjs`, `.prettierrc`, `.commitlintrc.json`, `.nvmrc`, `vitest.config.ts`, `vitest.setup.ts`, `playwright.config.ts`, `e2e/example.spec.ts`, `src/lib/utils.test.ts`, `scripts/check-harness.mjs`, `scripts/check-co-modification.mjs`, `scripts/check-co-modification.test.mjs`, `scripts/check-updates.js`

- [ ] **Step 1: Write `.nvmrc`** — content: `22` (single line). Satisfies predicate 3 once `engines.node` is `>=20.19.0`.

- [ ] **Step 2: Copy the four scripts** from starter `scripts/` verbatim, with these adaptations to `check-harness.mjs`:
  - Predicate 12 `SEO_SURFACES`: drop `'src/app/llms.txt/route.ts'` → `['src/app/robots.ts','src/app/sitemap.ts','src/app/manifest.ts']`.
  - Predicate 13 `required` array: drop `'verification'` and `'ai'` → `['defaultLocale','locales','ogImage','ogLocaleMap','trailingSlash','organization']`.
  - Predicate 15 (`seoRoutes excludes private route keys`): **delete the entire `check('seoRoutes excludes private keys', …)` block** and its `PRIVATE_ROUTE_KEYS` const (no `routes.ts` in portfolio).
  - Keep everything else verbatim (predicates 1–11, 14; report loop). `check-co-modification.mjs`, `check-co-modification.test.mjs`, `check-updates.js` copied verbatim.

- [ ] **Step 3: Write `eslint.config.mjs`** — start from starter's (the `no-restricted-syntax` page rule, `no-console`/`no-var`/`prefer-const`, test override, `ignores: ['scripts/**']`). **Resolve the Next-15 flat-config import empirically** (risk noted in spec): try `import nextConfig from 'eslint-config-next'` first; if it is not a flat array under the installed version, use the `FlatCompat` shim:
  ```js
  import { FlatCompat } from '@eslint/eslintrc'
  const compat = new FlatCompat({ baseDirectory: import.meta.dirname })
  // ...spread ...compat.extends('next/core-web-vitals', 'next/typescript')
  ```
  Decide in Step 8 by running `npm run lint`. Add `@eslint/eslintrc` to devDeps only if the shim is needed.

- [ ] **Step 4: Write `.prettierrc`** verbatim from starter (semi false, singleQuote, plugin `prettier-plugin-tailwindcss`). Write `.commitlintrc.json` verbatim from starter.

- [ ] **Step 5: Write `vitest.config.ts` / `vitest.setup.ts` / `playwright.config.ts`** verbatim from starter. In `vitest.config.ts` coverage.exclude, drop `'src/app/api/**'` and `'src/services/**'` lines (no such dirs here) — harmless to keep, but trim for accuracy.

- [ ] **Step 6: Write the sample unit test** `src/lib/utils.test.ts` for `cn()`:
  ```ts
  import { describe, it, expect } from 'vitest'
  import { cn } from './utils'

  describe('cn', () => {
    it('merges class names', () => {
      expect(cn('a', 'b')).toBe('a b')
    })
    it('dedupes conflicting tailwind classes (last wins)', () => {
      expect(cn('p-2', 'p-4')).toBe('p-4')
    })
    it('drops falsy values', () => {
      expect(cn('a', false, undefined, null, 'b')).toBe('a b')
    })
  })
  ```
  And `e2e/example.spec.ts` (so `test:e2e` has a target; not run in gates):
  ```ts
  import { test, expect } from '@playwright/test'

  test('home redirects to a locale and renders', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/en/)
  })
  ```

- [ ] **Step 7: Edit `package.json`** — add `"engines": { "node": ">=20.19.0" }`; add `"type": "module"` ONLY if it does not break Next config loading (Next 15 `next.config.ts` — verify build in Step 8; if it breaks, omit `type:module` and ensure scripts are `.mjs`). Change `"lint": "next lint"` → `"lint": "eslint ."`. Add scripts: `check:harness`, `typecheck` (`tsc --noEmit`), `format`, `format:check`, `lint:fix`, `test` (`vitest`), `test:run` (`vitest --run`), `test:e2e` (`playwright test`), `test:gates` (`node scripts/check-co-modification.test.mjs`), `update:check`. Add `lint-staged` block (verbatim from starter). Add devDeps: `husky@^9`, `@commitlint/cli`, `@commitlint/config-conventional`, `lint-staged`, `prettier`, `prettier-plugin-tailwindcss`, `eslint@^9`, `eslint-config-next@15.3.4`, `@next/eslint-plugin-next@15.3.4`, `vitest`, `@vitejs/plugin-react-swc`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `@playwright/test`. **Do NOT add `prepare: husky`.** Pin `eslint-config-next` to the Next version (15.3.4) to avoid flat-config drift.

- [ ] **Step 8: Install + verify baseline.** Run `npm install`. Then `npm run lint` — fix any errors in existing `src/**` (likely `no-console`, `prefer-const`, `@next/next/no-img-element`); if a rule is too aggressive for pre-existing code, align it (e.g. downgrade to `warn`) rather than mass-editing. Run `npm run typecheck`, `npm run test:run` (cn test passes), `npm run build`, `node scripts/check-co-modification.test.mjs` (5/5). `node scripts/check-harness.mjs` will report failures for not-yet-created files — **that is expected**; confirm the only failures are the Phase 2–5 predicates.

- [ ] **Step 9: Commit.**
  ```bash
  git checkout -b feat/agentic-harness
  git add -A
  git commit -m "chore: add enforcement tooling, test setup, and checker scripts"
  ```
  (No husky yet, so plain commit. `src/lib/utils.test.ts` + `e2e/` are the only `src/**` touches; no PROGRESS.md exists yet — this is the intentional Phase-1 exemption per spec.)

**Gate:** `npm install` clean · `lint`/`typecheck`/`test:run`/`build` pass · `test:gates` 5/5 · `check-harness` fails ONLY on Phase 2–5 predicates.

---

## Phase 2 — Governance & state files

**Goal:** Layer A files exist and pass predicates 2,5,6,7,8. Source: starter root files + `scripts/clean-slate/` snapshots (the clean template variants of PROGRESS/DECISIONS/CHANGELOG).

**Files (create):** `AGENTS.md`, `CONSTRAINTS.md`, `PROGRESS.md`, `DECISIONS.md`, `INITIALIZATION.md`, `CHANGELOG.md`

- [ ] **Step 1: `AGENTS.md`** — adapt starter `AGENTS.md` (96 lines). Changes: Project Identity → "Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind v4 (CSS-first) · next-intl (12 locales) · shadcn/ui · Node pinned in `.nvmrc`." Per-Skill Guidance Index table → list ONLY portfolio skills: architecture, components, i18n, seo, design-tokens, testing, error-handling, security, routing, context7, add-section, add-shadcn-ui, add-translations. Boundary Contract → **drop** the Proxy/Auth rows; keep Docs agent, Validator; add a row that i18n owns locale/messages sync and design-tokens owns the `@theme`+angular-clip system. Keep "Where the rest lives" + "Working agreement" tables. **MUST stay ≤120 lines** (predicate 2) — verify with `node scripts/check-harness.mjs` after.

- [ ] **Step 2: `CONSTRAINTS.md`** — adapt starter. **Keep** MUST NOTs: `'use client'` in `page.tsx` `[auto]`, `no var` `[auto]`, `no console.log` `[auto]`, `no any`, `no dangerouslySetInnerHTML`, named exports only (except page/layout), no business logic in `src/components/ui/`, no imports outside `src/`, no marking Done without verification. **Add** portfolio MUST NOTs: no hardcoded user-facing strings (all copy via next-intl) `[review][src:i18n]`; MUST NOT add `tailwind.config.*` (Tailwind v4 CSS-first) `[review][src:tailwind-v4]`. **Add** MUSTs: use `cn()` for conditional classes; use `next/image`; use `@/i18n/navigation` wrappers not raw `next/*`; keep all 12 locale files in sync. **Drop** auth-provider/proxy-matcher/API-route/db-schema rules and their human-in-loop gates. Keep human-in-loop gates: new packages, replacing core packages, multi-file refactors, root instruction edits, deployment. Keep the enforcement table (point rows at `eslint.config.mjs`, `check-harness.mjs`, `check-co-modification.mjs`, `.husky/pre-commit`). MUST contain literal `MUST` and `MUST NOT` (predicate 6).

- [ ] **Step 3: `PROGRESS.md`** — base on `scripts/clean-slate/PROGRESS.md`. MUST contain exact headers (predicate 5): `## Current Focus`, `## Done`, `## In Progress`, `## Blocked`, `## Next Up`, `## Decisions & Notes`, `## Archive`. Seed `## Current Focus` with: "Implementing the agentic workflow harness (spec 2026-06-23). Phases 1–N landed." Seed `## Next Up` with ≥1 real item (e.g. "Wire husky enforcement (Phase 6)"). Archive section points to `docs/archive/progress/README.md`.

- [ ] **Step 4: `DECISIONS.md`** — base on `scripts/clean-slate/DECISIONS.md`. MUST contain `## Decision Log` and `## Archive` (predicate 7). Seed Decision Log with the locked decisions from the spec: adapted full harness, dropped layers (auth/proxy/api/db/figma/data-libs), CSS-first design-tokens rewrite, right-sized SEO (no llms.txt/ai/verification/seoRoutes), husky-last phasing, `engines.node>=20.19.0`+`.nvmrc 22`, `siteConfig.url=https://humblefool.vercel.app/`.

- [ ] **Step 5: `INITIALIZATION.md`** — adapt starter. MUST contain exact markers (predicate 8): `## 1. Can start`, `## 2. Can test`, `## 3. Can see progress`, `## 4. Can pick up next steps`. Commands: `npm install`, `npm run dev`; `npm run test:run`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run check:harness`; "read PROGRESS.md"; "read PROGRESS.md `## Next Up`".

- [ ] **Step 6: `CHANGELOG.md`** — base on `scripts/clean-slate/CHANGELOG.md`; keep-a-changelog with an `## [Unreleased]` section noting the harness addition.

- [ ] **Step 7: Verify + commit.** `node scripts/check-harness.mjs` — predicates 1,2,5,6,7,8 now green (1 needs docs/ files too, still red until Phase 3). Confirm AGENTS.md ≤120 and topic-doc/SEO predicates still the only reds.
  ```bash
  git add AGENTS.md CONSTRAINTS.md PROGRESS.md DECISIONS.md INITIALIZATION.md CHANGELOG.md
  git commit -m "docs: add governance and cross-session state files"
  ```

**Gate:** predicates 2,5,6,7,8 green; AGENTS.md ≤120 lines.

---

## Phase 3 — Docs harness

**Goal:** Layer B docs exist; predicates 1 (docs portion) and 9 (topic docs ≤170) green. Source: starter `docs/`.

**Files (create):** `docs/ARCHITECTURE.md`, `docs/WORKFLOWS.md`, `docs/AGENT_OPS.md`, `docs/VERIFICATION.md`, `docs/PACKAGES.md`, `docs/archive/progress/README.md`, `docs/archive/decisions/README.md`, `docs/plans/_template.md`, `docs/tsd/_template.md`, `docs/brd/_format.md`, `.gitkeep`s as in starter.

- [ ] **Step 1: `docs/ARCHITECTURE.md`** — rewrite for portfolio: App Router layout (root `src/app/layout.tsx` = html/body/providers, `[locale]/` segment, redirect-only `src/app/page.tsx`, `not-found.tsx`); `src/block/` page sections (PascalCase); `src/components/ui/` shadcn primitives + `src/components/` shared; `src/data/*.json` content keyed to translations; `src/i18n/` (routing/request/navigation); `messages/` 12 catalogs; design system in `src/app/globals.css` (`@theme`, angular-clip utilities, `AngularFrame`); `src/lib/utils.ts` `cn()`; `src/config/site.ts` (added Phase 5). No line cap (not a topic doc) but keep tight.

- [ ] **Step 2: `docs/WORKFLOWS.md`** (≤170) — dev flow (`npm run dev` turbopack), conventional-commit git conventions, branch naming, testing flow (vitest unit + playwright e2e), package policy (human approval for new deps; all dev-only here). Adapt starter, drop auth/proxy/migrations sections.

- [ ] **Step 3: `docs/AGENT_OPS.md`** (≤170) — Standard Handoff Contract, Session Protocol (clock-in: read PROGRESS/AGENTS/CONSTRAINTS; clock-out: update PROGRESS, verification_run), agent-memory rules (write to `.claude/agent-memory/`, never personal session memory). Adapt starter; drop figma agent references.

- [ ] **Step 4: `docs/VERIFICATION.md`** (≤170) — Fresh Session Test, ACID commit discipline, verification command set (`lint`,`typecheck`,`test:run`,`build`,`check:harness`,`test:gates`), Archiving Growing State Files procedure. Adapt starter.

- [ ] **Step 5: `docs/PACKAGES.md`** — mirror portfolio `package.json` exact stack + versions (deps + the new devDeps after Phase 1). Adapt starter format.

- [ ] **Step 6: Archive READMEs + templates** — `docs/archive/progress/README.md` and `docs/archive/decisions/README.md` (source-map stubs from starter clean-slate). `docs/plans/_template.md`, `docs/tsd/_template.md`, `docs/brd/_format.md` from starter. Add `.gitkeep` where starter has them. (Existing `docs/superpowers/{plans,specs}` coexists — do not touch.)

- [ ] **Step 7: Verify + commit.** `node scripts/check-harness.mjs` — predicates 1 and 9 now green (only SEO predicates 10,12,13,14 + predicate 4 remain red). Check each topic doc line count ≤170.
  ```bash
  git add docs/
  git commit -m "docs: add docs harness (architecture, workflows, agent-ops, verification, packages)"
  ```

**Gate:** predicates 1, 9 green; topic docs ≤170 lines each.

---

## Phase 4 — `.claude/` orchestration

**Goal:** agents, commands, skills, settings, mcp config in place. No checker predicate depends on these, but they are core to the harness. Source: starter `.claude/` + `.mcp.json`.

**Files (create):** `.claude/agents/{docs,scaffold,validator,updater}.md`; `.claude/commands/{converge,plan,tsd,review,validate,scaffold,docs}.md`; `.claude/skills/{architecture,components,i18n,seo,design-tokens,testing,error-handling,security,routing,context7}/SKILL.md`; `.claude/settings.json`; `.claude/settings.local.json`; `.claude/agent-memory/validator/MEMORY.md` + `.gitkeep`; `.mcp.json`.

- [ ] **Step 1: Confirm existing skills.** Verify `.claude/skills/{add-section,add-shadcn-ui,add-translations}` exist (keep as-is). If `.claude/` already has a `settings.json`/`settings.local.json` from this repo, MERGE rather than overwrite.

- [ ] **Step 2: Agents** — copy `docs`, `scaffold`, `validator`, `updater` from starter, adapting: remove all `AUTH_PATTERN.md`/proxy/api/migrations-skill references; trim each agent's skill list to the portfolio skill set; `scaffold` file-creation order → `src/block/` sections + `src/components/` (no services/stores/API routes), keep i18n + SEO completion checklists; `validator` keep i18n convention checks + point security checks at the portfolio `security` skill; `updater` keep the audit flow + reference `docs/PACKAGES.md` (drop migrations-skill dep). **Do NOT** copy `figma.md`.

- [ ] **Step 3: Commands** — copy `converge` verbatim (stack-neutral). Copy `plan`, `tsd`, `review`, `validate`, `scaffold`, `docs`, adapting `review/validate/scaffold/docs` references to the portfolio agents/skills. **Do NOT** copy `sync-tokens.md`.

- [ ] **Step 4: Skills (10 added)** — copy + adapt each from starter:
  - `architecture`, `components`, `routing`, `i18n`, `error-handling`, `security`, `context7`, `testing`, `seo` — adapt code examples to portfolio patterns (Server/Client split, `@/i18n/navigation`, `next/image`, shadcn `src/components/ui/`, vitest+testing-library, next-intl `getTranslations`/`useTranslations`). `seo` skill points at `src/config/site.ts` + `robots/sitemap/manifest` (no llms.txt/JsonLd/seoRoutes).
  - `design-tokens` — **rewrite** for the CSS-first `@theme` + angular-clip utility system (read `src/app/globals.css` and document the color tokens, `angular-*` utilities, `AngularFrame` corners). Drop all Figma/token-sync content.

- [ ] **Step 5: settings.json** — adapt starter: keep `PostToolUse` `lint:fix` on `Edit|Write(src/**)` and `test:run` on `src/**/*.test.*`; keep `SessionEnd` async `typecheck`. **Drop** the `src/lib/store/**` and `src/lib/api/**` matchers. If a repo `settings.json` exists, merge.

- [ ] **Step 6: settings.local.json** — `{ "enabledMcpjsonServers": ["context7","playwright","github","filesystem"] }` (no figma).

- [ ] **Step 7: .mcp.json** (repo root) — context7, playwright, github, filesystem servers from starter; **remove** the figma server block.

- [ ] **Step 8: agent-memory** — `.claude/agent-memory/validator/MEMORY.md` placeholder (from clean-slate) + `.gitkeep`.

- [ ] **Step 9: Verify + commit.** `node scripts/check-harness.mjs` (unchanged from Phase 3 — these files aren't checked). `npm run lint`/`typecheck` still green.
  ```bash
  git add .claude/ .mcp.json
  git commit -m "chore: add .claude orchestration (agents, commands, skills, mcp, settings)"
  ```

**Gate:** lint/typecheck green; no figma/sync-tokens/dropped-skill artifacts present.

---

## Phase 5 — SEO module + per-module ARCHITECTURE.md

**Goal:** predicates 4, 10, 12, 13, 14 green (11 already green; reconcile only). Source: starter SEO files, adapted to portfolio.

**Files:**
- Create: `src/config/site.ts`, `src/config/ARCHITECTURE.md`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/manifest.ts`, and `ARCHITECTURE.md` in each existing top-level `src/` dir.
- Modify: `src/app/layout.tsx`, `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`, all 12 `messages/*.json`.

- [ ] **Step 1: Confirm src/ top-level dirs.** Run a dir listing of `src/`; spec expects 8 (`app, assets, block, components, data, i18n, lib, styles`). Predicate 4 requires `ARCHITECTURE.md` in each + the new `src/config/` = **9 total**. Adjust count to actual listing.

- [ ] **Step 2: `src/config/site.ts`** — lean, no env module (portfolio has none). Single source of truth reconciled with existing `layout.tsx`:
  ```ts
  export const siteConfig = {
    name: 'HUMBLEF0OL',
    description:
      'Step into the Grid — the digital frontier of HUMBLEF0OL. Cybernetic UIs, modular code, and glitch-crafted experiences.',
    url: 'https://humblefool.vercel.app/',
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'ar', 'hi', 'de'],
    ogImage: '/og-image.png',
    ogLocaleMap: {
      en: 'en_US', es: 'es_ES', fr: 'fr_FR', it: 'it_IT', pt: 'pt_BR', ru: 'ru_RU',
      ja: 'ja_JP', ko: 'ko_KR', zh: 'zh_CN', ar: 'ar_AR', hi: 'hi_IN', de: 'de_DE',
    },
    twitter: '@HUMBLEFOOL',
    trailingSlash: false,
    organization: {
      name: 'Amit Rana',
      logo: '/og-image.png',
      sameAs: [] as string[],
    },
  } as const
  ```
  `locales`/`defaultLocale` MUST equal `routing.ts` (predicate 13). NO `ai`/`verification` fields.

- [ ] **Step 3: `src/app/robots.ts`** — simplified (no private paths, no AI-crawler gating):
  ```ts
  import type { MetadataRoute } from 'next'
  import { siteConfig } from '@/config/site'

  export default function robots(): MetadataRoute.Robots {
    const base = siteConfig.url.replace(/\/$/, '')
    return {
      rules: [{ userAgent: '*', allow: '/' }],
      sitemap: `${base}/sitemap.xml`,
      host: base,
    }
  }
  ```

- [ ] **Step 4: `src/app/sitemap.ts`** — one entry per (route × locale) with hreflang alternates; only the home route exists:
  ```ts
  import type { MetadataRoute } from 'next'
  import { siteConfig } from '@/config/site'

  const base = siteConfig.url.replace(/\/$/, '')
  const localizedUrl = (locale: string) =>
    locale === siteConfig.defaultLocale ? `${base}/${locale}` : `${base}/${locale}`

  export default function sitemap(): MetadataRoute.Sitemap {
    return siteConfig.locales.map((locale) => {
      const languages: Record<string, string> = {}
      for (const l of siteConfig.locales) languages[l] = `${base}/${l}`
      languages['x-default'] = `${base}/${siteConfig.defaultLocale}`
      return {
        url: localizedUrl(locale),
        lastModified: new Date('2026-06-23'),
        changeFrequency: 'monthly',
        priority: 1,
        alternates: { languages },
      }
    })
  }
  ```
  (Use a fixed `lastModified` date string, not `new Date()`, to keep the build deterministic.)

- [ ] **Step 5: `src/app/manifest.ts`** — from starter, reading `siteConfig.name`/`description`; icons reference existing `public/` assets (verify filenames; use `/og-image.png` or an existing icon). Keep minimal.

- [ ] **Step 6: Reconcile `src/app/layout.tsx`** — import `siteConfig`; replace the hardcoded `metadataBase: new URL("https://humblefool.vercel.app/")` and `openGraph.url`/`siteName`/`title`/`description` literals to derive from `siteConfig` where they duplicate it. KEEP `metadataBase` present (predicate 11). Do NOT remove the rich OG/Twitter metadata; just route the duplicated facts through `siteConfig` so there's one source of truth. Leave the pre-existing `params`/`locale` destructure untouched (spec out-of-scope note).

- [ ] **Step 7: `src/app/[locale]/layout.tsx`** — add static rendering (predicate 14):
  ```ts
  import { setRequestLocale } from 'next-intl/server'
  import { routing } from '@/i18n/routing'
  // ...
  export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
  }
  ```
  In the component, after resolving `locale` and the `hasLocale` guard, call `setRequestLocale(locale)` BEFORE any next-intl API. Keep existing Header/main/Footer structure.

- [ ] **Step 8: `src/app/[locale]/page.tsx`** — add localized `generateMetadata` (predicate 10):
  ```ts
  import type { Metadata } from 'next'
  import { getTranslations, setRequestLocale } from 'next-intl/server'
  import { siteConfig } from '@/config/site'

  export async function generateMetadata({
    params,
  }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'Seo' })
    return {
      title: t('home.title'),
      description: t('home.description'),
      alternates: {
        canonical: `${siteConfig.url.replace(/\/$/, '')}/${locale}`,
        languages: Object.fromEntries(
          siteConfig.locales.map((l) => [l, `${siteConfig.url.replace(/\/$/, '')}/${l}`])
        ),
      },
    }
  }
  ```
  Also call `setRequestLocale(locale)` in `HomePage` if it takes params (the page currently takes none — add `params` and call it, or rely on the layout's call; verify static export works in build).

- [ ] **Step 9: SEO translation keys — all 12 locales.** Add a `Seo` namespace with `home.title` and `home.description` to every `messages/<locale>.json`. Use the `add-translations` discipline; `en.json` is source of truth. English: title `"HUMBLEF0OL // Digital Interface Architect"`, description from `siteConfig.description`. Provide real (not English-copied) translations for the other 11 where feasible; at minimum keep the key structure identical across all 12.

- [ ] **Step 10: Per-module `ARCHITECTURE.md`** — one short file in each top-level `src/` dir (8 existing + `src/config/` = 9). Each: purpose + layout (2–10 lines). `src/config/ARCHITECTURE.md` MUST land here (with `site.ts`).

- [ ] **Step 11: Verify + commit.** `npm run lint`, `npm run typecheck`, `npm run build` (confirms static `[locale]` rendering + metadata compile), `npm run test:run`, `node scripts/check-harness.mjs` — predicates 4,10,12,13,14 now green; 11 stays green. Stage `PROGRESS.md` with the `src/**` changes (gate-clean history).
  ```bash
  git add src/ messages/ PROGRESS.md
  git commit -m "feat: add right-sized SEO module and per-module architecture docs"
  ```

**Gate:** predicates 4,10,11,12,13,14 green; build passes with localized metadata; all 12 locales have the `Seo` keys.

---

## Phase 6 — Checker finalization + activate enforcement + go-green

**Goal:** all 14 predicates green (15 removed); husky active; trial commit passes the hook chain. Definition of done.

**Files:** Modify `package.json` (`prepare`); create `.husky/pre-commit`, `.husky/commit-msg`.

- [ ] **Step 1: Finalize `check-harness.mjs`** — confirm the Phase-1 adaptations (predicates 12,13 trimmed; 15 removed) match the checker contract. Run `node scripts/check-harness.mjs` — expect **all green** now that Layers A/B/E exist. Fix any remaining red predicate at its source.

- [ ] **Step 2: Activate husky.** Add `"prepare": "husky"` to `package.json` scripts. Run `npm run prepare` (creates `.husky/_/`). Create `.husky/pre-commit` (verbatim from starter, but **remove the figma/sync-tokens NOTE comment block** at the bottom — keep lint-staged → check-harness → typecheck → check-co-modification). Create `.husky/commit-msg` verbatim (`npx commitlint --edit "$1"`). Ensure both are executable (`git update-index --chmod=+x .husky/pre-commit .husky/commit-msg` if needed on Windows/Git).

- [ ] **Step 3: Full verification set.**
  - `npm install` (clean)
  - `npm run lint` · `npm run typecheck` · `npm run test:run` · `npm run build` — all pass
  - `npm run check:harness` — exits 0 (all predicates green)
  - `npm run test:gates` — 5/5

- [ ] **Step 4: Trial commit through the hook chain.** Stage the Phase-6 files + a `PROGRESS.md` update (gate requires it if `src/**` staged; here only root/.husky change, but include PROGRESS.md update for the focus change). Commit with a conventional message and confirm `pre-commit` (lint-staged, check-harness, typecheck, co-modification) and `commit-msg` (commitlint) both pass:
  ```bash
  git add .husky/ package.json PROGRESS.md DECISIONS.md CHANGELOG.md
  git commit -m "feat: activate husky enforcement and finalize harness checker"
  ```
  If the commit is blocked, read the hook output, fix the cited predicate/rule, re-commit. Do NOT `--no-verify`.

- [ ] **Step 5: Update state files.** Mark the harness Done in `PROGRESS.md` `## Done` with the verification command results; move the Current Focus forward; add a `DECISIONS.md` entry if any implementation decision diverged from the spec. Commit (stage PROGRESS.md).

**Gate (definition of done):**
- `npm install` clean
- `npm run lint` · `typecheck` · `test:run` · `build` pass
- `npm run check:harness` exits 0 (all adapted predicates green)
- `npm run test:gates` passes
- A trial commit passes the husky `pre-commit` + `commit-msg` chain
- Fresh Session Test: governance + docs let a new agent recover state, rules, next steps

---

## Self-Review (spec coverage)

- Layer A (6 files) → Phase 2 ✓ · Layer B (docs) → Phase 3 ✓ · Layer C (.claude) → Phase 4 ✓ · Layer D (enforcement) → Phases 1 + 6 ✓ · Layer E (SEO) → Phase 5 ✓
- Checker contract: predicates 1–11,14 kept; 12,13 trimmed (Phase 1 edit); 15 removed (Phase 1 edit); all green by Phase 6 ✓
- Predicate 4 = 9 ARCHITECTURE.md (incl. `src/config/`) → Phase 5 Step 10 ✓
- Predicate 10 `[locale]/page.tsx` metadata, 14 static rendering, 11 reconcile → Phase 5 ✓
- 12-locale SEO keys → Phase 5 Step 9 ✓
- Husky-last ordering → enforced by Phase 6 gating ✓
- Dropped layers (auth/proxy/api/db/figma/data-libs/meta-skills/llms.txt/seoRoutes/reset) → excluded throughout ✓

## Open risks to resolve during execution (empirical)

1. **ESLint flat-config under Next 15.3** — may need `@eslint/eslintrc` `FlatCompat`. Resolve in Phase 1 Step 3/8.
2. **`"type": "module"`** in package.json vs Next 15 config loading — verify build; omit if it breaks.
3. **Existing-code lint baseline** — `eslint .` may surface violations (`no-console`, `no-img-element`); fix or align rules in Phase 1 Step 8.
4. **`public/` icon filenames** for manifest — verify before referencing (Phase 5 Step 5).
5. **Windows husky exec bit** — ensure hooks run (Phase 6 Step 2).
