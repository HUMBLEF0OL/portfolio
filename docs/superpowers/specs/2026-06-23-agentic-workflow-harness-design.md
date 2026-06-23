# Agentic Workflow Harness — Design Spec

**Date:** 2026-06-23
**Status:** Approved (brainstorming complete; ready for implementation plan)
**Source:** Adapted from `E:\Projects and Learning\boilerplate\starter` agentic harness.

## Goal

Bring the starter boilerplate's agentic workflow harness into this portfolio,
**adapted to the portfolio's real stack** (Next.js 15 App Router · React 19 ·
TypeScript strict · Tailwind v4 CSS-first · next-intl 12 locales · shadcn/ui ·
emailjs contact form). The starter targets a full-stack app (TanStack Query,
Zustand, ky, auth, proxy, migrations); those layers are dropped or rewritten so
the harness describes *this* project rather than the starter's.

The end state: a fresh agent session can read the repo, recover state and rules,
and contribute correctly; commits are gated by mechanical structural + quality
checks; and `npm run check:harness` exits 0.

## Scope decisions (locked during brainstorming)

1. **Harness scope:** Adapted full harness — all five layers, each adapted to the
   portfolio stack; stack-irrelevant skills dropped.
2. **Enforcement depth:** Full enforcement **including tests** (vitest +
   testing-library + playwright), git hooks (husky + commitlint + lint-staged +
   prettier), and structural checkers.
3. **Figma/tokens:** Drop the Figma pipeline (figma agent, figma MCP,
   `/sync-tokens`). Rewrite the `design-tokens` skill for the portfolio's
   CSS-first `@theme` + angular-clip utility system.
4. **MCP servers:** context7, playwright, github, filesystem (no figma).
5. **SEO:** Build a **right-sized** SEO module (robots/sitemap/manifest, lean
   `site.ts`, `metadataBase` + per-page metadata, static `[locale]` rendering).
   No `llms.txt`, ai-crawler fields, verification fields, or `seoRoutes`
   private-route machinery.

## Non-goals (explicitly dropped)

- Auth, proxy/middleware route-gating, API routes, database, migrations.
- Data-fetching (TanStack Query), client state (Zustand), HTTP client (ky),
  forms (react-hook-form), validation (zod) skills — the portfolio uses none of
  these libraries today. (If a future contact-form rewrite adds them, the
  corresponding skills can be ported then.)
- The skill-authoring meta-skills (`skill-master`, `skill-test-designer`,
  `skill-tester`).
- `llms.txt` route, AI-crawler/verification/organization-heavy SEO config, and
  the `seoRoutes` private-route guard (the portfolio has no private routes).
- Any change to the existing `docs/superpowers/` content.

## Execution approach

One cohesive harness on a feature branch, implemented in **phases that each end
green and committable** (see Architecture → Phasing). Landing piecemeal on
`master` is rejected: `check-harness` would be red between commits and the
co-modification gate (`src/**` change ⇒ `PROGRESS.md` staged) would fight every
partial commit. A git worktree is unnecessary — this is additive scaffolding,
not a risky refactor of existing code.

---

## Architecture

The harness has five layers plus a checker contract that ties them together.

### Layer A — Governance & state files (repo root)

