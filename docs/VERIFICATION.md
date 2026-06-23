# Verification

How to keep this repository valid and provable: verification commands, the
mechanical and manual Fresh Session Test, ACID commit discipline, state-file
archival, and the instruction-audit cadence. For day-to-day development flow see
[`WORKFLOWS.md`](WORKFLOWS.md); for agent coordination see
[`AGENT_OPS.md`](AGENT_OPS.md).

---

## Verification Commands by Phase

- **Fast check:** `npm run lint` and `npm run test:run`
- **Full check:** `npm run lint`, `npm run typecheck`, `npm run test:run`,
  `npm run build`
- **Behavior check:** `npm run test:e2e` (Playwright) when route/locale/SEO
  behavior changed
- **Docs parity check:** keep boundary/handoff wording consistent across
  `AGENTS.md`, `CONSTRAINTS.md`, and the docs harness

### Harness check & CI-ready command set

`npm run check:harness` is the **mechanical Fresh Session Test** — a
zero-dependency script (`scripts/check-harness.mjs`) that asserts the harness
files an agent needs exist and are structurally valid. It runs on every commit
via `.husky/pre-commit`.

The same command set is ready to drop into a CI job unchanged:

```bash
npm run check:harness   # harness structure is valid
npm run lint            # conventions ([auto] rules)
npm run typecheck       # types compile
npm run test:run        # tests pass
npm run build           # production build succeeds
```

A second pre-commit gate, `scripts/check-co-modification.mjs`, enforces
**state-transition** rules — "if a trigger path is staged, a required companion
must be staged too" (ships with: a `src/**` change must stage `PROGRESS.md`, ACID
Atomicity). It is kept **separate** from `check:harness` on purpose: it inspects
the git index, which is only meaningful at commit time, so it is **not** in the
CI set above. It fails open when there is no git index and carries a scoped
escape hatch (`SKIP_STATE_CHECK=1`). Its test (`npm run test:gates`) drives it
through a throwaway `GIT_INDEX_FILE` so the real staging area is never touched.

The harness check also guards the **SEO module** (config-driven, so regressions
are mechanical): every `page.tsx` exports `metadata`/`generateMetadata` (redirect
-only pages exempt); the root layout sets `metadataBase`; `robots.ts`,
`sitemap.ts`, and `manifest.ts` exist; `src/config/site.ts` has the required SEO
fields and its `locales`/`defaultLocale` match `src/i18n/routing.ts`; and
`[locale]/layout.tsx` exports `generateStaticParams` and calls `setRequestLocale`.
The workflow lives in the `seo` skill.

---

## Definition of Done

"Done" = the verification commands for the change's phase pass — **not** the
agent's own assessment. Completion judgement is externalized to the harness, not
left to the agent that generated the work.

The handoff contract's `verification_run` (`docs/AGENT_OPS.md`) records the exact
commands run and their pass/fail. Code-written ≠ behavior-verified — record the
evidence, don't assert success. A passing unit suite alone is **not** Done for
cross-component or routing changes: the E2E row of the Testing Strategy table
(`WORKFLOWS.md`) gates those.

---

## Fresh Session Test

A new session — human or agent, with **no prior context** — must be able to
answer these six questions using only the repository:

1. **What is this system?** → `README.md`, `AGENTS.md` (Project Identity)
2. **How is it organized?** → `docs/ARCHITECTURE.md` + per-module
   `src/<module>/ARCHITECTURE.md`
3. **How do I run it?** → `package.json` scripts, `README.md`, `.nvmrc`
4. **How do I verify it?** → this file (verification commands) +
   `npm run check:harness`
5. **What's the current progress?** → `PROGRESS.md`
6. **How do I start from scratch / is it init-ready?** → `INITIALIZATION.md`
   (the four startup-readiness conditions)

> Information that does not exist in the repo does not exist for the agent. If
> you cannot answer one of these from the files above, that gap is the bug —
> fix the docs, not your memory. Run `npm run check:harness` for the mechanical
> version of questions 1–4.

---

## ACID Commit Discipline

Every commit should leave the repository in a valid, self-describing state.

- **Atomicity** — one logical change is one commit. Don't bundle unrelated edits.
  A `src/**` change stages `PROGRESS.md` in the same commit.
- **Consistency** — commit only when verification passes. The pre-commit hook
  runs `check:harness` (plus lint-staged + typecheck + co-modification), so a
  commit always represents a valid harness state.
- **Isolation** — keep concerns in separate files: rules in `CONSTRAINTS.md`,
  process in `docs/WORKFLOWS.md`, cross-session state in `PROGRESS.md`, durable
  rationale in `DECISIONS.md`.
- **Durability** — knowledge lives in version control, not in a session's
  memory. If it matters tomorrow, write it down.

---

## Archiving Growing State Files

Long-lived logs (`PROGRESS.md`, `DECISIONS.md`) must not grow unbounded. Roll old
entries **off** into a dated archive instead of deleting them, and keep a source
map. Both files keep a `## Archive` header (asserted by `npm run check:harness`)
so the trail is never lost. Each file's `## Archive` section links **once** to its
archive `README.md`, which indexes every archived period. The two differ in **what
triggers a roll-off**:

**`PROGRESS.md` — roll off by age/size.** When `## Done` gets long (rule of
thumb: the file passes ~200 lines, or end of quarter), move finished entries into
`docs/archive/progress/<YYYY-QN>.md`, add it to
`docs/archive/progress/README.md`, and keep only current state in `PROGRESS.md`.

**`DECISIONS.md` — roll off by status, never by age.** Only entries marked
`superseded` or `obsolete` are eligible. Move them into
`docs/archive/decisions/<YYYY-QN>.md`, add it to
`docs/archive/decisions/README.md`, keep every `accepted` decision live, and
ensure the entry that superseded each archived one still resolves.

---

## Audit Instructions Like Dependencies

Instructions are a dependency: each rule has a _source_ and an _expiry_.
`CONSTRAINTS.md` tags every rule with `[src:…]` (why it exists) and `[exp:…]`
(when it can be deleted).

**Quarterly cadence:** review every rule whose `[exp:]` is a `review-by:<YYYY-QN>`
date that has passed. For each: if the reason still holds → refresh the date; if
the library/version/policy it guarded is gone → delete the rule; if a `[review]`
rule has gained a deterministic check → retag it `[auto]` in the same change.
Rules tagged `[exp:never]` are structural invariants, exempt from the date sweep.

When the same `[review]` issue is caught by a human reviewer more than once,
promote it to a deterministic check (an ESLint rule, a `check:harness` predicate,
or a `check-co-modification` rule) and retag the `CONSTRAINTS.md` rule
`[review]→[auto]` in the same change.
