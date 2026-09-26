// Live check: real date, service worker install, offline reload, manifest. Usage: node scripts/live-check.mjs URL
import { chromium, devices } from '@playwright/test';

const URL = process.argv[2] || 'https://tuanmh.github.io/football-daily/';
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'chrome' });
const ctx = await browser.newContext({ ...devices['Pixel 7'] });
const page = await ctx.newPage();
const errs = [];
page.on('pageerror', (e) => errs.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });

await page.goto(URL);
await page.waitForSelector('[data-testid=focus]');
const today = await page.getByTestId('today-date').textContent();
const title = await page.locator('h1').first().textContent();
const plan = await page.getByTestId('plan-item').count().catch(() => 0);
const manifest = await page.evaluate(async () => (await (await fetch('manifest.webmanifest')).json()).name);
await page.waitForFunction(() => navigator.serviceWorker && navigator.serviceWorker.controller, null, { timeout: 20000 }).catch(() => null);
const swReady = await page.evaluate(() => !!(navigator.serviceWorker && navigator.serviceWorker.controller));
if (!swReady) { await page.reload(); await page.waitForTimeout(1500); }
const swAfter = await page.evaluate(() => !!(navigator.serviceWorker && navigator.serviceWorker.controller));
const cacheKeys = await page.evaluate(async () => (await caches.keys()));
await page.screenshot({ path: 'shots/live-today.png' });

await ctx.setOffline(true);
await page.reload();
await page.waitForSelector('[data-testid=focus]', { timeout: 10000 });
const offlineOk = await page.getByTestId('focus').isVisible();
await page.goto(URL + '#/brain');
await page.waitForSelector('[data-testid=pitch]', { timeout: 10000 });
const offlineBrain = await page.getByTestId('pitch').isVisible();
await ctx.setOffline(false);

console.log(JSON.stringify({ URL, today, title, planItems: plan, manifest, swControlling: swReady || swAfter, cacheKeys, offlineOk, offlineBrain, errors: errs }, null, 1));
await browser.close();
