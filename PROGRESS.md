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

Neural-grid operator redesign cleanup — committing the completed services-site
redesign as a baseline, then (1) removing now-dead legacy design components and
(2) making the application fully responsive. The agentic workflow harness landed
earlier on this branch (`npm run check:harness` **14/14 green**) and is awaiting
external-auditor sign-off; that is unchanged by this cleanup work.

> **Verification note:** local `npm run build` cannot complete its "Collecting
> page data" worker phase under **Node v26.3.0** (Next 15.3.4 emits a
> `module.register()` deprecation and fails to resolve the build-worker
> turbopack runtime chunk). Compilation + type-checking succeed. Verification
> for this work therefore uses `npm run typecheck` + `npm run lint` (both green);
> the build worker issue is a pre-existing runtime mismatch, tracked in
> `DECISIONS.md`, not a regression from these changes.

## Done

_Completed and verified work. Add a date and a one-line summary per entry._

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
