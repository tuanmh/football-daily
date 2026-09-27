import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as P from '../../site/js/plan.js';
import * as D from '../../site/js/data.js';
import * as S from '../../site/js/storage.js';

const WEEK = ['2026-09-28', '2026-09-29', '2026-09-30', '2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04']; // Mon..Sun
const base = () => P.mergeSettings({});

test('date helpers', () => {
  assert.equal(P.dayKeyOf('2026-09-28'), 'mon');
  assert.equal(P.dayKeyOf('2026-10-04'), 'sun');
  assert.equal(P.weekStart('2026-10-04'), '2026-09-28');
  assert.equal(P.weekStart('2026-09-28'), '2026-09-28');
  assert.equal(P.addDays('2026-12-31', 1), '2027-01-01');
  assert.equal(P.daysBetween('2026-01-05', '2026-01-12'), 7);
  assert.equal(P.dayKeyOf(P.EPOCH), 'mon');
  assert.deepEqual(P.weekDates('2026-10-01'), WEEK);
});

test('data integrity: every referenced drill exists', () => {
  const ids = new Set(Object.keys(D.DRILLS));
  const areas = new Set(D.AREAS.map((a) => a.id));
  for (const [id, d] of Object.entries(D.DRILLS)) {
    assert.ok(areas.has(d.area), `${id} area ${d.area}`);
    assert.ok(d.steps.length >= 2, `${id} steps`);
    assert.ok(d.mins > 0 && d.mins <= 6, `${id} mins`);
    for (const a of d.alt || []) assert.ok(ids.has(a), `${id} alt ${a}`);
    if (d.test) assert.ok(D.TESTS[d.test], `${id} test ${d.test}`);
    if (d.cues) assert.ok(['colours', 'numbers', 'arrows', 'calls', 'turn', 'runs'].includes(d.cues), `${id} cues`);
  }
  for (const id of [...D.DAILY3.bounce, D.DAILY3.touch, D.DAILY3.touchAlt, D.DAILY3.look]) assert.ok(ids.has(id), id);
  for (const t of D.THEMES) for (const id of t.pool) assert.ok(ids.has(id), `${t.id} ${id}`);
  for (const [k, f] of Object.entries(D.FOCUSES)) assert.ok(ids.has(f.drill), `focus ${k}`);
  for (const q of Object.values(D.FOCUS_BY_POS)) for (const f of q) assert.ok(D.FOCUSES[f], f);
  assert.equal(D.AREAS.length, 18);
  assert.equal(D.AREAS.filter((a) => a.tft).length, 8);
  for (const a of D.AREAS) assert.ok(Object.values(D.DRILLS).some((d) => d.area === a.id), `area ${a.id} has a drill`);
});

test('no heading drills anywhere (no heading practice at U10)', () => {
  const txt = (JSON.stringify(D.DRILLS) + JSON.stringify(D.SCENARIOS)).toLowerCase();
  assert.ok(!/\bheader|\bheading\b|\bhead the ball/.test(txt));
});

test('every drill can be done with no kit at all (alt chains terminate)', () => {
  const none = { wall: false, rebounder: false, partner: false };
  for (const id of Object.keys(D.DRILLS)) {
    const d = D.DRILLS[id];
    if (!d.needs) assert.equal(P.resolveDrill(id, none), id);
  }
  for (const k of WEEK) {
    const s = P.buildSession(k, { equipment: none });
    for (const b of s.blocks) assert.ok(P.canDo(b.drill, none), `${k} ${b.drill}`);
  }
});

test('scenarios are well formed', () => {
  const ids = new Set();
  for (const s of D.SCENARIOS) {
    assert.ok(!ids.has(s.id)); ids.add(s.id);
    assert.equal(s.choices.length, 3, s.id);
    assert.ok(s.answer >= 0 && s.answer < s.choices.length, s.id);
    for (const p of [s.you, s.gk, s.ball, ...s.mates, ...s.opps]) {
      assert.ok(p[0] >= 0 && p[0] <= 100 && p[1] >= 40 && p[1] <= 132, `${s.id} point ${p}`);
    }
    if (s.move) assert.ok([String(s.you), String(s.ball)].includes(String(s.move.slice(0, 2))), `${s.id} move starts at you or the ball`);
  }
  assert.ok(D.SCENARIOS.length >= D.BRAIN_BELT_STEPS.at(-1));
});

