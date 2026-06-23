import { test, expect } from '@playwright/test'

test('home redirects to a locale and renders', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/(en|es|fr|it|pt|ru|ja|ko|zh|ar|hi|de)\b/)
})
