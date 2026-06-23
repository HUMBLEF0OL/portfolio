# <Feature> — Design Spec

> **Date:** YYYY-MM-DD
> **Status:** Draft | Approved (brainstorming complete; ready for implementation plan)
> **Source:** Where this came from (brainstorm, ticket, prior spec).

Design specs live here as `docs/specs/<YYYY-MM-DD>-<topic>-design.md`. The
superpowers brainstorming skill may instead write to
`docs/superpowers/specs/` — both locations coexist for this project.

## Goal

One paragraph: what this builds and the end state.

## Scope decisions (locked during brainstorming)

Numbered list of the decisions that frame the work.

## Non-goals (explicitly dropped)

What is deliberately out of scope.

## Architecture

The approach: components, file surfaces, data flow. Reference
`docs/ARCHITECTURE.md` and `docs/PACKAGES.md` rather than restating the stack.

## Phasing

Phases that each end green and committable. Each phase: goal, files, verification.

## Verification (definition of done)

The exact commands that must pass (`lint`, `typecheck`, `test:run`, `build`,
`check:harness`, `test:gates`) and any acceptance criteria.

## Risks & mitigations

Known risks and how each is handled.
