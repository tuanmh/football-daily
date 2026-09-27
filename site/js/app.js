// Football Daily: UI. Hash router, views, timer, coach mode, brain game.
import * as D from './data.js';
import * as P from './plan.js';
import * as S from './storage.js';
import { VIDEOS } from './videos.js';

const app = document.getElementById('app');
const coachEl = document.getElementById('coach');
const toastEl = document.getElementById('toast');
const params = new URLSearchParams(location.search);
const FORCED_DATE = /^\d{4}-\d{2}-\d{2}$/.test(params.get('date') || '') ? params.get('date') : null;
const todayKey = () => FORCED_DATE || P.toKey(new Date());

let state = S.load();
if (!state.settings.focusStart) { state.settings.focusStart = P.weekStart(todayKey()); persist(); }

function persist() { S.save(state); }

// ---------- helpers ----------
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const areaOf = (id) => D.AREAS.find((a) => a.id === id);
const tftFor = (d) => d.tft || (areaOf(d.area) || {}).tft || null;
const videosFor = (id) => VIDEOS[id] || [];
const kidVideos = (id) => videosFor(id).filter((v) => !v.dad);
const fmtLen = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
const ytThumb = (id, q = 'sddefault') => `https://i.ytimg.com/vi/${encodeURIComponent(id)}/${q}.jpg`;
const ytWatch = (id) => `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;
const ytEmbed = (id) => `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;
const VALID_YT = /^[A-Za-z0-9_-]{11}$/;
function videoCard(v, i) {
  if (!VALID_YT.test(v.id)) return '';
  return `<li class="vid" data-testid="video"><button class="vid-play" data-action="play-video" data-vid="${v.id}" aria-label="Play: ${esc(v.t)}">
      <img src="${ytThumb(v.id, v.th === 'hq' ? 'hqdefault' : 'sddefault')}" data-fallback="${ytThumb(v.id, 'hqdefault')}" alt="" loading="lazy" width="640" height="480"><span class="vid-btn" aria-hidden="true"></span><span class="vid-len">${fmtLen(v.s)}</span></button>
    <div class="vid-info"><span class="vid-t">${esc(v.t)}${v.dad ? ' <span class="vid-dad">For Dad</span>' : ''}</span><span class="vid-ch">${esc(v.ch)} · <a href="${ytWatch(v.id)}" target="_blank" rel="noopener" data-testid="yt-link">YouTube ↗</a></span></div></li>`;
}
function videoSection(list, title = 'Watch how') {
  if (!list.length) return '';
  return `<section class="videos" data-testid="videos"><h2 class="eyebrow">${esc(title)}</h2><ul class="vid-list">${list.map(videoCard).join('')}</ul>
    <p class="small muted vid-note">Videos play from YouTube. Watch one, then go and do it.</p></section>`;
}
const NEED_LABEL = { wall: 'a wall', rebounder: 'a rebounder', partner: 'Dad' };
const roleOf = (id) => D.ROLES[id] || null;
const refTag = (d) => (d.ref && D.REFS[d.ref] ? `<p class="ref-tag" data-testid="ref-tag"><span class="flag" aria-hidden="true">${D.REFS[d.ref].flag}</span><span><b>From ${esc(D.REFS[d.ref].name)}.</b> ${esc(d.why || '')}</span></p>` : '');
function jobCard(roleId, title = 'My job', link = true) {
  const r = roleOf(roleId);
  if (!r) return '';
  const rows = [['our', 'Our ball'], ['their', 'Their ball'], ['loose', 'Loose ball']];
  return `<section class="job-card" data-testid="job-card"><div class="spread"><p class="eyebrow">${esc(title)}</p>${link ? `<a class="small" href="#/role/${r.id}">See the role</a>` : ''}</div>
    <h2 class="job-role"><span aria-hidden="true">${r.icon}</span> ${esc(r.name)}</h2>
    <ul class="job">${rows.map(([k, l]) => `<li><span class="jk ${k}">${l}</span><span>${esc(r.job[k])}</span></li>`).join('')}</ul></section>`;
}
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
const withUnit = (v, unit) => (unit.startsWith('/') ? `${v}${unit}` : `${v} ${unit}`);

function niceDate(key, opts = { weekday: 'long', day: 'numeric', month: 'short' }) {
  return new Date(`${key}T00:00:00`).toLocaleDateString('en-AU', opts);
}
function fmtDown(secs) {
  const s = Math.max(0, Math.ceil(secs));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
function fmtUp(secs) {
  if (secs < 60) return secs.toFixed(1);
  const m = Math.floor(secs / 60);
  return `${m}:${(secs - m * 60).toFixed(1).padStart(4, '0')}`;
}

let toastT;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.hidden = false;
  clearTimeout(toastT);
  toastT = setTimeout(() => { toastEl.hidden = true; }, 2800);
}

let actx;
function beep(freq = 880, dur = 0.25) {
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const o = actx.createOscillator();
    const g = actx.createGain();
    o.frequency.value = freq;
    o.connect(g); g.connect(actx.destination);
    g.gain.setValueAtTime(0.25, actx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + dur);
    o.start(); o.stop(actx.currentTime + dur);
  } catch { /* no audio */ }
}
function speak(text) {
  if (!state.settings.speech || !('speechSynthesis' in window)) return;
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.05; u.lang = 'en-AU';
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  } catch { /* no speech */ }
}
let wakeLock = null;
async function holdScreen() {
  try {
    if ('wakeLock' in navigator && !wakeLock) {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => { wakeLock = null; });
    }
  } catch { /* not allowed */ }
}
function releaseScreen() { try { if (wakeLock) wakeLock.release(); } catch { /* ignore */ } wakeLock = null; }

function markDone(drillId, key = todayKey()) {
  const log = state.history[key] || (state.history[key] = { done: [], complete: false });
  if (!log.done.includes(drillId)) log.done.push(drillId);
  const session = P.buildSession(key, state.settings);
  if (session.roleDay) log.role = session.role;
  const was = log.complete;
  log.complete = P.isComplete(session, log);
  persist();
  return { session, justCompleted: !was && log.complete };
}
function doneToday() { return (state.history[todayKey()] || { done: [] }).done; }

// ---------- timer ----------
const T = { secs: 0, mode: 'down', startedAt: 0, acc: 0, running: false, iv: null };
const tElapsed = () => T.acc + (T.running ? (Date.now() - T.startedAt) / 1000 : 0);
function tStart() {
  if (T.running) return;
  if (T.mode === 'down' && tElapsed() >= T.secs) T.acc = 0;
  T.running = true; T.startedAt = Date.now();
  T.iv = setInterval(tTick, 200);
  holdScreen(); beep(660, 0.12); tTick();
}
function tPause() {
  if (!T.running) return;
  T.acc = tElapsed(); T.running = false;
  clearInterval(T.iv); T.iv = null; tTick();
}
function tReset() { tPause(); T.acc = 0; tTick(); }
function tTick() {
  const el = tElapsed();
  const clock = document.querySelector('[data-testid=clock]');
  const btn = document.querySelector('[data-action=timer-toggle]');
  const box = document.getElementById('timer');
  if (clock) clock.textContent = T.mode === 'down' ? fmtDown(T.secs - el) : fmtUp(el);
  if (btn) btn.textContent = T.running ? (T.mode === 'up' ? 'Stop' : 'Pause') : (el > 0 && (T.mode === 'up' || el < T.secs) ? 'Resume' : 'Start');
  if (box) box.classList.toggle('running', T.running);
  if (coach) coachFoot();
  if (T.mode === 'down' && T.running && el >= T.secs) {
    T.acc = T.secs; T.running = false; clearInterval(T.iv); T.iv = null;
    beep(880, 0.35); setTimeout(() => beep(1100, 0.4), 380);
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    speak('Time');
    if (coach) coachEnd(); else toast('Time! Tap Done when you have finished.');
    tTick();
  }
}
function tCleanup() { if (T.iv) clearInterval(T.iv); T.iv = null; T.running = false; T.acc = 0; }

