# src/components — Shared components

- `ui/` — shadcn/ui (New York) primitives (`button`, `card`, `dialog`,
  `select`, `tabs`, `drawer`, `carousel`, `input`, `textarea`). Generated;
  keep them pure (no business logic) and do not hand-edit unless customizing.
  Add with `npx shadcn@latest add <component>` (see `add-shadcn-ui` skill).
- `*.tsx` (e.g. `theme-provider.tsx`) — shared non-UI components.

Page-level sections live in `src/block`, not here.
