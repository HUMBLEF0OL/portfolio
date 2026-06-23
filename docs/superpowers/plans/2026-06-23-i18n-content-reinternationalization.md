# i18n Content Re-internationalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore real internationalization of the operator site across all 12 locales by consolidating all user-facing copy onto next-intl messages and model-translating every locale.

**Architecture:** Each section's copy moves into a next-intl message namespace as a structured object, read via a typed `t.raw('…')` accessor so component JSX is unchanged — only the data-source line changes. Non-linguistic shared constants move to `src/data/config.json`; `caseStudies.json` stays as a hybrid (config in `data`, prose in a `CaseStudies` namespace keyed by slug). `en.json` is the source of truth; the other 11 locales mirror its key paths exactly.

**Tech Stack:** Next.js 15 (App Router) · React 19 · TypeScript (strict) · next-intl v4 · Tailwind v4 · vitest.

## Global Constraints

- **Source of truth:** `messages/en.json`. Every other locale MUST have the exact same set of key paths — no missing keys, no extra keys.
- **All 12 locales:** `en, es, fr, it, pt, ru, ja, ko, zh, ar, hi, de` (order per `src/i18n/routing.ts`).
- **Keep verbatim in every locale (do NOT translate):** brand/product names (Hookpilot, Coherence, mcp-sentry, GitCompass, Glassbox, Ghostframes, JavaScript-Verse, SkinBattle.gg, Felis AI); person names (Amit Rana, Vanshika Tyagi); tech tokens (Next.js, React, Node, TypeScript, Postgres, OpenAI, LangChain, RAG, Supabase, WebSockets, SARIF, MCP, Redux Toolkit, Material UI, Babel, Webpack, a11y, Perf, CLI, ESM, …); URLs, emails, hosts, npm/package ids; console/CLI snippets; currency figures/rates (`$3k`, `$12k`, `$75/hr`, `~$2.5k/wk`); units/abbreviations (DL/wk, CCU, OWASP, MCP01–MCP08); operator chrome — `// SYS.0x` eyebrows, `UPPER_SNAKE` kickers (`THE_PROBLEM`, `CAPABILITIES`, `MISSION_PHASES`, `MISSION_LOG`, `OPERATOR_FILE`, `ESTABLISH_UPLINK`, `TRANSMISSION_LOG`, `DOSSIER`, `DOCTRINE`, `IN_THE_OPEN`, `CONTEXT`, `APPROACH`, `THE_RESULT`, `CASE_FILE`), HUD/status codes (`SYS ONLINE`, `END OF TRANSMISSION`, `◉ REC`, `FEED//01`, `FEED//LIVE`, `REC ◉`, `ID·AR-001`).
- **Translate:** all headings, subheads, body/dossier paragraphs, blurbs, descriptions, CTA/nav/form labels, form option values + placeholders, FAQ Q&A, testimonials, doctrine values, case-study prose, before/after labels.
- **i18n helpers:** use wrappers from `@/i18n/navigation` for navigation; never hardcode user-facing strings.
- **Tailwind v4:** CSS-first; no `tailwind.config`. Do not restructure the operator layout.
- **Verification per task:** `npm run typecheck` and `npm run lint` MUST pass. Full `npm run build` (prerenders 140 routes) is required at the phases that touch all locales.

---

## File Structure

**Create:**

- `src/data/config.json` — non-linguistic shared constants (social, calLink, monogram, identity name, clock timezone, avatar path).
- `src/types/content.ts` — TypeScript types for each `t.raw()` content block.
- `src/global.d.ts` — augments next-intl `IntlMessages` from `en.json` for compile-time key safety.
- `tests/messages-parity.test.ts` — asserts all 12 locales share `en.json` key paths.

**Modify (data-source swap + extract hardcoded strings):**

- Routes: `src/app/[locale]/page.tsx`, `src/app/[locale]/about/page.tsx`, `src/app/[locale]/work/[slug]/page.tsx`, `src/app/[locale]/layout.tsx` (add `dir`).
- Sections: `src/block/Header.tsx`, `src/block/Footer.tsx`, `src/block/op/{Hero,Ticker,StatBar,Problem,Services,Work,AboutBlock,Testimonials,Process,Engagement,Contact}.tsx`, `src/components/op/{MobileCTA,CursorHUD?}.tsx`.
- `src/data/caseStudies.json` — trim to config-only fields.
- `messages/*.json` — rebuild all 12 with new namespaces.

**Delete (content fully migrated to messages):**

- `src/data/{site,services,process,pricing,faq,testimonials,about}.json`

**Keep as-is:** `src/data/languages.json`.

### Namespace map (top-level, per locale)

