# Football Daily

A daily 15–20 minute football session for a young player. Open it, press **Start**, and it tells him what to do today, times each drill, flashes scanning cues and keeps his records.

Static site (HTML, CSS, JavaScript modules, no build step), hosted on GitHub Pages. Works offline once installed to the home screen. Progress is saved on the device (localStorage) and can be exported as a backup file.

## What's in it

- **Today**: the plan for today, based on Dad's weekly schedule.
  - **Home day**: Daily 3 (Bounce, Touch, Look) + this week's focus drill + 2 drills from the day's theme (Master, Pass, Brain, Defend, Strike). About 18–22 min.
  - **Role day** (the last home day before the game, once a week): Daily 3 + 2 drills for this week's role + 3 role pictures, with the "My job" card. It replaces a theme day, so the week is no longer.
  - **Team training day**: Daily 3 only (about 8 min).
  - **Day before a game**: Daily 3 + this week's role pictures + the "My job" card (light).
  - **Game day**: "Today you play" job card, warm-up, then after the game: what went well, one fix, and "Did you do your job?".
  - **Rest day**: rest. Rest and game days never break the streak.
- **Roles 9v9**: 6 roles for a 3-2-3 (keeper, centre back, wide defender, midfield, winger, striker). Each has a 3-line "My job" card (our ball / their ball / loose ball), 3 drills tagged 🇪🇸/🇯🇵/🇦🇷 with the reason, 5 pitch pictures, a "watch a pro" tip and a badge. All six badges, keeper included, makes an All-rounder. The role of the week rotates through all six; Dad can set "Saturday he plays ___" for any week.
- **Drills**: 18 areas (the 17 below plus Roles 9v9). The 8 tft-tube areas (Agility, Control & Pass, Ball Mastery, Drag Back Vs, Footwork, Juggling, Spring Rebounder, Wall Work) link to the videos on [tft-tube.com](https://tft-tube.com/) (free login). 9 more areas for the game around the ball: Look & Decide, Game Brain, Where do I go?, Defending, Second Ball, 1v1 & Running with the ball, Shooting, Weak Foot, Warm-up & Recovery.
- **Coach mode**: full-screen colours, numbers, arrows, "Our ball / Their ball / Keeper's ball", "Turn / Man on" or "Feet / In behind" calls (spoken aloud), for scanning and reaction drills.
- **Brain**: Pause & pick. 42 pitch pictures (12 general + 30 for the roles, filter by role), pick the right move, see why. Wrong answers come back later. Attacking pictures flip so we always attack up the screen.
- **Records**: juggling, toe taps, wall passes, weak-foot passes, slalom, shots on target, with belts (White to Black) and trend lines. Game reflections.
- **Dad**: player name, age, main position, role of the week, weekly schedule, kit at home (wall, rebounder, partner), weekly focus override, load check (organised hours vs age, rest days), backup/restore.

Drills that need kit he doesn't have swap automatically to one that doesn't.

## Videos

Every drill has 1–3 short YouTube demos under **Watch how** (117 videos). Most are short clips from Japanese and Spanish youth coaching channels, club academies (e.g. Kawasaki Frontale, Real Madrid Foundation), FIFA 11+ Kids and other coaching channels. Longer explainers are tagged **For Dad**.

- Played with `youtube-nocookie.com` embeds. The iframe loads only when he taps play, so nothing from YouTube loads until then. Nothing is downloaded or re-hosted, and each card credits the channel and links to YouTube.
- The list is in `site/js/videos.js` (drill id → videos). Swap or add an id there.
- `npm run check:videos` checks every id is still public and embeddable. A weekly GitHub Action runs the same check and fails (emailing the owner) if a video is removed or has embedding turned off.

## Weekly focus

The focus rotates weekly and the role of the week rotates separately. The default focus order for a centre back is Bounce → Look, then touch → Head up → Slow him, don't dive → Level with your partner → Keeper's ball: go wide → Win the second ball. Other positions have their own order. Dad can override any week.

## Guardrails

- No heading practice anywhere in the app, including the role drills (crosses stay low). Safety reference: England's FA says heading should not be introduced in training at U6–U11 ([FA guidance](https://www.thefa.com/-/media/thefacom-new/files/rules-and-regulations/2023-24/heading-guidance/youth-heading-guidance-chart.ashx)).
- Keeper dives only on grass or a soft surface.
- Load check: fewer organised hours per week than his age, with 1–2 days off ([AAP](https://publications.aap.org/pediatrics/article/119/6/1242/70751/)).
- Roles follow Spanish, Japanese and Argentine academy guidance: don't fix positions at this age, every child plays every role including keeper (Japan FA; Spanish benjamín model), carrying the ball and 1v1 come first at U-10 (Kawasaki Frontale; Argentine baby fútbol), technique stays the base. Sources are listed on the Roles page in the app and in `site/js/roles.js`.
- Belt targets are starter goals for home practice, not age norms.
- tft-tube videos are linked, not copied. YouTube videos are embedded from their channels, not copied.

## Develop

```bash
npm ci
npm run serve            # http://127.0.0.1:4173
npm run test:unit        # node:test, plan logic + data integrity
npx playwright install chrome
npm run test:e2e         # Playwright, phone + desktop
npm run check:videos     # every YouTube id still public + embeddable
```

Add `?date=YYYY-MM-DD` to the URL to preview any day. Edit drills, focuses, themes and brain pictures in `site/js/data.js`; roles, role drills, role pictures and their sources in `site/js/roles.js`.

## Deploy

Push to `main`. GitHub Actions runs the unit and e2e tests, deploys `site/` to GitHub Pages, then re-runs the e2e suite against the live URL.
