/* Reset Kitchen - shared logic. No dependencies, no build. */

const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const NAV_GROUPS = [
  { title: 'The week', files: ['index.html', 'cook.html', 'shopping.html', 'recipes.html'] },
  { title: 'The reasoning', files: ['fuel.html', 'train.html', 'plan.html', 'eatout.html'] },
  { title: 'The record', files: ['freezer.html', 'track.html'] },
];

const PAGES = [
  { file: 'index.html', label: 'This Week' },
  { file: 'cook.html', label: 'Cook Day' },
  { file: 'shopping.html', label: 'Shopping' },
  { file: 'recipes.html', label: 'Recipes' },
  { file: 'fuel.html', label: 'Fuel', gap: true },
  { file: 'train.html', label: 'Training' },
  { file: 'plan.html', label: 'The Plan' },
  { file: 'eatout.html', label: 'Eating Out' },
  { file: 'freezer.html', label: 'Storage', gap: true },
  { file: 'track.html', label: 'Progress' },
];

const DAY_ORDER = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/* ---------- storage ---------- */

const store = {
  get(k, d) { try { const v = localStorage.getItem('rk.' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('rk.' + k, JSON.stringify(v)); } catch { /* private mode */ } },
  del(k) { try { localStorage.removeItem('rk.' + k); } catch { /* noop */ } },
};

/* ---------- dates ---------- */

function parseISO(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); }
function addDays(dt, n) { const d = new Date(dt); d.setDate(d.getDate() + n); return d; }
function iso(dt) { return dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0'); }
function fmtShort(dt) { return dt.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }); }
function today() { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }

function fmtDay(dt) { return dt.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }); }
function daysBetween(a, b) { return Math.round((b - a) / 864e5); }

/* Monday of the week containing dt */
function mondayOf(dt) {
  const d = new Date(dt);
  const shift = (d.getDay() + 6) % 7; // Sun=0 -> 6
  return addDays(d, -shift);
}

/* Where we are in the reset right now. */
function resetState() {
  const start = parseISO(CONFIG.cycleStart);
  const thisMonday = mondayOf(today());
  const weeksIn = Math.round((thisMonday - start) / 6048e5);
  if (weeksIn < 0) {
    return { started: false, daysUntil: Math.round((start - today()) / 864e5), resetWeek: 1, cycleWeek: 1, monday: start };
  }
  const resetWeek = weeksIn + 1;
  return {
    started: true,
    done: resetWeek > CONFIG.resetWeeks,
    resetWeek,
    cycleWeek: (weeksIn % WEEKS.length) + 1,
    monday: thisMonday,
  };
}

/* The Monday for a given cycle week (1..4): the current one if it matches,
   otherwise the next upcoming occurrence. */
function mondayForCycleWeek(cw) {
  const st = resetState();
  const base = st.started ? st.resetWeek : 1;
  for (let r = base; r < base + WEEKS.length; r++) {
    if ((r - 1) % WEEKS.length === cw - 1) {
      return addDays(parseISO(CONFIG.cycleStart), (r - 1) * 7);
    }
  }
  return parseISO(CONFIG.cycleStart);
}

/* The Saturday market day and Sunday cook day that feed a given cycle week. */
function cookDayForCycleWeek(cw) { return addDays(mondayForCycleWeek(cw), -1); }
function marketDayForCycleWeek(cw) { return addDays(mondayForCycleWeek(cw), -2); }

/* ---------- selected week (persists across pages) ---------- */

function selectedWeek() {
  const q = new URLSearchParams(location.search).get('w');
  if (q && +q >= 1 && +q <= WEEKS.length) return +q;
  const saved = store.get('week', 'auto');
  if (saved === 'auto') return resetState().cycleWeek;
  return +saved >= 1 && +saved <= WEEKS.length ? +saved : 1;
}
function setSelectedWeek(w) { store.set('week', w); location.search = '?w=' + w; }

function weekData() { return WEEKS[selectedWeek() - 1]; }

/* ---------- protein family ----------
   Derived from the meal text rather than stored, so the tag can never drift
   out of sync with the food. Order matters: the first match wins, and the
   list is ordered so the main protein beats a garnish (carnitas with a fried
   egg on top is pork, not egg). */

