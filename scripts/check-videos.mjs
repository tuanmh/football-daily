// Check every YouTube id in site/js/videos.js is still public and embeddable.
// Reads the youtube-nocookie embed page (sent with the Pages referer) and looks for
// playableInEmbed:true and a playability status of OK. Nothing is downloaded.
// (Actually playing needs a home IP: YouTube shows a bot wall to cloud/CI IPs.)
// Usage: node scripts/check-videos.mjs [id ...]   Exit 1 if any fail.
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36';
const REF = process.env.CHECK_REFERER || 'https://tuanmh.github.io/';

let ids = process.argv.slice(2);
if (!ids.length) {
  const { VIDEOS } = await import('../site/js/videos.js');
  ids = [...new Set(Object.values(VIDEOS).flat().map((v) => v.id))];
}

async function check(id) {
  try {
    const res = await fetch(`https://www.youtube-nocookie.com/embed/${id}`, { headers: { 'user-agent': UA, referer: REF, 'accept-language': 'en-AU,en;q=0.9' } });
    if (!res.ok) return { id, ok: false, why: `HTTP ${res.status}` };
    const html = await res.text();
    const embed = /playableInEmbed\\?"?:(true|false)/.exec(html);
    const status = /\\?"status\\?":\\?"([A-Z_]+)\\?"/.exec(html);
    if (!embed) return { id, ok: false, why: 'no player data (removed or private?)' };
    if (embed[1] !== 'true') return { id, ok: false, why: 'embedding disabled by owner' };
    if (status && status[1] !== 'OK') return { id, ok: false, why: `status ${status[1]}` };
    return { id, ok: true, why: '' };
  } catch (e) {
    return { id, ok: false, why: String(e.message || e) };
  }
}

const queue = [...ids];
const results = [];
await Promise.all(Array.from({ length: 6 }, async () => {
  while (queue.length) results.push(await check(queue.shift()));
}));
const bad = results.filter((r) => !r.ok);
for (const r of bad) console.log(`FAIL ${r.id}: ${r.why}`);
console.log(`checked ${results.length} videos, ${bad.length} problem(s)`);
process.exitCode = bad.length ? 1 : 0;
