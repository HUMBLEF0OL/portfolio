# src/block — Page sections

Page-level section components (PascalCase), composed by `src/app/[locale]/page.tsx`
and the layouts: `Home`, `About`, `Skills`, `Projects`, `Experience`,
`Contact`, `Header`, `Footer`, plus helpers like `Divider`, `AngularFrame`,
`ThemeSwitch`, `NavIcons`, `CyberId`, `TextEncoder`.

- Default to Server Components; add `'use client'` only for hooks/events.
- Compose shadcn primitives from `@/components/ui`, read content from
  `@/data/*.json`, and read copy via next-intl. Never hardcode user-facing strings.
- Use theme tokens and angular-clip utilities (see `design-tokens` skill).

See the `components` and `add-section` skills.
