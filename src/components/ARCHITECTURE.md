# src/components — Shared components

- `op/` — neural-grid FX and shared client primitives (`NeuralGridFX`,
  `CursorHUD`, `Reveal`, `CountUp`, `GlitchText`, `Marquee`, `ScrambleText`,
  `HeroCanvas`, `LiveClock`, `MobileCTA`, `use-op` hooks).
- `*.tsx` (e.g. `theme-provider.tsx`) — shared non-UI components.

The old shadcn/ui (`ui/`) primitive kit was removed when the operator redesign
replaced those screens; the new sections use native elements + the `op/`
primitives. Re-add shadcn primitives on demand with
`npx shadcn@latest add <component>` (see `add-shadcn-ui` skill) if needed.

Page-level sections live in `src/block`, not here.
