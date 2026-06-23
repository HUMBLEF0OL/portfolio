---
name: add-shadcn-ui
description: Add or use shadcn/ui components in this Next.js portfolio (New York style, Tailwind v4). Use when asked to "add a button/dialog/table/form", "install a shadcn component", "use a UI primitive", or build UI from shadcn components. Trigger on "shadcn", "ui component", "add a <component>".
---

# Using shadcn/ui here

Config is in `components.json`: style `new-york`, RSC enabled, base color `stone`, icons via `lucide-react`. Primitives live in `src/components/ui/`.

## Add a new primitive

```bash
npx shadcn@latest add <component>
```

This drops the file into `src/components/ui/`. Existing ones: `button`, `card`, `carousel`, `drawer`, `input`, `select`, `tabs`, `textarea`.

## Aliases (from components.json)
- `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils` (the `cn()` helper), `@/hooks`.

## Conventions
- Import primitives from `@/components/ui/<name>`.
- Compose with `cn()` for conditional classes; use theme tokens, not raw colors.
- Tailwind v4 is CSS-first (`src/app/globals.css`) — there is no `tailwind.config`.
- Don't hand-edit generated primitives unless intentionally customizing; prefer re-running the CLI or wrapping the component.
- Any user-facing text inside UI must still go through next-intl (see `add-translations` skill).
- For the cyber look, wrap/extend primitives with angular-clip utilities and `AngularFrame` corners rather than editing the base primitive.

## Verify
- `npm run lint`.