// ---------- coach mode ----------
let coach = null;
const ARROW = (deg) => `<svg class="arrow" viewBox="0 0 100 100" style="transform:rotate(${deg}deg)" aria-hidden="true"><path d="M50 6 L90 50 H63 V94 H37 V50 H10 Z" fill="currentColor"/></svg>`;
const COACH_POOLS = {
  colours: [{ w: 'RED', c: 'red' }, { w: 'GREEN', c: 'green' }, { w: 'BLUE', c: 'blue' }, { w: 'YELLOW', c: 'yellow' }],
  numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((n) => ({ w: n, c: 'plain' })),
  arrows: [{ w: 'LEFT', a: -90, c: 'plain' }, { w: 'RIGHT', a: 90, c: 'plain' }, { w: 'FORWARD', a: 0, c: 'plain' }, { w: 'BACK', a: 180, c: 'plain' }],
  calls: [{ w: 'OUR BALL', c: 'green', say: 'Our ball!' }, { w: 'THEIR BALL', c: 'red', say: 'Their ball!' }, { w: 'KEEPER\'S BALL', c: 'yellow', say: 'Keeper\'s ball!' }],
  turn: [{ w: 'TURN', c: 'green', say: 'Turn!' }, { w: 'MAN ON', c: 'red', say: 'Man on!' }],
  runs: [{ w: 'FEET', c: 'yellow', say: 'Feet!' }, { w: 'IN BEHIND', c: 'blue', say: 'In behind!' }],
};
function coachShow(cls, inner, sub, word) {
  coachEl.className = `coach ${cls}`;
  const longest = Math.max(1, ...String(word ?? inner).split(/\s+/).map((w) => w.length));
  const size = `min(42vh, ${Math.round(170 / Math.max(longest, 3))}vw)`;
  coachEl.innerHTML = `<p class="sub">${esc(sub || (coach && coach.label) || '')}</p><div class="word" data-testid="coach-word" style="font-size:${size}">${inner}</div><p class="foot" id="coach-foot"></p>`;
  coachFoot();
}
function coachFoot() {
  const f = document.getElementById('coach-foot');
  if (!f || !coach) return;
  const left = T.mode === 'down' ? fmtDown(T.secs - tElapsed()) : fmtUp(tElapsed());
  f.textContent = `Tap anywhere to stop · ${left}${T.mode === 'down' ? ' left' : ''}`;
}
function startCoach(mode, label) {
  stopCoach();
  const pool = COACH_POOLS[mode];
  if (!pool) return;
  coach = { mode, label, last: -1, timers: [] };
  coachEl.hidden = false;
  holdScreen();
  const later = (fn, ms) => { coach.timers.push(setTimeout(fn, ms)); };
  let n = 3;
  const count = () => {
    if (!coach) return;
    if (n > 0) { coachShow('ready', String(n), 'Get ready'); beep(520, 0.1); n--; later(count, 900); return; }
    tStart();
    blank();
  };
  const blank = () => {
    if (!coach) return;
    coachShow('ready', '<span style="opacity:.25">•</span>');
    later(flash, 2200 + Math.random() * 2000);
  };
  const flash = () => {
    if (!coach) return;
    let i;
    do { i = Math.floor(Math.random() * pool.length); } while (pool.length > 1 && i === coach.last);
    coach.last = i;
    const cue = pool[i];
    const inner = cue.a !== undefined ? `${ARROW(cue.a)}<div class="arrow-word">${cue.w}</div>` : esc(cue.w);
    coachShow(cue.c, inner, null, cue.a !== undefined ? 'XXXX' : cue.w);
    if (cue.say) speak(cue.say);
    if (navigator.vibrate) navigator.vibrate(60);
    later(blank, ['calls', 'runs'].includes(mode) ? 1900 : 1500);
  };
  count();
}
function coachEnd() {
  if (!coach) return;
  coach.timers.forEach(clearTimeout);
  coach.timers = [];
  coachShow('green', 'TIME!', 'Well done');
  coach.timers.push(setTimeout(stopCoach, 1800));
}
function stopCoach() {
  if (!coach) return;
  coach.timers.forEach(clearTimeout);
  coach = null;
  coachEl.hidden = true;
  coachEl.innerHTML = '';
}
coachEl.addEventListener('click', () => { stopCoach(); tPause(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && coach) { stopCoach(); tPause(); } });

// ---------- views ----------
function planItem(b, log) {
  const d = D.DRILLS[b.drill];
  const done = log.includes(b.drill);
  const area = areaOf(d.area);
  const cls = b.slot === 'Focus' ? 'focus' : (b.slot === 'Brain' ? 'brain-slot' : (b.slot === 'Role' ? 'role-slot' : ''));
  return `<li class="${done ? 'done' : ''}"><a href="#/drill/${b.drill}" data-testid="plan-item" data-drill="${b.drill}">
    <span class="slot ${cls}">${esc(b.slot)}</span>
    <span><span class="name">${esc(d.name)}</span><span class="meta">${d.mins} min · ${esc(area.name)}${kidVideos(b.drill).length ? ' · ▶ video' : (tftFor(d) ? ' · TFT video' : '')}</span></span>
    <span class="check" role="img" aria-label="${done ? 'Done' : 'Not done yet'}"></span></a></li>`;
}

function viewToday() {
  const key = todayKey();
  const st = state.settings;
  const s = P.buildSession(key, st);
  const log = doneToday();
  const focus = D.FOCUSES[s.focus];
  const streak = P.streak(key, state.history, st);
  const week = P.weekDates(key);
  const training = (d) => ['full', 'team', 'light'].includes(P.dayType(d, st));
  const weekPlanned = week.filter(training).length;
  const weekDone = week.filter((d) => training(d) && state.history[d] && state.history[d].complete).length;
  const hi = st.playerName && st.playerName !== 'Player' ? `Hi ${esc(st.playerName)}` : 'Today';
  const setup = st.configured ? '' : `<p class="setup-note" data-testid="setup-note">Dad: set his week and kit in the <a href="#/dad">Dad tab</a> so the plan fits.</p>`;
  const head = `<header class="today-head"><div><p class="eyebrow" data-testid="today-date">${esc(niceDate(key))}</p><h1>${hi}</h1></div>
    <div class="chips"><span class="chip" data-testid="streak">Streak <b>${streak}</b></span><span class="chip" data-testid="week-count">Week <b>${weekDone}/${weekPlanned}</b></span></div></header>`;
  const band = `<section class="cue-band" aria-label="This week's focus" data-testid="focus"><p class="eyebrow">This week's focus</p><p class="cue-word">${esc(focus.name)}</p><p>${esc(focus.cue)}</p></section>`;

  if (s.type === 'rest') {
    return `${head}${band}${setup}<section class="day-card" data-testid="rest-day"><p class="eyebrow">Rest day</p><h2>Rest is training too</h2>
      <p>Your body gets stronger on rest days. Your streak is safe.</p>
      <p class="muted">Kicking a ball with friends is fine. Want something quiet? Try a Pause &amp; pick.</p>
      <p style="margin-top:14px"><a class="btn" href="#/brain">Pause &amp; pick</a></p></section>`;
  }
  if (s.type === 'game') {
    const reflected = state.reflections.some((r) => r.date === key);
    return `${head}${band}${setup}<section class="day-card" data-testid="game-day"><p class="eyebrow">Game day</p><h2>Play free. Have fun.</h2>
      <p>Warm up, then think about one thing in the game: <b>${esc(focus.name)}</b>.</p></section>
      ${jobCard(s.role, 'Today you play')}
      <ul class="plan">${s.blocks.map((b) => planItem(b, log)).join('')}</ul>
      <div class="start-wrap stack">
        ${reflected ? '<p class="muted">Game questions saved. Rest up.</p>' : '<a class="btn big primary" href="#/after" data-testid="after-btn">After the game: 3 questions</a>'}
      </div>`;
  }

  const theme = s.theme ? D.THEMES.find((t) => t.id === s.theme) : null;
  const role = roleOf(s.role);
  const sub = s.type === 'team' ? 'Team training today, so just the Daily 3'
    : s.type === 'light' ? `Game tomorrow, so keep it light: Daily 3 and ${role.name.toLowerCase()} pictures`
      : s.roleDay ? `Daily 3, 2 ${role.name.toLowerCase()} drills, then 3 pictures`
        : `Daily 3, this week's focus, then 2 ${theme.name} drills`;
  const title = s.type === 'full' ? (s.roleDay ? 'Role day' : `${esc(theme.name)} day`) : s.type === 'team' ? 'Team day' : 'Light day';
  const job = s.roleDay || s.type === 'light' ? jobCard(s.role, 'Saturday you play') : '';
  const next = s.blocks.find((b) => !log.includes(b.drill));
  const anyDone = s.blocks.some((b) => log.includes(b.drill));
  const cta = next
    ? `<div class="start-wrap"><a class="btn big primary" href="#/drill/${next.drill}" data-testid="start">${anyDone ? 'Continue' : 'Start'}</a></div>`
    : `<section class="all-done" data-testid="all-done"><h2>Done for today</h2><p style="margin-top:6px">Streak: ${plural(streak, 'day')}. See you tomorrow.</p><p style="margin-top:12px"><a href="#/records">Log a record</a></p></section>`;
  return `${head}${band}${setup}${job}
    <div class="section spread"><h2 data-testid="day-title">${title}</h2><span class="muted" data-testid="minutes">about ${s.minutes} min</span></div>
    <p class="muted small" style="margin-top:4px">${esc(sub)}</p>
    <ul class="plan" data-testid="plan">${s.blocks.map((b) => planItem(b, log)).join('')}</ul>${cta}`;
}

