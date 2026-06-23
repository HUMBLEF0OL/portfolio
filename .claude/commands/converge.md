---
description: Drive an objective to completion via implement → multi-agent audit → fix, looped until an independent auditor reports green.
argument-hint: <objective or @plan-path> [passes=2]
---

# /converge — autonomous implement → audit → fix loop

Drive **`$ARGUMENTS`** to a verifiably-correct result: IMPLEMENT, then spawn INDEPENDENT
multi-agent audits (dynamic `Workflow`, ultracode-style), FIX every real finding, and LOOP
until an auditor reports green or the pass budget is spent. The
"/goal + dynamic workflow + ultracode + loop" pattern.

**Use for** executing a plan/spec, a large feature, or a migration — anything where
independent verification beats speed. **Not for** one-file edits, questions, or trivial fixes.

**vs. the single-pass commands:** [`/plan`](plan.md) writes the plan, [`/review`](review.md)
and [`/validate`](validate.md) audit once. `/converge` is the _driver_ one altitude up — it
executes work AND runs `/review`-style auditing in a loop until independently verified green.
Reach for it when one pass isn't enough; reach for the others when it is.

Runs in the **main loop**, where `Workflow` is available (this command authorizes it —
proceed without re-asking). If `Workflow` is absent, fall back to parallel `Task`/`Agent`
subagents with the same schema and aggregate yourself; the method is identical.

## Step 0 — Lock the objective

- Restate the objective + its one-line definition of done. If `$ARGUMENTS` is a plan path
  (`@path`), read it fully first. Parse optional `passes=N` (default **2**); green-early beats budget.
- Resist stopping early: if built-in `/goal` exists, set `/goal <objective> — loop until an
auditor reports green OR the budget is exhausted (then report honestly)`. Otherwise the budget
  - this rule bound it: **don't stop while a blocker/major is open and passes remain.**

## Step 1 — Scope & track

Inspect the plan AND the real codebase (files touched, conventions, test/build commands) — don't
assume. Build a `TodoWrite`: one item per implementation area + one per audit pass.

## Step 2 — Implement (parallel where safe, sequential where not)

Parallelism is gated by **dependencies + shared files**, not by "it's implementation." Independent
tasks SHOULD run concurrently.

- **Map the graph:** for each task note its deps and the files it writes. Two tasks are
  parallel-safe iff neither depends on the other AND their write-sets are disjoint.
- **Foundations first, alone:** tokens, base schemas/types, shared config — before dependents.
- **Fan out independent, disjoint-file tasks** (`Workflow` `parallel`/`pipeline` or parallel `Agent`
  calls, one per task). Shared mutable files (barrels `index.ts`, global CSS, config indexes,
  lockfiles) are the only collision point — either **consolidate** (agents skip them; one main-loop
  edit adds all exports/entries after they join — preferred, conflict-free) or **isolate** each with
  `isolation: 'worktree'` then reconcile (only when files truly overlap).
- **Serialize only the ordered:** dependents → `pipeline` stages or sequential. Small set or
  shared-file-heavy → plain sequential is simplest; don't parallelize for its own sake.
- TDD where specified (failing test first), repo conventions. Verify before auditing with REAL
  output: tests + `typecheck` + `lint`, `build` after CSS/config/route changes; gate the merged
  tree once after any fan-out.
- If the plan's literal steps are wrong for the toolchain, satisfy its _intent_ and note the deviation
  (e.g. Next `_`-prefixed route folder is private → use `%5F`; zod `.default()` needs 3-generic `useForm`).

## Step 3 — Audit (dynamic Workflow, multi-agent)

Scout inline (list phases/files), THEN fan out adversarial auditors — each finds REAL defects,
defaults a finding to NOT-real unless proven, and quotes concrete evidence. In parallel:

- **One per implementation area** — the plan's Files/Interfaces/behavior actually exist & are correct.
- **Cross-cutting** — domain invariants (web UI: WCAG-AA contrast light+dark, single-source constants,
  reduced-motion, focus-visible, no removed utilities, security boundaries).
