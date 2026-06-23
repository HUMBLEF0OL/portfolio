#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Update Checker
 * Run: node scripts/check-updates.js
 *
 * Checks for outdated packages, security vulnerabilities, and
 * recommends when to run the quarterly Update Agent.
 */

import { execSync } from 'child_process'

const QUARTERLY_UPDATE_TAG_PREFIX = 'deps-update-'
const RED = '\x1b[31m'
const YELLOW = '\x1b[33m'
const GREEN = '\x1b[32m'
const BLUE = '\x1b[34m'
const RESET = '\x1b[0m'
const BOLD = '\x1b[1m'

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] })
  } catch (e) {
    return e.stdout || ''
  }
}

function section(title) {
  console.log(`\n${BOLD}${BLUE}━━ ${title} ━━${RESET}`)
}

// ─── Check last update date ───────────────────────────────────────────────────

section('Last Update Check')

const tags = run('git tag --list "deps-update-*" --sort=-version:refname').trim().split('\n')
const lastTag = tags[0]

if (!lastTag || lastTag === '') {
  console.log(`${YELLOW}⚠ No update tags found. Dependencies may never have been audited.${RESET}`)
  console.log(`  Run the Update Agent: ${BOLD}.claude/agents/updater.md${RESET}`)
} else {
  const tagDate = lastTag.replace(QUARTERLY_UPDATE_TAG_PREFIX, '')
  const [year, month] = tagDate.split('-').map(Number)
  const lastUpdate = new Date(year, month - 1)
  const now = new Date()
  const monthsDiff =
    (now.getFullYear() - lastUpdate.getFullYear()) * 12 + (now.getMonth() - lastUpdate.getMonth())

  if (monthsDiff >= 3) {
    console.log(`${RED}✗ Last update: ${tagDate} (${monthsDiff} months ago)${RESET}`)
    console.log(`  ${BOLD}Quarterly update overdue! Run the Update Agent.${RESET}`)
  } else {
    console.log(`${GREEN}✓ Last update: ${tagDate} (${monthsDiff} month(s) ago)${RESET}`)
    console.log(
      `  Next update recommended: ${new Date(lastUpdate.setMonth(lastUpdate.getMonth() + 3)).toISOString().slice(0, 7)}`
    )
  }
}

// ─── Outdated packages ────────────────────────────────────────────────────────

section('Outdated Packages')

const outdatedRaw = run('npm outdated --json')

try {
  const outdated = JSON.parse(outdatedRaw)
  const entries = Object.entries(outdated)

  if (entries.length === 0) {
    console.log(`${GREEN}✓ All packages are up to date${RESET}`)
  } else {
    const major = entries.filter(([, v]) => v.current.split('.')[0] !== v.latest.split('.')[0])
    const minor = entries.filter(
      ([, v]) =>
        v.current.split('.')[0] === v.latest.split('.')[0] &&
        v.current.split('.')[1] !== v.latest.split('.')[1]
    )
    const patch = entries.filter(
      ([, v]) =>
        v.current.split('.')[0] === v.latest.split('.')[0] &&
        v.current.split('.')[1] === v.latest.split('.')[1]
    )

    if (major.length) {
      console.log(`\n${RED}Major updates (review changelog before upgrading):${RESET}`)
      major.forEach(([pkg, v]) => console.log(`  ${pkg}: ${v.current} → ${RED}${v.latest}${RESET}`))
    }
    if (minor.length) {
      console.log(`\n${YELLOW}Minor updates (safe with changelog review):${RESET}`)
      minor.forEach(([pkg, v]) =>
        console.log(`  ${pkg}: ${v.current} → ${YELLOW}${v.latest}${RESET}`)
      )
    }
    if (patch.length) {
      console.log(`\n${GREEN}Patch updates (safe to apply):${RESET}`)
      patch.forEach(([pkg, v]) =>
        console.log(`  ${pkg}: ${v.current} → ${GREEN}${v.latest}${RESET}`)
      )
    }
  }
} catch {
  if (outdatedRaw.trim()) {
    console.log(outdatedRaw)
  } else {
    console.log(`${GREEN}✓ All packages up to date${RESET}`)
  }
}

// ─── Security audit ───────────────────────────────────────────────────────────

section('Security Audit')

const auditRaw = run('npm audit --json')

try {
  const audit = JSON.parse(auditRaw)
  const { critical = 0, high = 0, moderate = 0, low = 0 } = audit.metadata?.vulnerabilities || {}

  if (critical > 0) console.log(`${RED}✗ Critical: ${critical}${RESET}`)
  if (high > 0) console.log(`${RED}✗ High: ${high}${RESET}`)
  if (moderate > 0) console.log(`${YELLOW}⚠ Moderate: ${moderate}${RESET}`)
  if (low > 0) console.log(`  Low: ${low}`)
  if (critical === 0 && high === 0 && moderate === 0 && low === 0) {
    console.log(`${GREEN}✓ No vulnerabilities found${RESET}`)
  }
  if (critical > 0 || high > 0) {
    console.log(`\n  ${BOLD}Fix with: npm audit fix${RESET}`)
  }
} catch {
  console.log('Could not parse audit output')
}

// ─── Summary ──────────────────────────────────────────────────────────────────

section('Summary')
console.log(`
To run the full quarterly update:
  ${BOLD}claude --subagent .claude/agents/updater.md${RESET}
`)
