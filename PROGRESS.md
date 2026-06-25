# PROGRESS.md — Cross-Session State

> This file is the project's **State subsystem**: the durable, version-controlled
> record of what is happening so that any fresh session (human or agent) can
> answer "What's the current progress?" without prior context. Knowledge lives
> here, not in a session's memory.
>
> **ACID update rules** (see `docs/VERIFICATION.md` for the full discipline):
>
> - **Atomicity** — one logical change updates this file in the same commit.
> - **Consistency** — only record work as `Done` once verification passes
>   (`npm run check:harness`, `lint`, `test:run`, `build` as applicable).
> - **Isolation** — keep current state here; keep rules in `CONSTRAINTS.md`,
>   process in `docs/WORKFLOWS.md`, and durable rationale in `DECISIONS.md`.
> - **Durability** — if it matters across sessions, it is written here, not left
>   in chat history.

---

## Current Focus

**Re-internationalize the operator site (12 locales).** The redesign had moved
all copy into English-only `src/data/*.json`, leaving only `Seo`/`404`
localized. Consolidating all user-facing copy back onto next-intl messages
(spec: `docs/superpowers/specs/2026-06-23-i18n-content-reinternationalization-design.md`,
plan: `docs/superpowers/plans/2026-06-23-i18n-content-reinternationalization.md`).
Implementation complete and verified (build SSG ×12 locales); RTL visual
mirroring polish is a tracked follow-up (spec non-goal).

> **Verification note:** local `npm run build` cannot complete its "Collecting
> page data" worker phase under **Node v26.3.0** (Next 15.3.4 emits a
> `module.register()` deprecation and fails to resolve the build-worker
> turbopack runtime chunk). Compilation + type-checking succeed. Verification
> for this work therefore uses `npm run typecheck` + `npm run lint` (both green);
> the build worker issue is a pre-existing runtime mismatch, tracked in
> `DECISIONS.md`, not a regression from these changes.

## Done

_Completed and verified work. Add a date and a one-line summary per entry._

> `2026-06-25` — Refactored the easter-egg feature into focused reveal
> components. Split the inline logic in `easter-egg.tsx` into
> `src/components/easter-eggs/{DecryptionLetter,SpotlightReveal,GitLogReveal}.tsx`,
> moved the burst/overlay styles out of `glitch.css` into a dedicated
> `src/styles/easter-eggs.css` (imported from `globals.css`), and added a
> `ConsoleGreeting` client component wired into the `[locale]` layout. Verified:
> `typecheck` clean (pre-commit), `lint` 0 errors, `build` SSG completes.

> `2026-06-24` — Reduced supported locales from 12 → 3 (`en` default, `es`, `zh`):
> the three with the broadest reach and none RTL. Trimmed `routing.ts`,
> `siteConfig` (`locales` + `ogLocaleMap`), and `languages.json`; deleted the 9
> other `messages/*` catalogs; dropped the Arabic RTL branch in `LocaleHtml`
> (no kept locale is RTL → `dir` fixed to `ltr`); synced the current-state docs
> (CLAUDE/AGENTS/ARCHITECTURE/PACKAGES/AGENT_OPS/WORKFLOWS/i18n skill) to "3
> locales". Also swapped the dated "AVAILABLE Q3 2026" availability copy for
> evergreen "AVAILABLE FOR WORK" / "OPEN FOR WORK" (separate commit). Verified:
> `check:harness` 14/14 (locales match routing), `test:run` parity green, `lint`
> 0 errors, `build` SSG emits en/es/zh only.