| Namespace        | Source today                                                  | Consumers                                   |
| ---------------- | ------------------------------------------------------------- | ------------------------------------------- |
| `Seo` _(exists)_ | messages                                                      | `[locale]/page.tsx`                         |
| `404` _(exists)_ | messages                                                      | `not-found.tsx`                             |
| `Common`         | `site.availability` + new mobile-CTA + home `CursorHUD` label | `Contact`, `MobileCTA`, `[locale]/page.tsx` |
| `Nav`            | `site.nav`                                                    | `Header`                                    |
| `Hero`           | `site.hero`                                                   | `Hero`                                      |
| `Ticker`         | `site.ticker`                                                 | `Ticker`                                    |
| `Stats`          | `site.stats`                                                  | `StatBar`                                   |
| `Problem`        | `site.problem`                                                | `Problem`                                   |
| `Services`       | `services.json`                                               | `Services`                                  |
| `Work`           | `Work.tsx` hardcoded chrome                                   | `Work`                                      |
| `Testimonials`   | `testimonials.json`                                           | `Testimonials`                              |
| `Process`        | `process.json`                                                | `Process`                                   |
| `Engagement`     | `pricing.json` + `faq.json`                                   | `Engagement`                                |
| `Contact`        | `site.contact` + `Contact.tsx` hardcoded                      | `Contact`                                   |
| `Footer`         | `site.footer`                                                 | `Footer`                                    |
| `About`          | `about.json`                                                  | `AboutBlock`, `about/page.tsx`              |
| `CaseStudies`    | `caseStudies.json` prose, keyed by slug                       | `Work`, `work/[slug]/page.tsx`              |
| `CaseStudyPage`  | `work/[slug]/page.tsx` hardcoded chrome                       | `work/[slug]/page.tsx`                      |

`config.json` holds: `identity.name`, `identity.monogram`, `social.{email,emailHref,github,linkedin,twitter}`, `contact.calLink`, `nav.{showClock,clockTimezone}`, `avatar.src`.

---

## Phase 0 — Parity test (TDD red)

### Task 1: Message key-parity test

**Files:**

- Create: `tests/messages-parity.test.ts`

**Interfaces:**

- Produces: a vitest suite that fails until every locale mirrors `en.json` key paths. No exports.

- [ ] **Step 1: Write the failing test**

```ts
// tests/messages-parity.test.ts
import { describe, it, expect } from 'vitest'
import { routing } from '@/i18n/routing'

// Collect every leaf + object key path, e.g. "Hero.headlineLines".
function keyPaths(obj: unknown, prefix = ''): string[] {
  if (obj === null || typeof obj !== 'object') return [prefix]
  if (Array.isArray(obj)) {
    // Arrays: recurse by index so shape (length + nested keys) is compared.
    return obj.flatMap((v, i) => keyPaths(v, `${prefix}[${i}]`))
  }
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
    keyPaths(v, prefix ? `${prefix}.${k}` : k)
  )
}

async function load(locale: string) {
  return (await import(`../messages/${locale}.json`)).default
}

describe('message catalog parity', () => {
  it('every locale mirrors en.json key paths exactly', async () => {
    const en = new Set(keyPaths(await load('en')))
    for (const locale of routing.locales) {
      if (locale === 'en') continue
      const theirs = new Set(keyPaths(await load(locale)))
      const missing = [...en].filter((k) => !theirs.has(k))
      const extra = [...theirs].filter((k) => !en.has(k))
      expect({ locale, missing, extra }).toEqual({ locale, missing: [], extra: [] })
    }
  })
})
```

- [ ] **Step 2: Run the test, verify it fails**

Run: `npm run test:run -- messages-parity`
Expected: FAIL — non-`en` locales currently have only `Seo`/`404`, while `en` will (after Phase 1) have all namespaces. (Right now all locales match, so it may PASS until Phase 1 expands `en`; that is expected. Re-run after Task 6.)

- [ ] **Step 3: Commit**

```bash
git add tests/messages-parity.test.ts
git commit -m "test: add message catalog key-parity test"
```

---

## Phase 1 — English source of truth + config + types

### Task 2: Create `config.json` (non-linguistic constants)

**Files:**

- Create: `src/data/config.json`

**Interfaces:**

- Produces: `@/data/config.json` with shape `{ identity:{name,monogram}, social:{email,emailHref,github,linkedin,twitter}, contact:{calLink}, nav:{showClock,clockTimezone}, avatar:{src} }`.

- [ ] **Step 1: Write the file** (values copied verbatim from current `site.json` / `about.json`)

```json
{
  "identity": { "name": "Amit Rana", "monogram": "A" },
  "social": {
    "email": "123amitrana0123@gmail.com",
    "emailHref": "mailto:123amitrana0123@gmail.com",
    "github": "https://github.com/HUMBLEF0OL",
    "linkedin": "https://www.linkedin.com/in/humblef00l",
    "twitter": "https://x.com/HUMBLEF0OL"
  },
  "contact": { "calLink": "https://cal.com/amitrana/intro" },
  "nav": { "showClock": true, "clockTimezone": "IST" },
  "avatar": { "src": "/avatar.png" }
}
```

- [ ] **Step 2: Verify it parses**

Run: `node -e "JSON.parse(require('fs').readFileSync('src/data/config.json','utf8')); console.log('ok')"`
Expected: `ok`

- [ ] **Step 3: Commit**

```bash
git add src/data/config.json
git commit -m "feat(i18n): add config.json for non-linguistic constants"
```

### Task 3: Trim `caseStudies.json` to config-only fields

**Files:**

- Modify: `src/data/caseStudies.json`

**Interfaces:**

- Produces: each entry in `caseStudies[]` retains ONLY: `slug, displaySlug, host, year, category, image, isPrivate, private?, links, stack, console, next, metrics[].{value,prefix,suffix,decimals,display?}, row.headlineMetric.{value,unit}, quote.{name,verified?}`. All prose fields are REMOVED (they move to messages in Task 4).
- Consumers in Phase 3 join this array with `CaseStudies[slug]` by `slug`.

