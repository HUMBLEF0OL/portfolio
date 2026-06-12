# Portfolio Revamp — profile.json-driven content refresh + Impact & Metrics section

Date: 2026-06-12

## Goals

1. Refresh the portfolio's content (Experience, Projects, Skills, About/Home copy) to match the new `src/data/profile.json` (v3.0.0) — the current authoritative source for facts about Amit Rana.
2. Add a new **Impact & Metrics** section surfacing data that exists in `profile.json` but is currently unused (`metrics.highlights`, `achievements`).
3. Keep the existing cyberpunk/terminal visual language (angular frames, terminal log panels, `▸`/`▌` markers, glitch headings) and the existing Server/Client component split conventions.
4. Update `messages/en.json` as the source of truth for new/changed copy, and mirror the same key structure into the other 10 locale files (`ar`, `de`, `es`, `fr`, `hi`, `it`, `ja`, `ko`, `pt`, `ru`, `zh`) with English placeholder text — real translations are a follow-up pass.

## Out of scope

- Adding the Coding Ninjas TA role as a 4th Experience tab (explicitly deferred — keep 3 tabs).
- Translating new/changed copy into the 10 non-English locales (English placeholders only).
- Adding "JSON Parser" or "Portfolio" project entries (the only two `featured: false` entries in `profile.json.projects`).
- Re-theming colors, fonts, or the angular-frame visual system itself.

---

## 1. Data layer (`src/data/`)

### `skills.json` (restructured)

Mirrors `profile.json.skills`:

```json
{
  "byCategory": {
    "languages": ["JavaScript", "TypeScript", "Java", "SQL"],
    "frameworksAndLibraries": ["React.js", "Next.js", "Node.js", "Express.js", "Redux Toolkit", "Zustand", "Material UI", "Tailwind CSS"],
    "frontendFundamentals": ["HTML5", "CSS3 / SCSS", "Responsive Design", "PWA", "i18n"],
    "apisAndRealtime": ["REST APIs", "WebSockets"],
    "testing": ["Jest", "Vitest"],
    "buildAndTooling": ["Webpack", "Babel", "NPM", "pnpm", "Shell"],
    "devopsAndTools": ["Git", "Docker", "Postman", "Lighthouse", "Jira", "Google Analytics", "GitHub Actions"],
    "databases": ["Supabase (PostgreSQL)", "MySQL"],
    "practices": ["Web Performance Optimization", "Accessibility (WCAG)", "SEO", "Responsive Design", "Agile / Scrum"]
  },
  "aiAndAgentic": {
    "tools": ["OpenAI API", "OpenRouter", "LangChain", "Claude Code", "MCP (Model Context Protocol)", "AI SDK"],
    "practices": ["AI-assisted SDLC", "Agentic development workflows", "Output verification of AI agents", "LLM pipeline design"]
  },
  "specialInterests": ["Reverse engineering", "Low-level / binary & PE format work"]
}
```

### `impact.json` (new)

```json
{
  "highlights": [
    { "key": "usersServed", "value": "300K+" },
    { "key": "npmWeeklyDownloads", "value": "50K+" },
    { "key": "coreWebVitals", "value": "95+" },
    { "key": "lighthousePerformance", "value": "90+" },
    { "key": "loadTimeReduction", "value": "40%" },
    { "key": "mobileRetentionLift", "value": "30%" },
    { "key": "bugReduction", "value": "30%" }
  ],
  "achievementKeys": ["promotion", "hookpilotDownloads", "frontendScale", "githubAchievements", "mcpSentryCoverage"]
}
```

`value` is raw (numeric/non-linguistic). `key`/`achievementKeys` map into `messages.Impact.metrics.<key>.{label,context}` and `messages.Impact.achievements.<key>`.

### `project.json` (restructured — 10 featured projects)

Each entry gets a consistent shape, keyed by `key` (the existing `Projects.cards.<key>` translation-key base — replaces the current `titleKey.split('.')[1]` indirection). `image` XOR `preview` (a literal terminal command string) is set per project:

