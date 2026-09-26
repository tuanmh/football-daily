import { test, expect } from '@playwright/test';

// Fixed dates so plans are deterministic. Week of Mon 28 Sep 2026.
const MON = '2026-09-28'; // full (home)
const TUE = '2026-09-29'; // team
const FRI = '2026-10-02'; // light (game tomorrow)
const SAT = '2026-10-03'; // game
const SUN = '2026-10-04'; // rest
const at = (date, hash = '#/') => `./?date=${date}&nosw${hash}`;

const errors = [];
const STUB_IMG = '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="#345"/></svg>';
test.beforeEach(async ({ page }) => {
  errors.length = 0;
  // Tests never depend on YouTube: thumbnails and embeds are stubbed.
  await page.route('https://i.ytimg.com/**', (r) => r.fulfill({ status: 200, contentType: 'image/svg+xml', body: STUB_IMG }));
  await page.route('https://www.youtube-nocookie.com/**', (r) => r.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>stub</title>' }));
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
});
test.afterEach(() => { expect(errors, 'no console errors').toEqual([]); });

async function seed(page, date, state) {
  await page.goto(at(date));
  await page.evaluate((s) => localStorage.setItem('football-daily:v1', JSON.stringify(s)), state);
}

test('home day: full plan with focus band, 6 drills, setup note', async ({ page }) => {
  await page.goto(at(MON));
  await expect(page.getByTestId('focus')).toContainText('Bounce');
  await expect(page.getByTestId('day-title')).toContainText('day');
  await expect(page.getByTestId('plan-item')).toHaveCount(6);
  await expect(page.getByTestId('setup-note')).toBeVisible();
  await expect(page.getByTestId('streak')).toContainText('0');
  await expect(page.getByTestId('start')).toHaveText('Start');
  const mins = await page.getByTestId('minutes').textContent();
  const n = Number(mins.match(/\d+/)[0]);
  expect(n).toBeGreaterThanOrEqual(15);
  expect(n).toBeLessThanOrEqual(25);
});

test('team day shows only the Daily 3', async ({ page }) => {
  await page.goto(at(TUE));
  await expect(page.getByTestId('day-title')).toHaveText('Team day');
  await expect(page.getByTestId('plan-item')).toHaveCount(3);
});

test('light, game and rest days', async ({ page }) => {
  await page.goto(at(FRI));
  await expect(page.getByTestId('day-title')).toHaveText('Light day');
  await expect(page.locator('[data-drill=b_pause_pick]')).toBeVisible();
  await page.goto(at(SAT));
  await expect(page.getByTestId('game-day')).toBeVisible();
  await expect(page.getByTestId('after-btn')).toBeVisible();
  await page.goto(at(SUN));
  await expect(page.getByTestId('rest-day')).toContainText('Rest is training too');
});

test('complete a team day end to end: streak goes to 1 and persists', async ({ page }) => {
  await page.goto(at(TUE));
  await page.getByTestId('start').click();
  for (let i = 0; i < 3; i++) {
    await expect(page.getByTestId('drill-name')).toBeVisible();
    await page.getByTestId('done-btn').click();
  }
  await expect(page.getByTestId('all-done')).toBeVisible();
  await expect(page.getByTestId('streak')).toContainText('1');
  await page.reload();
  await expect(page.getByTestId('all-done')).toBeVisible();
  await expect(page.getByTestId('week-count')).toContainText('1/');
});

test('drill page: timer counts down, pause, reset; TFT link opens tft-tube', async ({ page }) => {
  await page.goto(at(MON, '#/drill/d_toetaps'));
  await expect(page.getByTestId('drill-cue')).toHaveText('Bounce');
  await expect(page.getByTestId('clock')).toHaveText('2:00');
  await page.getByTestId('timer-btn').click();
  await page.waitForTimeout(1300);
  await expect(page.getByTestId('clock')).not.toHaveText('2:00');
  await page.getByTestId('timer-btn').click(); // pause
  await expect(page.getByTestId('timer-btn')).toHaveText('Resume');
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.getByTestId('clock')).toHaveText('2:00');
  const link = page.getByTestId('tft-link');
  await expect(link).toHaveAttribute('href', /^https:\/\/tft-tube\.com\//);
  await expect(link).toHaveAttribute('target', '_blank');
});

test('log a test score: best updates, PB toast, belt', async ({ page }) => {
  await page.goto(at(MON, '#/drill/d_juggle'));
  await expect(page.getByTestId('best')).toHaveText('none yet');
  await page.fill('#score', '7');
  await page.getByTestId('save-score').click();
  await expect(page.locator('#toast')).toContainText('New belt: White');
  await expect(page.getByTestId('best')).toHaveText('7 touches');
  await page.fill('#score', '12');
  await page.getByTestId('save-score').click();
  await expect(page.locator('#toast')).toContainText('New belt: Yellow');
  await page.goto(at(MON, '#/records'));
  await expect(page.getByTestId('rec-juggle')).toContainText('12');
  await expect(page.getByTestId('rec-juggle')).toContainText('Yellow');
});

test('coach mode: countdown, flashes colours full-screen, tap to stop', async ({ page }) => {
  await page.goto(at(MON, '#/drill/d_scan_wall'));
  await page.getByTestId('coach-btn').click();
  const coach = page.locator('#coach');
  await expect(coach).toBeVisible();
  await expect(page.getByTestId('coach-word')).toHaveText('3');
  await expect(coach).toHaveClass(/red|green|blue|yellow/, { timeout: 9000 });
  await expect(page.getByTestId('coach-word')).toHaveText(/RED|GREEN|BLUE|YELLOW/);
  await coach.click();
  await expect(coach).toBeHidden();
});

test('brain: answer 3 pictures from today, then finish marks the drill', async ({ page }) => {
  await page.goto(at(FRI, '#/drill/b_pause_pick'));
  await page.getByTestId('open-brain').click();
  await expect(page.getByTestId('pitch')).toBeVisible();
  for (let i = 0; i < 3; i++) {
    await page.locator('[data-testid=choice][data-correct=true]').click();
    await expect(page.getByTestId('explain')).toContainText('Yes!');
    if (i < 2) await page.getByTestId('brain-next').click();
  }
  await expect(page.getByTestId('brain-score')).toContainText('3/');
  await page.getByTestId('brain-finish').click();
  await expect(page).toHaveURL(/#\/(drill\/|$)/);
  await page.goto(at(FRI));
  await expect(page.locator('[data-drill=b_pause_pick]').locator('..')).toHaveClass(/done/);
});

test('brain: a wrong answer shows the right one and comes back later', async ({ page }) => {
  await page.goto(at(MON, '#/brain'));
  const q1 = await page.getByTestId('question').textContent();
  await page.locator('[data-testid=choice][data-correct=false]').first().click();
  await expect(page.getByTestId('explain')).toContainText('Not quite');
  await expect(page.locator('.choice.right')).toHaveCount(1);
  await expect(page.locator('.choice.wrong')).toHaveCount(1);
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('football-daily:v1')).brain.answered);
  expect(Object.values(stored)).toEqual([false]);
  await page.getByTestId('brain-next').click();
  await expect(page.getByTestId('question')).not.toHaveText(q1);
});

