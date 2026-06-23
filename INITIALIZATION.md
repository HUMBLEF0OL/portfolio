# INITIALIZATION.md — Startup-Readiness Phase

> **Initialization is its own phase, separate from implementation.** The two have
> different optimization targets — initialization optimizes for _being able to
> start_; implementation optimizes for _shipping change_ — and mixing them
> produces a project that compiles but cannot be picked up by a fresh session.
>
> The four conditions are a **human-run checklist**. `npm run check:harness` only
> verifies that this file and its four condition markers exist (structural); it
> does not assert that each box is ticked.

A project is **startup-ready** only when all four conditions hold.

---

## 1. Can start

The project boots from a clean checkout.

- [ ] Node matches `.nvmrc` (`node --version` ≥ the pinned major, `22`).
- [ ] `npm install` completes with no errors.
- [ ] `npm run dev` boots the Turbopack dev server and the app loads at a locale
      route (e.g. `/en`).

---

## 2. Can test

The project proves itself green.

- [ ] `npm run test:run` passes with **at least one real passing test**
      (`src/lib/utils.test.ts`).
- [ ] `npm run lint` passes (`eslint .`).
- [ ] `npm run typecheck` passes (`tsc --noEmit`).
- [ ] `npm run build` produces a production build.
- [ ] `npm run check:harness` exits 0.

---

## 3. Can see progress

A fresh session can read the current state without prior context.

- [ ] `PROGRESS.md` is filled in (real `## Current Focus`, not a placeholder).
- [ ] `docs/ARCHITECTURE.md` and each per-module `src/<module>/ARCHITECTURE.md`
      describe the actual project, not placeholders.

---

## 4. Can pick up next steps

A fresh session knows what to do next.

- [ ] `PROGRESS.md → ## Next Up` lists **at least one real, actionable item**.

---

## Checkpoint

When all four conditions hold, make a checkpoint commit and confirm
`npm run check:harness` is green. See `docs/VERIFICATION.md` for the Fresh
Session Test and the full verification command set.