| File | Purpose | Key adaptation |
| --- | --- | --- |
| `AGENTS.md` | Index / source of truth, **≤120 lines** (predicate 2) | Project identity = Next 15 + next-intl + shadcn + Tailwind v4. Per-skill guidance index lists the *portfolio* skills (§ Layer C). Boundary contract drops auth/proxy/api rows; keeps i18n, seo, design-tokens, components, architecture. Pointers to `CONSTRAINTS.md`, `docs/*`, `PROGRESS.md`, `DECISIONS.md`. |
| `CONSTRAINTS.md` | Hard MUST / MUST NOT + approval gates (predicate 6: contains `MUST` and `MUST NOT`) | **Keep:** no `'use client'` in `src/app/**/page.tsx`; no `var`; no `console.log`; no `any`; no `dangerouslySetInnerHTML`; named exports only (except `page.tsx`/`layout.tsx`); no business logic in `src/components/ui/`; no imports from outside `src/`; **no hardcoded user-facing strings (all copy via next-intl)**; use `cn()` for conditional classes; **no `tailwind.config.*` (Tailwind v4 CSS-first)**; use `next/image`; use `@/i18n/navigation` wrappers not raw `next/*`; **keep all 12 locale files in sync**; don't mark work Done without recorded verification. **Drop:** auth-provider, proxy-matcher, API-route, db-schema rules. Human-in-loop gates: new packages, replacing core packages, multi-file refactors, root instruction edits, deployment. |
| `PROGRESS.md` | Cross-session volatile state (predicate 5) | Required headers, exact text: `## Current Focus`, `## Done`, `## In Progress`, `## Blocked`, `## Next Up`, `## Decisions & Notes`, `## Archive`. Seeded with a real Current Focus and ≥1 Next Up item. |
| `DECISIONS.md` | Durable "why" (predicate 7) | Headers `## Decision Log` and `## Archive`. Seeded with the decisions from this spec (stack adaptations, dropped layers). |
| `INITIALIZATION.md` | 4 startup-readiness conditions (predicate 8) | Headers `## 1. Can start`, `## 2. Can test`, `## 3. Can see progress`, `## 4. Can pick up next steps`. Commands adapted: `npm install`, `npm run dev`, `npm run test:run`, `npm run lint`, `npm run typecheck`, `npm run build`. |
| `CHANGELOG.md` | Keep-a-changelog | Seeded with an `Unreleased` section. |
| `README.md` | Already present | Required by predicate 1; left as-is (augment only if needed). |

### Layer B — Docs harness (`docs/`)

Topic docs (`WORKFLOWS.md`, `AGENT_OPS.md`, `VERIFICATION.md`) must each be
**≤170 lines** (predicate 9).

| File | Content |
| --- | --- |
| `docs/ARCHITECTURE.md` | Global architecture + key file locations: App Router layout, `src/block/` sections, `src/components/ui/`, `src/data/*.json`, `src/i18n/`, `messages/`, design system in `globals.css`. |
| `docs/WORKFLOWS.md` | Dev flow, git branch/commit conventions (conventional commits), testing, package policy. |
| `docs/AGENT_OPS.md` | Standard Handoff Contract, Session Protocol (clock-in/out), agent-memory rules. |
| `docs/VERIFICATION.md` | Fresh Session Test, ACID commit discipline, the verification command set, archival instructions. |
| `docs/PACKAGES.md` | Exact stack + versions mirrored from `package.json`. |
| `docs/archive/progress/README.md`, `docs/archive/decisions/README.md` | Archive source maps. |
| `docs/{plans,specs,tsd,brd}/` | Scaffolding with `_template.md` / `_format.md` placeholders, mirroring the starter. Coexists with the existing `docs/superpowers/{plans,specs}`. |

### Layer C — `.claude/` orchestration

**Agents** (`.claude/agents/`), orchestration-only, project memory:
- `docs` — doc-drift prevention; scope rewritten to portfolio doc surfaces (no `AUTH_PATTERN.md`).
- `scaffold` — generates sections/components; skill list trimmed to portfolio skills; file-creation order adapted (no services/stores/API routes; `src/block/` + `src/components/`); i18n + SEO completion checklists kept.
- `validator` — convention/quality/security/perf review; skill list trimmed; i18n convention checks kept; security checks point at the portfolio `security` skill.
- `updater` — dependency maintenance (keeps the `migrations`-style audit verbatim but without the migrations *skill* dependency; references `docs/PACKAGES.md`).
- **Dropped:** `figma`.

**Commands** (`.claude/commands/`):
- `/converge` (verbatim — it is stack-neutral), `/plan`, `/tsd`, `/review`, `/validate`, `/scaffold`, `/docs`.
- Adapt `/review`, `/validate`, `/scaffold`, `/docs` references to the portfolio agents/skills.
- **Dropped:** `/sync-tokens`.

**Skills** (`.claude/skills/`):
- **Keep existing:** `add-section`, `add-shadcn-ui`, `add-translations`.
- **Add (adapted):** `architecture`, `components`, `i18n`, `seo`, `design-tokens` (rewritten for the CSS-first `@theme` + angular-clip system), `testing`, `error-handling`, `security`, `routing`, `context7`.
- **Drop:** `auth`, `proxy`, `migrations`, `data-fetching`, `state-management`, `forms`, `validation`, `api`, `skill-master`, `skill-test-designer`, `skill-tester`.

