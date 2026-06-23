# CONSTRAINTS.md — Hard Rules (MUST / MUST NOT)

> This file holds the **non-negotiable** rules for this project: the hard
> "don'ts" and the actions that always require human approval. It is the
> companion to `AGENTS.md` (the index) and `docs/WORKFLOWS.md` (the process).
>
> Every rule carries **enforcement** tags and **dependency-metadata** tags.
>
> Enforcement — how a violation is caught:
>
> - `[auto]` — mechanically enforced by ESLint, `npm run check:harness`, or a
>   pre-commit gate (`.husky/pre-commit`). A violation fails a check; you do not
>   rely on memory to catch it. **Every `[auto]` rule names its check.**
> - `[review]` — requires human judgement or approval. No deterministic check
>   exists (or one is intentionally deferred); a human is the gate.
>
> Dependency metadata — treat each rule like a dependency:
>
> - `[src:…]` — origin of the rule: _why it exists_ (e.g. `next-app-router`,
>   `security`, `ts-strict`, `architecture`, `js-baseline`, `i18n`,
>   `tailwind-v4`, `team`, `harness`, `state`, `process`, `verification`).
> - `[exp:…]` — _when it can be deleted/audited_: `never` for structural
>   invariants, or `review-by:<YYYY-QN>` for rules tied to a library or version.
>
> The tags are the explicit bridge between these prose rules and the
> deterministic enforcement layer (`eslint.config.mjs`,
> `scripts/check-harness.mjs`, `scripts/check-co-modification.mjs`). When a
> `[review]` rule later gains a deterministic check, retag it `[auto]`.

---

## MUST NOT (hard "don'ts")

- **MUST NOT** add `'use client'` to a `src/app/**/page.tsx` file — push
  interactivity down to child components. `[auto]` (eslint `no-restricted-syntax`)
  `[src:next-app-router]` `[exp:never]`
- **MUST NOT** use `var` — use `const`, or `let` only when reassignment is
  required. `[auto]` (eslint `no-var`) `[src:js-baseline]` `[exp:never]`
- **MUST NOT** leave `console.log` in production code (`console.warn` /
  `console.error` are allowed). `[auto]` (eslint `no-console`) `[src:js-baseline]`
  `[exp:never]`
- **MUST NOT** use the `any` type — use proper generics and union types.
  `[review]` `[src:ts-strict]` `[exp:never]`
- **MUST NOT** use `dangerouslySetInnerHTML`. `[review]` `[src:security]` `[exp:never]`
- **MUST NOT** use default exports for components (except `page.tsx`,
  `layout.tsx`, and Next file-convention modules). `[review]` `[src:architecture]`
  `[exp:never]`
- **MUST NOT** hardcode user-facing strings — all copy lives in `messages/*` and
  is read via next-intl (`getTranslations` / `useTranslations`). `[review]`
  `[src:i18n]` `[exp:never]`
- **MUST NOT** add a `tailwind.config.*` file — Tailwind v4 is CSS-first via
  `@theme` in `src/app/globals.css`. `[review]` `[src:tailwind-v4]` `[exp:never]`
- **MUST NOT** put business logic in UI (`src/components/ui/`) components.
  `[review]` `[src:architecture]` `[exp:never]`
- **MUST NOT** hand-edit generated shadcn primitives in `src/components/ui/`
  unless intentionally customizing. `[review]` `[src:architecture]` `[exp:never]`
- **MUST NOT** import from outside `src/` in application code. `[review]`
  `[src:architecture]` `[exp:never]`
- **MUST NOT** use Pages Router patterns (`getServerSideProps`,
  `getStaticProps`, etc.). `[review]` `[src:next-app-router]` `[exp:review-by:2026-Q4]`
- **MUST NOT** mark work `Done` on self-assessment alone — record the exact
  verification commands run and their pass/fail (handoff `verification_run`).
  `[review]` `[src:verification]` `[exp:never]`

---

## MUST (always-required structure & approvals)

- **MUST** use the `cn()` helper from `@/lib/utils` to merge conditional
  Tailwind classes — never string-concatenate class names. `[review]`
  `[src:tailwind-v4]` `[exp:never]`
- **MUST** use the `next/image` `Image` component for images. `[auto]` (eslint
  `@next/next/no-img-element`) `[src:next-app-router]` `[exp:never]`
- **MUST** use the navigation wrappers from `@/i18n/navigation` (`Link`,
  `redirect`, `useRouter`, `usePathname`) rather than raw `next/link` /
  `next/navigation`, so locale prefixes are preserved. `[review]` `[src:i18n]`
  `[exp:never]`
- **MUST** keep all **12** locale files in `messages/` in sync — adding or
  changing a key updates every locale (`en` is source of truth). `[review]`
  `[src:i18n]` `[exp:never]`
- **MUST** keep the harness structure valid: `npm run check:harness` exits 0
  before every commit (wired into `.husky/pre-commit`). `[auto]` `[src:harness]`
  `[exp:never]`
- **MUST** keep `AGENTS.md` at or under 120 lines — it is an index, not a
  manual. `[auto]` (`check:harness` predicate) `[src:architecture]` `[exp:never]`
- **MUST** keep a per-module `ARCHITECTURE.md` in every top-level `src/`
  directory. `[auto]` (`check:harness` predicate) `[src:architecture]` `[exp:never]`
- **MUST** keep `PROGRESS.md` current — it is the cross-session State
  subsystem. `[auto]` (`check-co-modification` pre-commit gate: a `src/**` change
  must stage `PROGRESS.md` in the same commit — ACID Atomicity) `[src:state]`
  `[exp:never]`
- **MUST** log durable decisions and harness-induced failure logs in
  `DECISIONS.md` (current "why"), keeping `PROGRESS.md` for volatile state only.
  `[review]` `[src:state]` `[exp:never]`
- **MUST** archive growing state files instead of letting them grow unbounded:
  roll completed `PROGRESS.md` entries into `docs/archive/progress/<YYYY-QN>.md`
  under its `## Archive` source map. The `## Archive` header is `[auto]`
  (`check:harness` predicate); the rollover discipline is `[review]`.
  `[src:state]` `[exp:never]`
- **MUST** write agent memory to the project folder (`.claude/agent-memory/`),
  never to a tool's personal session memory. `[review]` `[src:state]` `[exp:never]`
- **MUST** keep work-in-progress to one active task — complete and verify the
  current item before starting another. `[review]` `[src:process]` `[exp:never]`

### Human-in-Loop Checkpoints — MUST get human approval before:

All checkpoints are `[review]` `[src:approvals]` `[exp:never]`:

- Adding new packages (the portfolio adds devDeps only without approval; any
  runtime dependency needs sign-off)
- Replacing core packages (Next, React, next-intl, Tailwind, shadcn)
- Major refactors across multiple files
- Root instruction file edits (`AGENTS.md`, `CONSTRAINTS.md`)
- Workflow-document ownership changes
- Deployment to production

---

## How these rules are enforced

| Layer                               | Enforces                                                                                                          |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `eslint.config.mjs`                 | `[auto]` lint rules (`no-var`, `no-console`, `'use client'` in pages, `no-img-element`)                           |
| `scripts/check-harness.mjs`         | `[auto]` structural rules (file/section/line-count + SEO predicates); git-agnostic, CI-safe                       |
| `scripts/check-co-modification.mjs` | `[auto]` state-transition rules (`src/**` changed ⇒ `PROGRESS.md` staged); git-index aware, commit-time only      |
| `.husky/pre-commit`                 | Runs all of the above on every commit (ACID Consistency)                                                          |
| Human reviewer                      | All `[review]` rules                                                                                              |
