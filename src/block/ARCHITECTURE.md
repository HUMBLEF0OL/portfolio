# src/block — Page sections

Page-level section components (PascalCase) for the neural-grid "operator"
services site.

- `op/` — the homepage section blocks composed by `src/app/[locale]/page.tsx`
  (`Hero`, `Ticker`, `StatBar`, `Problem`, `Services`, `Work`, `AboutBlock`,
  `Testimonials`, `Process`, `Engagement`, `Contact`).
- `Header` / `Footer` — operator chrome mounted by `src/app/[locale]/layout.tsx`.
- `AngularFrame` — angular corner-frame helpers (used by `not-found`).

Conventions:

- Default to Server Components; add `'use client'` only for hooks/events.
- Read content from `@/data/*.json` and shared FX primitives from
  `@/components/op`. Use theme tokens and the `clip-notch-*` / angular-clip
  utilities (see `design-tokens` skill).

See the `components` and `add-section` skills.
