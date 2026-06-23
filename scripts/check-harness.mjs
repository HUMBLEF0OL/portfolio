#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Harness Structure Checker
 * Run: node scripts/check-harness.mjs  (or: npm run check:harness)
 *
 * Mechanizes the Fresh Session Test (docs/VERIFICATION.md) and the "repository
 * as the single source of truth" contract. Asserts that the harness files an
 * agent or a fresh session needs actually exist and are structurally valid.
 * Zero runtime dependencies.
 *
 * Prints an itemized pass/fail report and exits non-zero on any failure, so it
 * can drop into a pre-commit hook or a CI job unchanged.
 *
 * Failures carry agent-oriented guidance: each predicate's error
 * surfaces what failed, why it matters, and how to fix it, so a fresh session
 * can repair the harness without external context. Success output is unchanged.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const RED = '\x1b[31m'
const GREEN = '\x1b[32m'
const BOLD = '\x1b[1m'
const RESET = '\x1b[0m'

/** @type {{ name: string, ok: boolean, detail: string, why?: string, fix?: string }[]} */
const results = []

function check(name, fn) {
  try {
    const detail = fn()
    results.push({ name, ok: true, detail: detail || 'ok' })
  } catch (err) {
    results.push({ name, ok: false, detail: err.message, why: err.why, fix: err.fix })
  }
}

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8')
}

function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel))
}

// assert(condition, what[, why, fix]) — `what` stays the one-line failure
// message; `why`/`fix` attach agent-oriented guidance the report
// loop prints on failure.
function assert(condition, what, why, fix) {
  if (condition) return
  const err = new Error(what)
  if (why) err.why = why
  if (fix) err.fix = fix
  throw err
}

// ─── Predicate 1: required harness files exist ────────────────────────────────
// Only tool-neutral harness files are required. Tool-specific instruction files
// are intentionally NOT required here, so a variant for any agent platform still
// passes this gate. AGENTS.md is the single root instruction file.

const REQUIRED_FILES = [
  'AGENTS.md',
  'CONSTRAINTS.md',
  'PROGRESS.md',
  'DECISIONS.md',
  'INITIALIZATION.md',
  'README.md',
  'docs/ARCHITECTURE.md',
  'docs/WORKFLOWS.md',
  'docs/AGENT_OPS.md',
  'docs/VERIFICATION.md',
  '.nvmrc',
]

check('Required harness files exist', () => {
  const missing = REQUIRED_FILES.filter((f) => !exists(f))
  assert(
    missing.length === 0,
    `missing: ${missing.join(', ')}`,
    'a fresh session cannot recover state, rules, or rationale without these files',
    'restore the missing file(s) from git history, or recreate them from the template (see docs/VERIFICATION.md → Fresh Session Test)'
  )
  return `${REQUIRED_FILES.length} files present`
})

// ─── Predicate 2: AGENTS.md line count ≤ 120 ──────────────────────────────────

const AGENTS_MAX_LINES = 120

check(`AGENTS.md is <= ${AGENTS_MAX_LINES} lines`, () => {
  const lines = read('AGENTS.md').split('\n')
  // Trailing newline produces a final empty element; don't count it.
  const count = lines.length > 0 && lines[lines.length - 1] === '' ? lines.length - 1 : lines.length
  assert(
    count <= AGENTS_MAX_LINES,
    `AGENTS.md is ${count} lines (max ${AGENTS_MAX_LINES})`,
    'AGENTS.md is an index, not a manual; past the cap it stops being scannable',
    'move detail into the topic docs (docs/WORKFLOWS.md, AGENT_OPS.md, VERIFICATION.md) and leave only a pointer in AGENTS.md'
  )
  return `${count} lines`
})

// ─── Predicate 3: .nvmrc major satisfies engines.node ─────────────────────────
// Intentionally simplified (zero-dependency, no semver lib): compare the leading
// integer of .nvmrc against the first integer found in engines.node's range.

