#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Test for the co-modification gate (scripts/check-co-modification.mjs).
 * Run: node scripts/check-co-modification.test.mjs  (or: npm run test:gates)
 *
 * Every git-aware gate should ship with a test. We can't poke the developer's
 * real staging area, so we drive the gate through a THROWAWAY index via
 * GIT_INDEX_FILE. The throwaway index is seeded from HEAD ("nothing staged"),
 * then we synthesize staged entries with `git update-index --cacheinfo` so
 * neither the real index nor the working tree is ever touched.
 *
 * Zero runtime dependencies (no test framework) so it runs in any clone, and is
 * intentionally OUTSIDE the vitest `src/**` glob — it drives git, not the app.
 */

import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const GATE = path.join(__dirname, 'check-co-modification.mjs')

const git = (args, opts = {}) =>
  execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', ...opts }).trim()

const gitDir = git(['rev-parse', '--git-dir'])
const TMPIDX = path.join(path.resolve(ROOT, gitDir), 'tmp-co-mod-test-index')

/** Fresh throwaway index seeded from HEAD == "nothing staged". */
function seedIndex() {
  fs.rmSync(TMPIDX, { force: true })
  git(['read-tree', 'HEAD', `--index-output=${TMPIDX}`])
}

/** Stage a synthetic Added/Modified entry into the throwaway index only. */
function stage(relPath, content = `// synthetic ${relPath}\n`) {
  const sha = execFileSync('git', ['hash-object', '-w', '--stdin'], {
    cwd: ROOT,
    input: content,
    encoding: 'utf8',
  }).trim()
  git(['update-index', '--add', '--cacheinfo', `100644,${sha},${relPath}`], {
    env: { ...process.env, GIT_INDEX_FILE: TMPIDX },
  })
}

/** Run the gate against the throwaway index; return its exit code. */
function runGate(extraEnv = {}, cwd = ROOT) {
  try {
    execFileSync(process.execPath, [GATE], {
      cwd,
      stdio: 'pipe',
      env: { ...process.env, GIT_INDEX_FILE: TMPIDX, ...extraEnv },
    })
    return 0
  } catch (err) {
    return typeof err.status === 'number' ? err.status : 1
  }
}

let passed = 0
let failed = 0
function expect(label, actual, want) {
  if (actual === want) {
    passed++
    console.log(`\x1b[32m✓\x1b[0m ${label} (exit ${actual})`)
  } else {
    failed++
    console.log(`\x1b[31m✗ ${label}\x1b[0m — got exit ${actual}, want ${want}`)
  }
}

// 1. PASS — only a non-trigger file staged: rule doesn't fire.
seedIndex()
stage('README.md')
expect('non-trigger change alone passes', runGate(), 0)

// 2. PASS — trigger + required companion both staged.
seedIndex()
stage('src/feature/widget.ts')
stage('PROGRESS.md')
expect('src change WITH PROGRESS.md passes', runGate(), 0)

// 3. FAIL — trigger staged, companion missing.
seedIndex()
stage('src/feature/widget.ts')
expect('src change WITHOUT PROGRESS.md fails', runGate(), 1)

// 4. SKIP — violation present but scoped escape hatch set.
seedIndex()
stage('src/feature/widget.ts')
expect('SKIP_STATE_CHECK=1 bypasses the violation', runGate({ SKIP_STATE_CHECK: '1' }), 0)

// 5. FAIL OPEN — no git repo in cwd: infra absence must not block.
const noGitDir = fs.mkdtempSync(path.join(os.tmpdir(), 'co-mod-nogit-'))
try {
  expect('fails open outside a git repo', runGate({ GIT_INDEX_FILE: '' }, noGitDir), 0)
} finally {
  fs.rmSync(noGitDir, { recursive: true, force: true })
}

// Cleanup: the real index was never touched; just drop the throwaway file.
fs.rmSync(TMPIDX, { force: true })

console.log(`\n${failed ? '\x1b[31m' : '\x1b[32m'}${passed} passed, ${failed} failed\x1b[0m\n`)
process.exit(failed ? 1 : 0)