- [ ] **Step 1: Edit the file** — for every entry, delete these keys: `name`, `tagline`, `context`, `row.blurb`, `problem` (whole object), `approach` (whole object), `result` (whole object), `quote.text`, `quote.role`, and each `metrics[].label`. Keep `metrics[].{value,prefix,suffix,decimals,display}`. Keep `quote.name` and `quote.verified`. Remove the `_meta` block's now-stale prose if desired (optional; not consumed).

Example (entry `hookpilot`) becomes:

```json
{
  "slug": "hookpilot",
  "displaySlug": "HOOKPILOT",
  "category": "Dev tool · CLI",
  "year": "2024",
  "host": "npmjs.com/package/hookpilot",
  "image": "/projects/hookpilot.png",
  "isPrivate": false,
  "links": {
    "github": "https://github.com/HUMBLEF0OL/hook-pilot",
    "npm": "https://www.npmjs.com/package/hookpilot"
  },
  "row": { "headlineMetric": { "value": "50k", "unit": "DL/wk" } },
  "metrics": [
    { "value": 50, "prefix": "", "suffix": "k+", "decimals": 0 },
    { "value": 5, "prefix": "", "suffix": "", "decimals": 0 },
    { "value": 0, "prefix": "", "suffix": "", "decimals": 0 }
  ],
  "stack": ["Node.js", "TypeScript", "Shell", "NPM"],
  "quote": { "name": "Amit Rana" },
  "console": [
    "$ npm i -D hookpilot",
    "$ npx hookpilot init",
    "[ok] hooks linked",
    "[ok] checks staged-only",
    "downloads/wk ......... 50k+",
    "status: GUARDING"
  ],
  "next": "coherence"
}
```

> `category` stays here but IS translated — see Task 4 note. To avoid splitting it, KEEP `category` here as the English value AND add a translated `category` under `CaseStudies.<slug>` in messages; the component reads `category` from messages with the config value as fallback. (Decision: move `category` to messages too; remove from config here.) **Apply the move: remove `category` from `caseStudies.json` and place it under `CaseStudies.<slug>.category` in Task 4.**

- [ ] **Step 2: Verify shape** — confirm no prose keys remain.

Run: `node -e "const c=require('./src/data/caseStudies.json').caseStudies; const bad=c.filter(e=>e.name||e.tagline||e.context||e.problem||e.approach||e.result||(e.row&&e.row.blurb)||(e.quote&&e.quote.text)||e.category||(e.metrics||[]).some(m=>m.label)); console.log(bad.length===0?'clean':'still has prose: '+bad.map(b=>b.slug))"`
Expected: `clean`

- [ ] **Step 3: Commit**

```bash
git add src/data/caseStudies.json
git commit -m "refactor(i18n): trim caseStudies.json to config-only fields"
```

### Task 4: Author `messages/en.json` (all namespaces)

**Files:**

- Modify: `messages/en.json`

**Interfaces:**

- Produces: `en.json` containing `Seo`, `404` (unchanged) plus all namespaces in the Namespace map. This is the source of truth every other task and locale mirrors.

- [ ] **Step 1: Build the namespaces by moving copy verbatim** from the (still-committed in git history / pre-deletion) data files and the components' hardcoded strings. Exact mapping:

  - `Common`: `{ "availability": { "label": "AVAILABLE Q3 2026", "statusLine": "STATUS: AVAILABLE // Q3 2026", "hudLabel": "SYS ONLINE" }, "mobileCta": { "title": "Free 20-min intro call", "button": "Book" }, "homeHudLabel": "SYS ONLINE" }` (from `site.availability`; `mobileCta`/`homeHudLabel` from `MobileCTA.tsx` + `[locale]/page.tsx`).
  - `Nav`: `{ "links": [{"label":"Work","href":"#work"},{"label":"Services","href":"#services"},{"label":"About","href":"/about"}], "cta": {"label":"Book a call","href":"#contact"} }` (from `site.nav`; `showClock`/`clockTimezone` now in config).
  - `Hero`: the entire `site.hero` object verbatim (`eyebrow, headlineLines[], headlineHighlight, subhead, statusRow{left,center,right}, ctas[]{label,href,variant}`).
  - `Ticker`: `site.ticker` verbatim (`label, items[]`).
  - `Stats`: `site.stats` verbatim (array of `{value,decimals,prefix,suffix,label,accent,display?}`).
  - `Problem`: `site.problem` verbatim.
  - `Services`: `services.json` `{section, items: <the "services" array>}` (rename `services` → `items`).
  - `Work`: `{ "eyebrow": "// SYS.03", "kicker": "MISSION_LOG", "heading": "Real problems, shipped.", "feedLabel": "FEED//01", "hint": "▸ Hover a target to preview · click to open the dossier" }` (from `Work.tsx`).
  - `Testimonials`: `testimonials.json` `{section, quotes:[{text,name,role,...}], trustedBy:[]}` — keep the data shape; component still filters `verified`. (`verified`, `source`, `project`, `avatar` are config-ish but harmless to keep in messages; keep them.)
  - `Process`: `process.json` `{section, phases[]}` verbatim.
  - `Engagement`: `{ "pricing": { "section": …, "rate": …, "tiers": [...] }, "faq": { "section": …, "items": [...] } }` (merge `pricing.json` + `faq.json`; keep `rate`, prices, `featured`, `badge`).
  - `Contact`: `site.contact` (`eyebrow, kicker, heading, subhead, points[], form{projectTypes[],budgetTiers[],timelines[],submitLabel}`) PLUS hardcoded strings from `Contact.tsx`: `{ "bookCall": "Book a 20-min call", "orDivider": "OR SEND A NOTE", "fields": { "name":"Name", "email":"Email", "projectType":"Project type", "budget":"Budget tier", "timeline":"Timeline", "message":"What are you building?" }, "placeholders": { "name":"Jane Doe", "email":"jane@company.com", "message":"A one-liner is plenty to start." } }`. (`calLink` now in config.)
  - `Footer`: `site.footer` verbatim (`blurb, cta{label,href}, copyright, endLabel, wordmark`).
  - `About`: the entire `about.json` `{homepageDossier, page}` objects verbatim (avatar `src`/`alt`/`id` may stay; `avatar.src` also in config — component uses config).
  - `CaseStudies`: object keyed by slug. For each of the 9 studies, the prose removed in Task 3: `{ "<slug>": { "name", "category", "tagline", "row": {"blurb"}, "context", "problem": {"head","body","before"}, "approach": {"intro","cards":[{"heading","body"}]}, "result": {"head","before":[],"after":[]}, "quote": {"text","role"}, "metricLabels": ["…","…","…"] } }`. `metricLabels[i]` corresponds to `caseStudies.json` `metrics[i]`. (`quote.name` stays in config/data.)
  - `CaseStudyPage`: `{ "private": "Private", "ctaHeading": "Have a similar problem?", "ctaButton": "Book a 20-min call", "nextLabel": "Next case file", "before": "Before", "after": "After", "linkLabels": { "github":"GitHub", "npm":"npm", "live":"Live" } }` (from `work/[slug]/page.tsx` hardcoded strings; `linkLabels` kept English per glossary but stored for completeness).

