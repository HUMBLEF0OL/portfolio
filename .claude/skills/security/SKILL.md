---
name: security
description: Use when reviewing the contact form, locale handling, redirects, external embeds, or any code that crosses a user-input or third-party trust boundary — walks the OWASP Top 10 for this specific (frontend-only) stack.
---

# Security — OWASP Top 10 mapped to this stack

## Purpose

Walk the OWASP Top 10 as it applies to this **frontend-only** portfolio (Next.js
App Router, next-intl, emailjs contact form — no backend, DB, auth, or API
routes). Use when reviewing the contact form, locale handling, redirects,
external embeds/CDN scripts, or any user-input boundary.

## When to invoke

- Editing the emailjs contact form (`src/block/Contact.tsx`).
- Handling the `[locale]` URL segment or any redirect/URL construction.
- Adding a third-party script, iframe, or remote image.
- Reviewing anything that renders user- or data-supplied HTML.

## OWASP Top 10 (relevant items)

### A01 — Broken Access Control / Open Redirect

There are no protected routes, but validate any redirect target against the
routing locales — never redirect to a URL built from unvalidated input. The
locale segment is user input: validate with `hasLocale(routing.locales, locale)`
before use (the layout already does this).

### A03 — Injection / XSS

React escapes JSX by default — do not bypass it. Never use
`dangerouslySetInnerHTML` with non-static content (a `CONSTRAINTS.md` MUST NOT).
Avoid `eval` / `new Function`. For emailjs, pass values as template params; never
build markup by string-concatenating user input.

### A05 — Security Misconfiguration

Set security headers in `next.config.ts` (`X-Content-Type-Options`,
`X-Frame-Options`, a `Content-Security-Policy` where feasible). Never expose
stack traces to end users — route errors through `error.tsx`.

### A06 — Vulnerable & Outdated Components

Run `npm audit` (the updater agent / `npm run update:check`). Review a package's
dependency tree and recent CVEs before adding it.

### A08 — Software & Data Integrity

Use SRI hashes for any CDN `<script>`. Don't load untrusted remote code. Prefer
`next/image` with explicit `remotePatterns` over arbitrary remote URLs.

## Stack-specific patterns

### emailjs contact form

- emailjs's **public** key / service / template IDs are designed to be
  browser-visible — that's expected. But there is no server validation, so add
  basic client-side validation (required fields, email format, length caps) and
  rely on emailjs rate limiting / a captcha if abuse appears.
- Never put any genuinely secret credential in `NEXT_PUBLIC_*` — those are
  shipped to the browser.

### i18n / locale parameter

The locale from the URL is user input. Validate it against `routing.locales`
before use; never use it for filesystem paths without sanitisation.

## Anti-patterns

- `eval` / `new Function` with any user-supplied string.
- `dangerouslySetInnerHTML` with non-static content.
- Genuinely secret values in `NEXT_PUBLIC_*` env vars or client components.
- Redirecting to an unvalidated, user-derived URL.
- Loading third-party scripts without SRI / a trust review.