| key | category | status | tech | links | image / preview |
|---|---|---|---|---|---|
| hookpilot | developerTooling | Live | Node.js, TypeScript, Shell, NPM | github, npm | `/projects/hookpilot.png` |
| coherence | aiAgenticTooling | Live | TypeScript, Claude Code, LLM, Sigstore cosign, GitHub Actions | github | `claude plugin install coherence` |
| ghostframes | frontendLibrary | Live | TypeScript, React | github, npm | `pnpm add @ghostframes/runtime` |
| gitcompass | developerTooling | Live | TypeScript, Node.js, AI SDK, pnpm monorepo | github, npm | `pnpm install && pnpm build` |
| glassbox | aiAgenticTooling | Live | Node.js, JavaScript, ESM | github | `npm install -g github:HUMBLEF0OL/glassbox` |
| mcpsentry | aiAgenticTooling | Live | TypeScript, MCP, Cloudflare Workers, SARIF | github | `npx mcp-sentry@latest scan ./path/to/mcp-server` |
| javascriptverse | frontendTooling | Live | React.js, Tailwind CSS, Babel, Webpack, Node.js | github, live | `/projects/javascript-verse.png` |
| filesqueeze | developerTooling | Live | Node.js, JavaScript, NPM | github | `/projects/filesqueeze.png` |
| skinbattle | webApplication | Private | Next.js, Material UI, Redux Toolkit, WebSockets | — | `/projects/skinbattle.jpeg` |
| felis | aiApplication | Private | Next.js, OpenAI API, Tailwind CSS, LangChain, Supabase | — | `/projects/felis-ai.png` |

Example shapes (image-based vs. preview-based):

```json
{
  "key": "hookpilot",
  "category": "developerTooling",
  "status": "Live",
  "tech": ["Node.js", "TypeScript", "Shell", "NPM"],
  "image": "/projects/hookpilot.png",
  "links": { "github": "https://github.com/HUMBLEF0OL/hook-pilot", "npm": "https://www.npmjs.com/package/hookpilot" }
}
```
```json
{
  "key": "coherence",
  "category": "aiAgenticTooling",
  "status": "Live",
  "tech": ["TypeScript", "Claude Code", "LLM", "Sigstore cosign", "GitHub Actions"],
  "preview": "claude plugin install coherence",
  "links": { "github": "https://github.com/HUMBLEF0OL/coherence" }
}
```

`status` is `"Live"` or `"Private"`, copied verbatim from `profile.json`. `"Private"` entries (skinbattle, felis) render the existing `PRIVATE` badge and no link buttons — same as current behavior, no new "Live" badge is introduced. `links` holds whichever of `github` / `npm` / `live` apply, read directly from each project's `profile.json.projects[].links`.