test('day types follow the schedule', () => {
  const st = base(); // mon home, tue team, wed home, thu team, fri home(before sat game) , sat game, sun rest
  const types = WEEK.map((k) => P.dayType(k, st));
  assert.deepEqual(types, ['full', 'team', 'full', 'team', 'light', 'game', 'rest']);
});

test('role day = Daily 3 + 2 role drills + role pictures, and it is the last full day', () => {
  const st = P.mergeSettings({ focusStart: '2026-09-28' });
  assert.equal(P.roleDayOf('2026-09-28', st), '2026-09-30');
  const s = P.buildSession('2026-09-30', st);
  assert.equal(s.roleDay, true);
  assert.equal(s.theme, null);
  assert.deepEqual(s.blocks.map((b) => b.slot), ['Bounce', 'Touch', 'Look', 'Role', 'Role', 'Brain']);
  assert.equal(s.blocks.at(-1).drill, 'b_role_pick');
  for (const b of s.blocks.filter((x) => x.slot === 'Role')) assert.ok(D.ROLES[s.role].drills.includes(b.drill) || !P.canDo(D.ROLES[s.role].drills[0], st.equipment), b.drill);
  assert.ok(s.minutes >= 15 && s.minutes <= 25, `minutes ${s.minutes}`);
  const mon = P.buildSession('2026-09-28', st);
  assert.equal(mon.roleDay, false);
  assert.ok(mon.theme);
});

test('role of the week rotates through all six, keeper included; Dad can set it for one week', () => {
  const st = P.mergeSettings({ focusStart: '2026-09-28' });
  const seen = [];
  for (let w = 0; w < 6; w++) seen.push(P.roleFor(P.addDays('2026-09-28', w * 7), st));
  assert.deepEqual([...seen].sort(), [...D.ROLE_SEQ].sort());
  assert.ok(seen.includes('gk'));
  assert.equal(P.roleFor(P.addDays('2026-09-28', 42), st), seen[0], 'wraps');
  const ov = P.mergeSettings({ focusStart: '2026-09-28', roleOverride: { '2026-09-28': 'st' } });
  assert.equal(P.roleFor('2026-10-03', ov), 'st');
  assert.equal(P.buildSession('2026-09-30', ov).blocks.filter((b) => b.slot === 'Role').every((b) => D.DRILLS[b.drill].role === 'st' || !D.DRILLS[b.drill].role), true);
  assert.equal(P.roleFor('2026-10-05', ov), seen[1], 'override is one week only');
});

test('role drills rotate in pairs so all 3 of a role come round', () => {
  const st = P.mergeSettings({ focusStart: '2026-09-28', roleOverride: {} });
  const got = new Set();
  for (let w = 0; w < 3; w++) {
    const k = P.addDays('2026-09-30', w * 7);
    const s2 = { ...st, roleOverride: { [P.weekStart(k)]: 'cm' } };
    P.roleDrillsFor(k, s2).forEach((d) => got.add(d));
  }
  assert.deepEqual([...got].sort(), [...D.ROLES.cm.drills].sort());
});

test('themes still rotate with a role day; one home day = role day every other week', () => {
  const st = P.mergeSettings({ schedule: { mon: 'home', tue: 'home', wed: 'home', thu: 'team', fri: 'home', sat: 'game', sun: 'rest' } });
  const seen = new Set();
  for (let i = 0; i < 35; i++) { const t = P.themeFor(P.addDays('2026-09-28', i), st); if (t) seen.add(t.id); }
  assert.equal(seen.size, 5);
  const one = P.mergeSettings({ schedule: { mon: 'team', tue: 'team', wed: 'home', thu: 'team', fri: 'home', sat: 'game', sun: 'rest' } });
  const roleWeeks = [0, 1, 2, 3].map((w) => P.roleDayOf(P.addDays('2026-09-28', w * 7), one) !== null);
  assert.deepEqual(roleWeeks.filter(Boolean).length, 2);
  const themes = new Set();
  for (let i = 0; i < 70; i++) { const t = P.themeFor(P.addDays('2026-09-28', i), one); if (t) themes.add(t.id); }
  assert.equal(themes.size, 5, 'all themes still come round with one home day');
});