**Config:**
- `.claude/settings.json` — `PostToolUse` hooks: `lint:fix` on `Edit|Write` of `src/**`; `test:run` on `src/**/*.test.*`. `SessionEnd` hook: `typecheck` (async). Starter's `src/lib/store/**` and `src/lib/api/**` matchers dropped.
- `.claude/settings.local.json` — `enabledMcpjsonServers`: context7, playwright, github, filesystem.
- `.claude/agent-memory/` — seeded (e.g. `validator/MEMORY.md` placeholder, `.gitkeep`).
- `.mcp.json` (repo root) — context7, playwright, github, filesystem servers (figma removed).

### Layer D — Enforcement layer

**Scripts** (`scripts/`):
- `check-harness.mjs` — adapted (see § Checker contract).
- `check-co-modification.mjs` + `check-co-modification.test.mjs` — kept; the one
  rule is `src/**` staged ⇒ `PROGRESS.md` staged (ACID Atomicity), with
  `SKIP_STATE_CHECK=1` escape hatch.
- `check-updates.js` — kept for the `updater` agent.

**Git hooks** (`.husky/`) — **activated only in Phase 6** (see Phasing; activating
earlier would self-block commits):
- `pre-commit`: `npx lint-staged` → `node scripts/check-harness.mjs` →
  `npm run typecheck` (skippable via `SKIP_TYPECHECK=1`) →
  `node scripts/check-co-modification.mjs`.
- `commit-msg`: `npx commitlint --edit "$1"`.

**Config files:**
- `.commitlintrc.json` (conventional commits, type-enum, lower-case subject).
- `.prettierrc` (semi false, single quotes, `prettier-plugin-tailwindcss`).
- `.nvmrc` — Node major that satisfies `engines.node` (predicate 3). Set
  `engines.node` to `>=20.19.0` in `package.json` and `.nvmrc` to a satisfying
  LTS major (e.g. `22`).
- `eslint.config.mjs` — **flat config** migrating off `next lint`. Extends
  `eslint-config-next`; encodes the `[auto]` CONSTRAINTS rules: `no-var`,
  `no-console` (allow `warn`/`error`), and a `no-restricted-syntax` rule banning
  `'use client'` in `src/app/**/page.tsx`.

**`package.json` changes:**
- Add `engines.node`, a `lint-staged` block, and scripts: `check:harness`,
  `typecheck`, `format`, `format:check`, `lint:fix`, `test`, `test:run`,
  `test:e2e`, `prepare` (husky). Keep `dev`/`build`/`start`; change `lint` from
  `next lint` to `eslint .`.
- **New devDependencies:** `husky`, `@commitlint/cli`,
  `@commitlint/config-conventional`, `lint-staged`, `prettier`,
  `prettier-plugin-tailwindcss`, `eslint`, `eslint-config-next`, `vitest`,
  `@vitejs/plugin-react-swc`, `jsdom`, `@testing-library/react`,
  `@testing-library/jest-dom`, `@testing-library/user-event`,
  `@playwright/test`.

**Test setup:** `vitest.config.ts`, `vitest.setup.ts`, `playwright.config.ts`,
`e2e/` dir, and **at least one real passing unit test** (e.g. a test for
`cn()` in `src/lib/utils.ts`) so INITIALIZATION condition 2 holds.

### Layer E — Right-sized SEO module

- `src/config/site.ts` — lean config: `name`, `url`, `defaultLocale`, `locales`
  (must equal `routing.ts`), `ogImage`, `ogLocaleMap`, `trailingSlash`,
  `organization`. **No** `ai`/`verification` fields.
- `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/manifest.ts` (each reads
  `site.ts`). **No** `llms.txt` route.
- `src/app/layout.tsx` — **already sets `metadataBase` + rich OG/Twitter metadata
  (predicate 11 already green).** The task is to **reconcile** this hardcoded
  metadata with `site.ts` so there is a single source of truth; `site.url` MUST
  equal the existing `https://humblefool.vercel.app/`. Do not introduce a second
  source of truth.
- `src/app/[locale]/page.tsx` — add `generateMetadata` (localized
  title/description via next-intl). Currently exports only `HomePage` with no
  metadata, so **predicate 10 is red for this page until this lands.** Root
  `src/app/page.tsx` is redirect-only ⇒ exempt.
