// Render the SVG icon to PNGs with system Chrome (via Playwright). Run once; PNGs are committed.
import { chromium } from '@playwright/test';
import { readFile } from 'node:fs/promises';

const svg = await readFile('site/icons/icon.svg', 'utf8');
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'chrome' });
const page = await browser.newPage();
for (const [size, file, pad] of [[192, 'icon-192.png', 0], [512, 'icon-512.png', 0], [180, 'apple-touch-icon.png', 0]]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<html><body style="margin:0;background:#0a1024">${svg.replace('<svg ', `<svg width="${size - pad * 2}" height="${size - pad * 2}" style="display:block;margin:${pad}px" `)}</body></html>`);
  await page.screenshot({ path: `site/icons/${file}`, omitBackground: false });
  console.log('wrote', file);
}
await browser.close();