test('dad: change schedule and kit, plan adapts, persists', async ({ page }) => {
  await page.goto(at(TUE, '#/dad'));
  await page.getByTestId('sched-tue').selectOption('home');
  await expect(page.locator('#toast')).toHaveText('Saved');
  await page.getByTestId('eq-wall').uncheck();
  await page.goto(at(TUE));
  await expect(page.getByTestId('plan-item')).toHaveCount(6);
  await expect(page.getByTestId('setup-note')).toHaveCount(0);
  await expect(page.locator('[data-drill=d_scan_wall]')).toHaveCount(0);
  await expect(page.locator('[data-drill=d_scan_toss]')).toHaveCount(1);
});

test('dad: focus override changes the band this week only', async ({ page }) => {
  await page.goto(at(MON, '#/dad'));
  await page.getByTestId('focus-select').selectOption('jockey');
  await page.goto(at(MON));
  await expect(page.getByTestId('focus')).toContainText("Slow him, don't dive");
  await page.goto(at('2026-10-05'));
  await expect(page.getByTestId('focus')).not.toContainText("Slow him");
});

test('dad: load check warns when hours exceed age', async ({ page }) => {
  await page.goto(at(MON, '#/dad'));
  await expect(page.getByTestId('load')).not.toHaveClass(/over/);
  for (const d of ['mon', 'wed', 'fri']) await page.getByTestId(`sched-${d}`).selectOption('team');
  await page.getByTestId('sched-sun').selectOption('game');
  await page.fill('#tm', '120');
  await page.locator('#tm').dispatchEvent('change');
  await expect(page.getByTestId('load')).toHaveClass(/over/);
  await expect(page.getByTestId('load')).toContainText('More hours than his age');
  await expect(page.getByTestId('load')).toContainText('No rest day');
});

