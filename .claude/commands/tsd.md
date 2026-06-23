---
description: Generate a Technical Specification from a Business Requirements Document.
argument-hint: <brd-path>
---

# /tsd — BRD → TSD

You are writing a one-time bootstrap Technical Specification from the BRD at
`$1`. Output is a single markdown file. **No code generation. No subagent
delegation. No scope detection.**

## Steps

1. **Read the BRD** at `$1`.
   - If the file is missing, error and stop.
   - If the path ends in `.docx`, error with: _"BRD must be markdown. Convert
     with: `pandoc input.docx -o input.md`"_ and stop.
   - If the path does not end in `.md`, error and stop.

2. **Read `docs/brd/_format.md`** to know the expected BRD shape. If the BRD
   is missing one of the documented sections, **warn** (do not fail) and note
   the gap in the TSD's "Open questions".

3. **Load project context.** Read these docs in order so you do _not_ re-ask
   the user about anything they already describe:
   - `AGENTS.md` — project identity, skills inventory.
   - `docs/PACKAGES.md` — exact stack and versions.
   - `docs/ARCHITECTURE.md` — folder layout, Server/Client split, conventions.
   - `docs/WORKFLOWS.md` — branch / commit / test workflows.

   If any of these files is missing, note it as an Open Question rather than
   asking the user about its contents.

4. **Read `docs/tsd/_template.md`** to know the output shape. Use it verbatim
   as the section skeleton.

5. **Ask clarifying questions, one at a time.** Cover only what the BRD and
   the project-context docs from step 3 do **not** already answer:
   - BRD ambiguities or contradictions.
   - Feature-specific decisions not implied by the existing stack.
   - Missing acceptance criteria.

   **Do not ask** about stack choices, folder layout, branching, commit
   conventions, or anything else covered by the context docs — reference them
   directly in the TSD instead.

   Prefer multiple-choice over open-ended. Wait for the user's answer before
   asking the next question. Stop asking when you have enough to write a
   complete TSD.

6. **Derive a slug** from the BRD filename (strip extension, kebab-case). If
   the slug is ambiguous, ask the user which slug to use.

7. **Write `docs/tsd/<slug>.md`** using the template, filled in from the BRD,
   the project-context docs, and the clarifying answers. Do not invent
   requirements not present in those sources.

8. **Self-review pass.** Re-read the file you just wrote. Scan for:
   - `TBD` or `TODO` markers — replace with answers or move to Open questions.
   - Internal contradictions.
   - Vague requirements ("good performance", "easy to use").
   - Re-asked-the-user items that should have been pulled from context docs.
     Fix inline.

9. **Print the output path** and ask the user to review the TSD before running
   `/plan docs/tsd/<slug>.md`.

## Out of scope

- Per-feature TSDs (this is a one-time bootstrap).
- Calling other agents or running code.
