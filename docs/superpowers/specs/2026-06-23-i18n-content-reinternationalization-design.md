# Re-internationalize the operator site (12 locales)

**Date:** 2026-06-23
**Status:** Approved (design) — pending spec review
**Branch:** `feat/agentic-harness`

## Problem

The neural-grid / "operator" redesign moved all site content into typed,
English-only `src/data/*.json` files, read directly by each section component.
next-intl is still fully wired (routing, middleware, `request.ts`,
`NextIntlClientProvider`), but only two namespaces — `Seo` and `404` — are
still consumed. The result: **site content is no longer internationalized**.
The header still offers 12 locales, but switching only changes page metadata,
not visible copy.

Goal: restore real internationalization across all 12 locales
(`en, es, fr, it, pt, ru, ja, ko, zh, ar, hi, de`) with fully translated
content, consolidating content back onto next-intl (the project's documented
i18n layer) rather than maintaining a parallel English-only data system.

## Decisions (locked during brainstorming)

1. **Scope:** Model-translate all 12 locales now, across every section.
2. **Architecture:** Consolidate user-facing copy into next-intl
   `messages/<locale>.json`. Reuse the existing next-intl delivery
   (`getTranslations` server-side, `useTranslations` client-side via the
   provider). Retire the duplicate `data/*.json` content system.

## Translation model — "whole-block into messages, config stays out"

next-intl messages become the source for **all user-facing copy**. To keep the
refactor low-risk, each section's copy moves into a message namespace as a
**structured object**, read via a typed `t.raw('…')` accessor. The component's
JSX (every `.map()`, all markup) stays identical; only the data-source line
changes:

```diff
- import site from '@/data/site.json'
- const { hero } = site
+ const m = useTranslations('Home')          // client component
+ const hero = m.raw('hero') as HeroContent  // typed via a local type
```

Server components use `getTranslations` + `t.raw` equivalently.

### Typed `t.raw` access

`t.raw()` returns `unknown`/`any`, losing the typing the JSON imports gave us.
Mitigation: define a small set of content types (e.g. `HeroContent`,
`ServicesContent`, `CaseStudyCopy`) in `src/types/content.ts`, derived from the
shape of `en.json`, and cast `t.raw('hero') as HeroContent` at the read site.
This restores structural typing in the components without per-field plumbing.

### Exception — `caseStudies.json` stays a hybrid

`caseStudies.json` is the largest, most config-dense file (9 studies, each with
`slug`, `links`, numeric metric values, `stack`, `console` commands, image
paths). Duplicating all of that across 12 catalogs would bloat every file and
rot quickly.

- **Stays in `data/caseStudies.json` (config):** `slug`, `displaySlug`,
  `host`, `year`, `category`\*, `image`, `links`, `isPrivate`/`private`,
  `stack`, `console`, `next`, `metrics[].{value,prefix,suffix,decimals,display}`,
  `row.headlineMetric.{value,unit}`, `quote.name`, `quote.verified`.
- **Moves to messages `CaseStudies.<slug>` (copy):** `name`\*, `tagline`,
  `row.blurb`, `context`, `problem.{head,body,before}`,
  `approach.{intro,cards[].{heading,body}}`, `result.{head,before[],after[]}`,
  `quote.{text,role}`, `metrics[].label`.
- **Join:** the homepage Work section and the `work/[slug]` route iterate the
  config array from `data`, and look up copy from `CaseStudies[slug]`.

\* `name` and `category` are technical/brand-ish. `name` (product name) is kept
verbatim per the glossary; `category` strings (e.g. "Dev tool · CLI") are
translated as prose where it reads naturally, keeping tech tokens English.

## What stays out of messages (non-translatable config)

A trimmed **`src/data/config.json`** holds shared non-linguistic constants that
must not be duplicated 12× and have a single source of truth:

- `social` (email, emailHref, github, linkedin, twitter)
- `contact.calLink`
- `identity.monogram`
- `nav.clockTimezone`
- image/avatar paths used outside case studies (e.g. `/avatar.png`)

`src/data/languages.json` stays as-is (locale codes/names for the switcher).
`src/data/caseStudies.json` stays (trimmed to config per above).

These files are **deleted** after migration (content fully moved to messages):
`site.json`, `services.json`, `process.json`, `pricing.json`, `faq.json`,
`testimonials.json`, `about.json`.

## Message namespace structure (per locale)

Existing (kept): `Seo`, `404`.

New content namespaces:

- `Nav` — link labels + hrefs, clock toggle/label, CTA label/href.
- `Home` — `hero`, `ticker`, `stats`, `problem`, `contact` (copy + form option
  labels + points + submit label), `footer` (blurb, cta, copyright, endLabel,
  wordmark). (Grouping the homepage chrome under one namespace; sub-objects read
  via `t.raw`.)
- `Services` — `section` + `items[]` (number stays, title/description/tags;
  tags kept English per glossary).
- `Work` — homepage Work section chrome (eyebrow/kicker/heading/labels).
- `About` — `homepageDossier` + `page` (full About route copy).
- `Process` — `section` + `phases[]`.
- `Engagement` — pricing `section`, `rate`, `tiers[]` (prices kept verbatim) +
  `faq` (`section` + `items[]`).