check('.nvmrc major satisfies engines.node', () => {
  const why =
    'a fresh session reads .nvmrc to pick a Node version; a mismatch with engines.node means installs/builds run on an unsupported runtime'
  const nvmrc = read('.nvmrc').trim()
  const nvmrcMajorMatch = nvmrc.match(/\d+/)
  assert(
    nvmrcMajorMatch,
    `.nvmrc has no version number: "${nvmrc}"`,
    why,
    'put a Node major version in .nvmrc (e.g. "22")'
  )
  const nvmrcMajor = Number(nvmrcMajorMatch[0])

  const pkg = JSON.parse(read('package.json'))
  const enginesNode = pkg.engines && pkg.engines.node
  assert(
    enginesNode,
    'package.json has no engines.node',
    why,
    'add an "engines": { "node": ">=NN" } field to package.json'
  )
  const enginesMinMatch = String(enginesNode).match(/\d+/)
  assert(
    enginesMinMatch,
    `engines.node has no version number: "${enginesNode}"`,
    why,
    'give engines.node a numeric range (e.g. ">=22")'
  )
  const enginesMinMajor = Number(enginesMinMatch[0])

  assert(
    nvmrcMajor >= enginesMinMajor,
    `.nvmrc major ${nvmrcMajor} < engines.node min major ${enginesMinMajor}`,
    why,
    'bump .nvmrc to at least the engines.node minimum major, or lower engines.node to match .nvmrc'
  )
  return `.nvmrc ${nvmrcMajor} >= engines ${enginesMinMajor}`
})

// ─── Predicate 4: every top-level src/ dir has an ARCHITECTURE.md ──────────────

check('Every top-level src/ directory has ARCHITECTURE.md', () => {
  const why =
    'per-module ARCHITECTURE.md answers "how is this module organized?" for a fresh session (Fresh Session Test Q2)'
  const srcPath = path.join(ROOT, 'src')
  assert(
    fs.existsSync(srcPath),
    'src/ does not exist',
    why,
    'create the src/ directory, or run this from the repo root'
  )
  const dirs = fs
    .readdirSync(srcPath, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
  assert(
    dirs.length > 0,
    'no top-level directories under src/',
    why,
    'add your module directories under src/'
  )
  const missing = dirs.filter((d) => !exists(path.join('src', d, 'ARCHITECTURE.md')))
  assert(
    missing.length === 0,
    `missing ARCHITECTURE.md in: ${missing.map((d) => `src/${d}`).join(', ')}`,
    why,
    'add an ARCHITECTURE.md to each listed module describing its purpose and layout'
  )
  return `${dirs.length} modules documented`
})

// ─── Predicate 5: PROGRESS.md has all required section headers ─────────────────

const PROGRESS_HEADERS = [
  '## Current Focus',
  '## Done',
  '## In Progress',
  '## Blocked',
  '## Next Up',
  '## Decisions & Notes',
  // Source map for rolled-off state — see docs/archive/progress/README.md.
  '## Archive',
]

check('PROGRESS.md has all required section headers', () => {
  const content = read('PROGRESS.md')
  const missing = PROGRESS_HEADERS.filter((h) => !content.includes(h))
  assert(
    missing.length === 0,
    `missing headers: ${missing.join(', ')}`,
    'these sections are the cross-session State subsystem; a missing one drops a category of progress a fresh session needs',
    'add the missing "## ..." header(s) back to PROGRESS.md (do not rename them — the predicate matches exact text)'
  )
  return `${PROGRESS_HEADERS.length} headers present`
})

// ─── Predicate 6: CONSTRAINTS.md has both MUST and MUST NOT markers ────────────

check('CONSTRAINTS.md contains MUST and MUST NOT markers', () => {
  const content = read('CONSTRAINTS.md')
  const why =
    "CONSTRAINTS.md is the project's hard-rules file; without both marker sections the rule structure agents rely on is gone"
  const fix =
    'restore the "## MUST NOT" and "## MUST" sections (see docs/VERIFICATION.md and the template)'
  assert(content.includes('MUST NOT'), 'no "MUST NOT" marker found', why, fix)
  // A bare MUST that is not part of "MUST NOT".
  assert(/MUST(?! NOT)/.test(content), 'no standalone "MUST" marker found', why, fix)
  return 'MUST and MUST NOT present'
})

// ─── Predicate 7: DECISIONS.md has the decision-log + archive source-map headers ─
// The "## Archive" header is the source map for rolled-off (superseded/obsolete)
// decisions — same role as PROGRESS.md's, so it must never be lost.

check('DECISIONS.md has "## Decision Log" and "## Archive" headers', () => {
  const content = read('DECISIONS.md')
  assert(
    content.includes('## Decision Log'),
    'missing "## Decision Log" header',
    'a fresh session cannot recover durable rationale without the decision log',
    'add a "## Decision Log" header to DECISIONS.md for current "why" entries'
  )
  assert(
    content.includes('## Archive'),
    'missing "## Archive" header',
    'the "## Archive" header is the source map for rolled-off (superseded/obsolete) decisions, so the trail is never lost',
    'add an "## Archive" header to DECISIONS.md (see docs/VERIFICATION.md → Archiving Growing State Files)'
  )
  return 'decision-log and archive headers present'
})

// ─── Predicate 8: INITIALIZATION.md has all four startup-readiness markers ─────

const INIT_MARKERS = [
  '## 1. Can start',
  '## 2. Can test',
  '## 3. Can see progress',
  '## 4. Can pick up next steps',
]

check('INITIALIZATION.md has all four startup-readiness markers', () => {
  const content = read('INITIALIZATION.md')
  const missing = INIT_MARKERS.filter((m) => !content.includes(m))
  assert(
    missing.length === 0,
    `missing markers: ${missing.join(', ')}`,
    'these four conditions answer "is the project init-ready?" (Fresh Session Test Q6); a missing one leaves startup readiness unprovable',
    'restore the missing "## N. ..." header(s) in INITIALIZATION.md (exact text — the predicate matches literally)'
  )
  return `${INIT_MARKERS.length} condition markers present`
})

// ─── Predicate 9: workflow topic docs stay within the line budget ──────────────
// 50–150 lines is the topic-doc guideline. The cap is 170 — generous
// headroom over the guideline to avoid false friction while preventing re-bloat.

const TOPIC_DOC_MAX_LINES = 170

function lineCount(rel) {
  const lines = read(rel).split('\n')
  // Trailing newline produces a final empty element; don't count it.
  return lines.length > 0 && lines[lines.length - 1] === '' ? lines.length - 1 : lines.length
}

check(`Workflow topic docs are <= ${TOPIC_DOC_MAX_LINES} lines`, () => {
  const docs = ['docs/WORKFLOWS.md', 'docs/AGENT_OPS.md', 'docs/VERIFICATION.md']
  const over = docs.map((d) => ({ d, n: lineCount(d) })).filter(({ n }) => n > TOPIC_DOC_MAX_LINES)
  assert(
    over.length === 0,
    `over budget: ${over.map(({ d, n }) => `${d} (${n} lines)`).join(', ')}`,
    'topic docs are meant to stay scannable (50–150 line guideline); past the cap they re-bloat into manuals',
    'split the over-budget doc into focused topic files, or move stale detail out (mirror the WORKFLOWS.md split)'
  )
  return docs.map((d) => `${d}=${lineCount(d)}`).join(', ')
})

// ─── SEO predicates ───────────────────────────────────────────────────────────
// The SEO module is config-driven infrastructure; these guard against the
// regressions the design (docs/superpowers/specs/2026-06-23-agentic-workflow-harness-design.md)
// calls out.

const rel = (f) => path.relative(ROOT, f).split(path.sep).join('/')

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, acc)
    else acc.push(full)
  }
  return acc
}