const PROTEIN = [
  ['Fish', /salmon|sardine|mackerel|\bcod\b|tuna|shrimp|gambas|\bfish\b|godeungeo/i],
  ['Poultry', /chicken|wings|shawarma|turkey/i],
  ['Pork', /carnitas|\bpork\b|jeyuk|belly|samgyeopsal/i],
  ['Beef', /short rib|bulgogi|carne asada|ground beef|steak|burger|brisket|chuck|kofta|biltong|jerky|\bbeef\b|galbi/i],
  ['Plant', /lentil|\bbean|edamame|chickpea|hummus|tofu|chili/i],
  ['Dairy', /yogurt|cottage cheese|whey|kefir/i],
  ['Eggs', /\begg|gyeranjjim/i],
];

/* a compact mix of the week's five dinners, derived the same way the tags are */
function dinnerMix(week) {
  const counts = {};
  week.days.slice(0, 5).forEach((d) => {
    const hit = PROTEIN.find(([, re]) => re.test(d.m2 || ''));
    if (hit) counts[hit[0]] = (counts[hit[0]] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([k, n]) => n + ' ' + k.toLowerCase())
    .join(' · ');
}

function proteinTag(text) {
  if (!text) return '';
  const hit = PROTEIN.find(([, re]) => re.test(text));
  return hit ? `<span class="tag">${esc(hit[0])}</span>` : '';
}

/* ---------- eating window ---------- */

function activeWindow() { return CONFIG.window; }

/* ---------- chrome ---------- */

/* ---------- cuisine art ----------
   Each of these four cuisines has a tile tradition, so the motif comes from
   that rather than from food illustration: bojagi patchwork for Korean,
   Talavera for Mexican, a khatam eight-point star for Middle Eastern, and an
   azulejo lattice for Spanish. The same motif twice: tiled faintly as a
   ground, and once at size as the week's emblem. Geometry only, tone on
   tone, inheriting currentColor so it follows the week's accent. */

const ART = {
  korean: {
    tile: 72,
    // bojagi: six pieces, deliberately uneven, tiling with full coverage
    pattern: '<path d="M0 0h30v26H0zM30 0h42v16H30zM30 16h42v34H30zM0 26h18v46H0zM18 26h12v24H18zM18 50h54v22H18z" fill="none" stroke="currentColor" stroke-width="1.1"/>',
    glyph: '<path d="M2 2h13v11H2zM15 2h15v7H15zM15 9h15v13H15zM2 13h8v17H2zM10 13h5v9H10zM10 22h20v8H10z" fill="none" stroke="currentColor" stroke-width="1.3"/>',
  },
  mexican: {
    tile: 48,
    // Talavera: a four-petal flower on a square grid
    pattern: '<g fill="none" stroke="currentColor" stroke-width="1.1"><circle cx="24" cy="12" r="7"/><circle cx="24" cy="36" r="7"/><circle cx="12" cy="24" r="7"/><circle cx="36" cy="24" r="7"/><circle cx="24" cy="24" r="2.4"/><circle cx="0" cy="0" r="2"/><circle cx="48" cy="0" r="2"/><circle cx="0" cy="48" r="2"/><circle cx="48" cy="48" r="2"/></g>',
    glyph: '<g fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="16" cy="8" r="5.5"/><circle cx="16" cy="24" r="5.5"/><circle cx="8" cy="16" r="5.5"/><circle cx="24" cy="16" r="5.5"/><circle cx="16" cy="16" r="2"/></g>',
  },
  mideast: {
    tile: 48,
    // khatam: two squares, one rotated, making an eight-point star
    pattern: '<g fill="none" stroke="currentColor" stroke-width="1.1"><rect x="12" y="12" width="24" height="24"/><rect x="12" y="12" width="24" height="24" transform="rotate(45 24 24)"/><circle cx="24" cy="24" r="3"/></g>',
    glyph: '<g fill="none" stroke="currentColor" stroke-width="1.4"><rect x="7" y="7" width="18" height="18"/><rect x="7" y="7" width="18" height="18" transform="rotate(45 16 16)"/><circle cx="16" cy="16" r="2.2"/></g>',
  },
  spanish: {
    tile: 44,
    // azulejo: an interlaced diagonal lattice pinned at the crossings
    pattern: '<g fill="none" stroke="currentColor" stroke-width="1.1"><path d="M-4 22 22-4 48 22 22 48z"/><path d="M6 22 22 6l16 16-16 16z"/><rect x="20" y="20" width="4" height="4"/></g>',
    glyph: '<g fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 16 16 2l14 14-14 14z"/><path d="M8 16 16 8l8 8-8 8z"/></g>',
  },
};

function cuisineSlug(name) {
  const c = (name || '').toLowerCase();
  return c.includes('korean') ? 'korean'
    : c.includes('mexican') ? 'mexican'
    : c.includes('middle') ? 'mideast'
    : c.includes('spanish') ? 'spanish' : '';
}

/* the faint tiled ground, sized to whatever box it is dropped into */
function cuisineGround(slug) {
  const a = ART[slug];
  if (!a) return '';
  const id = 'p-' + slug;
  return '<svg class="ground" aria-hidden="true" focusable="false">'
    + '<defs><pattern id="' + id + '" width="' + a.tile + '" height="' + a.tile
    + '" patternUnits="userSpaceOnUse">' + a.pattern + '</pattern></defs>'
    + '<rect width="100%" height="100%" fill="url(#' + id + ')"/></svg>';
}

/* the same motif at size, as the week's emblem */
function cuisineGlyph(slug, size) {
  const a = ART[slug];
  if (!a) return '';
  const n = size || 30;
  return '<svg class="glyph" width="' + n + '" height="' + n + '" viewBox="0 0 32 32"'
    + ' aria-hidden="true" focusable="false">' + a.glyph + '</svg>';
}

/* the active week paints the accent, so the site changes character as the
   cuisine rotates. Chart series colours are not themed. */
function applyCuisineTheme() {
  try {
    const slug = cuisineSlug(weekData().cuisine);
    if (slug) document.body.dataset.cuisine = slug;
  } catch { /* pages without a week keep the default accent */ }
}

function renderChrome(active) {
  applyCuisineTheme();
  const st = resetState();
  let phase;
  if (!st.started) phase = 'Starts in ' + st.daysUntil + ' day' + (st.daysUntil === 1 ? '' : 's');
  else if (st.done) phase = 'Reset complete';
  else phase = 'Week ' + st.resetWeek + ' of ' + CONFIG.resetWeeks;

  const byFile = Object.fromEntries(PAGES.map((p) => [p.file, p]));
  const here = byFile[active] || PAGES[0];

  document.body.insertAdjacentHTML('afterbegin', `
    <header class="top">
      <div class="brand">
        <a href="index.html">Reset Kitchen</a>
        <span class="sub">cook once, eat all week</span>
        <span class="spacer"></span>
        <span class="phase">${esc(phase)}</span>
      </div>
      <nav class="tabs">
        ${PAGES.map((p) => (p.gap ? '<span class="sep"></span>' : '') +
          `<a href="${p.file}"${p.file === active ? ' aria-current="page"' : ''}>${esc(p.label)}</a>`).join('')}
      </nav>
      <details class="menu">
        <summary aria-label="Menu">
          <span class="cur">${esc(here.label)}</span>
          <span class="chev" aria-hidden="true"></span>
        </summary>
        <div class="menu-body">
          ${NAV_GROUPS.map((g) => `<div class="menu-group">
            <p class="eyebrow">${esc(g.title)}</p>
            ${g.files.map((f) => `<a href="${f}"${f === active ? ' aria-current="page"' : ''}>${esc(byFile[f].label)}</a>`).join('')}
          </div>`).join('')}
        </div>
      </details>
    </header>`);

  /* close the menu on escape or on a tap outside it */
  const menu = $('.menu');
  if (menu) {
    document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.open = false; });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') menu.open = false; });
  }

  document.body.insertAdjacentHTML('beforeend', `
    <footer class="foot">
      <p><b>Not medical advice.</b> This is a meal plan and a training schedule, written for one specific person who has done this before and had the labs to show it worked. Anyone with a diabetes or cholesterol history, and especially anyone on medication for either, should talk to their doctor before cutting carbohydrates this sharply. Glucose-lowering medication plus a sudden carb drop is the one genuinely risky combination here.</p>
      <p>Most recipes here are written out in full and need no outside link. Where one is given it goes to Korean Bapsang and was checked when this was built. Everything else on this site is stored only in this browser, nothing is uploaded anywhere.</p>
    </footer>`);
}