- [ ] **Step 2: Validate JSON + that `Seo`/`404` are unchanged**

Run: `node -e "const e=require('./messages/en.json'); ['Seo','404','Hero','CaseStudies','Engagement','About'].forEach(k=>{if(!e[k])throw new Error('missing '+k)}); console.log('ok', Object.keys(e).length, 'namespaces')"`
Expected: `ok 18 namespaces`

- [ ] **Step 3: Run parity test, verify it now FAILS** (en expanded, others stale)

Run: `npm run test:run -- messages-parity`
Expected: FAIL with large `missing` arrays for each non-en locale.

- [ ] **Step 4: Commit**

```bash
git add messages/en.json
git commit -m "feat(i18n): author en.json as content source of truth"
```

### Task 5: Content types for `t.raw()`

**Files:**

- Create: `src/types/content.ts`

**Interfaces:**

- Produces: exported types consumed by every migrated component, e.g.
  `HeroContent, TickerContent, StatItem, ProblemContent, ServicesContent, WorkChrome, ProcessContent, EngagementContent, ContactContent, FooterContent, NavContent, CommonContent, AboutHomeDossier, AboutPageContent, TestimonialsContent, CaseStudyCopy, CaseStudyPageContent`.

- [ ] **Step 1: Write the types** mirroring the `en.json` shapes. Representative subset (write the full set for every namespace):

```ts
// src/types/content.ts
export type Cta = { label: string; href: string; variant?: 'primary' | 'secondary' }

export type HeroContent = {
  eyebrow: string
  headlineLines: string[]
  headlineHighlight: string
  subhead: string
  statusRow: { left: string; center: string; right: string }
  ctas: Cta[]
}

export type StatItem = {
  value: number | null
  decimals?: number
  prefix?: string
  suffix?: string
  display?: string
  label: string
  accent: 'foreground' | 'highlight' | 'primary'
}

export type ServicesContent = {
  section: { eyebrow: string; kicker: string; heading: string; intro: string }
  items: { number: string; title: string; description: string; tags: string[] }[]
}

export type CaseStudyCopy = {
  name: string
  category: string
  tagline: string
  row: { blurb: string }
  context: string
  problem: { head: string; body: string; before: string }
  approach: { intro: string; cards: { heading: string; body: string }[] }
  result: { head: string; before: string[]; after: string[] }
  quote: { text: string; role: string }
  metricLabels: string[]
}
// … HeroContent already above; add the remaining namespace types similarly.
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: PASS (types are not yet consumed).

- [ ] **Step 3: Commit**

```bash
git add src/types/content.ts
git commit -m "feat(i18n): add content types for t.raw access"
```

### Task 6: next-intl message-type augmentation

**Files:**

- Create: `src/global.d.ts`

**Interfaces:**

- Produces: global `IntlMessages` type so `useTranslations('Hero')` and missing-key usage are checked at compile time.

- [ ] **Step 1: Write the augmentation**

```ts
// src/global.d.ts
import type en from '../messages/en.json'

declare global {
  // next-intl v4 reads this to type t() namespaces/keys.
  interface IntlMessages extends Record<string, unknown> {}
  type Messages = typeof en
}
export {}
```

> If next-intl's `createMessages` typing requires `type IntlMessages = Messages`, set `interface IntlMessages extends Messages {}` instead. Confirm against the installed next-intl version with the `context7` skill before finalizing.

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/global.d.ts
git commit -m "feat(i18n): augment next-intl message types from en.json"
```

---

## Phase 2 — Generate the 11 translated locales

### Task 7: Translate all non-en locales (parity → green)

**Files:**

- Modify: `messages/{es,fr,it,pt,ru,ja,ko,zh,ar,hi,de}.json`