test('light day before a game uses this week\'s role pictures', () => {
  const s = P.buildSession('2026-10-02', base());
  assert.equal(s.type, 'light');
  assert.equal(s.blocks.at(-1).drill, 'b_role_pick');
});

test('roles: every role has a 3-line job, 3 drills, 5+ pictures and a source-backed drill', () => {
  assert.deepEqual([...D.ROLE_SEQ].sort(), ['cb', 'cm', 'gk', 'st', 'wd', 'wing']);
  for (const r of D.ROLE_SEQ) {
    const role = D.ROLES[r];
    assert.ok(role.job.our && role.job.their && role.job.loose, `${r} job`);
    for (const line of Object.values(role.job)) assert.ok(line.length <= 60, `${r} job line short`);
    assert.equal(role.drills.length, 3, `${r} drills`);
    for (const id of role.drills) { assert.ok(D.DRILLS[id], id); assert.equal(D.DRILLS[id].role, r, `${id} role`); }
    assert.ok(P.scenariosFor(r).length >= 5, `${r} pictures`);
    assert.ok(role.drills.some((id) => D.DRILLS[id].ref), `${r} has a Spain/Japan/Argentina drill`);
  }
  for (const d of Object.values(D.DRILLS)) if (d.ref) { assert.ok(D.REFS[d.ref], d.name); assert.ok(d.why, `${d.name} why`); }
  const refs = new Set(Object.values(D.DRILLS).map((d) => d.ref).filter(Boolean));
  assert.deepEqual([...refs].sort(), ['ar', 'es', 'jp']);
  for (const x of D.ROLE_SOURCES) { assert.ok(D.REFS[x.ref]); assert.match(x.url, /^https:\/\//); assert.doesNotMatch(x.url, /footballaustralia/); }
  assert.equal(D.SHAPE_323.length, 9, '9v9 = keeper + 8');
  assert.ok(D.SCENARIOS.every((s) => s.role === null || D.ROLES[s.role]));
});

test('role badges need completed role days and right pictures; all six = All-rounder', () => {
  const none = P.roleProgress({}, { answered: {} });
  assert.equal(none.cb.badge, false);
  assert.equal(none.allRounder, false);
  const history = {}; const answered = {};
  let n = 0;
  for (const r of D.ROLE_SEQ) {
    for (let i = 0; i < P.BADGE_DAYS; i++) history[P.addDays('2026-09-28', n++)] = { done: [], complete: true, role: r };
    for (const sc of P.scenariosFor(r).slice(0, P.BADGE_PICS)) answered[sc.id] = true;
  }
  history['2026-12-01'] = { done: [], complete: false, role: 'cb' };
  const all = P.roleProgress(history, { answered });
  for (const r of D.ROLE_SEQ) assert.equal(all[r].badge, true, r);
  assert.equal(all.allRounder, true);
  assert.equal(all.cb.days, P.BADGE_DAYS, 'incomplete days do not count');
});

test('old saved positions (mid, fwd) map to the 9v9 roles', () => {
  assert.equal(P.mergeSettings({ position: 'mid' }).position, 'cm');
  assert.equal(P.mergeSettings({ position: 'fwd' }).position, 'st');
  for (const p of D.POSITIONS) assert.ok(D.FOCUS_BY_POS[p.id], p.id);
});

test('full day = Daily 3 + focus + 2 theme drills, 15-25 min', () => {
  const s = P.buildSession('2026-09-28', base());
  assert.equal(s.type, 'full');
  assert.deepEqual(s.blocks.slice(0, 3).map((b) => b.slot), ['Bounce', 'Touch', 'Look']);
  assert.equal(s.blocks[3].slot, 'Focus');
  assert.equal(s.blocks.length, 6);
  assert.ok(s.minutes >= 15 && s.minutes <= 25, `minutes ${s.minutes}`);
  assert.equal(new Set(s.blocks.map((b) => b.drill)).size, s.blocks.length, 'no duplicates');
});

test('team day = Daily 3 only; light day adds brain; game = warm-up; rest = nothing', () => {
  const st = base();
  const team = P.buildSession('2026-09-29', st);
  assert.deepEqual(team.blocks.map((b) => b.slot), ['Bounce', 'Touch', 'Look']);
  assert.ok(team.minutes <= 10);
  const light = P.buildSession('2026-10-02', st);
  assert.equal(light.type, 'light');
  assert.ok(light.blocks.some((b) => b.drill === 'b_role_pick'));
  const game = P.buildSession('2026-10-03', st);
  assert.deepEqual(game.blocks.map((b) => b.drill), ['w_warmup']);
  const rest = P.buildSession('2026-10-04', st);
  assert.equal(rest.blocks.length, 0);
  assert.equal(rest.minutes, 0);
});

test('look slot swaps to a no-wall drill when there is no wall', () => {
  const s1 = P.buildSession('2026-09-29', { equipment: { wall: true, rebounder: false, partner: false } });
  assert.equal(s1.blocks[2].drill, 'd_scan_wall');
  const s2 = P.buildSession('2026-09-29', { equipment: { wall: false, rebounder: true, partner: false } });
  assert.equal(s2.blocks[2].drill, 'd_scan_reb');
  const s3 = P.buildSession('2026-09-29', { equipment: { wall: false, rebounder: false, partner: false } });
  assert.equal(s3.blocks[2].drill, 'd_scan_toss');
});

test('themes rotate so all 5 appear within 6 weeks on the default schedule (1 theme day + 1 role day a week)', () => {
  const st = base();
  const seen = new Set();
  for (let i = 0; i < 42; i++) {
    const t = P.themeFor(P.addDays('2026-09-28', i), st);
    if (t) seen.add(t.id);
  }
  assert.equal(seen.size, 5);
});

test('theme drills rotate between occurrences of the same theme', () => {
  const st = P.mergeSettings({ schedule: { mon: 'home', tue: 'home', wed: 'home', thu: 'home', fri: 'home', sat: 'rest', sun: 'rest' } });
  const byTheme = {};
  for (let i = 0; i < 70; i++) {
    const k = P.addDays('2026-09-28', i);
    const s = P.buildSession(k, st);
    if (s.type !== 'full') continue;
    const set = s.blocks.filter((b) => !['Bounce', 'Touch', 'Look', 'Focus'].includes(b.slot)).map((b) => b.drill).join(',');
    (byTheme[s.theme] = byTheme[s.theme] || new Set()).add(set);
  }
  assert.ok(byTheme.master.size >= 2, 'master rotates');
});

test('focus: position queue, weekly rotation and override', () => {
  const start = '2026-09-28';
  const cb = P.mergeSettings({ focusStart: start, position: 'cb' });
  assert.equal(P.focusFor(start, cb), 'bounce');
  assert.equal(P.focusFor('2026-10-04', cb), 'bounce');
  assert.equal(P.focusFor('2026-10-05', cb), 'look');
  assert.equal(P.focusFor('2026-10-12', cb), 'headup');
  assert.equal(P.focusFor(P.addDays(start, 7 * D.FOCUS_SEQ.length), cb), 'bounce', 'wraps');
  const wing = P.mergeSettings({ focusStart: start, position: 'wing' });
  assert.deepEqual(P.focusQueueFor(P.mergeSettings({ position: 'gk' })), D.FOCUS_BY_POS.gk);
  assert.equal(P.focusFor(P.addDays(start, 21), wing), 'wide');
  const ov = P.mergeSettings({ focusStart: start, focusOverride: { '2026-09-28': 'jockey' } });
  assert.equal(P.focusFor('2026-10-01', ov), 'jockey');
  assert.equal(P.focusFor('2026-10-05', ov), 'look', 'override is one week only');
  const s = P.buildSession('2026-09-28', cb);
  assert.equal(s.blocks.find((b) => b.slot === 'Focus').drill, 'fo_statue');
});

test('focus drill without a partner falls back', () => {
  const st = P.mergeSettings({ focusStart: '2026-09-28', focusOverride: { '2026-09-28': 'jockey' }, equipment: { wall: true, partner: false } });
  const s = P.buildSession('2026-09-28', st);
  assert.equal(s.blocks.find((b) => b.slot === 'Focus').drill, 'f_shadow_jockey');
});

test('streak: counts complete days, rest/game days do not break it, today has grace', () => {
  const st = base();
  const h = {
    '2026-09-28': { done: [], complete: true }, // mon
    '2026-09-29': { done: [], complete: true }, // tue
    '2026-09-30': { done: [], complete: true }, // wed
    '2026-10-01': { done: [], complete: true }, // thu
    '2026-10-02': { done: [], complete: true }, // fri
    // sat game (not logged), sun rest
  };
  assert.equal(P.streak('2026-10-04', h, st), 5, 'sunday rest');
  assert.equal(P.streak('2026-10-05', h, st), 5, 'monday not done yet: grace');
  h['2026-10-05'] = { done: [], complete: true };
  assert.equal(P.streak('2026-10-05', h, st), 6);
  assert.equal(P.streak('2026-10-07', h, st), 0, 'missed tuesday breaks it');
  assert.equal(P.streak('2026-10-01', {}, st), 0);
});

test('isComplete needs every block done', () => {
  const s = P.buildSession('2026-09-29', base());
  assert.equal(P.isComplete(s, { done: s.blocks.slice(0, 2).map((b) => b.drill) }), false);
  assert.equal(P.isComplete(s, { done: s.blocks.map((b) => b.drill) }), true);
  assert.equal(P.isComplete(P.buildSession('2026-10-04', base()), { done: [] }), false);
});

test('records: best, belts, next target, PB for up and down tests', () => {
  const r = { juggle: [{ value: 4 }, { value: 12 }, { value: 9 }], slalom: [{ value: 24.2 }, { value: 20.5 }] };
  assert.equal(P.best('juggle', r), 12);
  assert.equal(P.best('slalom', r), 20.5);
  assert.equal(P.best('toetaps', r), null);
  assert.equal(P.beltIndex('juggle', null), -1);
  assert.equal(P.beltIndex('juggle', 4), -1);
  assert.equal(P.beltIndex('juggle', 5), 0);
  assert.equal(P.beltIndex('juggle', 12), 1);
  assert.equal(P.beltIndex('juggle', 100), 6);
  assert.equal(P.nextTarget('juggle', 12), 20);
  assert.equal(P.nextTarget('juggle', 100), null);
  assert.equal(P.nextTarget('juggle', null), 5);
  assert.equal(P.beltIndex('slalom', 27), -1);
  assert.equal(P.beltIndex('slalom', 20.5), 2);
  assert.equal(P.nextTarget('slalom', 20.5), 19);
  assert.equal(P.isPB('juggle', 13, r), true);
  assert.equal(P.isPB('juggle', 12, r), false);
  assert.equal(P.isPB('slalom', 20.4, r), true);
  assert.equal(P.isPB('slalom', 21, r), false);
  assert.equal(P.isPB('shots', 1, r), true);
  for (const t of Object.values(D.TESTS)) {
    assert.equal(t.steps.length, D.BELTS.length, t.id);
    for (let i = 1; i < t.steps.length; i++) assert.ok(t.dir === 'down' ? t.steps[i] < t.steps[i - 1] : t.steps[i] > t.steps[i - 1], `${t.id} monotonic`);
  }
});

test('brain: score, belt, next scenario order', () => {
  assert.equal(P.brainScore({ answered: {} }), 0);
  assert.equal(P.brainBelt({ answered: {} }), -1);
  const first = P.nextScenario({ answered: {}, seenAt: {} });
  assert.equal(first.id, D.SCENARIOS[0].id);
  const gk = P.nextScenario({ answered: {}, seenAt: {} }, null, 'gk');
  assert.equal(gk.role, 'gk', 'role filter');
  assert.equal(P.brainScore({ answered: { [gk.id]: true } }, 'gk'), 1);
  assert.equal(P.brainScore({ answered: { [gk.id]: true } }, 'cb'), 0);
  const b = { answered: { [D.SCENARIOS[0].id]: true }, seenAt: {} };
  assert.equal(P.brainScore(b), 1);
  assert.equal(P.brainBelt(b), 0);
  assert.equal(P.nextScenario(b).id, D.SCENARIOS[1].id, 'unseen next');
  const all = { answered: Object.fromEntries(D.SCENARIOS.map((s) => [s.id, true])), seenAt: {} };
  all.answered[D.SCENARIOS[4].id] = false;
  assert.equal(P.nextScenario(all).id, D.SCENARIOS[4].id, 'wrong ones come back');
  assert.notEqual(P.nextScenario(all, D.SCENARIOS[4].id).id, D.SCENARIOS[4].id, 'skip current');
  all.answered[D.SCENARIOS[4].id] = true;
  assert.equal(P.brainScore(all), D.SCENARIOS.length);
  assert.equal(P.brainBelt(all), 6);
});

test('weekly load: default week is under the age cap with a rest day', () => {
  const L = P.weeklyLoad('2026-09-30', {}, base());
  assert.equal(L.teamMins, 150);
  assert.equal(L.gameMins, 60);
  assert.equal(L.offDays, 1);
  assert.ok(L.hours < 9, `hours ${L.hours}`);
  assert.equal(L.over, false);
  assert.equal(L.tooFewRest, false);
  const heavy = P.mergeSettings({ age: 9, teamMins: 120, schedule: { mon: 'team', tue: 'team', wed: 'team', thu: 'team', fri: 'team', sat: 'game', sun: 'game' } });
  const H = P.weeklyLoad('2026-09-30', {}, heavy);
  assert.equal(H.over, true);
  assert.equal(H.tooFewRest, true);
});

test('storage: round trip and corrupt data', () => {
  const mem = new Map();
  const fake = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, v), removeItem: (k) => mem.delete(k) };
  const st = S.load(fake);
  assert.equal(st.settings.age, 9);
  st.records.juggle = [{ date: '2026-09-28', value: 7 }];
  st.settings.equipment.wall = false;
  S.save(st, fake);
  const back = S.load(fake);
  assert.equal(back.records.juggle[0].value, 7);
  assert.equal(back.settings.equipment.wall, false);
  assert.equal(back.settings.equipment.partner, true, 'defaults merged');
  mem.set(S.STORAGE_KEY, '{not json');
  assert.equal(S.load(fake).settings.age, 9);
  S.clear(fake);
  assert.equal(mem.size, 0);
});

