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
    ver:'v3.0.2', installs:12400, upd:'2026-07-25', tags:['assistant','AI','utility'],
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
    ver:'v1.1.0', installs:8100, upd:'2026-04-20', tags:['cladding','CAM','additive'],
    art:'a-clad', hue:'#84ebb8',
    pkg:'DirectCladdingExtension', requires:'ENCY ≥ 3.0.0',
    license:'EncySoftware EULA', support:'support@encycam.com',
    shots:['assets/shots/fav-additive.png','assets/shots/st-cover3.png'],
    versions:[['1.1.0','2026-04-20','≥ 3.0.0'],['1.0.2','2026-02-27','≥ 2.9.4'],
      ['1.0.1','2026-01-09','≥ 2.9.4'],['1.0.0','2025-11-05','≥ 2.9.0']],
    desc:'Extensions to calculate tool path for DirectCladding',
    long:['Adds a DirectCladding solver to the operation list: single-bead and multi-layer strategies with per-layer power and feed control. Designed for DED heads on milling machines and robots.'] },
  { id:'encyextension', name:'EncyExtension', kind:'utility', pub:'EncySoftware',
    ver:'v0.1.0', installs:5700, upd:'2026-01-15', tags:['utility','sample'],
    art:'i-ency', hue:'#84e5eb',
    pkg:'EncyExtension', requires:'ENCY ≥ 2.9.4',
    license:'MIT', support:'support@encycam.com',
    shots:[],
    versions:[['0.1.0','2026-01-15','≥ 2.9.4']],
    desc:'Describe what your extension does',
    long:['The default scaffold produced by the ENCY extension wizard. Registers one command and writes "Hello from EncyExtension" to the log — nothing more, nothing less.'] },
  { id:'popup-example', name:'Example operation popup extension on C#', kind:'popup', pub:'EncySoftware',
    ver:'v1.0.0', installs:3200, upd:'2026-02-10', tags:['utility','sample'],
    art:'a-popup', hue:'#9584eb',
    pkg:'OperationPopupSample', requires:'ENCY ≥ 2.9.4',
    license:'MIT', support:'support@encycam.com',
    shots:['assets/shots/fav-partmore.png'],
    versions:[['1.0.0','2026-02-10','≥ 2.9.4'],['0.9.0','2025-12-18','≥ 2.9.0']],
    desc:'Example operation popup extension on C#',
    long:['Demonstrates the Operation Popup extension point: adds a custom page with its own controls to the operation dialog and stores the values in the operation parameters.'] },
  { id:'example-utility', name:'Example utility extension on C#', kind:'utility', pub:'EncySoftware',
    ver:'v1.0.3', installs:2400, upd:'2026-05-12', tags:['utility','sample'],
    art:'a-code', hue:'#84c9eb',
    pkg:'UtilitySample', requires:'ENCY ≥ 3.0.0',
    license:'MIT', support:'support@encycam.com',
    shots:[],
    versions:[['1.0.3','2026-05-12','≥ 3.0.0'],['1.0.2','2026-03-02','≥ 2.9.4'],
      ['1.0.1','2026-01-20','≥ 2.9.4'],['1.0.0','2025-10-14','≥ 2.9.0']],
    desc:'Example utility extension on C#',
    long:['A minimal, fully commented C# utility extension. Use it as a template: it shows how to register a command, read the active project and show a result dialog.'] },
  { id:'export-info', name:'Export project information', kind:'global', pub:'EncySoftware',
    ver:'v1.0.1', installs:1800, upd:'2026-05-30', paid:true, tags:['utility','export','reporting'],
    art:'a-export', hue:'#ebda84',
    pkg:'ProjectInfoExport', requires:'ENCY ≥ 3.0.0',
    license:'Per-workstation, 30-day trial', support:'sales@encycam.com',
    shots:['assets/shots/fav-training.png','assets/shots/st-cover3.png'],
    versions:[['1.0.1','2026-05-30','≥ 3.0.0'],['1.0.0','2026-04-08','≥ 2.9.4']],
    desc:'Export project information',
    long:['Exports project, setup, operation and tooling data into XLSX and JSON. Ships with templates for setup sheets and tool lists; custom templates can be added per company standard.',
      'Licensed per workstation; a 30-day trial starts on first run.'] },
  { id:'planar-slicing', name:'Extension for Planar slicing operations', kind:'operation', pub:'EncySoftware',
    ver:'v1.2.2', installs:1200, upd:'2026-06-08', tags:['CAM','fdm','additive'],
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
    ver:'v0.1.0', installs:940, upd:'2025-11-20', tags:['utility'],
    art:'a-term', hue:'#84ebb8',
    pkg:'HelloEncy', requires:'ENCY ≥ 2.9.0',
    license:'MIT', support:'kbelousov@encycam.com',
    shots:[],
    versions:[['0.1.0','2025-11-20','≥ 2.9.0']],
    desc:"Test utility: dumps the active project's path and id to a text file and opens it",
    long:["Dumps the active project's path and id to a text file and opens it in the default editor. Written as a smoke test for the utility API."] },
  { id:'import-svg', name:'Import SVG', kind:'utility', pub:'EncySoftware',
    ver:'v1.0.0', installs:610, upd:'2026-01-28', tags:['utility','import','svg'],
    art:'a-pen', hue:'#d9eb84',
    pkg:'ImportSvgExtension', requires:'ENCY ≥ 2.9.4',
    license:'EncySoftware EULA', support:'support@encycam.com',
    shots:['assets/shots/fav-partmore.png'],
    versions:[['1.0.0','2026-01-28','≥ 2.9.4'],['0.9.2','2025-11-11','≥ 2.9.0'],
      ['0.9.0','2025-09-08','≥ 2.8.2']],
    desc:'Import SVG',
    long:['Imports SVG files as sketch curves: paths, arcs and text outlines land on the selected work plane with correct scaling. Curves are grouped per SVG layer.'] },
  { id:'loading-game', name:'Loading Game', kind:'global', pub:'EncySoftware',
    ver:'v0.1.5', installs:280, upd:'2026-06-30', tags:['game','global'],
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

/* three mutually exclusive values, so a segmented track rather than a list */
function renderPrice() {
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

/* paid extensions lead to the details page (View); free ones install in place */
function actionBtn(e) {
  if (e.paid && !state.installed.has(e.id))
    return `<span class="xinstall" role="button">View</span>`;
  const on = state.installed.has(e.id);
  return `<span class="xinstall ${on ? 'is-on' : ''}" role="button" data-install="${e.id}">
    ${on ? '<svg><use href="#i-check"/></svg>Installed' : 'Install'}</span>`;
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
        ${e.paid ? '<span class="paidtag">Paid</span>' : ''}
      </span>
      <span class="xcard__tags">${tagChips(e, 3)}</span>
    </span>
    <span class="xcard__desc">${esc(e.desc)}</span>
    <span class="xcard__foot">
      <span class="xcard__kind">${KINDS[e.kind]}</span>
      <span class="xcard__fsep"></span>
      <span class="xcard__inst" title="Installs"><svg><use href="#i-download"/></svg>${fmtK(e.installs)}</span>
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
        ${e.paid ? '<span class="paidtag">Paid</span>' : ''}
      </span>
      <span class="xrow__desc">${esc(e.ver)} · by ${esc(e.pub)} — ${esc(e.desc)}</span>
    </span>
    <span class="xrow__kind">${KINDS[e.kind]}</span>
    <span class="xrow__inst" title="Installs"><svg><use href="#i-download"/></svg>${fmtK(e.installs)}</span>
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
      <h2 class="dhero__name">${esc(e.name)}${e.paid ? '<span class="paidtag">Paid</span>' : ''}</h2>
      <div class="dhero__meta">
        <span class="dcat ${KIND_TINT[e.kind] || ''}">${KINDS[e.kind]}</span>
        <span>${esc(e.ver)}</span><i class="dhero__sep"></i>
        <span>by ${esc(e.pub)}</span><i class="dhero__sep"></i>
        <span class="dhero__dl"><svg><use href="#i-download"/></svg>${fmtK(e.installs)}</span>
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
      <div class="dact">
        ${state.installed.has(e.id)
          ? `<button class="btn-secondary dact__btn" data-install="${e.id}"><svg><use href="#i-check"/></svg>Installed</button>`
          : `<button class="btn-primary dact__btn" data-install="${e.id}"><svg><use href="#i-download"/></svg>Install</button>`}
        ${starBtn(e)}
      </div>

      <div class="dsect">
        <div class="dsect__h">Details</div>
        <div class="dcard">
          <div class="drow"><span class="drow__k">Package id</span>
            <span class="drow__v">${esc(e.pkg)}</span>
            <button class="acticon" data-dact="copy-pkg" title="Copy package id"><svg><use href="#i-clip"/></svg></button>
          </div>
          <div class="drow"><span class="drow__k">Price</span><span class="drow__v">${e.paid ? 'Paid' : 'Free'}</span></div>
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
  { id:'licenses',  label:'My licenses',  icon:'i-award' },
  { id:'stats',     label:'Statistics',   icon:'i-chart',   admin:true },
  { id:'moderation',label:'Moderation',   icon:'i-gavel',   admin:true },
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

const MY_LICENSES = [];             /* empty on purpose — shows the empty state */

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
      <thead><tr><th>Extension</th><th>Version</th><th>Published</th><th>State</th><th></th></tr></thead>
      <tbody>${MY_PUBLISHED.map(p => {
        const e = EXTS.find(x => x.id === p.ext) || {};
        const st = PUB_STATE[p.state];
        return `<tr>
          <td>
            <span class="atable__id">
              <span class="xlogo atable__logo" style="--xc:${e.hue || '#8a9299'}"><svg><use href="#${e.art || 'a-puzzle'}"/></svg></span>
              <span class="atable__idtext">
                <span class="atable__name" data-aopen="${p.ext}">${esc(e.name || p.ext)}</span>
                <span class="atable__sub">${KINDS[e.kind] || ''}</span>
              </span>
            </span>
          </td>
          <td>${esc(p.ver)}</td>
          <td>${fmtDate(p.when)}</td>
          <td><span class="statetag ${st.tone}">${st.label}</span></td>
          <td class="atable__act">
            <button class="acticon" data-aact="open-repo" title="Open repository"><svg><use href="#i-ext"/></svg></button>
          </td>
        </tr>`;
      }).join('')}</tbody>
    </table>
  </div>`;
}

function acctLicenses() {
  if (!MY_LICENSES.length) {
    return emptyCard('No licenses yet — paid extensions offer a free 14-day trial on their page.',
      'browse', 'i-store', 'Browse extensions');
  }
  return '';
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
    prev:[['0.1.3','rejected — crashed on load','12 d ago'],['0.1.1','rejected — no description','20 d ago']] },
  { id:'viewcube', name:'ViewCube hotkeys', kind:'utility', pkg:'ViewCubeHotkeys', pub:'kbelousov-ency',
    ver:'v1.1.0', when:'2 d ago', repo:'kbelousov-ency/ViewCubeHotkeys', size:'0.4 MB',
    requires:'ENCY ≥ 3.0.0', art:'a-term', hue:'#84ebb8',
    desc:'Adds keyboard shortcuts for the ViewCube: numpad snaps to the six faces, Shift-numpad to corners.',
    flags:[],
    reach:['keyboard hooks (global shortcuts)'],
    history:{ published:4, note:'4 extensions in the catalog, none rejected' },
    prev:[['1.0.0','approved','3 mo ago']] },
];

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
          <span class="modq__sub">${esc(r.ver)} · ${esc(r.pub)}</span>
        </span>
        <span class="modq__side">
          <span class="modq__when">${r.when}</span>
          ${r.flags.length ? `<span class="modq__flags">${r.flags.length} flag${r.flags.length > 1 ? 's' : ''}</span>` : ''}
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
          <i class="xcard__bysep"></i>${KINDS[r.kind]}</div>
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
            <span>Built from</span><b><button class="publink" data-aact="open-repo">${esc(r.repo)}</button></b>
            <span>Submitted</span><b>${r.when}</b>
            <span>Size</span><b>${r.size}</b>
            <span>Requires</span><b>${esc(r.requires)}</b>
          </div>
          <div class="modv__pub">
            <div class="reqcard__seclabel">Publisher</div>
            <button class="publink" data-aact="open-person">${esc(r.pub)}</button>
            <p class="modv__pubnote">${esc(r.history.note)}</p>
          </div>
          <div class="modv__tools">
            <button class="btn-quiet" data-aact="download"><svg><use href="#i-download"/></svg>Download package</button>
            <button class="btn-quiet" data-aact="open-repo"><svg><use href="#i-github"/></svg>Open on GitHub</button>
          </div>
        </aside>
      </div>
    </div>

    <div class="reqcard__acts">
      <button class="btn-approve" data-amoddec="approve"><svg><use href="#i-check-circle"/></svg>Approve</button>
      <button class="btn-quiet is-danger" data-amoddec="reject"><svg><use href="#i-ban"/></svg>Reject</button>
      <span class="reqcard__aspacer"></span>
      <span class="modv__hint">Approve lists it in the catalog; reject returns it to the publisher with a note.</span>
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

/* ---------------------------- account shell ----------------------------- */

const ACCT_BODY = {
  profile:acctProfile, published:acctPublished, licenses:acctLicenses,
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
  const nav = ACCT_NAV.filter(n => !n.admin || isAdmin);
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

/* ------------------------------ publish --------------------------------- */

/* Two routes, side by side: the connected one (GitHub) and the manual one
   (a prepared .nupkg). Numbered steps, because the order matters. */
function renderPublish() {
  $('#storeBody').innerHTML = `
  <div class="pub">
    <h1 class="pub__h1">Publish an extension</h1>
    <div class="pub__cols">

      <section class="pubcard">
        <div class="pubcard__head">
          <svg class="pubcard__icon"><use href="#i-github"/></svg>
          <h2 class="pubcard__title">Publish from GitHub</h2>
          <span class="pubtag">Recommended</span>
        </div>
        <ol class="publist">
          <li>Start from the template repository — the workflow that builds and publishes is already in it.</li>
          <li>Write your code in <code>src/</code>; the card text lives in <code>src/readme.md</code> and <code>src/package.info.json</code>.</li>
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
      </section>

      <section class="pubcard">
        <div class="pubcard__head">
          <svg class="pubcard__icon"><use href="#i-clip"/></svg>
          <h2 class="pubcard__title">Upload a .nupkg</h2>
        </div>
        <p class="pubintro">For code that does not live on GitHub, a one-off release, or a package your own
          build already produces. Nothing to connect and no repository — but you repeat this by hand for
          every new version.</p>
        <ol class="publist">
          <li>Build it in the ENCY format (e.g. <code>dotnet pack</code>) — it must contain a <code>*.settings.json</code> manifest and the extension <code>.dll</code>.</li>
          <li>Upload it here and check the card preview that appears below.</li>
          <li>Press Publish. The package goes to the feed exactly as built, so everything on the card is read from inside it and cannot be edited here.</li>
        </ol>
        <button class="pubdrop" data-pact="choose">Choose package...</button>
      </section>

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
  renderPrice();
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
  state.detail = id; state.shot = 0; state.aboutOpen = false;
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
  const inst = ev.target.closest('[data-install]');
  if (inst) { toggleInstall(inst.dataset.install); render(); }
});

/* cards / rows / stars / detail actions */
$('#storeBody').addEventListener('click', ev => {
  /* account: section switch, then the section's own actions */
  const asec = ev.target.closest('[data-asec]');
  if (asec) { state.acct = asec.dataset.asec; renderAccount(); return; }
  const aopen = ev.target.closest('[data-aopen]');
  if (aopen) { state.page = 'store'; openDetail(aopen.dataset.aopen); return; }
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
});

/* global dismiss */
document.addEventListener('click', ev => {
  if (!ev.target.closest('.hmenu')) closeMenus();
});
document.addEventListener('keydown', ev => {
  if (ev.key === 'Escape') {
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
render();