> `2026-06-24` — i18n re-internationalization complete (all 12 locales). Migrated
> every section + route off `data/*.json` onto next-intl messages via
> `useMessages()`/`getMessages()` typed against `en.json` (`AppConfig.Messages`
> augmentation in `src/global.ts`); deleted the 7 migrated data files. Translated
> the 11 non-en locales (parallel workflow, one agent per locale) honoring the
> keep-verbatim glossary; `messages` key-parity test green (all 12 mirror
> `en.json`). Added `dir="rtl"` for Arabic. Note: namespace-positional
> `getTranslations('Ns')` is unusable here (the top-level `Stats` array collapses
> next-intl's namespace-key typing) — components use `useMessages()`/
> `getMessages()` + indexed access instead. Verified: `typecheck`, `lint` 0
> errors, `test:run` 4/4, `build` SSG **140/140 pages across 12 locales**.

> `2026-06-24` — RTL `lang`/`dir`: the root layout sits above `[locale]` so it
> can't resolve a per-page locale during static rendering — added a small client
> `LocaleHtml` corrector (in the `[locale]` layout) that sets
> `document.documentElement.lang`/`dir` from `useLocale()`. Verified at runtime
> with Playwright: `/ar` → `lang="ar" dir="rtl"` + Arabic copy, `/de` → `ltr` +
> German copy, titles localized. Build SSG 140/140.

> `2026-06-24` — Committed a pre-existing, uncommitted working-tree "easter-egg"
> feature as its own commit (not part of the i18n effort, preserved so the i18n
> `Header` migration lands on a clean base): `src/components/easter-egg.tsx`,
> `src/lib/easter-eggs.ts` (enable gate), `src/styles/glitch.css` burst styles,
> and the `Header` logo 5x-click combo trigger. Verified: `typecheck` clean,
> `lint` 0 errors.

> `2026-06-24` — Dead-code cleanup + i18n foundation. Removed 9 unused deps,
> the `profile/project/skills/xp` data files, orphaned vaul CSS, and unused
> `AngularFrame` exports; gutted 10 dead message namespaces (kept `Seo`/`404`).
> Then authored `messages/en.json` as the content source of truth (18
> namespaces), added `src/data/config.json` (non-linguistic constants) + trimmed
> `caseStudies.json` to config-only, `src/types/content.ts`, `src/global.ts`
> (next-intl `Messages` augmentation), and a message key-parity test (red until
> locales are translated). Migrated `Work` + `work/[slug]` to read copy from
> messages. Verified: `typecheck` clean, `lint` 0 errors. (Note: an unrelated,
> pre-existing "easter-egg" feature sits uncommitted in the working tree —
> `src/components/easter-egg.tsx`, `src/lib/easter-eggs.ts`, `glitch.css`,
> `Header.tsx` hunks — kept out of this commit.)

> `2026-06-23` — Slowed the hero matrix-rain (`HeroCanvas`) — read as too fast.
> Cut per-column fall speed to ~30% of the original (`0.16 + rand*0.38` →
> `0.05 + rand*0.1`) over two passes, and softened the near-cursor speed boost
> (`1 + near` → `1 + near*0.5`). Verified rendering; typecheck + lint clean.

> `2026-06-23` — Responsive pass across the operator site. Fixed the squishing
> homepage `StatBar` (now a 2-col mobile / 4-col desktop grid with `gap-px`
> dividers), the `Contact` form (single-column fields + lighter card padding on
> mobile), the about-page STATS grid (same `gap-px` treatment, removed stray
> divider/indent), about-page DOCTRINE gutters (now `md:`-only), `Testimonials`
> stacking, and tightened `Services`/`Engagement` card padding on mobile.
> Verified with Playwright at 375 / 768 / 1280px on `/`, `/about`, and
> `/work/[slug]`: **zero horizontal overflow** at every width, dividers clean,
> no desktop regression. `typecheck` clean, `lint` 0 errors / 0 warnings.

> `2026-06-23` — Removed legacy components made dead by the redesign: 10 old
> `src/block/*` sections (About, Skills, Projects, Experience, Home, Contact,
> CyberId, Divider, TextEncoder, NavIcons), the entire shadcn `src/components/ui/`
> primitive kit (8 files — none imported by any live path), and the vestigial
> floating `ThemeSwitch` (dropped from the root layout; single-theme operator
> design). `AngularFrame` + `theme-provider` kept (still used by `not-found` /
> root layout). Refreshed `src/block` + `src/components` ARCHITECTURE.md.
> Verified: `typecheck` clean, `lint` 0 errors. (Unused deps the removed kit
> pulled in — embla-carousel-react, vaul, radix tabs/select/dialog, react-barcode
> — left in package.json as an optional follow-up.)

> `2026-06-23` — Committed the neural-grid "operator" services-site redesign as a
> baseline: shared FX primitives (`src/components/op/`), 11 homepage section
> blocks (`src/block/op/`), `/about` + `/work/[slug]` routes, operator
> `Header`/`Footer`, `globals.css` operator tokens + notch utilities, and the
> `src/data/*.json` content layer. Verified: `typecheck` clean, `lint` 0 errors.

> `2026-06-23` — External audit: two independent auditors verified the harness
> against the spec (all 5 layers + checker contract) and re-ran the gates — both
> returned green (check:harness 14/14, lint 0 errors, typecheck, test:run 3/3,
> test:gates 5/5, build SSG×12, commitlint accept/reject confirmed). Added
> `docs/specs/_template.md` for Layer B parity (the one minor finding). Note:
> untracked `src/data/*.json` (about/caseStudies/faq/pricing/process/services/
> site/testimonials) belong to a separate portfolio-revamp effort — not part of
> this harness work, left untracked.
>
> `2026-06-23` — Phase 6: activated enforcement. Added `prepare: husky`,
> `.husky/pre-commit` (lint-staged → check-harness → typecheck →
> check-co-modification) and `.husky/commit-msg` (commitlint). Full go-green
> verification: `check:harness` 14/14, `lint` 0 errors, `typecheck`, `test:run`
> 3/3, `test:gates` 5/5, `build` (SSG 12 locales). Harness implementation
> complete pending external-auditor sign-off.

> `2026-06-23` — Phases 2–5: governance & state files; docs harness
> (architecture/workflows/agent-ops/verification/packages + archive READMEs +
> templates); `.claude/` orchestration (4 agents, 7 commands, 13 skills,
> settings, `.mcp.json`, agent-memory); right-sized SEO module (`src/config/site.ts`,
> robots/sitemap/manifest, root-layout reconciliation, `[locale]` static
> rendering + localized `generateMetadata`), 9 per-module `ARCHITECTURE.md`, and
> `Seo` keys in all 12 locales. `npm run check:harness` 14/14 green; lint 0
> errors; typecheck; test:run 3/3; build SSG for all 12 locales.
>
> `2026-06-23` — Phase 1: enforcement tooling. Added `engines.node>=20.19.0`,
> `.nvmrc 22`, ESLint 9 flat config (FlatCompat over `eslint-config-next`),
> Prettier, commitlint config, Vitest + Testing Library + jsdom, Playwright,
> lint-staged, and the checker scripts (`check-harness.mjs` adapted: SEO
> predicates trimmed, `seoRoutes` predicate removed; `check-co-modification.mjs`
>
> - test; `check-updates.js`). Verified: `lint` 0 errors, `typecheck`,
>   `test:run` 3/3, `build`, `test:gates` 5/5. No husky yet (Phase 6).

## In Progress

> **WIP=1** — finish and verify one task before activating the next.

> i18n: optional follow-ups — native-speaker review of machine translations, and
> full RTL visual mirroring of the operator layout for Arabic (spec non-goal).

> External auditor review of the harness (the goal's definition of done). Local
> verification is fully green; no further implementation pending.

## Blocked

_Items waiting on a decision, dependency, or human checkpoint. Note the blocker._

> Marking the harness fully Done is gated on **external auditor** sign-off
> (per the active session goal), not just green local checks.

## Next Up

_Planned work, in rough priority order._

- Address any findings from the external auditor's review of the harness.
- (Deferred) merge `feat/agentic-harness` into `master` once signed off.
- (Optional) add a CI workflow running the `check:harness` + lint/typecheck/test
  command set from `docs/VERIFICATION.md`.

## Decisions & Notes

_Volatile scratch notes only._ Durable decisions, trade-offs, and
**harness-induced failure logs** live in [`DECISIONS.md`](DECISIONS.md) — the
durable _why_ is isolated from this file's volatile _what_.

- ESLint flat-config under Next 15.3 required the `@eslint/eslintrc`
  `FlatCompat` shim (resolved in Phase 1). See `DECISIONS.md`.

## Archive

Rolled-off state lives in dated archive files; the **index of every archived
period** is [`docs/archive/progress/README.md`](docs/archive/progress/README.md).
When this file grows large, move completed `## Done` / `## Decisions & Notes`
entries into a dated archive file, add it to that index — keep only current state
above. Convention and procedure: `docs/VERIFICATION.md` → "Archiving Growing State
Files". This `## Archive` header must always remain (`npm run check:harness`
asserts it).

- **Archive index:** [`docs/archive/progress/README.md`](docs/archive/progress/README.md)
  _(no periods archived yet)._
