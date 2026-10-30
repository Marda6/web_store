/* ============================================================================
   ENCY Extension Store — data + interactions (prototype, no dependencies).
   Content mirrors the approved reference: 10 extensions, categories in the
   sidebar, k-formatted install counts.
   ========================================================================= */
'use strict';

/* ------------------------------ data ------------------------------------ */

const KINDS = {
  utility:  'Utility',
  operation:'Operation',
  popup:    'Operation Popup',
  global:   'Global',
};

/* the hero band is colored by category — one hue per kind, so the grid reads
   as a legend (see the reference screenshot) */
const KIND_TINT = {
  utility:  'xcard--utility',
  operation:'xcard--operation',
  popup:    'xcard--popup',
  global:   'xcard--global',
};

/* `pkg`, `requires`, `license`, `support`, `shots` and `versions` feed the
   detail window. `shots` may be empty — the gallery then falls back to a plate
   in the category color. `versions` are [version, date, minimum ENCY]. */
const EXTS = [
  { id:'camagent', name:'CamAgent — AI assistant', kind:'utility', pub:'EncySoftware',
    ver:'v3.0.2', installs:12400, likes:340, upd:'2026-07-25', tags:['assistant','AI','utility'],
    art:'i-ency', hue:'#46acff',
    pkg:'CamAgentExtension', requires:'ENCY ≥ 3.0.1-rc.27',
    license:'EncySoftware EULA', support:'support@encycam.com',
    shots:['assets/shots/st-cover3.png','assets/shots/fav-additive.png','assets/shots/fav-hellic.png'],
    versions:[['3.0.2','2026-07-25','≥ 3.0.1-rc.27'],['3.0.1','2026-06-14','≥ 3.0.0'],
      ['3.0.0','2026-05-06','≥ 3.0.0'],['2.4.1','2026-03-19','≥ 2.9.4'],
      ['2.4.0','2026-02-02','≥ 2.9.4'],['2.3.0','2025-12-11','≥ 2.9.0']],
    desc:'Starts the CamAgent AI assistant for this CAM instance',
    long:[
      'CamAgent is an AI assistant for CAM programming. You describe the job in your own words; it works the CAM system for you — opens the project, picks tools, sets up operations, calculates and simulates toolpaths, checks for collisions, and explains what it did.',
      'This extension adds a CamAgent button to the utilities. Press it and the assistant opens, already connected to the CAM instance you pressed it from.',
      { h:'What it can do' },
      { ul:[
        'Set up a project from a model: workpiece, machine, coordinate systems',
        'Recognise machining features on a part and suggest a strategy',
        'Create and edit operations, with parameters explained in plain language',
        'Calculate toolpaths, run simulation, find and diagnose collisions and gouges',
        'Pick cutting data (feeds and speeds) from the tool database and estimate cycle time and cost',
        'Answer questions about the CAM system from its own documentation',
        'Post-process and inspect the resulting NC code',
      ] },
      { h:'First run' },
      'CamAgent itself is a separate desktop application. If it is not on the machine yet, the button offers to download it (about 480 MB) and starts it for you; afterwards it keeps itself up to date. If you already have it, the button just brings its window up.',
      'A subscription or your own AI provider key is needed to chat with the assistant — it asks on first start and walks you through it.',
      { h:'Requirements' },
      { ul:[
        'Windows 10/11 (64-bit)',
        'The CAM system this extension is installed into, running on the same machine and user account',
      ] },
    ] },
  { id:'directcladding', name:'DirectCladding operation extensions', kind:'operation', pub:'EncySoftware',
    ver:'v1.1.0', installs:8100, likes:215, upd:'2026-04-20', paid:true, tags:['cladding','CAM','additive'],
    prices:[{ kind:'month', cents:1000 }, { kind:'year', cents:10000 }],
    art:'a-clad', hue:'#84ebb8',
    pkg:'DirectCladdingExtension', requires:'ENCY ≥ 3.0.0',
    license:'EncySoftware EULA', support:'support@encycam.com',
    shots:['assets/shots/fav-additive.png','assets/shots/st-cover3.png'],
    versions:[['1.1.0','2026-04-20','≥ 3.0.0'],['1.0.2','2026-02-27','≥ 2.9.4'],
      ['1.0.1','2026-01-09','≥ 2.9.4'],['1.0.0','2025-11-05','≥ 2.9.0']],
    desc:'Extensions to calculate tool path for DirectCladding',
    long:['Adds a DirectCladding solver to the operation list: single-bead and multi-layer strategies with per-layer power and feed control. Designed for DED heads on milling machines and robots.'] },
  { id:'encyextension', name:'EncyExtension', kind:'utility', pub:'EncySoftware',
    ver:'v0.1.0', installs:5700, likes:96, upd:'2026-01-15', tags:['utility','sample'],
    art:'i-ency', hue:'#84e5eb',
    pkg:'EncyExtension', requires:'ENCY ≥ 2.9.4',
    license:'MIT', support:'support@encycam.com',
    shots:[],
    versions:[['0.1.0','2026-01-15','≥ 2.9.4']],
    desc:'Describe what your extension does',
    long:['The default scaffold produced by the ENCY extension wizard. Registers one command and writes "Hello from EncyExtension" to the log — nothing more, nothing less.'] },
  { id:'popup-example', name:'Example operation popup extension on C#', kind:'popup', pub:'EncySoftware',
    ver:'v1.0.0', installs:3200, likes:41, upd:'2026-02-10', tags:['utility','sample'],
    art:'a-popup', hue:'#9584eb',
    pkg:'OperationPopupSample', requires:'ENCY ≥ 2.9.4',
    license:'MIT', support:'support@encycam.com',
    shots:['assets/shots/fav-partmore.png'],
    versions:[['1.0.0','2026-02-10','≥ 2.9.4'],['0.9.0','2025-12-18','≥ 2.9.0']],
    desc:'Example operation popup extension on C#',
    long:['Demonstrates the Operation Popup extension point: adds a custom page with its own controls to the operation dialog and stores the values in the operation parameters.'] },
  { id:'example-utility', name:'Example utility extension on C#', kind:'utility', pub:'EncySoftware',
    ver:'v1.0.3', installs:2400, likes:65, upd:'2026-05-12', tags:['utility','sample'],
    art:'a-code', hue:'#84c9eb',
    pkg:'UtilitySample', requires:'ENCY ≥ 3.0.0',
    license:'MIT', support:'support@encycam.com',
    shots:[],
    versions:[['1.0.3','2026-05-12','≥ 3.0.0'],['1.0.2','2026-03-02','≥ 2.9.4'],
      ['1.0.1','2026-01-20','≥ 2.9.4'],['1.0.0','2025-10-14','≥ 2.9.0']],
    desc:'Example utility extension on C#',
    long:['A minimal, fully commented C# utility extension. Use it as a template: it shows how to register a command, read the active project and show a result dialog.'] },
  { id:'export-info', name:'Export project information', kind:'global', pub:'EncySoftware',
    ver:'v1.0.1', installs:1800, likes:58, upd:'2026-05-30', paid:true, tags:['utility','export','reporting'],
    prices:[{ kind:'once', cents:4900 }, { kind:'month', cents:1000 }, { kind:'year', cents:10000 }],
    freeUpTo:'1.0.0',
    art:'a-export', hue:'#ebda84',
    pkg:'ProjectInfoExport', requires:'ENCY ≥ 3.0.0',
    license:'Per-workstation, 30-day trial', support:'sales@encycam.com',
    shots:['assets/shots/fav-training.png','assets/shots/st-cover3.png'],
    versions:[['1.0.1','2026-05-30','≥ 3.0.0'],['1.0.0','2026-04-08','≥ 2.9.4']],
    desc:'Export project information',
    long:['Exports project, setup, operation and tooling data into XLSX and JSON. Ships with templates for setup sheets and tool lists; custom templates can be added per company standard.',
      'Licensed per workstation; a 30-day trial starts on first run.'] },
  { id:'planar-slicing', name:'Extension for Planar slicing operations', kind:'operation', pub:'EncySoftware',
    ver:'v1.2.2', installs:1200, likes:37, upd:'2026-06-08', paid:true, tags:['CAM','fdm','additive'],
    prices:[{ kind:'once', cents:4900 }],
    art:'a-slice', hue:'#84c9eb',
    pkg:'PlanarSlicingExtension', requires:'ENCY ≥ 3.0.0',
    license:'EncySoftware EULA', support:'support@encycam.com',
    shots:['assets/shots/fav-hellic.png','assets/shots/fav-additive.png'],
    versions:[['1.2.2','2026-06-08','≥ 3.0.0'],['1.2.1','2026-04-16','≥ 3.0.0'],
      ['1.2.0','2026-03-05','≥ 2.9.4'],['1.1.0','2025-12-22','≥ 2.9.0'],
      ['1.0.0','2025-09-30','≥ 2.8.2']],
    desc:'Extension that allows you to calculate toolpath using the CuraEngine which is the part of Ultimaker Cura',
    long:['Calculates planar slicing toolpaths through CuraEngine, the slicer popular in FDM printing. Exposes the familiar profile settings (layer height, walls, infill) as operation parameters and converts the result into a native ENCY toolpath.'] },
  { id:'helloency', name:'HelloEncy', kind:'utility', pub:'kbelousov-ency',
    ver:'v0.1.0', installs:940, likes:24, upd:'2025-11-20', tags:['utility'],
    art:'a-term', hue:'#84ebb8',
    pkg:'HelloEncy', requires:'ENCY ≥ 2.9.0',
    license:'MIT', support:'kbelousov@encycam.com',
    shots:[],
    versions:[['0.1.0','2025-11-20','≥ 2.9.0']],
    desc:"Test utility: dumps the active project's path and id to a text file and opens it",
    long:["Dumps the active project's path and id to a text file and opens it in the default editor. Written as a smoke test for the utility API."] },
  { id:'import-svg', name:'Import SVG', kind:'utility', pub:'EncySoftware',
    ver:'v1.0.0', installs:610, likes:18, upd:'2026-01-28', paid:true, tags:['utility','import','svg'],
    prices:[{ kind:'once', cents:1900 }],
    art:'a-pen', hue:'#d9eb84',
    pkg:'ImportSvgExtension', requires:'ENCY ≥ 2.9.4',
    license:'EncySoftware EULA', support:'support@encycam.com',
    shots:['assets/shots/fav-partmore.png'],
    versions:[['1.0.0','2026-01-28','≥ 2.9.4'],['0.9.2','2025-11-11','≥ 2.9.0'],
      ['0.9.0','2025-09-08','≥ 2.8.2']],
    desc:'Import SVG',
    long:['Imports SVG files as sketch curves: paths, arcs and text outlines land on the selected work plane with correct scaling. Curves are grouped per SVG layer.'] },
  { id:'loading-game', name:'Loading Game', kind:'global', pub:'EncySoftware',
    ver:'v0.1.5', installs:280, likes:45, upd:'2026-06-30', paid:true, tags:['game','global'],
    prices:[{ kind:'once', cents:2900 }],
    art:'a-game', hue:'#eb84e0', cover:'assets/shots/city.svg',
    pkg:'LoadingGame', requires:'ENCY ≥ 3.0.0',
    license:'MIT', support:'support@encycam.com',
    shots:['assets/shots/fav-training.png'],
    versions:[['0.1.5','2026-06-30','≥ 3.0.0'],['0.1.4','2026-05-21','≥ 3.0.0'],
      ['0.1.0','2026-04-02','≥ 2.9.4']],
    desc:'A game for the wait: a milling cutter jumps over parts while ENCY calculates toolpaths',
    long:['While a long toolpath calculation is running, press Space: a milling cutter starts jumping over incoming parts and fixtures. The score is saved per project, so your team can compete while the solver works.'] },
];

const PUBS = ['EncySoftware','kbelousov-ency'];

const SORTS = [
  { id:'popular', label:'Popular' },
  { id:'updated', label:'Recently updated' },
  { id:'name',    label:'Name' },
];

const CATS = [
  { id:'all',      label:'All' },
  { id:'utility',  label:'Utility' },
  { id:'operation',label:'Operation' },
  { id:'popup',    label:'Operation Popup' },
  { id:'global',   label:'Global' },
];

/* ------------------------------ state ----------------------------------- */

const state = {
  cat:'all', price:'all', tags:new Set(), pub:'', query:'', tagQuery:'',
  sort:'popular', view:'grid', detail:null, page:'store', acct:'profile',
  /* scope + favsOnly narrow what the list is drawn from; the sidebar filters
     then work inside that. `filters` is whether the sidebar is shown at all. */
  scope:'all', favsOnly:false, filters:true, shot:0, aboutOpen:false,
  range:30, repoFilter:'all', eventKind:'all', eventQuery:'', chartTable:false, modSel:null,
  favs:new Set(['directcladding','export-info']),
  installed:new Set(),
  liked:new Set(),
  /* paid extensions this account holds a licence for: id → the day it was bought */
  owned:new Map([['planar-slicing', '2026-08-12'], ['directcladding', '2026-09-02']]),
  plan:null, priceFor:null, priceDraft:null, pkgSel:null, pkgScope:'all',
  way:'github', /* which publish route is picked on the publish page */
};

/* ------------------------------ helpers --------------------------------- */

const $ = (s, r) => (r || document).querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c =>
  ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}
/* the three ways an extension is sold; the yearly one is always ten monthly
   payments, so the author never types it */
const PLAN = {
  once: { label:'One-time', suffix:'',    note:'One payment, no renewals.' },
  month:{ label:'Monthly',  suffix:'/mo', note:'Renews every month — cancel any time in My subscriptions.' },
  year: { label:'Yearly',   suffix:'/yr', note:'Renews every year — ten monthly payments, two months free.' },
};
/* 4900 → $49, 1050 → $10.50 */
function fmtMoney(cents) {
  return '$' + (cents % 100 ? (cents / 100).toFixed(2) : String(cents / 100));
}
function priceTag(p) { return fmtMoney(p.cents) + PLAN[p.kind].suffix; }
/* the one label a card has room for: the cheapest plan, "from" when there are more */
function cardPrice(e) {
  if (!e.prices) return 'Paid';
  const low = [...e.prices].sort((a, b) => a.cents - b.cents)[0];
  return (e.prices.length > 1 ? 'from ' : '') + priceTag(low);
}

/* 12400 → 12.4k, 940 → 940 */
function fmtK(n) {
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(n);
}

/* tag vocabulary derives from the data: count desc, then alphabetical */
function tagVocab() {
  const map = new Map();
  for (const e of EXTS) for (const t of e.tags) map.set(t, (map.get(t) || 0) + 1);
  return [...map.entries()].sort((a, b) =>
    b[1] - a[1] || a[0].toLowerCase().localeCompare(b[0].toLowerCase()));
}
function catCount(id) {
  return id === 'all' ? EXTS.length : EXTS.filter(e => e.kind === id).length;
}

/* how many sidebar filters are currently narrowing the list — shown on the
   funnel so a hidden panel never silently withholds results */
function filterCount() {
  return (state.cat !== 'all' ? 1 : 0) + (state.price !== 'all' ? 1 : 0)
    + (state.pub ? 1 : 0) + state.tags.size;
}

