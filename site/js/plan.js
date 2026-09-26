// Pure planning logic for Football Daily. No DOM, no storage: easy to unit test.
import { DAILY3, DAY_KEYS, DRILLS, FOCUSES, FOCUS_BY_POS, JS_DAYS, SCENARIOS, TESTS, THEMES, BRAIN_BELT_STEPS } from './data.js';

export const EPOCH = '2026-01-05'; // a Monday; fixed anchor for rotations

export const DEFAULT_SETTINGS = {
  playerName: 'Player',
  age: 9,
  position: 'cb', // cb | wing | mid | fwd
  schedule: { mon: 'home', tue: 'team', wed: 'home', thu: 'team', fri: 'home', sat: 'game', sun: 'rest' },
  equipment: { wall: true, rebounder: false, partner: true },
  teamMins: 75,
  gameMins: 60,
  focusQueue: null, // null = default queue for the position
  focusStart: null, // Monday the focus queue started; set on first run
  focusOverride: {}, // { 'YYYY-MM-DD' (Monday): focusId }
  speech: true,
};

// ---------- dates (all 'YYYY-MM-DD' strings, calendar maths in UTC) ----------
export function toKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function utc(key) { return new Date(`${key}T00:00:00Z`); }
export function addDays(key, n) {
  const d = utc(key);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
export function daysBetween(a, b) { return Math.round((utc(b) - utc(a)) / 86400000); }
export function dayKeyOf(key) { return JS_DAYS[utc(key).getUTCDay()]; }
export function weekStart(key) { return addDays(key, -DAY_KEYS.indexOf(dayKeyOf(key))); }
export function weekDates(key) { const s = weekStart(key); return DAY_KEYS.map((_, i) => addDays(s, i)); }

// ---------- settings / equipment ----------
export function mergeSettings(s = {}) {
  return {
    ...DEFAULT_SETTINGS,
    ...s,
    schedule: { ...DEFAULT_SETTINGS.schedule, ...(s.schedule || {}) },
    equipment: { ...DEFAULT_SETTINGS.equipment, ...(s.equipment || {}) },
    focusOverride: { ...(s.focusOverride || {}) },
  };
}

export function focusQueueFor(settings) {
  const q = settings.focusQueue && settings.focusQueue.length ? settings.focusQueue : FOCUS_BY_POS[settings.position] || FOCUS_BY_POS.cb;
  const valid = q.filter((f) => FOCUSES[f]);
  return valid.length ? valid : FOCUS_BY_POS.cb;
}

export function canDo(drillId, equipment) {
  const d = DRILLS[drillId];
  if (!d) return false;
  return (d.needs || []).every((n) => equipment[n]);
}

// Walk the alt chain until a drill the player can do with his equipment.
export function resolveDrill(drillId, equipment, seen = new Set()) {
  if (!DRILLS[drillId] || seen.has(drillId)) return null;
  seen.add(drillId);
  if (canDo(drillId, equipment)) return drillId;
  for (const alt of DRILLS[drillId].alt || []) {
    const r = resolveDrill(alt, equipment, seen);
    if (r) return r;
  }
  return null;
}

// ---------- day types ----------
// full: Daily 3 + focus + 2 theme drills. team: Daily 3 only. light: day before a game.
export function dayType(key, settings) {
  const s = settings.schedule[dayKeyOf(key)] || 'home';
  if (s === 'game' || s === 'rest' || s === 'team') return s;
  const tomorrow = settings.schedule[dayKeyOf(addDays(key, 1))];
  return tomorrow === 'game' ? 'light' : 'full';
}

export function focusFor(key, settings) {
  const ws = weekStart(key);
  const o = settings.focusOverride[ws];
  if (o && FOCUSES[o]) return o;
  const q = focusQueueFor(settings);
  const start = settings.focusStart ? weekStart(settings.focusStart) : weekStart(EPOCH);
  const w = Math.floor(daysBetween(start, ws) / 7);
  return q[((w % q.length) + q.length) % q.length];
}

// Themes rotate across full days only, so every theme comes round even when
// team training eats some days. Returns { theme, occurrence } where occurrence
// counts how many times this theme has come round (used to rotate its drills).
export function themeSlot(key, settings) {
  if (dayType(key, settings) !== 'full') return null;
  const perWeek = DAY_KEYS.filter((_, i) => dayType(addDays(weekStart(EPOCH), i), settings) === 'full').length || 1;
  const w = Math.floor(daysBetween(weekStart(EPOCH), weekStart(key)) / 7);
  const i = weekDates(key).filter((d) => dayType(d, settings) === 'full').indexOf(key);
  const slot = w * perWeek + i;
  const L = THEMES.length;
  return { theme: THEMES[((slot % L) + L) % L], occurrence: Math.floor(slot / L) };
}
export function themeFor(key, settings) {
  const t = themeSlot(key, settings);
  return t ? t.theme : null;
}

// ---------- session builder ----------
export function buildSession(key, rawSettings) {
  const settings = mergeSettings(rawSettings);
  const eq = settings.equipment;
  const type = dayType(key, settings);
  const focusId = focusFor(key, settings);
  const n = daysBetween(EPOCH, key);
  const blocks = [];
  const push = (slot, id) => {
    const r = resolveDrill(id, eq);
    if (r && !blocks.some((b) => b.drill === r)) blocks.push({ slot, drill: r });
  };
  const daily3 = () => {
    push('Bounce', DAILY3.bounce[((n % DAILY3.bounce.length) + DAILY3.bounce.length) % DAILY3.bounce.length]);
    push('Touch', ((n % 3) + 3) % 3 === 2 ? DAILY3.touchAlt : DAILY3.touch);
    push('Look', DAILY3.look);
  };

  let theme = null;
  if (type === 'game') {
    push('Warm-up', 'w_warmup');
  } else if (type === 'team') {
    daily3();
  } else if (type === 'light') {
    daily3();
    push('Brain', 'b_pause_pick');
  } else if (type === 'full') {
    daily3();
    push('Focus', FOCUSES[focusId].drill);
    const slot = themeSlot(key, settings);
    theme = slot.theme;
    const pool = theme.pool;
    const start = (((slot.occurrence * 2) % pool.length) + pool.length) % pool.length;
    let added = 0;
    for (let k = 0; k < pool.length && added < 2; k++) {
      const before = blocks.length;
      push(theme.name, pool[(start + k) % pool.length]);
      if (blocks.length > before) added++;
    }
  }
  const minutes = blocks.reduce((m, b) => m + DRILLS[b.drill].mins, 0);
  return { date: key, type, focus: focusId, theme: theme ? theme.id : null, blocks, minutes };
}

// ---------- progress ----------
// history: { key: { done: [drillId], complete: bool } }
export function isComplete(session, dayLog) {
  if (!dayLog) return false;
  if (session.blocks.length === 0) return false;
  return session.blocks.every((b) => dayLog.done.includes(b.drill));
}

// Rest and game days never break the streak. Today gets grace until it's done.
export function streak(todayKey, history, rawSettings) {
  const settings = mergeSettings(rawSettings);
  let count = 0;
  for (let i = 0; i < 400; i++) {
    const key = addDays(todayKey, -i);
    const log = history[key];
    const t = dayType(key, settings);
    if (log && log.complete) { count++; continue; }
    if (t === 'rest' || t === 'game') continue;
    if (i === 0) continue;
    break;
  }
  return count;
}

// records: { testId: [{ date, value }] }
export function best(testId, records) {
  const list = (records && records[testId]) || [];
  if (!list.length) return null;
  const t = TESTS[testId];
  return list.reduce((b, r) => (t.dir === 'down' ? Math.min(b, r.value) : Math.max(b, r.value)), t.dir === 'down' ? Infinity : -Infinity);
}

// Index into BELTS (0 = white). -1 = not started.
export function beltIndex(testId, value) {
  if (value === null || value === undefined) return -1;
  const t = TESTS[testId];
  let idx = -1;
  t.steps.forEach((s, i) => { if (t.dir === 'down' ? value <= s : value >= s) idx = i; });
  return idx;
}

export function nextTarget(testId, value) {
  const t = TESTS[testId];
  const i = beltIndex(testId, value);
  return i + 1 < t.steps.length ? t.steps[i + 1] : null;
}

// Is this value a new personal best vs the existing records?
export function isPB(testId, value, records) {
  const b = best(testId, records);
  if (b === null) return true;
  return TESTS[testId].dir === 'down' ? value < b : value > b;
}

export function brainScore(brain) {
  const a = (brain && brain.answered) || {};
  return SCENARIOS.filter((s) => a[s.id] === true).length;
}
export function brainBelt(brain) {
  const score = brainScore(brain);
  let idx = -1;
  BRAIN_BELT_STEPS.forEach((s, i) => { if (score >= s) idx = i; });
  return idx;
}

// Pick the next brain scenario: unseen first, then ones got wrong, then oldest.
export function nextScenario(brain, skipId = null) {
  const a = (brain && brain.answered) || {};
  const seenAt = (brain && brain.seenAt) || {};
  const pool = SCENARIOS.filter((s) => s.id !== skipId);
  const unseen = pool.filter((s) => !(s.id in a));
  if (unseen.length) return unseen[0];
  const wrong = pool.filter((s) => a[s.id] === false);
  if (wrong.length) return wrong[0];
  return [...pool].sort((x, y) => (seenAt[x.id] || 0) - (seenAt[y.id] || 0))[0];
}

// ---------- load guard ----------
// A common guide for young athletes is organised hours per week no more than
// their age in years, with 1-2 days off.
export function weeklyLoad(key, history, rawSettings) {
  const settings = mergeSettings(rawSettings);
  let appMins = 0, teamMins = 0, gameMins = 0, offDays = 0;
  for (const d of weekDates(key)) {
    const s = settings.schedule[dayKeyOf(d)];
    if (s === 'team') teamMins += settings.teamMins;
    if (s === 'game') gameMins += settings.gameMins;
    if (s === 'rest') offDays++;
    const log = history[d];
    if (log) appMins += log.done.reduce((m, id) => m + (DRILLS[id] ? DRILLS[id].mins : 0), 0);
  }
  const plannedApp = weekDates(key).reduce((m, d) => m + buildSession(d, settings).minutes, 0);
  const hours = (teamMins + gameMins + Math.max(appMins, plannedApp)) / 60;
  return {
    appMins, plannedApp, teamMins, gameMins, offDays,
    hours: Math.round(hours * 10) / 10,
    cap: settings.age,
    over: hours > settings.age,
    tooFewRest: offDays < 1,
  };
}

// ---------- week view ----------
export function weekPlan(key, rawSettings) {
  const settings = mergeSettings(rawSettings);
  return weekDates(key).map((d) => buildSession(d, settings));
}