function coachHint(mode) {
  return {
    colours: 'Coach mode flashes colours full-screen. Put the tablet behind you and shout the colour.',
    numbers: 'Coach mode flashes numbers. Shout the number while you run.',
    arrows: 'Coach mode flashes arrows. Move the way it points.',
    calls: 'Coach mode calls OUR BALL, THEIR BALL or KEEPER\'S BALL out loud and on screen.',
    turn: 'Coach mode shows TURN or MAN ON. Put the tablet behind you and check it over your shoulder.',
    runs: 'Coach mode calls FEET or IN BEHIND out loud and on screen.',
  }[mode];
}

function viewDrill(id, from) {
  const d = D.DRILLS[id];
  if (!d) return notFound();
  const area = areaOf(d.area);
  const s = P.buildSession(todayKey(), state.settings);
  const block = s.blocks.find((b) => b.drill === id);
  const done = doneToday().includes(id);
  const lib = from === 'lib' || from === 'role';
  const back = from === 'role' ? (d.role ? `<a class="back" href="#/role/${d.role}">${esc(roleOf(d.role).name)}</a>` : '<a class="back" href="#/roles">Roles</a>')
    : lib ? `<a class="back" href="#/area/${d.area}">${esc(area.name)}</a>` : '<a class="back" href="#/">Today</a>';
  const where = d.role ? `${roleOf(d.role).icon} ${roleOf(d.role).name}` : area.name;
  const tft = tftFor(d);
  const secs = d.mins * 60;
  const missing = (d.needs || []).filter((n) => !state.settings.equipment[n]);
  const pickHref = d.rolePick ? `#/brain?role=${s.role}&from=today` : `${d.link}?from=today`;
  const timer = d.link ? `<p style="margin-top:16px"><a class="btn big" href="${pickHref}" data-testid="open-brain">${d.rolePick ? `Open ${esc(roleOf(s.role).name.toLowerCase())} pictures` : 'Open Pause &amp; pick'}</a></p>`
    : `<section class="timer" id="timer" data-secs="${d.stopwatch ? 0 : secs}" data-mode="${d.stopwatch ? 'up' : 'down'}">
      <div class="spread"><span class="eyebrow">${d.stopwatch ? 'Stopwatch' : `Timer · ${d.mins} min`}</span>${d.cues ? `<button class="btn small primary" data-action="coach" data-mode="${d.cues}" data-testid="coach-btn">Coach mode</button>` : ''}</div>
      <div class="clock" data-testid="clock">${d.stopwatch ? '0.0' : fmtDown(secs)}</div>
      <div class="controls"><button class="btn primary" data-action="timer-toggle" data-testid="timer-btn">Start</button><button class="btn ghost" data-action="timer-reset">Reset</button></div>
      ${d.cues ? `<p class="small muted" style="margin-top:12px">${esc(coachHint(d.cues))}</p>` : ''}</section>`;
  let test = '';
  if (d.test) {
    const t = D.TESTS[d.test];
    const b = P.best(t.id, state.records);
    const nt = P.nextTarget(t.id, b);
    test = `<section class="card test-box"><h3>Log your score</h3>
      <p class="small muted" style="margin-top:4px">${esc(t.name)}. Best: <b data-testid="best">${b === null ? 'none yet' : withUnit(b, t.unit)}</b>${nt !== null ? `. Next belt at ${withUnit(nt, t.unit)}` : ''}.</p>
      <form class="row" data-form="score" data-test="${t.id}" style="margin-top:10px">
        <label class="sr-only" for="score">${esc(t.name)} (${t.unit})</label>
        <input id="score" name="value" type="number" inputmode="decimal" step="${t.dir === 'down' ? '0.1' : '1'}" min="0" max="9999" required placeholder="${t.unit}">
        <button class="btn primary" data-testid="save-score">Save</button></form></section>`;
  }
  return `${back}
    <header class="drill-head"><p class="eyebrow">${block ? esc(block.slot) + ' · ' : ''}${esc(where)} · ${d.mins} min</p>
      <h1 data-testid="drill-name">${esc(d.name)}</h1><p class="drill-cue" data-testid="drill-cue">${esc(d.cue)}</p></header>
    ${refTag(d)}
    ${missing.length ? `<p class="setup-note">Needs ${missing.map((m) => NEED_LABEL[m]).join(' and ')}. Dad can tick it in the Dad tab if you have it.</p>` : ''}
    <ol class="steps">${d.steps.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>
    ${videoSection(videosFor(id))}
    ${timer}
    ${tft ? `<a class="tft-link" href="${tft}" target="_blank" rel="noopener" data-testid="tft-link"><span>Watch the ${esc(area.name)} videos<small>On tft-tube. Free login needed.</small></span><span aria-hidden="true">↗</span></a>` : ''}
    ${test}
    <div class="done-bar">${done ? '<p class="muted" data-testid="done-note">Done today. Nice work.</p>' : ''}
      <button class="btn big primary" data-action="done" data-id="${id}" data-from="${lib ? from : ''}" data-testid="done-btn">${done ? 'Next' : 'Done'}</button></div>`;
}

function viewLibrary() {
  const count = (id) => Object.values(D.DRILLS).filter((d) => d.area === id).length;
  const vcount = (id) => new Set(Object.entries(D.DRILLS).filter(([, d]) => d.area === id).flatMap(([k]) => videosFor(k).map((v) => v.id))).size;
  return `<h1>Drills</h1><p class="muted" style="margin-top:8px">${D.AREAS.length} areas. Tap one to see its drills. Roles 9v9 has the drills for each position.</p>
    <div class="legend"><span class="l-tft">tft-tube area</span><span class="l-new">Added for the game around the ball</span></div>
    <p class="small muted" style="margin-top:8px">Every drill has a short YouTube demo. tft-tube areas also link to the TFT videos.</p>
    <div class="tiles">${D.AREAS.map((a) => `<a class="tile ${a.tft ? '' : 'new'}${a.id === 'roles' ? ' roles' : ''}" href="${a.href || `#/area/${a.id}`}" data-testid="tile"><span class="t-name">${esc(a.name)}</span><span class="t-meta">${plural(count(a.id), 'drill')} · ${plural(vcount(a.id), 'video')}${a.tft ? ' + TFT' : ''}</span></a>`).join('')}</div>`;
}

function viewArea(id) {
  const a = areaOf(id);
  if (!a) return notFound();
  const list = Object.entries(D.DRILLS).filter(([, d]) => d.area === id);
  const eq = state.settings.equipment;
  return `<a class="back" href="#/drills">Drills</a><h1 style="margin-top:6px">${esc(a.name)}</h1>
    <p class="muted" style="margin-top:8px">${esc(a.blurb || 'Watch the videos on tft-tube, then do the drills here.')}</p>
    ${a.tft ? `<a class="tft-link" href="${a.tft}" target="_blank" rel="noopener"><span>Watch the ${esc(a.name)} videos<small>On tft-tube. Free login needed.</small></span><span aria-hidden="true">↗</span></a>` : ''}
    <ul class="drill-list">${list.map(([did, d]) => {
    const miss = (d.needs || []).filter((n) => !eq[n]);
    return `<li><a href="#/drill/${did}?from=lib" data-testid="area-drill"><span><span class="name">${esc(d.name)}</span><br><span class="needs">${d.mins} min${videosFor(did).length ? ` · ${plural(videosFor(did).length, 'video')}` : ''}${d.needs ? ` · needs ${d.needs.map((n) => NEED_LABEL[n]).join(', ')}` : ''}${miss.length ? ' (not ticked)' : ''}</span></span><span aria-hidden="true">›</span></a></li>`;
  }).join('')}</ul>`;
}