function filtered() {
  const q = state.query.trim().toLowerCase();
  let list = EXTS.filter(e => {
    if (state.scope === 'installed' && !state.installed.has(e.id)) return false;
    if (state.favsOnly && !state.favs.has(e.id)) return false;
    if (state.cat !== 'all' && e.kind !== state.cat) return false;
    if (state.price === 'free' && e.paid) return false;
    if (state.price === 'paid' && !e.paid) return false;
    if (state.pub && e.pub !== state.pub) return false;
    if (state.tags.size) {
      let hit = false;
      for (const t of state.tags) if (e.tags.includes(t)) { hit = true; break; }
      if (!hit) return false;
    }
    if (q) {
      const hay = `${e.name} ${e.desc} ${e.pub} ${e.tags.join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  if (state.sort === 'popular') list.sort((a, b) => b.installs - a.installs);
  if (state.sort === 'updated') list.sort((a, b) => b.upd.localeCompare(a.upd));
  if (state.sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
  return list;
}

/* install/uninstall, shared by the cards, the rows and the detail window */
function toggleInstall(id) {
  const e = EXTS.find(x => x.id === id);
  if (!e) return;
  if (state.installed.has(id)) {
    state.installed.delete(id); e.installs -= 1;
    toast(`${e.name} uninstalled`);
  } else {
    state.installed.add(id); e.installs += 1;
    toast(`${e.name} installed`);
  }
}

function toggleLike(id) {
  const e = EXTS.find(x => x.id === id);
  if (!e) return;
  if (state.liked.has(id)) { state.liked.delete(id); e.likes -= 1; }
  else { state.liked.add(id); e.likes += 1; }
}

let toastTimer = null;
function toast(msg) {
  const el = $('#toast');
  el.innerHTML = `<svg><use href="#i-box"/></svg>${esc(msg)}`;
  el.classList.add('is-shown');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-shown'), 2200);
}

/* popover anchoring (fixed, flips up when short on space) */
function openMenu(menu, anchor) {
  closeMenus();
  menu.hidden = false;
  const a = anchor.getBoundingClientRect();
  const m = menu.getBoundingClientRect();
  let left = Math.min(a.left, innerWidth - m.width - 8);
  let top = a.bottom + 4;
  if (top + m.height > innerHeight - 8) top = a.top - m.height - 4;
  menu.style.left = `${Math.max(8, left)}px`;
  menu.style.top = `${Math.max(8, top)}px`;
}
function closeMenus() {
  document.querySelectorAll('.hmenu').forEach(m => { m.hidden = true; });
}

/* ------------------------------ sidebar --------------------------------- */

function renderCatRows() {
  $('#catRows').innerHTML = CATS.map(c => `
    <button class="frow ${state.cat === c.id ? 'is-on' : ''}" data-cat="${c.id}">
      <span class="frow__radio"></span><span>${c.label}</span>
      <i class="frow__cnt">${catCount(c.id)}</i>
    </button>`).join('');
}

/* three mutually exclusive values, so a segmented track rather than a list.
   NB: named renderPriceFilter because Igor's paid build also has a
   renderPrice — the price-editing window — and the later declaration used
   to shadow this one, leaving the sidebar filter empty */
function renderPriceFilter() {
  const rows = [
    { id:'all', label:'All' },
    { id:'free', label:'Free' },
    { id:'paid', label:'Paid' },
  ];
  $('#priceRows').innerHTML = rows.map(r => `
    <button class="${state.price === r.id ? 'is-on' : ''}" data-price="${r.id}">${r.label}</button>`).join('');
}

function renderTags() {
  const q = state.tagQuery.trim().toLowerCase();
  const vocab = tagVocab();
  $('#tagCnt').textContent = vocab.length;
  const tags = vocab.filter(([t]) => !q || t.toLowerCase().includes(q));
  $('#tagRows').innerHTML = tags.map(([t, n]) => `
    <button class="frow ${state.tags.has(t) ? 'is-on' : ''}" data-tag="${esc(t)}">
      <span class="frow__check"><svg><use href="#i-check-b"/></svg></span>
      <span>${esc(t)}</span><i class="frow__cnt">${n}</i>
    </button>`).join('')
    || `<div class="side__label" style="margin-top:4px">No tags match</div>`;
}

function renderPubMenu() {
  const opts = ['', ...PUBS];
  $('#pubMenu').innerHTML = opts.map(p => `
    <button class="${state.pub === p ? 'is-checked' : ''}" data-pub="${esc(p)}">
      <svg class="ck"><use href="#i-check"/></svg>${p ? esc(p) : 'All publishers'}
    </button>`).join('');
  $('#pubSelectLabel').textContent = state.pub || 'All publishers';
}

/* ------------------------------ content --------------------------------- */

function starBtn(e) {
  const on = state.favs.has(e.id);
  return `<span class="xstar ${on ? 'is-on' : ''}" data-star="${e.id}"
    title="${on ? 'Remove from favorites' : 'Add to favorites'}" role="button">
    <svg><use href="#${on ? 'i-star-fill' : 'i-star'}"/></svg></span>`;
}

function tagChips(e, max) {
  const shown = e.tags.slice(0, max);
  const rest = e.tags.length - shown.length;
  return shown.map(t => `<span class="xtag">${esc(t)}</span>`).join('')
    + (rest > 0 ? `<span class="xtag xtag--more">More ${rest}</span>` : '');
}

/* like: a quiet inline stat next to the install count that also toggles */
function likeBtn(e) {
  const on = state.liked.has(e.id);
  return `<span class="xlike ${on ? 'is-on' : ''}" role="button" data-like="${e.id}"
    title="${on ? 'Remove like' : 'Like'}">
    <svg><use href="#${on ? 'i-like-fill' : 'i-like'}"/></svg>${fmtK(e.likes)}</span>`;
}

/* paid extensions lead to the details page, and the button wears the price —
   the cost sits right where you act; free ones install in place */
function actionBtn(e) {
  if (e.paid && !state.installed.has(e.id))
    /* the lowest plan alone fits the narrow card foot; "from …" moves to the
       tooltip, and the details page lists every plan */
    return `<span class="xinstall xinstall--price" role="button" title="${esc(cardPrice(e))}">${
      esc(e.prices ? priceTag([...e.prices].sort((a, b) => a.cents - b.cents)[0]) : 'Paid')}</span>`;
  const on = state.installed.has(e.id);
  return `<span class="xinstall ${on ? 'is-on' : ''}" role="button" data-install="${e.id}">
    ${on ? '<svg><use href="#i-check"/></svg>Installed' : 'Install'}</span>`;
}

/* the price pill: what it costs, not just that it does */
function paidTag(e) {
  return e.paid ? `<span class="paidtag">${esc(cardPrice(e))}</span>` : '';
}

function card(e) {
  const tint = `xcard--tint ${KIND_TINT[e.kind] || ''}`;
  /* an optional cover sits under the hero tint; the tint then thins into a
     gradient so the artwork shows through while the name keeps its plate */
  const cover = e.cover ? ` style="--cover:url('${esc(e.cover)}')"` : '';
  return `
  <button class="xcard ${tint} ${e.cover ? 'xcard--cover' : ''}" style="--xc:${e.hue}" data-id="${e.id}">
    <span class="xcard__hero"${cover}>
      <span class="xcard__hrow">
        <span class="xlogo xcard__logo"><svg><use href="#${e.art}"/></svg></span>
        <span class="xcard__htext">
          <span class="xcard__name">${esc(e.name)}</span>
          <span class="xcard__by">${esc(e.ver)}<i class="xcard__bysep"></i>by ${esc(e.pub)}</span>
        </span>
      </span>
      <span class="xcard__tags">${tagChips(e, 3)}</span>
    </span>
    <span class="xcard__desc">${esc(e.desc)}</span>
    <span class="xcard__foot">
      <span class="xcard__kind">${KINDS[e.kind]}</span>
      <span class="xcard__fsep"></span>
      <span class="xcard__inst" title="Installs"><svg><use href="#i-download"/></svg>${fmtK(e.installs)}</span>
      ${likeBtn(e)}
      <span class="xcard__fspacer"></span>
      ${starBtn(e)}
      ${actionBtn(e)}
    </span>
  </button>`;
}

function row(e) {
  return `
  <button class="xrow" style="--xc:${e.hue}" data-id="${e.id}">
    <span class="xlogo"><svg><use href="#${e.art}"/></svg></span>
    <span class="xrow__text">
      <span class="xrow__line1">
        <span class="xrow__name">${esc(e.name)}</span>
      </span>
      <span class="xrow__desc">${esc(e.ver)} · by ${esc(e.pub)} — ${esc(e.desc)}</span>
    </span>
    <span class="xrow__kind">${KINDS[e.kind]}</span>
    <span class="xrow__inst" title="Installs"><svg><use href="#i-download"/></svg>${fmtK(e.installs)}</span>
    ${likeBtn(e)}
    ${starBtn(e)}
    ${actionBtn(e)}
  </button>`;
}

function renderList() {
  const list = filtered();
  if (!list.length) {
    $('#storeBody').innerHTML = `
      <div class="empty"><svg><use href="#i-box"/></svg>
        <b>No extensions found</b><span>Try clearing the search or filters</span></div>`;
    return;
  }
  $('#storeBody').innerHTML = state.view === 'grid'
    ? `<div class="xgrid">${list.map(card).join('')}</div>`
    : `<div class="xlist">${list.map(row).join('')}</div>`;
}

/* ------------------------------ details --------------------------------- */

/* Screenshot carousel. With no shots at all it falls back to a plate in the
   category color carrying the extension's glyph — the same recipe that tints
   the card heroes, so an extension without pictures still looks like itself. */
function gallery(e) {
  const shots = e.shots || [];
  if (!shots.length) return `
    <div class="dgal">
      <div class="dgal__stage dgal__stage--empty xcard--tint ${KIND_TINT[e.kind] || ''}">
        <svg class="dgal__glyph"><use href="#${e.art}"/></svg>
        <span class="dgal__none">No screenshots</span>
      </div>
    </div>`;
  const i = Math.min(state.shot, shots.length - 1);
  return `
  <div class="dgal">
    <div class="dgal__stage">
      <div class="dgal__track" style="transform:translateX(${-i * 100}%)">
        ${shots.map(src => `<div class="dgal__slide"><img src="${esc(src)}" alt=""></div>`).join('')}
      </div>
      ${shots.length > 1 ? `
        <button class="dgal__nav is-prev" data-shot="${i - 1}" ${i ? '' : 'disabled'}
          title="Previous"><svg><use href="#i-back"/></svg></button>
        <button class="dgal__nav is-next" data-shot="${i + 1}" ${i < shots.length - 1 ? '' : 'disabled'}
          title="Next"><svg><use href="#i-chev"/></svg></button>
        <span class="dgal__cnt">${i + 1} / ${shots.length}</span>` : ''}
    </div>
    ${shots.length > 1 ? `
      <div class="dgal__thumbs">${shots.map((src, j) => `
        <button class="dgal__th ${j === i ? 'is-on' : ''}" data-shot="${j}">
          <img src="${esc(src)}" alt=""></button>`).join('')}</div>` : ''}
  </div>`;
}

/* `long` is authored as a list of blocks so a README can keep its shape:
   a plain string is a paragraph, {h} a sub-heading, {ul} a bullet list. */
function aboutBody(e) {
  const blocks = e.long || [e.desc];
  return blocks.map(b => {
    if (typeof b === 'string') return `<p>${esc(b)}</p>`;
    if (b.h)  return `<h4 class="dsub">${esc(b.h)}</h4>`;
    if (b.ul) return `<ul class="dlist">${b.ul.map(li => `<li>${esc(li)}</li>`).join('')}</ul>`;
    return '';
  }).join('');
}

/* Install row: the main action, the package file as a square beside it (the
   same plate as the star), and the star. */
function installRow(e) {
  return `
  <div class="dact">
    ${state.installed.has(e.id)
      ? `<button class="btn-secondary dact__btn" data-install="${e.id}"><svg><use href="#i-check"/></svg>Installed</button>`
      : `<button class="btn-primary dact__btn" data-install="${e.id}"><svg><use href="#i-download"/></svg>Install</button>`}
    <button class="dact__icon" data-dact="nupkg"
      title="Download .nupkg — install it from a file, or take it to a machine without internet">
      <svg><use href="#i-box"/></svg></button>
    ${starBtn(e)}
  </div>`;
}

/* The top of the sidebar. A paid extension leads with the purchase until it is
   owned: the plan switch (three mutually exclusive values, so a segmented track,
   as for the Price filter), one button that names what it buys, and the terms
   of that plan in one line. Owned, it reads like a free one, with a quiet note
   saying why Install is there. */
function actBlock(e) {
  const since = state.owned.get(e.id);
  if (!e.prices || since) {
    return installRow(e) + (since ? `
      <div class="downed"><svg><use href="#i-check-circle"/></svg>You own it — bought ${fmtDate(since)}</div>` : '');
  }
  const sel = e.prices.find(p => p.kind === state.plan) || e.prices[0];
  return `
  <div class="dbuy">
    ${e.prices.length > 1 ? `
      <div class="segmented segmented--full">${e.prices.map(p => `
        <button class="${p === sel ? 'is-on' : ''}" data-plan="${p.kind}">${PLAN[p.kind].label}</button>`).join('')}
      </div>` : ''}
    <div class="dact">
      <button class="btn-primary dact__btn" data-buy="${sel.kind}">
        <svg><use href="#i-card"/></svg>${sel.kind === 'once' ? 'Buy' : 'Subscribe'} · ${priceTag(sel)}</button>
      ${starBtn(e)}
    </div>
    <p class="dbuy__note">${PLAN[sel.kind].note} Payment goes through Stripe — we never see your card.</p>
    ${e.freeUpTo ? `
      <div class="dfree">
        <span>v${esc(e.freeUpTo)} came out before the price and stays free.</span>
        <button class="publink" data-install="${e.id}">Install v${esc(e.freeUpTo)}</button>
      </div>` : ''}
  </div>`;
}

function renderDetail() {
  const win = $('#detailWin');
  const e = state.detail && EXTS.find(x => x.id === state.detail);
  if (!e) { win.hidden = true; return; }
  const wasHidden = win.hidden;
  win.hidden = false;
  $('#dCap').textContent = e.pkg || e.name;

  $('#detailBody').innerHTML = `
  <div class="dhero">
    <span class="xlogo dhero__logo" style="--xc:${e.hue}"><svg><use href="#${e.art}"/></svg></span>
    <div class="dhero__text">
      <h2 class="dhero__name">${esc(e.name)}${paidTag(e)}</h2>
      <div class="dhero__meta">
        <span class="dcat ${KIND_TINT[e.kind] || ''}">${KINDS[e.kind]}</span>
        <span>${esc(e.ver)}</span><i class="dhero__sep"></i>
        <span>by ${esc(e.pub)}</span><i class="dhero__sep"></i>
        <span class="dhero__dl"><svg><use href="#i-download"/></svg>${fmtK(e.installs)}</span>
        ${likeBtn(e)}
      </div>
      <p class="dhero__sum">${esc(e.desc)}</p>
    </div>
  </div>
  <div class="dwin__hr"></div>

  <div class="dbody">
    <div class="dmain">
      ${gallery(e)}
      <div class="dblock">
        <div class="dblock__h">About</div>
        <div class="dclamp ${state.aboutOpen ? 'is-open' : ''}" id="dAbout">
          ${aboutBody(e)}
        </div>
        <button class="dmore" id="dMore" hidden></button>
      </div>
    </div>

    <aside class="dside">
      ${actBlock(e)}

      <div class="dsect">
        <div class="dsect__h">Details</div>
        <div class="dcard">
          <div class="drow"><span class="drow__k">Package id</span>
            <span class="drow__v">${esc(e.pkg)}</span>
            <button class="acticon" data-dact="copy-pkg" title="Copy package id"><svg><use href="#i-clip"/></svg></button>
          </div>
          <div class="drow"><span class="drow__k">Price</span><span class="drow__v">${
            e.prices ? e.prices.map(priceTag).join(' · ') : e.paid ? 'Paid' : 'Free'}</span></div>
          <div class="drow"><span class="drow__k">Last updated</span><span class="drow__v">${fmtDate(e.upd)}</span></div>
          <div class="drow"><span class="drow__k">Requires</span><span class="drow__v">${esc(e.requires)}</span></div>
          <div class="drow"><span class="drow__k">License</span><span class="drow__v">${esc(e.license)}</span></div>
          <div class="drow"><span class="drow__k">Support</span><span class="drow__v">${esc(e.support)}</span></div>
        </div>
      </div>

      ${e.tags.length ? `
        <div class="dsect">
          <div class="dsect__h">Tags</div>
          <div class="dtags">${e.tags.map(t => `
            <button class="xtag" data-dtag="${esc(t)}" title="Show extensions tagged ${esc(t)}">${esc(t)}</button>`).join('')}</div>
        </div>` : ''}

      <div class="dsect">
        <div class="dsect__h">Version history</div>
        <div class="dcard">
          <div class="dvh">${e.versions.map(([v, when, req]) => `
            <div class="dvh__row ${v === e.ver.replace(/^v/, '') ? 'is-current' : ''}">
              <span class="dvh__v">${esc(v)}</span>
              <span class="dvh__d">${fmtDate(when)}</span>
              <span class="dvh__r">${esc(req)}</span>
            </div>`).join('')}</div>
        </div>
      </div>
    </aside>
  </div>`;

  if (wasHidden) $('#detailBody').scrollTop = 0;
  /* the sticky sidebar caps itself against the scroller, not the viewport —
     the window is smaller than the screen */
  const sc = $('#detailBody');
  sc.style.setProperty('--dwin-scroll-h', sc.clientHeight + 'px');
  /* the clamp only earns a "Read more" when the text actually overflows it */
  const about = $('#dAbout'), more = $('#dMore');
  const over = about.scrollHeight > about.clientHeight;
  about.classList.toggle('is-clipped', over);
  more.hidden = !over && !state.aboutOpen;
  more.textContent = state.aboutOpen ? 'Show less' : 'Read more';
}

/* ------------------------------ account --------------------------------- */

/* the signed-in user; roles drive which sections exist (admin ones are not
   part of this prototype yet) */
const ME = {
  email:'ruslan.m@encycam.io', username:'ruslan.m', name:'Ruslan Mardanshin',
  company:'ENCY SOFTWARE LTD', roles:['Admin','Customer'], joined:'2026-07-27',
  github:null,                       /* null = not linked yet */
};

/* the nav is one list; `admin:true` rows only render for admins and sit under
   an ADMIN label */
const ACCT_NAV = [
  { id:'profile',   label:'Profile',      icon:'i-user' },
  { id:'published', label:'My published', icon:'i-store' },
  { id:'developer', label:'Developer',    icon:'i-dev' },
  { id:'earnings',  label:'Earnings',     icon:'i-coins', when:() => !!DEV.paid },
  { id:'licenses',  label:'My licenses',  icon:'i-award' },
  { id:'payments',  label:'My payments',  icon:'i-card' },
  { id:'subscriptions', label:'My subscriptions', icon:'i-refresh' },
  { id:'stats',     label:'Statistics',   icon:'i-chart',   admin:true },
  { id:'moderation',label:'Moderation',   icon:'i-gavel',   admin:true },
  { id:'signing',   label:'Signing',      icon:'i-shield',  admin:true },
  { id:'packages',  label:'Packages',     icon:'i-box',     admin:true },
  { id:'people',    label:'People',       icon:'i-people',  admin:true },
  { id:'repos',     label:'Repositories', icon:'i-github',  admin:true },
  { id:'events',    label:'Events',       icon:'i-history', admin:true },
];

/* what this account has published — id points back into the catalog */
const MY_PUBLISHED = [
  { ext:'helloency',  state:'published',  ver:'v0.1.0', when:'2025-11-20' },
  { ext:'import-svg', state:'published',  ver:'v1.0.0', when:'2026-01-28' },
  { ext:'popup-example', state:'moderation', ver:'v1.0.0', when:'2026-02-10' },
];

/* every licence ever issued, newest first; one extension can have several (a
   trial, then a purchase) — the section shows the one that matters now */
const MY_LICENSES = [
  { ext:'directcladding', type:'paid',  until:'2026-11-02', active:true },
  { ext:'export-info',    type:'paid',  until:'2026-09-02', active:false },
  { ext:'planar-slicing', type:'paid',  until:null,         active:true },
  { ext:'loading-game',   type:'trial', until:'2026-10-09', active:true },
  { ext:'export-info',    type:'trial', until:'2026-08-12', active:false },
  { ext:'planar-slicing', type:'trial', until:'2026-08-10', active:false },
];

/* what the account paid, newest first. `open` is a checkout left unfinished —
   kept, but muted: nothing was charged */
const MY_ORDERS = [
  { ext:'directcladding', kind:'month', cents:1000,  when:'2026-10-02', status:'paid' },
  { ext:'directcladding', kind:'month', cents:1000,  when:'2026-09-02', status:'paid' },
  { ext:'export-info',    kind:'once',  cents:4900,  when:'2026-08-28', status:'open' },
  { ext:'planar-slicing', kind:'once',  cents:4900,  when:'2026-08-12', status:'paid' },
  { ext:'export-info',    kind:'month', cents:1000,  when:'2026-08-02', status:'paid' },
];

const MY_SUBS = [
  { ext:'directcladding', kind:'month', cents:1000, state:'active',    next:'2026-11-02' },
  { ext:'export-info',    kind:'month', cents:1000, state:'ended',     next:null, ended:'2026-09-02' },
];

/* ------------------------------ persona --------------------------------- */

/* Two accounts to look at: the seasoned demo one, and a brand-new one that has
   bought and published nothing and is not a developer yet. `?new` in the
   address opens the new one; the account menu switches between them. */
const NEWBIE = new URLSearchParams(location.search).has('new')
  || localStorage.getItem('ency-persona') === 'new';

if (NEWBIE) {
  Object.assign(ME, { email:'alex.morgan@example.com', username:'alex.morgan', name:'Alex Morgan',
    company:'', roles:['Customer'], joined:'2026-10-29' });
  [MY_PUBLISHED, MY_LICENSES, MY_ORDERS, MY_SUBS].forEach(a => { a.length = 0; });
  state.favs.clear();
  state.owned.clear();
}

/* the documents a developer accepts, in the order the store lists them */
const LEGAL = [
  ['Developer Agreement', '1.0'], ['Publishing Policy', '1.0'],
  ['Schedule A — Reserved Functionality', '1.0'], ['Schedule B — Technical Requirements', '1.0'],
  ['Schedule C — Enforcement and Appeals', '1.0'], ['Commercial Terms', '1.0'],
  ['SDK Licence Terms', '1.0'], ['Trade Mark Guidelines', '1.0'],
];

/* Schedule A areas that an extension may still offer behind an ENCY licence */
const RESERVED = [
  ['A-01a', '2.5D and 3-axis milling', 'ENCY Mill (3-Axis)'],
  ['A-01b', '3+2 indexed milling', 'ENCY Mill 3+2'],
  ['A-01c', 'Simultaneous 4/5-axis milling', 'ENCY 5-Axis Mill'],
  ['A-03', 'Turning and mill-turn', 'ENCY Turn / Mill-Turn'],
  ['A-04', 'Wire and die-sink EDM', 'ENCY EDM'],
  ['A-05', 'Nesting', 'ENCY Nesting'],
  ['A-06', 'Additive and hybrid', 'ENCY Additive'],
  ['A-08', 'Robot offline programming', 'ENCY Robot'],
  ['A-09', 'Robot kinematics and axis configuration', 'ENCY Robot'],
  ['A-10', 'External axes and positioners', 'ENCY Robot'],
  ['A-11', 'Machine model and digital twin', 'MachineMaker'],
  ['A-18', 'Machining-parameter optimisation', 'ENCY Tuner'],
  ['A-19', 'High-performance computation services', 'ENCY Hyper'],
];

const DECLARATIONS = [
  'This extension does not let a user obtain any capability that ENCY licenses separately without holding the matching ENCY licence, including a capability of a higher tier than the licence the user holds. <i>(Publishing Policy §4.2)</i>',
  'Neither I nor anyone acting with me distributes, through any channel, anything that adds, unlocks or installs capabilities in this extension, or in ENCY, outside the ENCY Extension Store. <i>(Publishing Policy §4.9, §4.10)</i>',
  'The information in this submission is complete and accurate, and matches what the extension does and its manifest. <i>(Publishing Policy §5.1A)</i>',
];

const ISO = ('AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ '
  + 'CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR '
  + 'GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP '
  + 'KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT '
  + 'MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW '
  + 'SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG '
  + 'UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW').split(' ');
const REGION = new Intl.DisplayNames(['en'], { type:'region' });
const COUNTRIES = ISO.map(c => [c, REGION.of(c)]).sort((a, b) => a[1].localeCompare(b[1]));
const countryName = c => (c ? REGION.of(c) : '');

/* dialling codes for the phone field; a country missing here is picked by hand */
const DIAL = { US:'1', CA:'1', GB:'44', IE:'353', DE:'49', FR:'33', IT:'39', ES:'34', PT:'351', NL:'31',
  BE:'32', LU:'352', AT:'43', CH:'41', DK:'45', SE:'46', NO:'47', FI:'358', IS:'354', PL:'48', CZ:'420',
  SK:'421', HU:'36', SI:'386', HR:'385', RO:'40', BG:'359', GR:'30', CY:'357', MT:'356', EE:'372',
  LV:'371', LT:'370', LI:'423', RS:'381', TR:'90', UA:'380', RU:'7', KZ:'7', BY:'375', AM:'374',
  GE:'995', AZ:'994', UZ:'998', IL:'972', AE:'971', IN:'91', CN:'86', JP:'81', KR:'82', SG:'65',
  AU:'61', NZ:'64', BR:'55', MX:'52', AR:'54', ZA:'27' };

/* where Stripe Connect pays out: the US, the UK, the EEA, Canada and Switzerland */
const CONNECT = new Set(('US GB CA CH AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI '
  + 'ES SE IS LI NO').split(' '));

/* The developer record. The demo account registered long ago; the new one
   starts empty, and every step it saves survives a reload. */
const DEV_KEY = 'ency-dev-new';
function devBlank() {
  return { stage:'newcomer', step:0, tried:false, ret:'',
    type:'', profile:'', name:ME.name, country:'', code:'', codeByHand:false, phone:'',
    publicName:'', position:'', authority:false,
    co:{ legal:'', country:'', reg:'', address:'', control:'', vat:'', web:'' },
    tick:false, accepted:null, paid:'', payouts:'none', justAgreed:false, pubs:[] };
}
const DEV = NEWBIE
  ? Object.assign(devBlank(), JSON.parse(localStorage.getItem(DEV_KEY) || '{}'))
  : Object.assign(devBlank(), { stage:'done', type:'company', profile:'paid', country:'CY', code:'CY',
      phone:'99 123456', publicName:'ENCY', position:'Product manager', authority:true,
      co:{ legal:'ENCY SOFTWARE LTD', country:'CY', reg:'HE 412345', address:'Limassol, Cyprus',
        control:'CY', vat:'CY10412345X', web:'https://encycam.com' },
      tick:true, accepted:'2026-07-27', paid:'enabled', payouts:'done' });
if (NEWBIE) DEV.pubs.forEach(p => MY_PUBLISHED.push(p));
function saveDev() { if (NEWBIE) localStorage.setItem(DEV_KEY, JSON.stringify(DEV)); }
const isDeveloper = () => DEV.stage === 'done';

const ROLE_TONE = { Admin:'is-admin', Customer:'is-customer', Publisher:'is-publisher' };

function acctProfile() {
  return `
  <div class="acard">
    <div class="acct__factgrid">
      <div class="fact"><div class="fact__label">Email</div><div class="fact__value">${esc(ME.email)}</div></div>
      <div class="fact">
        <div class="fact__label">Roles</div>
        <div class="fact__value">
          ${ME.roles.map(r => `<span class="roletag ${ROLE_TONE[r] || ''}">${esc(r)}</span>`).join('')}
          <button class="acct__hint" data-aact="roles">what these mean</button>
        </div>
      </div>
      <div class="fact"><div class="fact__label">Username</div><div class="fact__value">${esc(ME.username)}</div></div>
      <div class="fact"><div class="fact__label">Joined</div><div class="fact__value">${fmtDate(ME.joined)}</div></div>
    </div>
    <div class="acct__proffoot">
      <button class="btn-secondary" data-aact="logout"><svg><use href="#i-logout"/></svg>Logout</button>
    </div>
  </div>

  <div class="acard">
    <div class="ghcols">
      <div class="ghintro">
        <div class="acard__head">
          <svg class="acard__icon"><use href="#i-github"/></svg>
          <h2 class="acard__title">Publishing from GitHub</h2>
        </div>
        <p class="acard__lead">Extensions publish straight from your repositories — no passwords or
          tokens ever land in the code. <button class="publink" data-aact="steps">All the steps</button></p>
        <p class="acct__warn"><svg><use href="#i-warn"/></svg>GitHub links whoever you are signed in as there, not who you are
          here. Check that first, or use a private window — a personal account already linked to somebody else moves to you.</p>
      </div>

      <div class="ghways">
        <div class="ghopt ghopt--split">
          <div class="ghopt__text">
            <div class="ghopt__title">Link your GitHub account</div>
            <div class="ghopt__sum">Once, and then every repository of yours can publish — nothing to connect per project.</div>
          </div>
          <button class="btn-primary ghopt__cta" data-aact="github"><svg><use href="#i-github"/></svg>Sign in with GitHub</button>
        </div>
        <div class="ghopt ghopt--split">
          <div class="ghopt__text">
            <div class="ghopt__title">Or connect one repository</div>
            <div class="ghopt__sum">Without linking the account — only the repository you paste here can publish.</div>
          </div>
          <div class="acct__connect">
            <input class="field" id="repoField" type="text" placeholder="paste the repository link" />
            <button class="btn-secondary" data-aact="connect" disabled>Connect</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

const PUB_STATE = {
  published: { label:'published',     tone:'is-ok' },
  moderation:{ label:'on moderation', tone:'is-wait' },
  rejected:  { label:'rejected',      tone:'is-bad' },
};

function acctPublished() {
  if (!MY_PUBLISHED.length) {
    return emptyCard('Nothing published yet — the Publish button in the header walks you through it.',
      'publish', 'i-upload', 'Publish an extension');
  }
  return `
  <div class="acard acard--flush">
    <table class="atable">
      <thead><tr><th>Extension</th><th>Version</th><th>Published</th><th>Price</th><th>State</th><th></th></tr></thead>
      <tbody>${MY_PUBLISHED.map(p => {
        const e = EXTS.find(x => x.id === p.ext) || {};
        const st = PUB_STATE[p.state];
        return `<tr>
          <td>
            <span class="atable__id">
              <span class="xlogo atable__logo" style="--xc:${e.hue || '#8a9299'}"><svg><use href="#${e.art || 'a-puzzle'}"/></svg></span>
              <span class="atable__idtext">
                <span class="atable__name" ${e.id ? `data-aopen="${p.ext}"` : ''}>${esc(e.name || p.name || p.ext)}</span>
                <span class="atable__sub">${esc(KINDS[e.kind] || p.pkg || '')}</span>
              </span>
            </span>
          </td>
          <td>${esc(p.ver)}</td>
          <td>${fmtDate(p.when)}</td>
          <td>${e.id ? `<button class="selectish pricesel ${e.prices ? '' : 'is-free'}" data-aprice="${p.ext}" title="Change the price">
            <span>${e.prices ? e.prices.map(priceTag).join(' · ') : 'Free'}</span><svg><use href="#i-chevdown"/></svg></button>`
            : `<span class="acct__aside">${p.paid ? 'Paid · price not set' : 'Free'}</span>`}</td>
          <td><span class="statetag ${st.tone}">${st.label}</span></td>
          <td class="atable__act">
            <button class="acticon" data-aact="open-repo" title="Open repository"><svg><use href="#i-ext"/></svg></button>
          </td>
        </tr>`;
      }).join('')}</tbody>
    </table>
  </div>`;
}

/* the name cell every money table shares: identity plate, name, category */
function extCell(id, sub) {
  const e = EXTS.find(x => x.id === id) || REQUESTS.find(x => x.id === id) || {};
  return `
  <span class="atable__id">
    <span class="xlogo atable__logo" style="--xc:${e.hue || '#8a9299'}"><svg><use href="#${e.art || 'a-puzzle'}"/></svg></span>
    <span class="atable__idtext">
      <span class="atable__name" data-aopen="${id}">${esc(e.name || id)}</span>
      <span class="atable__sub">${sub ?? (KINDS[e.kind] || '')}</span>
    </span>
  </span>`;
}

/* days until a date, for the trial countdown */
function daysTo(iso) {
  return Math.max(0, Math.ceil((new Date(iso + 'T00:00:00') - TODAY) / 86400000));
}
const TODAY = new Date('2026-10-06T00:00:00');

/* One row per extension: the licence that matters now — a live one first,
   else the newest. Earlier ones are counted, not listed; the payments say
   what was bought when. */
function currentLicenses() {
  const byExt = new Map();
  for (const l of MY_LICENSES) {
    const cur = byExt.get(l.ext);
    if (!cur) byExt.set(l.ext, { lic:l, earlier:0 });
    else {
      cur.earlier += 1;
      if (l.active && !cur.lic.active) cur.lic = l;
    }
  }
  return [...byExt.values()];
}

/* A trial counts down; a paid licence just says it works, and until when if it
   renews. Ended reads muted, with the day it stopped. */
function licState(l) {
  if (!l.active) return `<span class="statetag is-off">Ended ${fmtDate(l.until)}</span>`;
  if (l.type === 'trial') {
    const d = daysTo(l.until);
    return `<span class="statetag ${d <= 3 ? 'is-wait' : 'is-ok'}">${d} day${d === 1 ? '' : 's'} left</span>`;
  }
  return `<span class="statetag is-ok">Active</span>${
    l.until ? `<span class="atable__aside">until ${fmtDate(l.until)}</span>` : ''}`;
}

function acctLicenses() {
  if (!MY_LICENSES.length) {
    return emptyCard('No licenses yet — bought extensions and trials show up here.',
      'browse', 'i-store', 'Browse extensions');
  }
  return `
  <div class="acard acard--flush">
    <table class="atable">
      <thead><tr><th>Extension</th><th>License</th><th>State</th></tr></thead>
      <tbody>${currentLicenses().map(({ lic, earlier }) => {
        const e = EXTS.find(x => x.id === lic.ext) || {};
        return `<tr class="${lic.active ? '' : 'is-muted'}">
          <td>${extCell(lic.ext, `${KINDS[e.kind] || ''}${earlier ? ` · ${earlier} earlier` : ''}`)}</td>
          <td>${lic.type === 'trial' ? 'Trial' : 'Paid'}</td>
          <td class="nowrap">${licState(lic)}</td>
        </tr>`;
      }).join('')}</tbody>
    </table>
  </div>`;
}

const ORDER_STATE = {
  paid:    { label:'Paid',          tone:'is-ok' },
  open:    { label:'Not completed', tone:'is-off' },
  refunded:{ label:'Refunded',      tone:'is-off' },
};

function acctPayments() {
  if (!MY_ORDERS.length) {
    return emptyCard('No payments yet — paid extensions show their price on their page.',
      'browse', 'i-store', 'Browse extensions');
  }
  return `
  <div class="acard acard--flush">
    <table class="atable">
      <thead><tr><th>Extension</th><th>Plan</th><th class="num">Amount</th><th>Date</th><th>Status</th></tr></thead>
      <tbody>${MY_ORDERS.map(o => {
        const st = ORDER_STATE[o.status];
        return `<tr class="${o.status === 'paid' ? '' : 'is-muted'}">
          <td>${extCell(o.ext)}</td>
          <td>${PLAN[o.kind].label}</td>
          <td class="num">${fmtMoney(o.cents)}</td>
          <td class="nowrap">${fmtDate(o.when)}</td>
          <td><span class="statetag ${st.tone}">${st.label}</span></td>
        </tr>`;
      }).join('')}</tbody>
    </table>
  </div>
  <p class="acct__caption">A checkout left unfinished charges nothing — it stays here muted.</p>`;
}

function subState(s) {
  if (s.state === 'ended') return `<span class="statetag is-off">Ended ${fmtDate(s.ended)}</span>`;
  if (s.state === 'failed') return `<span class="statetag is-bad">Payment failed</span>`;
  if (s.state === 'cancels') return `<span class="statetag is-wait">Cancelled</span>`;
  return `<span class="statetag is-ok">Active</span>`;
}

function subNext(s) {
  if (s.state === 'ended') return '—';
  return `${s.state === 'cancels' ? 'Works until' : 'Renews'} ${fmtDate(s.next)}`;
}

/* The card, the invoices and cancelling live on Stripe's side, behind one
   button; it opens the same portal for every subscription, so it sits above the
   table rather than on each row. */
function acctSubscriptions() {
  if (!MY_SUBS.length) {
    return emptyCard('No subscriptions yet — extensions sold monthly or yearly show the plan on their page.',
      'browse', 'i-store', 'Browse extensions');
  }
  const live = MY_SUBS.some(s => s.state !== 'ended');
  return `
  ${live ? `
  <div class="acct__toolbar">
    <span class="acct__aside">Card, invoices and cancelling are handled by Stripe.</span>
    <span class="acct__hspacer"></span>
    <button class="btn-secondary" data-aact="billing"><svg><use href="#i-ext"/></svg>Manage billing</button>
  </div>` : ''}
  <div class="acard acard--flush">
    <table class="atable">
      <thead><tr><th>Extension</th><th>Plan</th><th>Next payment</th><th>Status</th></tr></thead>
      <tbody>${MY_SUBS.map(s => `
        <tr class="${s.state === 'ended' ? 'is-muted' : ''}">
          <td>${extCell(s.ext)}</td>
          <td class="nowrap">${PLAN[s.kind].label} · ${fmtMoney(s.cents)}</td>
          <td class="nowrap">${subNext(s)}</td>
          <td>${subState(s)}</td>
        </tr>`).join('')}</tbody>
    </table>
  </div>`;
}

/* one-line card with a single call to action (used by both empty sections) */
function emptyCard(text, act, icon, label) {
  return `
  <div class="acard">
    <p class="acard__lead">${text}</p>
    <button class="btn-secondary" data-aact="${act}" style="margin-top:8px">
      <svg><use href="#${icon}"/></svg>${label}</button>
  </div>`;
}

/* ---------------------------- admin: statistics ------------------------- */

/* The store only started counting on 03 Aug, so the range chips are honest
   about showing fewer days than asked. */
const STATS = {
  from:'2026-08-03', days:2, updated:'14:44',
  visitors:18, visits:19, visitorsToday:17, downloads:6, extsDownloaded:5,
  /* [day, visitors, downloads] */
  series:[['03 Aug', 1, 0], ['04 Aug', 17, 6]],
  byCountry:[['Unknown',7],['RU',5],['LV',3],['NL',2],['CN',1]],
  byType:[['Operation Solver',3],['Utility',3],['CLData Converter',1],['Global',1]],
  dlCountry:[['RU',4],['LV',2]],
  dlDealer:[['Unknown',6]],
  topExts:[['DirectCladding operation extensions',2],['EncyMascot',1],
    ['Extension for Planar slicing operation based on Cu...',1],['Robot reach zone',1],['SlopeAnalyzer',1]],
};

const RANGES = [7, 30, 90];

/* Two measures, two fixed hues — visitors always blue, downloads always warm,
   in the chart and in every bar list. Validated for both themes against the
   card surface (lightness band, chroma, CVD separation, contrast). */
const M_VISITORS = 'is-visitors', M_DOWNLOADS = 'is-downloads';

/* stat tile: label, the number, one line of context. A single value is a tile,
   never a one-bar chart. */
function tile(label, value, note) {
  return `<div class="tile">
    <div class="tile__label">${label}</div>
    <div class="tile__value">${value}</div>
    <div class="tile__note">${note}</div>
  </div>`;
}

/* horizontal bar list — nominal categories, so one hue per measure for every
   row (bar length already carries the magnitude) */
function barList(rows, tone) {
  const max = Math.max(...rows.map(r => r[1]), 1);
  return `<div class="bars">${rows.map(([label, n]) => `
    <div class="bar" tabindex="0">
      <span class="bar__label" title="${esc(label)}">${esc(label)}</span>
      <span class="bar__track"><i class="bar__fill ${tone || ''}" style="width:${n / max * 100}%"></i></span>
      <span class="bar__n">${n}</span>
    </div>`).join('')}</div>`;
}

/* Grouped columns over the day series — two days of data is a pair of columns,
   not a line (a two-point line reads as a trend nobody measured). One y-axis
   for both measures; the last day carries direct labels, the rest sit on the
   axis and in the hover tooltip. */
function statsChart() {
  const s = STATS.series;
  const w = 680, h = 210, pad = { l:30, r:12, t:14, b:26 };
  const plotW = w - pad.l - pad.r, plotH = h - pad.t - pad.b;
  const peak = Math.max(...s.flatMap(d => [d[1], d[2]]), 1);
  const max = Math.max(5, Math.ceil(peak / 5) * 5);
  const step = max / 4;
  const ticks = [0, 1, 2, 3, 4].map(i => i * step);
  const y = v => pad.t + (1 - v / max) * plotH;
  /* Bands are capped, so two days of data read as two column pairs rather than
     two lonely bars adrift in half the card; the group is then centered and the
     leftover stays as air on both sides. */
  const band = Math.min(plotW / s.length, 96);
  const bw = Math.min(24, band / 2 - 4);
  const x0 = pad.l + (plotW - band * s.length) / 2;
  const gx = i => x0 + band * (i + .5);             /* band center */

  /* 4px rounded cap, square at the baseline */
  const col = (v, tone, bx) => {
    if (v <= 0) return '';
    const top = y(v), base = y(0), r = Math.min(4, bw / 2, base - top);
    return `<path class="chart__bar ${tone}" d="M${bx} ${base}V${top + r}
      a${r} ${r} 0 0 1 ${r} ${-r}h${bw - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}V${base}Z"/>`;
  };
  /* the 2px surface gap keeps the two touching columns apart */
  const cols = s.map((d, i) => {
    const c = gx(i);
    return col(d[1], M_VISITORS, c - bw - 1) + col(d[2], M_DOWNLOADS, c + 1);
  }).join('');

  /* direct labels on the last day only */
  const last = s[s.length - 1], lc = gx(s.length - 1);
  const marks = [[last[1], lc - bw / 2 - 1], [last[2], lc + bw / 2 + 1]]
    .map(([v, cx]) => v <= 0 ? '' :
      `<text x="${cx}" y="${y(v) - 6}" class="chart__vlabel" text-anchor="middle">${v}</text>`).join('');

  /* one full-band hit rect per day drives the tooltip */
  const hits = s.map((d, i) => `
    <rect class="chart__hit" x="${x0 + band * i}" y="${pad.t}" width="${band}" height="${plotH}"
      data-day="${esc(d[0])}" data-v="${d[1]}" data-d="${d[2]}"/>`).join('');

  return `<div class="chartwrap" id="chartWrap">
    <svg class="chart" viewBox="0 0 ${w} ${h}" role="img"
      aria-label="Visitors and downloads per day">
      ${ticks.map(t => `
        <line x1="${pad.l}" x2="${w - pad.r}" y1="${y(t)}" y2="${y(t)}" class="chart__grid"/>
        <text x="${pad.l - 7}" y="${y(t) + 3}" class="chart__tick" text-anchor="end">${t}</text>`).join('')}
      ${cols}
      ${marks}
      ${s.map((d, i) => `<text x="${gx(i)}" y="${h - 8}" class="chart__tick"
        text-anchor="middle">${esc(d[0])}</text>`).join('')}
      ${hits}
    </svg>
    <div class="chartip" id="chartTip" hidden></div>
  </div>`;
}

/* the WCAG-clean twin of the chart — every plotted value, readable as text */
function statsTable() {
  return `
  <table class="atable atable--chart">
    <thead><tr><th>Day</th><th class="num">Visitors</th><th class="num">Downloads</th></tr></thead>
    <tbody>${STATS.series.map(([day, v, d]) => `
      <tr><td class="nowrap">${esc(day)}</td><td class="num">${v}</td><td class="num">${d}</td></tr>`).join('')}
    </tbody>
  </table>`;
}

/* The dashboard reads top-down: one filter row scoping everything, the KPI row,
   the time chart, then the breakdowns grouped by which measure they slice —
   visitors first, downloads second. Each measure keeps its one hue throughout,
   so a reader learns the two colors once. */
function acctStats() {
  const s = STATS;
  return `
  <div class="acct__toolbar">
    <div class="segmented">${RANGES.map(r => `
      <button class="${r === state.range ? 'is-on' : ''}" data-arange="${r}">${r} days</button>`).join('')}</div>
    <span class="acct__aside">updated ${s.updated}</span>
    <button class="acticon" data-aact="refresh" title="Refresh"><svg><use href="#i-refresh"/></svg></button>
    <span class="acct__hspacer"></span>
    <span class="acct__aside">Counting since ${fmtDate(s.from).replace(/ \d{4}$/, '')} — ${s.days} days of
      data, not ${state.range}.</span>
  </div>

  <div class="tiles">
    ${tile('Visitors', s.visitors, `different people · ${s.visits} visits`)}
    ${tile('Visitors today', s.visitorsToday, 'different people')}
    ${tile('Downloads', s.downloads, `${s.extsDownloaded} different extensions`)}
    ${tile('Downloads per visitor', (s.downloads / s.visitors).toFixed(2), 'across the whole period')}
  </div>

  <div class="acard acard--chart">
    <div class="acard__bar">
      <h2 class="acard__title">Visitors &amp; downloads per day</h2>
      <span class="legend"><i class="legend__key legend__key--v"></i>Visitors</span>
      <span class="legend"><i class="legend__key legend__key--d"></i>Downloads</span>
      <span class="acct__hspacer"></span>
      <button class="publink" data-aact="as-table">${state.chartTable ? 'Show as chart' : 'Show as table'}</button>
    </div>
    ${state.chartTable ? statsTable() : statsChart()}
  </div>

  <div class="acct__seclabel"><i class="dot dot--v"></i>Visitors</div>
  <div class="acct__grid">
    <div class="acard">
      <h2 class="acard__title acard__title--tight">By country</h2>
      ${barList(s.byCountry, M_VISITORS)}
      <p class="acct__caption acct__caption--foot">Country data from DB-IP (db-ip.com), CC BY 4.0.</p>
    </div>
  </div>

  <div class="acct__seclabel"><i class="dot dot--d"></i>Downloads</div>
  <div class="acct__grid">
    <div class="acard">
      <h2 class="acard__title acard__title--tight">Top extensions</h2>
      ${barList(s.topExts, M_DOWNLOADS)}
    </div>
    <div class="acard">
      <h2 class="acard__title acard__title--tight">By extension type</h2>
      ${barList(s.byType, M_DOWNLOADS)}
      <p class="acct__caption acct__caption--foot">An extension can declare several types, so these add up
        to more than the ${s.downloads} downloads.</p>
    </div>
    <div class="acard">
      <h2 class="acard__title acard__title--tight">By country</h2>
      ${barList(s.dlCountry, M_DOWNLOADS)}
      <div class="acard__split">
        <h2 class="acard__title acard__title--tight">By dealer</h2>
        ${barList(s.dlDealer, M_DOWNLOADS)}
      </div>
    </div>
  </div>`;
}

/* ---------------------------- admin: moderation ------------------------- */

/* `art`/`hue` are null when the package ships no icon — the hero falls back to
   the neutral puzzle glyph, and the missing icon is one of the flags below.
   `desc` is the submitted store description ('' = missing), `reach` lists what
   a quick scan of the package saw, `history` is the publisher's track record —
   the fastest signal an admin has for how much scrutiny a submission needs. */
const REQUESTS = [
  { id:'ency3check', name:'Ency3Check', kind:'utility', pkg:'Ency3Check', pub:'hazrat',
    ver:'v0.1.4', when:'23 h ago', repo:'lenar-robotics/Ency3Check', size:'1.2 MB',
    requires:'ENCY ≥ 3.0.0', art:null, hue:null,
    desc:'',
    flags:['no description','no icon'],
    reach:['nothing notable'],
    history:{ published:0, note:'first submission from this publisher' },
    prev:[['0.1.3','rejected — crashed on load','12 d ago'],['0.1.1','rejected — no description','20 d ago']],
    from:'new', price:'Free', sha:'9f2c41e07ab3' },
  { id:'viewcube', name:'ViewCube hotkeys', kind:'utility', pkg:'ViewCubeHotkeys', pub:'kbelousov-ency',
    ver:'v1.1.0', when:'2 d ago', repo:'kbelousov-ency/ViewCubeHotkeys', size:'0.4 MB',
    requires:'ENCY ≥ 3.0.0', art:'a-term', hue:'#84ebb8',
    desc:'Adds keyboard shortcuts for the ViewCube: numpad snaps to the six faces, Shift-numpad to corners.',
    flags:[],
    reach:['keyboard hooks (global shortcuts)'],
    history:{ published:4, note:'4 extensions in the catalog, none rejected' },
    prev:[['1.0.0','approved','3 mo ago']],
    from:'update', of:'1.0.0', price:'Free → $19', sha:'4b0d77c2e915',
    diff:[['Price','free → paid'], ['Now reaches for','keyboard hooks (global shortcuts)'],
          ['Assembly changed','ViewCubeHotkeys.dll · 41 → 58 KB'], ['Manifest minEncyVersion','2.9.4 → 3.0.0']] },
  { id:'export-mine', name:'Export project information', kind:'global', pkg:'ProjectInfoExport', pub:'ruslan.m',
    ver:'v1.0.2', when:'4 h ago', repo:'hand upload', size:'0.9 MB',
    requires:'ENCY ≥ 3.0.0', art:'a-export', hue:'#f08a5d',
    desc:'Exports project, setup, operation and tooling data into XLSX and JSON.',
    flags:[],
    reach:['files outside the project folder — Path.GetTempPath'],
    history:{ published:1, note:'1 extension in the catalog' },
    prev:[['1.0.1','approved','4 mo ago']],
    from:'update', of:'1.0.1', price:'$49 · $10/mo', sha:'c18e5a90d24f', mine:true,
    diff:[] },
  { id:'slope', name:'SlopeAnalyzer', kind:'utility', pkg:'SlopeAnalyzer', pub:'kbelousov-ency',
    ver:'v0.4.2', when:'33 d ago', repo:'hand upload', size:'2.1 MB',
    requires:'ENCY ≥ 3.0.0', art:'a-slope', hue:'#84b8eb',
    desc:'Interactive slope analysis: an always-on-top window recolours model faces by slope angle.',
    flags:[],
    reach:['nothing notable'],
    history:{ published:4, note:'4 extensions in the catalog, none rejected' },
    prev:[],
    from:'feed', price:'Free', sha:null },
];

/* what the two buttons do to this request — it differs for a card already in the feed */
function modHint(r) {
  if (r.mine) return 'This is your submission — another moderator approves it.';
  if (r.from === 'feed') return 'Already in the feed: approve lists the card in the catalog; reject keeps it off the shelf.';
  return 'Approve sends exactly these bytes to signing and the feed; reject returns them to the author with a note.';
}

/* where the request came from, said once in the queue row and once in the hero */
function modOrigin(r) {
  if (r.from === 'update') return `update of v${r.of}`;
  if (r.from === 'feed') return 'already in the feed';
  return 'new extension';
}

/* prototype-live: a decision moves the request out of the queue */
const DECIDED = [];

function modSelected() {
  return REQUESTS.find(r => r.id === state.modSel) || REQUESTS[0];
}

/* queue rows: enough to pick an item — who, what, how long it has waited,
   and whether the scan flagged anything */
function modQueue(sel) {
  return `
  <div class="modq">
    ${REQUESTS.map(r => `
      <button class="modq__row ${r.id === sel.id ? 'is-on' : ''}" data-amod="${r.id}">
        <span class="xlogo modq__logo" style="--xc:${r.hue || '#8a9299'}"><svg><use href="#${r.art || 'a-puzzle'}"/></svg></span>
        <span class="modq__text">
          <span class="modq__name">${esc(r.name)}</span>
          <span class="modq__sub">${esc(r.ver)} · ${modOrigin(r)}</span>
        </span>
        <span class="modq__side">
          <span class="modq__when">${r.when}</span>
          ${r.flags.length ? `<span class="modq__flags">${r.flags.length} flag${r.flags.length > 1 ? 's' : ''}</span>`
            : r.mine ? '<span class="modq__mine">yours</span>' : ''}
        </span>
      </button>`).join('')}
    ${DECIDED.length ? `<div class="modq__done">${DECIDED.length} decided this session</div>` : ''}
  </div>`;
}

/* review pane: everything a decision rests on, worst news first —
   flags, then the code scan, then what the shop page will show */
function modReview(r) {
  return `
  <section class="modv">
    <div class="modv__hero xcard--tint ${KIND_TINT[r.kind] || ''}" style="--xc:${r.hue || '#8a9299'}">
      <span class="xlogo reqcard__logo"><svg><use href="#${r.art || 'a-puzzle'}"/></svg></span>
      <div class="reqcard__htext">
        <h2 class="reqcard__name">${esc(r.name)}</h2>
        <div class="reqcard__by">${esc(r.ver)}<i class="xcard__bysep"></i>by ${esc(r.pub)}
          <i class="xcard__bysep"></i>${modOrigin(r)}</div>
      </div>
      <span class="statetag is-wait reqcard__state">waiting ${r.when.replace(' ago', '')}</span>
    </div>

    <div class="modv__body">
      <div class="modv__cols">
        <div class="modv__main">
          ${r.flags.length ? `
          <div class="modv__block">
            <div class="reqcard__seclabel">Needs a look</div>
            <div class="reqcard__flags">${r.flags.map(f => `<span class="flagtag">${esc(f)}</span>`).join('')}</div>
          </div>` : ''}

          ${r.from === 'update' ? `
          <div class="modv__block">
            <div class="reqcard__seclabel">Changes since v${r.of}</div>
            ${r.diff.length ? `<div class="modv__diff">${r.diff.map(([k, v]) => `
              <div class="modv__diffrow"><span>${esc(k)}</span><b>${esc(v)}</b></div>`).join('')}</div>`
              : `<p class="modv__none">same assemblies, permissions, manifest and price</p>`}
          </div>` : ''}

          <div class="modv__block">
            <div class="reqcard__seclabel">What the code reaches for</div>
            <ul class="modv__reach">${r.reach.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
          </div>

          <div class="modv__block">
            <div class="reqcard__seclabel">Store description, as submitted</div>
            ${r.desc ? `<p class="reqcard__reach">${esc(r.desc)}</p>`
                     : `<p class="modv__none">none — the card will show only the name</p>`}
          </div>

          <div class="modv__block">
            <div class="reqcard__seclabel">Previous submissions</div>
            ${r.prev.length ? `<div class="modv__prev">${r.prev.map(([v, what, when]) => `
              <div class="modv__prevrow"><b>${v}</b><span>${esc(what)}</span><i>${when}</i></div>`).join('')}</div>`
              : `<p class="modv__none">none</p>`}
          </div>
        </div>

        <aside class="modv__facts">
          <div class="reqcard__kv">
            <span>Package id</span><b>${esc(r.pkg)}</b>
            <span>Built from</span><b>${r.repo.includes('/')
              ? `<button class="publink" data-aact="open-repo">${esc(r.repo)}</button>` : esc(r.repo)}</b>
            <span>Submitted</span><b>${r.when}</b>
            <span>Size</span><b>${r.size}</b>
            <span>Requires</span><b>${esc(r.requires)}</b>
            <span>Price</span><b>${esc(r.price)}</b>
            ${r.sha ? `<span>sha256</span><b title="the bytes Approve sends on">${r.sha}…</b>` : ''}
          </div>
          <div class="modv__pub">
            <div class="reqcard__seclabel">Publisher</div>
            <button class="publink" data-aact="open-person">${esc(r.pub)}</button>
            <p class="modv__pubnote">${esc(r.history.note)}</p>
          </div>
          <div class="modv__tools">
            <button class="btn-quiet" data-aact="download"><svg><use href="#i-download"/></svg>Download package</button>
            ${r.repo.includes('/') ? `<button class="btn-quiet" data-aact="open-repo"><svg><use href="#i-github"/></svg>Open on GitHub</button>` : ''}
            <button class="btn-quiet" data-aact="package-page"><svg><use href="#i-history"/></svg>Package page</button>
          </div>
        </aside>
      </div>
    </div>

    <div class="reqcard__acts">
      <button class="btn-approve" data-amoddec="approve" ${r.mine ? 'disabled' : ''}><svg><use href="#i-check-circle"/></svg>Approve</button>
      <button class="btn-quiet is-danger" data-amoddec="reject"><svg><use href="#i-ban"/></svg>Reject</button>
      <span class="reqcard__aspacer"></span>
      <span class="modv__hint">${modHint(r)}</span>
    </div>
  </section>`;
}

function acctModeration() {
  if (!REQUESTS.length) {
    return emptyCard(
      DECIDED.length ? `Queue clear — ${DECIDED.length} decided this session.`
                     : 'Nothing waiting — new submissions land here.',
      'stats', 'i-chart', 'Open statistics');
  }
  const sel = modSelected();
  return `<div class="mod">${modQueue(sel)}${modReview(sel)}</div>`;
}

/* ------------------------- admin: signing, packages --------------------- */

/* A version's way after approval: unsigned → signed → in the feed. The same
   words on the signing queue, the package page and the author's My published. */
const STAGE = {
  submitted:{ label:'Waiting for review', tone:'is-wait' },
  rejected: { label:'Rejected',           tone:'is-bad' },
  withdrawn:{ label:'Withdrawn',          tone:'is-off' },
  pending:  { label:'Waiting to be signed', tone:'is-wait' },
  signed:   { label:'Signed, not in the feed', tone:'is-wait' },
  failed:   { label:'Gave up',            tone:'is-bad' },
  published:{ label:'In the feed',        tone:'is-ok' },
};
const stageTag = s => `<span class="statetag ${STAGE[s].tone}">${STAGE[s].label}</span>`;

/* what is between approval and the feed right now, oldest first */
const SIGN_QUEUE = [
  { ext:'directcladding', ver:'1.1.1', state:'pending', paid:true, queued:'2026-10-06 09:12',
    tries:3, err:'The office signer did not answer in 15 s', next:'in 4 min' },
  { ext:'export-info', ver:'1.0.2', state:'signed', paid:true, queued:'2026-10-06 08:40',
    tries:1, err:'The feed refused the push: 502 Bad Gateway', next:'in 4 min' },
  { ext:'import-svg', ver:'1.0.1', state:'failed', paid:false, queued:'2026-10-04 17:03',
    tries:10, err:'Version 1.0.1 is already in the feed — Nexus does not take it twice', next:null },
];
const SIGN_DONE = [
  { ext:'planar-slicing', ver:'1.2.2', paid:true,  at:'2026-10-05 10:40' },
  { ext:'helloency',      ver:'0.1.0', paid:false, at:'2026-10-02 09:58' },
  { ext:'camagent',       ver:'3.0.2', paid:false, at:'2026-09-30 12:40' },
  { ext:'viewcube',       ver:'1.0.0', paid:false, at:'2026-09-29 14:26' },
];

/* 2026-10-06 09:12 → 6 Oct, 09:12 — the day the way the rest of the store
   writes it, then the time */
function fmtStamp(s) {
  const [d, t] = s.split(' ');
  return `${fmtDate(d).replace(/ \d{4}$/, '')}, ${t}`;
}

/* The queue is empty on a good day, so the first line says whether anything is
   stuck and why; the rows are only what has not reached the feed. Published
   versions follow as a short record, quieter. */
function acctSigning() {
  const stuck = SIGN_QUEUE.length;
  const signerDown = SIGN_QUEUE.some(r => r.state === 'pending');
  return `
  <div class="acct__toolbar">
    <span class="sigstate ${stuck ? (signerDown ? 'is-bad' : 'is-wait') : 'is-ok'}"><i></i>${
      !stuck ? 'Everything approved is in the feed'
      : `${stuck} approved version${stuck > 1 ? 's' : ''} not in the feed yet${signerDown ? ' — the office signer is not answering' : ''}`}</span>
    <span class="acct__hspacer"></span>
    <button class="btn-secondary" data-aact="run-queue" ${stuck ? '' : 'disabled'}
      title="Sign what is unsigned and push what is signed, without waiting for the next pass">
      <svg><use href="#i-refresh"/></svg>Run the queue</button>
  </div>
  ${stuck ? `
  <div class="acard acard--flush">
    <table class="atable">
      <thead><tr><th>Extension</th><th>Step</th><th>Why it is waiting</th><th>Queued</th><th></th></tr></thead>
      <tbody>${SIGN_QUEUE.map(r => `
        <tr>
          <td>${extCell(r.ext, `v${r.ver} · ${r.paid ? 'paid' : 'free'}`)}</td>
          <td class="nowrap">${stageTag(r.state)}</td>
          <td><span class="atable__why">${esc(r.err)}</span>
            <span class="atable__sub">${r.tries} attempt${r.tries > 1 ? 's' : ''}${r.next ? ` · next ${r.next}` : ' · the queue no longer retries it'}</span></td>
          <td class="nowrap">${fmtStamp(r.queued)}</td>
          <td class="atable__act">
            ${r.state === 'failed' ? `<button class="acticon" data-aact="retry" title="Put it back in the queue"><svg><use href="#i-refresh"/></svg></button>` : ''}
            <button class="acticon" data-aact="cancel-approval" title="Cancel approval — it goes back to the author with a reason"><svg><use href="#i-ban"/></svg></button>
          </td>
        </tr>`).join('')}</tbody>
    </table>
  </div>` : ''}
  <h2 class="acct__subhead">Reached the feed</h2>
  <div class="acard acard--flush">
    <table class="atable">
      <thead><tr><th>Extension</th><th>Signature</th><th>In the feed since</th></tr></thead>
      <tbody>${SIGN_DONE.map(r => `
        <tr>
          <td>${extCell(r.ext, `v${r.ver}`)}</td>
          <td><span class="atable__sub atable__sub--inline" title="${r.paid ? 'licence container {2E8AC185-3122-4317-AE9C-5CEF2D5EDCA9}' : ''}">${
            r.paid ? 'Office signature · licence container' : 'Office signature'}</span></td>
          <td class="nowrap">${fmtStamp(r.at)}</td>
        </tr>`).join('')}</tbody>
    </table>
  </div>`;
}

/* every package the store knows — listed or not, with or without a card */
const PACKAGES = [
  { ext:'directcladding', owner:'kbelousov-ency', live:'1.1.0', flight:['1.1.1','pending'], shelf:'listed', price:'$10/mo · $100/yr', changed:'2026-10-06' },
  { ext:'export-info',    owner:'ruslan.m',       live:'1.0.1', flight:['1.0.2','signed'],  shelf:'listed', price:'$49 · $10/mo · $100/yr', changed:'2026-10-06' },
  { ext:'viewcube',       owner:'kbelousov-ency', live:'1.0.0', flight:['1.1.0','submitted'], shelf:'listed', price:'Free', changed:'2026-10-04' },
  { ext:'import-svg',     owner:'ruslan.m',       live:'1.0.0', flight:['1.0.1','failed'],  shelf:'listed', price:'$19', changed:'2026-10-04' },
  { ext:'planar-slicing', owner:'EncySoftware',   live:'1.2.2', flight:null, shelf:'listed', price:'$49', changed:'2026-10-05' },
  { ext:'helloency',      owner:'kbelousov-ency', live:'0.1.0', flight:null, shelf:'hidden', price:'Free', changed:'2026-10-02' },
  { ext:'ency3check',     owner:'hazrat',         live:null,    flight:['0.1.4','submitted'], shelf:'none', price:'Free', changed:'2026-10-05' },
];
const SHELF = {
  listed:{ label:'In the catalog', tone:'is-ok' },
  hidden:{ label:'Off the shelf',  tone:'is-off' },
  none:  { label:'No card yet',    tone:'is-off' },
};

/* versions of the package the page is open on, newest first, each with the
   steps it went through */
const PKG_VERSIONS = {
  'export-info': [
    { ver:'1.0.2', state:'signed', from:'.nupkg upload', by:'ruslan.m', rev:'k.belousov', at:'2026-10-06 08:40',
      steps:[['Waiting for review','ruslan.m','2026-10-06 08:02'], ['Waiting to be signed','k.belousov · approved','2026-10-06 08:39'],
             ['Signed, not in the feed','office signer','2026-10-06 08:40'], ['push failed: 502 Bad Gateway','feed','2026-10-06 08:40']] },
    { ver:'1.0.1', state:'published', from:'publish form', by:'ruslan.m', rev:'renal', at:'2026-05-30 11:20' },
    { ver:'1.0.1', state:'rejected', from:'publish form', by:'ruslan.m', rev:'renal', at:'2026-05-28 16:02',
      why:'README is empty — add a description and screenshots' },
    { ver:'1.0.0', state:'published', from:'feed, before moderation', by:'—', rev:'—', at:'2026-04-08 09:15' },
  ],
};

function acctPackages() {
  if (state.pkgSel) return packagePage(state.pkgSel);
  const scope = state.pkgScope || 'all';
  const inScope = p => scope === 'all' || (scope === 'flight' ? !!p.flight : p.shelf !== 'listed');
  const count = id => PACKAGES.filter(p => id === 'all' || (id === 'flight' ? !!p.flight : p.shelf !== 'listed')).length;
  return `
  <div class="acct__toolbar">
    ${[['all', 'All'], ['flight', 'On its way'], ['off', 'Not in the catalog']].map(([id, label]) => `
      <button class="fchip ${scope === id ? 'is-active' : ''}" data-apkgscope="${id}">
        ${label}<span class="fchip__cnt">${count(id)}</span>
      </button>`).join('')}
    <span class="acct__hspacer"></span>
    <div class="search" style="width:240px">
      <svg><use href="#i-search"/></svg>
      <input class="field" type="text" placeholder="Search by package id or name" />
    </div>
  </div>
  <div class="acard acard--flush">
    <table class="atable">
      <thead><tr><th>Extension</th><th>Owner</th><th>Live</th><th>On its way</th><th>Shelf</th><th>Changed</th></tr></thead>
      <tbody>${PACKAGES.filter(inScope).map(p => {
        const e = EXTS.find(x => x.id === p.ext) || REQUESTS.find(x => x.id === p.ext) || {};
        return `
        <tr class="is-link" data-apkg="${p.ext}">
          <td>${extCell(p.ext, esc(e.pkg || p.ext))}</td>
          <td>${esc(p.owner)}</td>
          <td class="nowrap">${p.live ? `v${p.live}` : '—'}</td>
          <td class="nowrap">${p.flight ? `<span class="atable__ver">v${p.flight[0]}</span>${stageTag(p.flight[1])}` : '<span class="atable__sub atable__sub--inline">—</span>'}</td>
          <td><span class="statetag ${SHELF[p.shelf].tone}">${SHELF[p.shelf].label}</span></td>
          <td class="nowrap">${fmtDate(p.changed)}</td>
        </tr>`;
      }).join('')}</tbody>
    </table>
  </div>`;
}

/* One package: the card as the catalog shows it, then every version that was
   ever submitted, each opening onto the steps it went through. */
function packagePage(id) {
  const p = PACKAGES.find(x => x.ext === id);
  const e = EXTS.find(x => x.id === id) || {};
  const vers = PKG_VERSIONS[id] || [];
  return `
  <div class="acct__toolbar">
    <button class="btn-quiet" data-aact="all-packages"><svg><use href="#i-back"/></svg>All packages</button>
  </div>
  <section class="modv pkgv">
    <div class="modv__hero xcard--tint ${KIND_TINT[e.kind] || ''}" style="--xc:${e.hue || '#8a9299'}">
      <span class="xlogo reqcard__logo"><svg><use href="#${e.art || 'a-puzzle'}"/></svg></span>
      <div class="reqcard__htext">
        <h2 class="reqcard__name">${esc(e.name || id)}</h2>
        <div class="reqcard__by">${esc(e.pkg || id)}<i class="xcard__bysep"></i>by ${esc(p.owner)}
          <i class="xcard__bysep"></i>${p.price}</div>
      </div>
      <span class="statetag reqcard__state">${SHELF[p.shelf].label}</span>
    </div>
    <div class="modv__body">
      <table class="atable atable--plain">
        <thead><tr><th>Version</th><th>Where it is</th><th>Came from</th><th>Submitted by</th><th>Decided by</th><th>When</th></tr></thead>
        <tbody>${vers.map((v, i) => `
          <tr class="${v.steps ? 'is-open' : ''}">
            <td class="nowrap"><b class="atable__strong">v${v.ver}</b></td>
            <td>${stageTag(v.state)}${v.why ? `<span class="atable__sub">${esc(v.why)}</span>` : ''}</td>
            <td>${esc(v.from)}</td>
            <td>${esc(v.by)}</td>
            <td>${esc(v.rev)}</td>
            <td class="nowrap">${fmtStamp(v.at)}</td>
          </tr>
          ${v.steps ? `
          <tr class="atable__steps"><td></td><td colspan="5">
            <ol class="steps">${v.steps.map(([what, who, at], j) => `
              <li class="${j === v.steps.length - 1 ? 'is-last' : ''}"><b>${esc(what)}</b><span>${esc(who)}</span><i>${fmtStamp(at)}</i></li>`).join('')}
            </ol>
          </td></tr>` : ''}`).join('')}
        </tbody>
      </table>
    </div>
  </section>`;
}

/* ---------------------------- admin: people ----------------------------- */

const PEOPLE = [
  { email:'ruslan.m@encycam.io', name:'Ruslan Mardanshin', co:'ENCY SOFTWARE LTD',
    roles:['customer','admin'], pubs:0, lic:0, seen:'1 min ago', me:true },
  { email:'renal@encycam.io', name:'Renal Sabirov', co:'ENCY SOFTWARE LTD',
    roles:['customer','admin'], pubs:0, lic:0, seen:'12 min ago' },
  { email:'t.ga.liullin@gmail.com', name:'hazratadm', co:'',
    roles:['customer','admin'], pubs:0, lic:0, seen:'24 min ago' },
  { email:'sven@encycam.com', name:'Sven ten Hove', co:'CADCAMSTORE',
    roles:['customer','admin'], pubs:0, lic:0, seen:'1 h ago' },
  { email:'dinars@encycam.io', name:'', co:'',
    roles:['customer'], pubs:0, lic:0, seen:'2 h ago' },
  { email:'igrek@encycam.com', name:'Igor Bondarev', co:'ENCY SOFTWARE LTD',
    roles:['customer','admin'], pubs:0, lic:0, seen:'16 h ago' },
  { email:'k.belousov@encycam.com', name:'Kirill Belousov', co:'ENCY SOFTWARE LTD',
    roles:['customer','publisher','admin'], pubs:4, lic:0, seen:'22 h ago' },
  { email:'aynur@encycam.io', name:'Айнур Мугинов', co:'SprutCAM Tech ltd',
    roles:['customer','publisher','admin'], pubs:1, lic:0, seen:'23 h ago' },
  { email:'liullinil@encycam.com', name:'Ilnar Galiullin', co:'ENCY SOFTWARE LTD',
    roles:['customer','publisher','admin'], pubs:6, lic:0, seen:'23 h ago' },
  { email:'cyrulinas@sprutcam.com', name:'', co:'',
    roles:['customer','admin'], pubs:0, lic:0, seen:'1 d ago' },
];

/* real filters: scope chips + search combine; counts derive from the data */
const PEOPLE_SCOPES = [
  ['all', 'All'], ['admin', 'Admins'], ['publisher', 'Publishers'], ['blocked', 'Blocked'],
];

function peopleCount(id) {
  if (id === 'all') return PEOPLE.length;
  if (id === 'blocked') return PEOPLE.filter(p => p.blocked).length;
  return PEOPLE.filter(p => p.roles.includes(id)).length;
}

function filteredPeople() {
  const q = (state.peopleQuery || '').trim().toLowerCase();
  const s = state.peopleScope || 'all';
  return PEOPLE.filter(p =>
    (s === 'all' || (s === 'blocked' ? p.blocked : p.roles.includes(s)))
    && (!q || (p.email + p.name + p.co).toLowerCase().includes(q)));
}

function acctPeople() {
  const s = state.peopleScope || 'all';
  return `
  <div class="acct__toolbar">
    ${PEOPLE_SCOPES.map(([id, label]) => `
      <button class="fchip ${s === id ? 'is-active' : ''} ${!peopleCount(id) && s !== id ? 'is-dim' : ''}" data-ppl="${id}">
        ${label}<span class="fchip__cnt">${peopleCount(id)}</span>
      </button>`).join('')}
    <span class="acct__hspacer"></span>
    <div class="search" style="width:240px">
      <svg><use href="#i-search"/></svg>
      <input class="field" id="peopleSearch" type="text" placeholder="Search by email, name or company"
        value="${esc(state.peopleQuery || '')}" />
    </div>
    <button class="btn-quiet" data-aact="sync"><svg><use href="#i-refresh"/></svg>Sync profiles</button>
  </div>
  <div class="acard acard--flush">
    <table class="atable atable--wide">
      <thead><tr>
        <th>Person</th><th>Company</th><th>Roles</th>
        <th class="num">Published</th><th class="num">Licenses</th><th>Last seen</th><th></th>
      </tr></thead>
      <tbody id="peopleRows">${peopleRows(filteredPeople())}</tbody>
    </table>
  </div>`;
}

function peopleRows(list) {
  if (!list.length) return `<tr><td colspan="7" class="atable__none">Nobody matches these filters</td></tr>`;
  return list.map(p => `
    <tr class="${p.blocked ? 'is-blocked' : ''}">
      <td>
        <span class="person">
          <span class="avatar" style="--av:${p.roles.includes('publisher') ? 'var(--op-green)' : 'var(--op-blue)'}">
            ${esc(p.email[0].toUpperCase())}</span>
          <span class="person__text">
            <span class="atable__name">${esc(p.email)}${p.me ? '<span class="youtag">you</span>' : ''}</span>
            <span class="atable__sub">${esc(p.name) || '—'}</span>
          </span>
        </span>
      </td>
      <td>${esc(p.co) || '—'}</td>
      <td><span class="rolerow">${p.roles.map(r =>
        `<span class="roletag ${ROLE_TONE[r[0].toUpperCase() + r.slice(1)] || ''}">${esc(r)}</span>`).join('')}${
        p.blocked ? '<span class="roletag is-blocked">blocked</span>' : ''}</span></td>
      <td class="num">${p.pubs ? `<button class="publink" data-aact="open-pubs">${p.pubs}</button>` : '—'}</td>
      <td class="num">${p.lic || '—'}</td>
      <td class="nowrap">${p.seen}</td>
      <td class="atable__act">
        <button class="acticon" data-aact="history" data-mail="${esc(p.email)}" title="History"><svg><use href="#i-history"/></svg></button>
        <button class="acticon ${p.blocked ? 'is-on' : ''}" data-aact="block" data-mail="${esc(p.email)}"
          title="${p.blocked ? 'Unblock' : 'Block'}"><svg><use href="#i-ban"/></svg></button>
      </td>
    </tr>`).join('');
}

/* ---------------------------- admin: repositories ----------------------- */

const REPOS = [
  { ext:'TestMcpFlow', repo:'lenar-robotics/TestMcpFlow', build:'6 d ago',
    by:'Lenar Galiullin', co:'', conn:'10 d ago', how:'auto', state:'published', when:'6 d ago' },
  { ext:'Ency3Check', repo:'lenar-robotics/Ency3Check', build:'23 h ago',
    by:'Ilnar Galiullin', co:'ENCY SOFTWARE LTD', conn:'6 d ago', how:'form', state:'moderation', when:'23 h ago' },
  { ext:'LoadingGameExtention', repo:'EncySoftware/LoadingGameExtention', build:'5 d ago',
    by:'Ilnar Galiullin', co:'ENCY SOFTWARE LTD', conn:'5 d ago', how:'form', state:'published', when:'5 d ago' },
  { ext:'HelloEncy', repo:'kbelousov-ency/HelloEncy', build:'5 d ago',
    by:'Kirill Belousov', co:'ENCY SOFTWARE LTD', conn:'5 d ago', how:'form', state:'published', when:'5 d ago' },
  { ext:'SlopeAnalyzer', repo:'kbelousov-ency/SlopeAnalyzer', build:'4 d ago',
    by:'Kirill Belousov', co:'ENCY SOFTWARE LTD', conn:'5 d ago', how:'form', state:'published', when:'4 d ago' },
  { ext:'EncySoftware.CamAgent', repo:'EncySoftware/camagent-extension', build:'4 d ago',
    by:'Ravil1 Test1', co:'SprutCAM Tech ltd', conn:'4 d ago', how:'form', state:'published', when:'4 d ago' },
  { ext:'ViewCubeHotkeys', repo:'kbelousov-ency/ViewCubeHotkeys', build:'4 d ago',
    by:'Kirill Belousov', co:'ENCY SOFTWARE LTD', conn:'4 d ago', how:'form', state:'published', when:'4 d ago' },
  { ext:'TaperCalculator', repo:'ishamsiev/TaperCalculator', build:'4 d ago',
    by:'Ilnur S', co:'', conn:'4 d ago', how:'form', state:'published', when:'4 d ago' },
  { ext:'SelectionToolkit', repo:'kbelousov-ency/SelectionToolkit', build:'—',
    by:'Kirill Belousov', co:'ENCY SOFTWARE LTD', conn:'1 d ago', how:'form', state:'held', when:'1 d ago' },
  { ext:'EncyMascot', repo:'kbelousov-ency/EncyMascot', build:'—',
    by:'Kirill Belousov', co:'ENCY SOFTWARE LTD', conn:'1 d ago', how:'form', state:'held', when:'1 d ago' },
];

const REPO_STATE = {
  published: { label:'published',     tone:'is-ok' },
  moderation:{ label:'on moderation', tone:'is-wait' },
  held:      { label:'name held',     tone:'is-wait' },
};

/* real filters, same recipe as People: scope chips + search combine */
const REPO_SCOPES = [
  ['all', 'All'], ['published', 'Published'], ['moderation', 'On moderation'], ['held', 'Name held'],
];

function repoCount(id) {
  return id === 'all' ? REPOS.length : REPOS.filter(r => r.state === id).length;
}

function filteredRepos() {
  const q = (state.repoQuery || '').trim().toLowerCase();
  const s = state.repoFilter || 'all';
  return REPOS.filter(r => (s === 'all' || r.state === s)
    && (!q || `${r.ext} ${r.repo} ${r.by} ${r.co}`.toLowerCase().includes(q)));
}

function repoRows(list) {
  if (!list.length) return `<tr><td colspan="8" class="atable__none">No repositories match these filters</td></tr>`;
  return list.map(r => {
    const st = REPO_STATE[r.state];
    return `<tr>
      <td><button class="publink" data-aact="open-ext">${esc(r.ext)}</button></td>
      <td><button class="publink" data-aact="open-repo">${esc(r.repo)}</button></td>
      <td class="nowrap">${r.build}</td>
      <td>
        <button class="publink" data-aact="open-person">${esc(r.by)}</button>
        ${r.co ? `<span class="atable__sub">${esc(r.co)}</span>` : ''}
      </td>
      <td class="nowrap">${r.conn}</td>
      <td><span class="howtag">${r.how}</span></td>
      <td>
        <span class="statetag ${st.tone}">${st.label}</span>
        <span class="atable__sub">${r.when}</span>
      </td>
      <td class="atable__act">
        <button class="acticon" data-aact="unlist" title="Unlist"><svg><use href="#i-eye-off"/></svg></button>
      </td>
    </tr>`;
  }).join('');
}

function acctRepos() {
  const s = state.repoFilter || 'all';
  return `
  <p class="acard__lead">Every publisher's bindings — your own are on
    <button class="publink" data-aact="to-profile">Profile</button>.</p>
  <p class="acct__caption" style="margin:6px 0 12px">Connecting a repository needs no approval: it publishes
    nothing, and the first publish under a name still comes here for moderation. This page is for the other
    case — a name taken and never used, which only its holder could give back until now.</p>
  <div class="acct__toolbar">
    ${REPO_SCOPES.map(([id, label]) => `
      <button class="fchip ${s === id ? 'is-active' : ''} ${!repoCount(id) && s !== id ? 'is-dim' : ''}" data-arepo="${id}">
        ${label}<span class="fchip__cnt">${repoCount(id)}</span>
      </button>`).join('')}
    <span class="acct__hspacer"></span>
    <div class="search" style="width:240px">
      <svg><use href="#i-search"/></svg>
      <input class="field" id="repoSearch" type="text" placeholder="Search by extension, repository or person"
        value="${esc(state.repoQuery || '')}" />
    </div>
  </div>
  <div class="acard acard--flush">
    <table class="atable atable--wide">
      <thead><tr>
        <th>Extension name</th><th>GitHub repository</th><th>Last build</th><th>Claimed by</th>
        <th>Connected</th><th>How</th><th>State</th><th></th>
      </tr></thead>
      <tbody id="repoRows">${repoRows(filteredRepos())}</tbody>
    </table>
  </div>`;
}

/* ---------------------------- admin: events ----------------------------- */

/* only verdicts get a hue; routine activity stays neutral */
const EV_KINDS = {
  'role change':        'is-plain',
  'extension published':'is-info',
  'user joined':        'is-plain',
  'extension approved': 'is-ok',
  'trusted publisher set':'is-plain',
  'github linked':      'is-plain',
  'profiles synced':    'is-plain',
  'extension rejected': 'is-bad',
  'github unlinked':    'is-plain',
  'extension unlisted': 'is-plain',
  'extension listed':   'is-ok',
  'taxonomy changed':   'is-plain',
  'trial issued':       'is-plain',
};

const EVENTS = [
  { when:'Today, 12:49', kind:'github linked', who:'sven@encycam.com', what:'salthove', det:'personal account' },
  { when:'Today, 10:50', kind:'user joined', who:'dinars@encycam.io', what:'dinars@encycam.io', det:'First sign-in to the store' },
  { when:'Today, 10:20', kind:'profiles synced', who:'t.ga.liullin@gmail.com', what:'—',
    det:'26 updated, 0 already known, 0 unchanged, 4 unknown to licsys (of 30)' },
  { when:'Today, 10:19', kind:'role change', who:'t.ga.liullin@gmail.com', what:'sven@encycam.com', det:'+ admin' },
  { when:'03 Aug, 22:30', kind:'user joined', who:'sven@encycam.com', what:'sven@encycam.com', det:'First sign-in to the store' },
  { when:'03 Aug, 15:26', kind:'extension approved', who:'k.belousov@encycam.com', what:'encymascot', link:true, det:'Approved into the catalog' },
  { when:'03 Aug, 15:23', kind:'extension published', who:'k.belousov@encycam.com', what:'encymascot', link:true, det:'v0.1.0' },
  { when:'03 Aug, 15:22', kind:'trusted publisher set', who:'k.belousov@encycam.com', what:'SelectionToolkit', link:true,
    det:'Connected kbelousov-ency/SelectionToolkit (name reserved, nothing published yet)' },
  { when:'03 Aug, 15:21', kind:'trusted publisher set', who:'k.belousov@encycam.com', what:'EncyMascot', link:true,
    det:'Connected kbelousov-ency/EncyMascot (name reserved, nothing published yet)' },
  { when:'03 Aug, 14:55', kind:'extension published', who:'liullinil@encycam.com', what:'ency3check', link:true, det:'v0.1.4' },
  { when:'02 Aug, 09:12', kind:'taxonomy changed', who:'ruslan.m@encycam.io', what:'—', det:'+ cladding, + fdm tags' },
  { when:'01 Aug, 18:40', kind:'github unlinked', who:'aynur@encycam.io', what:'aynur-dev', det:'personal account' },
  { when:'01 Aug, 12:02', kind:'trial issued', who:'sven@encycam.com', what:'Export project information', link:true,
    det:'30-day trial' },
  { when:'31 Jul, 16:32', kind:'role change', who:'galilenar@gmail.com', what:'cyrulinas@sprutcam.com', det:'+ admin' },
  { when:'31 Jul, 16:32', kind:'role change', who:'galilenar@gmail.com', what:'rmhusainov@sprut.com', det:'+ admin' },
  { when:'31 Jul, 16:32', kind:'role change', who:'galilenar@gmail.com', what:'marat@encycam.io', det:'+ admin' },
  { when:'31 Jul, 16:32', kind:'role change', who:'galilenar@gmail.com', what:'dinarz@sprut.ru', det:'+ admin' },
  { when:'28 Jul, 16:45', kind:'extension listed', who:'t.ga.liullin@gmail.com', what:'slopeanalyzer', link:true,
    det:'Restored after review' },
  { when:'28 Jul, 16:20', kind:'extension unlisted', who:'t.ga.liullin@gmail.com', what:'slopeanalyzer', link:true,
    det:'Broken package reported, pulled for review' },
  { when:'24 Jul, 11:08', kind:'extension rejected', who:'t.ga.liullin@gmail.com', what:'ency3check', link:true,
    det:'v0.1.3 — crashed on load' },
];

/* the kind filter is a left rail — the vocabulary is long and keeps growing.
   Kinds fold into fixed groups; prefixed kinds drop the shared noun (the group
   label already says it). Within a group busiest first. */
const EV_NAV = [
  ['Extension', k => k.startsWith('extension ')],
  ['GitHub',    k => k.startsWith('github ')],
  ['People',    k => ['role change', 'user joined', 'profiles synced'].includes(k)],
  ['Store',     k => ['trusted publisher set', 'taxonomy changed', 'trial issued'].includes(k)],
];

function eventNav() {
  const map = new Map();
  for (const e of EVENTS) map.set(e.kind, (map.get(e.kind) || 0) + 1);
  const rows = [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const used = new Set();
  const groups = EV_NAV.map(([label, test]) => ({
    label,
    /* [kind, count, short label] */
    kinds: rows.filter(([k]) => test(k) && !used.has(k) && used.add(k))
      .map(([k, n]) => [k, n, k.replace(/^(extension|github) /, '')]),
  })).filter(g => g.kinds.length);
  const rest = rows.filter(([k]) => !used.has(k)).map(([k, n]) => [k, n, k]);
  if (rest.length) groups.push({ label:'Other', kinds:rest });
  return groups;
}

function evNavRow([k, n, label]) {
  return `<button class="evrow ${k === state.eventKind ? 'is-on' : ''}" data-aevent="${esc(k)}">
    <i class="evrow__dot ${EV_KINDS[k] || 'is-plain'}"></i>
    <span>${esc(label)}</span><i class="evrow__n">${n}</i></button>`;
}

function acctEvents() {
  const q = state.eventQuery.trim().toLowerCase();
  let list = state.eventKind === 'all' ? EVENTS : EVENTS.filter(e => e.kind === state.eventKind);
  if (q) list = list.filter(e =>
    (e.who + e.what + e.det + e.kind).toLowerCase().includes(q));
  return `
  <div class="evwrap">
    <aside class="evnav">
      <button class="evrow ${state.eventKind === 'all' ? 'is-on' : ''}" data-aevent="all">
        <i class="evrow__dot is-plain"></i><span>All</span><i class="evrow__n">${EVENTS.length}</i></button>
      ${eventNav().map(g => `
        <div class="evnav__label">${esc(g.label)}</div>
        ${g.kinds.map(evNavRow).join('')}`).join('')}
    </aside>
    <div class="evmain">
      <div class="acct__toolbar">
        <div class="search" style="width:300px;max-width:none">
          <svg><use href="#i-search"/></svg>
          <input class="field" id="eventSearch" type="text" placeholder="Search events" value="${esc(state.eventQuery)}" />
        </div>
      </div>
      <div class="acard acard--flush">
        <table class="atable atable--wide">
          <thead><tr><th>When</th><th>Event</th><th>Who</th><th>What</th><th>Details</th></tr></thead>
          <tbody>${list.length ? list.map(e => `
            <tr>
              <td class="nowrap">${e.when}</td>
              <td><span class="evtag ${EV_KINDS[e.kind] || 'is-plain'}">${e.kind}</span></td>
              <td class="nowrap">${esc(e.who)}</td>
              <td>${e.link ? `<button class="publink" data-aact="open-ext">${esc(e.what)}</button>` : esc(e.what)}</td>
              <td class="${e.good ? 'is-good' : ''}">${esc(e.det)}</td>
            </tr>`).join('')
            : `<tr><td colspan="5" class="atable__none">No events match that search</td></tr>`}</tbody>
        </table>
      </div>
    </div>
  </div>`;
}

/* ---------------------------- developer --------------------------------- */

/* the eight documents in two meaning-columns: the contract you sign, and the
   policy that governs publishing with its schedules */
const LEGAL_GROUPS = [
  ['Your agreement', ['Developer Agreement', 'Commercial Terms', 'SDK Licence Terms', 'Trade Mark Guidelines']],
  ['Publishing rules', ['Publishing Policy', 'Schedule A — Reserved Functionality',
    'Schedule B — Technical Requirements', 'Schedule C — Enforcement and Appeals']],
];

function legalList() {
  return `<div class="legalcols">${LEGAL_GROUPS.map(([label, names]) => `
    <div>
      <div class="legalcol__label">${label}</div>
      <ul class="legal">${names.map(n => {
        const v = LEGAL.find(l => l[0] === n)[1];
        return `<li><button class="publink" data-dev="doc">${esc(n)}</button><span class="legal__v">v${v} ↗</span></li>`;
      }).join('')}</ul>
    </div>`).join('')}</div>`;
}

function termsLine() {
  return `<p class="acard__lead">Publishing is governed by the terms for publishers — ${LEGAL.length} documents.</p>
    <details class="pubmore"><summary>Show the list</summary>${legalList()}</details>`;
}

function devSteps() {
  return DEV.type === 'individual'
    ? [['type','Type'], ['profile','Profile'], ['details','Your details'], ['terms','Terms']]
    : [['type','Type'], ['profile','Profile'], ['details','Your details'], ['company','Company'], ['terms','Terms']];
}

/* one requirement table per step: [path, label, filled?]. It drives BOTH the
   footer message and the per-field highlight, so they can never disagree. */
function devReq(step) {
  const co = DEV.type === 'company';
  if (step === 'details') return [
    ['name', 'Name', !!DEV.name.trim()],
    ['country', 'Country', !!DEV.country],
    ['phone', 'Phone', !!DEV.code && DEV.phone.replace(/\D/g, '').length >= 5],
    ['publicName', 'Public developer name', DEV.publicName.trim().length >= 2],
    ...(co ? [
      ['position', 'Position', !!DEV.position.trim()],
      ['authority', 'the authority confirmation', !!DEV.authority],
    ] : []),
  ];
  if (step === 'company') return [
    ['co.legal', 'Legal name', !!DEV.co.legal.trim()],
    ['co.country', 'Country of incorporation', !!DEV.co.country],
    ['co.reg', 'Registration number', !!DEV.co.reg.trim()],
    ['co.address', 'Registered address', !!DEV.co.address.trim()],
    ['co.control', 'Country of control', !!DEV.co.control],
    /* format check: the one non-emptiness rule in the form */
    ...(DEV.co.web && !/^https:\/\//.test(DEV.co.web) ? [['co.web', 'Website', false]] : []),
  ];
  return [];
}

function devInvalid(step) {
  return new Set(devReq(step).filter(r => !r[2]).map(r => r[0]));
}

function devStepError(step) {
  if ((step === 'type' && !DEV.type) || (step === 'profile' && !DEV.profile)) return 'Choose one of the two.';
  const bad = devReq(step).filter(r => !r[2]);
  if (!bad.length) return '';
  if (bad.length === 1 && bad[0][0] === 'co.web') return 'Website: give the address starting with https://';
  return bad.length === 1 ? `Fill the highlighted field — ${bad[0][1]}.`
    : `Fill the ${bad.length} highlighted fields.`;
}

function choice(group, val, title, sub) {
  const on = DEV[group] === val;
  return `<button class="dchoice ${on ? 'is-on' : ''}" data-dpick="${group}:${val}">
    <span class="frow__radio"></span>
    <span class="dchoice__text"><b>${title}</b><span>${sub}</span></span></button>`;
}

function countrySelect(path, val) {
  return `<select class="field" data-df="${path}">
    <option value="">Choose a country…</option>
    ${COUNTRIES.map(([c, n]) => `<option value="${c}" ${c === val ? 'selected' : ''}>${esc(n)}</option>`).join('')}
  </select>`;
}

function codeSelect() {
  const rows = COUNTRIES.filter(([c]) => DIAL[c]);
  return `<select class="field dphone__code" data-df="code">
    <option value="">Code…</option>
    ${rows.map(([c, n]) => `<option value="${c}" ${c === DEV.code ? 'selected' : ''}>${esc(n)} +${DIAL[c]}</option>`).join('')}
  </select>`;
}

/* `invalid` appears after a failed Next: true = "Required", a string = its
   own message; it clears live as the field is filled (devField) */
function dfield(label, body, hint, req = true, invalid = false) {
  return `<label class="dfield ${invalid ? 'is-invalid' : ''}"><span class="dfield__label">${label}${req ? '' : '<i> · optional</i>'}</span>
    <span class="dfield__body">${body}<span class="dfield__req" ${invalid ? '' : 'hidden'}>${
      typeof invalid === 'string' ? invalid : 'Required'}</span>${
      hint ? `<span class="dfield__hint">${hint}</span>` : ''}</span></label>`;
}

function input(path, val, ph, max) {
  return `<input class="field" data-df="${path}" value="${esc(val)}" placeholder="${esc(ph || '')}" ${max ? `maxlength="${max}"` : ''}>`;
}

function checkRow(attr, on, html, invalid = false, cls = '') {
  return `<button class="dcheck ${cls} ${on ? 'is-on' : ''} ${invalid ? 'is-invalid' : ''}" ${attr}>
    <span class="frow__check"><svg><use href="#i-check-b"/></svg></span><span>${html}</span></button>`;
}

function stepBody(step) {
  const company = DEV.type === 'company';
  const bad = DEV.tried ? devInvalid(step) : new Set();
  if (step === 'type') return `
    <h2 class="dstep__title">Who will publish the extensions?</h2>
    <div class="dchoices ${DEV.tried && !DEV.type ? 'is-invalid' : ''}">
      ${choice('type', 'company', 'A company', 'The agreement is made with your company. We\'ll need its details.')}
      ${choice('type', 'individual', 'Me, as an individual', 'The agreement is made with you personally.')}
    </div>`;
  if (step === 'profile') return `
    <h2 class="dstep__title">What will you publish?</h2>
    <div class="dchoices ${DEV.tried && !DEV.profile ? 'is-invalid' : ''}">
      ${choice('profile', 'free', 'Free extensions only', 'Quick sign-up. You can enable paid extensions later.')}
      ${choice('profile', 'paid', 'Free and paid extensions', 'We\'ll need tax and payout details. Review takes up to 5 business days.')}
    </div>
    ${DEV.profile === 'free' ? `<p class="acct__warn"><svg><use href="#i-warn"/></svg><b>Free means free.</b>
      A free extension can't be unlocked, upgraded or subscribed to outside the Store. If you plan to charge
      for it in any way, choose <i>Free and paid</i>. <button class="publink" data-dev="doc">Publishing Policy §2.4</button></p>` : ''}
    ${DEV.profile === 'paid' ? `<p class="dnote">Paid publishing opens once your tax and payout details are verified
      (Publishing Policy §2.3). Until then you publish free extensions.</p>` : ''}`;
  if (step === 'details') {
    return `
    <h2 class="dstep__title">${company ? 'Company representative' : 'Your details'}</h2>
    <p class="acard__lead">Check your details — taken from your ENCY account.</p>
    <div class="dform">
      ${dfield('Name', input('name', DEV.name, 'First and last name', 300),
        'From your ENCY account — edit it here if it differs.', true, bad.has('name'))}
      ${dfield('Email', `<span class="dinput">
          <input class="field" value="${esc(ME.email)}" readonly>
          <span class="dinput__ok">✓ confirmed</span></span>`,
        'Change it in your ENCY account settings.')}
    </div>
    <div class="dform dform--group">
      ${dfield('Country', countrySelect('country', DEV.country), '', true, bad.has('country'))}
      ${dfield('Phone', `<span class="dphone">${codeSelect()}${input('phone', DEV.phone, 'Enter number')}</span>`,
        'Paste or type it with the code (+49 170…) — the code is picked up.',
        true, bad.has('phone') ? 'Choose a code and enter the number' : false)}
      ${dfield('Public developer name', input('publicName', DEV.publicName, '', 80),
        'Shown on your extensions in the Store.', true, bad.has('publicName'))}
      ${company ? dfield('Position', input('position', DEV.position, 'Your role in the company'),
        '', true, bad.has('position')) : ''}
    </div>
    ${company ? checkRow('data-dev="authority"', DEV.authority,
      'I confirm that I am authorised to enter into binding agreements on behalf of the company I am registering.',
      bad.has('authority'), 'dcheck--apart') : ''}`;
  }
  if (step === 'company') {
    const c = DEV.co;
    return `
    <h2 class="dstep__title">Company</h2>
    <p class="acard__lead">As in the company register. Values from your ENCY account are filled in.</p>
    <div class="dform">
      ${dfield('Legal name', input('co.legal', c.legal, 'As in the register, not a trading name'), '', true, bad.has('co.legal'))}
      ${dfield('Country of incorporation', countrySelect('co.country', c.country), '', true, bad.has('co.country'))}
      ${dfield('Registration number', input('co.reg', c.reg), '', true, bad.has('co.reg'))}
      ${dfield('Registered address', input('co.address', c.address), '', true, bad.has('co.address'))}
      ${dfield('Country of control', countrySelect('co.control', c.control), '', true, bad.has('co.control'))}
      ${dfield('VAT number', input('co.vat', c.vat, 'If the company has one'), '', false)}
      ${dfield('Website', input('co.web', c.web, 'https://'), '', false,
        bad.has('co.web') ? 'Give the address starting with https://' : false)}
    </div>
    <p class="acct__caption acct__caption--foot">Country of control is where the company is ultimately owned or
      controlled from (Publishing Policy §2.1(d)).</p>`;
  }
  const who = company ? `on behalf of <b>${esc(DEV.co.legal)}</b>.` : 'in my own name.';
  const v = n => `(v${LEGAL.find(l => l[0] === n)[1]})`;
  return `
    <h2 class="dstep__title">Developer terms</h2>
    <p class="acard__lead">Publishing on the ENCY Extension Store is governed by the documents below. Please read them before you accept.</p>
    ${legalList()}
    <div class="dbefore">
      <div class="dbefore__title">Before you accept</div>
      <p>Schedule A lists capabilities that ENCY licenses separately. An extension in one of those areas can still
        be published — it checks that the user holds the matching ENCY licence before it runs.</p>
      <p>Not sure your idea is on the right side of the line? <button class="publink" data-dev="ask">Ask us before you build</button>
        — we answer in writing within 20 business days.</p>
    </div>
    ${checkRow('data-dev="tick"', DEV.tick,
      `I have read and agree to the ENCY Extension Store Developer Agreement ${v('Developer Agreement')} and the documents
       incorporated into it — the Publishing Policy ${v('Publishing Policy')} with Schedules A, B and C, the Commercial
       Terms ${v('Commercial Terms')}, the SDK Licence Terms ${v('SDK Licence Terms')} and the Trade Mark Guidelines
       ${v('Trade Mark Guidelines')} — ${who}`, false, 'dcheck--apart')}`;
}

/* the step rail sits to the LEFT of the card — the whole form at a glance.
   Done steps are buttons: you can jump back to fix something; forward is only
   through Next, so validation is never skipped. */
function devWizard() {
  const steps = devSteps();
  const i = Math.min(DEV.step, steps.length - 1);
  const step = steps[i][0];
  const err = DEV.tried ? devStepError(step) : '';
  const last = step === 'terms';
  return `
  <div class="acard dwiz">
    <ol class="drail">${steps.map(([, label], k) => `
      <li class="${k === i ? 'is-on' : k < i ? 'is-done' : ''}">${k < i
        ? `<button class="drail__row drail__jump" data-dev="goto" data-step="${k}"
             title="Back to this step"><i>✓</i>${label}</button>`
        : `<span class="drail__row"><i>${k + 1}</i>${label}</span>`}</li>`).join('')}
    </ol>
    <div class="dwiz__main">
      <div class="dstep">${stepBody(step)}</div>
      <div class="dwiz__foot">
        <button class="btn-secondary" data-dev="back">${i ? 'Back' : 'Cancel'}</button>
        <span class="acct__hspacer"></span>
        ${err ? `<span class="dwiz__err">${esc(err)}</span>` : ''}
        ${last
          ? `<span class="acct__caption">${DEV.tick ? 'Recorded with the date and the versions above.' : 'Tick the box above to agree.'}</span>
             <button class="btn-primary" data-dev="agree" ${DEV.tick ? '' : 'disabled'}>I Agree</button>`
          : `<button class="btn-primary" data-dev="next">Next</button>`}
      </div>
    </div>
  </div>`;
}

function factRow(label, value) {
  return `<div class="drow"><span class="drow__label">${label}</span><span class="drow__value">${value}</span></div>`;
}

function devDone() {
  const company = DEV.type === 'company';
  const c = DEV.co;
  const profile = DEV.paid === 'enabled' ? 'Free and paid extensions'
    : `Free extensions only ${DEV.paid === 'requested'
        ? '<span class="statetag is-wait">paid requested · waiting for a moderator</span>'
        : '<button class="btn-secondary" data-dev="enable-paid">Enable paid extensions</button>'}`;
  return `
  ${DEV.justAgreed ? `<div class="dbanner"><svg><use href="#i-check-circle"/></svg>
    You are a developer now. Publish from the <button class="publink" data-dev="to-publish">Publish page</button>;
    a paid extension is priced in My published.</div>` : ''}
  ${DEV.paid === 'requested' ? `<div class="acard dpaidnote">
    <p class="acard__lead">Paid extensions requested. Set up your payout account in
      <button class="publink" data-dev="to-earnings">Earnings</button>; a moderator enables paid extensions once it is ready.</p>
    <p class="dproto">Prototype only: <button class="publink" data-dev="approve-paid">approve as a moderator</button></p>
  </div>` : ''}
  <div class="acard">
    <div class="acard__head"><svg class="acard__icon"><use href="#i-dev"/></svg><h2 class="acard__title">Developer details</h2></div>
    ${factRow('Developer', `${esc(company ? c.legal : DEV.name)} · ${company ? 'company' : 'individual'}`)}
    ${factRow('Public name', esc(DEV.publicName))}
    ${factRow('Profile', profile)}
    ${company ? `
      ${factRow('Registration', `${esc(c.reg)} · ${esc(countryName(c.country))}`)}
      ${factRow('Address', esc(c.address))}
      ${factRow('Controlled from', esc(countryName(c.control)))}
      ${c.vat ? factRow('VAT', esc(c.vat)) : ''}
      ${factRow('Representative', `${esc(DEV.name)} · ${esc(DEV.position)}`)}` : factRow('Country', esc(countryName(DEV.country)))}
    <p class="acct__caption acct__caption--foot">Part of your agreement — other changes go through the store team.</p>
  </div>
  <div class="acard">
    <div class="acard__head"><svg class="acard__icon"><use href="#i-check-circle"/></svg><h2 class="acard__title">Terms you accepted</h2></div>
    <p class="acard__lead">${fmtDate(DEV.accepted)} · ${company
      ? `Accepted on behalf of ${esc(c.legal)} · authority confirmed` : `Accepted in own name — ${esc(DEV.name)}`}</p>
    ${legalList()}
    <div class="pubcard__foot"><button class="btn-secondary" data-dev="record"><svg><use href="#i-download"/></svg>Download record</button></div>
  </div>
  ${NEWBIE ? `<p class="dproto">Prototype only: <button class="publink" data-dev="reset">start this account over</button></p>` : ''}`;
}

function acctDeveloper() {
  if (DEV.stage === 'wizard') return devWizard();
  if (DEV.stage === 'done') return devDone();
  return `
  <div class="acard">
    <div class="acard__head"><svg class="acard__icon"><use href="#i-dev"/></svg><h2 class="acard__title">Become a developer</h2></div>
    <p class="acard__lead">Publish extensions on the ENCY Extension Store — free ones, or paid ones sold here. Say who
      publishes, a company or you, then accept the terms. Every step is saved, so you can stop and come back.</p>
    <div class="dterms">${termsLine()}</div>
    <div class="pubcard__foot"><button class="btn-primary" data-dev="become"><svg><use href="#i-dev"/></svg>Become a developer</button></div>
  </div>`;
}

/* ---------------------------- earnings ---------------------------------- */

const PAYOUT_FLOOR = 10000;

function payoutCountry() { return DEV.type === 'company' ? DEV.co.country : DEV.country; }

function payoutBlock() {
  if (!isDeveloper()) return 'Accept the developer terms first';
  const cc = payoutCountry();
  if (!CONNECT.has(cc)) return `Payouts to ${cc} are not supported yet: Stripe Connect pays out to the US, the UK, the EEA, Canada and Switzerland`;
  return '';
}

function acctEarnings() {
  const why = payoutBlock();
  let payouts;
  if (why) payouts = `<p class="acard__lead">${esc(why)}</p>`;
  else if (DEV.payouts === 'none') payouts = `
    <p class="acard__lead">Your share is paid to a Stripe account of yours. You enter your bank and identity details
      at Stripe — the store never sees them.</p>
    <div class="pubcard__foot"><button class="btn-primary" data-dev="payouts"><svg><use href="#i-ext"/></svg>Set up payouts</button></div>`;
  else if (DEV.payouts === 'started') payouts = `
    <p class="acard__lead">Stripe still needs some details from you before it can pay you.</p>
    <div class="pubcard__foot"><button class="btn-primary" data-dev="payouts"><svg><use href="#i-ext"/></svg>Continue setup at Stripe</button></div>`;
  else payouts = `
    <p class="acard__lead">Payouts are set up (${payoutCountry()}). Stripe pays you after each transfer.</p>
    <div class="pubcard__foot"><button class="btn-secondary" data-dev="dashboard"><svg><use href="#i-ext"/></svg>Open your Stripe dashboard</button></div>`;
  return `
  <div class="acard">
    <div class="acard__head"><svg class="acard__icon"><use href="#i-coins"/></svg><h2 class="acard__title">Payouts</h2></div>
    ${payouts}
  </div>
  <div class="acard">
    <div class="acard__head"><h2 class="acard__title">Balance</h2></div>
    <div class="dbal"><b>${fmtMoney(0)}</b> to be paid out</div>
    <div class="dbar"><i style="width:0"></i></div>
    <p class="acct__caption">${fmtMoney(PAYOUT_FLOOR)} more and the balance goes out in the monthly payout.
      What stays under ${fmtMoney(PAYOUT_FLOOR)} is paid in December.</p>
  </div>
  <div class="acard">
    <p class="acard__lead">No sales yet — they show here as soon as someone buys.</p>
    <p class="acct__caption acct__caption--foot">Your share is 70% of the price. Refunds and lost disputes take it back.</p>
  </div>`;
}

/* ---------------------------- account shell ----------------------------- */

const ACCT_BODY = {
  profile:acctProfile, published:acctPublished, licenses:acctLicenses,
  payments:acctPayments, subscriptions:acctSubscriptions,
  developer:acctDeveloper, earnings:acctEarnings,
  signing:acctSigning, packages:acctPackages,
  stats:acctStats, moderation:acctModeration, people:acctPeople,
  repos:acctRepos, events:acctEvents,
};

/* section title + the count/name shown next to it */
const ACCT_HEAD = {
  stats:     { icon:'i-chart',   title:'Statistics' },
  moderation:{ icon:'i-gavel',   title:'Requests', count:() => REQUESTS.length },
  people:    { icon:'i-people',  title:'People', count:() => PEOPLE.length, dot:true },
  repos:     { icon:'i-github',  title:'Connected repositories', count:() => REPOS.length, dot:true },
  events:    { icon:'i-history', title:'Events', count:() => EVENTS.length, dot:true },
};

function renderAccount() {
  const sec = state.acct;
  const isAdmin = ME.roles.includes('Admin');
  const nav = ACCT_NAV.filter(n => (!n.admin || isAdmin) && (!n.when || n.when()));
  const head = ACCT_HEAD[sec];
  const title = head
    ? `${head.icon ? `<svg class="acct__h1icon"><use href="#${head.icon}"/></svg>` : ''}${head.title}${
        head.count ? `<span class="acct__h1n">${head.dot ? '· ' : ''}${head.count()}</span>` : ''}`
    : ACCT_NAV.find(n => n.id === sec).label;
  $('#storeBody').innerHTML = `
  <div class="acct ${head ? 'acct--wide' : ''}">
    <nav class="acct__nav">
      ${nav.map((n, i) => `
        ${n.admin && !nav[i - 1].admin ? '<div class="acct__navsep"></div><div class="acct__navlabel">Admin</div>' : ''}
        <button class="anav ${n.id === sec ? 'is-on' : ''}" data-asec="${n.id}">
          <svg><use href="#${n.icon}"/></svg>${n.label}
        </button>`).join('')}
    </nav>
    <div class="acct__main">
      <h1 class="acct__h1">${title}</h1>
      ${(ACCT_BODY[sec] || acctProfile)()}
    </div>
  </div>`;
}

/* ------------------------------ price ----------------------------------- */

/* the owner's floors and ceiling, in dollars */
const PRICE_MIN = { once:19, month:10 };
const PRICE_MAX = 10000;

function openPrice(id) {
  const e = EXTS.find(x => x.id === id);
  const has = k => (e.prices || []).find(p => p.kind === k);
  state.priceFor = id;
  state.priceDraft = {
    paid: !!e.prices,
    once: { on: !!has('once'), val: has('once') ? String(has('once').cents / 100) : '' },
    month:{ on: !!has('month'), val: has('month') ? String(has('month').cents / 100) : '' },
  };
  renderPrice();
}
function closePrice() { state.priceFor = null; renderPrice(); }

/* what is wrong with one plan right now, or '' */
function priceProblem(k) {
  const d = state.priceDraft[k];
  if (!d.on) return '';
  const v = Number(d.val.replace(',', '.'));
  if (d.val.trim() === '' || !Number.isFinite(v)) return 'enter a price';
  if (v < PRICE_MIN[k]) return `starts at $${PRICE_MIN[k]}`;
  if (v > PRICE_MAX) return `at most $${PRICE_MAX}`;
  return '';
}

/* Free or Paid is the first choice, and the switch is the gate: Free hides the
   plans instead of greying them out. Paid lists the two plans the owner names,
   each ticked on its own; the yearly one follows the monthly and is only shown. */
function renderPrice() {
  const win = $('#priceWin');
  const e = state.priceFor && EXTS.find(x => x.id === state.priceFor);
  if (!e) { win.hidden = true; return; }
  win.hidden = false;
  const d = state.priceDraft;
  $('#pCap').textContent = `Price · ${e.name}`;
  const row = (k) => {
    const err = priceProblem(k);
    return `
    <div class="prow ${d[k].on ? '' : 'is-off'}">
      <button class="frow ${d[k].on ? 'is-on' : ''}" data-pplan="${k}">
        <span class="frow__check"><svg><use href="#i-check-b"/></svg></span><span>${PLAN[k].label}</span></button>
      <span class="prow__amt">$<input class="field" data-pval="${k}" inputmode="decimal"
        value="${esc(d[k].val)}" ${d[k].on ? '' : 'disabled'}>${PLAN[k].suffix ? `<i>${PLAN[k].suffix}</i>` : ''}</span>
      <span class="prow__hint ${err ? 'is-bad' : ''}">${err || `from $${PRICE_MIN[k]}`}</span>
    </div>`;
  };
  const month = d.month.on && !priceProblem('month') ? Number(d.month.val.replace(',', '.')) : null;
  const none = !d.once.on && !d.month.on;
  $('#priceBody').innerHTML = `
  <div class="pform">
    <div class="segmented segmented--full">
      <button class="${d.paid ? '' : 'is-on'}" data-pmode="free">Free</button>
      <button class="${d.paid ? 'is-on' : ''}" data-pmode="paid">Paid</button>
    </div>
    ${d.paid ? `
    <div class="pform__rows">
      ${row('once')}
      ${row('month')}
      <div class="prow ${month === null ? 'is-off' : ''}">
        <span class="prow__label">Yearly</span>
        <span class="prow__amt"><b>${month === null ? '—' : fmtMoney(month * 1000)}</b><i>/yr</i></span>
        <span class="prow__hint">ten monthly payments</span>
      </div>
    </div>
    <p class="acct__caption">${none ? '<span class="is-bad">Tick at least one plan, or make it free.</span>'
      : 'Buyers see every plan you tick and pick one. Running subscriptions keep the price they were bought at.'}</p>`
    : `<p class="acct__caption">Anyone can install it. Versions published while it is free stay free after you set a price.</p>`}
  </div>`;
  const bad = d.paid && (none || priceProblem('once') || priceProblem('month'));
  $('#pSave').disabled = !!bad;
}

/* ------------------------------ publish --------------------------------- */

/* Two routes, side by side: the connected one (GitHub) and the manual one
   (a prepared .nupkg). Numbered steps, because the order matters. */
/* the package the upload pretends to read — the one sent along with the mock */
function upPackage() {
  return NEWBIE
    ? { id:'Mardanshin.NewAuthor10291', name:'NewAuthor10291', ver:'1.0.0' }
    : { id:'Mardanshin.TestStore10291', name:'TestStore10291', ver:'1.0.0' };
}

function upMissing() {
  const u = state.up;
  if (u.paid && DEV.paid !== 'enabled')
    return 'Your developer profile is Free, and a paid extension needs the Paid profile (Publishing Policy §2.3).';
  if (!u.sched) return 'Under Reserved functionality, answer whether your extension does any of the listed things.';
  if (u.sched === 'yes' && !u.areas.length) return 'Under Reserved functionality, tick the areas your extension works in.';
  if (u.decl.some(x => !x)) return 'Tick all three statements under Declarations.';
  return '';
}

function upReview() {
  const u = state.up, p = upPackage();
  const miss = upMissing();
  return `
  <section class="pubcard upreview">
    <div class="pubcard__head">
      <svg class="pubcard__icon"><use href="#i-box"/></svg>
      <h2 class="pubcard__title">${p.id} <span class="acct__aside">${p.ver} · by ${esc(DEV.publicName || ME.name)}</span></h2>
      <span class="acct__hspacer"></span>
      <button class="btn-secondary" data-up="cancel"><svg><use href="#i-upload"/></svg>Choose another package</button>
    </div>
    <p class="upreview__hint">Wrong file? <button class="publink" data-up="cancel">Go back and pick another package</button> —
      nothing is sent until you submit.</p>

    <div class="upgrid">
      <div class="upsec">
        <div class="upsec__title">Store card</div>
        <p class="upsec__sub">The card itself is read from inside the package — here you pick
          the pricing, the category and the tags.</p>
        <div class="upcol__label">Pricing</div>
        <div class="dchoices uppick">
          <button class="dchoice ${u.paid ? '' : 'is-on'}" data-up="paid:free"><span class="frow__radio"></span>
            <span class="dchoice__text"><b>Free</b><span>Anyone installs it from the store.</span></span></button>
          <button class="dchoice ${u.paid ? 'is-on' : ''}" data-up="paid:paid"><span class="frow__radio"></span>
            <span class="dchoice__text"><b>Paid</b><span>Requires a license bought in the store.</span></span></button>
        </div>
        <div class="upcol__label">Category</div>
        <select class="field upfield" data-upf="cat">
          <option value="">Let a moderator sort it</option>
          ${CATS.filter(c => c.id !== 'all').map(c => `<option value="${c.id}" ${u.cat === c.id ? 'selected' : ''}>${esc(c.label)}</option>`).join('')}
        </select>
        <div class="upcol__label">Tags</div>
        <div class="uptags">
          <span class="xtag">ency-extension</span><span class="xtag">utility</span>
          ${u.tags.map((t, i) => `<span class="xtag uptag">${esc(t)}<button class="uptag__x" data-up="tagdel:${i}" aria-label="Remove ${esc(t)}">×</button></span>`).join('')}
          <input class="uptags__in" placeholder="Add a tag…">
        </div>
        <p class="dfield__hint">ency-extension and utility come from the package.</p>
        <div class="upcol__label">Card preview</div>
        <div class="upcard">
          <button class="upcard__pick" data-up="icon" title="Upload the card icon">
            ${u.icon
              ? `<img class="upcard__img" src="${u.icon}" alt="">
            <span class="upcard__pickhint"><svg><use href="#i-upload"/></svg></span>`
              : `<span class="upcard__ph"><svg><use href="#i-upload"/></svg></span>`}
            <span class="upcard__plus">+</span>
          </button>
          <input type="file" accept="image/png,image/jpeg" class="upcard__file" hidden>
          <div><b>${p.name}</b><span>${esc(DEV.publicName || ME.name)} · ${u.paid ? 'Paid' : 'Free'}</span></div>
        </div>
        <p class="acct__caption">Approximate look — the live card renders once the catalog indexes
          the package. ${u.icon
            ? `The icon is set here; ship PNG or JPG files in the package's <code>screenshots/</code>
          folder to add a cover too.`
            : `There are no pictures inside: click the icon to upload one, or ship PNG or JPG files
          in the package's <code>screenshots/</code> folder.`} There is no README in the package.</p>
      </div>

      <div class="upsec">
        <div class="upsec__title">Reserved functionality</div>
        <p class="upsec__sub">Some capabilities are licensed by ENCY separately. An extension may still offer them, but each
          such function must check that the user holds the matching ENCY licence.
          <button class="publink" data-dev="doc">Schedule A (v1.0)</button></p>
        <p class="sched__q">Does your extension do any of the following?</p>
        <div class="dchoices uppick">
          <button class="dchoice ${u.sched === 'no' ? 'is-on' : ''}" data-up="sched:no"><span class="frow__radio"></span>
            <span class="dchoice__text"><b>No</b><span>It does not provide any capability listed in Schedule A.</span></span></button>
          <button class="dchoice ${u.sched === 'yes' ? 'is-on' : ''}" data-up="sched:yes"><span class="frow__radio"></span>
            <span class="dchoice__text"><b>Yes</b><span>It provides capabilities in these areas:</span></span></button>
        </div>
        <div class="sched__areas ${u.sched === 'yes' ? '' : 'is-off'}">
          <table class="atable sched__table">
            <thead><tr><th></th><th>Area</th><th>Required ENCY licence</th></tr></thead>
            <tbody>${RESERVED.map(([id, area, lic]) => `
              <tr data-up="area:${id}"><td class="sched__ck">${checkRow('', u.areas.includes(id), '')}</td>
                <td><span class="acct__aside">${id}</span> ${esc(area)}</td><td>${esc(lic)}</td></tr>`).join('')}</tbody>
          </table>
        </div>
        <p class="acct__caption">Each function of your extension in an area must check the licence for that area. A licence
          for one area does not unlock functions in another. (Publishing Policy §4.3)</p>
        <p class="acct__caption">Not sure which areas apply? <button class="publink" data-dev="ask">Ask us before you submit.</button>
          Pre-submission determination (Publishing Policy §4.6)</p>
      </div>
    </div>

    <div class="upsec upsec--rule">
      <div class="upsec__title">Declarations</div>
      <div class="sched__decl">${DECLARATIONS.map((t, i) => checkRow(`data-up="decl:${i}"`, u.decl[i], t)).join('')}</div>
    </div>

    <div class="dwiz__foot">
      <span class="${miss ? 'dwiz__err' : 'acct__caption'}">${miss || 'A first-time extension is reviewed by a moderator before it appears in the catalog; new versions of an approved extension go live right after indexing.'}</span>
      <span class="acct__hspacer"></span>
      <button class="btn-primary" data-up="submit" ${miss ? 'disabled' : ''}><svg><use href="#i-upload"/></svg>Submit for review</button>
    </div>
  </section>`;
}

function upDone() {
  const p = upPackage();
  return `
  <div class="pub">
    <section class="pubcard updone">
      <h1 class="pub__h1">Published 🎉</h1>
      <p class="acard__lead">The catalog indexes the package within a few minutes. <b>${p.id} ${p.ver}</b> is a new
        extension, so it stays “On moderation” until a moderator approves it — you can track the status in My published.</p>
      <div class="pubcard__foot">
        <button class="btn-primary" data-up="to-published"><svg><use href="#i-store"/></svg>My published</button>
        <button class="btn-secondary" data-up="again">Publish another</button>
      </div>
    </section>
  </div>`;
}

/* Until the developer terms are accepted, a card on top says so once, and the
   upload route only points back at it. */
function renderPublish() {
  if (state.up && state.up.step === 'done') { $('#storeBody').innerHTML = upDone(); return; }
  /* the package is picked: the review form takes the page over — the chooser
     comes back through "Choose another" */
  if (state.up) {
    $('#storeBody').innerHTML = `
  <div class="pub">
    <h1 class="pub__h1">Publish an extension</h1>
    ${upReview()}
  </div>`;
    return;
  }
  const gate = !isDeveloper();
  const way = state.way;
  const tile = (id, head, desc) => `
      <button class="dchoice pubway ${way === id ? 'is-on' : ''}" data-way="${id}"
        role="radio" aria-checked="${way === id}">
        <span class="frow__radio"></span>
        <span class="pubway__text">
          <span class="pubway__head">${head}</span>
          <span class="pubway__desc">${desc}</span>
        </span>
      </button>`;
  $('#storeBody').innerHTML = `
  <div class="pub">
    <h1 class="pub__h1">Publish an extension</h1>
    <p class="pub__lead">There are two ways to get an extension into the store — pick the one
      that fits where your code lives.</p>
    ${gate ? `
    <section class="pubcard pubgate">
      <div class="pubcard__head">
        <svg class="pubcard__icon"><use href="#i-dev"/></svg>
        <h2 class="pubcard__title">Before your first publish — once</h2>
      </div>
      <p class="pubintro">Become a developer in your account: who publishes (a company or you), free or paid extensions,
        your details, then <b>I Agree</b>. Until then the store turns every publish away, from GitHub too.</p>
      <p class="pubintro">Publishing is governed by the
        <button class="publink" data-dev="doc">terms for publishers</button> — ${LEGAL.length} documents; read them before you register.</p>
      <details class="pubmore"><summary>Show the list</summary>${legalList()}</details>
      <div class="pubcard__foot"><button class="btn-primary" data-pact="become"><svg><use href="#i-dev"/></svg>Become a developer</button></div>
    </section>` : ''}
    <div class="pubrow">
    <div class="pubways" role="radiogroup" aria-label="How to publish">
      ${tile('github',
        '<svg><use href="#i-github"/></svg><b>Publish from GitHub</b><span class="pubtag">Recommended</span>',
        'Code lives — or could live — in a GitHub repository. Connect once; every new version then publishes itself.')}
      ${tile('nupkg',
        '<svg><use href="#i-clip"/></svg><b>Upload a .nupkg</b>',
        'Code outside GitHub, a one-off release, or a package your own build already produces — you upload every version by hand.')}
    </div>
    ${way === 'github' ? `
    <section class="pubcard pubsteps">
      <ol class="publist">
        <li>Start from the template repository — the workflow that builds and publishes is already in it.</li>
        <li>Write your code in <code>src/</code>; the card text lives in <code>src/readme.md</code> and <code>src/package.info.json</code>.</li>
        ${gate ? '<li><b>Become a developer</b> — once, above.</li>' : ''}
        <li><a class="publink" href="#" data-pact="signin">Sign in with GitHub</a> once — after that every repository of yours publishes with nothing to connect and no token anywhere.</li>
        <li>Publish: in your repository open <b>Actions</b> → <b>publish-to-ency-store</b> → <b>Run workflow</b> and press the green button, fields left empty — it works out the next version by itself.
          <details class="pubmore"><summary>...or from the terminal</summary>
            <pre class="pubcode">gh workflow run publish-to-ency-store</pre>
          </details>
        </li>
      </ol>
      <p class="pubnote">GitHub builds it, the store packs and publishes it — and says how it went under
        <a class="publink" href="#" data-pact="published">My published</a>, failures included, so there is nothing
        to chase on GitHub. Your first extension waits for a moderator; its card link works meanwhile,
        and later versions appear at once.</p>
      <div class="pubcard__foot">
        <button class="btn-primary" data-pact="template"><svg><use href="#i-github"/></svg>Use the template</button>
        <button class="btn-link" data-pact="ai">AI-based development</button>
      </div>
    </section>` : `
    <section class="pubcard pubsteps">
      <ol class="publist">
        <li>Build it in the ENCY format (e.g. <code>dotnet pack</code>) — it must contain a <code>*.settings.json</code> manifest and the extension <code>.dll</code>.</li>
        <li>Drop the package below — or click the area to pick it. The card preview and the review form open here.</li>
        <li>Press Submit for review. The package goes to the feed exactly as built, so everything on the card is read from inside it and cannot be edited here.</li>
      </ol>
      ${gate ? `
      <div class="updrop is-off">
        <svg><use href="#i-upload"/></svg>
        <b>The upload opens later</b>
        <span>become a developer above first</span>
      </div>` : `
      <button class="updrop" data-up="choose">
        <svg><use href="#i-upload"/></svg>
        <b>Drop your .nupkg here</b>
        <span>or click to choose a file</span>
      </button>`}
    </section>`}
    </div>
  </div>`;
}

/* ------------------------------ render root ----------------------------- */

/* scope segment + the two toggles that sit beside it */
function renderToolbar() {
  const inst = EXTS.filter(e => state.installed.has(e.id)).length;
  const scopes = [
    { id:'all',       label:'All',       n:EXTS.length },
    { id:'installed', label:'Installed', n:inst },
  ];
  $('#scopeSeg').innerHTML = scopes.map(s => `
    <button class="${state.scope === s.id ? 'is-on' : ''}" data-scope="${s.id}">
      ${s.label}<i class="seg__n">${s.n}</i></button>`).join('');
  $('#favBtn').classList.toggle('is-on', state.favsOnly);
  /* on: the solid star glyph, matching the card badge */
  $('#favBtn use').setAttribute('href', state.favsOnly ? '#i-star-fill' : '#i-star');
  $('#funnelBtn').classList.toggle('is-on', state.filters);
  /* a hidden panel still filtering is worth saying out loud */
  const n = filterCount();
  const badge = $('#funnelCnt');
  badge.hidden = state.filters || !n;
  badge.textContent = n;
  $('#sortLabel').textContent = SORTS.find(s => s.id === state.sort).label;
}

function render() {
  const sub = state.page !== 'store';           /* publish / account */
  $('#side').hidden = sub || !state.filters;
  $('#backBtn').hidden = !sub;
  /* the scope segment belongs to the store page, so it leaves with it */
  ['#scopeSeg','#scopeSep','#favBtn','#funnelBtn','#viewMode','#sortBtn']
    .forEach(s => { $(s).style.display = sub ? 'none' : ''; });
  $('#searchField').parentElement.style.display = sub ? 'none' : '';
  if (sub) {
    $('#storeTitle').textContent = state.page === 'publish'
      ? 'Publish an extension' : 'Account settings';
    (state.page === 'publish' ? renderPublish : renderAccount)();
    return;
  }
  const cat = CATS.find(c => c.id === state.cat);
  $('#storeTitle').textContent = state.cat === 'all' ? 'Extensions' : cat.label;
  renderToolbar();
  renderList();
  renderCatRows();
  renderPriceFilter();
  renderTags();
  renderPubMenu();
  renderDetail();
}

/* ------------------------------ menus ----------------------------------- */

function renderSortMenu() {
  $('#sortMenu').innerHTML = SORTS.map(s => `
    <button class="${state.sort === s.id ? 'is-checked' : ''}" data-sort="${s.id}">
      <svg class="ck"><use href="#i-check"/></svg>${s.label}
    </button>`).join('');
}

function applyThemeLabel() {
  const light = document.documentElement.dataset.theme === 'light';
  $('#themeLabel').textContent = light ? 'Dark theme' : 'Light theme';
  $('#userMenu .th-moon').style.display = light ? '' : 'none';
  $('#userMenu .th-sun').style.display = light ? 'none' : '';
}

/* ------------------------------ events ---------------------------------- */

/* sidebar */
$('#sideBody').addEventListener('click', ev => {
  const cat = ev.target.closest('[data-cat]');
  if (cat) { state.cat = cat.dataset.cat; render(); return; }
  const price = ev.target.closest('[data-price]');
  if (price) { state.price = price.dataset.price; render(); return; }
  const tag = ev.target.closest('[data-tag]');
  if (tag) {
    const t = tag.dataset.tag;
    state.tags.has(t) ? state.tags.delete(t) : state.tags.add(t);
    render(); return;
  }
});
$('#tagSearch').addEventListener('input', ev => { state.tagQuery = ev.target.value; renderTags(); });
$('#pubSelect').addEventListener('click', ev => {
  ev.stopPropagation(); renderPubMenu(); openMenu($('#pubMenu'), $('#pubSelect'));
});
$('#pubMenu').addEventListener('click', ev => {
  const b = ev.target.closest('[data-pub]');
  if (!b) return;
  state.pub = b.dataset.pub; closeMenus(); render();
});
$('#resetBtn').addEventListener('click', () => {
  state.cat = 'all'; state.price = 'all'; state.tags.clear(); state.pub = '';
  state.tagQuery = ''; $('#tagSearch').value = '';
  state.scope = 'all'; state.favsOnly = false;
  render();
});

/* content head */
$('#searchField').addEventListener('input', ev => {
  state.query = ev.target.value; renderList();
});
$('#scopeSeg').addEventListener('click', ev => {
  const b = ev.target.closest('[data-scope]');
  if (!b) return;
  state.scope = b.dataset.scope; render();
});
$('#favBtn').addEventListener('click', () => { state.favsOnly = !state.favsOnly; render(); });
$('#funnelBtn').addEventListener('click', () => { state.filters = !state.filters; render(); });
$('#viewMode').addEventListener('click', ev => {
  const b = ev.target.closest('[data-mode]');
  if (!b) return;
  state.view = b.dataset.mode;
  $('#viewMode').querySelectorAll('button').forEach(x =>
    x.classList.toggle('is-active', x === b));
  renderList();
});
$('#sortBtn').addEventListener('click', ev => {
  ev.stopPropagation(); renderSortMenu(); openMenu($('#sortMenu'), $('#sortBtn'));
});
$('#sortMenu').addEventListener('click', ev => {
  const b = ev.target.closest('[data-sort]');
  if (!b) return;
  state.sort = b.dataset.sort; closeMenus(); render();
});
$('#backBtn').addEventListener('click', () => {
  state.page = 'store'; render();
});

/* ---- extension view ---- */

function openDetail(id) {
  state.detail = id; state.shot = 0; state.aboutOpen = false; state.plan = null;
  render();
}
function closeDetail() { state.detail = null; render(); }

/* the sticky sidebar's cap is measured, so it has to be re-measured on resize */
addEventListener('resize', () => {
  const sc = $('#detailBody');
  if (!$('#detailWin').hidden) sc.style.setProperty('--dwin-scroll-h', sc.clientHeight + 'px');
});

$('#dClose').addEventListener('click', closeDetail);
$('#detailWin').addEventListener('click', ev => {
  if (ev.target === $('#detailWin')) closeDetail();       /* click-off the backdrop */
});
$('#dCopy').addEventListener('click', () => {
  const e = EXTS.find(x => x.id === state.detail);
  if (!e) return;
  navigator.clipboard?.writeText(`ency://store/${e.pkg}`);
  toast('Link copied');
});
$('#detailBody').addEventListener('click', ev => {
  const shot = ev.target.closest('[data-shot]');
  if (shot && !shot.disabled) { state.shot = +shot.dataset.shot; renderDetail(); return; }
  const more = ev.target.closest('#dMore');
  if (more) { state.aboutOpen = !state.aboutOpen; renderDetail(); return; }
  const copy = ev.target.closest('[data-dact="copy-pkg"]');
  if (copy) {
    const e = EXTS.find(x => x.id === state.detail);
    navigator.clipboard?.writeText(e.pkg);
    toast('Package id copied');
    return;
  }
  /* a tag is a way back into the catalog, filtered by it */
  const tag = ev.target.closest('[data-dtag]');
  if (tag) {
    state.tags.clear(); state.tags.add(tag.dataset.dtag);
    state.filters = true; state.detail = null;
    render(); return;
  }
  const star = ev.target.closest('[data-star]');
  if (star) {
    const id = star.dataset.star;
    state.favs.has(id) ? state.favs.delete(id) : state.favs.add(id);
    render(); return;
  }
  const like = ev.target.closest('[data-like]');
  if (like) { toggleLike(like.dataset.like); render(); return; }
  /* the plan switch only redraws the sidebar's button and terms */
  const plan = ev.target.closest('[data-plan]');
  if (plan) { state.plan = plan.dataset.plan; renderDetail(); return; }
  /* Buy leaves for Stripe's checkout and comes back owning it */
  const buy = ev.target.closest('[data-buy]');
  if (buy) {
    state.owned.set(state.detail, '2026-10-06');
    toast(buy.dataset.buy === 'once' ? 'Paid — the extension is yours' : 'Subscribed — the extension is yours');
    render(); return;
  }
  const nupkg = ev.target.closest('[data-dact="nupkg"]');
  if (nupkg) { toast('Package download — not in this prototype'); return; }
  const inst = ev.target.closest('[data-install]');
  if (inst) { toggleInstall(inst.dataset.install); render(); }
});

/* owner's price window */
$('#pClose').addEventListener('click', closePrice);
$('#pCancel').addEventListener('click', closePrice);
$('#priceWin').addEventListener('click', ev => {
  if (ev.target === $('#priceWin')) { closePrice(); return; }
  const mode = ev.target.closest('[data-pmode]');
  if (mode) { state.priceDraft.paid = mode.dataset.pmode === 'paid'; renderPrice(); return; }
  const pp = ev.target.closest('[data-pplan]');
  if (pp) {
    const d = state.priceDraft[pp.dataset.pplan];
    d.on = !d.on;
    renderPrice();
    if (d.on) $(`[data-pval="${pp.dataset.pplan}"]`).focus();
  }
});
/* typing redraws the rows, so the caret is put back where it was */
$('#priceWin').addEventListener('input', ev => {
  const k = ev.target.dataset.pval;
  if (!k) return;
  state.priceDraft[k].val = ev.target.value;
  const at = ev.target.selectionStart;
  renderPrice();
  const f = $(`[data-pval="${k}"]`);
  f.focus(); f.setSelectionRange(at, at);
});
$('#pSave').addEventListener('click', () => {
  const e = EXTS.find(x => x.id === state.priceFor);
  const d = state.priceDraft;
  const cents = k => Math.round(Number(d[k].val.replace(',', '.')) * 100);
  if (!d.paid) { delete e.prices; e.paid = false; }
  else {
    e.prices = [];
    if (d.once.on) e.prices.push({ kind:'once', cents:cents('once') });
    if (d.month.on) e.prices.push({ kind:'month', cents:cents('month') }, { kind:'year', cents:cents('month') * 10 });
    e.paid = true;
  }
  toast(d.paid ? `${e.name} — ${e.prices.map(priceTag).join(' · ')}` : `${e.name} is free`);
  closePrice();
  renderAccount();
});

/* developer registration, payouts and the upload — each returns true if it
   took the click */
function devClick(ev) {
  const pick = ev.target.closest('[data-dpick]');
  if (pick) {
    const [g, v] = pick.dataset.dpick.split(':');
    DEV[g] = v; DEV.tried = false; saveDev(); renderAccount();
    return true;
  }
  const become = ev.target.closest('[data-pact="become"]');
  if (become) {
    ev.preventDefault();
    DEV.ret = 'publish'; saveDev();
    state.page = 'account'; state.acct = 'developer'; render();
    return true;
  }
  const b = ev.target.closest('[data-dev]');
  if (!b) return false;
  const a = b.dataset.dev;
  const page = () => { saveDev(); render(); };
  if (a === 'doc') toast('Opens the document on encycam.com/legal/extension-store — not in this prototype');
  else if (a === 'ask') toast('Pre-submission question — not in this prototype');
  else if (a === 'record') toast('Acceptance record (JSON) — not in this prototype');
  else if (a === 'dashboard') toast('Stripe Express dashboard — not in this prototype');
  else if (a === 'become') { DEV.stage = 'wizard'; DEV.step = 0; DEV.tried = false; page(); }
  else if (a === 'back') {
    if (DEV.step === 0) DEV.stage = 'newcomer'; else DEV.step -= 1;
    DEV.tried = false; page();
  }
  else if (a === 'goto') { DEV.step = +b.dataset.step; DEV.tried = false; page(); }
  else if (a === 'next') {
    const step = devSteps()[DEV.step][0];
    if (devStepError(step)) DEV.tried = true;
    else {
      DEV.step += 1; DEV.tried = false;
      if (devSteps()[DEV.step][0] === 'details' && !DEV.publicName) DEV.publicName = DEV.name;
    }
    page();
  }
  else if (a === 'authority') { DEV.authority = !DEV.authority; page(); }
  else if (a === 'tick') { DEV.tick = !DEV.tick; page(); }
  else if (a === 'agree') {
    DEV.stage = 'done'; DEV.accepted = '2026-10-29';
    DEV.paid = DEV.profile === 'paid' ? 'requested' : '';
    if (DEV.ret === 'publish') {
      DEV.ret = ''; state.page = 'publish';
      toast('You are a developer now');
    } else DEV.justAgreed = true;
    page();
  }
  else if (a === 'to-publish') { state.page = 'publish'; page(); }
  else if (a === 'to-earnings') { state.acct = 'earnings'; page(); }
  else if (a === 'enable-paid') { DEV.paid = 'requested'; page(); }
  else if (a === 'approve-paid') { DEV.paid = 'enabled'; toast('Paid extensions enabled'); page(); }
  else if (a === 'payouts') {
    if (DEV.payouts === 'none') { DEV.payouts = 'started'; toast('Back from Stripe — some details are still missing'); }
    else { DEV.payouts = 'done'; toast('Back from Stripe — payouts are set up'); }
    page();
  }
  else if (a === 'reset') { localStorage.removeItem(DEV_KEY); location.reload(); }
  return true;
}

/* picking and dropping a file land in the same place; the prototype reads
   whatever was given as the sample package */
function upChoose() {
  /* most extensions touch nothing from Schedule A, so No is the default;
     picking Yes stays a deliberate act */
  state.up = { step:'review', paid:false, cat:'', tags:[], icon:null, sched:'no', areas:[], decl:[false, false, false] };
  toast(`${upPackage().id}.${upPackage().ver}.nupkg read`);
}

function upClick(ev) {
  const w = ev.target.closest('[data-way]');
  if (w) { state.way = w.dataset.way; renderPublish(); return true; }
  const b = ev.target.closest('[data-up]');
  if (!b) return false;
  const [a, arg] = b.dataset.up.split(':');
  const u = state.up;
  if (a === 'icon') {
    /* no re-render here: the file input must stay attached while the native
       dialog is open, or its change event never reaches the page */
    const f = $('.upcard__file');
    if (f) f.click();
    return true;
  }
  if (a === 'choose') upChoose();
  else if (a === 'cancel' || a === 'again') state.up = null;
  else if (a === 'paid') u.paid = arg === 'paid';
  else if (a === 'tagdel') u.tags.splice(+arg, 1);
  else if (a === 'sched') u.sched = arg;
  else if (a === 'area') {
    if (u.sched !== 'yes') return true;
    u.areas = u.areas.includes(arg) ? u.areas.filter(x => x !== arg) : [...u.areas, arg];
  }
  else if (a === 'decl') u.decl[+arg] = !u.decl[+arg];
  else if (a === 'submit') {
    const p = upPackage();
    const row = { ext:p.id, name:p.name, pkg:p.id, paid:u.paid, state:'moderation', ver:`v${p.ver}`, when:'2026-10-29' };
    MY_PUBLISHED.unshift(row);
    if (NEWBIE) { DEV.pubs.unshift(row); saveDev(); }
    state.up = { step:'done' };
  }
  else if (a === 'to-published') { state.up = null; state.page = 'account'; state.acct = 'published'; render(); return true; }
  renderPublish();
  return true;
}

/* A number typed or pasted WITH its country code — "+49 170…" or "0049170…" —
   is recognised: the dial code moves into the select, the national rest stays
   in the field. Dial codes are prefix-free (ITU), so the longest match is
   safe to adopt as soon as it appears. */
function adoptDialPrefix(el) {
  const s = DEV.phone.replace(/^\s+/, '');
  const intl = s.startsWith('+') ? 1 : s.startsWith('00') ? 2 : 0;
  if (!intl) return;
  const digits = s.slice(intl).replace(/\D/g, '');
  let dial = '';
  for (const d of Object.values(DIAL)) if (digits.startsWith(d) && d.length > dial.length) dial = d;
  if (!dial) return;
  /* a shared code (+1, +7) keeps the already-picked code, then the chosen
     country, before falling back to the first owner of that code */
  let cc = DEV.code && DIAL[DEV.code] === dial ? DEV.code
    : DEV.country && DIAL[DEV.country] === dial ? DEV.country
    : Object.keys(DIAL).find(c => DIAL[c] === dial);
  DEV.code = cc;
  DEV.codeByHand = true; /* typing the code is as explicit as picking it */
  /* consume the prefix and whatever separators were wrapped around it */
  let i = intl, seen = 0;
  while (i < s.length && seen < dial.length) { if (/\d/.test(s[i])) seen += 1; i += 1; }
  DEV.phone = s.slice(i).replace(/^[\s().-]+/, '');
  el.value = DEV.phone;
  const sel = document.querySelector('[data-df="code"]');
  if (sel) sel.value = cc;
}

/* registration fields write straight into the record; a select redraws the
   step, so the phone code can follow the country */
function devField(ev, redraw) {
  const f = ev.target.dataset.df;
  if (f) {
    const [k, sub] = f.split('.');
    if (sub) DEV[k][sub] = ev.target.value; else DEV[k] = ev.target.value;
    if (f === 'country' && !DEV.codeByHand && DIAL[DEV.country]) DEV.code = DEV.country;
    if (f === 'code') DEV.codeByHand = true;
    if (f === 'phone') adoptDialPrefix(ev.target);
    saveDev();
    /* a highlighted field calms down the moment it is filled (and lights up
       again if emptied) — without re-rendering, so the input keeps focus */
    if (DEV.tried && !redraw) {
      const wrap = ev.target.closest('.dfield');
      if (wrap) {
        const steps = devSteps();
        const step = steps[Math.min(DEV.step, steps.length - 1)][0];
        const bad = devInvalid(step).has(f === 'code' ? 'phone' : f);
        wrap.classList.toggle('is-invalid', bad);
        const req = wrap.querySelector('.dfield__req');
        if (req) req.hidden = !bad;
      }
    }
    if (redraw) renderAccount();
  }
  const uf = ev.target.dataset.upf;
  if (uf && state.up) state.up[uf] = ev.target.value;
}
$('#storeBody').addEventListener('input', ev => { if (ev.target.tagName === 'INPUT') devField(ev, false); });
/* the card-icon picker: a picked or dropped image lands in the preview circle */
function upIconFile(file) {
  if (!file || !state.up) return;
  const rd = new FileReader();
  rd.onload = () => { state.up.icon = rd.result; renderPublish(); };
  rd.readAsDataURL(file);
}
$('#storeBody').addEventListener('change', ev => {
  if (ev.target.classList.contains('upcard__file')) {
    upIconFile(ev.target.files && ev.target.files[0]);
    return;
  }
  if (ev.target.tagName === 'SELECT') devField(ev, true);
});

/* the tag editor: Enter (or comma) turns the typed text into a chip; the
   package's own tags are fixed and cannot be duplicated */
$('#storeBody').addEventListener('keydown', ev => {
  if (!ev.target.classList.contains('uptags__in')) return;
  if (ev.key !== 'Enter' && ev.key !== ',') return;
  ev.preventDefault();
  const v = ev.target.value.trim().toLowerCase().replace(/,+$/, '');
  if (!v || !state.up) return;
  if (!state.up.tags.includes(v) && !['ency-extension', 'utility'].includes(v)) state.up.tags.push(v);
  renderPublish();
  const inp = $('.uptags__in');
  if (inp) inp.focus();
});
/* clicking anywhere on the tag box lands in its input */
$('#storeBody').addEventListener('click', ev => {
  const box = ev.target.closest('.uptags');
  if (box && !ev.target.closest('.uptag__x')) {
    const inp = box.querySelector('.uptags__in');
    if (inp) inp.focus();
  }
});

/* the publish drop zone takes a dragged file too; children are click-through
   (CSS pointer-events), so dragleave only fires on leaving the zone itself */
$('#storeBody').addEventListener('dragover', ev => {
  const z = ev.target.closest('.updrop, .upcard__pick');
  if (!z || z.classList.contains('is-off')) return;
  ev.preventDefault();
  z.classList.add('is-drag');
});
$('#storeBody').addEventListener('dragleave', ev => {
  const z = ev.target.closest('.updrop, .upcard__pick');
  if (z) z.classList.remove('is-drag');
});
$('#storeBody').addEventListener('drop', ev => {
  const z = ev.target.closest('.updrop, .upcard__pick');
  if (!z || z.classList.contains('is-off')) return;
  ev.preventDefault();
  if (z.classList.contains('upcard__pick')) {
    upIconFile(ev.dataTransfer.files && ev.dataTransfer.files[0]);
    return;
  }
  upChoose();
  renderPublish();
});

/* cards / rows / stars / detail actions */
$('#storeBody').addEventListener('click', ev => {
  /* account: section switch, then the section's own actions */
  const asec = ev.target.closest('[data-asec]');
  if (asec) { state.acct = asec.dataset.asec; DEV.justAgreed = false; renderAccount(); return; }
  if (devClick(ev) || upClick(ev)) return;
  /* a package row opens its package page, whichever cell was clicked */
  const apkg = ev.target.closest('[data-apkg]');
  if (apkg) { state.pkgSel = apkg.dataset.apkg; renderAccount(); return; }
  const aopen = ev.target.closest('[data-aopen]');
  if (aopen) { state.page = 'store'; openDetail(aopen.dataset.aopen); return; }
  const aprice = ev.target.closest('[data-aprice]');
  if (aprice) { openPrice(aprice.dataset.aprice); return; }
  const apkgscope = ev.target.closest('[data-apkgscope]');
  if (apkgscope) { state.pkgScope = apkgscope.dataset.apkgscope; renderAccount(); return; }
  /* admin sub-filters re-render their own section only */
  const arange = ev.target.closest('[data-arange]');
  if (arange) { state.range = +arange.dataset.arange; renderAccount(); return; }
  const arepo = ev.target.closest('[data-arepo]');
  if (arepo) { state.repoFilter = arepo.dataset.arepo; renderAccount(); return; }
  const aevent = ev.target.closest('[data-aevent]');
  if (aevent) { state.eventKind = aevent.dataset.aevent; renderAccount(); return; }
  /* moderation: pick from the queue, or decide the selected one */
  const amod = ev.target.closest('[data-amod]');
  if (amod) { state.modSel = amod.dataset.amod; renderAccount(); return; }
  const amoddec = ev.target.closest('[data-amoddec]');
  if (amoddec) {
    const r = modSelected();
    const i = REQUESTS.indexOf(r);
    if (i >= 0) {
      REQUESTS.splice(i, 1);
      DECIDED.push({ ...r, decision: amoddec.dataset.amoddec });
      state.modSel = null;
      toast(amoddec.dataset.amoddec === 'approve'
        ? `${r.name} approved — listed in the catalog`
        : `${r.name} rejected — returned to ${r.pub}`);
      renderAccount();
    }
    return;
  }
  const ppl = ev.target.closest('[data-ppl]');
  if (ppl) { state.peopleScope = ppl.dataset.ppl; renderAccount(); return; }
  const aact = ev.target.closest('[data-aact]');
  if (aact) {
    const a = aact.dataset.aact;
    if (a === 'publish')    { state.page = 'publish'; render(); return; }
    if (a === 'browse')     { state.page = 'store'; render(); return; }
    if (a === 'stats')      { state.acct = 'stats'; renderAccount(); return; }
    if (a === 'to-profile') { state.acct = 'profile'; renderAccount(); return; }
    if (a === 'as-table')   { state.chartTable = !state.chartTable; renderAccount(); return; }
    if (a === 'all-packages') { state.pkgSel = null; renderAccount(); return; }
    if (a === 'block') {
      const p = PEOPLE.find(x => x.email === aact.dataset.mail);
      if (p) {
        p.blocked = !p.blocked;
        toast(p.blocked ? `${p.email} blocked` : `${p.email} unblocked`);
        renderAccount();
      }
      return;
    }
    if (a === 'sync') {
      aact.classList.add('is-busy');
      setTimeout(() => {
        aact.classList.remove('is-busy');
        toast('Profiles are up to date');
      }, 900);
      return;
    }
    toast({ github:'GitHub sign-in — not in this prototype',
      steps:'Publishing guide — not in this prototype',
      roles:'Roles reference — not in this prototype',
      connect:'Repository connect — not in this prototype',
      'open-repo':'Repository link — not in this prototype',
      logout:'Log out — not in this prototype',
      refresh:'Statistics refresh — not in this prototype',
      approve:'Approve — not in this prototype',
      download:'Download package — not in this prototype',
      reject:'Reject — not in this prototype',
      history:'Person history — not in this prototype',
      'open-pubs':'Published by this person — not in this prototype',
      'open-person':'Person card — not in this prototype',
      'open-ext':'Extension page — not in this prototype',
      unlist:'Unlist — not in this prototype',
      billing:'Stripe billing portal — not in this prototype',
      'package-page':'Package page — not in this prototype',
      'run-queue':'Run the signing queue — not in this prototype',
      retry:'Back in the queue — not in this prototype',
      'cancel-approval':'Cancel approval — not in this prototype',
    }[a]);
    return;
  }
  const pact = ev.target.closest('[data-pact]');
  if (pact) {
    ev.preventDefault();
    toast({ template:'Template repository — not in this prototype',
      signin:'GitHub sign-in — not in this prototype',
      published:'My published extensions — not in this prototype',
      ai:'AI-based development guide — not in this prototype',
      choose:'Package picker — not in this prototype',
    }[pact.dataset.pact]);
    return;
  }
  const star = ev.target.closest('[data-star]');
  if (star) {
    ev.stopPropagation();
    const id = star.dataset.star;
    state.favs.has(id) ? state.favs.delete(id) : state.favs.add(id);
    render(); return;
  }
  const like = ev.target.closest('[data-like]');
  if (like) {
    ev.stopPropagation();
    toggleLike(like.dataset.like);
    render(); return;
  }
  const inst = ev.target.closest('[data-install]');
  if (inst) { toggleInstall(inst.dataset.install); render(); return; }
  const item = ev.target.closest('[data-id]');
  if (item) openDetail(item.dataset.id);
});

/* admin searches: patch the rows in place so the field keeps focus */
/* chart hover: one tooltip driven by the per-day hit rects, so the target is the
   whole band rather than the columns themselves */
$('#storeBody').addEventListener('pointermove', ev => {
  const tip = $('#chartTip'), wrap = $('#chartWrap');
  if (!tip || !wrap) return;
  const hit = ev.target.closest('.chart__hit');
  if (!hit) { tip.hidden = true; return; }
  const d = hit.dataset;
  tip.innerHTML = `<b>${esc(d.day)}</b>
    <span><i class="dot dot--v"></i>Visitors<em>${d.v}</em></span>
    <span><i class="dot dot--d"></i>Downloads<em>${d.d}</em></span>`;
  tip.hidden = false;
  const box = wrap.getBoundingClientRect(), t = tip.getBoundingClientRect();
  const x = Math.min(Math.max(ev.clientX - box.left + 12, 4), box.width - t.width - 4);
  tip.style.left = `${x}px`;
  tip.style.top = `${Math.max(4, ev.clientY - box.top - t.height - 10)}px`;
});
$('#storeBody').addEventListener('pointerleave', () => {
  const tip = $('#chartTip');
  if (tip) tip.hidden = true;
});

$('#storeBody').addEventListener('input', ev => {
  if (ev.target.id === 'peopleSearch') {
    state.peopleQuery = ev.target.value;
    $('#peopleRows').innerHTML = peopleRows(filteredPeople());
  }
  if (ev.target.id === 'repoSearch') {
    state.repoQuery = ev.target.value;
    $('#repoRows').innerHTML = repoRows(filteredRepos());
  }
  if (ev.target.id === 'eventSearch') {
    state.eventQuery = ev.target.value;
    renderAccount();
    const f = $('#eventSearch');
    if (f) { f.focus(); f.setSelectionRange(f.value.length, f.value.length); }
  }
  if (ev.target.id === 'repoField') {
    const btn = $('[data-aact="connect"]');
    if (btn) btn.disabled = !ev.target.value.trim();
  }
});

/* header */
$('#modBtn').addEventListener('click', () => {
  state.detail = null; state.page = 'account'; state.acct = 'moderation'; render();
});
$('#pubBtn').addEventListener('click', () => {
  state.detail = null; state.page = 'publish'; render();
});
$('#userBtn').addEventListener('click', ev => {
  ev.stopPropagation(); applyThemeLabel(); openMenu($('#userMenu'), $('#userBtn'));
});
$('#userMenu').addEventListener('click', ev => {
  const b = ev.target.closest('[data-uact]');
  if (!b) return;
  if (b.dataset.uact === 'theme') {
    const light = document.documentElement.dataset.theme === 'light';
    const next = light ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('ency-theme', next);
    applyThemeLabel();
    return; /* keep the menu open so the switch feels immediate */
  }
  closeMenus();
  if (b.dataset.uact === 'settings') {
    state.detail = null; state.page = 'account'; state.acct = 'profile'; render();
  }
  if (b.dataset.uact === 'logout') toast('Log out — not in this prototype');
  if (b.dataset.uact === 'persona') {
    localStorage.setItem('ency-persona', NEWBIE ? 'demo' : 'new');
    location.href = location.pathname;
  }
});

/* the header says who is signed in; moderation is for admins only */
function applyPersona() {
  $('#userAv').textContent = ME.name.split(' ').map(w => w[0]).join('').slice(0, 2);
  if (NEWBIE) $('#userAv').style.setProperty('--av', '#9ec5ff');
  $('#userName').textContent = ME.username;
  $('#personaLabel').textContent = NEWBIE ? 'Back to the demo account' : 'Switch to a new user';
  $('#modBtn').hidden = !ME.roles.includes('Admin');
}

/* global dismiss */
document.addEventListener('click', ev => {
  if (!ev.target.closest('.hmenu')) closeMenus();
});
document.addEventListener('keydown', ev => {
  if (ev.key === 'Escape') {
    if (state.priceFor) { closePrice(); return; }
    if (!document.querySelectorAll('.hmenu:not([hidden])').length && state.detail) closeDetail();
    closeMenus();
    return;
  }
  /* arrows page the gallery while the view is open */
  if (!state.detail || ev.target.matches('input, textarea')) return;
  const e = EXTS.find(x => x.id === state.detail);
  const n = (e?.shots || []).length;
  if (n < 2) return;
  if (ev.key === 'ArrowLeft')  { state.shot = Math.max(0, state.shot - 1); renderDetail(); }
  if (ev.key === 'ArrowRight') { state.shot = Math.min(n - 1, state.shot + 1); renderDetail(); }
});

/* ------------------------------ boot ------------------------------------ */
applyPersona();
render();