function weekBar(mountSel) {
  const mount = $(mountSel);
  if (!mount) return;
  const cur = selectedWeek();
  const st = resetState();
  const mon = mondayForCycleWeek(cur);
  const isNow = st.started && st.cycleWeek === cur && store.get('week', 'auto') !== 'manual-other';
  mount.className = 'weekbar';
  mount.innerHTML =
    WEEKS.map((w) => `<button data-w="${w.n}" class="${w.n === cur ? 'on' : ''}">Week ${w.n}</button>`).join('') +
    `<button data-w="auto">Now</button>` +
    `<span class="now">${esc(fmtShort(mon))} to ${esc(fmtShort(addDays(mon, 6)))}${isNow ? ' - current' : ''}</span>`;
  mount.querySelectorAll('button').forEach((b) => {
    b.onclick = () => {
      const v = b.dataset.w;
      store.set('week', v === 'auto' ? 'auto' : +v);
      location.search = v === 'auto' ? '' : '?w=' + v;
    };
  });
}

/* ---------- recipe helpers ---------- */

function recipeChip(id) {
  const r = RECIPES[id];
  if (!r) return '';
  return ` <a href="recipes.html#${id}">recipe</a>`;
}

function keepsText(r) {
  if (!r.keep) return '';
  const f = r.keep.fridge, z = r.keep.freezer;
  const fridge = !f ? 'Eat it now' : f >= 30 ? 'Fridge a month' : 'Fridge ' + f + ' day' + (f === 1 ? '' : 's');
  const frz = !z ? 'do not freeze' : 'freezer ' + z + ' month' + (z === 1 ? '' : 's');
  return fridge + ', ' + frz + '.';
}