test('game day reflection saves and shows on records', async ({ page }) => {
  await page.goto(at(SAT));
  await page.getByTestId('after-btn').click();
  await page.fill('#good', 'Won the ball twice');
  await page.fill('#fix', 'Look before I get it');
  await page.getByText('OK', { exact: true }).click();
  await page.getByTestId('save-reflect').click();
  await expect(page.getByTestId('game-day')).toBeVisible();
  await expect(page.getByTestId('after-btn')).toHaveCount(0);
  await page.goto(at(SAT, '#/records'));
  await expect(page.locator('.reflect-list')).toContainText('Won the ball twice');
  await expect(page.locator('.reflect-list')).toContainText('felt OK');
});

test('library: 17 tiles, 8 TFT; every drill page renders', async ({ page }) => {
  await page.goto(at(MON, '#/drills'));
  await expect(page.getByTestId('tile')).toHaveCount(17);
  await expect(page.locator('.tile:not(.new)')).toHaveCount(8);
  const hrefs = await page.getByTestId('tile').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  const drills = new Set();
  for (const h of hrefs) {
    await page.goto(at(MON, h));
    const ds = await page.getByTestId('area-drill').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
    expect(ds.length).toBeGreaterThan(0);
    ds.forEach((d) => drills.add(d));
  }
  for (const d of drills) {
    await page.goto(at(MON, d));
    await expect(page.getByTestId('drill-name')).toBeVisible();
  }
  expect(drills.size).toBeGreaterThan(40);
});

test('streak survives rest day and game day', async ({ page }) => {
  const complete = { done: [], complete: true };
  await seed(page, '2026-10-05', { v: 1, settings: { focusStart: MON, configured: true }, history: { [MON]: complete, [TUE]: complete, '2026-09-30': complete, '2026-10-01': complete, [FRI]: complete }, records: {}, brain: {}, reflections: [] });
  await page.reload();
  await expect(page.getByTestId('streak')).toContainText('5');
});

test('no horizontal overflow on any main screen', async ({ page }) => {
  for (const h of ['#/', '#/drills', '#/brain', '#/records', '#/dad', '#/drill/fo_check_receive', '#/after']) {
    await page.goto(at(MON, h));
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over, h).toBeLessThanOrEqual(0);
  }
});

test('drill page: YouTube demos show as thumbnails, tap loads the nocookie embed', async ({ page }) => {
  await page.goto(at(MON, '#/drill/m_beat_cone'));
  const vids = page.getByTestId('video');
  await expect(vids).toHaveCount(3);
  await expect(vids.first()).toContainText('Football Australia');
  await expect(page.getByTestId('yt-link').first()).toHaveAttribute('href', /youtube\.com\/watch\?v=SG_Da2nwEhs/);
  await expect(vids.first().locator('img')).toHaveAttribute('src', /i\.ytimg\.com\/vi\/SG_Da2nwEhs\/sddefault\.jpg/);
  await expect(page.locator('iframe')).toHaveCount(0);
  await vids.first().getByRole('button').click();
  const f = page.getByTestId('video-frame');
  await expect(f).toHaveCount(1);
  await expect(f).toHaveAttribute('src', /^https:\/\/www\.youtube-nocookie\.com\/embed\/SG_Da2nwEhs\?/);
  // Playing a second one closes the first.
  await vids.nth(1).getByRole('button').click();
  await expect(page.getByTestId('video-frame')).toHaveCount(1);
  await expect(page.getByTestId('video-frame')).toHaveAttribute('src', /u0rqvGrl1YU/);
  await expect(vids.first().getByRole('button')).toBeVisible();
});

test('today plan marks drills with a video; library tiles count videos', async ({ page }) => {
  await page.goto(at(MON));
  await expect(page.getByTestId('plan-item').first()).toContainText('video');
  await page.goto(at(MON, '#/drills'));
  await expect(page.getByTestId('tile').first()).toContainText(/\d+ videos?/);
});