**Interfaces:**

- Produces: each locale file with the EXACT key paths of `en.json`, copy translated per the Global Constraints glossary, `Seo`/`404` re-translated to match the new structure if they changed (they did not).

- [ ] **Step 1: For each of the 11 locales**, replace the file with a full translation of `en.json`. Execution note: dispatch one subagent per locale (see Execution Handoff), each given `en.json` + the glossary; it returns the translated JSON. Rules the agent MUST follow:
  - Preserve the JSON structure and ALL key names exactly.
  - Translate only the fields listed under "Translate" in Global Constraints.
  - Copy verbatim every token under "Keep verbatim" (brand/person names, tech tokens, URLs, console snippets, currency, units, operator chrome `// SYS.0x` / `UPPER_SNAKE` / HUD codes).
  - Keep array lengths identical (e.g. `Hero.headlineLines`, `result.before`, `metricLabels`).
  - For `ar`, translate to Modern Standard Arabic; keep Latin-script brand/tech tokens as-is.

- [ ] **Step 2: Validate every file parses**

Run: `for l in es fr it pt ru ja ko zh ar hi de; do node -e "JSON.parse(require('fs').readFileSync('messages/$l.json','utf8'))" || echo "BAD $l"; done`
Expected: no `BAD` lines.

- [ ] **Step 3: Run parity test, verify PASS**

Run: `npm run test:run -- messages-parity`
Expected: PASS (all locales mirror en key paths).

- [ ] **Step 4: Typecheck + commit**

```bash
npm run typecheck
git add messages/
git commit -m "feat(i18n): translate all locales to match en.json source"
```

---

## Phase 3 — Migrate components & routes

> Pattern for every section task: replace the data import with a translations read, cast structured blocks to the Task 5 types, and pull non-linguistic values from `@/data/config.json`. JSX is otherwise unchanged. Server components use `getTranslations`; client components use `useTranslations`. After each task: `npm run typecheck && npm run lint`.

### Task 8: Migrate `Hero`

**Files:**

- Modify: `src/block/op/Hero.tsx`

**Interfaces:**

- Consumes: `Hero` namespace, `HeroContent` type.

- [ ] **Step 1: Replace the data source**

```tsx
// remove: import site from '@/data/site.json'
import { useTranslations } from 'next-intl'
import type { HeroContent } from '@/types/content'

export default function Hero() {
  const t = useTranslations('Hero')
  const hero = t.raw('') as HeroContent
  // …rest of JSX unchanged (hero.eyebrow, hero.headlineLines, hero.ctas, …)
```

> `t.raw('')` returns the whole namespace object in next-intl v4. If the installed version rejects an empty key, read sub-keys (`t.raw('hero')`) by nesting the block under a `hero` key in the namespace instead. Verify with `context7`.

- [ ] **Step 2: Typecheck + lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/block/op/Hero.tsx
git commit -m "refactor(i18n): read Hero copy from messages"
```

### Task 9: Migrate `Ticker`, `StatBar`, `Problem`

**Files:**

- Modify: `src/block/op/Ticker.tsx`, `src/block/op/StatBar.tsx`, `src/block/op/Problem.tsx`

**Interfaces:**

- Consumes: `Ticker`, `Stats`, `Problem` namespaces; `StatItem` type.

- [ ] **Step 1: Ticker**

```tsx
import { useTranslations } from 'next-intl'
import { Marquee } from '@/components/op/Marquee'

export default function Ticker() {
  const t = useTranslations('Ticker')
  return <Marquee items={t.raw('items') as string[]} />
}
```

- [ ] **Step 2: StatBar** — these are server components today (no `'use client'`). Use `useTranslations` only in client components; `StatBar`/`Problem`/`Ticker` have no hooks, so add `'use client'` OR convert to `getTranslations` (async server component). Prefer server:

```tsx
import { getTranslations } from 'next-intl/server'
import type { StatItem } from '@/types/content'
// component becomes async:
export default async function StatBar() {
  const t = await getTranslations('Stats')
  const stats = t.raw('') as StatItem[]
  // …unchanged JSX
}
```

(Apply the same `getTranslations` async pattern to `Problem` reading namespace `Problem`.)

- [ ] **Step 3: Typecheck + lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/block/op/Ticker.tsx src/block/op/StatBar.tsx src/block/op/Problem.tsx
git commit -m "refactor(i18n): read Ticker/StatBar/Problem copy from messages"
```

### Task 10: Migrate `Services`, `Process`

**Files:**

- Modify: `src/block/op/Services.tsx`, `src/block/op/Process.tsx`

**Interfaces:**

- Consumes: `Services`, `Process` namespaces; `ServicesContent`, `ProcessContent` types.

- [ ] **Step 1:** Both are server components with module-scope destructuring (`const { section, services: items } = services`). Convert to async + `getTranslations`:

```tsx
import { getTranslations } from 'next-intl/server'
import type { ServicesContent } from '@/types/content'

export default async function Services() {
  const t = await getTranslations('Services')
  const { section, items } = t.raw('') as ServicesContent
  // …unchanged JSX (items.map(service => …))
}
```

(Process: `const { section, phases } = t.raw('') as ProcessContent`.)

