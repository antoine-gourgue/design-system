import { expect, test } from '@playwright/test'

test.describe('Foundations - Colors', () => {
  test('page loads', async ({ page }) => {
    await page.goto('/foundations/colors')
    await expect(page.getByRole('heading', { name: /colors/i })).toBeVisible()
  })

  test('displays color swatches', async ({ page }) => {
    await page.goto('/foundations/colors')
    const swatches = page.locator('[class*="rounded"]').first()
    await expect(swatches).toBeVisible()
  })
})

test.describe('Foundations - Typography', () => {
  test('page loads', async ({ page }) => {
    await page.goto('/foundations/typography')
    await expect(page.getByRole('heading', { name: /typography/i })).toBeVisible()
  })

  test('shows text samples', async ({ page }) => {
    await page.goto('/foundations/typography')
    await expect(page.locator('body')).toContainText(/font|text|size/i)
  })
})

test.describe('Foundations - Tokens', () => {
  test('page loads', async ({ page }) => {
    await page.goto('/foundations/tokens')
    await expect(page.getByRole('heading', { name: /tokens/i })).toBeVisible()
  })
})

test.describe('Foundations - Icons', () => {
  test('page loads and shows icons heading', async ({ page }) => {
    await page.goto('/foundations/icons')
    await expect(page.getByRole('heading', { name: /icons/i })).toBeVisible()
  })

  test('collection selector exists', async ({ page }) => {
    await page.goto('/foundations/icons')
    await expect(page.getByRole('button', { name: /lucide|icons|collection/i }).first()).toBeVisible()
  })

  test('search filters icons', async ({ page }) => {
    await page.goto('/foundations/icons')
    const search = page.getByPlaceholder(/ex: user|search/i)
    await search.fill('flag-fr')
    await expect(page.getByRole('heading', { name: /search results/i })).toBeVisible()
  })

  test('clicking a category card shows icons in that category', async ({ page }) => {
    await page.goto('/foundations/icons')
    const firstCard = page.getByRole('button').filter({ hasText: /\w+/ }).first()
    const categoryName = await firstCard.textContent()
    await firstCard.click()
    if (categoryName) {
      await expect(page.locator('body')).toContainText(categoryName.trim().split('\n')[0])
    }
  })
})
