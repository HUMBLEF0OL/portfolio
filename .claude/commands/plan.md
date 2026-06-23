---
description: Generate an implementation plan from a Technical Specification.
argument-hint: <tsd-path>
---

# /plan — TSD → Implementation Plan

You are writing a phased, checkbox-driven implementation plan from the TSD at
`$1`. Output is a single markdown file. **No code generation.** The plan is
consumed by other agents (`executing-plans`, `subagent-driven-development`)
or by a human, not by this prompt.

## Steps

1. **Read the TSD** at `$1`. If the file is missing, error and stop.

2. **Read `docs/plans/_template.md`** to know the output shape — phased
   structure, Phase Overview table, Cross-Cutting Conventions, per-phase
   `- [ ]` checkbox tasks.

3. **Ask clarifying questions, one at a time.** Cover:
   - Phasing — natural seams in the TSD that map to phase boundaries.
   - Sequencing — what must land before what.
   - Risks — anything in the TSD that needs a spike or proof of concept first.

   Wait for the user's answer between questions. Multiple-choice preferred.

4. **Derive a slug** from the TSD filename (strip extension; usually matches
   the TSD slug).

5. **Write `docs/plans/<slug>-plan.md`** using the template. Each phase has a
   Goal, a Files list, and a Tasks list of `- [ ]` checkboxes — small enough
   that a single subagent can complete each task in one turn. Mirror the
   style of any existing plan under `docs/plans/` or `docs/superpowers/plans/`.
   Remember the cross-cutting rules: conventional commits, stage `PROGRESS.md`
   with any `src/**` change, and land i18n copy in all 12 `messages/*` files.

6. **Self-review pass.** Re-read the plan. Check that:
   - Every TSD requirement maps to at least one task.
   - No task says "implement X" without showing the code shape or test.
   - Phase boundaries produce committable, testable software.
     Fix inline.

7. **Print the output path** and suggest the user execute the plan via
   `executing-plans`, `subagent-driven-development`, or manually — task by
   task with TDD and frequent commits.

## Out of scope

- Writing source code.
- Running tests.
- Calling other agents or shell commands beyond reading the TSD and writing
  the plan file.