- **A verification gate** — runs `typecheck`, `lint`, full tests, harness, `build`; green iff all pass.

Each returns `{ area, green, findings:[{severity:blocker|major|minor, title, file, detail, evidence,
suggestedFix}] }`. **green = no blocker/major AND every auditor (incl. gate) self-reported green.**
Populate `AREAS` — an empty `AREAS` degrades to a gate-only false green.

```js
export const meta = {
  name: 'converge-audit',
  description: 'Adversarial audit',
  phases: [{ title: 'Audit' }],
}
const F = {
  type: 'object',
  additionalProperties: false,
  required: ['area', 'green', 'findings'],
  properties: {
    area: { type: 'string' },
    green: { type: 'boolean' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['severity', 'title', 'file', 'detail', 'evidence', 'suggestedFix'],
        properties: {
          severity: { enum: ['blocker', 'major', 'minor'] },
          title: { type: 'string' },
          file: { type: 'string' },
          detail: { type: 'string' },
          evidence: { type: 'string' },
          suggestedFix: { type: 'string' },
        },
      },
    },
  },
}
const AREAS = [
  ['Phase-1', 'files X,Y + interfaces exist; tests pass; typecheck clean'],
  ['a11y', 'WCAG-AA contrast light+dark (compute ratios); focus-visible everywhere'],
] // one per phase + invariant
const gate = () =>
  agent(
    `GATE: set area:'gate'. Run typecheck, lint, tests, harness, build; report exact pass/fail + tail. No fixes. Each failure => a 'blocker' finding with output as evidence. Errors only under build-cache/generated dirs = stale artifact (clean+rebuild), not a defect.`,
    { label: 'gate', phase: 'Audit', schema: F }
  )
phase('Audit')
const r = (
  await parallel([
    ...AREAS.map(
      ([a, focus]) =>
        () =>
          agent(
            `ADVERSARIAL auditor for "${a}". Plan+repo are your source. REAL defects only, prove each, default NOT-real unless proven.\n${focus}`,
            { label: `audit:${a}`, phase: 'Audit', schema: F }
          )
    ),
    gate,
  ])
).filter(Boolean)
const all = r.flatMap((x) => (x.findings || []).map((f) => ({ ...f, area: x.area })))
const major = all.filter((f) => f.severity !== 'minor')
return {
  green: major.length === 0 && r.every((x) => x.green),
  counts: { total: all.length, major: major.length },
  areaVerdicts: r.map((x) => ({ area: x.area, green: x.green })),
  findings: all,
}
```

## Step 4 — Triage & fix

- **Verify before fixing** (treat as code review): confirm each finding is real; reject wrong ones with
  reasons — don't blindly apply. **Compute objective facts yourself** (contrast, counts, route lists).
- Fix every blocker/major; fix cheap genuine minors, consciously skip exempt/cosmetic ones (say why).
  Watch for regressions — next pass re-scrutinizes prior fixes. Re-run the gate after.

## Step 5 — Loop

Repeat 3–4 until green (0 blocker/major) OR the budget is spent. If the budget is hit while not green,
run one focused confirmation audit on the open items rather than asserting success. Update todos each pass.

## Step 6 — Report

Per-pass defects found & fixed (call out regressions caught + auditor suggestions rejected, with reasons),
final gate numbers, the explicit auditor verdict, anything left (exempt minors, open questions). **No
green without an auditor verdict + passing gate output.** Note commit status (commit only if asked).

## Guardrails

- Independence is the point — adversarial separate agents, not self-review; the gate runs every pass.
- Parallelize independent disjoint-file tasks; serialize only dependent/shared-file work. Never two
  file-mutating agents on the SAME file. Audit is always parallel.
- Evidence before assertions ("tests pass" needs the output). Cost scales passes × auditors — size to risk.
