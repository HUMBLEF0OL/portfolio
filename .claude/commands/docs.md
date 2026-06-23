# /docs

Invoke the docs agent to update project documentation after code changes.

## Usage

```
/docs [description of what changed]
```

**Examples:**

- `/docs` — scan recent changes and update relevant docs
- `/docs added a new Testimonials section` — focus on a specific change
- `/docs added the SEO module` — update SEO/architecture docs

## What happens

The docs agent ([.claude/agents/docs.md](../agents/docs.md)) will:

1. Read recently created or modified files
2. Update `docs/ARCHITECTURE.md` if new folders or patterns were introduced
   (a new top-level `src/` module also needs its own `ARCHITECTURE.md`)
3. Update `docs/PACKAGES.md` if dependencies changed
4. Update SEO/i18n notes if `src/config/site.ts`, surfaces, or message conventions changed
5. Never rewrites entire docs — updates the relevant section only

## When to run

- After scaffolding a new section (`/scaffold` → `/docs`)
- After adding a package
- After structural refactors that change folder layout
- Quarterly alongside the updater agent

Documentation rot is the #1 source of confusion when returning to a project after weeks.