- `src/app/[locale]/layout.tsx` — **confirmed to have neither
  `generateStaticParams` nor `setRequestLocale` today (only a `hasLocale`
  guard).** Add both: `generateStaticParams` returning
  `routing.locales.map((locale) => ({ locale }))`, and `setRequestLocale(locale)`
  called before any next-intl API. Predicate 14 is red until this lands.
- New SEO copy keys added to **all 12** message files via the `add-translations`
  discipline.

### Per-module `ARCHITECTURE.md` (predicate 4)

Every top-level `src/` directory needs an `ARCHITECTURE.md`. The portfolio has 8
today: `app`, `assets`, `block`, `components`, `data`, `i18n`, `lib`, `styles`.
**Layer E adds a 9th dir, `src/config/`** (for `site.ts`), which predicate 4 will
also require an `ARCHITECTURE.md` for — so this is **9 files total**, and the
`src/config/ARCHITECTURE.md` must land in the same phase as `site.ts`. Add one
short file per directory describing its purpose and layout. (`src/middleware.ts`
is a file, not a directory, so it is exempt.)

---

## Checker contract (`scripts/check-harness.mjs` adaptation)

The checker is the mechanical definition of "harness valid". Predicates are
adapted as follows; the implementation must end with **all predicates green**.

| # | Predicate | Disposition |
| --- | --- | --- |
| 1 | Required harness files exist | **Keep.** File list: `AGENTS.md`, `CONSTRAINTS.md`, `PROGRESS.md`, `DECISIONS.md`, `INITIALIZATION.md`, `README.md`, `docs/ARCHITECTURE.md`, `docs/WORKFLOWS.md`, `docs/AGENT_OPS.md`, `docs/VERIFICATION.md`, `.nvmrc`. |
| 2 | `AGENTS.md` ≤ 120 lines | **Keep.** |
| 3 | `.nvmrc` major ≥ `engines.node` min | **Keep.** Requires adding `engines.node`. |
| 4 | Every top-level `src/` dir has `ARCHITECTURE.md` | **Keep.** Add **9** files (8 existing dirs + new `src/config/`). |
| 5 | `PROGRESS.md` required headers | **Keep.** |
| 6 | `CONSTRAINTS.md` has MUST + MUST NOT | **Keep.** |
| 7 | `DECISIONS.md` has Decision Log + Archive | **Keep.** |
| 8 | `INITIALIZATION.md` four markers | **Keep.** |
| 9 | Topic docs ≤ 170 lines | **Keep.** |
| 10 | Every `page.tsx` exports metadata/generateMetadata | **Keep** (redirect-only exempt). |
| 11 | Root layout sets `metadataBase` | **Keep — already green** (root `layout.tsx` already sets it). Phase 5 only reconciles the value with `site.ts`. |
| 12 | SEO surfaces exist | **Trim** to `robots.ts`, `sitemap.ts`, `manifest.ts` (remove `llms.txt/route.ts`). |
| 13 | `siteConfig` SEO fields + locale parity with routing | **Trim** required-fields list to remove `ai` and `verification`; keep locale/defaultLocale parity check against `routing.ts`. Adapt to read `src/config/site.ts` and `src/i18n/routing.ts`. |
| 14 | `[locale]` layout static rendering | **Keep** (`generateStaticParams` + `setRequestLocale`). |
| 15 | `seoRoutes` excludes private keys | **Remove** (no `routes.ts`/private routes in the portfolio). |

---

## Phasing (for the implementation plan)

**Critical ordering constraint:** the `.husky/pre-commit` hook runs
`check-harness.mjs`, which requires the *complete* harness file set and green
predicates. Therefore **husky must NOT be activated until the final phase** —
otherwise commits in Phases 1–5 would be blocked by a checker demanding files
that later phases create. Through Phases 1–5, the checker scripts exist and are
run **manually** (`npm run check:harness`, `lint`, `typecheck`, `test:run`,
`build`); git hooks are wired only in Phase 6. Until then, intermediate commits
are plain `git commit` with no hook firing (husky not installed yet), so the
co-modification gate is also not enforced mechanically until Phase 6 — but each
phase should still stage `PROGRESS.md` alongside any `src/**` change so the
history is gate-clean retroactively (PROGRESS.md is created in Phase 2; Phase 1
intentionally touches `src/` only for the sample test and is committed before
hooks exist).

Each phase ends green by the manual verification set and is committable.

