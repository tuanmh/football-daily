# Football Daily

A daily 15–20 minute football session for a young player. Open it, press **Start**, and it tells him what to do today, times each drill, flashes scanning cues and keeps his records.

Static site (HTML, CSS, JavaScript modules, no build step), hosted on GitHub Pages. Works offline once installed to the home screen. Progress is saved on the device (localStorage) and can be exported as a backup file.

## What's in it

- **Today**: the plan for today, based on Dad's weekly schedule.
  - **Home day**: Daily 3 (Bounce, Touch, Look) + this week's focus drill + 2 drills from the day's theme (Master, Pass, Brain, Defend, Strike). About 18–22 min.
  - **Team training day**: Daily 3 only (about 8 min).
  - **Day before a game**: Daily 3 + Pause & pick (light).
  - **Game day**: warm-up, then 3 questions after the game.
  - **Rest day**: rest. Rest and game days never break the streak.
- **Drills**: 17 areas. The 8 tft-tube areas (Agility, Control & Pass, Ball Mastery, Drag Back Vs, Footwork, Juggling, Spring Rebounder, Wall Work) link to the videos on [tft-tube.com](https://tft-tube.com/) (free login). 9 more areas for the game around the ball: Look & Decide, Game Brain, Where do I go?, Defending, Second Ball, 1v1 & Running with the ball, Shooting, Weak Foot, Warm-up & Recovery.
- **Coach mode**: full-screen colours, numbers, arrows, or "Our ball / Their ball / Keeper's ball" calls (spoken aloud), for scanning and reaction drills he can do alone.
- **Brain**: Pause & pick. 12 pitch pictures, pick the right move, see why. Wrong answers come back later.
- **Records**: juggling, toe taps, wall passes, weak-foot passes, slalom, shots on target, with belts (White to Black) and trend lines. Game reflections.
- **Dad**: player name, age, position, weekly schedule, kit at home (wall, rebounder, partner), weekly focus override, load check (organised hours vs age, rest days), backup/restore.

Drills that need kit he doesn't have swap automatically to one that doesn't.

## Weekly focus

The focus rotates weekly. The default order for a centre back is Bounce → Look, then touch → Head up → Slow him, don't dive → Level with your partner → Keeper's ball: go wide → Win the second ball. Other positions have their own order. Dad can override any week.

## Guardrails

- No heading practice. England's FA: heading should not be introduced in training at U6–U11 ([FA guidance](https://www.thefa.com/-/media/thefacom-new/files/rules-and-regulations/2023-24/heading-guidance/youth-heading-guidance-chart.ashx)).
- Load check: fewer organised hours per week than his age, with 1–2 days off ([AAP](https://publications.aap.org/pediatrics/article/119/6/1242/70751/)).
- Core skills focus from Football Australia's curriculum: striking, first touch, 1v1, running with the ball ([Football Australia National Curriculum](https://footballaustralia.com.au/sites/ffa/files/2017-09/FFA%20National%20Curriculum_1ma6qrmro1pyq10gzxo5rcn7ld.pdf)).
- Belt targets are starter goals for home practice, not age norms.
- tft-tube videos are linked, not copied.

## Develop

```bash
npm ci
npm run serve            # http://127.0.0.1:4173
npm run test:unit        # node:test, plan logic + data integrity
npx playwright install chrome
npm run test:e2e         # Playwright, phone + desktop
```

Add `?date=YYYY-MM-DD` to the URL to preview any day. Edit drills, focuses, themes and brain pictures in `site/js/data.js`.

## Deploy

Push to `main`. GitHub Actions runs the unit and e2e tests, deploys `site/` to GitHub Pages, then re-runs the e2e suite against the live URL.