`key` maps to `Projects.cards.<key>.{title,subtitle,description}` — new entries needed for `coherence`, `ghostframes`, `gitcompass`, `glassbox`, `mcpsentry` (title/subtitle/description each, derived from each project's `tagline`/`description` in profile.json); existing 5 keys (`skinbattle`, `hookpilot`, `felis`, `javascriptverse`, `filesqueeze`) reused — **`filesqueeze`'s description must be corrected**, since the current copy describes a generic build-asset optimizer ("compress and optimize project assets... Supporting formats like JS, JSON, HTML, and CSS") but `profile.json` describes a from-scratch Huffman-coding compression CLI for `.txt/.json/.docx/.pdf` with a tree-metadata binary format — the new description should reflect the Huffman-coding implementation.

### `xp.json` (operationsKeys updated)

- `xp-sde2.operationsKeys`: `op1`..`op10` (was `op1`..`op5`)
- `xp-sde1.operationsKeys`: `op1`..`op3` (was `op1`..`op5`)
- `xp-intern.operationsKeys`: unchanged (`op1`..`op4`) — profile.json provides no highlights for this role, existing copy is kept

---

## 2. New section: Impact & Metrics (Terminal Readout)

New component following the existing `add-section` conventions, placed **between Skills and Projects** in `src/app/[locale]/page.tsx`, with the same `/// IMPACT.MODULE` divider treatment used for `/// SKILLS.MODULE` and `/// XP.MODULE`.

Single bordered terminal panel (same visual family as Contact's `NEURAL_TERMINAL` box and CyberID's log box):

```
> cat impact_metrics.log
[METRIC] users_served .......... 300K+   // Scalable Next.js frontend
[METRIC] npm_weekly_downloads ... 50K+    // Hookpilot
[METRIC] core_web_vitals ........ 95+     // Performance, SEO, accessibility
[METRIC] lighthouse_performance . 90+     // FCP<1.2s, LCP<2s, TTFB<300ms
[METRIC] load_time_reduction .... 40%     // Targeted performance work
[METRIC] mobile_retention_lift .. 30%     // PWA features
[METRIC] bug_reduction .......... 30%     // Major client delivery (SDE-1)

> cat achievements.log
▸ Promoted from SDE-1 to Senior Engineer on early, high-quality contributions
▸ Hookpilot surpassed 50,000 weekly downloads on npm
▸ Shipped a Next.js frontend serving 300K+ users with 95+ Core Web Vitals
▸ GitHub achievements earned (x2)
▸ mcp-sentry covers all eight OWASP MCP Top 10 categories
> _
```

Rendered by mapping `impact.json.highlights` → `Impact.metrics.<key>.label` / `.context` (value from JSON), and `impact.json.achievementKeys` → `Impact.achievements.<key>`. The trailing `> _` is a decorative blinking-cursor span (no translation needed, consistent with existing `>` / `▌` decorative markers elsewhere).

New translation namespace `Impact`:
- `sectionTitle` (e.g. "Impact Log")
- `metricsPrompt` = "cat impact_metrics.log"
- `achievementsPrompt` = "cat achievements.log"
- `metrics.<key>.label` / `.context` for the 7 metrics
- `achievements.<key>` for the 5 achievement strings

New `Page.sections.impactModule` = "/// IMPACT.MODULE" and `Header.navLinks.impact` = "Impact" (nav order: Home, About, Skills, Impact, Projects, XP).

---

## 3. Skills section

`Skills.tsx` keeps its current `Object.entries(...).map(...)` tile-grid rendering, now iterating `skills.byCategory`'s 9 categories. Category keys get real translated labels via new `Skills.categories.<key>` entries (languages, frameworksAndLibraries, frontendFundamentals, apisAndRealtime, testing, buildAndTooling, devopsAndTools, databases, practices) instead of displaying the raw camelCase key.

After the main grid, a visually distinct **featured block** for `aiAndAgentic` — same tile style but wrapped in an accent-glow angular frame (border-accent, `shadow-[0_0_..._var(--accent)]`-style glow consistent with `--accent-glow` token), with sub-labels `Skills.aiAndAgentic.title` ("AI & Agentic Engineering"), `.toolsLabel` ("Tools"), `.practicesLabel` ("Practices").

Below that, `specialInterests` rendered as small footer tags under `Skills.specialInterests.title` (e.g. "// Side Quests"), styled like the existing `Skills.footer` line.

---

## 4. Projects section (unified grid)

Replaces the `Carousel`-based layout with a responsive card grid (1 col mobile / 2 col tablet / 3 col desktop) over the 10 entries in the restructured `project.json`. Drops the `orientation` resize-listener logic entirely — no carousel.

Each card:
- **Header**: title + tagline (`Projects.cards.<key>.title` / `.subtitle`)
- **Media**: either the existing screenshot (`Image`, for the 5 projects that have one) or a monospace "terminal preview" panel (`$ <preview command>`, green-on-black, same family as Contact's terminal) for the 5 that don't
- **Category badge**: `Projects.categories.<category>` (new keys: developerTooling, aiAgenticTooling, frontendLibrary, frontendTooling, webApplication, aiApplication)
- **Tech badges**: existing angular-corner badge treatment, raw tech strings (unchanged — not translated, same as today)
- **Status / links**: `status === "Private"` → existing `PRIVATE` badge treatment (SkinBattle, Felis AI — no link buttons), unchanged from current behavior. Otherwise → link buttons for whichever of `links.github` / `links.npm` / `links.live` exist on the entry. New `Projects.npm` label ("NPM") for the npm button (`github`/`live` labels already exist as `Projects.github`/`Projects.live`).
- **Description**: full `Projects.cards.<key>.description` shown on larger viewports (`hidden md:inline-flex`, matching current pattern), hidden on mobile to keep cards compact.

---

## 5. Experience section (data-only refresh)

No component/UI changes — same 3 tabs, same tab component. Only `xp.json` (operationsKeys, covered in §1) and `messages/en.json` content change:

- **SDE-2** (`Experience.content.sde2`):
  - `title`: "Senior Software Development Engineer (SDE-2)" (was "Software Development Engineer 2")
  - `period`: "July 2024 – Present" (was "July 2023 – Present")
  - `op1`–`op10`: the 10 highlights from `profile.json.experience[0].roles[0].highlights` (adds AI-assisted/agentic workflows, Lighthouse 90+/WCAG, 40% load-time cut, and mentoring — on top of the 5 already present)
- **SDE-1** (`Experience.content.sde1`):
  - `title`: "Software Development Engineer (SDE-1)" (was "Software Development Engineer 1")
  - `period`: "July 2022 – July 2024" (was "June 2021 – June 2023")
  - `op1`–`op3`: replaced with `profile.json.experience[0].roles[1].highlights` (interactive/responsive UI work, major client delivery cutting bugs 30%, early promotion to Senior Engineer) — the current op1–op5 ("booking engine", "Lighthouse 55→90+", etc.) don't match profile.json and are removed
- **Intern** (`Experience.content.intern`):
  - `title`: "Software Engineer Intern" (was "Software Development Intern")
  - `period`: "January 2022 – June 2022" (was "Jan 2021 – May 2021")
  - `op1`–`op4`: unchanged
- `terminalLogStart.timeframe`: " [  TIMEFRAME  ] ACTIVITY LOG -- 2022 ▶ Present" (was "...2022 ▶ 2025") — matches the leading-space/bracket format of the other `terminalLogStart` entries

---

## 6. About / Home copy (blended voice)

Keep the "Welcome to the Grid" / "Identity Log" narrative voice; weave in facts from `profile.json.about` (summaryShort, currentFocus, values).

**`Home.description`** (replaces current generic copy):

> "The Grid. A digital frontier where a Senior Software Development Engineer architects production systems by day and ships open-source developer tooling by night — from Hookpilot's 50K+ weekly npm downloads to agentic, AI-assisted developer workflows. Neon circuits power systems built from logic, but shaped by creativity. Glitches don't break things — they reveal them. Backed by an MS in Informatics and a habit of verifying what the machines produce, this isn't just a network; it's a reflection of human imagination."

`Home.headline` ("Welcome to the Grid") stays unchanged — it's the glitch hero text.

**About section** — fix existing bug where `About.tsx` renders `t("paragraph1")` twice instead of `paragraph1` then `paragraph2` (line 33 currently duplicates line 30). `paragraph2` becomes visible for the first time:

- `About.paragraph1`: unchanged (general philosophy — still accurate)
- `About.paragraph2` (replaces the unused current text, now actually rendered):
  > "Lately that means building developer tooling and AI-assisted, agentic workflows — Git hook automation with Hookpilot (50K+ weekly npm downloads), zero-config skeleton loaders with Ghostframes, and Claude Code plugins that verify what AI agents produce before anything ships. Verification over blind trust; reliability over throwaway code."
- `About.paragraph3` / `About.closing`: unchanged

**`CyberIDCard.identity.roleValue`**: "Senior Development Engineer" → "Senior SDE-2 · Truminds" (matches current title from profile.json without overflowing the card).

---

## 7. Header nav

Add `Header.navLinks.impact` = "Impact" → `#impact`, inserted between `skills` and `projects` in `navLinks` array in `Header.tsx` (affects both desktop list and mobile drawer, which both map over the same array).

---

## 8. i18n propagation

After `messages/en.json` is fully updated with all new/changed keys above, mirror the same key structure into `ar.json`, `de.json`, `es.json`, `fr.json`, `hi.json`, `it.json`, `ja.json`, `ko.json`, `pt.json`, `ru.json`, `zh.json` using the English strings as placeholder values (via the project's `add-translations` skill), so `next-intl` never hits a missing key. Real translation is a separate follow-up pass.