- `Testimonials` — `section` + `quotes[]` copy (names kept verbatim).
- `CaseStudies` — keyed by slug; copy fields per the hybrid split above.

`en.json` is the **source of truth**; all other locales mirror its key paths
exactly.

> Note: exact namespace boundaries (e.g. whether Hero/Contact/Footer are their
> own namespaces or sub-objects of `Home`) will be finalized in the
> implementation plan after reading each consuming component. The principle is
> fixed; the grouping is an implementation detail.

## Glossary — kept in English across all locales

Translate prose, not the machine aesthetic.

**Kept verbatim:**

- Brand/product names: Hookpilot, Coherence, mcp-sentry, GitCompass, Glassbox,
  Ghostframes, JavaScript-Verse, SkinBattle.gg, Felis AI.
- Person names: Amit Rana, Vanshika Tyagi.
- Tech tokens: Next.js, React, Node, TypeScript, Postgres, OpenAI, LangChain,
  RAG, Supabase, WebSockets, SARIF, MCP, Redux Toolkit, Material UI, Babel,
  Webpack, a11y, Perf, CLI, ESM, etc.
- URLs, emails, hosts, npm/package identifiers.
- Console / CLI snippets (`caseStudies.console`, command lines).
- Currency figures and rates: `$3k`, `$12k`, `$75/hr`, `~$2.5k/wk`.
- Units / abbreviations: DL/wk, CCU, OWASP, MCP01–MCP08.
- **Operator chrome:** `// SYS.0x` eyebrows, `UPPER_SNAKE` kickers
  (`THE_PROBLEM`, `CAPABILITIES`, `MISSION_PHASES`, `OPERATOR_FILE`, …),
  HUD labels and status-row codes (`SYS ONLINE`, `▸ SENIOR PRODUCT ENGINEER`,
  `END OF TRANSMISSION`, `◉ REC`).

**Translated:** all headings, subheads, body/dossier paragraphs, blurbs,
descriptions, CTA labels, nav labels, form field labels and option values, FAQ
Q&A, testimonials, doctrine values, and case-study prose.

## RTL (Arabic)

- Set `dir` on `<html>` derived from locale (`ar` → `rtl`, all others `ltr`).
- v1 scope: correct document direction + text flow. Prefer existing logical
  utilities where present; do not rewrite the operator layout.
- **Out of scope for v1:** pixel-perfect mirrored Arabic layout. The operator
  design uses many absolute `left/right` offsets and directional borders that
  will not auto-mirror; full RTL polish is a tracked follow-up.

## Translation generation

- `en.json` authored first as the source of truth (assembled from current
  `data/*.json` content).
- The 11 other locales generated with the model, parallelized (one agent per
  locale), each given: the full `en.json`, the glossary above, and the
  instruction to preserve key paths and all do-not-translate tokens verbatim.
- Output is machine-grade; flagged for human review. Native review can replace
  any locale later without code changes.

## Safety / verification

- **Compile-time key safety:** generate next-intl's augmented `Messages` type
  from `en.json` (declare `IntlMessages`) so missing/renamed keys fail `tsc`.
- **Key-parity test (TDD):** a vitest test that loads all 12 locale files and
  asserts each has the exact set of key paths present in `en.json` (no missing,
  no extra). Written first; red until every locale is populated.
- **Pipeline:** `npm run lint` + `npm run typecheck` + `npm run build` (must
  prerender all 140 routes) all green.
- **Spot check:** Playwright load of `/en` and `/ar` confirming translated copy
  renders and `dir="rtl"` is set for Arabic.

## Non-goals (YAGNI)

- Locale-aware number/date formatting (CountUp stays raw numeric).
- Translated slugs or URLs.
- Currency conversion / locale-specific pricing.
- Full RTL visual mirroring of the operator layout.

## Affected surfaces (inventory)

- **Routes:** `src/app/[locale]/page.tsx`, `src/app/[locale]/about/page.tsx`,
  `src/app/[locale]/work/[slug]/page.tsx`, `src/app/[locale]/layout.tsx`
  (add `dir`).
- **Sections (data-source swap):** `Header`, `Footer`, and `src/block/op/*`
  (`Hero`, `Ticker`, `StatBar`, `Problem`, `Services`, `Work`, `AboutBlock`,
  `Testimonials`, `Process`, `Engagement`, `Contact`), plus
  `src/components/op/MobileCTA`.
- **Data:** delete 7 content JSON files; add `config.json`; trim
  `caseStudies.json`; keep `languages.json`.
- **Messages:** rebuild all 12 `messages/*.json` with the new namespaces.
- **New:** `src/types/content.ts`, message-type augmentation, parity test.

## Risks

- **Translation accuracy** of technical marketing copy is machine-grade until
  reviewed. Mitigated by the glossary and human-review flag.
- **`t.raw` typing drift:** content types in `src/types/content.ts` are
  hand-maintained against `en.json`; the parity test + `tsc` catch structural
  divergence but not semantic field renames within a block. Keep types adjacent
  to the namespace they describe.
- **Client bundle size:** `NextIntlClientProvider` ships the active locale's
  messages to the client. The catalog grows; acceptable (one locale per
  request), but avoid importing all locales anywhere.
