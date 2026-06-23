# AGENTS.md — Base AI Rules (All Tools)

> **The single root instruction file — index & source of truth.** Every AI tool
> (Claude Code, Copilot, Cursor, …) reads this one file. It owns the _pointers_
> to the authoritative harness files: boundary ownership lives here; hard rules
> live in `CONSTRAINTS.md`; process lives in `docs/WORKFLOWS.md`; cross-session
> state lives in `PROGRESS.md`. Any tool-specific extension must not redefine
> ownership or contracts. Keep this file an index — `npm run check:harness`
> fails if it exceeds 120 lines.

This file is **stack-aware but thin**: it names the stack and points at the
per-skill files that carry the library-specific patterns and code templates.

---

## Project Identity

A personal portfolio — **Next.js 15 (App Router) · React 19 · TypeScript
(strict) · Tailwind v4 (CSS-first, no config file) · next-intl (12 locales) ·
shadcn/ui (New York) · emailjs contact form**. Cyberpunk "neural grid" theme
built on a custom angular-clip design system. Node pinned in `.nvmrc`.

- **Full stack & versions:** `docs/PACKAGES.md`, `package.json`
- **Architecture:** `docs/ARCHITECTURE.md` + per-module `src/<module>/ARCHITECTURE.md`
- **Coding rules (no `any`, exports, `var`, `'use client'` in pages, i18n, …):** `CONSTRAINTS.md`

---

## Per-Skill Guidance Index

| Skill           | What it owns                                              |
| --------------- | --------------------------------------------------------- |
| architecture    | File organization, naming, imports                        |
| components      | Server/client component patterns                          |
| routing         | App Router structure, `[locale]` routing                  |
| i18n            | Locale routing, `messages/*`, translation wiring          |
| add-translations| Adding/updating copy across all 12 locale files           |
| add-section     | New page-section/block components                         |
| add-shadcn-ui   | Adding/using shadcn/ui primitives                         |
| design-tokens   | CSS-first `@theme` tokens + angular-clip utility system   |
| seo             | `site.ts`-driven metadata, robots/sitemap/manifest        |
| testing         | Vitest + Testing Library + Playwright usage               |
| error-handling  | Error boundaries and not-found handling                   |
| security        | OWASP boundary checks for this stack                      |
| context7        | Fetching up-to-date library docs                          |

> Only the skills installed under `.claude/skills/` are active. Stack-irrelevant
> skills (auth, proxy, api, db, data-fetching, state, forms, validation) are
> intentionally absent — the portfolio uses none of those libraries.

---

## Boundary Contract

- **Skills** define implementation patterns. **Agents** define orchestration
  decisions. If guidance conflicts, **`AGENTS.md` boundary rules win first**,
  then skill-specific rules apply inside that boundary.
- **Canonical conventions** (naming, imports, rules, structure, stack) live in
  the reference docs (`CONSTRAINTS.md`, `docs/ARCHITECTURE.md`, `docs/PACKAGES.md`).
  Skills and agents **apply** them; they must not restate or redefine them.
- **i18n** owns locale routing and message-catalog sync: every user-facing string
  lives in `messages/*` and must be present in **all 12** locale files.
- **design-tokens** owns the CSS-first `@theme` + angular-clip system in
  `src/app/globals.css`; there is **no** `tailwind.config.*`.
- **seo** owns `src/config/site.ts` as the single source of SEO facts.
- **Docs agent** owns synchronization of docs and instruction surfaces after
  capability changes.
- **Validator** enforces conventions and contract adherence; it does not
  redesign architecture unless explicitly requested.

The development flow lives in `docs/WORKFLOWS.md`; the **Standard Handoff
Contract** and **Session Protocol** (clock-in/out) in `docs/AGENT_OPS.md`; the
**Fresh Session Test** and **ACID commit discipline** in `docs/VERIFICATION.md`.

---

## Where the rest lives

| Concern                                              | Canonical file                 |
| ---------------------------------------------------- | ------------------------------ |
| Hard MUST / MUST NOT rules + approvals               | `CONSTRAINTS.md`               |
| Startup-readiness / initialization phase             | `INITIALIZATION.md`            |
| Dev flow, git, commit format, testing, packages      | `docs/WORKFLOWS.md`            |
| Handoff, routing, feature order, memory, session     | `docs/AGENT_OPS.md`            |
| Verification, Fresh Session Test, ACID, archival     | `docs/VERIFICATION.md`         |
| Cross-session State (current "what")                 | `PROGRESS.md`                  |
| Durable decisions & rationale ("why")                | `DECISIONS.md`                 |
| Global architecture + key file locations             | `docs/ARCHITECTURE.md`         |
| Per-module proximity docs                            | `src/<module>/ARCHITECTURE.md` |

## Working agreement (all agents)

- Read relevant files before editing; make the **minimal** change — don't
  refactor unrelated code.
- Before writing library-specific code, consult the matching `.claude/skills/` file.
- Never hardcode user-facing strings; keep all 12 locale files in sync.
- **Agent memory** and **inter-agent handoffs**: see `docs/AGENT_OPS.md`.
