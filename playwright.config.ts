import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

const env = process.env.ENV || 'dev';

// Load the corresponding .env file
dotenv.config({
  path: `./.${env}.env`,
});

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.workers ? 3 : 2,
  reporter: "html",
  timeout: 60_000,
  use: {
    baseURL: process.env.BASE_URL || 'https://automationexercise.com',
    testIdAttribute: "data-qa",
    headless: true,
    screenshot: "only-on-failure",
    video: "off",
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
