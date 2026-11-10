/* Tier0 Design System portal.
   Reads 00-foundation/foundation.md and 01-tokens/*.json at runtime, so the site always shows the repo's current rules. */
(function () {
  'use strict';

  // ---------- site map: edit here when a section is added ----------
  const NAV = [
    { group: '概览', items: [{ id: 'home', label: '概览' }, { id: 'foundation', label: 'Foundation' }] },
    { group: '基础', items: [
      { id: 'color', label: '颜色' }, { id: 'typography', label: '字体' },
      { id: 'spacing', label: '间距与圆角', soon: true }, { id: 'motion', label: '动效', soon: true }] },
    { group: '组件', items: [{ id: 'components', label: '组件' }, { id: 'playground', label: '试用台' }] },
    { group: '品牌', items: [{ id: 'brand', label: 'Logo 与素材' }, { id: 'templates', label: '模版', soon: true }] },
    { group: 'Agent', items: [{ id: 'skills', label: 'Skills' }, { id: 'designmd', label: 'DESIGN.md', soon: true }] },
  ];
  const TOP = [['home', '概览'], ['foundation', 'Foundation'], ['color', '颜色'], ['typography', '字体'], ['components', '组件'], ['playground', '试用台'], ['brand', '品牌'], ['skills', 'Skills']];
  const ORDER = ['home', 'foundation', 'color', 'typography', 'components', 'playground', 'brand', 'skills'];
  const TITLES = Object.fromEntries(NAV.flatMap(g => g.items.map(i => [i.id, i.label])));

  const SKILLS = [
    { id: 'tier0-ui', out: 'UI 界面', desc: '按设计系统生成产品界面和页面。', tokens: 'color · typography · components' },
    { id: 'tier0-web', out: '官网', desc: '生成官网页面与区块，使用官网字阶。', tokens: 'color · typography.web' },
    { id: 'tier0-slides', out: 'Slides', desc: '生成符合品牌的演示文稿。', tokens: 'color · typography.web · brand/templates' },
    { id: 'tier0-marketing', out: '宣传物料', desc: '生成社媒图、海报等宣传物料。', tokens: 'color · brand' },
  ];
  const COMPONENTS = [
    ['button', '按钮'], ['input', '输入框'], ['select', '选择器'], ['tag', '标签'], ['status-tag', '状态标签'],
    ['panel', '面板 / 卡片'], ['table', '表格'], ['tabs', '标签页'], ['dialog', '弹窗'],
    ['signal', '方块标记'], ['path', '层级树 / 路径'], ['readout', '读数'], ['focus-frame', '四角框'], ['ai-message', 'AI 消息'],
  ];

  // ---------- data ----------
  const D = { base: null, light: null, dark: null, typo: null, md: '', root: '' };
  async function tryFetch(path, type) {
    for (const prefix of ['./', '../']) {
      try {
        const r = await fetch(prefix + path, { cache: 'no-cache' });
        if (!r.ok) continue;
        const body = await r.text();
        if (body.trim().startsWith('<')) continue; // an HTML fallback page, not the file
        const data = type === 'text' ? body : JSON.parse(body);
        if (!D.root) D.root = prefix;
        return data;
      } catch (e) { /* try next */ }
    }
    return null;
  }
  async function load() {
    const [base, light, dark, typo, md] = await Promise.all([
      tryFetch('01-tokens/color/base.json'), tryFetch('01-tokens/color/light.json'), tryFetch('01-tokens/color/dark.json'),
      tryFetch('01-tokens/typography.json'), tryFetch('00-foundation/foundation.md', 'text'),
    ]);
    Object.assign(D, { base, light, dark, typo, md: md || '' });
  }
  const asset = p => (D.root || '../') + p;
  function walk(root, ref) {
    let n = root;
    for (const k of ref.replace(/[{}]/g, '').split('.')) { if (!n) return null; n = n[k]; }
    return n;
  }
  function colorOf(ref) {
    if (!ref) return null;
    if (ref[0] !== '{') return ref;
    const n = walk(D.base, ref);
    return n ? colorOf(n.$value) : null;
  }
  function typoValue(v) {
    if (typeof v === 'string' && v[0] === '{') { const n = walk(D.typo, v); return n ? typoValue(n.$value) : null; }
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      const o = {}; for (const [k, x] of Object.entries(v)) o[k] = typoValue(x); return o;
    }
    return v;
  }
  const entries = o => Object.entries(o || {}).filter(([k]) => k[0] !== '$');
  const coreGroups = ['surface', 'brand', 'status'];

  // ---------- theme vars from tokens ----------
  let overrides = {};
  function varsFor(theme) {
    const out = {};
    if (!theme) return out;
    for (const g of coreGroups) for (const [k, v] of entries(theme.color[g])) out[k] = colorOf(v.$value);
    return out;
  }
  function applyTokens() {
    if (!D.light) return;
    const l = varsFor(D.light), d = varsFor(D.dark);
    const block = o => Object.entries(o).map(([k, v]) => `--${k}:${v};`).join('');
    let css = `:root{${block(l)}}@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){${block(d)}color-scheme:dark}}:root[data-theme="dark"]{${block(d)}color-scheme:dark}`;
    const fam = D.typo && D.typo.font && D.typo.font.family;
    if (fam) {
      const stack = k => fam[k] ? fam[k].$value.map(f => /\s/.test(f) ? `"${f}"` : f).join(', ') : null;
      css += `:root{${['display', 'sans', 'mono', 'logo'].map(k => stack(k) ? `--font-${k}:${stack(k)};` : '').join('')}}`;
    }
    let el = document.getElementById('tok'); if (!el) { el = document.createElement('style'); el.id = 'tok'; document.head.appendChild(el); }
    el.textContent = css;
  }

  // ---------- theme toggle ----------
  const MODES = ['system', 'light', 'dark'];
  const MODE_LABEL = { system: '跟随系统', light: '浅色', dark: '深色' };
  function getMode() { try { return localStorage.getItem('t0-theme') || 'system'; } catch (e) { return 'system'; } }
  function setMode(m) {
    if (m === 'system') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', m);
    try { localStorage.setItem('t0-theme', m); } catch (e) { /* ignore */ }
    const b = document.getElementById('theme-btn'); if (b) b.textContent = '◐ ' + MODE_LABEL[m];
  }

  // ---------- utils ----------
  const h = (s) => s; // template marker
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function toast(msg) {
    const t = document.getElementById('toast'); t.innerHTML = `<i class="sig"></i>${esc(msg)}`; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 1600);
  }
  async function copy(text, label) {
    try { await navigator.clipboard.writeText(text); toast('已复制 ' + (label || text)); }
    catch (e) {
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast('已复制 ' + (label || text)); } catch (e2) { toast('请手动复制：' + text); }
      ta.remove();
    }
  }
  function lum(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex || ''); if (!m) return 0;
    const n = parseInt(m[1], 16), c = [n >> 16 & 255, n >> 8 & 255, n & 255].map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); });
    return .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
  }
  const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
  const onColor = hex => lum(hex) > .4 ? '#050B14' : '#FFFFFF';
  function md(src) { return window.marked ? window.marked.parse(src) : `<pre>${esc(src)}</pre>`; }
  function mdSection(heading) {
    const lines = D.md.split('\n'); const lvl = heading.match(/^#+/)[0].length;
    const i = lines.findIndex(l => l.trim().startsWith(heading)); if (i < 0) return '';
    const out = [];
    for (let j = i + 1; j < lines.length; j++) {
      const m = lines[j].match(/^(#+)\s/); if (m && m[1].length <= lvl) break;
      if (/^---\s*$/.test(lines[j])) break;
      out.push(lines[j]);
    }
    return out.join('\n').trim();
  }
  function mdTable(src) {
    const rows = src.split('\n').filter(l => l.trim().startsWith('|') && !/^\|\s*-/.test(l.trim()));
    return rows.slice(1).map(r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim()));
  }
  const strip = s => s.replace(/\*\*/g, '').replace(/`/g, '');
  const inline = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`(.+?)`/g, '<code>$1</code>');

  // ---------- shell ----------
  function renderShell() {
    document.getElementById('topnav').innerHTML = TOP.map(([id, l]) => `<a href="#${id}" data-r="${id}">${l}</a>`).join('');
    document.getElementById('sidenav').innerHTML = NAV.map(g => `<h6>${g.group}</h6>` + g.items.map(i =>
      `<a href="#${i.id}" data-r="${i.id}">${esc(i.label)}${i.soon ? '<span class="soon">待定</span>' : ''}</a>`).join('')).join('');
    document.querySelectorAll('.brandmark img').forEach(img => { img.src = asset(img.dataset.src); });
    const tb = document.getElementById('theme-btn');
    tb.addEventListener('click', () => { const m = MODES[(MODES.indexOf(getMode()) + 1) % 3]; setMode(m); });
    setMode(getMode());
  }
  function setActive(id) {
    document.querySelectorAll('[data-r]').forEach(a => a.toggleAttribute('aria-current', a.dataset.r === id));
    document.querySelectorAll('[data-r]').forEach(a => { if (a.dataset.r === id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  }
  function nextLink(id) {
    const i = ORDER.indexOf(id); const n = ORDER[i + 1]; if (!n) return '';
    return `<div class="next"><a href="#${n}"><span>下一页 →</span>${esc(TITLES[n])}</a></div>`;
  }
  function pageHead(path, title, lead) {
    return `<header class="page-head"><div class="eyebrow">${path}</div><h1 class="h1">${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</header>`;
  }

  // ---------- views ----------
  function viewHome() {
    const what = mdSection('### Tier0 是什么').split('\n').filter(l => l.trim() && !l.startsWith('>'));
    const traits = mdTable(mdSection('### 特征'));
    const quote = (mdSection('## 3. 品牌特征').match(/^>\s*(.+)$/m) || [])[1] || '';
    const principles = [...mdSection('## 2. 设计原则').matchAll(/\*\*(.+?)\*\*\n(.+)/g)].map(m => [m[1], m[2]]);
    const demos = [
      '<div class="d-squares"><i></i><i></i><i class="on"></i><i></i><i></i></div>',
      '<div class="d-layers"><span></span><span></span><span></span></div>',
      '<div class="d-card"></div>',
      '<div class="d-radius">4px</div>',
      '<div class="d-window"><div class="t"><i></i><i></i><i></i></div><div class="b"><div><span></span><span class="on"></span><span></span><span></span></div><div><span></span><span></span><span></span></div></div></div>',
      '<div class="d-eng"></div><div class="d-frame">Factory-A / Line-01<span class="corners"></span></div>',
    ];
    return `
    <section class="hero">
      <div class="hero-copy">
        <div class="eyebrow"><b>Tier0</b>/<span>Design System</span>/<span>v2</span></div>
        <h1 class="h-display">Connect once,<br>Reuse everywhere.</h1>
        <p class="lead">${inline(strip(what.join(' ')))}</p>
        ${quote ? `<p class="hero-quote">${inline(strip(quote))}</p>` : ''}
        <div class="hero-actions">
          <a class="btn btn-primary" href="#color">查看颜色 <span class="arr">↗</span></a>
          <a class="btn btn-outline" href="#playground">打开试用台</a>
          <a class="btn btn-ghost" href="#foundation">阅读 Foundation</a>
        </div>
      </div>
      <div class="console" aria-label="UNS 数据结构示意">
        <div class="console-bar"><span>UNS / Namespace</span><span class="run"><i class="sig"></i>Running</span></div>
        <div class="console-body">
          <ul class="tree">
            <li><i></i>Factory-A</li>
            <li class="lv1"><i></i>Line-01</li>
            <li class="lv2 on"><i></i>CNC-03<em>live</em></li>
            <li class="lv3"><i></i>Metrics</li>
            <li class="lv3"><i></i>State</li>
            <li class="lv3"><i></i>Action</li>
          </ul>
          <div class="readouts">
            <div class="readout"><div class="k"><span>Spindle temp</span><span>CNC-03</span></div><div class="v"><span id="ro-temp">72.4</span><small>°C</small></div></div>
            <div class="readout"><div class="k"><span>Load</span><span id="ro-load-t">68%</span></div><div class="bar"><span id="ro-load"></span></div></div>
            <div class="path"><b>Factory-A</b> / Line-01 / CNC-03 / Metrics</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-head"><div><h2 class="h3">品牌特征</h2><p class="lead">六个特征贯穿每一个产品和物料。悬停或滚动到磁贴时会演示一次。</p></div><a class="btn btn-ghost" href="#foundation">完整规则 <span class="arr">↗</span></a></div>
      <div class="grid grid-3" id="traits">
        ${traits.map((t, i) => `<article class="tile"><div class="tile-stage">${demos[i] || ''}</div><h4>${esc(strip(t[0]))}</h4><p>${inline(t[1].split('。')[0])}。</p></article>`).join('')}
      </div>
    </section>

    <section class="section">
      <div class="section-head"><div><h2 class="h3">该做与不该做</h2><p class="lead">切换每个示例，对比规则和它要取代的习惯做法。</p></div></div>
      <div class="grid grid-2">${DOS.map((d, i) => `
        <article class="dd" data-dd="${i}">
          <div class="dd-head"><h4>${d.t}</h4><div class="seg" role="group"><button aria-pressed="true" data-v="do">该做</button><button aria-pressed="false" data-v="dont">不该做</button></div></div>
          <div class="dd-stage">${d.do}</div>
          <p class="dd-note"><i></i><span>${d.dn}</span></p>
        </article>`).join('')}</div>
    </section>

    <section class="section">
      <div class="section-head"><div><h2 class="h3">设计原则</h2></div></div>
      <div class="grid grid-2">${principles.map(([t, p]) => `<article class="tile"><h4 class="h4" style="font-family:var(--font-display)">${esc(t)}</h4><p>${esc(p)}</p></article>`).join('')}</div>
    </section>

    <section class="section">
      <div class="section-head"><div><h2 class="h3">开始使用</h2><p class="lead">设计、前端和 Agent 读取同一套 token 与规则。</p></div></div>
      <div class="grid grid-3">
        <article class="tile"><h4>Token</h4><p>颜色与字体的唯一真源，命名与前端 packages/theme 一致。</p><div class="cmd"><code>01-tokens/color/base.json</code><button data-copy="01-tokens/">复制</button></div></article>
        <article class="tile"><h4>Agent Skill</h4><p>让 Claude Code、Codex 等 Agent 按同一套规则产出。规划中。</p><div class="cmd"><code>/tier0-ui</code><button data-copy="/tier0-ui">复制</button></div></article>
        <article class="tile"><h4>Foundation</h4><p>品牌故事、原则、特征与约束，所有规范从这里出发。</p><div class="cmd"><code>00-foundation/foundation.md</code><button data-copy="00-foundation/foundation.md">复制</button></div></article>
      </div>
    </section>

    <section class="section">
      <div class="section-head"><div><h2 class="h3">目录</h2></div></div>
      <div class="grid grid-4">
        ${[['color', '颜色', '品牌色、色阶、辅助色与主题映射', `<div class="d-squares"><i style="background:var(--foreground)"></i><i style="background:var(--subtle);outline:1px solid var(--border)"></i><i class="on"></i><i style="background:var(--highlight-deep)"></i></div>`],
           ['typography', '字体', 'Inter、IBM Plex 家族与两套字阶', `<span style="font-family:var(--font-display);font-size:44px;letter-spacing:-.02em">Aa</span><span class="mono" style="font-size:20px;margin-left:8px">01</span>`],
           ['components', '组件', '15 个组件的现场演示', `<span class="btn btn-primary">Connect</span>`],
           ['brand', 'Logo 与素材', 'Logo、模版与品牌素材', `<img alt="" style="height:22px" src="${asset('03-brand/logo/assets/tier0-logo-black.svg')}">`]]
          .map(([id, t, d, demo]) => `<a class="tile" href="#${id}"><div class="tile-stage">${demo}</div><div class="tile-foot"><h4>${t}</h4><span class="go">↗</span></div><p>${d}</p></a>`).join('')}
      </div>
    </section>
    ${nextLink('home')}`;
  }
  const DOS = [
    { t: '品牌绿', do: '<span class="btn btn-highlight">Running</span><span class="mono" style="margin-left:12px;color:var(--highlight-ink)">LIVE · 12 nodes</span>', dont: '<span style="color:var(--highlight);font-weight:500">需要阅读的绿色文字</span>',
      dn: '品牌绿作为填充色时上面放近黑文字；需要阅读的绿色文字和图标用 highlight-ink。', ddn: '品牌绿直接做白底上的文字，对比度约 1.4:1，几乎看不清。' },
    { t: '层级', do: '<div class="d-card" style="width:70%;height:70%"></div>', dont: '<div style="width:70%;height:70%;background:var(--card);border-radius:12px;box-shadow:0 18px 40px rgba(5,11,20,.18)"></div>',
      dn: '常驻内容用 1px 细线和底色区分层级。', ddn: '卡片靠大阴影浮起来，界面变得松散、漂浮。' },
    { t: '圆角', do: '<div class="d-radius">4px</div>', dont: '<div class="d-radius" style="border-radius:28px">28px</div>',
      dn: '圆角统一 4px，边缘利落。', ddn: '大圆角显得柔软、消费化，不符合工程工具的气质。' },
    { t: '主操作', do: '<span class="btn btn-primary">保存</span><span class="btn btn-outline" style="margin-left:8px">取消</span>', dont: '<span class="btn btn-highlight">保存</span><span class="btn btn-highlight" style="margin-left:8px">取消</span>',
      dn: '主操作用近黑，品牌绿留给信号和重点。', ddn: '把品牌绿用在每个按钮上，绿色失去了"信号"的意义。' },
  ];

  function viewFoundation() {
    return pageHead('<b>00-foundation</b>/<span>foundation.md</span>', 'Foundation', '品牌故事、设计原则、品牌特征与约束。内容直接读取仓库里的 foundation.md。')
      + `<article class="prose">${D.md ? md(D.md) : '<p class="empty">没有读取到 foundation.md。</p>'}</article>` + nextLink('foundation');
  }

  function viewColor() {
    if (!D.base) return pageHead('<b>01-tokens</b>/<span>color</span>', '颜色') + '<p class="empty">没有读取到颜色 token。</p>';
    const c = D.base.color;
    const brand = entries(c.brand).map(([k, v]) => {
      const hex = colorOf(v.$value); const name = (v.$extensions && v.$extensions.tier0 && v.$extensions.tier0.displayName) || k;
      return `<button class="swatch" data-copy="${hex}" data-label="${esc(name)} ${hex}"><div class="chip" style="background:${hex};${hex === '#FFFFFF' || hex === '#FAFAFA' ? 'box-shadow:inset 0 -1px 0 var(--border)' : ''}"></div><div class="meta"><b>${esc(name)}</b><code>${hex} · ${k}</code><p>${esc(v.$description || '')}</p></div></button>`;
    }).join('');
    const ramp = (name, obj) => {
      const steps = entries(obj).filter(([, v]) => v && v.$value);
      return `<div class="ramp">${steps.map(([s, v]) => { const hex = colorOf(v.$value); return `<button data-copy="${hex}" data-label="${name}-${s} ${hex}" title="${esc(v.$description || '')}"><div class="chip" style="background:${hex}"></div><div class="lbl"><span>${s}</span><span>${hex}</span></div></button>`; }).join('')}</div>`;
    };
    const scaleRows = entries(c.scale).filter(([, v]) => !v.$value).map(([k, v]) => `<div class="ramp-row"><div><h5>${k}</h5></div>${ramp(k, v)}</div>`).join('');
    const singles = entries(c.scale).filter(([, v]) => v.$value).map(([k, v]) => `<span class="dot-sw"><i style="background:${colorOf(v.$value)}"></i>${k} ${colorOf(v.$value)}</span>`).join(' ');
    const auxRows = entries(c.auxiliary).map(([k, v]) => `<div class="ramp-row"><div><h5>${k}</h5><p>${esc((v.$description || '').split('——')[0])}</p></div>${ramp(k, v)}</div>`).join('');
    const sem = coreGroups.map(g => {
      const lg = D.light.color[g], dg = D.dark.color[g];
      return `<tr><td colspan="4" style="background:var(--subtle)"><span class="eyebrow">${esc((lg.$description || g).split('。')[0])}</span></td></tr>` + entries(lg).map(([k, v]) => {
        const lh = colorOf(v.$value), dh = colorOf(dg[k] && dg[k].$value);
        return `<tr><td><code>--${k}</code></td><td><span class="dot-sw"><i style="background:${lh}"></i>${lh}</span></td><td><span class="dot-sw"><i style="background:${dh}"></i>${dh}</span></td><td>${esc(v.$description || '')}</td></tr>`;
      }).join('');
    }).join('');
    const rules = (D.light.color.$extensions && D.light.color.$extensions.tier0 && D.light.color.$extensions.tier0.rules) || [];
    return pageHead('<b>01-tokens</b>/<span>color</span>', '颜色', '品牌色只有五个；色阶和辅助色支撑产品界面；组件只使用下方的用途 token。点击任意色块复制色值。')
      + `<section class="section" style="margin-top:32px"><div class="section-head"><h2 class="h3">品牌色</h2></div><div class="swatches">${brand}</div></section>
      <section class="section"><div class="section-head"><div><h2 class="h3">色阶</h2><p class="lead">品牌色所在的色系。独立色：${singles}</p></div></div>${scaleRows}</section>
      <section class="section"><div class="section-head"><div><h2 class="h3">辅助色</h2><p class="lead">${esc(c.auxiliary.$description || '')}</p></div></div>${auxRows}</section>
      <section class="section"><div class="section-head"><div><h2 class="h3">用途 token</h2><p class="lead">组件只使用这些语义名称。切换右上角主题可以看到深色映射。</p></div></div>
        <div class="tbl-wrap"><table class="spec"><thead><tr><th>Token</th><th>浅色</th><th>深色</th><th>用途</th></tr></thead><tbody>${sem}</tbody></table></div></section>
      ${rules.length ? `<section class="section"><div class="section-head"><h2 class="h3">规则</h2></div><ol class="rules">${rules.map((r, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${inline(r)}</li>`).join('')}</ol></section>` : ''}
      ${nextLink('color')}`;
  }

  function viewTypography() {
    if (!D.typo) return pageHead('<b>01-tokens</b>/<span>typography</span>', '字体') + '<p class="empty">没有读取到字体 token。</p>';
    const fam = D.typo.font.family;
    const samples = { display: 'Connect once', sans: '工业数据平台 Agentic', mono: 'TEMP 72.4 °C', sc: '一次接入，处处复用', logo: 'TIER0' };
    const fams = entries(fam).map(([k, v]) => `<article class="family"><span class="tag">${k} · ${esc(v.$value[0])}</span><div class="spec-big" style="font-family:var(--font-${k === 'sc' ? 'sans' : k});${k === 'sc' ? `font-family:'IBM Plex Sans SC',sans-serif;` : ''}">${samples[k] || 'Aa'}</div><p class="muted" style="font-size:13px">${esc(v.$description || '')}</p></article>`).join('');
    const rules = (D.typo.typography.$extensions && D.typo.typography.$extensions.tier0 && D.typo.typography.$extensions.tier0.rules) || [];
    return pageHead('<b>01-tokens</b>/<span>typography.json</span>', '字体', '标题用 Inter，正文用 IBM Plex Sans，代码与数据用 IBM Plex Mono，中文用 IBM Plex Sans SC。字阶分产品与官网两套。')
      + `<section class="section" style="margin-top:32px"><div class="section-head"><h2 class="h3">字体</h2></div><div class="grid grid-2">${fams}</div></section>
      <section class="section"><div class="section-head"><div><h2 class="h3">字阶</h2><p class="lead">输入文字实时预览。产品字阶对应前端 packages/theme；官网字阶用于官网、Deck 和宣传物料。</p></div></div>
        <div class="toolbar"><div class="field"><label for="ty-text">预览文字</label><input class="input" id="ty-text" value="Connect once, Reuse everywhere. 一次接入，处处复用"></div>
          <div class="field" style="flex:0 0 auto;min-width:0"><label>字阶</label><div class="seg" id="ty-set"><button aria-pressed="true" data-set="product">产品</button><button aria-pressed="false" data-set="web">官网</button></div></div></div>
        <div id="ty-rows"></div></section>
      ${rules.length ? `<section class="section"><div class="section-head"><h2 class="h3">规则</h2></div><ol class="rules">${rules.map((r, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${inline(r)}</li>`).join('')}</ol></section>` : ''}
      ${nextLink('typography')}`;
  }
  function renderTypeRows(set) {
    const box = document.getElementById('ty-rows'); if (!box) return;
    const text = esc(document.getElementById('ty-text').value || 'Aa');
    const group = D.typo.typography[set];
    box.innerHTML = entries(group).map(([k, v]) => {
      const t = typoValue(v.$value) || {};
      const src = typeof v.$value === 'string' ? (walk(D.typo, v.$value) || {}) : v;
      const famKey = (src.$value && src.$value.fontFamily) || '';
      const fk = String(famKey).replace(/[{}]/g, '').split('.').pop();
      const ext = o => (o && o.$extensions && o.$extensions.tier0) || {};
      const tt = ext(v).textTransform || ext(src).textTransform || '';
      const style = `font-family:var(--font-${fk});font-size:${t.fontSize};line-height:${t.lineHeight};font-weight:${t.fontWeight};letter-spacing:${t.letterSpacing || 0};${tt ? 'text-transform:' + tt : ''}`;
      return `<div class="scale-row"><div class="meta"><b>${k}</b><span>${fk} · ${parseInt(t.fontSize)} / ${parseInt(t.lineHeight)} · ${t.fontWeight}</span><span>${esc((v.$description || '').split('——')[0])}</span></div><div class="sample" style="${style}">${text}</div></div>`;
    }).join('');
  }

  const SPEC = {
    button: () => '<span class="btn btn-primary">保存</span><span class="btn btn-highlight">Run agent</span><span class="btn btn-outline">取消</span><span class="btn btn-ghost">更多</span>',
    input: () => '<div class="field" style="width:240px"><label for="sp-in">数据源名称</label><input class="input" id="sp-in" placeholder="PLC-S7-01"></div>',
    select: () => '<div class="field" style="width:240px"><label for="sp-sel">协议</label><select class="input select" id="sp-sel"><option>OPC UA</option><option>Modbus TCP</option><option>MQTT</option></select></div>',
    tag: () => '<span class="badge">OPC UA</span><span class="badge">Line-01</span><span class="badge hl">Live</span>',
    'status-tag': () => '<span class="badge ok"><i></i>已连接</span><span class="badge warn"><i></i>接近上限</span><span class="badge err"><i></i>离线</span><span class="badge info"><i></i>同步中</span>',
    panel: () => '<div style="width:260px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius)"><div style="padding:10px 12px;border-bottom:1px solid var(--border)" class="eyebrow"><b>CNC-03</b>/ Metrics</div><div style="padding:12px;display:grid;gap:6px"><div class="readout" style="border:0;padding:0"><div class="v" style="font-size:22px">72.4<small>°C</small></div></div></div></div>',
    table: () => '<table class="mini-table"><tr><td>CNC-01</td><td>61.2</td></tr><tr class="sel"><td>CNC-03</td><td>72.4</td></tr><tr><td>CNC-04</td><td>58.9</td></tr></table>',
    tabs: () => '<div class="tabs" style="width:280px"><span class="on">Metrics</span><span>State</span><span>Action</span></div>',
    dialog: () => '<div class="dialog"><b style="font-family:var(--font-display);font-size:16px">断开数据源？</b><p class="muted" style="font-size:13px">PLC-S7-01 的数据将停止同步。</p><div style="display:flex;gap:8px;justify-content:flex-end"><span class="btn btn-outline">取消</span><span class="btn btn-primary">断开</span></div></div>',
    signal: () => '<span class="dot-sw" style="color:var(--foreground)"><i class="sig" style="width:8px;height:8px;border:0"></i>Running</span><span class="dot-sw"><i style="width:8px;height:8px;border:0;background:var(--border)"></i>Idle</span>',
    path: () => '<ul class="tree" style="width:240px"><li style="opacity:1;transform:none;animation:none"><i></i>Factory-A</li><li class="lv1" style="opacity:1;transform:none;animation:none"><i></i>Line-01</li><li class="lv2 on" style="opacity:1;transform:none;animation:none"><i></i>CNC-03</li></ul>',
    readout: () => '<div class="readout" style="width:220px"><div class="k"><span>Spindle temp</span><span>live</span></div><div class="v">72.4<small>°C</small></div></div>',
    'focus-frame': () => '<div class="d-frame" style="padding:16px 20px">Line-01 · selected<span class="corners"></span></div>',
    'ai-message': () => '<div class="ai-msg"><div class="q">Line-01 过去 24h 为什么停机？</div><div class="a"><span class="eyebrow">UNS Agent</span><span>CNC-03 冷却压力下降 18%，触发了 3 次保护停机。</span></div></div>',
  };
  function viewComponents() {
    return pageHead('<b>02-components</b>', '组件', '每个组件都用当前 token 实时渲染。用法说明按 6 项模板手写，完成后状态会变为"已定"。')
      + `<section class="section" style="margin-top:32px"><div class="grid grid-2">${COMPONENTS.map(([id, name]) => `
        <article class="spec-card"><div class="stage">${SPEC[id] ? SPEC[id]() : ''}</div><div class="cap"><b>${name}</b><code>02-components/${id}</code><span class="badge todo">用法待编写</span></div></article>`).join('')}</div></section>
      ${nextLink('components')}`;
  }

  function viewPlayground() {
    return pageHead('<b>试用台</b>/<span>playground</span>', '试用台', '调整品牌绿、主色和圆角，实时查看组件效果和对比度。调整只在本页生效，不会修改 token。')
      + `<section class="lab" style="margin-top:32px">
        <aside class="lab-panel">
          <div class="field"><label for="pg-hl">品牌绿 highlight</label><div class="color-field"><input type="color" id="pg-hl"><input class="input" id="pg-hl-t"></div></div>
          <div class="field"><label for="pg-pr">主色 primary</label><div class="color-field"><input type="color" id="pg-pr"><input class="input" id="pg-pr-t"></div></div>
          <div class="field"><label for="pg-r">圆角 <span id="pg-r-v"></span></label><input type="range" id="pg-r" min="0" max="12" step="1"></div>
          <div class="field"><label>预览主题</label><div class="seg" id="pg-th"><button aria-pressed="true" data-t="light">浅色</button><button aria-pressed="false" data-t="dark">深色</button></div></div>
          <div class="field"><label>对比度</label><div class="contrast" id="pg-ct"></div></div>
          <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-outline" id="pg-reset">恢复默认</button><button class="btn btn-primary" id="pg-copy">复制变量</button></div>
        </aside>
        <div class="lab-stage"><div class="lab-stage-inner" id="pg-stage">
          <div class="eyebrow"><b>Factory-A</b>/ Line-01 / CNC-03</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">${SPEC.button()}</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">${SPEC.tag()}${SPEC['status-tag']()}</div>
          <div class="grid grid-2" style="border-radius:var(--radius)"><div class="tile">${SPEC.readout().replace('width:220px', 'width:auto')}</div><div class="tile">${SPEC.table()}</div></div>
          <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">${SPEC.dialog()}${SPEC['ai-message']()}</div>
        </div></div>
      </section>${nextLink('playground')}`;
  }
  function initPlayground() {
    const stage = document.getElementById('pg-stage'); if (!stage) return;
    const L = varsFor(D.light), K = varsFor(D.dark);
    const st = { hl: L.highlight || '#B2ED1D', pr: L.primary || '#050B14', r: 4, t: 'light' };
    const $ = id => document.getElementById(id);
    function paint() {
      const base = st.t === 'dark' ? K : L;
      const v = Object.assign({}, base, { highlight: st.hl });
      if (st.t === 'light') v.primary = st.pr;
      Object.entries(v).forEach(([k, x]) => stage.style.setProperty('--' + k, x));
      stage.style.setProperty('--radius', st.r + 'px');
      stage.parentElement.style.borderRadius = st.r + 'px';
      $('pg-hl').value = st.hl; $('pg-hl-t').value = st.hl.toUpperCase(); $('pg-pr').value = st.pr; $('pg-pr-t').value = st.pr.toUpperCase();
      $('pg-r').value = st.r; $('pg-r-v').textContent = st.r + 'px';
      const rows = [
        ['品牌绿上的文字', v['highlight-foreground'], v.highlight, 4.5],
        ['品牌绿 / 背景', v.highlight, v.background, 3],
        ['主按钮文字', v['primary-foreground'], v.primary, 4.5],
        ['正文 / 背景', v.foreground, v.background, 4.5],
        ['次要文字 / 背景', v['muted-foreground'], v.background, 4.5],
      ];
      $('pg-ct').innerHTML = rows.map(([n, a, b, min]) => { const c = contrast(a, b); return `<div><span>${n}</span><span class="${c >= min ? 'pass' : 'fail'}">${c.toFixed(2)}:1 ${c >= min ? '✓' : '×'}</span></div>`; }).join('');
    }
    const hex = s => /^#?[0-9a-f]{6}$/i.test(s.trim()) ? '#' + s.trim().replace('#', '').toUpperCase() : null;
    $('pg-hl').addEventListener('input', e => { st.hl = e.target.value.toUpperCase(); paint(); });
    $('pg-pr').addEventListener('input', e => { st.pr = e.target.value.toUpperCase(); paint(); });
    $('pg-hl-t').addEventListener('change', e => { const x = hex(e.target.value); if (x) { st.hl = x; paint(); } });
    $('pg-pr-t').addEventListener('change', e => { const x = hex(e.target.value); if (x) { st.pr = x; paint(); } });
    $('pg-r').addEventListener('input', e => { st.r = +e.target.value; paint(); });
    $('pg-th').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; st.t = b.dataset.t; $('pg-th').querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b)); paint(); });
    $('pg-reset').addEventListener('click', () => { Object.assign(st, { hl: L.highlight, pr: L.primary, r: 4 }); paint(); toast('已恢复默认'); });
    $('pg-copy').addEventListener('click', () => copy(`--highlight: ${st.hl};\n--primary: ${st.pr};\n--radius: ${st.r}px;`, '变量'));
    paint();
  }

  function viewBrand() {
    const logos = [['tier0-logo-black.svg', '标准版', 'on-light'], ['tier0-logo-black.svg', '浅灰底', 'on-grey'], ['tier0-logo-white.svg', '反白版', 'on-dark'], ['tier0-logo-lime.svg', '品牌绿版', 'on-dark']];
    const tpl = [['PPT', 'deck'], ['社媒图', 'social'], ['海报', 'poster'], ['名片', 'business-card'], ['邮件签名', 'email-signature']];
    return pageHead('<b>03-brand</b>', 'Logo 与素材', '对外物料使用的品牌资产。规范与源文件都在 03-brand 下，按需下载。')
      + `<section class="section" style="margin-top:32px"><div class="section-head"><div><h2 class="h3">Logo</h2><p class="lead">源文件位于 03-brand/logo/assets。字标使用 Tektur，交付时为路径。</p></div></div>
        <div class="grid grid-2">${logos.map(([f, n, bg]) => `<article class="logo-tile"><div class="stage ${bg}"><img alt="Tier0 ${n}" src="${asset('03-brand/logo/assets/' + f)}"></div><div class="cap"><b>${n}</b><code class="muted">${f}</code><a class="btn btn-ghost" style="margin-left:auto;height:28px" href="${asset('03-brand/logo/assets/' + f)}" target="_blank" rel="noopener">打开 SVG <span class="arr">↗</span></a></div></article>`).join('')}</div></section>
      <section class="section" id="templates"><div class="section-head"><div><h2 class="h3">模版</h2><p class="lead">模版完成后放在 03-brand/templates/assets 下。</p></div></div>
        <div class="grid grid-3">${tpl.map(([n, id]) => `<article class="tile"><div class="tile-stage"><span class="mono muted" style="font-size:12px">${id}/</span></div><div class="tile-foot"><h4>${n}</h4><span class="badge todo">待制作</span></div></article>`).join('')}</div></section>
      <section class="section"><div class="section-head"><h2 class="h3">其他素材</h2></div>
        <div class="grid grid-3">${[['纹理', 'texture'], ['动画', 'animation'], ['音效', 'sound'], ['图片', 'imagery'], ['图标', 'iconography']].map(([n, id]) => `<article class="tile"><div class="tile-foot"><h4>${n}</h4><code class="muted" style="font-size:11px">03-brand/${id}</code><span class="badge todo">待编写</span></div></article>`).join('')}</div></section>
      ${nextLink('brand')}`;
  }

  function viewSkills() {
    return pageHead('<b>04-skills</b>', 'Skills', '把 Foundation、Token、组件和品牌打包成 Agent 可以直接调用的技能。四个出口对应 UI 界面、官网、Slides 与宣传物料。')
      + `<section class="section" style="margin-top:32px"><div class="grid grid-2">${SKILLS.map(s => `
        <article class="tile"><div class="tile-foot"><h4 class="mono">${s.id}</h4><span class="badge todo">待编写</span></div><p>${s.desc}</p>
          <p class="eyebrow">出口 <b>${s.out}</b> / 读取 ${s.tokens}</p><div class="cmd"><code>/${s.id}</code><button data-copy="/${s.id}">复制</button></div></article>`).join('')}</div></section>
      <section class="section"><div class="section-head"><div><h2 class="h3">快速试用</h2><p class="lead">写一句需求，生成可以直接粘贴给 Claude Code 或 Codex 的完整指令。Skill 发布后，这里会改为直接调用。</p></div></div>
        <div class="toolbar" style="display:grid;gap:12px">
          <div style="display:flex;gap:12px;flex-wrap:wrap"><div class="field" style="flex:0 0 220px"><label for="sk-pick">Skill</label><select class="input select" id="sk-pick">${SKILLS.map(s => `<option value="${s.id}">${s.id} · ${s.out}</option>`).join('')}</select></div>
          <div class="field" style="flex:1;min-width:220px"><label for="sk-brief">需求</label><input class="input" id="sk-brief" value="做一页展示 Line-01 实时状态的看板"></div></div>
          <div class="field"><label for="sk-out">生成的指令</label><textarea class="input mono" id="sk-out" rows="9" readonly style="font-size:12px"></textarea></div>
          <div><button class="btn btn-primary" id="sk-copy">复制指令</button></div>
        </div></section>${nextLink('skills')}`;
  }
  function initSkills() {
    const out = document.getElementById('sk-out'); if (!out) return;
    const pick = document.getElementById('sk-pick'), brief = document.getElementById('sk-brief');
    function gen() {
      const s = SKILLS.find(x => x.id === pick.value);
      out.value = `/${s.id}\n\n需求：${brief.value}\n\n要求：\n- 先读取 00-foundation/foundation.md 与 01-tokens/README.md\n- 颜色只使用 color/light.json、color/dark.json 主层 token，不写色值\n- 字体使用 typography.json${s.id === 'tier0-ui' ? '.product' : '.web'} 字阶\n- 品牌绿只用于信号、实时数据、选中和重点区块；主操作用近黑\n- 输出前对照 foundation 中的 Anti 表自查`;
    }
    pick.addEventListener('change', gen); brief.addEventListener('input', gen);
    document.getElementById('sk-copy').addEventListener('click', () => copy(out.value, '指令'));
    gen();
  }

  function viewSoon(id) {
    return pageHead('<b>待定</b>', esc(TITLES[id] || id), '这一部分还在梳理中，确定后会出现在这里。') + `<p class="empty" style="margin-top:32px">对应文件尚未编写。完成后在 site.js 的 NAV 中去掉"待定"标记即可。</p>`;
  }

  // ---------- router ----------
  const VIEWS = { home: viewHome, foundation: viewFoundation, color: viewColor, typography: viewTypography, components: viewComponents, playground: viewPlayground, brand: viewBrand, skills: viewSkills };
  function route() {
    let id = (location.hash || '#home').slice(1).replace(/[^a-z0-9-]/gi, '') || 'home';
    if (id === 'templates') id = 'brand';
    const main = document.getElementById('main');
    main.innerHTML = `<div class="view">${(VIEWS[id] || (() => viewSoon(id)))()}</div>`;
    setActive(id);
    document.title = (id === 'home' ? 'Tier0 Design System' : (TITLES[id] || id) + ' · Tier0 Design System');
    if (id === 'typography') { const set = () => renderTypeRows(document.querySelector('#ty-set [aria-pressed="true"]').dataset.set); document.getElementById('ty-text').addEventListener('input', set); document.getElementById('ty-set').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; document.querySelectorAll('#ty-set button').forEach(x => x.setAttribute('aria-pressed', x === b)); set(); }); set(); }
    if (id === 'playground') initPlayground();
    if (id === 'skills') initSkills();
    if (id === 'home') initHome();
    window.scrollTo(0, 0);
  }
  function initHome() {
    // do / don't toggles
    document.querySelectorAll('[data-dd]').forEach(card => {
      const d = DOS[+card.dataset.dd]; const stage = card.querySelector('.dd-stage'), note = card.querySelector('.dd-note');
      card.querySelector('.seg').addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        card.querySelectorAll('.seg button').forEach(x => x.setAttribute('aria-pressed', x === b));
        const good = b.dataset.v === 'do';
        stage.innerHTML = good ? d.do : d.dont; note.classList.toggle('bad', !good); note.querySelector('span').textContent = good ? d.dn : d.ddn;
      });
    });
    // play trait demos once when seen, and again on hover
    const tiles = document.querySelectorAll('#traits .tile');
    const play = t => { t.classList.remove('play'); void t.offsetWidth; t.classList.add('play'); };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { play(e.target); io.unobserve(e.target); } }), { threshold: .5 });
      tiles.forEach(t => io.observe(t));
    }
    tiles.forEach(t => t.addEventListener('mouseenter', () => play(t)));
    // live readout
    const temp = document.getElementById('ro-temp'), load = document.getElementById('ro-load'), loadT = document.getElementById('ro-load-t');
    if (!temp || matchMedia('(prefers-reduced-motion: reduce)').matches) { if (load) load.style.width = '68%'; return; }
    clearInterval(initHome._t);
    initHome._t = setInterval(() => {
      if (!document.body.contains(temp)) return clearInterval(initHome._t);
      temp.textContent = (71.8 + Math.random() * 1.4).toFixed(1);
      const l = Math.round(62 + Math.random() * 12); load.style.width = l + '%'; loadT.textContent = l + '%';
    }, 1600);
  }

  document.addEventListener('click', e => {
    const c = e.target.closest('[data-copy]'); if (c) { e.preventDefault(); copy(c.dataset.copy, c.dataset.label); }
  });
  window.addEventListener('hashchange', route);

  async function start() {
    renderShell();
    document.getElementById('main').innerHTML = '<div class="loading"><i class="sig"></i>正在读取 token…</div>';
    await load();
    applyTokens();
    route();
  }
  start();
})();
