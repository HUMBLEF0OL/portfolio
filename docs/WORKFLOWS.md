# Development Workflows

Git, branching, commits, and day-to-day development conventions for this
portfolio. For library-specific guidance (how to write a test, add a section,
add a translation), read the matching file under `.claude/skills/`.

This file is the **process index**. Two sibling docs own the rest:

- **Agent coordination** — handoff contract, routing, feature-creation order,
  agent memory, session clock-in/out → [`AGENT_OPS.md`](AGENT_OPS.md)
- **Verification & validity** — verification commands, harness check, Fresh
  Session Test, ACID discipline, state archival, instruction audit →
  [`VERIFICATION.md`](VERIFICATION.md)

---

## Git Strategy

### Branches

- `master` — Production-ready code (deployed to Vercel)
- `feat/*` — New features
- `fix/*` — Bug fixes
- `chore/*` — Maintenance, deps, tooling
- `docs/*` — Documentation changes

### Commit Format (Conventional Commits)

```
<type>(<scope>): <description>

Types: feat | fix | docs | style | refactor | test | chore | perf | ci | build | revert
```

The subject is **lower-case** and ≤100 chars (enforced by commitlint via the
`commit-msg` hook). Examples:

```
feat(seo): add sitemap and robots routes
fix(header): preserve locale on language switch
chore(deps): bump next-intl to latest minor
test(utils): add cn utility tests
```

Commit discipline (ACID) lives in [`VERIFICATION.md`](VERIFICATION.md) →
"ACID Commit Discipline".

---

## Agent-Driven Development Workflow

### Starting a New Feature

1. **Describe** the feature to your AI tool.
2. **Scaffold** using the scaffold agent — generates the section/component,
   wires i18n keys across all 12 locales, and adds metadata where relevant.
3. **Review** the generated code — naming, Server/Client split, edge cases.
4. **Validate** using the validator agent — convention, i18n, security checks.
5. **Test** — add/verify unit (vitest) and, for flows, e2e (playwright) tests.
6. **Docs sync** — run the docs agent when architecture/package/workflow
   surfaces changed.
7. **Commit** — conventional commit format; stage `PROGRESS.md` with any
   `src/**` change (the co-modification gate requires it).

### Human-in-Loop Checkpoints

The actions that require human approval are owned by **`CONSTRAINTS.md` →
Human-in-Loop Checkpoints**. Pause for review there, plus before merging to
`master`.

### Using Agents

Invoke the agent that owns the surface you are changing (see the Boundary
Contract in `AGENTS.md`). The inter-agent handoff contract, the agent routing
map, and feature-creation order live in [`AGENT_OPS.md`](AGENT_OPS.md).

---

## Testing Strategy

| Type      | Location                          | When         |
| --------- | --------------------------------- | ------------ |
| Unit      | `src/**/*.test.{ts,tsx}`          | Every commit |
| Component | `src/**/*.test.tsx`               | Every commit |
| E2E       | `e2e/**/*.spec.ts`                | Pre-merge    |

Unit/component tests run on Vitest + Testing Library (`npm run test:run`); E2E
runs on Playwright (`npm run test:e2e`). Verification commands by phase live in
[`VERIFICATION.md`](VERIFICATION.md).

---

## Package Update Strategy

### Monthly Check

```bash
npm run update:check
```

Reviews: outdated packages, security vulnerabilities, Node.js compatibility.

### Quarterly Update

1. Create update branch: `git checkout -b chore/quarterly-update`
2. Run the updater agent or manually bump
3. Run the full verification set (`VERIFICATION.md`)
4. Commit: `chore(deps): quarterly update`
5. Tag `deps-update-<YYYY-MM>` and merge to `master`

Adding a runtime dependency is a Human-in-Loop checkpoint (`CONSTRAINTS.md`);
dev-only tooling deps follow the package-addition criteria in `docs/PACKAGES.md`.

---

## Design Specs & Implementation Plans

- **Design specs** → `docs/specs/<YYYY-MM-DD>-<topic>-design.md`
- **Implementation plans** → `docs/plans/<slug>.md`
- The superpowers brainstorming/planning skills write to
  `docs/superpowers/{specs,plans}/`; those **coexist** with the paths above —
  either location is valid for this project.
