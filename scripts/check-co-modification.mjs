#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Co-Modification Gate — pre-commit only.
 * Run: node scripts/check-co-modification.mjs  (invoked by .husky/pre-commit)
 *
 * Enforces state-TRANSITION rules: "if a TRIGGER path is staged, a REQUIRED
 * companion file must be staged in the same commit." This is the mechanical
 * referent for CONSTRAINTS.md "keep PROGRESS.md current" — an `[auto]` rule needs
 * a check that fails on violation, and a state-at-rest structural checker
 * (scripts/check-harness.mjs) deliberately cannot see the git index.
 *
 * Architectural contract (why this is a SEPARATE script from check-harness.mjs):
 *   - check-harness.mjs is zero-dep, git-agnostic, and runs identically in CI,
 *     pre-commit, and a fresh clone. It must stay pure.
 *   - This gate inspects `git diff --cached`, which is only meaningful at commit
 *     time and would misbehave in CI. Two scripts, two contracts — do not merge.
 *
 * Failure policy:
 *   - Fail OPEN on infra absence (no git / no index / no HEAD) — exit 0. This is
 *     a commit-time convenience gate, not a security control; it must not block
 *     legitimate non-repo usage or a first commit.
 *   - Fail CLOSED on an actual violation — exit 1.
 *
 * Each rule has a scoped escape hatch (SKIP_<THING>=1), mirroring SKIP_TYPECHECK.
 * A scoped skip keeps the OTHER gates live, unlike `git commit --no-verify`,
 * which disables every hook at once.
 */

import { execSync } from 'node:child_process'

// ── Config: state-transition rules (the per-project configurable surface) ──────
// Each rule: { name, when(file)->bool trigger, require companion path, skipEnv, why }
const RULES = [
  {
    name: 'State currency',
    when: (f) => f.startsWith('src/'), // any application-code change
    require: 'PROGRESS.md', // companion that must move with it
    skipEnv: 'SKIP_STATE_CHECK',
    why: 'PROGRESS.md is the cross-session State subsystem; ACID Atomicity = one logical change updates it in the same commit (docs/VERIFICATION.md).',
  },
  // Add more transition rules here — same shape. Examples from the design:
  //   route added ⇒ sitemap/registry updated; dep added ⇒ lockfile staged;
  //   public API changed ⇒ CHANGELOG/docs touched.
]
// ───────────────────────────────────────────────────────────────────────────

const RED = '\x1b[31m'
const RESET = '\x1b[0m'

let staged
try {
  staged = execSync('git diff --cached --name-only --diff-filter=ACMR', { encoding: 'utf8' })
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
} catch {
  // No git / index / HEAD — fail open. This is a convenience gate, not a control.
  process.exit(0)
}

let failed = 0
for (const r of RULES) {
  if (process.env[r.skipEnv] === '1') continue
  const triggers = staged.filter(r.when)
  if (triggers.length && !staged.includes(r.require)) {
    failed++
    console.log(`${RED}✗ ${r.name}: ${r.require} not updated${RESET}`)
    console.log(`   triggered by: ${triggers.slice(0, 5).join(', ')}`)
    console.log(`   why: ${r.why}`)
    console.log(
      `   fix: update ${r.require} and \`git add\` it, or set ${r.skipEnv}=1 for an irrelevant commit.`
    )
  }
}

process.exit(failed ? 1 : 0)
