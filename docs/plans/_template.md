# <Feature> Implementation Plan

> **Status:** Draft — pending review
> **Spec:** `docs/specs/<YYYY-MM-DD>-<feature>-design.md`
> **Goal:** One sentence describing what this builds.

## Phase Overview

| #   | Phase        | Outcome                |
| --- | ------------ | ---------------------- |
| 1   | <phase name> | <user-visible outcome> |
| 2   | <phase name> | <user-visible outcome> |

## Cross-Cutting Conventions

- **Branch:** `feat/<feature>` from `master`. Conventional Commits. Stage
  `PROGRESS.md` with any `src/**` change (co-modification gate).
- **TDD:** write the failing test first. Run it. Implement. Run it again. Commit.
- **i18n:** any new copy lands in all 12 `messages/*` files (`add-translations`).
- **DRY / YAGNI:** only build what the spec calls for. Defer the rest.

---

## Phase 1 — <Phase Name>

**Goal:** <one sentence>

**Files:**

- Create: `src/path/to/file.tsx`
- Modify: `src/path/to/existing.tsx:LINE-LINE`
- Test: `src/path/to/file.test.tsx`

### Tasks

- [ ] **1.1 Write the failing test**

  ```ts
  it('does the thing', () => {
    expect(thing()).toBe('expected')
  })
  ```

- [ ] **1.2 Run the test — expect FAIL**

  Run: `npm run test:run -- src/path/to/file.test.tsx`
  Expected: 1 failed.

- [ ] **1.3 Implement minimal code**

- [ ] **1.4 Run the test — expect PASS**

- [ ] **1.5 Commit**

  ```bash
  git add src/path/to/file.tsx src/path/to/file.test.tsx PROGRESS.md
  git commit -m "feat(<feature>): <what>"
  ```
