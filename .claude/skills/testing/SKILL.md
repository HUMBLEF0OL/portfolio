---
name: testing
description: Vitest + Testing Library patterns for unit/component tests, Playwright for e2e. Use when writing tests or adding test coverage.
paths:
  - src/**/*.test.{ts,tsx}
  - e2e/**
---

# Testing Patterns

## Unit / Component Testing

**Framework:** Vitest + React Testing Library (jsdom).
**Location:** co-located `*.test.ts` / `*.test.tsx` next to the code they test
(the vitest glob is `src/**/*.test.{ts,tsx}`).

## Pure-function Test

```ts
import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('dedupes conflicting tailwind classes (last wins)', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })
})
```

## Component Test

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    let clicked = false
    render(<Button onClick={() => (clicked = true)}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(clicked).toBe(true)
  })
})
```

## Testing components that use next-intl

Wrap the component in `NextIntlClientProvider` with a minimal messages object so
`useTranslations` resolves:

```tsx
import { NextIntlClientProvider } from 'next-intl'
import { render } from '@testing-library/react'

function renderIntl(ui: React.ReactElement, messages: Record<string, unknown>) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  )
}
```

## Rules

- Test files: `src/**/*.test.{ts,tsx}` (co-located).
- Use `describe` blocks; use `it` (not `test`) for cases.
- Prefer `screen.getByRole()` queries (accessibility-first).
- Use `userEvent` over `fireEvent`; always `userEvent.setup()` first.
- Run tests: `npm run test` (watch) or `npm run test:run` (CI).
- `console.log` is allowed in test files (ESLint rule relaxed there).

---

## E2E Testing

**Framework:** Playwright. **Location:** `e2e/` at project root.

```ts
import { test, expect } from '@playwright/test'

test('home redirects to a locale and renders', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/(en|es|fr|it|pt|ru|ja|ko|zh|ar|hi|de)\b/)
})
```

### E2E Rules

- E2E files: `e2e/**/*.spec.ts`; use `test` (Playwright convention).
- Use the `page` fixture for page-level tests.
- Run e2e: `npm run test:e2e`. Config: `playwright.config.ts` (auto-starts the
  dev server via `webServer`; Chromium only by default).
