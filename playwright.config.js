import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.PORT || 4173);
const BASE = process.env.BASE_URL || `http://127.0.0.1:${PORT}/`;

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['github']] : 'list',
  use: {
    baseURL: BASE,
    channel: process.env.PW_CHANNEL || 'chrome',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'phone', use: { ...devices['Pixel 7'], channel: process.env.PW_CHANNEL || 'chrome' } },
    { name: 'desktop', use: { viewport: { width: 1280, height: 900 } } },
  ],
  webServer: process.env.BASE_URL ? undefined : {
    command: `node scripts/serve.mjs site`,
    url: BASE,
    reuseExistingServer: false,
    env: { PORT: String(PORT) },
  },
});