- [ ] **Step 2: Typecheck + lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/block/op/Services.tsx src/block/op/Process.tsx
git commit -m "refactor(i18n): read Services/Process copy from messages"
```

### Task 11: Migrate `Engagement` (pricing + faq)

**Files:**

- Modify: `src/block/op/Engagement.tsx`

**Interfaces:**

- Consumes: `Engagement` namespace; `EngagementContent` type. Client component (uses `useState`).

- [ ] **Step 1: Replace imports**

```tsx
// remove: import pricing from '@/data/pricing.json'; import faq from '@/data/faq.json'
import { useTranslations } from 'next-intl'
import type { EngagementContent } from '@/types/content'

export default function Engagement() {
  const t = useTranslations('Engagement')
  const { pricing, faq } = t.raw('') as EngagementContent
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  // …unchanged JSX (pricing.section, pricing.tiers, faq.items)
}
```

- [ ] **Step 2: Typecheck + lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/block/op/Engagement.tsx
git commit -m "refactor(i18n): read Engagement copy from messages"
```

### Task 12: Migrate `Testimonials`

**Files:**

- Modify: `src/block/op/Testimonials.tsx`

**Interfaces:**

- Consumes: `Testimonials` namespace; `TestimonialsContent` type.

- [ ] **Step 1:** Convert to async server component (currently a plain server component importing JSON):

```tsx
import { getTranslations } from 'next-intl/server'
import type { TestimonialsContent } from '@/types/content'

export async function Testimonials() {
  const t = await getTranslations('Testimonials')
  const data = t.raw('') as TestimonialsContent
  const quotes = data.quotes.filter((q) => q.verified)
  const trustedBy = data.trustedBy.filter((b) => b.verified)
  if (quotes.length === 0 && trustedBy.length === 0) return null
  // …unchanged JSX, replacing t.section with data.section
}
export default Testimonials
```

> Note the local name clash: the next-intl function is `t`; the old code used `t` as the imported JSON. Rename the data variable to `data` (done above) and update `t.section`→`data.section`, `t.quotes`→`data.quotes`, `t.trustedBy`→`data.trustedBy`, `t.section.trustedByLabel`→`data.section.trustedByLabel`.

- [ ] **Step 2: Typecheck + lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/block/op/Testimonials.tsx
git commit -m "refactor(i18n): read Testimonials copy from messages"
```

### Task 13: Migrate `Contact`

**Files:**

- Modify: `src/block/op/Contact.tsx`

**Interfaces:**

- Consumes: `Contact` + `Common` namespaces, `@/data/config.json`; `ContactContent` type. Client component.

- [ ] **Step 1: Replace imports + module-scope destructuring**

```tsx
import { useTranslations } from 'next-intl'
import config from '@/data/config.json'
import type { ContactContent } from '@/types/content'

export default function Contact() {
  const tc = useTranslations('Contact')
  const tCommon = useTranslations('Common')
  const contact = tc.raw('') as ContactContent
  const form = contact.form
  const [name, setName] = useState('')
  // …state unchanged; replace:
  //   social.email           -> config.social.email
  //   contact.calLink        -> config.contact.calLink
  //   availability.statusLine-> tCommon.raw('availability.statusLine') as string  (or tCommon('availability.statusLine'))
  //   "Book a 20-min call"   -> contact.bookCall
  //   "OR SEND A NOTE"       -> contact.orDivider
  //   field labels/placeholders -> contact.fields.* / contact.placeholders.*
}
```

- [ ] **Step 2: Typecheck + lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/block/op/Contact.tsx
git commit -m "refactor(i18n): read Contact copy from messages + config"
```

### Task 14: Migrate `Header`, `Footer`, `MobileCTA`

**Files:**

- Modify: `src/block/Header.tsx`, `src/block/Footer.tsx`, `src/components/op/MobileCTA.tsx`

**Interfaces:**

- Consumes: `Nav`, `Footer`, `Common` namespaces, `@/data/config.json`, `@/data/languages.json`.

- [ ] **Step 1: Header** (client) — `useTranslations('Nav')` for links/cta; `config.identity.{name,monogram}` for logo; `config.nav.{showClock,clockTimezone}` for the clock; `languages.json` unchanged.

```tsx
import { useTranslations } from 'next-intl'
import config from '@/data/config.json'
import type { NavContent } from '@/types/content'
// inside component:
const tNav = useTranslations('Nav')
const nav = tNav.raw('') as NavContent
// site.identity.monogram -> config.identity.monogram
// site.identity.name     -> config.identity.name
// site.nav.links         -> nav.links
// site.nav.showClock     -> config.nav.showClock
// site.nav.clockTimezone -> config.nav.clockTimezone
// site.nav.cta           -> nav.cta
```

- [ ] **Step 2: Footer** (async server) — `getTranslations('Footer')`; `config.social` for the links.

```tsx
import { getTranslations } from 'next-intl/server'
import config from '@/data/config.json'
import type { FooterContent } from '@/types/content'
// const t = await getTranslations('Footer'); const footer = t.raw('') as FooterContent
// site.footer.* -> footer.*   ;   site.social.* -> config.social.*
```

- [ ] **Step 3: MobileCTA** (client) — `useTranslations('Common')` + `useTranslations('Nav')`.

```tsx
import { useTranslations } from 'next-intl'
// const tCommon = useTranslations('Common'); const tNav = useTranslations('Nav')
// "Free 20-min intro call" -> tCommon('mobileCta.title')
// site.availability.label  -> tCommon('availability.label')
// "Book"                   -> tCommon('mobileCta.button')
// site.nav.cta.href        -> (tNav.raw('cta') as {href:string}).href
```

