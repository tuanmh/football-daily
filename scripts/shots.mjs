// Screenshot key screens at phone + desktop widths. Usage: node scripts/shots.mjs [baseUrl] [outDir]
import { chromium, devices } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const BASE = process.argv[2] || 'http://127.0.0.1:4173/';
const OUT = process.argv[3] || 'shots';
await mkdir(OUT, { recursive: true });
const MON = '2026-09-28';
const seedState = {
  v: 1,
  settings: { playerName: 'Sam', focusStart: MON, configured: true },
  history: { '2026-09-21': { done: [], complete: true }, '2026-09-22': { done: [], complete: true }, '2026-09-23': { done: [], complete: true }, '2026-09-24': { done: [], complete: true }, '2026-09-25': { done: [], complete: true }, [MON]: { done: ['d_tick_tock', 'd_juggle_pattern'], complete: false } },
  records: { juggle: [{ date: '2026-09-14', value: 6 }, { date: '2026-09-18', value: 9 }, { date: '2026-09-22', value: 8 }, { date: '2026-09-25', value: 14 }], toetaps: [{ date: '2026-09-21', value: 38 }, { date: '2026-09-24', value: 44 }], slalom: [{ date: '2026-09-23', value: 22.4 }, { date: '2026-09-25', value: 21.8 }] },
  brain: { answered: { 'keeper-ball': true, 'too-deep': false }, seenAt: {} },
  reflections: [{ date: '2026-09-26', good: 'Won two 50/50s at the back', fix: 'Look before I get the ball', feel: 'Great', focus: 'bounce' }],
};
const shots = [
  ['today', '#/'], ['drill', '#/drill/d_scan_wall'], ['brain', '#/brain'], ['brain-answer', '#/brain', 'answer'],
  ['drills', '#/drills'], ['records', '#/records'], ['dad', '#/dad'], ['coach', '#/drill/d_scan_wall', 'coach'],
];
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'chrome' });
for (const [label, ctxOpts] of [['phone', devices['Pixel 7']], ['desktop', { viewport: { width: 1280, height: 900 } }]]) {
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  await page.goto(`${BASE}?date=${MON}&nosw`);
  await page.evaluate((s) => localStorage.setItem('football-daily:v1', JSON.stringify(s)), seedState);
  for (const [name, hash, action] of shots) {
    await page.goto(`${BASE}?date=${MON}&nosw${hash}`);
    await page.reload();
    await page.waitForTimeout(250);
    if (action === 'answer') { await page.locator('[data-testid=choice][data-correct=true]').click(); await page.waitForTimeout(150); }
    if (action === 'coach') { await page.getByTestId('coach-btn').click(); await page.waitForSelector('#coach.red, #coach.green, #coach.blue, #coach.yellow', { timeout: 12000 }); }
    await page.screenshot({ path: `${OUT}/${label}-${name}.png` });
    if (action !== 'coach' && await page.evaluate(() => document.documentElement.scrollHeight > innerHeight + 40)) {
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await page.waitForTimeout(150);
      await page.screenshot({ path: `${OUT}/${label}-${name}-end.png` });
    }
    console.log('shot', label, name);
  }
  await ctx.close();
}
await browser.close();
