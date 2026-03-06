import { expect, test } from '@playwright/test'

test.describe('Navigation', () => {
  test('home page loads and displays title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Design System/i)
  })

  test('sidebar is visible on home page', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('nav')).toBeVisible()
  })

  test('Getting Started - Installation page loads', async ({ page }) => {
    await page.goto('/guide/installation')
    await expect(page.getByRole('heading', { name: /installation/i })).toBeVisible()
  })

  test('Getting Started - Theming page loads', async ({ page }) => {
    await page.goto('/guide/theming')
    await expect(page.getByRole('heading', { name: /theming/i })).toBeVisible()
  })

  test('Foundations - Colors page loads', async ({ page }) => {
    await page.goto('/foundations/colors')
    await expect(page.getByRole('heading', { name: /colors/i })).toBeVisible()
  })

  test('Foundations - Typography page loads', async ({ page }) => {
    await page.goto('/foundations/typography')
    await expect(page.getByRole('heading', { name: /typography/i })).toBeVisible()
  })

  test('Foundations - Tokens page loads', async ({ page }) => {
    await page.goto('/foundations/tokens')
    await expect(page.getByRole('heading', { name: /tokens/i })).toBeVisible()
  })

  test('Foundations - Icons page loads', async ({ page }) => {
    await page.goto('/foundations/icons')
    await expect(page.getByRole('heading', { name: /icons/i })).toBeVisible()
  })

  test('Components index page loads', async ({ page }) => {
    await page.goto('/components')
    await expect(page).toHaveURL(/components/)
  })

  test('navigation links are clickable', async ({ page }) => {
    await page.goto('/')
    const installLink = page.getByRole('link', { name: 'Installation' })
    await expect(installLink).toBeVisible()
    await installLink.click()
    await expect(page).toHaveURL(/installation/)
  })
})
