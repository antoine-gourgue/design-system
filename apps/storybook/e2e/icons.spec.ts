import { expect, test } from '@playwright/test'

test.describe('Icons page', () => {
  test('page loads with icons heading', async ({ page }) => {
    await page.goto('/foundations/icons')
    await expect(page.getByRole('heading', { name: 'Icons' })).toBeVisible()
  })

  test('supports searching icon names', async ({ page }) => {
    await page.goto('/foundations/icons')

    await expect(page.getByRole('heading', { name: 'Icons' })).toBeVisible()

    const searchInput = page.getByPlaceholder('ex: user, arrow-right, calendar')
    await searchInput.fill('flag-fr')

    await expect(page.getByRole('heading', { name: 'Search results' })).toBeVisible()
    await expect(page.getByText('flag-fr').first()).toBeVisible()
  })

  test('clears search and returns to categories view', async ({ page }) => {
    await page.goto('/foundations/icons')
    const searchInput = page.getByPlaceholder('ex: user, arrow-right, calendar')
    await searchInput.fill('arrow')
    await expect(page.getByRole('heading', { name: 'Search results' })).toBeVisible()
    await searchInput.clear()
    await expect(page.getByRole('heading', { name: 'Categories' })).toBeVisible()
  })

  test('navigates category card to details and back', async ({ page }) => {
    await page.goto('/foundations/icons')

    await page.getByRole('button', { name: 'Flags' }).first().click()
    await expect(page.getByRole('heading', { name: 'Flags' })).toBeVisible()

    await page.getByRole('button', { name: 'Back to categories' }).click()
    await expect(page.getByRole('heading', { name: 'Categories' })).toBeVisible()
  })

  test('collection tabs are displayed', async ({ page }) => {
    await page.goto('/foundations/icons')
    await expect(page.locator('button').filter({ hasText: /Lucide|Icons/ }).first()).toBeVisible()
  })
})
