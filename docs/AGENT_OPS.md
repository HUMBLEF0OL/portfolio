# Agent Operations

How agents coordinate on this project: the handoff contract, routing, feature
creation order, agent memory, and the per-session clock-in / clock-out protocol.
For day-to-day development flow, git, and testing, see
[`WORKFLOWS.md`](WORKFLOWS.md); for verification and the Fresh Session Test, see
[`VERIFICATION.md`](VERIFICATION.md).

---

## Standard Handoff Contract

Every inter-agent handoff must include:

- `from`
- `to`
- `objective`
- `changed_surfaces`
- `verification_run`
- `risks`
- `follow_up_owner`

Required rules:

- `changed_surfaces` lists files or folders touched.
- `verification_run` lists exact commands executed and pass/fail status.
- `risks` includes at least one item or `none`.
- `follow_up_owner` is one of: `human`, `validator`, `docs`, `scaffold`,
  `updater`.
- Receiving agents restate assumptions before acting.

Example:

```yaml
from: scaffold
to: validator
objective: Validate generated Testimonials section
changed_surfaces:
  - src/block/Testimonials.tsx
  - messages/*.json
verification_run:
  - npm run lint: pass
  - npm run test:run: pass
risks:
  - none
follow_up_owner: docs
```

---

## Agent Routing

Route a request to the agent that owns the surface being changed. This is the
canonical map.

| Signal                      | Agent / command                           |
| --------------------------- | ----------------------------------------- |
| "scaffold a section"        | `scaffold` agent                          |
| "validate" or post-scaffold | `validator` agent                         |
| "update dependencies"       | `updater` agent                           |
| "audit alternatives"        | `updater` agent (audit-alternatives mode) |
| `/docs` command             | `docs` agent                              |
| `/review` command           | `validator` agent                         |

---

## Feature Creation Order

When scaffolding a new section/feature, create files in this order (consult the
matching skill file at each step):

1. Translation keys in `messages/*` (all 12 locales) — see `add-translations`
2. Static content in `src/data/*.json` — if the section is data-driven
3. UI primitives (`src/components/ui/`) via `add-shadcn-ui` — if needed
4. Section component (`src/block/`) via `add-section`
5. Compose into `src/app/[locale]/page.tsx`
6. Metadata via `generateMetadata` — if a new route is added
7. Tests (`*.test.tsx` next to source; `e2e/` for flows)

---

## Agent Memory

Agent memory is **session-local scratch**: agents write it to the project folder
(never a tool's personal session memory), but `.claude/agent-memory/` is
git-ignored — not durable across clones and possibly absent. Durable
cross-session / cross-agent knowledge belongs in `PROGRESS.md` and `DECISIONS.md`.

| Scope              | Path                                      | When to write                    |
| ------------------ | ----------------------------------------- | -------------------------------- |
| Cross-agent shared | `.claude/agent-memory/shared/MEMORY.md`   | Every run — append a dated entry |
| Agent-specific     | `.claude/agent-memory/{agent}/MEMORY.md`  | Every run — append a dated entry |

Rules: **read** the shared memory first **if present** (a fresh clone has none —
don't block on it); **append** a dated entry (`## YYYY-MM-DD — {summary}` +
bullets) to both the shared memory and the agent's own memory after finishing;
never write outside the project directory. Exception: agents inside a parallel
batch write **no** shared state — the orchestrator does the single batch write
(see "Parallel Execution" below).

---

## Session Protocol (clock-in / clock-out)

Long-running work loses the _why_ across sessions because context is finite.
Bracket every working session with an explicit clock-in and clock-out so a fresh
session resumes from the repository, not from memory.

### Clock-in (session start)

1. Read `PROGRESS.md` — `## Current Focus`, `## In Progress`, `## Blocked`.
2. Confirm only one `## In Progress` item (WIP=1); if more, close one out first.
3. Skim the most recent [`DECISIONS.md`](../DECISIONS.md) entries for durable
   rationale that constrains today's work.
4. Run `npm run check:harness` — confirm the harness starts green.
5. Confirm a clean or known git state (`git status`); resolve surprises first.

### Clock-out (session end)

1. Update `PROGRESS.md` — move finished items to `## Done`, refresh
   `## Current Focus` / `## In Progress` / `## Next Up`.
2. Append any durable decisions or harness-induced failure logs to
   [`DECISIONS.md`](../DECISIONS.md) (volatile scratch notes stay in `PROGRESS.md`).
3. Make an **atomic commit only when verification passes** (see
   [`VERIFICATION.md`](VERIFICATION.md) → ACID Commit Discipline).
4. Confirm `npm run check:harness` is green before ending the session.

---

## Parallel Execution

Most work is sequential (WIP=1). When **one** feature splits into sections that
touch **disjoint file surfaces** with no cross-section dependency, build them
concurrently. The parallel batch is still a single WIP item.

A pair of sections may run in parallel only if **all three** hold: disjoint file
surfaces (use module + `ARCHITECTURE.md` boundaries as the cut lines); no
contract dependency (neither imports the other's types); no shared gated action
(keep `CONSTRAINTS.md` checkpoints in one section only). Shared translation keys
in `messages/*` are a shared surface — land them first, sequentially.

Protocol: land shared contracts first (types, the page shell, shared i18n keys);
fan out one git worktree + branch per section; each agent returns a handoff block
and writes **no** shared state; integrate sequentially, re-running the full gate
at each merge; the orchestrator owns the single `PROGRESS.md` / `DECISIONS.md`
update for the whole batch.