// ---------- brain ----------
const brainRun = { current: null, picked: null, count: 0, from: null, role: null, order: [0, 1, 2] };
function shuffled(n) { const a = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function pickScenario(id) { brainRun.current = id; brainRun.picked = null; const sc = D.SCENARIOS.find((s) => s.id === id); brainRun.order = shuffled(sc.choices.length); }
// Attacking pictures are written with the goal at the bottom; flip them so we attack up the screen.
const flipY = (y) => 172 - y;
function flipped(sc) {
  if (!sc.att) return sc;
  const p = (q) => [q[0], flipY(q[1])];
  return { ...sc, you: p(sc.you), gk: p(sc.gk), ball: p(sc.ball), mates: sc.mates.map(p), opps: sc.opps.map(p),
    arrows: sc.arrows.map(([x1, y1, x2, y2, w]) => [x1, flipY(y1), x2, flipY(y2), w]),
    move: sc.move ? [sc.move[0], flipY(sc.move[1]), sc.move[2], flipY(sc.move[3])] : null };
}
function pitchSVG(raw, showMove) {
  const sc = flipped(raw);
  const stripes = Array.from({ length: 12 }, (_, i) => `<rect x="0" y="${40 + i * 8}" width="100" height="4" fill="rgba(255,255,255,.035)"/>`).join('');
  const line = 'stroke="rgba(255,255,255,.6)" stroke-width=".5" fill="none"';
  const dot = (p, fill, stroke = '#0a1024', r = 3) => `<circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width=".7"/>`;
  const arrow = ([x1, y1, x2, y2, who]) => {
    const col = who === 'opp' ? '#ff8a96' : '#9fdcff';
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width=".8" stroke-dasharray="2 1.4" marker-end="url(#ah-${who})"/>`;
  };
  let move = '';
  const avoid = [...sc.opps, ...sc.mates, sc.ball, ...(sc.gk[0] === sc.you[0] && sc.gk[1] === sc.you[1] ? [] : [sc.gk])];
  const along = (x1, y1, x2, y2, from = 0) => { for (let t = from; t <= 1.001; t += 0.2) avoid.push([x1 + (x2 - x1) * t, y1 + (y2 - y1) * t]); };
  sc.arrows.forEach(([x1, y1, x2, y2]) => along(x1, y1, x2, y2));
  if (showMove && sc.move) {
    const [x1, y1, x2, y2] = sc.move;
    const len = Math.hypot(x2 - x1, y2 - y1) || 1;
    const k = Math.max(0, (len - 4.6) / len); // stop the arrow at the target ring
    const ex = x1 + (x2 - x1) * k; const ey = y1 + (y2 - y1) * k;
    along(x1, y1, x2, y2, 0.2);
    move = `<circle cx="${x2}" cy="${y2}" r="3.4" fill="none" stroke="#c8f65a" stroke-width=".7" stroke-dasharray="1.2 1"/><line class="move" x1="${x1}" y1="${y1}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="#c8f65a" stroke-width="1.3" marker-end="url(#ah-you)"/>`;
  } else if (showMove) {
    // no move = stay where you are and get set
    move = `<circle cx="${sc.you[0]}" cy="${sc.you[1]}" r="6.2" fill="none" stroke="#c8f65a" stroke-width=".7" stroke-dasharray="1.2 1"/>`;
  }
  // put YOU where it is clearest: above, below, right or left of the dot, inside the pitch
  const spots = [[0, -5.4], [0, 8.2], [9.6, 1.3], [-9.6, 1.3]].map(([dx, dy]) => {
    const x = sc.you[0] + dx; const y = sc.you[1] + dy;
    const inside = x - 4 >= 1 && x + 4 <= 99 && y - 3.4 >= 41 && y + 0.6 <= 131.5;
    const cx = x; const cy = y - 1.3;
    const clear = Math.min(...avoid.map(([px, py]) => Math.hypot((px - cx) / 1.35, py - cy)));
    return { x, y, inside, clear };
  }).filter((c) => c.inside);
  const lab = spots.find((c) => c.clear >= 5.2) || spots.sort((a, b) => b.clear - a.clear)[0];
  return `<svg viewBox="0 40 100 92" role="img" aria-label="Pitch picture: ${esc(sc.title)}" data-testid="pitch">
    <defs>${[['opp', '#ff8a96'], ['mate', '#9fdcff'], ['you', '#c8f65a']].map(([k, c]) => `<marker id="ah-${k}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${c}"/></marker>`).join('')}</defs>
    <rect x="0" y="40" width="100" height="92" fill="#11663f"/>${stripes}
    <g${sc.att ? ' transform="matrix(1 0 0 -1 0 172)"' : ''}><path d="M3 44 V128 H97 V44" ${line}/><line x1="3" y1="44" x2="97" y2="44" stroke="rgba(255,255,255,.6)" stroke-width=".5"/>
    <path d="M40 44 A10 10 0 0 0 60 44" ${line}/>
    <rect x="22" y="104" width="56" height="24" ${line}/><path d="M41.7 104 A13 13 0 0 1 58.3 104" ${line}/><rect x="38" y="120" width="24" height="8" ${line}/>
    <circle cx="50" cy="114" r=".6" fill="rgba(255,255,255,.7)"/><rect x="44" y="128" width="12" height="2.6" ${line}/></g>
    ${sc.arrows.map(arrow).join('')}
    ${sc.opps.map((p) => dot(p, '#ff6272')).join('')}
    ${sc.mates.map((p) => dot(p, '#8fd3ff')).join('')}
    ${dot(sc.gk, sc.att ? '#ff9a3c' : '#ffd23f')}
    ${move}
    ${dot(sc.you, '#c8f65a', '#0a1024', 3.6)}
    <text x="${lab.x}" y="${lab.y}" text-anchor="middle" font-size="3.6" font-weight="700" fill="#fff" font-family="Barlow Condensed, sans-serif" letter-spacing=".2">YOU</text>
    ${dot(sc.ball, '#ffffff', '#111', 1.5)}
  </svg>`;
}

function viewBrain(from, roleParam) {
  const role = roleOf(roleParam) ? roleParam : null;
  if (role !== brainRun.role) { brainRun.role = role; brainRun.current = null; }
  const pool = P.scenariosFor(role);
  if (!brainRun.current || !pool.find((s) => s.id === brainRun.current)) {
    pickScenario(P.nextScenario(state.brain, null, role).id);
  }
  if (from) brainRun.from = from;
  const sc = D.SCENARIOS.find((s) => s.id === brainRun.current);
  const score = P.brainScore(state.brain, role);
  const bi = P.brainBelt(state.brain);
  const belt = bi >= 0 ? D.BELTS[bi] : null;
  const picked = brainRun.picked;
  const answered = picked !== null;
  const right = answered && picked === sc.answer;
  const key = `<div class="key"><span><i style="background:#c8f65a"></i>You</span><span><i style="background:#8fd3ff"></i>Teammate</span><span><i style="background:#ff6272"></i>Opponent</span>${sc.att ? '<span><i style="background:#ff9a3c"></i>Their keeper</span>' : '<span><i style="background:#ffd23f"></i>Your keeper</span>'}<span><i style="background:#fff"></i>Ball</span></div>`;
  const pickDrill = P.buildSession(todayKey(), state.settings).blocks.map((b) => b.drill).find((d) => d === 'b_pause_pick' || d === 'b_role_pick');
  const inToday = !!pickDrill;
  const canFinish = brainRun.from === 'today' && inToday && brainRun.count >= 3 && !doneToday().includes(pickDrill);
  const qs = (r) => [r ? `role=${r}` : '', brainRun.from ? `from=${brainRun.from}` : ''].filter(Boolean).join('&');
  const pills = `<nav class="role-pills" aria-label="Pictures for a role" data-testid="role-pills">${[['', 'All'], ...D.ROLE_SEQ.map((r) => [r, `${D.ROLES[r].icon} ${D.ROLES[r].name}`])].map(([r, l]) => `<a href="#/brain${qs(r) ? `?${qs(r)}` : ''}" ${r === (role || '') ? 'aria-current="true"' : ''}>${esc(l)}</a>`).join('')}</nav>`;
  return `<header class="brain-head"><div><p class="eyebrow">Game brain${role ? ` · ${esc(D.ROLES[role].name)}` : ''}</p><h1>Pause &amp; pick</h1></div>
      <div class="chips"><span class="chip" data-testid="brain-score">Right <b>${score}/${pool.length}</b></span>${belt ? `<span class="chip belt"><i style="background:${belt.color}"></i>${belt.name} belt</span>` : ''}</div></header>
    ${pills}
    <div class="pitch-wrap">${sc.att ? '<span class="att-note" aria-hidden="true">We attack ↑</span>' : ''}${pitchSVG(sc, answered)}</div>${key}
    <p class="question" data-testid="question">${esc(sc.question)}</p>
    <div class="choices">${brainRun.order.map((i, pos) => {
    const c = sc.choices[i];
    const cls = answered ? (i === sc.answer ? 'right' : (i === picked ? 'wrong' : '')) : '';
    return `<button class="choice ${cls}" data-action="pick" data-i="${i}" ${answered ? 'disabled' : ''} data-testid="choice" data-correct="${i === sc.answer}"><span class="k">${'ABCD'[pos]}</span><span>${esc(c)}</span></button>`;
  }).join('')}</div>
    ${answered ? `<section class="explain" data-testid="explain"><p class="verdict ${right ? 'ok' : 'no'}">${right ? 'Yes!' : 'Not quite'}</p>
      <p>${sc.explain.toLowerCase().startsWith(sc.cue.toLowerCase()) ? '' : `<b>${esc(sc.cue)}.</b> `}${esc(sc.explain)}</p>${sc.move ? '<p class="small muted">The lime arrow shows the right move.</p>' : ''}</section>
      <div class="done-bar">${canFinish ? '<button class="btn big primary" data-action="brain-finish" data-testid="brain-finish">Done: back to today</button>' : ''}
      <button class="btn big ${canFinish ? '' : 'primary'}" data-action="brain-next" data-testid="brain-next">Next picture</button></div>` : ''}
    ${brainRun.from === 'today' && inToday ? `<p class="small muted" style="margin-top:14px">Today: ${Math.min(brainRun.count, 3)}/3 pictures.</p>` : ''}`;
}

// ---------- records ----------
function spark(list, dir) {
  if (!list || list.length < 2) return '';
  const vals = list.slice(-12).map((r) => r.value);
  const min = Math.min(...vals); const max = Math.max(...vals); const span = max - min || 1;
  const pts = vals.map((v, i) => `${((i / (vals.length - 1)) * 100).toFixed(1)},${(dir === 'down' ? 4 + ((v - min) / span) * 36 : 40 - ((v - min) / span) * 36).toFixed(1)}`).join(' ');
  return `<svg class="spark" viewBox="0 0 100 44" preserveAspectRatio="none" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="#c8f65a" stroke-width="2.5" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg>`;
}
function viewRecords() {
  const key = todayKey();
  const st = state.settings;
  const streak = P.streak(key, state.history, st);
  const total = Object.values(state.history).filter((h) => h.complete).length;
  const week = P.weekDates(key).filter((d) => state.history[d] && state.history[d].complete).length;
  const recs = Object.values(D.TESTS).map((t) => {
    const b = P.best(t.id, state.records);
    const bi = P.beltIndex(t.id, b);
    const belt = bi >= 0 ? D.BELTS[bi] : null;
    const nt = P.nextTarget(t.id, b);
    return `<section class="rec" data-testid="rec-${t.id}"><div class="spread"><h3>${esc(t.name)}</h3>${belt ? `<span class="belt"><i style="background:${belt.color}"></i>${belt.name}</span>` : '<span class="belt muted">No belt yet</span>'}</div>
      <p class="best" style="margin-top:6px">${b === null ? '<span class="muted" style="font-size:22px">No score yet</span>' : `${b}<small>${esc(t.unit)}</small>`}</p>
      ${nt !== null ? `<p class="small muted">Next belt: ${t.dir === 'down' ? `${withUnit(nt, t.unit)} or faster` : withUnit(nt, t.unit)}</p>` : '<p class="small muted">Black belt. Legend.</p>'}
      ${spark(state.records[t.id], t.dir)}${state.records[t.id] && state.records[t.id].length > 1 ? `<p class="small muted" style="margin-top:2px">Line going up = getting better</p>` : ''}
      <form data-form="score" data-test="${t.id}"><label class="sr-only" for="r-${t.id}">${esc(t.name)}</label><input id="r-${t.id}" name="value" type="number" inputmode="decimal" step="${t.dir === 'down' ? '0.1' : '1'}" min="0" max="9999" required placeholder="${esc(t.unit)}"><button class="btn primary small">Log</button></form></section>`;
  }).join('');
  const bb = P.brainBelt(state.brain);
  const refl = state.reflections.slice(0, 8).map((r) => `<li><p class="eyebrow">${esc(niceDate(r.date, { weekday: 'short', day: 'numeric', month: 'short' }))} · felt ${esc(r.feel || '?')}${r.role && roleOf(r.role) ? ` · ${esc(roleOf(r.role).name)}: job ${esc(String(r.job || '?').toLowerCase())}` : ''}</p><p style="margin-top:6px"><b>Good:</b> ${esc(r.good)}</p><p><b>Fix:</b> ${esc(r.fix)}</p></li>`).join('');
  return `<h1>Records</h1>
    <div class="stat-row"><div class="stat"><p class="n" data-testid="stat-streak">${streak}</p><p class="l">Day streak</p></div><div class="stat"><p class="n">${week}</p><p class="l">Done this week</p></div><div class="stat"><p class="n" data-testid="stat-total">${total}</p><p class="l">Sessions ever</p></div></div>
    <div class="section"><h2>Tests</h2><p class="small muted" style="margin:-4px 0 12px">Belts go White, Yellow, Orange, Green, Blue, Purple, Black. They are starter targets for home, not age norms.</p>${recs}</div>
    <div class="section"><h2>Game brain</h2><section class="rec"><div class="spread"><h3>Pause &amp; pick</h3>${bb >= 0 ? `<span class="belt"><i style="background:${D.BELTS[bb].color}"></i>${D.BELTS[bb].name}</span>` : '<span class="belt muted">No belt yet</span>'}</div><p class="best" style="margin-top:6px">${P.brainScore(state.brain)}<small>/ ${D.SCENARIOS.length} right</small></p><p style="margin-top:12px"><a class="btn small" href="#/brain">Play</a></p></section></div>
    <div class="section"><h2>Role badges</h2>${roleBadges()}</div>
    <div class="section"><h2>After the game</h2>${refl ? `<ul class="reflect-list">${refl}</ul>` : '<p class="muted">Nothing yet. On game day, answer the 3 questions after the game.</p>'}</div>`;
}

function viewAfter() {
  return `<a class="back" href="#/">Today</a><h1 style="margin-top:6px">After the game</h1><p class="muted" style="margin-top:8px">Three quick questions. You can tell Dad and he types.</p>
    <form data-form="reflect" class="stack section">
      <div class="field"><label for="good">One thing you did well</label><textarea id="good" name="good" required maxlength="300"></textarea></div>
      <div class="field"><label for="fix">One thing to fix next time</label><textarea id="fix" name="fix" required maxlength="300"></textarea></div>
      <fieldset class="field" style="border:0;padding:0;margin:0"><legend class="label" style="margin-bottom:8px">How did it feel?</legend>
        <div class="seg">${['Great', 'OK', 'Hard'].map((f, i) => `<label><input type="radio" name="feel" value="${f}" ${i === 0 ? 'checked' : ''}><span>${f}</span></label>`).join('')}</div></fieldset>
      <fieldset class="field" style="border:0;padding:0;margin:0"><legend class="label" style="margin-bottom:8px">You played ${esc(roleOf(P.roleFor(todayKey(), state.settings)).name.toLowerCase())}. Did you do your job?</legend>
        <div class="seg" data-testid="job-seg">${['Yes', 'Some of it', 'Not yet'].map((f, i) => `<label><input type="radio" name="job" value="${f}" ${i === 1 ? 'checked' : ''}><span>${f}</span></label>`).join('')}</div></fieldset>
      <button class="btn big primary" data-testid="save-reflect">Save</button></form>`;
}

// ---------- dad ----------
function roleDayText(key, st) {
  const d = P.roleDayOf(key, st);
  return d ? `${niceDate(d, { weekday: 'long' })}, plus pictures on the light day` : 'every other week (only one home day)';
}
function dayLabel(s) {
  if (s.type === 'full' && s.roleDay) return `Role day: ${D.ROLES[s.role].name} drills + pictures`;
  if (s.type === 'full') { const t = D.THEMES.find((x) => x.id === s.theme); return `${t.name}: ${t.blurb}`; }
  return { team: 'Team training + Daily 3', light: `Light: Daily 3 + ${D.ROLES[s.role].name.toLowerCase()} pictures`, game: `Game: plays ${D.ROLES[s.role].name.toLowerCase()}`, rest: 'Rest' }[s.type];
}
function viewDad() {
  const st = state.settings;
  const key = todayKey();
  const ws = P.weekStart(key);
  const L = P.weeklyLoad(key, state.history, st);
  const cur = P.focusFor(key, st);
  const override = st.focusOverride[ws];
  const upcoming = [1, 2, 3].map((w) => P.focusFor(P.addDays(ws, w * 7), st));
  const opt = (v, label, sel) => `<option value="${v}" ${sel ? 'selected' : ''}>${esc(label)}</option>`;
  const sched = D.DAY_KEYS.map((d) => `<div class="wrow"><label class="d" for="s-${d}">${D.DAY_LABEL[d]}</label>
    <select id="s-${d}" data-set="schedule.${d}" data-testid="sched-${d}">${[['home', 'Home session'], ['team', 'Team training'], ['game', 'Game'], ['rest', 'Rest']].map(([v, l]) => opt(v, l, st.schedule[d] === v)).join('')}</select></div>`).join('');
  const kit = [['wall', 'A wall to kick against'], ['rebounder', 'A spring rebounder'], ['partner', 'Dad (or a partner) most days']]
    .map(([k, l]) => `<label class="toggle"><span>${l}</span><input type="checkbox" data-set="equipment.${k}" data-testid="eq-${k}" ${st.equipment[k] ? 'checked' : ''}></label>`).join('');
  const hrs = (m) => Math.round((m / 60) * 10) / 10;
  return `<p class="eyebrow">For Dad</p><h1>Set up</h1>
    <div class="section"><h2>Player</h2><div class="card stack">
      <div class="field"><label for="name">Name on the app</label><input id="name" type="text" maxlength="20" data-set="playerName" value="${st.playerName === 'Player' ? '' : esc(st.playerName)}" placeholder="First name" autocomplete="off"><p class="small muted">Stays on this device only.</p></div>
      <div class="field"><label for="age">Age</label><input id="age" type="number" min="5" max="18" data-set="age" value="${st.age}"></div>
      <fieldset class="field" style="border:0;padding:0;margin:0"><legend class="label" style="margin-bottom:8px">Main position</legend><div class="seg">${D.POSITIONS.map((p) => `<label><input type="radio" name="position" value="${p.id}" data-set="position" ${st.position === p.id ? 'checked' : ''}><span>${p.name}</span></label>`).join('')}</div>
        <p class="small muted" style="margin-top:8px">Sets the order of the weekly focus. Role days still rotate through every role.</p></fieldset>
    </div></div>
    <div class="section"><h2>Role of the week</h2><div class="card stack">
      <div class="field"><label for="role">Saturday he plays</label><select id="role" data-set="roleOverride" data-testid="role-select">${opt('auto', `Not sure: rotate (${D.ROLES[P.roleFor(key, { ...st, roleOverride: {} })].name})`, !st.roleOverride[ws])}${D.ROLE_SEQ.map((r) => opt(r, D.ROLES[r].name, st.roleOverride[ws] === r)).join('')}</select></div>
      <p class="small muted">Role day: ${esc(roleDayText(key, st))}. Next weeks: ${[1, 2, 3].map((w) => esc(D.ROLES[P.roleFor(P.addDays(ws, w * 7), st)].name)).join(' → ')}.</p>
      <p class="small muted">9v9 shape 3-2-3. At U10 he should try every role, keeper too.</p></div></div>
    <div class="section"><h2>His week</h2><div class="card week-grid">${sched}</div>
      <p class="small muted" style="margin-top:8px">Team days get the Daily 3 only. The day before a game is light.</p></div>
    <div class="section"><h2>Kit at home</h2><div class="card" style="padding-top:4px;padding-bottom:4px">${kit}</div>
      <p class="small muted" style="margin-top:8px">Drills that need kit you don't have swap to one that doesn't.</p></div>
    <div class="section"><h2>Weekly focus</h2><div class="card stack">
      <div class="field"><label for="focus">This week</label><select id="focus" data-set="focusOverride" data-testid="focus-select">${opt('auto', `Auto: ${D.FOCUSES[P.focusFor(key, { ...st, focusOverride: {} })].name}`, !override)}${Object.entries(D.FOCUSES).map(([k, f]) => opt(k, f.name, override === k)).join('')}</select></div>
      <p class="small muted">Next weeks: ${upcoming.map((f) => esc(D.FOCUSES[f].name)).join(' → ')}. The order comes from his game reviews and his position.</p>
      <p class="small">Now: <b>${esc(D.FOCUSES[cur].name)}</b>. ${esc(D.FOCUSES[cur].cue)}</p></div></div>
    <div class="section"><h2>Load check</h2><section class="load ${L.over || L.tooFewRest ? 'over' : ''}" data-testid="load">
      <p class="eyebrow">Organised football this week</p><p class="n" style="margin-top:6px">${L.hours} h <span class="muted small">of ${L.cap} h max</span></p>
      <p class="small muted">${hrs(L.teamMins)} h team + ${hrs(L.gameMins)} h games + ${Math.max(L.appMins, L.plannedApp)} min app · ${plural(L.offDays, 'rest day')}</p>
      ${L.over ? '<p class="small" style="color:var(--warn);margin-top:8px">More hours than his age. Swap a home day to rest.</p>' : ''}
      ${L.tooFewRest ? '<p class="small" style="color:var(--warn);margin-top:8px">No rest day. Kids his age need 1 to 2 days off a week.</p>' : ''}
      <div class="row" style="margin-top:12px;gap:12px"><div class="field" style="flex:1"><label for="tm" class="small">Team session (min)</label><input id="tm" type="number" min="0" max="300" data-set="teamMins" value="${st.teamMins}"></div>
      <div class="field" style="flex:1"><label for="gm" class="small">Game (min)</label><input id="gm" type="number" min="0" max="300" data-set="gameMins" value="${st.gameMins}"></div></div></section></div>
    <div class="section"><h2>This week's plan</h2><ul class="plan-preview" data-testid="week-plan">${P.weekPlan(key, st).map((s) => `<li><span class="d">${D.DAY_LABEL[P.dayKeyOf(s.date)]}</span><span>${esc(dayLabel(s))}</span><span class="muted small">${s.minutes ? `${s.minutes} min` : ''}</span></li>`).join('')}</ul></div>
    <div class="section"><h2>Coach voice</h2><div class="card" style="padding-top:4px;padding-bottom:4px"><label class="toggle"><span>Speak calls and "Time" out loud</span><input type="checkbox" data-set="speech" ${st.speech ? 'checked' : ''}></label></div></div>
    <div class="section"><h2>Backup</h2><div class="card stack"><p class="small muted">Progress is saved on this device. Export a backup to move it to another device.</p>
      <div class="row" style="flex-wrap:wrap"><button class="btn small" data-action="export">Export</button><label class="btn small" for="import">Import<input id="import" type="file" accept="application/json,.json" data-action="import" class="sr-only"></label><button class="btn small ghost" data-action="reset" data-testid="reset">Reset all</button></div></div></div>
    <div class="section"><h2>Notes</h2><ul class="sources">
      <li>Videos: <a href="https://tft-tube.com/" target="_blank" rel="noopener">tft-tube.com</a> (Technical Football Tuition). Free login. Links only, nothing copied.</li>
      <li>YouTube demos are embedded from their channels (Japanese and Spanish coaching channels, club academies, FIFA 11+ Kids and others). Channel names are shown under each one. Nothing is downloaded. Videos marked <b>For Dad</b> are longer explainers.</li>
      <li>No heading practice: England's FA says heading should not be introduced in training at U6 to U11 (<a href="https://www.thefa.com/-/media/thefacom-new/files/rules-and-regulations/2023-24/heading-guidance/youth-heading-guidance-chart.ashx" target="_blank" rel="noopener">FA guidance</a>).</li>
      <li>Roles follow Spanish, Japanese and Argentine academies: try every position, keeper included, and carry and take players on first. Sources are on the <a href="#/roles">Roles page</a>.</li>
      <li>Load: fewer organised hours a week than his age, 1 to 2 days off (<a href="https://publications.aap.org/pediatrics/article/119/6/1242/70751/" target="_blank" rel="noopener">AAP</a>).</li>
    </ul></div>`;
}

// ---------- roles ----------
function miniPitch(current) {
  const line = 'stroke="rgba(255,255,255,.55)" stroke-width=".5" fill="none"';
  const abbr = { gk: 'GK', cb: 'CB', wd: 'WD', cm: 'CM', wing: 'W', st: 'ST' };
  return `<svg class="mini-pitch" viewBox="0 0 60 80" role="img" aria-label="9v9 shape: 3-2-3" data-testid="mini-pitch">
    <rect width="60" height="80" fill="#11663f"/><rect x="2" y="2" width="56" height="76" ${line}/><line x1="2" y1="40" x2="58" y2="40" ${line.replace('fill="none"', '')}/>
    <circle cx="30" cy="40" r="6" ${line}/><rect x="16" y="66" width="28" height="12" ${line}/><rect x="16" y="2" width="28" height="12" ${line}/>
    ${D.SHAPE_323.map((p) => `<a href="#/role/${p.role}"><circle cx="${p.at[0]}" cy="${p.at[1]}" r="4.6" fill="${p.role === current ? '#c8f65a' : '#8fd3ff'}" stroke="#0a1024" stroke-width=".6"/>
      <text x="${p.at[0]}" y="${p.at[1] + 1.4}" text-anchor="middle" font-size="3.8" font-weight="700" fill="#0a1024" font-family="Barlow Condensed, sans-serif">${abbr[p.role]}</text></a>`).join('')}
    <text x="57" y="7" text-anchor="end" font-size="2.6" fill="rgba(255,255,255,.75)" font-family="Barlow, sans-serif">we attack ↑</text>
  </svg>`;
}
function badgeRow(r, prog) {
  const p = prog[r];
  return `<li class="badge ${p.badge ? 'got' : ''}" data-testid="badge-${r}"><span class="b-icon" aria-hidden="true">${D.ROLES[r].icon}</span><span class="b-name">${esc(D.ROLES[r].name)}</span>
    <span class="b-meta">${p.badge ? 'Badge!' : `${Math.min(p.days, P.BADGE_DAYS)}/${P.BADGE_DAYS} role days · ${Math.min(p.right, P.BADGE_PICS)}/${P.BADGE_PICS} pictures`}</span></li>`;
}
function roleBadges() {
  const prog = P.roleProgress(state.history, state.brain);
  const got = D.ROLE_SEQ.filter((r) => prog[r].badge).length;
  return `<p class="small muted" style="margin:-4px 0 12px">A badge for each role: ${P.BADGE_DAYS} role days done and ${P.BADGE_PICS} of its pictures right. All six, keeper included, makes you an All-rounder.</p>
    <ul class="badges">${D.ROLE_SEQ.map((r) => badgeRow(r, prog)).join('')}</ul>
    <p class="all-rounder ${prog.allRounder ? 'got' : ''}" data-testid="all-rounder">${prog.allRounder ? '🌟 All-rounder!' : `All-rounder: ${got}/6 badges`}</p>`;
}
function viewRoles() {
  const cur = P.roleFor(todayKey(), state.settings);
  const prog = P.roleProgress(state.history, state.brain);
  const byRef = ['es', 'jp', 'ar'].map((k) => `<li><b>${D.REFS[k].flag} ${esc(D.REFS[k].name)}</b><ul>${D.ROLE_SOURCES.filter((x) => x.ref === k).map((x) => `<li><a href="${x.url}" target="_blank" rel="noopener">${esc(x.label)}</a></li>`).join('')}</ul></li>`).join('');
  return `<a class="back" href="#/drills">Drills</a><h1 style="margin-top:6px">Roles 9v9</h1>
    <p class="muted" style="margin-top:8px">Keeper plus 8, in a 3-2-3. You try every role: this week is <b>${esc(D.ROLES[cur].name)}</b>.</p>
    <div class="roles-top">${miniPitch(cur)}
      <ul class="role-grid" data-testid="role-list">${D.ROLE_SEQ.map((r) => `<li><a class="role-card ${r === cur ? 'now' : ''}" href="#/role/${r}" data-testid="role-card"><span class="rc-icon" aria-hidden="true">${D.ROLES[r].icon}</span>
        <span><span class="rc-name">${esc(D.ROLES[r].name)}</span><span class="rc-meta">${r === cur ? 'This week · ' : ''}${prog[r].badge ? 'Badge ✓' : `${prog[r].right}/${prog[r].pics} pictures`}</span></span></a></li>`).join('')}</ul></div>
    <div class="section"><h2>For any role</h2><p class="small muted" style="margin:-4px 0 10px">Games from the academies that train every role at once.</p><ul class="drill-list">${D.ROLE_EXTRAS.map((id) => { const d = D.DRILLS[id]; return `<li><a href="#/drill/${id}?from=role" data-testid="area-drill"><span><span class="name">${D.REFS[d.ref].flag} ${esc(d.name)}</span><br><span class="needs">${d.mins} min · ${esc(d.cue)}</span></span><span aria-hidden="true">›</span></a></li>`; }).join('')}</ul></div>
    <div class="section"><h2>Why every role?</h2><div class="card stack small">
      <p>Japan's FA says don't fix positions early, give kids lots of different roles up to U-14, and let outfield players go in goal too. A Spanish model for 8 and 9 year olds says every child should try every position.</p>
      <p>At U-10, Kawasaki Frontale's academy starts with carrying the ball and taking players on. Argentina's baby fútbol does the same in small spaces. So the Daily 3 stays, and role work is one day a week.</p>
      <p>No heading practice. Crosses in these drills stay low.</p></div></div>
    <div class="section"><h2>Sources</h2><ul class="sources role-sources">${byRef}</ul></div>`;
}
function viewRole(id) {
  const r = roleOf(id);
  if (!r) return notFound();
  const cur = P.roleFor(todayKey(), state.settings);
  const prog = P.roleProgress(state.history, state.brain)[id];
  const eq = state.settings.equipment;
  const drills = r.drills.map((did) => {
    const d = D.DRILLS[did];
    const miss = (d.needs || []).filter((n) => !eq[n]);
    return `<li><a href="#/drill/${did}?from=role" data-testid="role-drill"><span><span class="name">${d.ref ? `${D.REFS[d.ref].flag} ` : ''}${esc(d.name)}</span><br><span class="needs">${d.mins} min · ${esc(d.cue)}${d.needs ? ` · needs ${d.needs.map((n) => NEED_LABEL[n]).join(', ')}` : ''}${miss.length ? ' (not ticked)' : ''}</span></span><span aria-hidden="true">›</span></a></li>`;
  }).join('');
  return `<a class="back" href="#/roles">Roles</a>
    <header class="drill-head"><p class="eyebrow">Role · 9v9${id === cur ? ' · this week' : ''}</p><h1 data-testid="role-name"><span aria-hidden="true">${r.icon}</span> ${esc(r.name)}</h1><p class="muted" style="margin-top:8px">${esc(r.blurb)}</p></header>
    ${jobCard(id, 'My job', false)}
    <div class="section"><h2>Drills</h2><ul class="drill-list">${drills}</ul></div>
    <div class="section"><h2>Pictures</h2><div class="card spread"><span>${prog.right}/${prog.pics} right</span><a class="btn small primary" href="#/brain?role=${id}" data-testid="role-pictures">Play</a></div></div>
    <div class="section"><h2>Watch a pro</h2><div class="card"><p>${esc(r.watch)}</p></div></div>
    <div class="section"><h2>Badge</h2><ul class="badges">${badgeRow(id, P.roleProgress(state.history, state.brain))}</ul></div>
    ${id === cur ? '' : `<p style="margin-top:18px"><button class="btn" data-action="set-role" data-role="${id}" data-testid="set-role">He plays ${esc(r.name.toLowerCase())} this Saturday</button></p>`}`;
}

function notFound() { return '<h1>Not found</h1><p style="margin-top:12px"><a href="#/">Back to today</a></p>'; }

// ---------- router ----------
let lastPath = '';
function parseRoute() {
  const h = location.hash.replace(/^#/, '') || '/';
  const [path, qs] = h.split('?');
  return { path, parts: path.split('/').filter(Boolean), q: new URLSearchParams(qs || '') };
}
function render(keepScroll = false) {
  const y = window.scrollY;
  stopCoach(); tCleanup(); releaseScreen();
  const { path, parts, q } = parseRoute();
  if (parts[0] === 'brain' && lastPath !== path) { brainRun.count = 0; brainRun.from = null; }
  lastPath = path;
  let html; let tab;
  switch (parts[0]) {
    case undefined: html = viewToday(); tab = 'today'; break;
    case 'drill': html = viewDrill(parts[1], q.get('from')); tab = q.get('from') === 'lib' ? 'drills' : 'today'; break;
    case 'drills': html = viewLibrary(); tab = 'drills'; break;
    case 'area': html = viewArea(parts[1]); tab = 'drills'; break;
    case 'brain': html = viewBrain(q.get('from'), q.get('role')); tab = 'brain'; break;
    case 'roles': html = viewRoles(); tab = 'drills'; break;
    case 'role': html = viewRole(parts[1]); tab = 'drills'; break;
    case 'records': html = viewRecords(); tab = 'records'; break;
    case 'after': html = viewAfter(); tab = 'today'; break;
    case 'dad': html = viewDad(); tab = 'dad'; break;
    default: html = notFound(); tab = '';
  }
  app.innerHTML = html;
  document.querySelectorAll('.tabs a').forEach((a) => { if (a.dataset.tab === tab) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  const tEl = document.getElementById('timer');
  if (tEl) { T.secs = Number(tEl.dataset.secs); T.mode = tEl.dataset.mode; T.acc = 0; T.running = false; }
  const h1 = app.querySelector('h1');
  document.title = h1 && tab !== 'today' ? `${h1.textContent} · Football Daily` : 'Football Daily';
  if (keepScroll) window.scrollTo(0, y); else window.scrollTo(0, 0);
}
window.addEventListener('hashchange', () => render());

function go(hash) { if (location.hash === hash) render(); else location.hash = hash; }

// ---------- events ----------
app.addEventListener('click', (e) => {
  const b = e.target.closest('[data-action]');
  if (!b || b.tagName === 'INPUT') return;
  const a = b.dataset.action;
  if (a === 'timer-toggle') { if (T.running) tPause(); else tStart(); if (T.mode === 'up' && !T.running) prefillScore(); }
  else if (a === 'timer-reset') tReset();
  else if (a === 'play-video') playVideo(b);
  else if (a === 'coach') { const d = D.DRILLS[parseRoute().parts[1]]; startCoach(b.dataset.mode, d ? d.cue : ''); }
  else if (a === 'done') onDone(b.dataset.id, b.dataset.from);
  else if (a === 'pick') onPick(Number(b.dataset.i));
  else if (a === 'brain-next') { pickScenario(P.nextScenario(state.brain, brainRun.current, brainRun.role).id); render(); }
  else if (a === 'brain-finish') {
    const id = P.buildSession(todayKey(), state.settings).blocks.map((x) => x.drill).find((d) => d === 'b_pause_pick' || d === 'b_role_pick');
    const r = markDone(id);
    toast(r.justCompleted ? `Daily done! Streak ${P.streak(todayKey(), state.history, state.settings)}` : 'Pictures done');
    go(nextHash(id));
  }
  else if (a === 'set-role') {
    const ws = P.weekStart(todayKey());
    state.settings.roleOverride[ws] = b.dataset.role; state.settings.configured = true; persist();
    toast(`This week: ${D.ROLES[b.dataset.role].name}`); render(true);
  }
  else if (a === 'export') onExport();
  else if (a === 'reset') {
    if (confirm('Delete all progress and settings on this device?')) {
      S.clear(); state = S.load(); state.settings.focusStart = P.weekStart(todayKey()); persist(); toast('Reset'); go('#/');
    }
  }
});

app.addEventListener('error', (e) => {
  const img = e.target;
  if (img.tagName === 'IMG' && img.dataset.fallback && img.src !== img.dataset.fallback) img.src = img.dataset.fallback;
}, true);

function playVideo(btn) {
  const id = btn.dataset.vid;
  if (!VALID_YT.test(id)) return;
  document.querySelectorAll('.vid-frame').forEach((f) => { const li = f.closest('.vid'); f.remove(); li.querySelector('.vid-play').hidden = false; });
  if (T.running) tPause();
  const f = document.createElement('iframe');
  f.className = 'vid-frame';
  f.src = ytEmbed(id);
  f.title = btn.getAttribute('aria-label') || 'Video';
  f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  f.allowFullscreen = true;
  f.referrerPolicy = 'strict-origin-when-cross-origin';
  f.setAttribute('data-testid', 'video-frame');
  btn.hidden = true;
  btn.after(f);
}

function prefillScore() {
  const inp = document.getElementById('score');
  if (inp && T.mode === 'up' && T.acc > 0) inp.value = (Math.round(T.acc * 10) / 10).toFixed(1);
}

function nextHash(afterId) {
  const s = P.buildSession(todayKey(), state.settings);
  const log = doneToday();
  const idx = s.blocks.findIndex((b) => b.drill === afterId);
  const rest = [...s.blocks.slice(idx + 1), ...s.blocks.slice(0, Math.max(idx, 0))];
  const nxt = rest.find((b) => !log.includes(b.drill));
  return nxt ? `#/drill/${nxt.drill}` : '#/';
}

function onDone(id, from) {
  const already = doneToday().includes(id);
  const r = markDone(id);
  const inSession = r.session.blocks.some((b) => b.drill === id);
  const d = D.DRILLS[id];
  const backTo = from === 'role' ? (d.role ? `#/role/${d.role}` : '#/roles') : from === 'lib' ? `#/area/${d.area}` : '#/';
  if (r.justCompleted) { beep(990, 0.2); toast(`Daily done! Streak ${P.streak(todayKey(), state.history, state.settings)}`); go('#/'); return; }
  if (from || !inSession) { if (!already) toast('Logged'); go(backTo); return; }
  go(nextHash(id));
}

function onPick(i) {
  if (brainRun.picked !== null) return;
  const sc = D.SCENARIOS.find((s) => s.id === brainRun.current);
  brainRun.picked = i;
  brainRun.count++;
  state.brain.answered[sc.id] = i === sc.answer;
  state.brain.seenAt[sc.id] = Date.now();
  persist();
  if (i === sc.answer) beep(990, 0.15);
  render(true);
}

app.addEventListener('submit', (e) => {
  const f = e.target.closest('form[data-form]');
  if (!f) return;
  e.preventDefault();
  if (f.dataset.form === 'score') {
    const t = D.TESTS[f.dataset.test];
    const v = Number(f.elements.value.value);
    if (!Number.isFinite(v) || v < 0) return;
    const value = t.dir === 'down' ? Math.round(v * 10) / 10 : Math.round(v);
    const prevBest = P.best(t.id, state.records);
    const pb = P.isPB(t.id, value, state.records);
    const beltBefore = P.beltIndex(t.id, prevBest);
    (state.records[t.id] = state.records[t.id] || []).push({ date: todayKey(), value });
    persist();
    const beltAfter = P.beltIndex(t.id, P.best(t.id, state.records));
    if (beltAfter > beltBefore) { toast(`New belt: ${D.BELTS[beltAfter].name}!`); beep(1200, 0.3); }
    else if (pb && prevBest !== null) { toast(`New record: ${value} ${t.unit}!`); beep(1100, 0.25); }
    else toast('Saved');
    render(true);
  } else if (f.dataset.form === 'reflect') {
    const fd = new FormData(f);
    state.reflections.unshift({ date: todayKey(), good: String(fd.get('good') || '').trim(), fix: String(fd.get('fix') || '').trim(), feel: fd.get('feel'), focus: P.focusFor(todayKey(), state.settings), role: P.roleFor(todayKey(), state.settings), job: fd.get('job') });
    persist();
    toast('Saved. Great work today.');
    go('#/');
  }
});

app.addEventListener('change', (e) => {
  const t = e.target;
  if (t.dataset.action === 'import') { onImport(t); return; }
  if (!t.dataset.set) return;
  const s = state.settings;
  const path = t.dataset.set;
  let v = t.type === 'checkbox' ? t.checked : t.type === 'number' ? Number(t.value) : t.value;
  if (path === 'focusOverride' || path === 'roleOverride') {
    const ws = P.weekStart(todayKey());
    if (v === 'auto') delete s[path][ws]; else s[path][ws] = v;
  } else if (path === 'playerName') s.playerName = String(v).trim().slice(0, 20) || 'Player';
  else if (path === 'age') s.age = Math.min(18, Math.max(5, Math.round(v) || 9));
  else if (path === 'teamMins' || path === 'gameMins') s[path] = Math.min(300, Math.max(0, Math.round(v) || 0));
  else if (path.includes('.')) { const [a, b] = path.split('.'); s[a][b] = v; }
  else s[path] = v;
  s.configured = true;
  persist();
  toast('Saved');
  render(true);
});

function onExport() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `football-daily-backup-${todayKey()}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
function onImport(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  file.text().then((txt) => {
    state = S.normalise(JSON.parse(txt));
    persist(); toast('Backup loaded'); render();
  }).catch(() => toast('That file did not work'));
}

document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && (T.running || coach)) holdScreen(); });

render();

if ('serviceWorker' in navigator && location.protocol === 'https:' && !params.has('nosw')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