1. **Enforcement tooling + deps (no husky activation)** — add devDeps,
   `engines.node`, scripts, `eslint.config.mjs` (flat), `.prettierrc`,
   `.commitlintrc.json`, `.nvmrc`, vitest/playwright config + one passing test
   (`src/lib/utils.test.ts` for `cn()`), `lint-staged` config, and the two
   checker scripts (`check-harness.mjs` written but its later-phase predicates
   will be red until those phases land — that's expected and checked manually).
   Do **not** add `prepare: husky` or create `.husky/` yet. Verify
   `npm install`, `lint`, `typecheck`, `test:run`, `build`.
2. **Governance & state files** — `AGENTS.md`, `CONSTRAINTS.md`, `PROGRESS.md`,
   `DECISIONS.md`, `INITIALIZATION.md`, `CHANGELOG.md`.
3. **Docs harness** — `docs/ARCHITECTURE.md`, `WORKFLOWS.md`, `AGENT_OPS.md`,
   `VERIFICATION.md`, `PACKAGES.md`, archive READMEs, template scaffolding.
4. **`.claude/` orchestration** — agents, commands, added/adapted skills,
   `settings.json`, `settings.local.json`, `agent-memory/`, `.mcp.json`.
5. **SEO module + per-module ARCHITECTURE.md** — `src/config/site.ts`,
   `robots/sitemap/manifest`, reconcile root `metadataBase` to `site.ts`,
   `[locale]` `generateMetadata` + `generateStaticParams` + `setRequestLocale`,
   **9** `ARCHITECTURE.md` files (incl. `src/config/`), SEO translation keys in
   all 12 locales.
6. **Checker adaptation + activate enforcement + go-green** — finalize
   `check-harness.mjs` predicates per the contract; **now** add `prepare: husky`,
   create `.husky/pre-commit` + `.husky/commit-msg`, and run `npm run prepare`.
   Run the full verification set; ensure `npm run check:harness` exits 0,
   `npm run test:gates` passes, and a trial commit passes the hook chain.

## Verification (definition of done)

- `npm install` clean.
- `npm run lint` · `npm run typecheck` · `npm run test:run` · `npm run build` all pass.
- `npm run check:harness` exits 0 (all adapted predicates green).
- `npm run test:gates` (co-modification self-test) passes.
- A trial commit passes the husky `pre-commit` and `commit-msg` chain.
- Fresh Session Test: the governance + docs files let a new agent recover state,
  rules, and next steps without prior context.

## Risks & mitigations

- **~15 new devDeps + ESLint flat-config migration** is the largest change and
  could surface lint errors in existing code. Mitigation: Phase 1 runs `lint`
  and fixes or aligns rules so the baseline is green before later phases.
- **Co-modification gate friction** during multi-file phases. Mitigation: stage
  `PROGRESS.md` updates with each phase commit (the gate is by design).
- **Husky-activation ordering (resolved in design):** `check-harness` in
  `pre-commit` requires the full file set, so husky is wired only in Phase 6.
  Verify no `prepare: husky` script or `.husky/` dir is created before then.
- **Co-modification gate vs. Phase 1 src test:** the gate (`src/**` ⇒
  `PROGRESS.md` staged) is not mechanically enforced until Phase 6 (husky-last),
  so the Phase 1 sample test commits cleanly; but once active, every `src/**`
  commit must stage `PROGRESS.md`.
- **Root metadata is already rich and hardcoded:** Phase 5 must reconcile it to
  `site.ts` rather than duplicate it; `site.url` must equal
  `https://humblefool.vercel.app/`.
- **ESLint flat-config migration:** the portfolio has *no* ESLint dependency
  today (uses `next lint`). `eslint-config-next` flat-config wiring in Next 15
  may need the `@eslint/eslintrc` `FlatCompat` shim — confirm during Phase 1.
- **`src/config/` is a new top-level module** ⇒ predicate 4 requires
  `src/config/ARCHITECTURE.md`; land it with `site.ts` in Phase 5.
- **SEO metadata keys** must land in all 12 locale files or `add-translations`
  conventions break; treat as part of Phase 5 done-criteria.

## Out-of-scope observations (not fixed here)

- Root `src/app/layout.tsx` destructures `locale` from `params`, but the root
  layout is not under the `[locale]` segment, so it does not receive that param.
  This is a pre-existing latent issue unrelated to the harness; left untouched.