- [ ] **Step 4: Typecheck + lint + commit**

```bash
npm run typecheck && npm run lint
git add src/block/Header.tsx src/block/Footer.tsx src/components/op/MobileCTA.tsx
git commit -m "refactor(i18n): read Header/Footer/MobileCTA copy from messages + config"
```

### Task 15: Migrate `AboutBlock` + `about/page.tsx`

**Files:**

- Modify: `src/block/op/AboutBlock.tsx`, `src/app/[locale]/about/page.tsx`

**Interfaces:**

- Consumes: `About` namespace, `@/data/config.json` (avatar); `AboutHomeDossier`, `AboutPageContent` types.

- [ ] **Step 1: AboutBlock** — currently `const dossier = about.homepageDossier` at module scope. Move inside component as async server:

```tsx
import { getTranslations } from 'next-intl/server'
import config from '@/data/config.json'
import type { AboutHomeDossier } from '@/types/content'

export default async function AboutBlock({ locale }: { locale: string }) {
  const t = await getTranslations('About')
  const dossier = (t.raw('') as { homepageDossier: AboutHomeDossier }).homepageDossier
  const bioHref = '/' + locale + dossier.bioLink.href
  // avatar src "/avatar.png" -> config.avatar.src
}
```

- [ ] **Step 2: about/page.tsx** — replace `import about from '@/data/about.json'` with `getTranslations('About')`; `const p = (t.raw('') as { page: AboutPageContent }).page`. `about.avatar.src/alt` → `config.avatar.src` + `p`/About `alt`. Keep `site` (already `@/data/site.json`) reads — but `site` is being deleted; replace `site.identity.name` with `config.identity.name`. (`generateMetadata` uses `about.page.intro.subhead` → call `getTranslations` there too, and `site.identity.name` → config.)

- [ ] **Step 3: Typecheck + lint + commit**

```bash
npm run typecheck && npm run lint
git add src/block/op/AboutBlock.tsx src/app/[locale]/about/page.tsx
git commit -m "refactor(i18n): read About copy from messages + config"
```

### Task 16: Migrate `Work` + `work/[slug]/page.tsx`

**Files:**

- Modify: `src/block/op/Work.tsx`, `src/app/[locale]/work/[slug]/page.tsx`

**Interfaces:**

- Consumes: `Work`, `CaseStudies`, `CaseStudyPage` namespaces, trimmed `@/data/caseStudies.json`, `@/data/config.json`; `WorkChrome`, `CaseStudyCopy`, `CaseStudyPageContent` types.

- [ ] **Step 1: Work** (client) — keep `cs.caseStudies` config import; add copy lookups:

```tsx
import { useTranslations } from 'next-intl'
import type { WorkChrome, CaseStudyCopy } from '@/types/content'
// const tWork = useTranslations('Work'); const chrome = tWork.raw('') as WorkChrome
// const tCs = useTranslations('CaseStudies')
// per row: const copy = tCs.raw(item.slug) as CaseStudyCopy
//   item.name            -> copy.name
//   item.row.blurb       -> copy.row.blurb
//   item.category        -> copy.category
// hardcoded "// SYS.03"/"MISSION_LOG"/"Real problems, shipped."/"FEED//01"/hint -> chrome.*
// activeItem.host/console/image stay from config (cs)
```

- [ ] **Step 2: work/[slug]/page.tsx** (async server) — join config + copy by slug:

```tsx
import { getTranslations } from 'next-intl/server'
import config from '@/data/config.json'
import type { CaseStudyCopy, CaseStudyPageContent } from '@/types/content'
// const tCs = await getTranslations('CaseStudies'); const copy = tCs.raw(slug) as CaseStudyCopy
// const tPage = await getTranslations('CaseStudyPage'); const pageChrome = tPage.raw('') as CaseStudyPageContent
// s.name->copy.name, s.tagline->copy.tagline, s.context->copy.context,
// s.problem.*->copy.problem.*, s.approach.*->copy.approach.*, s.result.*->copy.result.*,
// s.quote.text/role->copy.quote.*, s.quote.name stays from config(cs),
// metric labels: m.label -> copy.metricLabels[i]
// LINK_LABELS -> pageChrome.linkLabels ; "Private"->pageChrome.private ;
// "Have a similar problem?"->pageChrome.ctaHeading ; "Book a 20-min call"->pageChrome.ctaButton ;
// "Next case file"->pageChrome.nextLabel ; "Before"/"After"->pageChrome.before/after
// generateMetadata: study.name/tagline -> copy.name/tagline ; site.identity.name -> config.identity.name
```

> `generateStaticParams` is unchanged (still iterates `caseStudies` config for slugs).

- [ ] **Step 3: Typecheck + lint + commit**

```bash
npm run typecheck && npm run lint
git add src/block/op/Work.tsx src/app/[locale]/work/[slug]/page.tsx
git commit -m "refactor(i18n): read Work + case-study copy from messages"
```

### Task 17: Migrate home `[locale]/page.tsx` + delete dead data files

**Files:**

- Modify: `src/app/[locale]/page.tsx`
- Delete: `src/data/{site,services,process,pricing,faq,testimonials,about}.json`

**Interfaces:**

- Consumes: `Common` namespace for the `CursorHUD` label.

- [ ] **Step 1:** Replace `import site from '@/data/site.json'` and `site.availability.hudLabel`:

