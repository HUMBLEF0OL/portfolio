# src/data — Static content

Self-contained JSON content consumed directly by the operator-design sections
and routes (no translation-key indirection):

- `site.json` — identity, nav, ticker, stats, problem, footer, social (Header,
  Footer, Hero, Ticker, StatBar, Problem, Contact, MobileCTA).
- `about.json` — About page + the home About block.
- `services.json`, `process.json`, `pricing.json`, `faq.json`,
  `testimonials.json` — their respective home sections.
- `caseStudies.json` — Work section + the `work/[slug]` case-study route and
  its `generateStaticParams`/`sitemap`.
- `languages.json` — locale codes for the language switcher.

Copy here is English-only; the section components read these files directly
rather than via next-intl. Only the `Seo` and `404` namespaces in `messages/*`
are still localized (page metadata + the not-found route).
