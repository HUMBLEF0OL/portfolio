# DECISIONS.md — Durable Rationale Log

> This file is the project's **decision log** (ADR-lite): the durable record of
> _why_ the project is the way it is. It is the companion to `PROGRESS.md`, which
> holds the volatile _what_ (current state). Isolation principle:
>
> - `PROGRESS.md` → current state and short volatile scratch notes.
> - `DECISIONS.md` → durable rationale that outlives any single session, plus
>   **harness-induced failure logs**.
>
> Knowledge lives here, not in a session's memory (ACID Durability — see
> `docs/VERIFICATION.md`). Append entries; mark superseded ones rather than
> deleting them.

---

## Decision Log

Each entry uses this shape:

```
### YYYY-MM-DD — <title>
- **Decision:** …
- **Rationale:** …
- **Rejected alternatives:** …
- **Constraints:** …
- **Status:** accepted | superseded by <entry>
```

When a failure is traced to a specific **harness layer** (Instructions, Tools,
Environment, State, or Feedback — the harness diagnostic loop), record the
layer and the fix as a decision entry: it is a durable learning, not volatile
state.

---

### 2026-06-23 — Verify redesign cleanup with typecheck+lint, not `build` (Node 26 worker break)

- **Decision:** For the neural-grid redesign cleanup work (dead-code removal +
  responsive pass), use `npm run typecheck` + `npm run lint` as the verification
  gates instead of `npm run build`.
- **Rationale:** Under the local runtime **Node v26.3.0**, `next build` (15.3.4)
  compiles and type-checks successfully but its "Collecting page data" worker
  phase fails to resolve `chunks/ssr/[turbopack]_runtime.js` (with a
  `module.register()` deprecation warning) — a Node 23+/Next 15.3 worker
  incompatibility, not a code regression. Typecheck + lint cover the failure
  modes of file removal and class-only responsive edits.
- **Rejected alternatives:** Downgrading Node (out of scope, affects whole env);
  upgrading Next (risky, unrelated to the goal); `--no-verify` commits (defeats
  the harness gates).
- **Constraints:** Harness layer = **Environment** (runtime/Next mismatch). The
  pre-commit `npm run typecheck` gate still runs and must stay green.
- **Status:** accepted.

### 2026-06-23 — Adopt the starter agentic harness, adapted to the portfolio stack

- **Decision:** Port the starter boilerplate's full five-layer agentic harness
  (governance files, docs harness, `.claude/` orchestration, enforcement layer,
  right-sized SEO module) into this portfolio, adapted to its real stack.
- **Rationale:** A fresh agent session must be able to recover state, rules, and
  next steps and contribute correctly, with commits gated by mechanical
  structural + quality checks.
- **Rejected alternatives:** Landing piecemeal on `master` (the checker would be
  red between commits and the co-modification gate would fight partial commits);
  a git worktree (this is additive scaffolding, not a risky refactor).
- **Constraints:** No new runtime dependencies; all additions are devDeps.
- **Status:** accepted

### 2026-06-23 — Drop stack-irrelevant layers

- **Decision:** Drop auth, proxy/middleware route-gating, API routes, database,
  migrations, data-fetching (TanStack Query), client state (Zustand), HTTP
  client (ky), forms (react-hook-form), validation (zod), the Figma pipeline,
  and the skill-authoring meta-skills.
- **Rationale:** The portfolio uses none of these libraries; importing their
  skills/agents would describe a project that doesn't exist.
- **Rejected alternatives:** Keeping the full skill catalog for "future use" —
  rejected as instruction bloat; they can be ported if a future rewrite adds
  the libraries.
- **Status:** accepted

### 2026-06-23 — Rewrite design-tokens for the CSS-first Tailwind v4 system

- **Decision:** Replace the starter's Figma-token-sync `design-tokens` skill
  with one documenting the portfolio's CSS-first `@theme` + angular-clip utility
  system in `src/app/globals.css`. No `tailwind.config.*`.
- **Rationale:** Tailwind v4 here is CSS-first; there is no Figma source and no
  token-sync pipeline.
- **Status:** accepted

### 2026-06-23 — Right-sized SEO module (single source of truth)

- **Decision:** Build `src/config/site.ts` (lean: name, url, locales,
  defaultLocale, ogImage, ogLocaleMap, trailingSlash, organization) plus
  `robots.ts` / `sitemap.ts` / `manifest.ts`. Reconcile the already-rich
  hardcoded metadata in root `layout.tsx` to derive from `site.ts`. `site.url`
  MUST equal `https://humblefool.vercel.app/` (the existing `metadataBase`).
- **Rationale:** Avoid a second source of truth; keep the existing OG/Twitter
  metadata while routing duplicated facts through one config.
- **Rejected alternatives:** `llms.txt` route, AI-crawler/verification/org-heavy
  SEO config, and the `seoRoutes` private-route guard — the portfolio has no
  private routes and the extra surface isn't warranted.
- **Status:** accepted

### 2026-06-23 — Husky activated only in the final phase

- **Decision:** Do not create `.husky/` or add `prepare: husky` until Phase 6.
  Through Phases 1–5 the checker scripts run manually.
- **Rationale:** `.husky/pre-commit` runs `check-harness.mjs`, which requires
  the complete harness file set; activating husky earlier would block every
  intermediate commit.
- **Status:** accepted

### 2026-06-23 — Node floor and ESLint flat-config shim

- **Decision:** Set `engines.node` to `>=20.19.0` and `.nvmrc` to `22`. Migrate
  off `next lint` to a flat `eslint.config.mjs`, bridging `eslint-config-next`
  (eslintrc-style under Next 15.3) via the `@eslint/eslintrc` `FlatCompat` shim.
- **Rationale:** `eslint-config-next` for Next 15.3 does not ship a flat-config
  array; FlatCompat is the supported bridge. The Node floor satisfies the
  toolchain (Vitest 3, commitlint, lint-staged) while `.nvmrc 22` exceeds it
  (predicate 3).
- **Layer:** Tools (harness diagnostic loop).
- **Status:** accepted

---

## Archive

Rolled-off decisions live in dated archive files; the **index of every archived
period** is [`docs/archive/decisions/README.md`](docs/archive/decisions/README.md).
Unlike `PROGRESS.md` (which archives by age/size), decisions roll off **by status,
never by age** — an old decision can still be active law. Only entries marked
`superseded` or `obsolete` may move out; every `accepted` decision stays here
regardless of age.

When this file grows large, move superseded/obsolete entries into a dated archive
file and add it to that index — keep all active decisions above. Convention and
procedure: `docs/VERIFICATION.md` → "Archiving Growing State Files". This
`## Archive` header must always remain (`npm run check:harness` asserts it).

- **Archive index:** [`docs/archive/decisions/README.md`](docs/archive/decisions/README.md)
  _(no periods archived yet)._
