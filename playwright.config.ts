import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './apps/storybook/e2e',
  fullyParallel: true,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3001',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev --workspace=apps/storybook',
    url: 'http://127.0.0.1:3001',
    reuseExistingServer: true,
    timeout: 120000,
  },
})