test('videos: every drill has at least one kid-level YouTube demo, ids valid, keys match drills', async () => {
  const { VIDEOS } = await import('../../site/js/videos.js');
  for (const k of Object.keys(VIDEOS)) assert.ok(D.DRILLS[k], `videos key ${k} is a drill`);
  for (const [id, d] of Object.entries(D.DRILLS)) {
    if (D.DRILLS[id].link) continue; // in-app picture game, no video
    const list = VIDEOS[id] || [];
    assert.ok(list.some((v) => !v.dad), `${id} has a kid-level video`);
  }
  for (const list of Object.values(VIDEOS)) {
    const ids = list.map((v) => v.id);
    assert.equal(new Set(ids).size, ids.length, 'no duplicate video in one drill');
    for (const v of list) {
      assert.match(v.id, /^[A-Za-z0-9_-]{11}$/);
      assert.ok(v.t && v.t.length <= 60, `label ok for ${v.id}`);
      assert.ok(v.ch, `channel credit for ${v.id}`);
      assert.ok(Number.isInteger(v.s) && v.s > 0 && v.s < 1800, `length ok for ${v.id}`);
    }
  }
});

test('videos: th flag is only ever hq', async () => {
  const { VIDEOS } = await import('../../site/js/videos.js');
  for (const v of Object.values(VIDEOS).flat()) if ('th' in v) assert.equal(v.th, 'hq');
});
