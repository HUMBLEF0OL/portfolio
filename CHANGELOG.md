# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Agentic workflow harness: governance & state files (`AGENTS.md`,
  `CONSTRAINTS.md`, `PROGRESS.md`, `DECISIONS.md`, `INITIALIZATION.md`), docs
  harness under `docs/`, `.claude/` orchestration (agents, commands, skills),
  enforcement layer (ESLint flat config, Prettier, commitlint, lint-staged,
  Vitest, Playwright, Husky, `scripts/check-harness.mjs`,
  `scripts/check-co-modification.mjs`), and a right-sized SEO module
  (`src/config/site.ts`, `robots.ts`, `sitemap.ts`, `manifest.ts`).
