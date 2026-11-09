/*
 * Tier0 Security Advisories widget.
 * createAdvisories(options) -> { html(), mount(root) }: html() returns static markup (for pre-rendering),
 * mount(root) renders into `root` (an element with class "t0sa"), wires interactions and returns a cleanup function.
 * options: { data: { 'zh-CN': records, en: records }, messages, locale, pageSize, reportEmail,
 *            shareUrl, enableShortcut, syncHash }
 */
function createAdvisories(options) {
  'use strict';
  const opts = Object.assign({ pageSize: 10, reportEmail: 'productsupport@freezonex.io', enableShortcut: true, syncHash: true }, options);
  const LOCALES = ['zh-CN', 'en'];
  const CATEGORIES = ['all', 'fix', 'dependency', 'hardening', 'verification'];
  const PRODUCTS = ['all', 'enterprise', 'cloud'];
  const PRODUCT_NAMES = { enterprise: 'Enterprise', cloud: 'Cloud' };
  const STAGE_VERIFIED = 'verified';
  const COPY_RESET_MS = 2000;
  const EN_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const EN_MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const hasWindow = typeof window !== 'undefined';
  const locale = LOCALES.includes(opts.locale) ? opts.locale : 'en';
  const state = { category: 'all', product: 'all', term: '', sort: 'desc', page: 1 };
  const openIds = new Set();
  const timers = new Set();
  let root = null;

  const zh = opts.data['zh-CN'];
  const searchable = new Map(zh.map((record, index) => {
    const pick = r => [r.title, r.summary, r.component, r.productLabel, r.categoryLabel, r.date, r.scope, r.handling,
      r.affectedVersion.summary, r.affectedVersion.description, r.fixedVersion.summary, r.fixedVersion.description,
      r.upgrade.summary, ...r.upgrade.instructions].join(' ');
    return [record.id, `${pick(record)} ${pick(opts.data.en[index])}`.toLowerCase()];
  }));

  const records = opts.data[locale];
  const t = (key, values = {}) => String(opts.messages[locale][key] ?? key).replace(/\{(\w+)\}/g, (m, k) => values[k] ?? m);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (paths, cls = '') => `<svg class="t0sa-ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${paths}</svg>`;
  const ICONS = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    external: '<path d="M7 17 17 7M8 7h9v9"/>',
    arrowDown: '<path d="M12 5v14M6 13l6 6 6-6"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    expand: '<path d="m7 15 5 5 5-5M7 9l5-5 5 5"/>',
    collapse: '<path d="m7 20 5-5 5 5M7 4l5 5 5-5"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
    tag: '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z"/><circle cx="8" cy="8" r="1.5"/>',
    box: '<path d="m21 8-9-5-9 5v8l9 5 9-5V8Z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    badge: '<path d="M12 2 15 5h4v4l3 3-3 3v4h-4l-3 3-3-3H5v-4l-3-3 3-3V5h4l3-3Z"/><path d="m9 12 2 2 4-4"/>'
  };
  const $ = selector => root.querySelector(selector);
  const status = r => t(r.stage === STAGE_VERIFIED ? 'statusVerified' : 'statusFixed');
  const mailto = `mailto:${opts.reportEmail}`;
  const parts = date => date.split('-').map(Number);
  const shortDate = date => { const [y, m, d] = parts(date); return locale === 'en' ? `${EN_MONTHS[m - 1]} ${d}` : `${m} 月 ${d} 日`; };
  const monthKey = date => date.slice(0, 7);
  const monthLabel = key => { const [y, m] = parts(key); return t('monthLabel', { y, m, month: EN_MONTHS_LONG[m - 1] }); };

  /* ---------- static shell ---------- */
  function shellMarkup() {
    const v = view();
    const productLabels = { all: t('allProducts'), enterprise: PRODUCT_NAMES.enterprise, cloud: PRODUCT_NAMES.cloud };
    const note = (glyph, title, body) => `<article class="t0sa-note"><span class="t0sa-note-ico">${icon(glyph)}</span><h3>${esc(t(title))}</h3><p>${esc(t(body))}</p></article>`;
    const option = (value, label) => `<option value="${value}"${value === state.sort ? ' selected' : ''}>${esc(label)}</option>`;
    return `<header class="t0sa-hero">
  <div class="t0sa-wrap">
    <div class="t0sa-hero-top">
      <div class="t0sa-hero-copy"><h1 class="t0sa-h1">${esc(t('heroTitle'))}</h1><p class="t0sa-lead">${esc(t('lead'))}</p></div>
      <a class="t0sa-cta" href="${mailto}" aria-label="${esc(t('reportLinkLabel', { email: opts.reportEmail }))}">${icon(ICONS.mail)}<span>${esc(t('reportCta'))}</span>${icon(ICONS.external, 't0sa-cta-arrow')}</a>
    </div>
    <div class="t0sa-notice" role="note">
      <span class="t0sa-notice-ico">${icon(ICONS.info)}</span>
      <p><strong>${esc(t('noticeTitle'))}</strong><span>${esc(t('noticeBody'))}</span></p>
      <button type="button" class="t0sa-notice-link" data-role="to-notes">${esc(t('noticeLink'))}${icon(ICONS.arrowDown)}</button>
    </div>
  </div>
</header>
<div class="t0sa-wrap">
  <div class="t0sa-board" id="t0sa-records">
    <aside class="t0sa-side">
      <div class="t0sa-side-filters">
        <section class="t0sa-side-block">
          <p class="t0sa-side-label" id="t0sa-cat-label">${esc(t('filterType'))}</p>
          <div class="t0sa-cats" role="group" aria-labelledby="t0sa-cat-label">
            ${CATEGORIES.map(c => `<button type="button" class="t0sa-cat is-${c}${v.counts[c] ? '' : ' is-empty'}" data-category="${c}" aria-pressed="${c === state.category}"><i aria-hidden="true"></i><span>${esc(t(c))}</span><b data-count>${v.counts[c]}</b></button>`).join('')}
          </div>
        </section>
        <section class="t0sa-side-block">
          <p class="t0sa-side-label" id="t0sa-prod-label">${esc(t('productLabel'))}</p>
          <div class="t0sa-seg" role="group" aria-labelledby="t0sa-prod-label">
            ${PRODUCTS.map(p => `<button type="button" data-product="${p}" aria-pressed="${p === state.product}">${esc(productLabels[p])}</button>`).join('')}
          </div>
        </section>
      </div>
      <section class="t0sa-help" aria-labelledby="t0sa-help-title">
        <span class="t0sa-help-ico">${icon(ICONS.shield)}</span>
        <h2 id="t0sa-help-title">${esc(t('reportTitle'))}</h2>
        <p>${esc(t('reportBody', { email: opts.reportEmail }))}</p>
        <a class="t0sa-help-link" href="${mailto}">${icon(ICONS.mail)}<span>${esc(t('sendEmail'))}</span>${icon(ICONS.right, 't0sa-help-arrow')}</a>
      </section>
    </aside>
    <section class="t0sa-card" aria-labelledby="t0sa-list-title">
      <div class="t0sa-card-head">
        <div class="t0sa-card-title"><h2 id="t0sa-list-title">${esc(t('listTitle'))}</h2><span class="t0sa-badge">${esc(t('totalBadge', { n: records.length }))}</span></div>
        <div class="t0sa-controls">
          <label class="t0sa-field t0sa-search">${icon(ICONS.search)}<input class="t0sa-input" type="search" data-role="search" value="${esc(state.term)}" placeholder="${esc(t('searchPlaceholder'))}" aria-label="${esc(t('searchLabel'))}" autocomplete="off" spellcheck="false">${opts.enableShortcut ? '<kbd class="t0sa-kbd" aria-hidden="true">/</kbd>' : ''}</label>
          <label class="t0sa-field t0sa-pick"><select class="t0sa-select" data-role="sort" aria-label="${esc(t('sortLabel'))}">${option('desc', t('newest'))}${option('asc', t('oldest'))}</select>${icon(ICONS.chevron)}</label>
        </div>
        <div class="t0sa-meta"><span data-role="count" role="status" aria-live="polite">${esc(v.countText)}</span><button type="button" class="t0sa-ghost" data-role="toggle-all" data-mode="${v.allOpen ? 'collapse' : 'expand'}"${v.visible.length ? '' : ' hidden'}>${toggleAllInner(v.allOpen)}</button></div>
      </div>
      <div class="t0sa-list" data-role="list">${v.listHtml}</div>
      <nav class="t0sa-pager" data-role="pager" aria-label="${esc(t('pagination'))}"${v.pagerHtml ? '' : ' hidden'}>${v.pagerHtml}</nav>
    </section>
  </div>
  <section class="t0sa-notes" id="t0sa-notes" aria-labelledby="t0sa-notes-title">
    <div class="t0sa-notes-head"><h2 class="t0sa-h2" id="t0sa-notes-title">${esc(t('notesTitle'))}</h2><p>${esc(t('notesIntro'))}</p></div>
    <div class="t0sa-notes-grid">${note(ICONS.layers, 'affected', 'notesAffected')}${note(ICONS.tag, 'fixed', 'notesFixed')}${note(ICONS.box, 'imagesTitle', 'notesImages')}${note(ICONS.badge, 'verificationTitle', 'notesVerification')}</div>
  </section>
</div>`;
  }

  /* ---------- records ---------- */
  function itemMarkup(r) {
    const overview = (label, value) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`;
    const fact = (label, body, wide = false) => `<div${wide ? ' class="is-wide"' : ''}><dt>${esc(label)}</dt><dd>${body}</dd></div>`;
    const links = r.links.map(l => `<a class="t0sa-link" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.label)}${icon(ICONS.external)}</a>`).join('');
    const verified = r.stage === STAGE_VERIFIED;
    return `<details class="t0sa-item" id="record-${esc(r.id)}" data-id="${esc(r.id)}"${openIds.has(r.id) ? ' open' : ''}>
  <summary>
    <div class="t0sa-when"><time datetime="${r.date}">${esc(shortDate(r.date))}</time><span class="t0sa-product is-${esc(r.product)}">${esc(PRODUCT_NAMES[r.product] || r.productLabel)}</span></div>
    <div class="t0sa-main">
      <p class="t0sa-kind is-${esc(r.category)}"><i aria-hidden="true"></i><span>${esc(r.categoryLabel)}</span><span class="t0sa-sep">${esc(r.component)}</span></p>
      <h3 class="t0sa-title">${esc(r.title)}</h3>
      <p class="t0sa-summary">${esc(r.summary)}</p>
      <dl class="t0sa-overview">${overview(t('affected'), r.affectedVersion.summary)}${overview(t('fixed'), r.fixedVersion.summary)}${overview(t('upgrade'), r.upgrade.summary)}</dl>
    </div>
    <div class="t0sa-side-meta"><span class="t0sa-status${verified ? ' is-verified' : ''}">${icon(verified ? ICONS.badge : ICONS.check)}${esc(status(r))}</span>${icon(ICONS.chevron, 't0sa-chev')}</div>
  </summary>
  <div class="t0sa-detail"><div class="t0sa-panel">
    <dl class="t0sa-facts">
      ${fact(t('affected'), esc(r.affectedVersion.description))}
      ${fact(t('fixed'), esc(r.fixedVersion.description))}
      ${fact(`${t('upgrade')} · ${r.upgrade.summary}`, `<ol class="t0sa-steps">${r.upgrade.instructions.map(s => `<li><span>${esc(s)}</span></li>`).join('')}</ol>`, true)}
      ${fact(t('postUpgrade'), esc(r.upgrade.verification), true)}
    </dl>
    <dl class="t0sa-facts">
      ${fact(t('scope'), esc(r.scope))}
      ${fact(t('impact'), esc(r.impact))}
      ${fact(t('handling'), esc(r.handling))}
      ${fact(t('timeline'), esc(r.timeline))}
      ${fact(t('evidence'), `<div class="t0sa-evidence">${r.evidence.map(e => `<span>${esc(e)}</span>`).join('')}${links}</div>`, true)}
    </dl>
    ${canShare() ? `<div class="t0sa-panel-foot"><button type="button" class="t0sa-btn" data-copy="${esc(r.id)}" aria-label="${esc(t('copyLabel', { title: r.title }))}">${icon(ICONS.link)}<span>${esc(t('copyLink'))}</span></button></div>` : ''}
  </div></div>