function renderRecipeBody(id, r) {
  return `
    <div class="rbody">
      <div class="flag reset"><b>Reset version:</b> ${esc(r.reset)}</div>
      ${r.keep ? `<div class="flag keeps"><b>Keeps:</b> ${esc(keepsText(r))} <a href="freezer.html">Storage rules</a></div>` : ''}
      <h4>Ingredients</h4>
      <ul>${r.ing.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      <h4>Method</h4>
      <ol>${r.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
      ${r.variants ? `<h4>Same method, different week</h4>
      <ul>${r.variants.map((v) => `<li><b>${esc(v.for)}:</b> ${esc(v.use)}</li>`).join('')}</ul>` : ''}
      <div class="flag freeze"><b>Freezer:</b> ${esc(r.freeze)}</div>
      ${r.kid && r.kid !== 'n/a' ? `<div class="flag kid"><b>For the 8-year-old:</b> ${esc(r.kid)}</div>` : ''}
      ${r.note ? `<p class="muted">${esc(r.note)}</p>` : ''}
      ${r.link ? `<a class="src" href="${esc(r.link.url)}" target="_blank" rel="noopener">Full recipe at ${esc(r.link.site)} &rarr;</a>` : '<p class="muted">No outside link, the method above is complete.</p>'}
    </div>`;
}

/* ---------- checklist with memory ---------- */

function checklist(items, storeKey) {
  const state = store.get(storeKey, {});
  const html = `<ul class="check">${items.map((it, i) => `
    <li><label><input type="checkbox" data-i="${i}"${state[it] ? ' checked' : ''}><span>${esc(it)}</span></label></li>`).join('')}</ul>`;
  return { html, wire(root) {
    root.querySelectorAll('input[type=checkbox]').forEach((cb) => {
      cb.onchange = () => {
        const s = store.get(storeKey, {});
        const label = items[+cb.dataset.i];
        if (cb.checked) s[label] = 1; else delete s[label];
        store.set(storeKey, s);
      };
    });
  } };
}
