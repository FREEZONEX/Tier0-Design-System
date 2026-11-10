/* Tier0 Design System portal.
   Reads 00-foundation/foundation.md and 01-tokens/*.json at runtime. Layout: sidebar · canvas · inspector. */
(function () {
  'use strict';

  // ---------- content config ----------
  const COMPONENTS = [
    { id: 'button', zh: '按钮', en: 'Button', desc: '触发一个操作。主操作用近黑，品牌绿用于需要强调的运行类操作。', tokens: ['primary', 'highlight', 'border'],
      variants: { 主要: '<button class="btn btn-primary">保存</button>', 高亮: '<button class="btn btn-highlight">运行 Agent</button>', 描边: '<button class="btn btn-outline">取消</button>', 幽灵: '<button class="btn btn-ghost">更多</button>', 危险: '<button class="btn btn-danger">删除</button>' } },
    { id: 'input', zh: '输入框', en: 'Input', desc: '单行文本输入。', tokens: ['input', 'card', 'ring'],
      variants: { 默认: '<div class="field" style="width:280px"><label for="d-in">数据源名称</label><input class="input" id="d-in" placeholder="PLC-S7-01"></div>' } },
    { id: 'select', zh: '选择器', en: 'Select', desc: '从一组选项中选择一个。', tokens: ['input', 'card'],
      variants: { 默认: '<div class="field" style="width:280px"><label for="d-sel">协议</label><select class="input" id="d-sel"><option>OPC UA</option><option>Modbus TCP</option><option>MQTT</option></select></div>' } },
    { id: 'tag', zh: '标签', en: 'Tag', desc: '标注属性和分类。', tokens: ['border', 'card', 'highlight'],
      variants: { 默认: '<div class="row"><span class="badge">OPC UA</span><span class="badge">Line-01</span><span class="badge hl">实时</span></div>' } },
    { id: 'status-tag', zh: '状态标签', en: 'Status', desc: '表示真实的结果，总是同时有颜色和文字。', tokens: ['success', 'warning', 'destructive', 'info'],
      variants: { 默认: '<div class="row"><span class="badge ok"><i></i>已连接</span><span class="badge warn"><i></i>接近上限</span><span class="badge err"><i></i>离线</span><span class="badge info"><i></i>同步中</span></div>' } },
    { id: 'panel', zh: '面板', en: 'Panel', desc: '承载一组相关信息的容器，用细线区分层级。', tokens: ['card', 'border'],
      variants: { 默认: '<div class="panel"><div class="panel-h"><span>CNC-03</span><span class="muted">指标</span></div><div class="readout" style="border:0"><div class="v">72.4<small>°C</small></div></div></div>' } },
    { id: 'table', zh: '表格', en: 'Table', desc: '展示多行结构化数据，选中行用浅绿底。', tokens: ['border', 'accent'],
      variants: { 默认: '<table class="tbl"><tr><td>CNC-01</td><td>61.2</td></tr><tr class="sel"><td>CNC-03</td><td>72.4</td></tr><tr><td>CNC-04</td><td>58.9</td></tr></table>' } },
    { id: 'tabs', zh: '标签页', en: 'Tabs', desc: '在同一区域切换不同视图。', tokens: ['foreground', 'border'],
      variants: { 默认: '<div class="tabs"><span class="on">指标</span><span>状态</span><span>动作</span></div>' } },
    { id: 'dialog', zh: '弹窗', en: 'Dialog', desc: '需要确认的操作。浮层是少数允许使用阴影的元素。', tokens: ['card', 'border', 'primary'],
      variants: { 默认: '<div class="dialog"><b style="font-family:var(--font-display);font-size:16px;font-weight:600">断开数据源？</b><p class="muted">PLC-S7-01 的数据将停止同步。</p><div class="row" style="justify-content:flex-end"><button class="btn btn-outline btn-sm">取消</button><button class="btn btn-primary btn-sm">断开</button></div></div>' } },
    { id: 'signal', zh: '方块标记', en: 'Marker', desc: '表示运行状态和要点。运行中用品牌绿并缓慢呼吸。', tokens: ['highlight', 'border'],
      variants: { 默认: '<div class="row" style="gap:20px"><span class="row" style="gap:8px"><i class="sig"></i>运行中</span><span class="row" style="gap:8px"><i style="width:8px;height:8px;background:var(--border)"></i>空闲</span></div>' } },
    { id: 'path', zh: '层级树', en: 'Tree', desc: '按工厂、产线、设备组织数据，对应 UNS 的数据结构。', tokens: ['foreground', 'accent', 'highlight'],
      variants: { 默认: '<div class="console" style="width:280px"><ul class="tree"><li><i></i>Factory-A</li><li class="l1"><i></i>Line-01</li><li class="l2 on"><i></i>CNC-03</li><li class="l3"><i></i>Metrics</li></ul></div>' } },
    { id: 'readout', zh: '读数', en: 'Readout', desc: '实时数值：标签、数字、单位。', tokens: ['foreground', 'muted-foreground'],
      variants: { 默认: '<div class="panel" style="width:240px"><div class="panel-h"><span>主轴温度</span><span class="muted">实时</span></div><div class="readout" style="border:0"><div class="v">72.4<small>°C</small></div><div class="bar"><span></span></div></div></div>' } },
    { id: 'focus-frame', zh: '四角框', en: 'Corner frame', desc: '标记当前焦点或选中项。', tokens: ['highlight-deep'],
      variants: { 默认: '<div class="corner">Line-01 · 已选中</div>' } },
    { id: 'ai-message', zh: 'AI 消息', en: 'AI message', desc: 'Agent 的回答，和用户的提问区分开。', tokens: ['muted', 'card', 'highlight-ink'],
      variants: { 默认: '<div class="ai"><div class="q">Line-01 过去 24 小时为什么停机？</div><div class="a"><small><i class="sig"></i>UNS Agent</small><span>CNC-03 冷却压力下降 18%，触发了 3 次保护停机。</span></div></div>' } },
  ];
  const SKILLS = [
    { id: 'tier0-ui', zh: 'UI 界面', desc: '按设计系统生成产品界面和页面。', reads: '颜色 · 产品字阶 · 组件', typo: 'product' },
    { id: 'tier0-web', zh: '官网', desc: '生成官网页面与区块。', reads: '颜色 · 官网字阶', typo: 'web' },
    { id: 'tier0-slides', zh: 'Slides', desc: '生成符合品牌的演示文稿。', reads: '颜色 · 官网字阶 · 模版', typo: 'web' },
    { id: 'tier0-marketing', zh: '宣传物料', desc: '生成社媒图、海报等宣传物料。', reads: '颜色 · 品牌素材', typo: 'web' },
  ];
  const NAV = [
    { zh: '开始', en: 'Start', items: [['home', '概览', 'Overview'], ['foundation', 'Foundation', 'Foundation']] },
    { zh: '基础', en: 'Foundations', items: [['color', '颜色', 'Color'], ['typography', '字体', 'Typography'], ['spacing', '间距与圆角', 'Spacing', 1], ['motion', '动效', 'Motion', 1]] },
    { zh: '组件', en: 'Components', items: COMPONENTS.map(c => ['c-' + c.id, c.zh, c.en]).concat([['theme-lab', '主题调试', 'Theme lab']]) },
    { zh: '品牌', en: 'Brand', items: [['logo', 'Logo', 'Logo'], ['templates', '模版', 'Templates', 1]] },
    { zh: 'Agent', en: 'Agent', items: [['skills', 'Skills', 'Skills'], ['designmd', 'DESIGN.md', 'DESIGN.md', 1]] },
  ];
  const I18N = { tbd: { zh: '待定', en: 'TBD' }, copy: { zh: '复制', en: 'Copy' }, copied: { zh: '已复制', en: 'Copied' } };

  // ---------- data ----------
  const D = { base: null, light: null, dark: null, typo: null, md: '', root: '' };
  async function tryFetch(path, type) {
    for (const prefix of ['./', '../']) {
      try {
        const r = await fetch(prefix + path, { cache: 'no-cache' });
        if (!r.ok) continue;
        const body = await r.text();
        if (body.trim().startsWith('<')) continue;
        const data = type === 'text' ? body : JSON.parse(body);
        if (!D.root) D.root = prefix;
        return data;
      } catch (e) { /* next */ }
    }
    return null;
  }
  async function load() {
    const r = await Promise.all([
      tryFetch('01-tokens/color/base.json'), tryFetch('01-tokens/color/light.json'), tryFetch('01-tokens/color/dark.json'),
      tryFetch('01-tokens/typography.json'), tryFetch('00-foundation/foundation.md', 'text')]);
    Object.assign(D, { base: r[0], light: r[1], dark: r[2], typo: r[3], md: r[4] || '' });
  }
  const asset = p => (D.root || '../') + p;
  const entries = o => Object.entries(o || {}).filter(([k]) => k[0] !== '$');
  function walk(root, ref) { let n = root; for (const k of ref.replace(/[{}]/g, '').split('.')) { if (!n) return null; n = n[k]; } return n; }
  function colorOf(ref) { if (!ref) return null; if (ref[0] !== '{') return ref; const n = walk(D.base, ref); return n ? colorOf(n.$value) : null; }
  const refName = ref => (ref || '').replace(/[{}]/g, '').split('.').slice(2).join('-');
  function typoResolve(v) {
    if (typeof v === 'string' && v[0] === '{') { const n = walk(D.typo, v); return n ? typoResolve(n.$value !== undefined ? n.$value : n) : null; }
    if (v && typeof v === 'object' && !Array.isArray(v)) { const o = {}; for (const [k, x] of Object.entries(v)) o[k] = typoResolve(x); return o; }
    return v;
  }
  const ext = o => (o && o.$extensions && o.$extensions.tier0) || {};
  const CORE = ['surface', 'brand', 'status'];
  function varsFor(theme) { const o = {}; if (theme) for (const g of CORE) for (const [k, v] of entries(theme.color[g])) o[k] = colorOf(v.$value); return o; }
  function applyTokens() {
    if (!D.light) return;
    const b = o => Object.entries(o).map(([k, v]) => `--${k}:${v};`).join('');
    const l = varsFor(D.light), d = varsFor(D.dark);
    let css = `:root{${b(l)}}@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){${b(d)}color-scheme:dark}}:root[data-theme="dark"]{${b(d)}color-scheme:dark}`;
    const fam = D.typo && D.typo.font.family;
    if (fam) css += `:root{${['display', 'sans', 'mono', 'logo'].map(k => fam[k] ? `--font-${k}:${fam[k].$value.map(f => /\s/.test(f) ? `"${f}"` : f).join(', ')};` : '').join('')}}`;
    let el = document.getElementById('tok'); if (!el) { el = document.createElement('style'); el.id = 'tok'; document.head.appendChild(el); }
    el.textContent = css;
  }

  // ---------- utils ----------
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const store = { get(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } } };
  let lang = store.get('t0-lang', 'zh');
  const tr = k => (I18N[k] || {})[lang] || k;
  function toast(msg) { const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 1500); }
  async function copy(text) {
    try { await navigator.clipboard.writeText(text); toast(tr('copied')); }
    catch (e) { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); toast(tr('copied')); } catch (e2) { toast(text); } ta.remove(); }
  }
  function lum(hex) { const m = /^#?([0-9a-f]{6})$/i.exec(hex || ''); if (!m) return 0; const n = parseInt(m[1], 16); const c = [n >> 16 & 255, n >> 8 & 255, n & 255].map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; }
  const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
  const ink = hex => lum(hex) > .35 ? '#050B14' : '#FFFFFF';
  const md = s => window.marked ? window.marked.parse(s) : `<pre>${esc(s)}</pre>`;
  function mdSection(heading) {
    const L = D.md.split('\n'), lvl = heading.match(/^#+/)[0].length, i = L.findIndex(l => l.trim().startsWith(heading)); if (i < 0) return '';
    const out = []; for (let j = i + 1; j < L.length; j++) { const m = L[j].match(/^(#+)\s/); if ((m && m[1].length <= lvl) || /^---\s*$/.test(L[j])) break; out.push(L[j]); }
    return out.join('\n').trim();
  }
  const mdRows = s => s.split('\n').filter(l => l.trim().startsWith('|') && !/^\|\s*-/.test(l.trim())).slice(1).map(r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim()));
  const plain = s => s.replace(/\*\*|`/g, '');
  const codeBlock = (code) => `<div class="code"><pre><code>${esc(code)}</code></pre><button class="icon-btn copy" data-copy="${esc(code)}" title="${tr('copy')}">${ICON.copy}</button></div>`;
  const fold = (title, body, open) => `<details class="fold"${open ? ' open' : ''}><summary>${title}</summary><div class="fold-body">${body}</div></details>`;
  const kv = rows => `<dl class="kv">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
  const seg = (id, opts, cur) => `<div class="seg" data-seg="${id}">${opts.map(([v, l]) => `<button type="button" data-v="${v}" aria-pressed="${v === cur}">${l}</button>`).join('')}</div>`;
  const ICON = {
    copy: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="5" y="5" width="9" height="9" rx="1"/><path d="M11 5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2"/></svg>',
    github: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
    sun: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="3"/><path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3 3l1 1M12 12l1 1M3 13l1-1M12 4l1-1"/></svg>',
    moon: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7z"/></svg>',
    auto: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6"/><path d="M8 2v12" /><path d="M8 2a6 6 0 0 1 0 12z" fill="currentColor"/></svg>',
    menu: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 4h12M2 8h12M2 12h12"/></svg>',
  };

  // ---------- shell ----------
  const MODES = ['system', 'light', 'dark'];
  function setMode(m) {
    if (m === 'system') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', m);
    store.set('t0-theme', m);
    const b = document.getElementById('theme-btn'); b.innerHTML = m === 'dark' ? ICON.moon : m === 'light' ? ICON.sun : ICON.auto;
    b.title = { system: '主题：跟随系统', light: '主题：浅色', dark: '主题：深色' }[m];
  }
  function renderSidebar() {
    document.getElementById('sidebar').innerHTML = NAV.map(g => `<h6>${g[lang]}</h6>` + g.items.map(([id, zh, en, tbd]) =>
      `<a href="#${id}" data-r="${id}">${esc(lang === 'zh' ? zh : en)}${tbd ? `<span class="tbd">${tr('tbd')}</span>` : ''}</a>`).join('')).join('');
    document.getElementById('lang-btn').textContent = lang === 'zh' ? 'EN' : '中';
  }
  function renderShell() {
    document.querySelectorAll('.brandmark img').forEach(i => { i.src = asset(i.dataset.src); });
    document.getElementById('gh-btn').innerHTML = ICON.github;
    document.getElementById('menu-btn').innerHTML = ICON.menu;
    document.getElementById('menu-btn').addEventListener('click', () => document.getElementById('sidebar').classList.toggle('open'));
    document.getElementById('theme-btn').addEventListener('click', () => setMode(MODES[(MODES.indexOf(store.get('t0-theme', 'system')) + 1) % 3]));
    document.getElementById('lang-btn').addEventListener('click', () => { lang = lang === 'zh' ? 'en' : 'zh'; store.set('t0-lang', lang); document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'; renderSidebar(); route(); });
    setMode(store.get('t0-theme', 'system'));
    renderSidebar();
  }

  // ---------- page frame ----------
  // view returns { canvas, bar, canvasClass, bodyClass, dock, inspector, wide, prose }
  function frame(v) {
    if (v.prose) return `<div class="page"><div class="stage-col">${v.prose}</div><aside class="inspector">${v.inspector || ''}</aside></div>`;
    return `<div class="page${v.wide ? ' wide' : ''}"><div class="stage-col">
      <section class="canvas ${v.canvasClass || ''}" id="canvas">${v.bar ? `<div class="canvas-bar">${v.bar}</div>` : ''}<div class="canvas-body ${v.bodyClass || ''}" id="cbody">${v.canvas}</div></section>
      ${v.dock || ''}</div>${v.wide ? '' : `<aside class="inspector" id="insp">${v.inspector || ''}</aside>`}</div>`;
  }
  const head = (crumb, title, desc) => `<div><div class="crumb">${crumb.map(c => `<span>${esc(c)}</span>`).join('')}</div><h1 style="margin-top:8px">${esc(title)}</h1>${desc ? `<p class="desc">${desc}</p>` : ''}</div>`;

  // ---------- home ----------
  function vHome() {
    const what = mdSection('### Tier0 是什么').split('\n').filter(l => l.trim() && !l.startsWith('>'))[0] || '';
    const traits = mdRows(mdSection('### 特征'));
    const principles = [...mdSection('## 2. 设计原则').matchAll(/\*\*(.+?)\*\*\n(.+)/g)];
    return {
      canvasClass: 'dots',
      canvas: `<div class="hero"><h1>Connect once,<br><em>Reuse everywhere.</em></h1>
        <div class="console"><div class="console-head"><span>Factory-A / Line-01</span><span class="live"><i class="sig"></i>运行中</span></div>
          <ul class="tree"><li><i></i>Factory-A</li><li class="l1"><i></i>Line-01</li><li class="l2 on"><i></i>CNC-03<span>实时</span></li><li class="l3"><i></i>Metrics</li><li class="l3"><i></i>State</li><li class="l3"><i></i>Action</li></ul>
          <div class="readout"><div class="muted" style="font-size:12px;display:flex;justify-content:space-between"><span>主轴温度</span><span id="ro-l">68%</span></div><div class="v"><span id="ro-t">72.4</span><small>°C</small></div><div class="bar"><span id="ro-b"></span></div></div></div></div>`,
      inspector: head(['Tier0'], '设计系统', esc(plain(what)))
        + fold('品牌特征', traits.map(t => `<div class="trait"><b>${esc(plain(t[0]))}</b><span>${esc(plain(t[1]).split('。')[0])}。</span></div>`).join(''), true)
        + fold('设计原则', principles.map(m => `<div class="trait"><b>${esc(m[1])}</b><span>${esc(m[2])}</span></div>`).join('')),
    };
  }
  function initHome() {
    const t = document.getElementById('ro-t'), b = document.getElementById('ro-b'), l = document.getElementById('ro-l');
    if (!t || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearInterval(initHome.i);
    initHome.i = setInterval(() => { if (!document.body.contains(t)) return clearInterval(initHome.i); t.textContent = (71.8 + Math.random() * 1.4).toFixed(1); const x = Math.round(62 + Math.random() * 12); b.style.width = x + '%'; l.textContent = x + '%'; }, 1600);
  }

  // ---------- foundation ----------
  function vFoundation() {
    const heads = [...D.md.matchAll(/^(##|###) (.+)$/gm)].map(m => ({ lvl: m[1].length, t: m[2] }));
    const slug = s => 'f-' + s.replace(/[^\w一-龥]+/g, '-');
    let html = D.md ? md(D.md) : '<p class="muted">没有读取到 foundation.md。</p>';
    html = html.replace(/<(h[23])>(.+?)<\/h[23]>/g, (m, tag, t) => `<${tag} id="${slug(t.replace(/<[^>]+>/g, ''))}">${t}</${tag}>`);
    return { prose: `<article class="prose">${html}</article>`, inspector: `<div class="crumb"><span>00-foundation</span><span>foundation.md</span></div><nav class="toc">${heads.map(h => `<a class="l${h.lvl}" href="#foundation" data-jump="${slug(h.t)}">${esc(h.t)}</a>`).join('')}</nav>` };
  }

  // ---------- color ----------
  const colorState = { tab: 'brand', sel: null };
  function colorItems() {
    const c = D.base.color;
    return {
      brand: entries(c.brand).map(([k, v]) => ({ key: k, name: ext(v).displayName || k, hex: colorOf(v.$value), desc: v.$description, token: `color.brand.${k}`, fe: '--tier0-v-' + refName(v.$value) })),
      scale: entries(c.scale).map(([g, o]) => o.$value ? [[g, [{ key: g, name: g, hex: colorOf(o.$value), desc: o.$description, token: `color.scale.${g}`, fe: '--tier0-v-' + g }]]] : [[g, entries(o).map(([s, v]) => ({ key: `${g}-${s}`, name: `${g}-${s}`, hex: colorOf(v.$value), desc: v.$description, token: `color.scale.${g}.${s}`, fe: `--tier0-v-${g}-${s}` }))]]).flat(),
      aux: entries(c.auxiliary).map(([g, o]) => [g, entries(o).map(([s, v]) => ({ key: `${g}-${s}`, name: `${g}-${s}`, hex: colorOf(v.$value), desc: o.$description, token: `color.auxiliary.${g}.${s}` }))]),
      sem: CORE.map(g => [D.light.color[g].$description.split('。')[0], entries(D.light.color[g]).map(([k, v]) => ({ key: 'sem-' + k, name: '--' + k, hex: colorOf(v.$value), dark: colorOf(D.dark.color[g][k].$value), desc: v.$description, token: k, sem: true }))]),
    };
  }
  function vColor() {
    if (!D.base) return { canvas: '<p class="muted">没有读取到颜色 token。</p>', inspector: '' };
    const it = colorItems(); const tab = colorState.tab;
    const all = [...it.brand, ...it.scale.flatMap(x => x[1]), ...it.aux.flatMap(x => x[1]), ...it.sem.flatMap(x => x[1])];
    if (!colorState.sel || !all.find(x => x.key === colorState.sel)) colorState.sel = it.brand[0].key;
    const sel = all.find(x => x.key === colorState.sel);
    const pressed = k => `aria-pressed="${k === colorState.sel}"`;
    const ramps = rows => `<div class="ramps">${rows.map(([g, list]) => `<div class="ramp-line"><span>${g}</span><div class="ramp">${list.map(x => `<button data-col="${x.key}" ${pressed(x.key)} style="background:${x.hex}" title="${x.name} ${x.hex}"></button>`).join('')}</div></div>`).join('')}</div>`;
    let canvas = '';
    if (tab === 'brand') canvas = `<div class="sw-grid">${it.brand.map(x => `<button class="sw" data-col="${x.key}" ${pressed(x.key)}><div class="chip" style="background:${x.hex}"></div><b>${esc(x.name)}</b><span>${x.hex}</span></button>`).join('')}</div>`;
    if (tab === 'scale') canvas = ramps(it.scale);
    if (tab === 'aux') canvas = ramps(it.aux);
    if (tab === 'sem') canvas = `<div class="sem">${it.sem.map(([t, list]) => `<div><h3>${esc(t)}</h3><div class="sem-row">${list.map(x => `<button data-col="${x.key}" ${pressed(x.key)}><div class="pair"><i style="background:${x.hex}"></i><i style="background:${x.dark}"></i></div><span>${x.name}</span></button>`).join('')}</div></div>`).join('')}</div>`;
    const rules = ext(D.light.color).rules || [];
    const rows = [['HEX', sel.hex], ['Token', `<code>${sel.token}</code>`]];
    if (sel.fe) rows.push(['前端变量', `<code>${sel.fe}</code>`]);
    if (sel.sem) rows.push(['深色', sel.dark]);
    rows.push(['白底对比度', contrast(sel.hex, '#FFFFFF').toFixed(2) + ':1'], ['近黑底对比度', contrast(sel.hex, '#050B14').toFixed(2) + ':1']);
    return {
      bar: seg('ctab', [['brand', '品牌色'], ['scale', '色阶'], ['aux', '辅助色'], ['sem', '用途']], tab),
      bodyClass: 'top', canvas,
      inspector: head(['颜色'], sel.name, esc((sel.desc || '').split('——')[0]))
        + `<div class="big-chip" style="background:${sel.hex};color:${ink(sel.hex)}">${sel.hex}</div>`
        + `<div class="row" style="justify-content:flex-start"><button class="btn btn-outline btn-sm" data-copy="${sel.hex}">${ICON.copy}复制 HEX</button><button class="btn btn-ghost btn-sm" data-copy="var(--${sel.sem ? sel.token : (sel.fe || '').replace('--', '')})">复制变量</button></div>`
        + kv(rows)
        + fold('使用规则', `<ol class="rules">${rules.map(r => `<li>${esc(r)}</li>`).join('')}</ol>`),
    };
  }

  // ---------- typography ----------
  const tyState = { set: 'product', sel: 'typo-h1', text: '一次接入，处处复用 Connect once' };
  function vTypo() {
    if (!D.typo) return { canvas: '<p class="muted">没有读取到字体 token。</p>', inspector: '' };
    const group = D.typo.typography[tyState.set];
    if (!group[tyState.sel]) tyState.sel = 'typo-h1';
    const style = (v) => {
      const src = typeof v.$value === 'string' ? walk(D.typo, v.$value) : v;
      const t = typoResolve(src.$value); const fk = String(src.$value.fontFamily).replace(/[{}]/g, '').split('.').pop();
      const tt = ext(v).textTransform || ext(src).textTransform || '';
      return { t, fk, tt, src, css: `font-family:var(--font-${fk});font-size:${t.fontSize};line-height:${t.lineHeight};font-weight:${t.fontWeight};letter-spacing:${t.letterSpacing || 0};${tt ? 'text-transform:' + tt + ';' : ''}` };
    };
    const rows = entries(group).map(([k, v]) => { const s = style(v); return `<div class="ty-row" data-ty="${k}" aria-pressed="${k === tyState.sel}"><span>${k}</span><div style="${s.css}">${esc(tyState.text)}</div></div>`; }).join('');
    const sv = group[tyState.sel], s = style(sv), fe = ext(s.src).frontend || {};
    const famName = D.typo.font.family[s.fk].$value[0];
    const css = `.${tyState.sel} {\n  font-family: var(--font-${s.fk});\n  font-size: ${s.t.fontSize};\n  line-height: ${s.t.lineHeight};\n  font-weight: ${s.t.fontWeight};\n  letter-spacing: ${s.t.letterSpacing || 0};${s.tt ? `\n  text-transform: ${s.tt};` : ''}\n}`;
    const famList = entries(D.typo.font.family).map(([k, v]) => `<div class="trait"><b style="font-family:var(--font-${k === 'sc' ? 'sans' : k})">${esc(v.$value[0])}</b><span>${esc((v.$description || '').split('——')[0])}</span></div>`).join('');
    return {
      bar: seg('tyset', [['product', '产品字阶'], ['web', '官网字阶']], tyState.set) + `<span class="spacer"></span><input class="input" id="ty-text" style="max-width:320px;height:30px" value="${esc(tyState.text)}" aria-label="预览文字">`,
      bodyClass: 'top', canvas: `<div class="ty-list">${rows}</div>`,
      inspector: head(['字体', tyState.set === 'product' ? '产品字阶' : '官网字阶'], tyState.sel, esc((sv.$description || '').split('——')[0]))
        + `<div class="fam-sample" style="${s.css}">Aa 字</div>`
        + kv([['字体', famName], ['字号 / 行高', `${parseInt(s.t.fontSize)} / ${parseInt(s.t.lineHeight)}`], ['字重', s.t.fontWeight], ['字距', s.t.letterSpacing || '0'], ...(fe.tailwind ? [['前端', `<code>${esc(fe.tailwind)}</code>`]] : [])])
        + fold('CSS', codeBlock(css))
        + fold('字体家族', famList)
        + fold('使用规则', `<ol class="rules">${(ext(D.typo.typography).rules || []).map(r => `<li>${esc(r)}</li>`).join('')}</ol>`),
    };
  }

  // ---------- components ----------
  const compState = { theme: 'light', variant: {}, dock: 'html', open: false };
  function vComp(id) {
    const c = COMPONENTS.find(x => x.id === id); if (!c) return vSoon(id);
    const vs = Object.keys(c.variants); const cur = compState.variant[id] && c.variants[compState.variant[id]] ? compState.variant[id] : vs[0];
    const html = c.variants[cur];
    const pretty = html.replace(/></g, '>\n<');
    return {
      bar: (vs.length > 1 ? seg('variant', vs.map(v => [v, v]), cur) : '') + '<span class="spacer"></span>' + seg('ctheme', [['light', '浅色'], ['dark', '深色']], compState.theme),
      canvasClass: compState.theme === 'dark' ? 'theme-dark dots' : 'dots', canvas: html,
      dock: `<div class="dock${compState.open ? '' : ' closed'}" id="dock"><div class="dock-tabs"><button data-dock="html" aria-selected="${compState.dock === 'html'}">HTML</button><button data-dock="tokens" aria-selected="${compState.dock === 'tokens'}">Token</button><span class="spacer"></span><button class="icon-btn" data-copy="${esc(compState.dock === 'html' ? pretty : c.tokens.map(t => 'var(--' + t + ')').join('\n'))}" title="${tr('copy')}">${ICON.copy}</button><button data-dock-toggle>${compState.open ? '收起' : '展开代码'}</button></div><pre><code>${esc(compState.dock === 'html' ? pretty : c.tokens.map(t => 'var(--' + t + ')').join('\n'))}</code></pre></div>`,
      inspector: head(['组件'], c.zh, esc(c.desc))
        + kv([['状态', '<span class="muted">用法待编写</span>'], ['变体', vs.length], ['使用的 token', c.tokens.map(t => `<code>${t}</code>`).join(' ')]])
        + fold('用法说明', '<p>按 6 项模板手写：是什么、什么时候用、什么时候不用、变体、状态、必须 / 禁止。</p>')
        + fold('源文件', `<div class="cmd"><code>02-components/${c.id}/README.md</code><button class="icon-btn" data-copy="02-components/${c.id}/README.md">${ICON.copy}</button></div>`),
    };
  }

  // ---------- theme lab ----------
  const lab = { hl: null, pr: null, r: 4, t: 'light' };
  function vLab() {
    const L = varsFor(D.light); lab.hl = lab.hl || L.highlight; lab.pr = lab.pr || L.primary;
    const demo = `<div style="display:grid;gap:20px;justify-items:center;width:100%">
      <div class="row">${COMPONENTS[0].variants['主要']}${COMPONENTS[0].variants['高亮']}${COMPONENTS[0].variants['描边']}</div>
      <div class="row">${COMPONENTS[3].variants['默认']}${COMPONENTS[4].variants['默认']}</div>
      <div class="row" style="align-items:flex-start">${COMPONENTS[6].variants['默认']}${COMPONENTS[11].variants['默认']}</div>
      <div class="row" style="align-items:flex-start">${COMPONENTS[8].variants['默认']}${COMPONENTS[13].variants['默认']}</div></div>`;
    return {
      bar: '<span class="spacer"></span>' + seg('labtheme', [['light', '浅色'], ['dark', '深色']], lab.t),
      canvasClass: lab.t === 'dark' ? 'theme-dark' : '', canvas: demo,
      inspector: head(['组件'], '主题调试', '调整只在本页生效，不会修改 token。')
        + `<div class="field"><label for="lab-hl">品牌绿</label><div class="color-field"><input type="color" id="lab-hl" value="${lab.hl}"><input class="input" id="lab-hl-t" value="${lab.hl}"></div></div>`
        + `<div class="field"><label for="lab-pr">主色</label><div class="color-field"><input type="color" id="lab-pr" value="${lab.pr}"><input class="input" id="lab-pr-t" value="${lab.pr}"></div></div>`
        + `<div class="field"><label for="lab-r">圆角 <span id="lab-rv">${lab.r}px</span></label><input type="range" id="lab-r" min="0" max="12" value="${lab.r}"></div>`
        + `<div><div class="crumb" style="margin-bottom:8px"><span>对比度</span></div><div class="contrast" id="lab-ct"></div></div>`
        + `<div class="row" style="justify-content:flex-start"><button class="btn btn-outline btn-sm" id="lab-reset">恢复默认</button><button class="btn btn-primary btn-sm" id="lab-copy">复制变量</button></div>`,
    };
  }
  function initLab() {
    const cv = document.getElementById('canvas'); if (!cv || !document.getElementById('lab-hl')) return;
    const $ = id => document.getElementById(id);
    function paint() {
      cv.style.setProperty('--highlight', lab.hl); cv.style.setProperty('--radius', lab.r + 'px');
      if (lab.t === 'light') cv.style.setProperty('--primary', lab.pr); else cv.style.removeProperty('--primary');
      $('lab-rv').textContent = lab.r + 'px';
      const st = getComputedStyle(cv), g = n => st.getPropertyValue('--' + n).trim();
      const rows = [['品牌绿上的文字', g('highlight-foreground'), lab.hl, 4.5], ['主按钮文字', g('primary-foreground'), g('primary'), 4.5], ['正文', g('foreground'), g('background'), 4.5], ['次要文字', g('muted-foreground'), g('background'), 4.5]];
      $('lab-ct').innerHTML = rows.map(([n, a, b, m]) => { const c = contrast(a, b); return `<div><span>${n}</span><span class="${c >= m ? 'pass' : 'fail'} num">${c.toFixed(2)}:1</span></div>`; }).join('');
    }
    const hex = s => /^#?[0-9a-f]{6}$/i.test(s.trim()) ? '#' + s.trim().replace('#', '').toUpperCase() : null;
    $('lab-hl').oninput = e => { lab.hl = e.target.value.toUpperCase(); $('lab-hl-t').value = lab.hl; paint(); };
    $('lab-pr').oninput = e => { lab.pr = e.target.value.toUpperCase(); $('lab-pr-t').value = lab.pr; paint(); };
    $('lab-hl-t').onchange = e => { const x = hex(e.target.value); if (x) { lab.hl = x; $('lab-hl').value = x; paint(); } };
    $('lab-pr-t').onchange = e => { const x = hex(e.target.value); if (x) { lab.pr = x; $('lab-pr').value = x; paint(); } };
    $('lab-r').oninput = e => { lab.r = +e.target.value; paint(); };
    $('lab-reset').onclick = () => { lab.hl = lab.pr = null; lab.r = 4; route(); };
    $('lab-copy').onclick = () => copy(`--highlight: ${lab.hl};\n--primary: ${lab.pr};\n--radius: ${lab.r}px;`);
    paint();
  }

  // ---------- logo ----------
  const LOGOS = [['tier0-logo-black.svg', '标准版', '#FFFFFF'], ['tier0-logo-black.svg', '浅灰底', '#FAFAFA'], ['tier0-logo-white.svg', '反白版', '#050B14'], ['tier0-logo-lime.svg', '品牌绿版', '#050B14']];
  let logoSel = 0;
  function vLogo() {
    const [f, n, bg] = LOGOS[logoSel];
    return {
      canvas: `<div class="logo-stage" style="background:${bg}"><img alt="Tier0 ${n}" src="${asset('03-brand/logo/assets/' + f)}"></div>`, bodyClass: 'top" style="padding:0',
      inspector: head(['品牌'], 'Logo', '字标使用 Tektur，交付时为路径。')
        + `<div class="opt">${LOGOS.map(([ff, nn, bb], i) => `<button data-logo="${i}" aria-pressed="${i === logoSel}"><i style="background:${bb}"></i>${nn}<span class="muted" style="margin-left:auto;font-size:12px">${ff.replace('tier0-logo-', '').replace('.svg', '')}</span></button>`).join('')}</div>`
        + kv([['文件', `<code>${f}</code>`], ['底色', bg]])
        + `<a class="btn btn-outline btn-sm" style="justify-self:start" href="${asset('03-brand/logo/assets/' + f)}" target="_blank" rel="noopener">打开 SVG ↗</a>`
        + fold('使用规范', '<p>最小尺寸、安全距离与错误用法待编写，写在 03-brand/logo/README.md。</p>'),
    };
  }

  // ---------- skills ----------
  const skState = { id: 'tier0-ui', brief: '做一页展示 Line-01 实时状态的看板' };
  function skPrompt() {
    const s = SKILLS.find(x => x.id === skState.id);
    return `/${s.id}\n\n需求：${skState.brief}\n\n要求：\n- 先读取 00-foundation/foundation.md 与 01-tokens/README.md\n- 颜色只用 color/light.json、color/dark.json 主层 token\n- 字体使用 typography.${s.typo}\n- 主操作用近黑；品牌绿用于信号、实时数据、选中和重点区块\n- 完成后对照 Foundation 的 Anti 表自查`;
  }
  function vSkills() {
    const s = SKILLS.find(x => x.id === skState.id);
    return {
      bar: seg('skill', SKILLS.map(x => [x.id, x.zh]), skState.id),
      canvas: `<div style="width:100%;max-width:640px;display:grid;gap:12px"><div class="field"><label for="sk-brief">需求</label><input class="input" id="sk-brief" value="${esc(skState.brief)}"></div><div id="sk-out">${codeBlock(skPrompt())}</div></div>`,
      inspector: head(['Agent', 'Skills'], s.id, esc(s.desc))
        + kv([['出口', s.zh], ['读取', s.reads], ['状态', '<span class="muted">待编写</span>']])
        + `<div class="cmd"><code>/${s.id}</code><button class="icon-btn" data-copy="/${s.id}">${ICON.copy}</button></div>`
        + fold('文件结构', codeBlock(`04-skills/${s.id}/\n├── SKILL.md\n├── references/\n├── assets/\n├── examples/\n└── gotchas.md`)),
    };
  }

  function vSoon(id) {
    const item = NAV.flatMap(g => g.items).find(i => i[0] === id);
    return { canvas: `<p class="muted">${tr('tbd')}</p>`, inspector: head([], item ? item[1] : id, '这一部分还在梳理中，确定后会出现在这里。') };
  }

  // ---------- router ----------
  const VIEWS = { home: vHome, foundation: vFoundation, color: vColor, typography: vTypo, 'theme-lab': vLab, logo: vLogo, skills: vSkills };
  let current = 'home';
  function route(keepScroll) {
    let id = (location.hash || '#home').slice(1).replace(/[^a-z0-9-]/gi, '') || 'home';
    current = id;
    const v = id.startsWith('c-') ? vComp(id.slice(2)) : (VIEWS[id] || (() => vSoon(id)))();
    document.getElementById('main').innerHTML = frame(v);
    document.querySelectorAll('[data-r]').forEach(a => { if (a.dataset.r === id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    document.getElementById('sidebar').classList.remove('open');
    const item = NAV.flatMap(g => g.items).find(i => i[0] === id);
    document.title = id === 'home' ? 'Tier0 Design System' : `${item ? item[1] : id} · Tier0`;
    if (id === 'home') initHome();
    if (id === 'theme-lab') initLab();
    if (!keepScroll) window.scrollTo(0, 0);
  }
  const rerender = () => route(true);

  document.addEventListener('click', e => {
    const t = e.target;
    const cp = t.closest('[data-copy]'); if (cp) { e.preventDefault(); copy(cp.dataset.copy); return; }
    const sg = t.closest('[data-seg] button'); if (sg) {
      const k = sg.parentElement.dataset.seg, v = sg.dataset.v;
      if (k === 'ctab') colorState.tab = v; if (k === 'tyset') tyState.set = v; if (k === 'ctheme') compState.theme = v;
      if (k === 'variant') compState.variant[current.slice(2)] = v; if (k === 'labtheme') lab.t = v; if (k === 'skill') skState.id = v;
      return rerender();
    }
    const col = t.closest('[data-col]'); if (col) { colorState.sel = col.dataset.col; return rerender(); }
    const ty = t.closest('[data-ty]'); if (ty) { tyState.sel = ty.dataset.ty; return rerender(); }
    const lg = t.closest('[data-logo]'); if (lg) { logoSel = +lg.dataset.logo; return rerender(); }
    const dk = t.closest('[data-dock]'); if (dk) { compState.dock = dk.dataset.dock; compState.open = true; return rerender(); }
    if (t.closest('[data-dock-toggle]')) { compState.open = !compState.open; return rerender(); }
    const jp = t.closest('[data-jump]'); if (jp) { e.preventDefault(); const el = document.getElementById(jp.dataset.jump); if (el) el.scrollIntoView({ behavior: 'smooth' }); }
  });
  document.addEventListener('input', e => {
    if (e.target.id === 'ty-text') { tyState.text = e.target.value; document.querySelectorAll('.ty-row > div').forEach(d => { d.textContent = tyState.text; }); }
    if (e.target.id === 'sk-brief') { skState.brief = e.target.value; document.getElementById('sk-out').innerHTML = codeBlock(skPrompt()); }
  });
  window.addEventListener('hashchange', () => route());

  (async function start() {
    renderShell();
    document.getElementById('main').innerHTML = '<div class="loading"><i class="sig"></i>读取中</div>';
    await load(); applyTokens(); route();
  })();
})();
