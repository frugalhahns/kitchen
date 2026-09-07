/* Reset Kitchen - shared logic. No dependencies, no build. */

const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const PAGES = [
  { file: 'index.html', label: 'This Week' },
  { file: 'cook.html', label: 'Cook Day' },
  { file: 'shopping.html', label: 'Shopping' },
  { file: 'recipes.html', label: 'Recipes' },
  { file: 'fuel.html', label: 'Fuel' },
  { file: 'train.html', label: 'Training' },
  { file: 'plan.html', label: 'The Plan' },
  { file: 'eatout.html', label: 'Eating Out' },
  { file: 'freezer.html', label: 'Storage' },
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

/* ---------- chrome ---------- */

function renderChrome(active) {
  const st = resetState();
  let phase;
  if (!st.started) phase = 'Starts in ' + st.daysUntil + ' day' + (st.daysUntil === 1 ? '' : 's');
  else if (st.done) phase = 'Reset complete';
  else phase = 'Week ' + st.resetWeek + ' of ' + CONFIG.resetWeeks;

  document.body.insertAdjacentHTML('afterbegin', `
    <header class="top">
      <div class="brand">
        <a href="index.html">Reset Kitchen</a>
        <span class="tag">cook once, eat all week</span>
        <span class="spacer"></span>
        <span class="phase">${esc(phase)}</span>
      </div>
      <nav class="tabs">
        ${PAGES.map((p) => `<a href="${p.file}"${p.file === active ? ' aria-current="page"' : ''}>${esc(p.label)}</a>`).join('')}
      </nav>
    </header>`);

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
