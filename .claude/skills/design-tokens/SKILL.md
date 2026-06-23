---
name: design-tokens
description: The portfolio's CSS-first Tailwind v4 design system — @theme color/font tokens, the light (cyberpunk) and .dark (Tron) themes, angular-clip utilities, AngularFrame corners, and glow effects. Use when styling, theming, or adding a design token. There is NO tailwind.config and NO Figma pipeline.
paths:
  - src/app/globals.css
  - src/block/**
  - src/components/**
---

# Design Tokens — CSS-first (Tailwind v4)

The design system is defined **entirely in `src/app/globals.css`** via Tailwind
v4's `@theme` and `@layer`/`@utility` — there is **no `tailwind.config.*`** and
no Figma/token-sync pipeline. Tokens are CSS custom properties exposed to
Tailwind through `@theme inline`.

## How it is wired

1. `:root` defines the CSS variables (`--background`, `--primary`, `--border`, …)
   for the default **cyberpunk** theme (night-blue bg, neon-yellow text).
2. `.dark` overrides the same variables for the **Tron** theme (grid-void bg,
   ice-blue/Tron-blue glow). `next-themes` toggles the `.dark` class.
3. `@theme inline { --color-background: var(--background); … }` maps each variable
   to a Tailwind color/font token, so `bg-background`, `text-foreground`,
   `border-border`, etc. work.

## Color tokens (use these, not raw colors)

`background`, `foreground`, `card`, `card-foreground`, `popover`, `primary`,
`primary-foreground`, `secondary`, `secondary-foreground`, `accent`,
`accent-foreground`, `highlight`, `muted`, `muted-foreground`, `destructive`,
`border`, `input`, `ring`, `chart-1..5`, `sidebar*`.

```tsx
<div className="bg-background text-foreground border-border border">
  <h2 className="text-highlight">Title</h2>
  <span className="text-primary">accent text</span>
</div>
```

Add `dark:` variants only when a value must differ beyond the token override
(the theme variables already swap automatically).

## Fonts

- `font-body` → `--font-chakra` (Chakra Petch), default `html` font.
- `font-heading` → `--font-oxanium` (Oxanium), applied to `h1`–`h6`.

Fonts are loaded with `next/font/google` in `src/app/layout.tsx` and exposed as
CSS variables on `<html>`.

## Angular-clip utilities (the cyber aesthetic)

Defined under `@layer utilities` in `globals.css`. Apply a clip-path to give
elements the angular/beveled corners:

- Single corner: `angular-tl-lg`, `angular-tr-lg`, `angular-bl-lg`, `angular-br-lg`
- Two corners: `angular-tl-br-lg`, `angular-tr-bl-lg`, `angular-tl-tr-lg`, …
- Three corners: `angular-tl-tr-bl-lg`, `angular-tl-tr-br-lg`, …
- All four: `angular-all-lg`, `angular-all-sm`
- Size variants: `angular-tl-tr-sm`, `angular-tl-tr-xl`, `angular-tl-br-xl`,
  `angular-tr-bl-xl`, `angular-br-md`, `angular-bl-2xl`

```tsx
<div className="angular-tl-br-lg bg-card p-4">…</div>
```

## AngularFrame corners

For framed corner brackets, use the `AngularFrame` components from
`@/block/AngularFrame` (`TopLeft`, `TopRight`, `BottomLeft`, `BottomRight`):

```tsx
import { TopLeft, BottomRight } from '@/block/AngularFrame'

<div className="relative border-border border p-6">
  <TopLeft />
  <BottomRight />
  {children}
</div>
```

## Glow effects

`globals.css` defines glow custom properties: `--primary-glow`,
`--secondary-glow`, `--accent-glow`, `--glow-primary/secondary/accent`,
`--glass-bg`, `--glass-blur`, `--ring-glow`. Reference them in component CSS or
inline styles for the neon look.

## Adding a new token

1. Add the variable to **both** `:root` and `.dark` in `globals.css`.
2. Map it under `@theme inline` (e.g. `--color-foo: var(--foo)`).
3. Use it as a Tailwind class (`bg-foo`, `text-foo`).

## Rules

- Never introduce a `tailwind.config.*` — keep everything CSS-first.
- Always merge conditional classes with `cn()` from `@/lib/utils`.
- Use theme tokens (`bg-background`, `text-highlight`, `border-border`) — never
  hardcode hex/oklch colors in components.
- Use the existing angular-clip utilities; add new ones to `globals.css` rather
  than inlining `clip-path` in components.