```tsx
import { getTranslations } from 'next-intl/server'
// inside HomePage (already async): const tCommon = await getTranslations('Common')
// <CursorHUD label={site.availability.hudLabel} /> -> label={tCommon('homeHudLabel')}
```

- [ ] **Step 2: Delete the now-unused data files**

```bash
git rm src/data/site.json src/data/services.json src/data/process.json src/data/pricing.json src/data/faq.json src/data/testimonials.json src/data/about.json
```

- [ ] **Step 3: Verify nothing imports the deleted files**

Run: `grep -rIl --include=*.ts --include=*.tsx "data/\(site\|services\|process\|pricing\|faq\|testimonials\|about\)" src || echo "no stragglers"`
Expected: `no stragglers`

- [ ] **Step 4: Typecheck + lint + commit**

```bash
npm run typecheck && npm run lint
git add -A
git commit -m "refactor(i18n): migrate home page + delete migrated data files"
```

---

## Phase 4 — RTL

### Task 18: Set document direction per locale

**Files:**

- Modify: `src/app/layout.tsx`

**Interfaces:**

- Consumes: locale param. Produces: `dir` attribute on `<html>`.

- [ ] **Step 1: Add a direction helper + attribute**

```tsx
// src/app/layout.tsx — inside RootLayout, after `const { locale } = await params`
const dir = locale === 'ar' ? 'rtl' : 'ltr'
// <html lang={locale} dir={dir} suppressHydrationWarning className={…}>
```

- [ ] **Step 2: Typecheck + build smoke (en + ar render)**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(i18n): set html dir=rtl for Arabic"
```

---

## Phase 5 — Verification & docs

### Task 19: Full build + Playwright spot check

**Files:** none (verification only).

- [ ] **Step 1: Parity + unit tests**

Run: `npm run test:run`
Expected: PASS (parity green).

- [ ] **Step 2: Lint + typecheck + full build**

Run: `npm run lint && npm run typecheck && npm run build`
Expected: build prerenders all 140 routes with no missing-message errors.

- [ ] **Step 3: Playwright spot check** — start the production server and assert translated copy + RTL.

```bash
npm run start &
# en: hero subhead present; ar: dir=rtl on <html>, Arabic copy rendered
npx playwright ... # navigate /en and /ar, assert document.dir === 'rtl' for /ar
```

(Use the `verify` skill / existing Playwright MCP to load `/en` and `/ar`, confirm a known translated string differs between locales and `<html dir>` is `rtl` for `/ar`.)

- [ ] **Step 4: Commit any fixes**, then update docs.

### Task 20: Update documentation

**Files:**

- Modify: `src/data/ARCHITECTURE.md`, `CLAUDE.md` (i18n section), `src/i18n/*` ARCHITECTURE if present.

- [ ] **Step 1:** Update `src/data/ARCHITECTURE.md` to describe `config.json` (non-linguistic constants), `caseStudies.json` (config-only, prose in `CaseStudies` messages), `languages.json`, and that all copy now lives in `messages/*`. Update `CLAUDE.md`'s i18n section to reflect the namespace model (replace the obsolete "`titleKey` reference" convention).

- [ ] **Step 2: Commit**

```bash
git add src/data/ARCHITECTURE.md CLAUDE.md
git commit -m "docs(i18n): document message-based content model"
```

---

## Self-Review

**Spec coverage:**

- Consolidate copy into next-intl → Tasks 4, 8–17. ✓
- Whole-block `t.raw` + typed access → Tasks 5, 6, 8–17. ✓
- caseStudies hybrid (config in data, prose in messages keyed by slug) → Tasks 3, 4, 16. ✓
- config.json carve-out → Task 2 (+ consumers 13–17). ✓
- Delete migrated data files → Task 17. ✓
- Namespace structure → Task 4 (finalized in this plan's Namespace map). ✓
- Glossary (keep-verbatim vs translate) → Global Constraints + Task 7. ✓
- RTL `dir` only (no full mirror) → Task 18; non-goal honored. ✓
- Model-translate all 12 → Task 7. ✓
- Compile-time key safety → Task 6. ✓
- Key-parity test (TDD) → Task 1. ✓
- Build + Playwright spot check → Task 19. ✓
- Non-goals (no number formatting, no slug translation, no full RTL mirror) → respected; not implemented. ✓

**Placeholder scan:** No "TBD/TODO/handle edge cases". Content moves cite exact source files/fields. Two `>` notes flag version-specific next-intl API checks (`t.raw('')` and the `IntlMessages` augmentation) routed through the `context7` skill — these are verification instructions, not unresolved scope.

**Type consistency:** Component tasks consume the exact type names defined in Task 5 (`HeroContent`, `ServicesContent`, `CaseStudyCopy`, `EngagementContent`, `ContactContent`, `WorkChrome`, `CaseStudyPageContent`, `AboutHomeDossier`, `AboutPageContent`, `TestimonialsContent`, `NavContent`, `FooterContent`, `StatItem`, `ProcessContent`, `ProblemContent`, `CommonContent`). Task 5 must define all of them (representative subset shown; full set required). Namespace names are consistent between Task 4 (authoring) and Tasks 8–17 (consumption).

**Open risk to confirm during execution:** next-intl v4's exact `t.raw('')` whole-namespace behavior and the `IntlMessages` augmentation form — both flagged inline to verify via `context7` in Tasks 6 and 8 before propagating the pattern.
