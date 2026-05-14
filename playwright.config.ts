import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/junit-report.xml' }]
  ],
  use: {
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    baseURL: process.env.BASE_URL || 'https://playwright.dev'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