// ─── Predicate 10: every page.tsx exports metadata or generateMetadata ─────────

check('Every page.tsx exports metadata or generateMetadata', () => {
  const appDir = path.join(ROOT, 'src/app')
  const why =
    'a page without metadata ships no title/canonical/OG/hreflang, so it ranks poorly and is mis-rendered when shared'
  const fix =
    'call buildMetadata() inside generateMetadata (or export a static `metadata`) in each listed page — see the seo skill'
  assert(fs.existsSync(appDir), 'src/app does not exist', why, fix)
  const pages = walk(appDir).filter((f) => f.endsWith('page.tsx'))
  const checked = pages.filter((f) => {
    // Redirect-only pages (e.g. the root → /en) never render, so they are exempt.
    const src = fs.readFileSync(f, 'utf8')
    return !/^\s*redirect\(/m.test(src) || /generateMetadata|const\s+metadata/.test(src)
  })
  const missing = checked.filter(
    (f) =>
      !/export\s+(const\s+metadata\b|(async\s+)?function\s+generateMetadata\b)/.test(
        fs.readFileSync(f, 'utf8')
      )
  )
  assert(missing.length === 0, `pages without metadata: ${missing.map(rel).join(', ')}`, why, fix)
  return `${checked.length} pages export metadata (${pages.length - checked.length} redirect-only exempt)`
})

// ─── Predicate 11: root layout sets metadataBase ──────────────────────────────

check('Root layout sets metadataBase', () => {
  assert(
    /metadataBase/.test(read('src/app/layout.tsx')),
    'src/app/layout.tsx does not set metadataBase',
    'without metadataBase, relative canonical/OG URLs resolve wrong (or throw) at build time',
    'add `metadataBase: new URL(siteConfig.url)` to the root layout `metadata` export'
  )
  return 'metadataBase present'
})

// ─── Predicate 12: SEO discoverability surfaces exist ──────────────────────────

const SEO_SURFACES = ['src/app/robots.ts', 'src/app/sitemap.ts', 'src/app/manifest.ts']

check('SEO discoverability surfaces exist', () => {
  const missing = SEO_SURFACES.filter((f) => !exists(f))
  assert(
    missing.length === 0,
    `missing: ${missing.join(', ')}`,
    'robots/sitemap/manifest are how search engines discover and index the site',
    'recreate the missing surface(s); each reads src/config/site.ts — see the seo skill'
  )
  return `${SEO_SURFACES.length} surfaces present`
})

// ─── Predicate 13: siteConfig SEO fields + locale parity with routing ──────────

const localesOf = (s) => {
  const m = s.match(/locales:\s*\[([^\]]*)\]/)
  return m
    ? m[1]
        .replace(/['"\s]/g, '')
        .split(',')
        .filter(Boolean)
        .sort()
        .join(',')
    : null
}
const defaultLocaleOf = (s) => {
  const m = s.match(/defaultLocale:\s*['"]([^'"]+)['"]/)
  return m ? m[1] : null
}

check('siteConfig has SEO fields and matches i18n routing', () => {
  const site = read('src/config/site.ts')
  const required = [
    'defaultLocale',
    'locales',
    'ogImage',
    'ogLocaleMap',
    'trailingSlash',
    'organization',
  ]
  const missing = required.filter((f) => !new RegExp(`\\b${f}\\b`).test(site))
  assert(
    missing.length === 0,
    `siteConfig missing fields: ${missing.join(', ')}`,
    'the SEO module reads these facts from siteConfig; a missing field breaks buildMetadata or the discoverability surfaces',
    'add the missing field(s) to src/config/site.ts (see the design spec for the shape)'
  )
  const routingSrc = read('src/i18n/routing.ts')
  const why =
    'siteConfig.locales/defaultLocale drive hreflang and canonical URLs; if they drift from routing.ts the alternates point at locales that do not exist'
  assert(
    localesOf(site) === localesOf(routingSrc),
    `locales mismatch: site=[${localesOf(site)}] routing=[${localesOf(routingSrc)}]`,
    why,
    'make siteConfig.locales identical to routing.locales in src/i18n/routing.ts'
  )
  assert(
    defaultLocaleOf(site) === defaultLocaleOf(routingSrc),
    `defaultLocale mismatch: site=${defaultLocaleOf(site)} routing=${defaultLocaleOf(routingSrc)}`,
    why,
    'make siteConfig.defaultLocale identical to routing.defaultLocale'
  )
  return 'fields present; locales match routing'
})

// ─── Predicate 14: [locale] layout enables static rendering ────────────────────

check('[locale] layout enables static rendering', () => {
  const src = read('src/app/[locale]/layout.tsx')
  const why =
    'without generateStaticParams + setRequestLocale the [locale] tree renders dynamically — slower and worse for SEO'
  assert(
    /generateStaticParams/.test(src),
    '[locale]/layout.tsx does not export generateStaticParams',
    why,
    'export `generateStaticParams` returning routing.locales.map((locale) => ({ locale }))'
  )
  assert(
    /setRequestLocale/.test(src),
    '[locale]/layout.tsx does not call setRequestLocale',
    why,
    'call `setRequestLocale(locale)` before any next-intl API in the layout'
  )
  return 'generateStaticParams + setRequestLocale present'
})

// ─── Report ───────────────────────────────────────────────────────────────────

console.log(`\n${BOLD}Harness structure check${RESET}\n`)

let failed = 0
for (const r of results) {
  if (r.ok) {
    console.log(`${GREEN}✓${RESET} ${r.name} ${BOLD}(${r.detail})${RESET}`)
  } else {
    failed++
    console.log(`${RED}✗ ${r.name}${RESET} — ${r.detail}`)
    if (r.why) console.log(`   why:  ${r.why}`)
    if (r.fix) console.log(`   fix:  ${r.fix}`)
  }
}

console.log()
if (failed > 0) {
  console.log(`${RED}${BOLD}${failed} of ${results.length} checks failed.${RESET}\n`)
  process.exit(1)
} else {
  console.log(`${GREEN}${BOLD}All ${results.length} harness checks passed.${RESET}\n`)
}
