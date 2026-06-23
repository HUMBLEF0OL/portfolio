---
name: context7
description: Use before writing or referencing any stack library — fetches version-accurate docs via the context7 MCP server so call signatures, hooks, and APIs match what is installed. Invoke on first usage of any stack library, on any non-trivial Next.js API, or when uncertain whether an API is current.
---

# context7 — fetch version-current docs before writing stack-library code

## Purpose

The context7 MCP server provides version-accurate library documentation on
demand. Before writing code that uses a stack library, resolve the library ID
and fetch targeted docs so your call signatures, hooks, and API surface match
the version installed in this project.

## When to invoke

- First usage of a stack library (next-intl, embla-carousel-react, vaul, Radix,
  emailjs, next-themes) in a new file.
- Any non-trivial Next.js App Router API (layouts, `generateMetadata`,
  `generateStaticParams`, middleware, route handlers).
- When uncertain whether an API signature is current, or a type/runtime error
  suggests an API mismatch.

## How to invoke

1. `mcp__context7__resolve-library-id` — resolve the canonical library ID from
   the package name.
2. `mcp__context7__get-library-docs` — fetch targeted docs using the resolved ID
   and a specific topic.

Always resolve first. Never call `get-library-docs` with a guessed ID.

## Stack

| Library                 | Suggested topics                                              |
| ----------------------- | ------------------------------------------------------------- |
| `next`                  | `app router`, `metadata`, `generateStaticParams`, `image`     |
| `next-intl`             | `useTranslations`, `getTranslations`, `routing`, `setRequestLocale` |
| `next-themes`           | `ThemeProvider`, `useTheme`                                   |
| `embla-carousel-react`  | `useEmblaCarousel`, `options`, `plugins`                      |
| `vaul`                  | `Drawer`, `snap points`                                       |
| `@radix-ui/react-*`     | `dialog`, `select`, `tabs`, `slot`                            |
| `emailjs-com`           | `send`, `sendForm`, `init`                                    |
| `vitest`                | `mock`, `spy`, `setup`, `coverage`                            |
| `@playwright/test`      | `test`, `expect`, `fixtures`, `webServer`                     |

## Anti-patterns

- Don't call `get-library-docs` without first resolving the ID.
- Don't fetch the entire library doc when a `topic` will do.
- Don't cache mentally across sessions — re-fetch when uncertain.
