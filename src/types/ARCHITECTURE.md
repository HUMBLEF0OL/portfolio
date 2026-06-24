# src/types — Shared TypeScript types

Hand-maintained types that mirror the shape of content blocks read from
next-intl messages via `useMessages()` / `getMessages()`.

- `content.ts` — one type per message namespace content block (e.g.
  `HeroContent`, `ServicesContent`, `CaseStudyCopy`). Components cast the raw
  message object to these at the read site (e.g.
  `messages.Hero as HeroContent`). The shapes track `messages/en.json` (the
  source of truth); `src/global.ts` augments next-intl's `Messages` type from
  the same file, and the message key-parity test guards structural drift.