</details>`;
  }

  function listMarkup(visible, matching) {
    const perMonth = new Map();
    matching.forEach(r => perMonth.set(monthKey(r.date), (perMonth.get(monthKey(r.date)) || 0) + 1));
    let current = '';
    return visible.map(r => {
      const key = monthKey(r.date);
      const n = perMonth.get(key);
      const head = key === current ? '' : `<div class="t0sa-month"><h3>${esc(monthLabel(key))}</h3><span>${esc(n === 1 ? t('monthCountOne') : t('monthCount', { n }))}</span></div>`;
      current = key;
      return head + itemMarkup(r);
    }).join('');
  }

  function emptyMarkup() {
    return `<div class="t0sa-empty"><span class="t0sa-empty-ico">${icon(ICONS.search)}</span><h3>${esc(t('emptyTitle'))}</h3><p>${esc(t('emptyBody'))}</p><button type="button" class="t0sa-btn" data-role="clear">${esc(t('clearFilters'))}</button></div>`;
  }

  function pagerMarkup(pageCount) {
    const { page } = state;
    const numbers = [...new Set([1, page - 1, page, page + 1, pageCount])].filter(n => n >= 1 && n <= pageCount).sort((a, b) => a - b);
    const btn = (target, inner, attrs = '', cls = '') => `<button type="button" class="t0sa-page${cls}" data-page="${target}" ${attrs}>${inner}</button>`;
    return `<span class="t0sa-pager-info">${esc(t('pageOf', { page, pages: pageCount }))}</span><div class="t0sa-pages">
      ${btn(page - 1, `${icon(ICONS.left)}<span>${esc(t('previous'))}</span>`, page === 1 ? 'disabled' : '')}
      ${numbers.map((n, i) => `${i && n - numbers[i - 1] > 1 ? '<span class="t0sa-gap" aria-hidden="true">…</span>' : ''}${btn(n, n, `aria-label="${esc(t('pageLabel', { page: n }))}"${n === page ? ' aria-current="page"' : ''}`, ' t0sa-num')}`).join('')}
      ${btn(page + 1, `<span>${esc(t('next'))}</span>${icon(ICONS.right)}`, page === pageCount ? 'disabled' : '')}
    </div>`;
  }

  function filtered() {
    const term = state.term.trim().toLowerCase();
    const byProduct = records.filter(r => state.product === 'all' || r.product === state.product);
    const base = byProduct.filter(r => !term || searchable.get(r.id).includes(term));
    const matching = base.filter(r => state.category === 'all' || r.category === state.category)
      .sort((a, b) => state.sort === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));
    return { base, matching };
  }

  function view() {
    const { base, matching } = filtered();
    const counts = Object.fromEntries(CATEGORIES.map(c => [c, c === 'all' ? base.length : base.filter(r => r.category === c).length]));
    const pageCount = Math.max(1, Math.ceil(matching.length / opts.pageSize));
    state.page = Math.min(Math.max(1, state.page), pageCount);
    const start = (state.page - 1) * opts.pageSize;
    const visible = matching.slice(start, start + opts.pageSize);
    return {
      counts, visible,
      allOpen: visible.length > 0 && visible.every(r => openIds.has(r.id)),
      listHtml: visible.length ? listMarkup(visible, matching) : emptyMarkup(),
      countText: matching.length ? t('results', { start: start + 1, end: start + visible.length, total: matching.length }) : t('zeroResults'),
      pagerHtml: pageCount < 2 ? '' : pagerMarkup(pageCount)
    };
  }

  function render() {
    const v = view();
    root.querySelectorAll('.t0sa-cat').forEach(button => {
      const c = button.dataset.category;
      button.querySelector('[data-count]').textContent = v.counts[c];
      button.classList.toggle('is-empty', v.counts[c] === 0);
      button.setAttribute('aria-pressed', String(c === state.category));
    });
    root.querySelectorAll('[data-product]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.product === state.product)));
    $('[data-role=list]').innerHTML = v.listHtml;
    $('[data-role=count]').textContent = v.countText;
    const pager = $('[data-role=pager]');
    pager.hidden = !v.pagerHtml;
    pager.innerHTML = v.pagerHtml;
    updateToggleAll();
  }

  const toggleAllInner = allOpen => `${icon(allOpen ? ICONS.collapse : ICONS.expand)}<span>${esc(t(allOpen ? 'collapseAll' : 'expandAll'))}</span>`;

  function updateToggleAll() {
    const items = [...root.querySelectorAll('.t0sa-item')];
    const button = $('[data-role=toggle-all]');
    button.hidden = !items.length;
    const allOpen = items.length > 0 && items.every(d => d.open);
    button.dataset.mode = allOpen ? 'collapse' : 'expand';
    button.innerHTML = toggleAllInner(allOpen);
  }

  /* ---------- behaviour ---------- */
  const scrollOffset = () => parseFloat(getComputedStyle(root).getPropertyValue('--t0-scroll-offset')) || 0;

  function scrollToCard() {
    const card = $('.t0sa-card');
    const top = card.getBoundingClientRect().top;
    if (top < scrollOffset()) window.scrollBy({ top: top - scrollOffset() - 16, behavior: 'smooth' });
  }

  /* Inside an srcdoc iframe the page URL is not shareable unless shareUrl is given. */
  const shareBase = () => opts.shareUrl || (hasWindow && !/^(about|blob|data):/.test(location.protocol) ? location.href : '');
  const canShare = () => Boolean(shareBase());

  function shareLink(id) {
    const base = shareBase();
    if (!base) return '';
    const url = new URL(base, location.href);
    url.hash = `record-${id}`;
    return url.href;
  }

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch { /* fall through to execCommand (iframes without clipboard permission) */ }
    const area = document.createElement('textarea');
    area.value = text; area.setAttribute('readonly', ''); area.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.appendChild(area); area.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    area.remove();
    return ok;
  }

  async function onCopy(button) {
    const link = shareLink(button.dataset.copy);
    const ok = link ? await copyText(link) : false;
    const label = button.querySelector('span');
    button.classList.toggle('is-done', ok);
    button.querySelector('svg').outerHTML = icon(ok ? ICONS.check : ICONS.link);
    label.textContent = t(ok ? 'copied' : 'copyFailed');
    const timer = setTimeout(() => {
      timers.delete(timer);
      if (!button.isConnected) return;
      button.classList.remove('is-done');
      button.querySelector('svg').outerHTML = icon(ICONS.link);
      label.textContent = t('copyLink');
    }, COPY_RESET_MS);
    timers.add(timer);
  }

  function openFromHash() {
    if (!location.hash.startsWith('#record-')) return;
    const id = decodeURIComponent(location.hash.slice('#record-'.length));
    if (!records.some(r => r.id === id)) return;
    Object.assign(state, { category: 'all', product: 'all', term: '' });
    const index = filtered().matching.findIndex(r => r.id === id);
    state.page = Math.floor(index / opts.pageSize) + 1;
    openIds.add(id);
    root.innerHTML = shellMarkup();
    requestAnimationFrame(() => document.getElementById(`record-${id}`)?.scrollIntoView({ block: 'start' }));
  }

  const onClick = event => {
    const target = event.target.closest('button');
    if (!target || !root.contains(target)) return;
    if (target.dataset.category) { state.category = target.dataset.category; state.page = 1; return render(); }
    if (target.dataset.product) { state.product = target.dataset.product; state.page = 1; return render(); }
    if (target.dataset.copy) return onCopy(target);
    if (target.dataset.page && !target.disabled) {
      state.page = Number(target.dataset.page);
      render();
      (root.querySelector('.t0sa-page[aria-current=page]') || root.querySelector('.t0sa-page:not(:disabled)'))?.focus({ preventScroll: true });
      return scrollToCard();
    }
    if (target.dataset.role === 'to-notes') {
      const notes = $('#t0sa-notes');
      window.scrollBy({ top: notes.getBoundingClientRect().top - scrollOffset() - 16, behavior: 'smooth' });
      return;
    }
    if (target.dataset.role === 'clear') {
      Object.assign(state, { category: 'all', product: 'all', term: '', page: 1 });
      $('[data-role=search]').value = '';
      render(); return $('[data-role=search]').focus();
    }
    if (target.dataset.role === 'toggle-all') {
      const open = target.dataset.mode !== 'collapse';
      root.querySelectorAll('.t0sa-item').forEach(d => { d.open = open; });
    }
  };
  const onInput = event => {
    if (event.target.dataset.role !== 'search') return;
    state.term = event.target.value; state.page = 1; render();
  };
  const onChange = event => {
    if (event.target.dataset.role === 'sort') { state.sort = event.target.value; state.page = 1; render(); }
  };
  const onToggle = event => {
    const item = event.target;
    if (!item.classList?.contains('t0sa-item')) return;
    if (item.open) openIds.add(item.dataset.id); else openIds.delete(item.dataset.id);
    updateToggleAll();
  };
  const onKeydown = event => {
    if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
    const active = document.activeElement;
    if (active && (/^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName) || active.isContentEditable)) return;
    const search = $('[data-role=search]');
    if (!search) return;
    event.preventDefault();
    search.focus();
    search.scrollIntoView({ block: 'center', behavior: 'smooth' });
  };

  function html() {
    return shellMarkup();
  }

  function mount(element) {
    root = element;
    root.setAttribute('lang', locale);
    root.innerHTML = shellMarkup();
    root.addEventListener('click', onClick);
    root.addEventListener('input', onInput);
    root.addEventListener('change', onChange);
    root.addEventListener('toggle', onToggle, true);
    if (opts.enableShortcut) document.addEventListener('keydown', onKeydown);
    if (opts.syncHash) { window.addEventListener('hashchange', openFromHash); openFromHash(); }
    return function unmount() {
      root.removeEventListener('click', onClick);
      root.removeEventListener('input', onInput);
      root.removeEventListener('change', onChange);
      root.removeEventListener('toggle', onToggle, true);
      document.removeEventListener('keydown', onKeydown);
      window.removeEventListener('hashchange', openFromHash);
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }

  return { html, mount };
}

function mountAdvisories(root, options) {
  return createAdvisories(options).mount(root);
}
