/* Tier0 Design System portal.
   Reads 00-foundation/foundation.md and 01-tokens/*.json at runtime.
   Layout: sidebar · single scrolling document. Components mirror Tier0-Frontend packages/ui. */
(function () {
  'use strict';

  const FE = 'Tier0-Frontend/packages/ui/components/';
  const I = {
    copy: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="5" y="5" width="9" height="9" rx="1"/><path d="M11 5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2"/></svg>',
    github: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
    sun: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="3"/><path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3 3l1 1M12 12l1 1M3 13l1-1M12 4l1-1"/></svg>',
    moon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7z"/></svg>',
    auto: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6"/><path d="M8 2a6 6 0 0 1 0 12z" fill="currentColor"/></svg>',
    menu: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 4h12M2 8h12M2 12h12"/></svg>',
    plus: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 3v10M3 8h10"/></svg>',
    arrow: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>',
    info: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.5"/><path d="M8 7v4M8 5v.01"/></svg>',
    alert: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.5"/><path d="M8 4.5v4M8 11v.01"/></svg>',
    open: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2" y="2.5" width="12" height="11" rx="1.5"/><path d="M2 5.5h12"/></svg>',
    download: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 2.5v8M4.5 7L8 10.5 11.5 7M3 13.5h10"/></svg>',
    replay: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.5 8a5.5 5.5 0 1 0 1.6-3.9M2.5 2.5v2.6h2.6"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  };

  // ---------- components: mirror Tier0-Frontend packages/ui ----------
  const COMPONENTS = [
    { id: 'button', zh: '按钮', en: 'Button', src: 'ui/button.tsx', guide: 'button',
      desc: '用于触发一个操作。一个视图只放一个 primary（黑底）作为主操作；品牌绿 default 只给需要强调的工作流操作。尺寸 sm 32（默认）、md 36、lg 40。跳转到别的页面用链接，不用按钮。',
      code: `import { Button } from '@tier0/ui/components/ui/button';\n\n<Button>运行 Agent</Button>\n<Button variant="primary" size="md">保存</Button>\n<Button variant="outline">取消</Button>\n<Button loading>运行中</Button>` },
    { id: 'input', zh: '输入框', en: 'Input', src: 'ui/input.tsx · ui/textarea.tsx', guide: 'form',
      desc: '用于输入一行文字。聚焦时出现品牌绿外圈；校验失败时边框变红，并在下方说明怎么改。',
      code: `import { Input } from '@tier0/ui/components/ui/input';\n\n<Input placeholder="例如 PLC-S7-01" />\n<Input aria-invalid icon={<SearchIcon />} />` },
    { id: 'select', zh: '选择器', en: 'Select', src: 'ui/select.tsx · cn-select.tsx', guide: 'form',
      desc: '用于从较多选项里选一个；只有 2 到 5 个选项时用单选或分段控件更直接。与输入框同一形制。',
      code: `import { CnSelect } from '@tier0/ui/components/cn-select';\n\n<CnSelect options={[{ label: 'OPC UA', value: 'opcua' }]} />` },
    { id: 'choice', zh: '复选 · 单选 · 开关', en: 'Checkbox · Radio · Switch', src: 'ui/checkbox.tsx · ui/radio-group.tsx · ui/switch.tsx', guide: 'form',
      desc: '复选用于多选；单选用于 2 到 5 个互斥选项；开关用于立即生效的开和关。选中态统一用 primary。',
      code: `<Checkbox defaultChecked />\n<RadioGroup defaultValue="device">…</RadioGroup>\n<Switch defaultChecked />` },
    { id: 'badge', zh: '徽标 · 状态标签', en: 'Badge · Status', src: 'ui/badge.tsx · ant-tag', guide: 'status',
      desc: '业务状态用 AntTag（默认无描边、4px 圆角）：待处理 default、进行中 blue、已完成 success、警告 warning、失败 error；文字已经表达状态，不再加圆点或图标。Badge 只用于计数。',
      code: `import { Badge } from '@tier0/ui/components/ui/badge';\n\n<Badge variant="secondary">OPC UA</Badge>` },
    { id: 'tabs', zh: '标签页', en: 'Tabs', src: 'ui/tabs.tsx · cn-tabs.tsx',
      desc: '用于在同一对象的几个视图之间切换；表示先后顺序的流程用步骤条，不用标签页。',
      code: `<Tabs defaultValue="metrics">\n  <TabsList>\n    <TabsTrigger value="metrics">指标</TabsTrigger>\n    <TabsTrigger value="state">状态</TabsTrigger>\n  </TabsList>\n</Tabs>` },
    { id: 'table', zh: '表格', en: 'Table', src: 'ui/table.tsx · cn-table.tsx · ant-table',
      desc: '用于需要比较、排序、筛选的结构化数据。行间细线，悬停浅灰；数字右对齐并用等宽数字。',
      code: `import { CnTable } from '@tier0/ui/components/cn-table';\n\n<CnTable columns={columns} dataSource={rows} rowKey="id" />` },
    { id: 'card', zh: '卡片 · 统计卡', en: 'Card · Stats', src: 'ui/card.tsx · com-stats-card.tsx', guide: 'card',
      desc: '用于把一组相关信息放在一起，如一台设备或一个指标。同组卡片之间用 group-item 间距；卡片里不再套卡片。',
      code: `import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@tier0/ui/components/ui/card';\nimport ComStatsCard from '@tier0/ui/components/com-stats-card';\n\n<Card>\n  <CardHeader><CardTitle>Line-01</CardTitle><CardDescription>3 台设备在线，1 台告警</CardDescription></CardHeader>\n  <CardFooter>…</CardFooter>\n</Card>\n\n<ComStatsCard label="今日接入数据点" value="128,406" />` },
    { id: 'alert', zh: '提示', en: 'Alert', src: 'ui/alert.tsx', guide: 'states',
      desc: '用于影响整个页面或区块、需要一直看到的提示，问题解决前不消失；一次性的操作结果用轻提示。',
      code: `<Alert variant="destructive">\n  <AlertTitle>连接失败</AlertTitle>\n  <AlertDescription>…</AlertDescription>\n</Alert>` },
    { id: 'feedback', zh: '进度 · 骨架 · 头像 · 气泡', en: 'Progress · Skeleton · Avatar · Tooltip', src: 'ui/progress.tsx · ui/skeleton.tsx · com-avatar.tsx · ui/tooltip.tsx', guide: 'states',
      desc: '进度条用于能预估的等待；骨架用于首次加载；工具提示只放补充说明，必须看到的信息不放进提示。',
      code: `<Progress value={68} />\n<Skeleton className="h-4 w-full" />\n<Tooltip><TooltipContent>复制数据路径</TooltipContent></Tooltip>` },
    { id: 'menu', zh: '下拉菜单', en: 'Dropdown menu', src: 'ui/dropdown-menu.tsx · cn-dropdown-menu.tsx', guide: 'overlay',
      desc: '用于收起次要操作和更多选项；危险操作放在最后，用红色文字。',
      code: `<DropdownMenu>\n  <DropdownMenuTrigger asChild><Button variant="ghost">…</Button></DropdownMenuTrigger>\n  <DropdownMenuContent>…</DropdownMenuContent>\n</DropdownMenu>` },
    { id: 'dialog', zh: '弹窗', en: 'Dialog', src: 'cn-dialog.tsx · com-confirm-dialog.tsx', guide: 'overlay',
      desc: '用于需要确认或集中填写、值得打断当前流程的任务；能就地完成的操作不用弹窗。危险操作的确认按钮用 destructive。',
      code: `import { ComConfirmDialog } from '@tier0/ui/components/com-confirm-dialog';\n\n<ComConfirmDialog title="断开数据源？" onSubmit={() => disconnect()} />` },
  ];

  const SKILLS = [
    { id: 'tier0-design', zh: '总入口', desc: '任何 Tier0 设计任务都从这里开始：取舍顺序、场景判断、分阶段工作、品牌图形和海报做法。', typo: 'product' },
    { id: 'tier0-ui', zh: 'UI 界面', desc: '按设计系统生成产品界面和页面。', typo: 'product' },
    { id: 'tier0-web', zh: '官网', desc: '生成官网页面与区块。', typo: 'web' },
    { id: 'tier0-slides', zh: 'Slides', desc: '生成符合品牌的演示文稿。', typo: 'web' },
    { id: 'tier0-marketing', zh: '宣传物料', desc: '生成社媒图、海报等宣传物料。', typo: 'web' },
  ];
  const NAV = [
    { zh: '', en: '', items: [['foundation', 'Foundation', 'Foundation']] },
    { zh: 'Tokens', en: 'Tokens', items: [['color', '颜色', 'Color'], ['typography', '字体', 'Typography'], ['spacing', '间距与布局', 'Spacing & layout'], ['shape', '圆角、线宽与阴影', 'Radius, border & shadow'], ['motion', '动效', 'Motion', true]] },
    { zh: 'Components', en: 'Components', items: [['components', 'Tier0 平台组件', 'Tier0 platform'], ['scaffold', '应用脚手架', 'App scaffold']] },
    { zh: 'Brand', en: 'Brand', items: [['logo', 'Logo', 'Logo', true], ['texture', 'Texture', 'Texture', true], ['illustration', '插画与图形', 'Illustration'], ['templates', '品牌资产', 'Assets']] },
    { zh: 'Skills', en: 'Skills', items: [['skills', 'AI 调用规则', 'AI guidelines', true], ['designmd', 'DESIGN.md', 'DESIGN.md', true]] },
  ];
  const I18N = { tbd: { zh: 'TBD', en: 'TBD' }, copy: { zh: '复制', en: 'Copy' }, copied: { zh: '已复制', en: 'Copied' } };

  // ---------- data ----------
  const D = { base: null, light: null, dark: null, typo: null, md: '', root: '' };
  async function tryFetch(path, type) {
    const pre = window.__T0_DATA && window.__T0_DATA[path];
    if (pre != null) { D.root = './'; return type === 'text' ? pre : JSON.parse(pre); }
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
      tryFetch('01-tokens/typography.json'), tryFetch('00-foundation/foundation.md', 'text'),
      tryFetch('01-tokens/spacing.json'), tryFetch('01-tokens/layout.json'), tryFetch('01-tokens/radius.json'),
      tryFetch('01-tokens/border.json'), tryFetch('01-tokens/shadow.json'), tryFetch('01-tokens/motion.json'), tryFetch('DESIGN.md', 'text')]);
    Object.assign(D, { base: r[0], light: r[1], dark: r[2], typo: r[3], md: r[4] || '', spacing: r[5], layout: r[6], radius: r[7], border: r[8], shadow: r[9], motion: r[10], designmd: r[11] || '' });
    await loadGuides();
  }
  const asset = p => (window.__T0_ASSETS && window.__T0_ASSETS[p]) || (D.root || '../') + p;
  const entries = o => Object.entries(o || {}).filter(([k]) => k[0] !== '$');
  function walk(root, ref) { let n = root; for (const k of ref.replace(/[{}]/g, '').split('.')) { if (!n) return null; n = n[k]; } return n; }
  function colorOf(ref) { if (!ref) return null; if (ref[0] !== '{') return ref; const n = walk(D.base, ref); return n ? colorOf(n.$value) : null; }
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
  // Markdown：优先用 marked；离线时用简易渲染（段落、标题、列表、引用、表格、粗体、行内代码）。
  function mdInline(t) { return esc(t).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); }
  function mdLite(src) {
    const L = String(src || '').split('\n'); const out = []; let i = 0;
    while (i < L.length) {
      const l = L[i];
      if (!l.trim()) { i++; continue; }
      let m;
      if ((m = l.match(/^(#{1,4})\s+(.*)/))) { out.push(`<h${m[1].length}>${mdInline(m[2])}</h${m[1].length}>`); i++; continue; }
      if (/^---\s*$/.test(l)) { out.push('<hr>'); i++; continue; }
      if (l.trim().startsWith('|')) {
        const rows = []; while (i < L.length && L[i].trim().startsWith('|')) { rows.push(L[i]); i++; }
        const cells = r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
        const body = rows.filter(r => !/^\|\s*-/.test(r.trim()));
        out.push(`<table><thead><tr>${cells(body[0]).map(c => `<th>${mdInline(c)}</th>`).join('')}</tr></thead><tbody>${body.slice(1).map(r => `<tr>${cells(r).map(c => `<td>${mdInline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
        continue;
      }
      if (l.startsWith('>')) { const q = []; while (i < L.length && L[i].startsWith('>')) { q.push(L[i].replace(/^>\s?/, '')); i++; } out.push(`<blockquote><p>${mdInline(q.join(' '))}</p></blockquote>`); continue; }
      if (/^\s*([-*]|\d+\.)\s/.test(l)) {
        const ordered = /^\s*\d+\./.test(l); const items = [];
        while (i < L.length && /^\s*([-*]|\d+\.)\s/.test(L[i])) { items.push(L[i].replace(/^\s*([-*]|\d+\.)\s/, '')); i++; }
        out.push(`<${ordered ? 'ol' : 'ul'}>${items.map(x => `<li>${mdInline(x)}</li>`).join('')}</${ordered ? 'ol' : 'ul'}>`); continue;
      }
      const para = []; while (i < L.length && L[i].trim() && !/^(#{1,4}\s|>|\||---\s*$|\s*([-*]|\d+\.)\s)/.test(L[i])) { para.push(L[i]); i++; }
      out.push(`<p>${mdInline(para.join(' '))}</p>`);
    }
    return out.join('\n');
  }
  const md = s => window.marked ? window.marked.parse(s) : mdLite(s);
  function mdSection(heading) {
    const L = D.md.split('\n'), lvl = heading.match(/^#+/)[0].length, i = L.findIndex(l => l.trim().startsWith(heading)); if (i < 0) return '';
    const out = []; for (let j = i + 1; j < L.length; j++) { const m = L[j].match(/^(#+)\s/); if ((m && m[1].length <= lvl) || /^---\s*$/.test(L[j])) break; out.push(L[j]); }
    return out.join('\n').trim();
  }
  const mdRows = s => s.split('\n').filter(l => l.trim().startsWith('|') && !/^\|\s*-/.test(l.trim())).slice(1).map(r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim()));
  const plain = s => s.replace(/\*\*|`/g, '');
  const copyBtn = text => `<button class="icon-btn" data-copy="${esc(text)}" title="${tr('copy')}" aria-label="${tr('copy')}">${I.copy}</button>`;
  const codeBlock = code => `<div class="code"><pre><code>${esc(code)}</code></pre><span class="copy">${copyBtn(code)}</span></div>`;
  const seg = (id, opts, cur) => `<div class="seg" data-seg="${id}">${opts.map(([v, l]) => `<button type="button" data-v="${v}" aria-pressed="${v === cur}">${l}</button>`).join('')}</div>`;
  // 段落说明不再单独成段；确有必要的收进标题旁的提示
  const sec = (id, title, lead, body) => { const tip = lead ? lead.replace(/<[^>]+>/g, '') : ''; return `<section class="sec" id="${id}"><h2>${esc(title)}${tip ? `<span class="why-tip h2-tip" data-tip="${esc(tip)}" aria-label="${esc(tip)}">${I.info}</span>` : ''}</h2>${body}</section>`; };
  const eyebrow = () => { const g = NAV.find(x => x.items.some(i => i[0] === current)); const it = g && g.items.find(i => i[0] === current); return [g && g.zh, it && it[1]].filter(Boolean).join(' / '); };
  const docHead = (title, desc, actions = '') => `<header class="doc-head">${actions ? `<div class="doc-head-bar"><h1>${esc(title)}</h1><div class="doc-head-actions">${actions}</div></div>` : `<h1>${esc(title)}</h1>`}${desc ? `<p>${desc}</p>` : ''}</header>`;
  const foot = code => `<div class="spec-foot"><code>${esc(code)}</code>${copyBtn(code)}</div>`;

  // ---------- shell ----------
  const MODES = ['system', 'light', 'dark'];
  function setMode(m) {
    if (m === 'system') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', m);
    store.set('t0-theme', m);
    const b = document.getElementById('theme-btn'); b.innerHTML = m === 'dark' ? I.moon : m === 'light' ? I.sun : I.auto;
    b.title = { system: '主题：跟随系统', light: '主题：浅色', dark: '主题：深色' }[m];
  }
  function renderSidebar() {
    document.getElementById('sidebar').innerHTML = NAV.map(g => (g[lang] ? `<h6>${g[lang]}</h6>` : '') + g.items.map(([id, zh, en, tbd, sub]) =>
      `<a href="#${id}" data-r="${id}"${sub ? ' class="sub"' : ''}>${esc(lang === 'zh' ? zh : en)}${tbd ? `<span class="tbd">${tr('tbd')}</span>` : ''}</a>`).join('')).join('');
    document.getElementById('lang-btn').textContent = lang === 'zh' ? 'EN' : '中';
  }
  function renderShell() {
    document.querySelectorAll('.brandmark img').forEach(i => { i.src = asset(i.dataset.src); });
    document.getElementById('gh-btn').innerHTML = I.github;
    document.getElementById('menu-btn').innerHTML = I.menu;
    document.getElementById('menu-btn').addEventListener('click', () => document.getElementById('sidebar').classList.toggle('open'));
    // 一次点击就在浅色与深色之间切换；首次以系统主题为起点
    document.getElementById('theme-btn').addEventListener('click', () => { const m = store.get('t0-theme', 'system'); const isDark = m === 'dark' || (m === 'system' && matchMedia('(prefers-color-scheme: dark)').matches); setMode(isDark ? 'light' : 'dark'); });
    document.getElementById('lang-btn').addEventListener('click', () => { lang = lang === 'zh' ? 'en' : 'zh'; store.set('t0-lang', lang); document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'; renderSidebar(); route(); });
    setMode(store.get('t0-theme', 'system'));
    renderSidebar();
  }

  // ---------- home ----------
  function vHome() {
    const tags = [['PLC / MODBUS', '-0.7,1.17,-0.2'], ['UNS / Factory-A / Line-01', '0.05,1.72,-0.3'], ['EDGE_BOX / 192.168.1.50', '0.95,1.02,-0.05']];
    return `<section class="wb" data-workbench><div class="wb-stage"><canvas aria-hidden="true"></canvas>
        ${tags.map(([t, a]) => `<span class="wb-tag" data-anchor="${a}"><i></i>${t}</span>`).join('')}
        <div class="wb-story"><h1>让工厂数据<br>成为可用的语言。</h1></div>
</div></section>`;
  }
  function initHome() {
    const t = document.getElementById('ro-t'), b = document.getElementById('ro-b'), l = document.getElementById('ro-l');
    if (!t || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearInterval(initHome.i);
    initHome.i = setInterval(() => { if (!document.body.contains(t)) return clearInterval(initHome.i); t.textContent = (71.8 + Math.random() * 1.4).toFixed(1); const x = Math.round(62 + Math.random() * 12); b.style.width = x + '%'; l.textContent = x + '%'; }, 1600);
  }

  // ---------- foundation ----------
  // 品牌特征配图：每张都是一个可读的工程场景，而非缩小的通用图标。
  function traitArt(i) {
    const art = [
      `<path class="trace" d="M-10 140 H48 V92 H108 V118 H166 V55 H245"/><path class="trace faint" d="M-10 165 H70 V182 H145 V152 H245"/><g class="rack">${[0,1,2,3,4].map(k=>`<rect x="${25+k*40}" y="48" width="31" height="108" rx="3"/><path d="M${32+k*40} 130 H${49+k*40}"/>`).join('')}</g><rect class="signal glow" x="111" y="60" width="14" height="14"/><path class="signal-line" d="M118 60 V42 H190"/>`,
      `<rect class="plate back" x="9" y="25" width="218" height="159" rx="4"/><rect class="plate mid" x="30" y="42" width="218" height="159" rx="4"/><g class="front"><rect x="51" y="58" width="218" height="159" rx="4"/><path d="M51 94 H269 M130 94 V217"/><rect class="signal" x="73" y="75" width="8" height="8"/><path d="M151 121 H246 M151 140 H221 M151 159 H235"/><rect class="signal" x="151" y="180" width="66" height="5"/></g>`,
      `<g class="grid-lines"><rect x=".5" y=".5" width="311" height="239"/>${[1,2,3,4,5].map(k=>`<path d="M${k*52} 0 V240 M0 ${k*48} H312"/>`).join('')}</g><rect class="focus" x="104" y="48" width="104" height="96" rx="2"/><path class="trace" d="M0 144 H104 M208 96 H312"/><path class="signal-line" d="M104 48 H208 V144 H104 Z"/><rect class="signal" x="198" y="135" width="10" height="10"/>`,
      `<path class="trace" d="M-10 190 H45 V55 H172 V32 H320"/><rect class="plate back" x="34" y="38" width="203" height="151" rx="4"/><rect class="plate mid" x="52" y="53" width="203" height="151" rx="4"/><rect class="front" x="70" y="68" width="203" height="151" rx="4"/><path class="signal-line" d="M70 92 V72 Q70 68 74 68 H100 M245 68 H269 Q273 68 273 72 V99"/><path class="measure" d="M73 224 H270 M73 219 V229 M270 219 V229"/>`,
      `<rect class="front" x="30" y="26" width="254" height="190" rx="4"/><path class="trace" d="M30 62 H284 M111 62 V216"/><rect class="signal" x="47" y="44" width="8" height="8"/><path class="trace" d="M49 88 H91 M49 107 H82 M49 126 H95 M49 145 H76"/><path class="measure" d="M135 138 H261"/><path class="signal-line" d="M135 138 H231"/><rect class="signal" x="135" y="161" width="28" height="35"/><rect class="bar" x="172" y="173" width="28" height="23"/><rect class="bar" x="209" y="155" width="28" height="41"/>`,
      `<path class="trace" d="M28 49 V191 H114 M28 85 H114 M114 85 H182 V153 H256"/><rect class="front" x="16" y="31" width="42" height="36" rx="3"/><rect class="front" x="101" y="67" width="42" height="36" rx="3"/><rect class="front" x="101" y="172" width="42" height="36" rx="3"/><rect class="front" x="169" y="135" width="42" height="36" rx="3"/><rect class="signal glow" x="243" y="140" width="27" height="27"/><path class="signal-line" d="M212 153 H244"/><text x="24" y="22">FACTORY / LINE / DEVICE</text>`
    ];
    return `<div class="trait-art art-${i}" aria-hidden="true"><svg viewBox="0 0 312 240" preserveAspectRatio="xMidYMid meet"><defs><linearGradient id="trait-bg-${i}" x2="0" y2="1"><stop stop-color="#f2f3f4"/><stop offset="1" stop-color="#e7e9ea"/></linearGradient><filter id="trait-lift-${i}" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="8" stdDeviation="9" flood-color="#333a3f" flood-opacity=".16"/></filter></defs><rect class="canvas" width="312" height="240" fill="url(#trait-bg-${i})"/><g class="scene" filter="url(#trait-lift-${i})">${art[i].replace(/<text\b[^>]*>.*?<\/text>/g, '')}</g></svg></div>`;
  }
  function vFoundation() {
    const traits = mdRows(mdSection('### 特征'));
    const traitTeasers = [
      '品牌绿只点亮运行状态与关键信息。',
      '白色承载内容，浅灰划分区域。',
      '细线标明层级和信息边界。',
      '小圆角让界面利落、精确。',
      '用真实界面和交互展示产品。',
      '用层级、连线与焦点标记组织画面。'
    ];
    const principles = [...mdSection('## 2. 设计原则').matchAll(/\*\*(.+?)\*\*\n(.+)/g)];
    const what = mdSection('### Tier0 是什么');
    const story = mdSection('### 故事');
    const traitIntro = mdSection('## 3. 品牌特征').split(/\n###\s/)[0].trim();
    const opener = plain(mdSection('# Tier0 Foundation').split('\n').map(l => l.trim()).find(l => l && !l.startsWith('#')) || '');
    return docHead('Foundation', (opener.split('。')[0] || '设计系统的起点') + '。')
      + sec('brand-story','Tier0 品牌故事','', `<div class="brand-copy">${md([what, story].filter(Boolean).join('\n\n'))}</div><iframe class="brand-story-animation" src="assets/brand-story.html?v=5" title="Tier0 品牌故事：接入、组织与生成" sandbox="allow-scripts" loading="eager"></iframe>`)

      + sec('brand-traits','品牌特征','', `<div class="brand-copy">${md(traitIntro)}</div><div class="trait-grid">${traits.map((t,i)=>`<div class="trait-card">${traitArt(i)}<details class="trait-disclosure"><summary><div class="trait-title"><h3>${esc(plain(t[0]))}</h3><span class="trait-plus" aria-hidden="true">+</span></div><p>${esc(traitTeasers[i])}</p></summary><div class="trait-rule">${esc(plain(t[1]))}</div></details></div>`).join('')}</div>`)
      + sec('design-principles','设计原则','',`<div class="principle-grid">${principles.map((m,i)=>`<article><h3>${i === 0 ? esc(m[1]).replace('：', '：<br>') : esc(m[1])}</h3><p>${esc(m[2])}</p></article>`).join('')}</div>`) ;
  }

  // ---------- color ----------
  function vColor() {
    if (!D.base) return '<p class="muted">没有读取到颜色 token。</p>';
    const c = D.base.color;
    const brand = entries(c.brand).map(([k, v]) => ({ name: ext(v).displayName || k, hex: colorOf(v.$value), desc: (v.$description || '').split('——')[0] }));
    const ramp = ([g, list]) => `<div class="ramp-line"><span>${esc(g)}</span><div class="ramp">${list.map(([n, hex]) => `<button data-copy="${hex}" style="background:${hex};color:${lum(hex) > 0.4 ? '#050B14' : '#FFFFFF'}" aria-label="复制 ${esc(n)} ${hex}"><span class="rtip"><b>${esc(n.replace(/^.*?-(?=\d)/, ''))}</b>${hex}</span></button>`).join('')}</div></div>`;
    const scale = entries(c.scale).map(([g, o]) => [g, o.$value ? [[g, colorOf(o.$value)]] : entries(o).map(([s, v]) => [`${g}-${s}`, colorOf(v.$value)])]);
    const aux = entries(c.auxiliary).map(([g, o]) => [g, entries(o).map(([s, v]) => [`${g}-${s}`, colorOf(v.$value)])]);
    const sem = CORE.map(g => [(D.light.color[g].$description || g).split('。')[0], entries(D.light.color[g]).map(([k, v]) => ({ k, l: colorOf(v.$value), d: colorOf(D.dark.color[g][k].$value), desc: (v.$description || '').split('——')[0] }))]);
    const rules = ext(D.light.color).rules || [];
    return docHead('颜色', '界面以中性色为主。品牌绿是唯一的强调色，只用于信号、实时数据、选中和重点区块；状态色只表达真实结果。点击色块复制色值。')
      + sec('brand', '品牌色', '五个品牌色构成 Tier0 的识别。', `<div class="brand-board">${brand.map((x, i) => `<button type="button" class="bsw${i === 0 ? ' lead' : ''}" data-copy="${x.hex}" style="background:${x.hex};color:${lum(x.hex) > 0.4 ? '#050B14' : '#FFFFFF'}" aria-label="复制 ${esc(x.name)} ${x.hex}"><span class="bsw-name">${esc(x.name)}</span><span class="bsw-hex">${x.hex.replace('#', '')}</span><span class="bsw-copy">${I.copy}复制</span></button>`).join('')}</div>`)
      + sec('scale', '色阶', '绿、黑、灰三组色阶。', `<div class="ramps">${scale.map(ramp).join('')}</div>`)
      + sec('aux', '辅助色', '只用于图表和分类标签，不带语义。', `<div class="ramps">${aux.map(ramp).join('')}</div>`)
      + sec('tokens', '用途 token', '组件只使用这一层。左为亮色、右为暗色，点击一行复制变量。', `<div class="tok-groups">${sem.map(([t, list]) => `<div class="tok-group"><div class="tok-group-h"><h3>${esc(t)}</h3></div><div class="tok-list">${list.map(x => `<button type="button" class="tok-row" data-copy="var(--${x.k})" title="复制 var(--${x.k})"><span class="tok-sw"><i style="background:${x.l}"></i><i style="background:${x.d}"></i></span><span class="tok-name"><code>--${x.k}</code><small>${esc(x.desc)}</small></span><span class="tok-hex"><em>亮</em>${x.l}</span><span class="tok-hex"><em>暗</em>${x.d}</span></button>`).join('')}</div></div>`).join('')}</div>`)
      + sec('rules', '使用规则', '', rulesBox(rules));
  }

  // ---------- typography ----------
  const ty = { fam: 'display', w: 600, s: 48, lh: 1.2, ls: 0, set: 'product' };
  const FAMS = [['display', 'Inter'], ['sans', 'IBM Plex Sans'], ['mono', 'IBM Plex Mono'], ['sc', '中文系统字体']];
  function tyCss() { return `font-family: var(--font-${ty.fam}); font-weight: ${ty.w}; font-size: ${ty.s}px; line-height: ${ty.lh}; letter-spacing: ${ty.ls}em;`; }
  function vTypo() {
    if (!D.typo) return '<p class="muted">没有读取到字体 token。</p>';
    const group = D.typo.typography[ty.set];
    const rows = entries(group).map(([k, v]) => {
      const src = typeof v.$value === 'string' ? walk(D.typo, v.$value) : v;
      const t = typoResolve(src.$value); const fk = String(src.$value.fontFamily).replace(/[{}]/g, '').split('.').pop();
      const tt = ext(v).textTransform || ext(src).textTransform || '';
      const famName = (D.typo.font.family[fk] || { $value: [fk] }).$value[0];
      const css = `font-family:var(--font-${fk});font-size:${t.fontSize};line-height:${t.lineHeight};font-weight:${t.fontWeight};letter-spacing:${t.letterSpacing || 0};${tt ? 'text-transform:' + tt + ';' : ''}`;
      const sample = tt ? 'Edge data / Independent sources' : lang === 'zh' ? (parseInt(t.fontSize) >= 20 ? '设备状态与实时数据' : 'Line-01 共 12 台设备在线，CNC-03 主轴温度 72.4 °C。') : (parseInt(t.fontSize) >= 20 ? 'Device status and live data' : '12 devices online on Line-01. CNC-03 spindle at 72.4 °C.');
      return `<div class="ty-row"><div class="meta"><b>${esc(k)}</b><span>${esc(famName)} ${t.fontWeight} · ${parseInt(t.fontSize)} / ${parseInt(t.lineHeight)}</span></div><div class="sample" style="${css}">${esc(sample)}</div></div>`;
    }).join('');
    const SC_OS = [['macOS / iOS', 'PingFang SC 苹方'], ['Windows', 'Microsoft YaHei 微软雅黑'], ['Android', 'Noto Sans CJK SC 思源黑体']];
    const famCard = ([k, v]) => k === 'sc'
      ? `<div class="fam"><div class="aa" style="font-family:var(--font-sc)">中文</div><b>中文系统字体</b><dl class="os-list">${SC_OS.map(([o, f]) => { const parts = f.split(' '); const z = parts.pop(); return `<div><dt>${o}</dt><dd><b>${z}</b><span>${parts.join(' ')}</span></dd></div>`; }).join('')}</dl><span>不加载中文 Web 字体，按设备自动使用。</span></div>`
      : `<div class="fam"><div class="aa" style="font-family:var(--font-${k})">Aa</div><b>${esc(v.$value[0])}</b><span>${esc((v.$description || '').split('——')[0])}</span></div>`;
    const famList = entries(D.typo.font.family);
    const fams = `<div class="fam-latin">${famList.filter(([k]) => k !== 'sc').map(famCard).join('')}</div>${famList.filter(([k]) => k === 'sc').map(famCard).join('')}`;
    return docHead('字体', '标题用 Inter，正文用 IBM Plex Sans，代码和命令行用 IBM Plex Mono，读数用 Inter。中文不加载 Web 字体，使用系统字体：苹果设备为苹方，Windows 为微软雅黑，Android 为思源黑体（Noto Sans CJK）。')
      + sec('specimen', '试排', '选择字体，调整字重、字号、行高和字间距，然后直接改写示例文字。正文行高约 1.4–1.5，标题约 1.2；字间距一般为 0，大号标题可收紧到 -0.02em。', `<div class="spec"><div class="spec-bar ty-bar">${seg('tyfam', FAMS, ty.fam)}<div class="ty-ctls">
          <label class="ctl"><span class="ctl-h">字重<b id="ty-wv">${ty.w}</b></span><input type="range" id="ty-w" min="400" max="700" step="100" value="${ty.w}"></label>
          <label class="ctl"><span class="ctl-h">字号<b id="ty-sv">${ty.s}px</b></span><input type="range" id="ty-s" min="12" max="96" value="${ty.s}"></label>
          <label class="ctl"><span class="ctl-h">行高<b id="ty-lv">${ty.lh}</b></span><input type="range" id="ty-l" min="1" max="2" step="0.05" value="${ty.lh}"></label>
          <label class="ctl"><span class="ctl-h">字间距<b id="ty-tv">${ty.ls}em</b></span><input type="range" id="ty-t" min="-0.05" max="0.1" step="0.005" value="${ty.ls}"></label></div></div>
        <div class="spec-body"><div class="spec-sample" id="ty-sample" contenteditable="true" spellcheck="false" style="${tyCss()}">${lang === 'zh' || ty.fam === 'sc' ? 'Factory-A / Line-01 设备状态 72.4 °C<br>CNC-03 主轴温度持续升高，已通知当班工程师。' : 'Factory-A / Line-01 status 72.4 °C<br>CNC-03 spindle temperature keeps rising; the shift engineer was notified.'}</div></div>${foot(tyCss())}</div>`)
      + sec('scale', '字阶', '每一级都按实际大小展示。产品字阶用于产品后台，官网字阶用于官网、Deck 和宣传物料。', `<div style="margin-bottom:16px">${seg('tyset', [['product', '产品字阶'], ['web', '官网字阶']], ty.set)}</div><div>${rows}</div>`)
      + sec('families', '字体家族', '', `<div class="fam-wrap">${fams}</div>`)
      + sec('rules', '使用规则', '', rulesBox(rulesOf(D.typo.typography)));
  }

  // ---------- components (one page) ----------
  let compTheme = 'auto';

  // ---------- 组件预览：iframe 渲染 02-components/packages 里的真组件（site/previews） ----------
  const GUIDES = {};
  const guideSummary = c => { const t = c.guide && GUIDES[c.guide]; const m = t && t.match(/^> 摘要（.+?）：(.+)$/m); return m ? m[1].replace(/`/g, '') + `（用法见 02-components/guidelines/${c.guide}.md）` : ''; };
  async function loadGuides() { const ids = [...new Set(COMPONENTS.map(c => c.guide).filter(Boolean))]; await Promise.all(ids.map(async g => { if (GUIDES[g] == null) GUIDES[g] = (await tryFetch(`02-components/guidelines/${g}.md`, 'text')) || ''; })); }
  let previewSrc = null;
  function previewBase() {
    if (previewSrc) return previewSrc;
    const packed = asset('previews/index.html');
    if (packed.startsWith('data:')) { const b64 = packed.split(',')[1]; const bin = atob(b64); const u8 = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i); previewSrc = URL.createObjectURL(new Blob([u8], { type: 'text/html' })); }
    else previewSrc = 'previews/index.html';
    return previewSrc;
  }
  const previewDark = () => compTheme === 'dark' || (compTheme === 'auto' && document.documentElement.dataset.theme === 'dark') || (compTheme === 'auto' && !document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
  function mountPreviews() {
    const frames = document.querySelectorAll('iframe.cp-frame'); if (!frames.length) return;
    const dark = previewDark();
    frames.forEach(f => { const want = previewBase() + '#' + f.dataset.cp + (dark ? ':dark' : ''); if (!f.src) f.src = want; else f.contentWindow && f.contentWindow.postMessage({ type: 't0-theme', dark }, '*'); f.onload = () => f.contentWindow.postMessage({ type: 't0-theme', dark: previewDark() }, '*'); });
  }
  new MutationObserver(() => mountPreviews()).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  addEventListener('message', e => { if (!e.data || e.data.type !== 't0-preview') return; const f = document.querySelector(`iframe.cp-frame[data-cp="${e.data.id}"]`); if (f) f.style.height = Math.max(120, e.data.h) + 'px'; });
  function vComponents() {
    const scope = compTheme === 'dark' ? ' dark-scope' : compTheme === 'light' ? ' light-scope' : '';
    return docHead('Tier0 平台组件', `Tier0 平台自身使用的组件，代码复刻自前端，在仓库的 <code>02-components/packages</code>，可以直接引用。生成平台应用模版用的是另一套：<a href="#scaffold">应用脚手架</a>。`)
      + `<div style="margin:0 0 40px">${seg('ctheme', [['auto', '跟随页面'], ['light', '亮色'], ['dark', '暗色']], compTheme)}</div>`
      + COMPONENTS.map(c => sec('c-' + c.id, c.zh, esc(guideSummary(c) || c.desc), `<div class="spec" data-spec>
          <div class="spec-tabs"><div class="seg sm" role="tablist"><button type="button" data-view="preview" aria-pressed="true">预览</button><button type="button" data-view="code" aria-pressed="false">代码</button></div>
            <div class="src-list">${c.src.split(' · ').map(f => `<button type="button" class="src-chip" data-copy="${esc(FE + f)}" title="复制路径 ${esc(FE + f)}">${esc(f.replace(/^ui\//, ''))}</button>`).join('')}</div></div>
          <div class="spec-body cp-body" data-pane="preview"><iframe class="cp-frame" data-cp="${c.id}" title="${esc(c.zh)} 预览" loading="lazy"></iframe></div>
          <div class="spec-code" data-pane="code" hidden>${codeBlock(c.code)}</div></div>`)).join('');
  }

  // ---------- scaffold ----------
  const repoCard = (href, icon, title, sub) => `<a class="repo-card" href="${href}" target="_blank" rel="noopener"><span class="rc-ic">${icon}</span><span class="rc-tx"><b>${title}</b><small>${sub}</small></span><span class="rc-go">${I.arrow}</span></a>`;
  function vScaffold() {
    return docHead('应用脚手架', '用来生成平台应用模版的组件。主题色之后可以更换，所以这里的颜色以脚手架为准。')
      + `<div class="repo-row">${repoCard(SCAFFOLD_REPO, I.github, '代码仓库', 'FREEZONEX/Tier0-App-Scaffold')}${repoCard(asset('scaffold-v85a4d4e/index.html'), I.open, '组件门户', '在新窗口中打开')}</div>`
      + `<div class="sc-frame" id="sc-frame"><div class="sc-empty" hidden><p>组件预览暂时无法加载，请在代码仓库中查看。</p></div></div>`;
  }
  function mountScaffold() {
    const box = document.getElementById('sc-frame'); if (!box) return;
    const packed = asset('scaffold/single.html'); const src = packed.startsWith('data:') ? packed : asset('scaffold-v85a4d4e/index.html');
    const show = () => box.insertAdjacentHTML('afterbegin', `<iframe title="应用脚手架组件预览" src="${src}" loading="lazy"></iframe>`);
    if (src.startsWith('data:')) return show();
    if (location.protocol === 'file:') { box.querySelector('.sc-empty').hidden = false; return; }
    fetch(src, { cache: 'no-store' }).then(async r => { if (!r.ok) throw 0; const html = await r.text(); if (!html.includes('id="root"')) throw 0; if (box.isConnected) show(); }).catch(() => { box.querySelector('.sc-empty').hidden = false; });
  }

  // ---------- 材质实验：底图 → 点阵 / 条纹 / 抖动 / 字符，可换图片或视频，实时调参 ----------
  // 点阵来自工厂的冲孔金属网板，条纹来自厂房的瓦楞外墙：都是规则、等距、稳定的排列。
  const LAB_MODES = [['halftone', '冲孔点阵'], ['bars', '瓦楞条纹'], ['dither', '抖动'], ['ascii', '字符']];
  const LAB_SRCS = [['bench', '工作台'], ['mark', 'T0 标志'], ['word', 'Tier0 字标']];
  const LAB_PRESETS = [
    ['factory', '厂房点阵', { mode: 'halftone', cell: 6, blur: 3, contrast: 1.5, bright: -0.31, minDot: 0.1, speed: 0.4, wave: 0.3, ink: '#B2ED1D', bg: '#050B14', invert: false, color: 'hue', hue: 0, under: 0.2 }],
    ['mesh', '冲孔点阵', { mode: 'halftone', cell: 9, blur: 2, contrast: 1.6, bright: 0, minDot: 0.18, speed: 0.3, wave: 0.15, ink: '#050B14', bg: '#D6F28C', invert: true , color: 'mono', hue: 0, under: 0}],
    ['panel', '瓦楞条纹', { mode: 'bars', cell: 8, blur: 2.5, contrast: 1.6, bright: 0, minDot: 0.2, speed: 0.3, wave: 0.1, ink: '#F2F3F4', bg: '#5A5F66', invert: true , color: 'mono', hue: 0, under: 0}],
    ['signal', '信号点阵', { mode: 'halftone', cell: 7, blur: 1.5, contrast: 1.5, bright: -0.04, minDot: 0.1, speed: 0.4, wave: 0.2, ink: '#B2ED1D', bg: '#050B14', invert: false , color: 'mono', hue: 0, under: 0}],
    ['term', '原色字符', { mode: 'ascii', cell: 10, blur: 1, contrast: 1.3, bright: 0, minDot: 0, speed: 0.5, wave: 0.3, ink: '#B2ED1D', bg: '#F7F8F4', invert: true, color: 'source', hue: 0, under: 0.25, chars: ' .:-=+*#%&@' }],
  ];
  const LAB_DEF = Object.assign({ chars: ' .:-=+*#%@', paused: false, mouse: true, preset: 'factory', src: 'bench', color: 'mono', hue: 0, under: 0 }, LAB_PRESETS[0][2]);
  const LAB_COLORS = [['mono', '单色'], ['source', '原图色'], ['hue', '换色相']];
  const LAB_RAMPS = [[' .:-=+*#%@', '标准'], [' ░▒▓█', '块'], [' 01', '二进制'], [' .·:+×#', '细'], [' ─│┼╋█', '线框']];
  const LAB_SIZES = [['view', '当前画面'], ['1920x1080', '1920×1080'], ['3840x2160', '3840×2160'], ['1080x1350', '1080×1350'], ['1080x1080', '1080×1080']];
  const lab = Object.assign({}, LAB_DEF);
  const LAB_SL = [
    ['cell', '格子', 4, 24, 1, 'px'], ['minDot', '最小点', 0, 0.5, 0.01, ''], ['blur', '模糊', 0, 12, 0.5, 'px'],
    ['contrast', '对比度', 0.4, 2.5, 0.05, ''], ['bright', '亮度', -0.5, 0.5, 0.01, ''], ['speed', '速度', 0, 2, 0.05, ''], ['wave', '波动', 0, 1, 0.05, ''],
    ['hue', '色相', -180, 180, 1, '°'], ['under', '原图透出', 0, 1, 0.05, ''],
  ];
  const labFmt = (v, sl) => (+v).toFixed(sl[4] < 1 ? (sl[4] < 0.1 ? 2 : 1) : 0) + sl[5];
  const labSlider = sl => { const [k, n, min, max, step] = sl, v = lab[k]; return `<label class="lab-sl" style="--f:${((v - min) / (max - min)) * 100}%"><span>${n}</span><input type="range" data-lab="${k}" min="${min}" max="${max}" step="${step}" value="${v}"><em>${labFmt(v, sl)}</em></label>`; };
  function vTextureLab() {
    return `<div class="lab"><div class="lab-view"><canvas id="lab-cv"></canvas><div class="lab-over">${seg('labmode', LAB_MODES, lab.mode)}<label class="ui-btn ghost lab-up">${I.open}换图片 / 视频<input type="file" id="lab-file" accept="image/*,video/*" hidden></label></div></div>
      <div class="lab-panel"><div class="lab-h"><b>预设</b><button type="button" class="ui-btn ghost" data-lab-reset>重置</button></div>
        <div class="lab-presets">${LAB_PRESETS.map(([k, n, o]) => `<button type="button" data-lab-preset="${k}" aria-pressed="${lab.preset === k}"><i style="background:${o.bg};color:${o.ink}"></i>${n}</button>`).join('')}</div>
        <div class="lab-h"><b>颜色</b></div>${seg('labcolor', LAB_COLORS, lab.color)}
        <div class="lab-h"><b>参数</b></div>
        <div class="lab-grid">${LAB_SL.map(labSlider).join('')}
          <label class="lab-sl lab-color"><span>墨色</span><em>${lab.ink}</em><input type="color" data-lab="ink" value="${lab.ink}"></label>
          <label class="lab-sl lab-color"><span>底色</span><em>${lab.bg}</em><input type="color" data-lab="bg" value="${lab.bg}"></label>
          <label class="lab-sl lab-text"><span>字符</span><select data-lab-ramp aria-label="字符预设">${LAB_RAMPS.map(([v, n]) => `<option value="${esc(v)}" ${v === lab.chars ? 'selected' : ''}>${n}</option>`).join('')}</select><input type="text" data-lab="chars" value="${esc(lab.chars)}" spellcheck="false"></label>
          <label class="lab-sl lab-tg"><span>反相</span><input type="checkbox" data-lab="invert" ${lab.invert ? 'checked' : ''}><i></i></label>
          <label class="lab-sl lab-tg"><span>跟随鼠标</span><input type="checkbox" data-lab="mouse" ${lab.mouse ? 'checked' : ''}><i></i></label>
          <label class="lab-sl lab-tg"><span>暂停</span><input type="checkbox" data-lab="paused" ${lab.paused ? 'checked' : ''}><i></i></label>
        </div>
        <div class="lab-h"><b>导出</b></div>
        <div class="lab-exp"><select id="lab-size" aria-label="导出尺寸">${LAB_SIZES.map(([v, n]) => `<option value="${v}">${n}</option>`).join('')}</select><button type="button" class="ui-btn outline" data-lab-png>${I.download}PNG</button><button type="button" class="ui-btn outline" data-lab-webm>${I.download}视频 5 秒</button></div>
      </div></div>`;
  }
  function labSize() { const v = (document.getElementById('lab-size') || {}).value || 'view'; const cv = document.getElementById('lab-cv'); if (v === 'view') return [cv.clientWidth * 2, cv.clientHeight * 2, 2]; const [w, h] = v.split('x').map(Number); return [w, h, Math.max(1, w / 1200)]; }
  function labExportPng() { const [w, h, k] = labSize(); const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); x.scale(k, k); drawMat(x, w / k, h / k, LabRT.src, lab, LabRT.t, null); c.toBlob(b => download(b, `tier0-texture-${w}x${h}.png`), 'image/png'); }
  function labExportWebm(btn) {
    const [w, h, k] = labSize(); const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
    const mime = ['video/webm;codecs=vp9', 'video/webm'].find(m => MediaRecorder.isTypeSupported(m)); const rec = new MediaRecorder(c.captureStream(30), { mimeType: mime, videoBitsPerSecond: 20e6 }); const parts = [];
    rec.ondataavailable = e => parts.push(e.data); rec.onstop = () => { download(new Blob(parts, { type: 'video/webm' }), `tier0-texture-${w}x${h}.webm`); btn.disabled = false; btn.innerHTML = btn.dataset.label; };
    btn.disabled = true; btn.dataset.label = btn.innerHTML; btn.textContent = '正在录制…'; rec.start();
    const t0 = performance.now(), base = LabRT.t; const loop = now => { const t = base + (now - t0) / 1000 * lab.speed; x.setTransform(k, 0, 0, k, 0, 0); drawMat(x, w / k, h / k, LabRT.src, lab, t, null); if (now - t0 < 5000) requestAnimationFrame(loop); else rec.stop(); }; requestAnimationFrame(loop);
  }
  // 标志底图：浅底深色图形，加一点纵向明暗，让点阵和条纹在背景里也有起伏
  function markCanvas(kind, W, H) {
    const cw = 900, ch = Math.round(900 * (H || 3) / (W || 4));
    const c = document.createElement('canvas'); c.width = cw; c.height = ch; const x = c.getContext('2d');
    const g = x.createLinearGradient(0, 0, 0, ch); g.addColorStop(0, '#ECEEF0'); g.addColorStop(1, '#D3D6DA'); x.fillStyle = g; x.fillRect(0, 0, cw, ch);
    const P = Object.fromEntries(LOGO_P); x.fillStyle = '#0A0D12';
    const w = kind === 'word' ? 505 : 215, h = 124, k = Math.min(cw * (kind === 'word' ? 0.84 : 0.78) / w, ch * 0.55 / h);
    x.translate((cw - w * k) / 2, (ch - h * k) / 2); x.scale(k, k);
    if (kind === 'word') ['t', 'i', 'e', 'r', 'z'].forEach(n => x.fill(new Path2D(P[n]), 'evenodd'));
    else { x.fill(new Path2D(P.t)); x.translate(-290, 0); x.fill(new Path2D(P.z), 'evenodd'); }
    return c;
  }
  // 色相旋转（保留明暗）
  function hueRot(r, g, b, deg) { const a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    const m = [0.213 + c * 0.787 - s * 0.213, 0.715 - c * 0.715 - s * 0.715, 0.072 - c * 0.072 + s * 0.928, 0.213 - c * 0.213 + s * 0.143, 0.715 + c * 0.285 + s * 0.140, 0.072 - c * 0.072 - s * 0.283, 0.213 - c * 0.213 - s * 0.787, 0.715 - c * 0.715 + s * 0.715, 0.072 + c * 0.928 + s * 0.072];
    const cl = v => Math.max(0, Math.min(255, Math.round(v))); return [cl(m[0] * r + m[1] * g + m[2] * b), cl(m[3] * r + m[4] * g + m[5] * b), cl(m[6] * r + m[7] * g + m[8] * b)]; }
  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + 0.5) / 16);
  const matOff = document.createElement('canvas'), matOctx = matOff.getContext('2d', { willReadFrequently: true });
  // 通用渲染：把 src 按参数 p 画到 ctx（W×H）
  function drawMat(ctx, W, H, src, p, t, mouse) {
    ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
    const colored = p.color && p.color !== 'mono';
    const sw = src && (src.videoWidth || src.naturalWidth || src.width), sh = src && (src.videoHeight || src.naturalHeight || src.height);
    if (!sw) return;
    const cell = p.cell, bars = p.mode === 'bars', rowH = bars ? cell * (p.rowK || 3) : cell;
    const cols = Math.ceil(W / cell), rows = Math.ceil(H / rowH);
    matOff.width = cols; matOff.height = rows;
    const sc = Math.max(cols / sw, rows * (rowH / cell) / sh), dw = sw * sc, dh = sh * sc / (rowH / cell);
    matOctx.filter = p.blur ? `blur(${p.blur / cell}px)` : 'none';
    matOctx.drawImage(src, (cols - dw) / 2, (rows - dh) / 2, dw, dh);
    const px = matOctx.getImageData(0, 0, cols, rows).data, wv = p.wave, min = p.minDot || 0;
    if (p.under > 0) { ctx.save(); ctx.globalAlpha = p.under; ctx.filter = `blur(${Math.max(1, cell / 3)}px)${p.color === 'hue' ? ` hue-rotate(${p.hue}deg)` : ''}`; const s2 = Math.max(W / sw, H / sh); ctx.drawImage(src, (W - sw * s2) / 2, (H - sh * s2) / 2, sw * s2, sh * s2); ctx.restore(); }
    ctx.fillStyle = p.ink;
    if (p.mode === 'ascii') { ctx.font = `500 ${cell * 1.15}px ${getComputedStyle(document.body).getPropertyValue('--font-mono') || 'monospace'}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; }
    const chars = p.chars || ' .#';
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const ox = Math.round(Math.sin(y * 0.18 + t * 2.2) * wv * 1.5), oy = Math.round(Math.cos(x * 0.15 + t * 1.7) * wv);
      const sx = Math.min(cols - 1, Math.max(0, x + ox)), sy = Math.min(rows - 1, Math.max(0, y + oy)), i = (sy * cols + sx) * 4;
      let l = (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
      l = (l - 0.5) * p.contrast + 0.5 + p.bright;
      if (mouse && mouse.x >= 0) { const d = Math.hypot(x / cols - mouse.x, (y / rows - mouse.y) * H / W); if (d < 0.12) l += (0.12 - d) * 4 * (p.invert ? -1 : 1); }
      if (p.invert) l = 1 - l;
      l = Math.max(0, Math.min(1, l));
      if (colored) { let r = px[i], g = px[i + 1], b = px[i + 2]; if (p.color === 'hue' && p.hue) [r, g, b] = hueRot(r, g, b, p.hue); ctx.fillStyle = `rgb(${r},${g},${b})`; }
      const cx = x * cell + cell / 2, cy = y * rowH + rowH / 2;
      if (p.mode === 'halftone') { const r = (min + (1 - min) * Math.sqrt(l)) * cell * 0.5; if (r > 0.3) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.2832); ctx.fill(); } }
      else if (bars) { const w = Math.max(0, (min + (1 - min) * l) * (cell - 1.5)); if (w > 0.4) ctx.fillRect(cx - w / 2, y * rowH + 1, w, rowH - 2); }
      else if (p.mode === 'dither') { const th = BAYER[(y & 3) * 4 + (x & 3)], fl = wv * 0.08 * Math.sin(t * 6 + x * 0.7 + y * 1.3); if (l + fl > th) ctx.fillRect(x * cell, y * cell, cell - 1, cell - 1); }
      else { const n = chars.length - 1, jit = wv * 0.15 * Math.sin(t * 5 + x * 0.9 + y * 0.6), k = Math.max(0, Math.min(n, Math.round((l + jit) * n))), ch = chars[k]; if (ch && ch !== ' ') ctx.fillText(ch, cx, cy); }
    }
  }
  const LabRT = { src: null, raf: 0, mx: -1, my: -1, t: 0, last: 0 };
  function labSource(url, isVideo) {
    if (LabRT.src && LabRT.src.pause) LabRT.src.pause();
    if (isVideo) { const v = document.createElement('video'); v.src = url; v.muted = true; v.loop = true; v.playsInline = true; v.play().catch(() => {}); LabRT.src = v; }
    else { const im = new Image(); im.src = url; LabRT.src = im; }
  }
  function labUseSrc(k) { lab.src = k; if (k === 'bench') labSource(asset('assets/texture-base.jpg'), false); else { const cv = document.getElementById('lab-cv'); LabRT.src = markCanvas(k, cv ? cv.clientWidth : 4, cv ? cv.clientHeight : 3); } }
  function mountLab() {
    const cv = document.getElementById('lab-cv'); if (!cv) return;
    if (!LabRT.src) labUseSrc(lab.src);
    const ctx = cv.getContext('2d');
    cv.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); LabRT.mx = (e.clientX - r.left) / r.width; LabRT.my = (e.clientY - r.top) / r.height; });
    cv.addEventListener('pointerleave', () => { LabRT.mx = LabRT.my = -1; });
    cancelAnimationFrame(LabRT.raf);
    const frame = now => {
      if (!cv.isConnected) return;
      LabRT.raf = requestAnimationFrame(frame);
      const dt = Math.min(64, now - (LabRT.last || now)); LabRT.last = now;
      if (!lab.paused) LabRT.t += dt / 1000 * lab.speed;
      const W = cv.clientWidth, H = cv.clientHeight, dpr = Math.min(2, devicePixelRatio || 1);
      if (cv.width !== W * dpr || cv.height !== H * dpr) { cv.width = W * dpr; cv.height = H * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawMat(ctx, W, H, LabRT.src, lab, LabRT.t, lab.mouse ? { x: LabRT.mx, y: LabRT.my } : null);
    };
    LabRT.raf = requestAnimationFrame(frame);
  }
  function labInput(e) {
    const sk2 = e.target.dataset && e.target.dataset.sig;
    if (sk2) { sigData()[sk2] = e.target.value; sigStore.set(SIG.data); drawSig(); return true; }
    const ck = e.target.dataset && e.target.dataset.card;
    if (ck) { cardData()[ck] = e.target.value; cardStore.set(CARD.data); mountCard(); return true; }
    if (e.target.matches && e.target.matches('[data-card-qrfile]')) { const f = e.target.files[0]; if (f) { const r = new FileReader(); r.onload = () => { const i = new Image(); i.onload = () => { CARD.qrImg = i; mountCard(); }; i.src = r.result; }; r.readAsDataURL(f); } return true; }
    const dk = e.target.dataset.dl;
    if (dk) { const el = e.target; dl[dk] = el.type === 'color' ? el.value.toUpperCase() : +el.value; const row = el.closest('.lab-sl'), sl = DL_SL.find(x => x[0] === dk); if (sl) { row.style.setProperty('--f', ((dl[dk] - sl[2]) / (sl[3] - sl[2])) * 100 + '%'); row.querySelector('em').textContent = dl[dk] + sl[5]; } else row.querySelector('em').textContent = dl[dk]; return true; }
    if (e.target.matches('[data-lab-ramp]')) { lab.chars = e.target.value; const ti = e.target.parentElement.querySelector('input'); ti.value = lab.chars; return true; }
    const k = e.target.dataset.lab; if (!k) return false;
    const el = e.target; lab[k] = el.type === 'checkbox' ? el.checked : el.type === 'range' ? +el.value : el.value;
    const row = el.closest('.lab-sl'), sl = LAB_SL.find(x => x[0] === k);
    if (sl) { row.style.setProperty('--f', ((lab[k] - sl[2]) / (sl[3] - sl[2])) * 100 + '%'); row.querySelector('em').textContent = labFmt(lab[k], sl); }
    if (el.type === 'color') row.querySelector('em').textContent = el.value.toUpperCase();
    return true;
  }

  // ---------- Logo 材质拓展：同一套渲染，套在 Tier0 标志上 ----------
  const LOGO_MATS = [
    ['panel', '瓦楞金属', '厂房外墙的瓦楞板。条纹等宽等距，标志只改变条纹的宽窄，像压在金属板上。', { mode: 'bars', rowK: 1.2, cell: 6, blur: 0.5, contrast: 1.8, bright: 0, minDot: 0.2, wave: 0, ink: '#E6E8EB', bg: '#62676E', invert: true }, 'mark'],
    ['mesh', '冲孔网板', '设备外壳上的冲孔金属网。孔距固定，孔径随图形变化，远看是标志，近看是规则的孔。', { mode: 'halftone', cell: 9, blur: 2.5, contrast: 1.9, bright: 0, minDot: 0.28, wave: 0, ink: '#C9CED4', bg: '#22262B', invert: false }, 'mark'],
    ['print', '印刷点阵', '品牌绿浅底上的黑色网点，用于海报和包装。点阵稳定、可复制，适合大面积铺陈。', { mode: 'halftone', cell: 8, blur: 2, contrast: 1.7, bright: 0, minDot: 0.12, wave: 0, ink: '#050B14', bg: '#D6F28C', invert: true }, 'mark'],
    ['signal', '信号屏', '控制室屏幕上的低分辨率点阵，品牌绿在深色上发光，用于开场和数字屏幕。', { mode: 'dither', cell: 5, blur: 1, contrast: 1.6, bright: 0, minDot: 0, wave: 0, ink: '#B2ED1D', bg: '#050B14', invert: true }, 'mark'],
  ];
  const vLogoMats = () => `<div class="lm-grid">${LOGO_MATS.map(([k, n, d]) => `<figure class="lm-card"><canvas data-lm="${k}"></canvas><figcaption><b>${n}</b><span>${d}</span></figcaption></figure>`).join('')}</div>`;
  function mountLogoMats() {
    document.querySelectorAll('[data-lm]').forEach(cv => {
      const m = LOGO_MATS.find(x => x[0] === cv.dataset.lm), W = cv.clientWidth, H = cv.clientHeight, dpr = Math.min(2, devicePixelRatio || 1);
      cv.width = W * dpr; cv.height = H * dpr; const ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawMat(ctx, W, H, markCanvas(m[4], W, H), m[3], 0, null);
    });
  }

  // ---------- 插画与图形：等距插画、架构图、暗色发光 ----------
  const ILLUS = [
    ['iso', '等距插画', '用于配图和解释原理：数据怎么分层、设备怎么连接、一次开发怎么复用。', [['iso-layers', '分层：设备层 → 平台层 → 应用层'], ['iso-logistics', '场景：工厂、仓储与物流的数据连接'], ['iso-reuse', '原理：一个数据源，被多处复用']],
      ['30° 等距视角，所有物体用同一套角度，不混用透视。', '描边 1px 深色线，面用米白与浅灰，品牌绿只给「数据、连接、正在发生」的部分。', '连接用品牌绿实线或虚线，标签用浅绿底的小方牌，文字用等宽字体。', '背景留白或浅灰点阵，不加渐变和投影。', '人物、车辆只做比例参照，不做主角。']],
    ['arch', '架构图', '用于解释平台架构：左边是接入的数据源，中间是 Tier0 平台，右边是输出的应用和能力。', [['arch-platform', 'Tier0 平台架构：数据接入 → 统一命名空间 → 应用与 AI']],
      ['从左到右读：输入 → 平台 → 输出，箭头只朝一个方向。', '平台范围用品牌绿虚线框出，内部模块用 1px 细线卡片。', '模块名用正文字体，分组标题用等宽小字。', '同一张图里图标风格一致，只用线性图标。', '品牌绿只用于连接线和平台边界，不给每个模块上色。']],
    ['glow', '暗色发光', '品牌宣传活动用过的主题风格：深色底、品牌绿发光、半透明卡片。', [['glow-builder', '活动海报：Tier0 Builder'], ['glow-reuse', '社媒长图：一次开发，多场景复用'], ['glow-compare', '对比图：Tier0 与传统项目']],
      ['底色固定为 #050B14，发光只用品牌绿，强度克制，一张图只有一个发光中心。', '半透明卡片只用于主信息，周围元素保持实色或线框。', '背景可用 T0 字符点阵，透明度低，不抢标题。', '标题用 Inter / 中文系统字体，强调词用品牌绿，不加描边和渐变文字。', '只在宣传场景使用：Foundation 里「玻璃拟态、霓虹渐变」的禁用规则对产品界面和官网依然有效。']],
  ];
  // 有英文版的宣传图：英文界面下显示英文版
  const IL_EN = ['glow-reuse', 'glow-compare'];
  // ---------- 品牌资产与模版 ----------
  const LINKS = [
    ['官网', 'tier0.cn', 'tier0.app', '讲品牌、引导了解产品'],
    ['Tier0 Cloud Studio', 'https://studio.tier0.cn/login', 'tier0.dev（暂定）', '引导注册、试用、登录'],
  ];
  const QRS = [['qr-tier0-cn.svg', '官网二维码 · 中文', 'tier0.cn'], ['qr-tier0-app.svg', '官网二维码 · 英文', 'tier0.app']];
  const CARD_W = 1052, CARD_H = 662;
  // 示例信息：姓名、电话、邮箱为虚构，替换成自己的再导出
  const CARD_DEF = {
    zh: { name: '林一', title: '解决方案架构师', addr: '杭州市 · 滨江区宝龙中心 2801室', email: 'lin.yi@freezonex.io', web: 'www.tier0.cn', phone: '+86 138 0000 0000', slogan: '工厂软件工厂造', qr: 'https://tier0.cn' },
    en: { name: 'Alex Lin', title: 'Solutions Architect', addr: '1 Fusionopolis Link 03-04\nNexus @One-North, Singapore', email: 'alex.lin@freezonex.io', web: 'www.tier0.app', phone: '+65 8000 0000', slogan: 'Factory app that fit', qr: 'https://tier0.app' },
  };
  const CARD_FIELDS = [['name', '姓名'], ['title', '职位'], ['addr', '地址', 1], ['email', '邮箱'], ['web', '网址'], ['phone', '电话']];
  const CARD = { lang: 'zh', side: 'front', data: null, qrImg: null };
  const cardStore = { get() { try { return JSON.parse(localStorage.getItem('t0-card') || 'null'); } catch { return null; } }, set(v) { try { localStorage.setItem('t0-card', JSON.stringify(v)); } catch {} } };
  function cardData() {
    if (!CARD.data) CARD.data = cardStore.get() || JSON.parse(JSON.stringify(CARD_DEF));
    return CARD.data[CARD.lang];
  }
  const TPLS = [
    ['social.jpg', '社媒方图 · Builder 广告组', '1200 × 1200，一组 5 张，中英各一组', '问题 → 描述 → 结果 → 应用场景 → 行动号召。暗底，真实场景或产品界面做主视觉；标题两行，关键词用品牌绿；最后一张放输入框样式的产品画面和行动链接。'],
    ['long-zh.jpg', '长图 · 中文', '宽 1342，高 8875', '6 张暗色卡片：封面 → 免集成 → 投资回报 → 多场景复用 → 全球部署 → AI Ready。每张两行大标题（一行白、一行品牌绿）+ 说明 + 一张说明图。'],
    ['long-en.jpg', '长图 · 英文', '宽 1745，高 8875', '和中文版同一结构；英文标题首字母大写。'],
    ['trifold-zh.jpg', '三折页 · 中文', '6 个面', '内页白底：编号 + 分类 → 标题 → 说明图 → 正文 → 品牌绿浅底结论块。封面和中间页暗底；封底放邮箱、网址和二维码。'],
    ['trifold-en.jpg', '三折页 · 英文', '6 个面', '和中文版同一结构，网址用 www.tier0.app。'],
  ];
  const SIZES = [['LinkedIn / 广告方图', '1200 × 1200'], ['LinkedIn 链接图', '1200 × 627'], ['X（Twitter）', '1600 × 900'], ['Instagram 竖图', '1080 × 1350'], ['小红书', '1080 × 1440'], ['微信公众号头图', '900 × 383'], ['微信长图', '宽 1080'], ['演示 / 视频封面', '1920 × 1080']];
  function vTemplates() {
    const d = cardData();
    const links = `<div class="ba-links">${LINKS.map(([n, zh, en, use]) => `<div class="ba-link"><div class="ba-link-h"><b>${n}</b><span>${use}</span></div>${[['中文', zh], ['英文', en]].map(([l, u]) => `<div class="ba-url"><span>${l}</span><code>${esc(u)}</code>${copyBtn(u.replace('（暂定）', ''))}</div>`).join('')}</div>`).join('')}</div>`;
    const qrs = `<div class="ba-qrs">${QRS.map(([f, n, u]) => `<div class="ba-qr"><img src="${asset('03-brand/links/' + f)}" alt="${n}"><div class="ba-qr-f"><span><b>${n}</b><small>${u}</small></span><a class="ui-btn ghost" href="${asset('03-brand/links/' + f)}" download="${f}">${I.download}SVG</a></div></div>`).join('')}</div>`;
    const field = ([k, n, multi]) => `<label class="bc-field"><span>${n}</span>${multi ? `<textarea data-card="${k}" rows="2">${esc(d[k])}</textarea>` : `<input data-card="${k}" value="${esc(d[k])}">`}</label>`;
    const card = `<div class="bc"><div class="bc-stage"><canvas id="bc-front" width="${CARD_W * 2}" height="${CARD_H * 2}" aria-label="名片正面"></canvas><canvas id="bc-back" width="${CARD_W * 2}" height="${CARD_H * 2}" aria-label="名片背面"></canvas></div>
      <div class="bc-panel"><div class="bc-top">${seg('cardlang', [['zh', '中文'], ['en', 'English']], CARD.lang)}<button type="button" class="ui-btn ghost" data-card-reset>恢复示例</button></div>
        <div class="bc-fields">${CARD_FIELDS.map(field).join('')}<label class="bc-field"><span>二维码</span><input type="file" accept="image/*" data-card-qrfile></label></div>
        <div class="bc-exp"><details class="menu"><summary class="ui-btn outline">${I.download}导出<svg class="rb-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6l4 4 4-4"/></svg></summary><div class="menu-pop"><button type="button" data-card-png="front">正面 PNG<small>2104×1324</small></button><button type="button" data-card-png="back">背面 PNG<small>2104×1324</small></button><button type="button" data-card-svg="front">正面 SVG</button><button type="button" data-card-svg="back">背面 SVG</button></div></details><span class="why-tip" data-tip="示例信息为虚构，替换成自己的再导出。PNG 为 2104 × 1324（2 倍）；SVG 里的文字需要本机装有 IBM Plex Sans。修改只保存在这个浏览器里。" aria-label="示例信息为虚构，替换成自己的再导出。PNG 为 2104 × 1324（2 倍）；SVG 里的文字需要本机装有 IBM Plex Sans。修改只保存在这个浏览器里。">${I.info}</span></div></div></div>`;
    const tpl = `<div class="ba-tpls">${TPLS.map(([f, n, size, desc]) => `<figure class="ba-tpl"><a href="${asset('03-brand/templates/previews/' + f)}" target="_blank" rel="noopener"><img src="${asset('03-brand/templates/previews/' + f)}" alt="${n}" loading="lazy"></a><figcaption><b>${n}</b><span class="muted">${size}</span><p>${desc}</p></figcaption></figure>`).join('')}</div>`;
    const sizes = `<div class="ba-sizes">${SIZES.map(([p, s]) => `<div><span>${p}</span><code>${s}</code></div>`).join('')}</div>`;
    return docHead('品牌资产', '网址、二维码、名片和宣传物料模版。物料用哪种语言，就用同一种语言的网址和二维码。')
      + sec('links', '网址', '印刷物写成 www.tier0.cn / www.tier0.app，不带 https://。', links)
      + sec('qr', '二维码', '保持白底黑码和四周留白，不改颜色、不加 Logo、不裁切；印刷最小 2 cm。', qrs)
      + sec('card', '名片', '1052 × 662（约 89 × 56 mm，300 dpi），正面放个人信息，背面放品牌。', card)
      + sec('signature', '邮件签名', '650 × 165，左侧品牌面，右侧联系信息；版式取自 Figma 邮件模版。', vSignature())
      + sec('materials', '宣传物料', '源文件在 Figma「Tier0 设计素材」。换平台尺寸时保留同一套结构，按画幅重新排，不拉伸原图。', tpl)
      + sec('sizes', '各平台尺寸', '', sizes);
  }
  const imgCache = {};
  const loadImg = src => imgCache[src] || (imgCache[src] = new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; }));
  function qrMatrix(text) {
    if (!window.qrcode) return null;
    const q = window.qrcode(0, 'M'); q.addData(text || ' '); q.make();
    const n = q.getModuleCount(); return { n, at: (r, c) => q.isDark(r, c) };
  }
  // 名片的版式：坐标取自 Figma 画板（1052 × 662）
  function cardLayout(side, d, lang) {
    const L = { side, d, lang };
    if (side === 'back') return Object.assign(L, { bg: '#050B14', dot: 'rgba(255,255,255,0.07)' });
    return Object.assign(L, { bg: '#F4F3EF', dot: 'rgba(5,11,20,0.07)' });
  }
  async function drawCard(cv, side) {
    if (!cv) return;
    const d = cardData(), lang = CARD.lang, s = cv.width / CARD_W, c = cv.getContext('2d');
    c.setTransform(s, 0, 0, s, 0, 0);
    const L = cardLayout(side, d, lang);
    c.fillStyle = L.bg; c.fillRect(0, 0, CARD_W, CARD_H);
    c.fillStyle = L.dot; for (let y = 6; y < CARD_H; y += 12) for (let x = 6; x < CARD_W; x += 12) c.fillRect(x, y, 1.5, 1.5);
    const sans = '"IBM Plex Sans", "PingFang SC", "Microsoft YaHei", sans-serif';
    if (side === 'back') {
      c.fillStyle = '#B2ED1D'; c.fillRect(46, 78, 18, 18);
      c.font = `400 24px ${sans}`; c.fillStyle = '#A1A1A1'; c.textAlign = 'right'; c.textBaseline = 'top'; c.fillText(d.web, 1004, 80);
      c.fillText(CARD_DEF[lang].slogan, 1004, 548);
      try { const lg = await loadImg(asset('03-brand/logo/assets/tier0-logo-lime.svg')); c.drawImage(lg, 48, 475, 422, 422 * lg.naturalHeight / lg.naturalWidth); } catch {}
      c.textAlign = 'left'; return;
    }
    try { // T0 标记：取标准版 Logo 的首字母 T 和数字 0
      const lg = await loadImg(asset('03-brand/logo/assets/tier0-logo-black.svg'));
      const k = lg.naturalWidth / 422, h = 43, sc = h / (104 * k);
      c.drawImage(lg, 0, 0, 77 * k, lg.naturalHeight, 48, 80, 77 * k * sc, h);
      c.drawImage(lg, 344 * k, 0, 78 * k, lg.naturalHeight, 48 + 77 * k * sc + 8, 80, 78 * k * sc, h);
    } catch {}
    c.textAlign = 'left'; c.textBaseline = 'top';
    c.font = `600 30px ${sans}`; c.fillStyle = '#73B200'; c.fillText(d.name, 550, 76);
    c.font = `400 22px ${sans}`; c.fillStyle = '#878787'; c.fillText(d.title, 550, 116);
    // 二维码
    const qx = 861, qy = 73, qs = 143;
    c.fillStyle = '#FFFFFF'; c.fillRect(qx - 6, qy - 6, qs + 12, qs + 12);
    if (CARD.qrImg) c.drawImage(CARD.qrImg, qx, qy, qs, qs);
    else { const m = qrMatrix(CARD_DEF[lang].qr); if (m) { const u = qs / m.n; c.fillStyle = '#050B14'; for (let r = 0; r < m.n; r++) for (let q = 0; q < m.n; q++) if (m.at(r, q)) c.fillRect(qx + q * u, qy + r * u, u + 0.3, u + 0.3); } }
    // 信息行
    const rows = [['A.', d.addr], ['E.', d.email], ['W.', d.web], ['P.', d.phone]];
    const lines = rows.map(([, v]) => String(v).split('\n').length);
    const total = lines.reduce((a, b) => a + b, 0) * 34 + (rows.length - 1) * 10;
    let y = 582 - total;
    c.font = `400 24px ${sans}`;
    rows.forEach(([k, v], i) => { c.fillStyle = '#878787'; c.fillText(k, 48, y); c.fillStyle = '#050B14'; String(v).split('\n').forEach((ln, j) => c.fillText(ln, 550, y + j * 34)); y += lines[i] * 34 + 10; });
  }
  function cardSvg(side) {
    const d = cardData(), esc2 = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const sans = "'IBM Plex Sans','PingFang SC','Microsoft YaHei',sans-serif";
    const L = cardLayout(side, d, CARD.lang);
    let o = `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_W}" height="${CARD_H}" viewBox="0 0 ${CARD_W} ${CARD_H}"><defs><pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse"><rect x="6" y="6" width="1.5" height="1.5" fill="${L.dot}"/></pattern></defs><rect width="100%" height="100%" fill="${L.bg}"/><rect width="100%" height="100%" fill="url(#dots)"/>`;
    if (side === 'back') {
      o += `<rect x="46" y="78" width="18" height="18" fill="#B2ED1D"/><g font-family="${sans}" font-size="24" fill="#A1A1A1" text-anchor="end"><text x="1004" y="104">${esc2(d.web)}</text><text x="1004" y="572">${esc2(CARD_DEF[CARD.lang].slogan)}</text></g><image href="${CARD.logoLime || ''}" x="48" y="475" width="422" height="104"/>`;
    } else {
      const m = qrMatrix(CARD_DEF[CARD.lang].qr); let qr = '';
      if (CARD.qrImg) qr = `<image href="${CARD.qrImg.src}" x="861" y="73" width="143" height="143"/>`;
      else if (m) { const u = 143 / m.n; for (let r = 0; r < m.n; r++) for (let q = 0; q < m.n; q++) if (m.at(r, q)) qr += `<rect x="${(861 + q * u).toFixed(2)}" y="${(73 + r * u).toFixed(2)}" width="${(u + 0.3).toFixed(2)}" height="${(u + 0.3).toFixed(2)}"/>`; qr = `<g fill="#050B14">${qr}</g>`; }
      const rows = [['A.', d.addr], ['E.', d.email], ['W.', d.web], ['P.', d.phone]];
      const lines = rows.map(([, v]) => String(v).split('\n').length);
      let y = 582 - (lines.reduce((a, b) => a + b, 0) * 34 + 30) + 26, txt = '';
      rows.forEach(([k, v], i) => { txt += `<text x="48" y="${y}" fill="#878787">${k}</text>`; String(v).split('\n').forEach((ln, j) => { txt += `<text x="550" y="${y + j * 34}" fill="#050B14">${esc2(ln)}</text>`; }); y += lines[i] * 34 + 10; });
      o += `<image href="${CARD.markT0 || ''}" x="48" y="80" width="107" height="43"/><text x="550" y="104" font-family="${sans}" font-size="30" font-weight="600" fill="#73B200">${esc2(d.name)}</text><text x="550" y="140" font-family="${sans}" font-size="22" fill="#878787">${esc2(d.title)}</text><rect x="855" y="67" width="155" height="155" fill="#FFFFFF"/>${qr}<g font-family="${sans}" font-size="24">${txt}</g>`;
    }
    return o + '</svg>';
  }
  async function mountCard() {
    const f = document.getElementById('bc-front'); if (!f) return;
    await Promise.all([drawCard(f, 'front'), drawCard(document.getElementById('bc-back'), 'back')]);
  }
  async function svgDataUrl(p) { try { const r = await fetch(asset(p)); return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(await r.text()))); } catch { return asset(p); } }
  async function exportCardSvg(side) {
    if (!CARD.logoLime) CARD.logoLime = asset('03-brand/logo/assets/tier0-logo-lime.svg').startsWith('data:') ? asset('03-brand/logo/assets/tier0-logo-lime.svg') : await svgDataUrl('03-brand/logo/assets/tier0-logo-lime.svg');
    if (!CARD.markT0) { const cv = document.createElement('canvas'); cv.width = 214; cv.height = 86; const lg = await loadImg(asset('03-brand/logo/assets/tier0-logo-black.svg')); const k = lg.naturalWidth / 422, sc = 86 / lg.naturalHeight; const c = cv.getContext('2d'); c.drawImage(lg, 0, 0, 77 * k, lg.naturalHeight, 0, 0, 77 * k * sc, 86); c.drawImage(lg, 344 * k, 0, 78 * k, lg.naturalHeight, 77 * k * sc + 16, 0, 78 * k * sc, 86); CARD.markT0 = cv.toDataURL(); }
    download(new Blob([cardSvg(side)], { type: 'image/svg+xml' }), `tier0-card-${CARD.lang}-${side}.svg`);
  }

  // ---------- 邮件签名（版式取自 Figma「FREEZONEX 设计素材」邮件模版，650 × 165） ----------
  // 示例信息为虚构，替换成自己的再导出
  const SIG_W = 650, SIG_H = 165;
  const SIG_DEF = {
    zh: { name: '林一', title: '解决方案架构师', phone: '+86 138 0000 0000', email: 'lin.yi@freezonex.io', web: 'www.tier0.cn', addr: '杭州市滨江区宝龙中心 2801室' },
    en: { name: 'Alex Lin', title: 'Solutions Architect', phone: '+65 8000 0000', email: 'alex.lin@freezonex.io', web: 'www.tier0.app', addr: '1 Fusionopolis Link #03-03/03-04,\nNexus @One-North, Singapore 138542' },
  };
  const SIG_NOTE = { zh: '本邮件含受法律保护的保密信息，未经许可禁止转发或分享。', en: 'This email contains confidential information protected by law. Forwarding or sharing without permission is prohibited.' };
  const SIG_FIELDS = [['name', '姓名'], ['title', '职位'], ['phone', '电话'], ['email', '邮箱'], ['web', '网址'], ['addr', '地址', 1]];
  // lucide 图标路径（phone / mail / link / map-pin）
  const SIG_ICONS = {
    phone: ['M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384'],
    mail: ['m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7', 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'],
    link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
    pin: ['M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0', 'M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'],
  };
  const SIG = { lang: 'zh', data: null };
  const sigStore = { get() { try { return JSON.parse(localStorage.getItem('t0-sig') || 'null'); } catch { return null; } }, set(v) { try { localStorage.setItem('t0-sig', JSON.stringify(v)); } catch {} } };
  function sigData() { if (!SIG.data) SIG.data = sigStore.get() || JSON.parse(JSON.stringify(SIG_DEF)); return SIG.data[SIG.lang]; }
  function vSignature() {
    const d = sigData();
    const field = ([k, n, multi]) => `<label class="bc-field"><span>${n}</span>${multi ? `<textarea data-sig="${k}" rows="2">${esc(d[k])}</textarea>` : `<input data-sig="${k}" value="${esc(d[k])}">`}</label>`;
    const tip = '示例信息为虚构，替换成自己的再导出。PNG 为 1950 × 495（3 倍）；HTML 签名可直接粘贴到邮件客户端的签名设置里，Logo 以图片内嵌。修改只保存在这个浏览器里。';
    return `<div class="bc bc-sig"><div class="bc-stage"><canvas id="sig-cv" width="${SIG_W * 3}" height="${SIG_H * 3}" aria-label="邮件签名预览"></canvas></div>
      <div class="bc-panel"><div class="bc-top">${seg('siglang', [['zh', '中文'], ['en', 'English']], SIG.lang)}<button type="button" class="ui-btn ghost" data-sig-reset>恢复示例</button></div>
        <div class="bc-fields">${SIG_FIELDS.map(field).join('')}</div>
        <div class="bc-exp"><details class="menu"><summary class="ui-btn outline">${I.download}导出<svg class="rb-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6l4 4 4-4"/></svg></summary><div class="menu-pop"><button type="button" data-sig-png>PNG<small>1950×495</small></button><button type="button" data-sig-copy>复制 HTML 签名</button><button type="button" data-sig-html>下载 HTML</button></div></details><span class="why-tip" data-tip="${tip}" aria-label="${tip}">${I.info}</span></div></div></div>`;
  }
  async function drawSig() {
    const cv = document.getElementById('sig-cv'); if (!cv) return;
    const d = sigData(), s = cv.width / SIG_W, c = cv.getContext('2d');
    c.setTransform(s, 0, 0, s, 0, 0);
    const sans = '"IBM Plex Sans", "PingFang SC", "Microsoft YaHei", sans-serif', mono = '"IBM Plex Mono", "PingFang SC", monospace';
    c.fillStyle = '#050B14'; c.fillRect(0, 0, SIG_W, SIG_H);
    c.fillStyle = '#2F343B'; c.fillRect(199, 0, SIG_W - 199, SIG_H);
    try { const lg = await loadImg(asset('03-brand/logo/assets/tier0-logo-lime.svg')); const w = 111, h = w * lg.naturalHeight / lg.naturalWidth; c.drawImage(lg, 44, (SIG_H - h) / 2, w, h); } catch {}
    c.textBaseline = 'top'; c.textAlign = 'left';
    c.fillStyle = '#FFFFFF'; c.font = `400 20px ${sans}`; c.letterSpacing = '0.8px'; c.fillText(String(d.name).toUpperCase(), 230, 15); c.letterSpacing = '0px';
    c.fillStyle = '#B2ED1D'; c.font = `400 12px ${mono}`; c.fillText(d.title, 230, 43);
    const icon = (k, x, y) => { c.save(); c.translate(x, y); c.scale(16 / 24, 16 / 24); c.strokeStyle = '#B2ED1D'; c.lineWidth = 2; c.lineCap = 'round'; c.lineJoin = 'round'; SIG_ICONS[k].forEach(p => c.stroke(new Path2D(p))); c.restore(); };
    c.fillStyle = '#FFFFFF'; c.font = `300 9px ${sans}`;
    [['phone', d.phone, 72], ['mail', d.email, 94], ['link', d.web, 116]].forEach(([k, v, y]) => { icon(k, 230, y - 2); c.fillText(v, 256, y + 1); });
    icon('pin', 396, 77); String(d.addr).split('\n').forEach((ln, i) => c.fillText(ln, 422, 73 + i * 14));
    c.fillStyle = '#C0C0C0'; c.font = `300 7px ${sans}`; c.fillText(SIG_NOTE[SIG.lang], 230, 144);
  }
  // HTML 签名：表格 + 行内样式，邮件客户端兼容性最好
  function sigHtml() {
    const d = sigData(), e = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const cv = document.createElement('canvas'); cv.width = 333; cv.height = 81;
    const lgCanvas = cv.getContext('2d'); const lg = imgCache[asset('03-brand/logo/assets/tier0-logo-lime.svg')];
    return Promise.resolve(lg).then(img => { if (img) lgCanvas.drawImage(img, 0, 0, 333, 333 * img.naturalHeight / img.naturalWidth); const logo = cv.toDataURL('image/png');
      const font = "font-family:'IBM Plex Sans',Arial,'PingFang SC','Microsoft YaHei',sans-serif;";
      const row = (t) => `<tr><td style="padding:3px 0;${font}font-size:12px;color:#ffffff;">${t}</td></tr>`;
      return `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:650px;"><tr>
<td width="199" style="background:#050B14;text-align:center;vertical-align:middle;padding:0;"><img src="${logo}" width="111" alt="Tier0" style="display:inline-block;border:0;"></td>
<td style="background:#2F343B;padding:15px 24px 12px 31px;vertical-align:top;">
<div style="${font}font-size:20px;letter-spacing:0.8px;color:#ffffff;text-transform:uppercase;">${e(d.name)}</div>
<div style="font-family:'IBM Plex Mono',monospace;font-size:12px;color:#B2ED1D;margin:2px 0 12px;">${e(d.title)}</div>
<table cellpadding="0" cellspacing="0" border="0"><tr><td style="vertical-align:top;padding-right:24px;"><table cellpadding="0" cellspacing="0" border="0">${row('T&nbsp; ' + e(d.phone))}${row('E&nbsp; <a href="mailto:' + e(d.email) + '" style="color:#ffffff;text-decoration:none;">' + e(d.email) + '</a>')}${row('W&nbsp; <a href="https://' + e(String(d.web).replace(/^https?:\/\//, '')) + '" style="color:#ffffff;text-decoration:none;">' + e(d.web) + '</a>')}</table></td>
<td style="vertical-align:top;${font}font-size:12px;color:#ffffff;padding-top:3px;">${e(d.addr).replace(/\n/g, '<br>')}</td></tr></table>
<div style="${font}font-size:9px;color:#C0C0C0;margin-top:10px;">${e(SIG_NOTE[SIG.lang])}</div></td></tr></table>`; });
  }

  function vIllustration() {
    return docHead('插画与图形', '三种图形风格，分别用于解释原理、说明架构和品牌宣传。')
      + ILLUS.map(([id, n, d, imgs, rules]) => sec('il-' + id, n, d, `<div class="il-grid il-${id}">${imgs.map(([f0, cap]) => { const f = lang === 'en' && IL_EN.includes(f0) ? f0 + '-en' : f0; return `<figure class="il-fig"><a href="${asset('assets/brand/' + f + '.jpg')}" target="_blank" rel="noopener"><img src="${asset('assets/brand/' + f + '.jpg')}" alt="${esc(cap)}" loading="lazy"></a><figcaption>${esc(cap)}</figcaption></figure>`; }).join('')}</div>`)).join('');
  }


  // ---------- 数据光束网格（来自 Framer 组件 03-brand/texture/datalines-grid.tsx） ----------
  const DL_DEF = { beamColor: '#B2ED1D', gridColor: '#A3A3A3', cellSize: 50, maxLines: 12, baseSpeed: 2, lineLength: 150, spawnProbability: 0.1 };
  const dl = Object.assign({}, DL_DEF);
  const DL_SL = [['cellSize', '格子', 24, 120, 2, 'px'], ['maxLines', '光束数量', 1, 40, 1, ''], ['baseSpeed', '速度', 1, 8, 1, ''], ['lineLength', '拖尾', 40, 400, 10, 'px'], ['spawnProbability', '出现频率', 0.02, 0.5, 0.02, '']];
  const dlAlpha = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`; };
  function vDatalines() {
    const sl = ([k, n, min, max, step, u]) => `<label class="lab-sl" style="--f:${((dl[k] - min) / (max - min)) * 100}%"><span>${n}</span><input type="range" data-dl="${k}" min="${min}" max="${max}" step="${step}" value="${dl[k]}"><em>${dl[k]}${u}</em></label>`;
    return `<div class="dl"><div class="dl-stage"><div class="dl-pane" data-dl-pane="light"><canvas></canvas></div><div class="dl-pane dark" data-dl-pane="dark"><canvas></canvas></div></div>
      <div class="dl-panel"><div class="lab-grid">${DL_SL.map(sl).join('')}
        <label class="lab-sl lab-color"><span>光束</span><em>${dl.beamColor}</em><input type="color" data-dl="beamColor" value="${dl.beamColor}"></label>
        <label class="lab-sl lab-color"><span>网格</span><em>${dl.gridColor}</em><input type="color" data-dl="gridColor" value="${dl.gridColor}"></label></div>
        <div class="dl-act"><button type="button" class="ui-btn outline" data-dl-copy>${I.copy}复制代码</button><button type="button" class="ui-btn ghost" data-dl-dl>${I.download}下载 .js</button><p class="dl-use">不依赖框架：<code>mountDatalinesGrid(容器, 参数)</code>，参数和左边的控件一一对应。</p></div></div></div>`;
  }
  const DLRT = { raf: 0, open: false };
  document.addEventListener('toggle', e => { if (e.target.classList && e.target.classList.contains('dl-fold')) DLRT.open = e.target.open; }, true);
  function mountDatalines() {
    const panes = [...document.querySelectorAll('[data-dl-pane]')]; if (!panes.length) return;
    cancelAnimationFrame(DLRT.raf);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const st = panes.map(el => ({ el, cv: el.querySelector('canvas'), lines: [] }));
    const frame = () => {
      if (!panes[0].isConnected) return;
      for (const p of st) {
        const W = p.el.clientWidth, H = p.el.clientHeight, dpr = Math.min(2, devicePixelRatio || 1), cs = dl.cellSize;
        p.el.style.backgroundImage = `linear-gradient(to right, ${dlAlpha(dl.gridColor, p.el.classList.contains('dark') ? 0.25 : 0.45)} 1px, transparent 1px), linear-gradient(to bottom, ${dlAlpha(dl.gridColor, p.el.classList.contains('dark') ? 0.25 : 0.45)} 1px, transparent 1px)`;
        p.el.style.backgroundSize = `${cs}px ${cs}px`;
        if (p.cv.width !== Math.floor(W * dpr) || p.cv.height !== Math.floor(H * dpr)) { p.cv.width = Math.floor(W * dpr); p.cv.height = Math.floor(H * dpr); }
        const c = p.cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, W, H);
        if (reduced) continue;
        if (Math.random() < dl.spawnProbability && p.lines.length < dl.maxLines) p.lines.push({ x: Math.floor(Math.random() * (W / cs)) * cs, y: -cs, h: [], dx: 0, dy: 1, sp: dl.baseSpeed, len: Math.floor(Math.random() * dl.lineLength * 0.5 + dl.lineLength * 0.75) });
        for (const l of p.lines) {
          l.h.push({ x: l.x, y: l.y }); if (l.h.length > Math.max(2, Math.ceil(l.len / l.sp))) l.h.shift();
          l.x += l.dx * l.sp; l.y += l.dy * l.sp;
          if (l.x % cs === 0 && l.y % cs === 0) { const maxX = Math.floor(W / cs) * cs;
            if (l.x <= 0 && l.dx === -1) { l.dx = 0; l.dy = 1; } else if (l.x >= maxX && l.dx === 1) { l.dx = 0; l.dy = 1; } else if (l.dy === 1) { if (Math.random() < 0.3) { l.dy = 0; l.dx = Math.random() < 0.5 ? 1 : -1; } } else if (Math.random() < 0.6) { l.dy = 1; l.dx = 0; } }
          if (l.h.length < 2) continue;
          const t = l.h, a = t[0], b = t[t.length - 1];
          c.lineCap = 'round'; c.lineJoin = 'round'; c.lineWidth = 1.5;
          const g = c.createLinearGradient(a.x, a.y, b.x, b.y); g.addColorStop(0, dlAlpha(dl.beamColor, 0)); g.addColorStop(0.6, dlAlpha(dl.beamColor, 0.35)); g.addColorStop(1, dlAlpha(dl.beamColor, 0.9));
          c.beginPath(); c.moveTo(t[0].x, t[0].y); for (let i = 1; i < t.length; i++) c.lineTo(t[i].x, t[i].y); c.strokeStyle = g; c.shadowBlur = 0; c.stroke();
          const hi = Math.max(0, t.length - 1 - Math.max(2, Math.ceil(20 / Math.max(1, l.sp))));
          c.beginPath(); c.moveTo(t[hi].x, t[hi].y); for (let i = hi + 1; i < t.length; i++) c.lineTo(t[i].x, t[i].y); c.strokeStyle = dlAlpha(dl.beamColor, 0.95); c.shadowColor = dl.beamColor; c.shadowBlur = 12; c.stroke(); c.shadowBlur = 0;
        }
        p.lines = p.lines.filter(l => !(l.h[0] && l.h[0].y >= H + cs * 2));
      }
      DLRT.raf = requestAnimationFrame(frame);
    };
    DLRT.raf = requestAnimationFrame(frame);
  }
  async function dlSource() { if (!DLRT.src) DLRT.src = await tryFetch('03-brand/texture/datalines-grid.js', 'text'); return DLRT.src || ''; }

  // ---------- texture ----------
  // [key, 名称, 含义与用途, 亮色 CSS, 暗色 CSS（可省略，省略时用品牌绿低透明度）]
  const TEXTURES = [
    ['fine', '细点阵', '最小单位的规则排列，代表稳定和秩序。', 'background-image: radial-gradient(currentColor 0.7px, transparent 1px); background-size: 6px 6px;'],
    ['dots', '点阵', '细密、均匀的点状纹理，为背景提供轻量的秩序感。', 'background-image: radial-gradient(currentColor 1px, transparent 1.5px); background-size: 12px 12px;'],
    ['peg', '洞洞板', '源自工业工作台的洞洞板，以更大、更疏的孔位呈现结构感。', 'background-image: radial-gradient(circle, currentColor 2px, transparent 2.6px); background-size: 20px 20px;'],
    ['grid', '网格', '工程图纸的格子，代表结构和对齐。', 'background-image: linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px); background-size: 24px 24px;'],
    ['ruler', '刻度', '量具上的刻度，代表测量和精度。', 'background-image: linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px); background-size: 40px 20px, 8px 8px; background-repeat: repeat-x; background-position: 0 0, 0 0;'],
    ['hatch', '斜线', '表示保留、不可用或还没建好的区域。', 'background-image: repeating-linear-gradient(-45deg, currentColor 0 1px, transparent 1px 8px);'],
    ['metal', '拉丝金属', '设备外壳和铝型材的表面，代表实物和硬件。', 'background-color: #DADDE1; background-image: repeating-linear-gradient(0deg, rgba(255,255,255,0.35) 0 1px, rgba(0,0,0,0.04) 1px 2px, transparent 2px 3px), linear-gradient(90deg, #C7CBD0, #EEF0F2 35%, #BFC4CA 65%, #E4E7EA);', 'background-color: #1E2227; background-image: repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 1px, rgba(0,0,0,0.25) 1px 2px, transparent 2px 3px), linear-gradient(90deg, #1A1D21, #33383F 35%, #202429 65%, #2C3137);'],
    ['corrugated', '瓦楞', '集装箱和仓库外墙的瓦楞板，代表物流和仓储。', 'background-color: #E3E6E9; background-image: repeating-linear-gradient(90deg, #D2D6DB 0, #F2F4F6 7px, #C5CAD0 14px);', 'background-color: #1A1D21; background-image: repeating-linear-gradient(90deg, #15181C 0, #2B3036 7px, #121418 14px);'],
  ];
  const TX_GROUPS = [['dot', '点阵', ['fine', 'dots', 'peg']], ['line', '网格与刻度', ['grid', 'ruler']], ['hatch', '斜线', ['hatch']], ['real', '实物材质', ['metal', 'corrugated']]];
  let txGroup = 'dot';
  function vTexture() {
    const card = ([k, n, d, css, dark]) => `<div class="tx-card"><div class="tx-stage"><div class="tx-fill" style="${css}"></div><div class="tx-fill${dark ? '' : ' tx-lime'}" style="${dark || css}"></div></div><div class="tx-body"><b>${n}</b><span>${d}</span></div>${foot(css)}</div>`;
    const grp = TX_GROUPS.find(g => g[0] === txGroup) || TX_GROUPS[0];
    return docHead('Texture', '纹理来自工厂里真实的表面：洞洞板、图纸、量具、金属、瓦楞板。')
      + sec('lab', '材质实验', '把图片、视频或标志转成冲孔点阵、瓦楞条纹、抖动或字符画，用于海报、开场视频和官网背景。', vTextureLab())
      + sec('list', '纹理', '点击卡片底部复制 CSS。', `<div class="tx-tabs">${seg('txgroup', TX_GROUPS.map(g => [g[0], g[1]]), grp[0])}</div><div class="tx-grid">${TEXTURES.filter(t => grp[2].includes(t[0])).map(card).join('')}</div>${grp[0] === 'line' ? `<details class="dl-fold"${DLRT.open ? ' open' : ''}><summary><span><b>网格拓展 · 数据光束</b><small>品牌绿光束沿网格线流动，代表数据在系统之间流转。用于官网首屏、活动页和开场背景；产品界面不用。</small></span><svg class="rb-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6l4 4 4-4"/></svg></summary>${vDatalines()}</details>` : ''}`)
  }


  // ---------- logo ----------
  const LOGOS = [['tier0-logo-black.svg', '标准版', '#FFFFFF'], ['tier0-logo-black.svg', '浅灰底', '#FAFAFA'], ['tier0-logo-white.svg', '反白版', '#050B14'], ['tier0-logo-lime.svg', '品牌绿版', '#050B14']];
  const SCAFFOLD_REPO = 'https://github.com/FREEZONEX/Tier0-App-Scaffold';
  const FE_REPO = 'https://github.com/FREEZONEX/Tier0-Frontend';
  // 字标路径（与 03-brand/logo 一致）；字母用 currentColor，0 用 --logo-zero
  const LOGO_P = [
    ['t', 'M37.683 123.39V14.7228H0V0.701172H91.1404V14.7228H53.4573V123.39H37.683Z'],
    ['i', 'M97.1992 124.091V110.07L119.108 109.193V14.8979L97.1992 14.0216V0L126.995 1.40216L156.791 0V14.0216L134.882 14.8979V109.193L156.791 110.07V124.091L126.995 122.689L97.1992 124.091Z'],
    ['e', 'M169.881 123.39V0.701172H254.01V14.7228H185.655V53.2822H245.247V67.3038H185.655V109.369H255.763V123.39H169.881Z'],
    ['r', 'M282.069 67.3038H343.414V14.7228H282.069V67.3038ZM359.188 14.7228V67.3038L347.445 79.0468L368.828 123.39H351.827L332.021 81.3254H282.069V123.39H266.295V0.701172H345.166L359.188 14.7228Z'],
    ['z', 'M411.795 109.369V14.7228L425.816 0.701172H490.666L504.688 14.7228V109.369L490.666 123.39H425.816L411.795 109.369ZM427.569 14.7228V109.369H488.914V14.7228H427.569Z'],
  ];
  const download = (blob, name) => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); };
  const logoSvg = cls => `<svg class="t0-logo ${cls || ''}" viewBox="-4 -4 513 133" role="img" aria-label="Tier0"><g class="lg-all">${LOGO_P.map(([k, d]) => `<path class="lg-${k}" d="${d}" pathLength="1"/>`).join('')}<circle class="lg-ring" cx="458" cy="62" r="9"/><circle class="lg-ring" cx="458" cy="62" r="9"/><rect class="lg-dot" x="449" y="53" width="18" height="18"/></g></svg>`;
  // 时间轴（毫秒），网页动画与 Lottie 导出共用
  const LG = { MID: -206, T0X: 302, T0MID: -151, DOT_IN: 240, HALO: [200, 900], HALO_D: 1500, Z_AT: 1500, Z_D: 1000, T_AT: 2950, SHIFT: [2600, 3000], OPEN: 3500, OPEN_D: 800, IER_AT: 4250, IER_GAP: 110, FLICK_D: 420, END: 5000 };
  const EZ = { std: [0.4, 0, 0.2, 1], enter: [0, 0, 0.2, 1] };
  const cb = a => `cubic-bezier(${a.join(',')})`;
  // 闪动：只改透明度，像信号接通时的明灭
  const FLICK = [[0, 0], [0.2, 1], [0.4, 0.15], [0.6, 1], [0.75, 0.5], [1, 1]];
  function playLogo(svg) {
    if (!svg || !svg.animate || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const q = c => svg.querySelector(c), qa = c => [...svg.querySelectorAll(c)];
    svg.getAnimations({ subtree: true }).forEach(a => a.cancel());
    const A = (el, kf, o) => el.animate(kf, Object.assign({ fill: 'both' }, o));
    const fl = FLICK.map(([o, v]) => ({ offset: o, opacity: v }));
    const total = LG.OPEN + LG.OPEN_D;
    A(q('.lg-all'), [
      { transform: `translateX(${LG.MID}px)` },
      { transform: `translateX(${LG.MID}px)`, offset: LG.SHIFT[0] / total, easing: cb(EZ.std) },
      { transform: `translateX(${LG.T0MID}px)`, offset: LG.SHIFT[1] / total },
      { transform: `translateX(${LG.T0MID}px)`, offset: LG.OPEN / total, easing: cb(EZ.std) },
      { transform: 'none' },
    ], { duration: total });
    // 1. 数据点：出现后轻轻呼吸两次，像在加载；描 0 时收起
    A(q('.lg-dot'), [
      { transform: 'scale(0)', opacity: 1, easing: cb(EZ.enter) },
      { transform: 'scale(1)', offset: 0.1, easing: 'ease-in-out' },
      { transform: 'scale(0.78)', offset: 0.3, easing: 'ease-in-out' },
      { transform: 'scale(1)', offset: 0.5, easing: 'ease-in-out' },
      { transform: 'scale(0.78)', offset: 0.7, easing: 'ease-in-out' },
      { transform: 'scale(1)', opacity: 1, offset: 0.82, easing: cb(EZ.std) },
      { transform: 'scale(0.4)', opacity: 0 },
    ], { duration: 2200 });
    // 2. 信号：柔和的光晕向外散开，不画硬边圆环
    qa('.lg-ring').forEach((r, n) => A(r, [{ transform: 'scale(1)', opacity: 0.8, strokeWidth: 3 }, { transform: 'scale(2.6)', opacity: 0.45, strokeWidth: 1.5, offset: 0.35 }, { transform: 'scale(5)', opacity: 0, strokeWidth: 0.5 }], { duration: LG.HALO_D, delay: LG.HALO[n], easing: cb(EZ.enter), fill: 'none' }));
    // 3. 描出 0
    A(q('.lg-z'), [{ strokeDashoffset: 1, strokeWidth: 3, fillOpacity: 0 }, { strokeDashoffset: 0, strokeWidth: 3, fillOpacity: 0, offset: 0.75 }, { strokeDashoffset: 0, strokeWidth: 0, fillOpacity: 1 }], { duration: LG.Z_D, delay: LG.Z_AT, easing: cb(EZ.std) });
    // 4. T 闪动出现组成 T0；展开时回到原位
    A(q('.lg-t'), [{ transform: `translateX(${LG.T0X}px)` }, { transform: `translateX(${LG.T0X}px)`, offset: LG.OPEN / total, easing: cb(EZ.std) }, { transform: 'none' }], { duration: total });
    A(q('.lg-t'), fl, { duration: LG.FLICK_D, delay: LG.T_AT, easing: 'linear' });
    // 5. T 回到原位后，I、E、R 依次闪动出现，不与 T 重叠
    ['.lg-i', '.lg-e', '.lg-r'].forEach((c, n) => A(q(c), fl, { duration: LG.FLICK_D, delay: LG.IER_AT + n * LG.IER_GAP, easing: 'linear' }));
  }

  // ---------- 导出：透明底 WebM 与 Lottie ----------
  const LOGO_COLORS = { light: { ink: '#050B14', zero: '#73B200' }, dark: { ink: '#FFFFFF', zero: '#B2ED1D' } };
  function exportLogoWebm(btn, theme) {
    const C = LOGO_COLORS[theme], W = 1920, H = 1080, S = 3; // 字标宽约 1540px
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');
    const stage = document.createElement('div'); stage.style.cssText = 'position:fixed;left:-10000px;top:0;width:513px'; stage.innerHTML = logoSvg(); document.body.appendChild(stage);
    const svg = stage.firstChild; svg.style.cssText = `width:513px;height:133px;color:${C.ink};--logo-zero:${C.zero}`;
    const mime = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'].find(m => MediaRecorder.isTypeSupported(m));
    const rec = new MediaRecorder(cv.captureStream(60), { mimeType: mime, videoBitsPerSecond: 16e6 }); const chunks = [];
    rec.ondataavailable = e => chunks.push(e.data);
    rec.onstop = () => { stage.remove(); download(new Blob(chunks, { type: 'video/webm' }), `tier0-logo-${theme}.webm`); btn.disabled = false; btn.innerHTML = btn.dataset.label; };
    const paths = new Map([...svg.querySelectorAll('path')].map(p => [p, new Path2D(p.getAttribute('d'))]));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const allX = new DOMMatrix(getComputedStyle(svg.querySelector('.lg-all')).transform).e;
      ctx.save(); ctx.translate((W - 513 * S) / 2, (H - 133 * S) / 2); ctx.scale(S, S); ctx.translate(4 + allX, 4);
      svg.querySelectorAll('circle, rect, path').forEach(el => {
        const cs = getComputedStyle(el), op = +cs.opacity; if (op <= 0.001) return;
        ctx.save(); ctx.globalAlpha = op;
        const m = new DOMMatrix(cs.transform === 'none' ? undefined : cs.transform);
        if (el.tagName === 'path') {
          ctx.translate(m.e, 0); const zero = el.classList.contains('lg-z'), col = zero ? C.zero : C.ink;
          const fo = zero ? +cs.fillOpacity : 1; if (fo > 0) { ctx.globalAlpha = op * fo; ctx.fillStyle = col; ctx.fill(paths.get(el), 'evenodd'); }
          const sw = parseFloat(cs.strokeWidth) || 0;
          if (zero && sw > 0) { const len = el.getTotalLength(); ctx.globalAlpha = op; ctx.strokeStyle = col; ctx.lineWidth = sw; ctx.setLineDash([len, len]); ctx.lineDashOffset = parseFloat(cs.strokeDashoffset) * len; ctx.stroke(paths.get(el)); }
        } else {
          const cx = 458, cy = 62, s = m.a || 1; ctx.translate(cx, cy); ctx.scale(s, s); ctx.translate(-cx, -cy); ctx.fillStyle = C.zero;
          if (el.tagName === 'rect') ctx.fillRect(449, 53, 18, 18); else { ctx.strokeStyle = C.zero; ctx.lineWidth = (parseFloat(cs.strokeWidth) || 1) / s / S; ctx.beginPath(); ctx.arc(cx, cy, 9, 0, 6.2832); ctx.stroke(); }
        }
        ctx.restore();
      });
      ctx.restore();
    };
    btn.disabled = true; btn.dataset.label = btn.innerHTML; btn.textContent = '正在录制…';
    rec.start(); playLogo(svg);
    const t0 = performance.now();
    const loop = () => { draw(); if (performance.now() - t0 < LG.END) requestAnimationFrame(loop); else rec.stop(); };
    requestAnimationFrame(loop);
  }
  function exportLogoLottie(theme) {
    const C = LOGO_COLORS[theme], FR = 60, f = ms => Math.round(ms / 1000 * FR);
    const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).concat(1);
    const st = v => ({ a: 0, k: v });
    // 关键帧：[ms, 值, 缓动(数组或 'hold'/'linear')]
    const kf = list => ({ a: 1, k: list.map(([t, v, e], i) => { const k = { t: f(t), s: Array.isArray(v) ? v : [v] }; if (i < list.length - 1) { if (e === 'hold') k.h = 1; else { const b = e === 'linear' || !e ? [0, 0, 1, 1] : e; k.o = { x: [b[0]], y: [b[1]] }; k.i = { x: [b[2]], y: [b[3]] }; } } return k; }) });
    const shape = d => { const subs = []; let cur = null, x = 0, y = 0; d.replace(/([MLHVZ])([^MLHVZ]*)/gi, (_, c, a) => { const n = a.trim().split(/[\s,]+/).filter(Boolean).map(Number); if (c === 'M') { cur = []; subs.push(cur); x = n[0]; y = n[1]; cur.push([x, y]); } else if (c === 'L') { for (let i = 0; i < n.length; i += 2) { x = n[i]; y = n[i + 1]; cur.push([x, y]); } } else if (c === 'H') { x = n[0]; cur.push([x, y]); } else if (c === 'V') { y = n[0]; cur.push([x, y]); } return ''; });
      return subs.map(v => ({ ty: 'sh', ks: st({ c: true, v, i: v.map(() => [0, 0]), o: v.map(() => [0, 0]) }) })); };
    const tr = (o = {}) => Object.assign({ ty: 'tr', p: st([0, 0]), a: st([0, 0]), s: st([100, 100]), r: st(0), o: st(100) }, o);
    const flick = at => kf(FLICK.map(([o, v], i) => [at + o * LG.FLICK_D, v * 100, 'linear']).reduce((a, k) => a.concat([k]), [[0, 0, 'hold']]));
    const total = LG.OPEN + LG.OPEN_D;
    let ind = 1;
    const layer = (nm, shapes, ks) => ({ ddd: 0, ind: ind++, ty: 4, nm, parent: 1, sr: 1, ks: Object.assign({ o: st(100), r: st(0), p: st([0, 0, 0]), a: st([0, 0, 0]), s: st([100, 100, 100]) }, ks), ao: 0, shapes, ip: 0, op: f(LG.END), st: 0, bm: 0 });
    const P = Object.fromEntries(LOGO_P);
    const nul = { ddd: 0, ind: ind++, ty: 3, nm: 'logo', sr: 1, ks: { o: st(100), r: st(0), a: st([0, 0, 0]), s: st([200, 200, 100]),
      p: kf([[0, [95 + 2 * LG.MID, 76, 0], 'hold'], [LG.SHIFT[0], [95 + 2 * LG.MID, 76, 0], EZ.std], [LG.SHIFT[1], [95 + 2 * LG.T0MID, 76, 0], 'hold'], [LG.OPEN, [95 + 2 * LG.T0MID, 76, 0], EZ.std], [total, [95, 76, 0]]]) }, ao: 0, ip: 0, op: f(LG.END), st: 0 };
    const fill = (c, o) => ({ ty: 'fl', c: st(rgb(c)), o: o || st(100), r: 2 });
    const layers = [nul];
    ['r', 'e', 'i'].forEach((k, n) => layers.push(layer(k.toUpperCase(), [{ ty: 'gr', it: [...shape(P[k]), fill(C.ink), tr()] }], { o: flick(LG.IER_AT + (2 - n) * LG.IER_GAP) })));
    layers.push(layer('T', [{ ty: 'gr', it: [...shape(P.t), fill(C.ink), tr()] }], { o: flick(LG.T_AT), p: kf([[0, [LG.T0X, 0, 0], 'hold'], [LG.OPEN, [LG.T0X, 0, 0], EZ.std], [total, [0, 0, 0]]]) }));
    const zAt = LG.Z_AT, zDraw = zAt + LG.Z_D * 0.75, zEnd = zAt + LG.Z_D;
    layers.push(layer('0', [{ ty: 'gr', it: [...shape(P.z),
      { ty: 'st', c: st(rgb(C.zero)), o: st(100), w: kf([[0, 3, 'hold'], [zDraw, 3, EZ.std], [zEnd, 0]]), lc: 1, lj: 1, ml: 4 },
      { ty: 'tm', s: st(0), e: kf([[0, 0, 'hold'], [zAt, 0, EZ.std], [zDraw, 100]]), o: st(0), m: 1 },
      fill(C.zero, kf([[0, 0, 'hold'], [zDraw, 0, EZ.std], [zEnd, 100]])), tr()] }]));
    const dotA = [458, 62, 0];
    layers.push(layer('dot', [{ ty: 'gr', it: [{ ty: 'rc', p: st([0, 0]), s: st([18, 18]), r: st(0) }, fill(C.zero), tr()] }], { p: st(dotA),
      s: kf([[0, [0, 0, 100], EZ.enter], [220, [100, 100, 100], 'linear'], [660, [78, 78, 100], 'linear'], [1100, [100, 100, 100], 'linear'], [1540, [78, 78, 100], 'linear'], [1800, [100, 100, 100], EZ.std], [2200, [40, 40, 100]]]),
      o: kf([[0, 100, 'hold'], [1800, 100, EZ.std], [2200, 0]]) }));
    LG.HALO.forEach((at, n) => layers.push(layer('signal ' + (n + 1), [{ ty: 'gr', it: [{ ty: 'el', p: st([0, 0]), s: st([18, 18]) }, { ty: 'st', c: st(rgb(C.zero)), o: st(100), w: kf([[0, 1.5, 'hold'], [at, 1.5, EZ.enter], [at + LG.HALO_D, 0.05]]), lc: 2, lj: 2 }, tr()] }], { p: st(dotA),
      s: kf([[0, [100, 100, 100], 'hold'], [at, [100, 100, 100], EZ.enter], [at + LG.HALO_D, [500, 500, 100]]]),
      o: kf([[0, 0, 'hold'], [at, 80, EZ.enter], [at + LG.HALO_D, 0]]) })));
    const json = { v: '5.7.4', fr: FR, ip: 0, op: f(LG.END), w: 1200, h: 400, nm: 'Tier0 logo', ddd: 0, assets: [], layers };
    download(new Blob([JSON.stringify(json)], { type: 'application/json' }), `tier0-logo-${theme}.json`);
  }

  let lgTheme = 'light';
  function vLogo() {
    return docHead('Logo', '字标用 Tektur 绘制，交付时为路径。只放在下面四种底色上；页面上出现时一律用 SVG。')
      + sec('motion', '动效', '从一个数据点开始，长成完整的 Tier0：数据只接一次，之后到处可用。节奏克制，只有明灭和位移，没有回弹和炫光。用于开场、视频和演示。', `<div class="spec"><div class="spec-body logo-mo">${logoSvg('play')}</div><div class="spec-foot"><span class="lg-exp"><button type="button" class="ui-btn outline" data-logo-replay>${I.replay}重播</button><span class="spacer"></span><details class="menu"><summary class="ui-btn outline">${I.download}导出<svg class="rb-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6l4 4 4-4"/></svg></summary><div class="menu-pop">${[['light', '亮色'], ['dark', '暗色']].map(([t, n]) => `<span class="menu-h">${n}</span><button type="button" data-logo-webm="${t}">透明视频 WebM<small>1920×1080</small></button><button type="button" data-logo-lottie="${t}">Lottie JSON<small>1200×400 · 60fps</small></button>`).join('')}</div></details></span></div></div>`)
      + sec('variants', '版本', '', `<div class="logo-grid">${LOGOS.map(([f, n, bg]) => `<div class="logo-card"><div class="stage" style="background:${bg}"><img alt="Tier0 ${n}" src="${asset('03-brand/logo/assets/' + f)}"></div><div class="foot"><span>${n}<span class="muted"> · ${bg}</span></span><a class="ui-btn ghost" href="${asset('03-brand/logo/assets/' + f)}" download="${f}">${I.download}下载 SVG</a></div></div>`).join('')}</div>`);
  }

  // ---------- skills ----------
  const sk = { id: 'tier0-design', brief: '做一页展示 Line-01 实时状态的看板' };
  function skPrompt() {
    const s = SKILLS.find(x => x.id === sk.id);
    return `/${s.id}\n\n需求：${sk.brief}\n\n要求：\n- 先读 .agents/skills/tier0-design/SKILL.md，再读 DESIGN.md\n- 产品界面用 02-components 里的 @tier0/ui 组件，用法见 02-components/guidelines\n- 颜色、字体、间距只用 DESIGN.md 里的 token\n- 原型的状态切换放进右下角「原型控制」\n- 完成后对照 DESIGN.md 的 Do's and Don'ts 和 skill 的自查清单检查`;
  }
  function vSkills() {
    const s = SKILLS.find(x => x.id === sk.id);
    return docHead('Skills', '把设计系统交给 AI：写下需求，复制指令发给 Agent。Agent 会先读 tier0-design，再按任务读 DESIGN.md 的对应章节。')
      + sec('try', '试用', esc(s.desc), `<div class="spec"><div class="spec-bar">${seg('skill', SKILLS.map(x => [x.id, x.zh]), sk.id)}</div>
          <div class="spec-body" style="display:grid;gap:16px"><div class="ui-field" style="width:100%;max-width:640px"><label class="ui-label" for="sk-brief">需求</label><input class="ui-input" id="sk-brief" value="${esc(sk.brief)}"></div><div id="sk-out">${codeBlock(skPrompt())}</div></div></div>`)
      + sec('files', '文件结构', '', codeBlock(`.agents/skills/${s.id}/\n├── SKILL.md\n├── references/\n├── assets/\n├── examples/\n└── gotchas.md`));
  }

  function vSoon(id) {
    const item = NAV.flatMap(g => g.items).find(i => i[0] === id);
    return docHead(item ? item[1] : id, '这一部分还在梳理中，确定后会出现在这里。');
  }

  // ---------- DESIGN.md ----------
  function vDesignMd() {
    const t = D.designmd;
    if (!t) return docHead('DESIGN.md', '没有读取到 DESIGN.md。');
    const fm = (t.match(/^---\n([\s\S]*?)\n---/) || [, ''])[1];
    const body = t.replace(/^---\n[\s\S]*?\n---\n?/, '').replace(/^# .*\n/m, '').replace(/^> 本文件由.*\n/m, '');
    const actions = `<button type="button" class="ui-btn outline" data-dm-copy>${I.copy}复制全文</button><button type="button" class="ui-btn outline" data-dm-ai>${I.copy}发给 AI</button>`;
    return docHead('DESIGN.md', '给 AI 和设计工具读的设计说明：开头是机器可读的 token，后面按 Overview、Colors、Typography、Layout、Elevation & Depth、Shapes、Components、Do\'s and Don\'ts 八段写取值和规则。组件的逐条用法在 02-components/guidelines。', actions)
      + sec('tokens', 'Token', '', codeBlock(fm))
      + sec('guide', '说明', '', `<div class="prose dm-prose">${md(body)}</div>`);
  }

  // ---------- router ----------
  function buildToc() {
    const hs = [...document.querySelectorAll('.doc .sec[id] > h2, .prose h2')];
    hs.forEach((h, i) => { if (!h.id && !h.parentElement.id) h.id = 'sec-' + i; });
    const toc = document.getElementById('toc');
    if (hs.length < 2) { toc.innerHTML = ''; buildToc.spy = null; return; }
    toc.innerHTML = '<div class="toc-in">' + hs.map(h => { const id = h.parentElement.id && h.parentElement.classList.contains('sec') ? h.parentElement.id : h.id; return `<a href="#${current}" data-jump="${id}">${esc(h.textContent)}</a>`; }).join('') + '</div>';
    const links = [...toc.querySelectorAll('a')];
    buildToc.spy = () => { let on = links[0]; hs.forEach((h, i) => { if (h.getBoundingClientRect().top < 160) on = links[i]; }); links.forEach(a => a.classList.toggle('on', a === on)); };
    buildToc.spy();
  }
  // ---------- token 页面公用 ----------
  const px = v => parseFloat(v) || 0;
  const tokVal = (doc, v) => { let x = v; for (let i = 0; i < 4 && typeof x === 'string' && x[0] === '{'; i++) { const n = walk(doc, x) || walk(D.spacing, x); x = n ? n.$value : x; } return x; };
  const why = o => (ext(o).rationale ? `<span class="why-tip" data-tip="${esc(ext(o).rationale)}" aria-label="${esc(ext(o).rationale)}">${I.info}</span>` : '');
  const feOf = o => { const f = ext(o).frontend; return f ? esc(f.tailwind || f.component || '') : ''; };
  const rulesOf = doc => (doc && ext(doc).rules) || [];
  const rulesBox = list => `<details class="rules-box"><summary><span class="rb-h"><svg class="rb-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6l4 4 4-4"/></svg>注意事项</span><button type="button" class="ui-btn ghost" data-copy="${esc(list.map((r, i) => `${i + 1}. ${r}`).join('\n'))}">${I.copy}复制全部</button></summary><ol class="rules">${list.map(r => `<li>${esc(r)}</li>`).join('')}</ol></details>`;
  const ruleList = doc => rulesBox(rulesOf(doc));
  const tokTable = (doc, group, prefix, visual, sort) => `<div class="tk-table">${(sort ? entries(group).sort((x, y) => px(tokVal(doc, x[1].$value)) - px(tokVal(doc, y[1].$value))) : entries(group)).map(([k, o]) => { const v = tokVal(doc, o.$value); return `<button type="button" class="tk-row" data-copy="${esc(String(v))}"><span class="tk-vis">${visual(v, k, o)}</span><span class="tk-name"><code>${prefix}${k}</code><small>${esc(o.$description || '')}${why(o)}</small></span><span class="tk-val">${esc(Array.isArray(v) ? 'cubic-bezier(' + v.join(', ') + ')' : String(v))}</span><span class="tk-fe">${feOf(o)}</span></button>`; }).join('')}</div>`;

  // ---------- 场景预览：拖动宽度，观察布局与字号如何随场景变化 ----------
  const SCENES = [[375, '手机'], [768, '车间手持 / 平板'], [1024, '工控屏 / 平板横屏'], [1280, '工位显示器'], [1600, '控制室大屏']];
  function sceneOf(w) {
    if (w < 640) return { bp: '< sm', notes: ['侧栏收进抽屉，顶部只留菜单和标题', '指标卡单列，图表在下', '页面内边距 16px', '正文 16px，避免手机浏览器自动放大', '可点区域至少 44px 高'] };
    if (w < 1024) return { bp: w < 768 ? 'sm' : 'md', notes: ['768px 起侧栏常驻（240px，可收起为 64px），768px 以下在抽屉里', '指标卡两列', '页面内边距 16px → 24px', '正文 14px，卡片读数 32px'] };
    if (w < 1280) return { bp: 'lg', notes: ['侧栏常驻 240px，可收起为 64px 图标列', '指标卡三列', '页面内边距 24px'] };
    if (w < 1536) return { bp: 'xl · 主设计宽度', notes: ['侧栏 240px 常驻', '指标卡四列，图表与列表并排', '正文 14px，页面标题 30px'] };
    return { bp: '2xl', notes: ['内容区最大 1440px，超出后居中', '站远处看：关键数字放大到 40px', '仍是四列，不为填满而拉宽表格'] };
  }
  const sceneFrame = (id, w) => `<div class="scene" data-scene="${id}" data-init="${w}">
      <div class="scene-bar">${seg('scene-' + id, SCENES.map(([v, n]) => [String(v), n]), String(w))}<span class="spacer"></span><span class="scene-w"><b data-sw>${w}px</b><span data-sbp>${sceneOf(w).bp}</span></span></div>
      <div class="scene-stage"><div class="scene-box"><div class="scene-scale" style="width:${w}px"><div class="sv">
        <header class="sv-top"><span class="sv-menu">${I.menu}</span><b>Factory-A / Line-01</b><span class="sv-status"><i></i>运行中</span></header>
        <aside class="sv-side"><b>Tier0</b><span class="on">产线总览</span><span>设备</span><span>告警</span><span>工单</span></aside>
        <main class="sv-main"><h3>产线总览</h3><p>12 台设备在线，2 条告警待处理。</p>
          <div class="sv-kpis">${[['OEE', '86.4', '%'], ['产量', '1,284', '件'], ['主轴温度', '72.4', '°C'], ['告警', '2', '条']].map(([k, v, u]) => `<div class="sv-kpi"><span>${k}</span><b>${v}<small>${u}</small></b></div>`).join('')}</div>
          <div class="sv-row"><div class="sv-chart">${Array.from({ length: 24 }, (_, n) => `<i style="height:${30 + Math.round(Math.abs(Math.sin(n * 0.7)) * 60)}%"></i>`).join('')}</div><div class="sv-list">${['CNC-03 温度偏高', 'AGV-2 电量低', 'PLC-7 已恢复'].map(t => `<span>${t}</span>`).join('')}</div></div>
        </main></div></div><span class="scene-handle" title="拖动调整宽度"></span></div></div>
      </div>`;
  function sceneSet(root, w) {
    w = Math.round(Math.max(320, Math.min(1600, w)));
    if (!Number.isFinite(w)) w = 1280;
    const box = root.querySelector('.scene-box'), stage = root.querySelector('.scene-stage'), sc0 = root.querySelector('.scene-scale'), sv = root.querySelector('.sv');
    const avail = Math.max(0, stage.clientWidth - 24);
    if (avail < 80) return;
    const fit = Math.min(1, avail / w);
    root.dataset.w = w;
    sc0.style.width = w + 'px';
    sc0.style.setProperty('--fit', String(fit));
    const prevH = box.style.height;
    box.style.height = 'auto';
    const raw = sv.offsetHeight;
    const bw = Math.round(w * fit), bh = Math.max(1, Math.round(raw * fit));
    const sig = bw + 'x' + bh + '@' + w;
    if (root._sig === sig) { box.style.height = prevH || (bh + 'px'); return; }
    root._sig = sig;
    box.style.width = bw + 'px';
    box.style.height = bh + 'px';
    box.dataset.fit = fit;
    const sc = sceneOf(w);
    root.querySelector('[data-sw]').textContent = w + 'px' + (fit < 0.995 ? ` · ${Math.round(fit * 100)}%` : '');
    root.querySelector('[data-sbp]').textContent = sc.bp;
    root.querySelectorAll('.seg button').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.v === w)));
  }
  function mountScenes() {
    document.querySelectorAll('[data-scene]').forEach(root => {
      if (root.dataset.on) return; root.dataset.on = '1';
      const box = root.querySelector('.scene-box');
      const stage = root.querySelector('.scene-stage');
      const sv = root.querySelector('.sv');
      const apply = () => sceneSet(root, +root.dataset.w || +root.dataset.init || 1280);
      apply();
      requestAnimationFrame(apply);
      if (typeof ResizeObserver === 'function') {
        const ro = new ResizeObserver(() => {
          const sw = stage.clientWidth, sh = sv.offsetHeight;
          if (root._roW === sw && root._roH === sh) return;
          root._roW = sw; root._roH = sh;
          root._sig = '';
          apply();
        });
        ro.observe(stage);
        ro.observe(sv);
      }
      root.querySelector('.seg').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { e.stopPropagation(); root._sig = ''; sceneSet(root, +b.dataset.v); } }, true);
      const h = root.querySelector('.scene-handle');
      h.addEventListener('pointerdown', e => { h.setPointerCapture(e.pointerId); const x0 = e.clientX, w0 = +root.dataset.w, fit = +box.dataset.fit || 1;
        const mv = ev => { root._sig = ''; sceneSet(root, w0 + (ev.clientX - x0) / fit); }; const up = () => { h.removeEventListener('pointermove', mv); h.removeEventListener('pointerup', up); };
        h.addEventListener('pointermove', mv); h.addEventListener('pointerup', up); });
    });
  }
  addEventListener('resize', () => document.querySelectorAll('[data-scene]').forEach(r => sceneSet(r, +r.dataset.w)));

  // ---------- 间距与布局 ----------
  // 页面结构：按 02-components/guidelines/app-shell.md 画出四种常见外壳，按真实比例缩小
  function shellLab() {
    const nav = (n, icons) => `<div class="sx-nav${icons ? ' icons' : ''}"><div class="sx-ws"><i></i>${icons ? '' : '<b></b>'}</div>${[3, 2, 4, 2].map((k, g) => `${g && !icons ? '<em></em>' : ''}${Array.from({ length: k }, (_, i) => `<span${g === 1 && i === 0 ? ' class="on"' : ''}></span>`).join('')}`).join('')}${icons ? '' : '<div class="sx-up"></div>'}</div>`;
    const work = (phone) => `<div class="sx-work">${phone ? '<div class="sx-bar"><i></i></div>' : ''}<div class="sx-title"><b></b>${phone ? '' : '<u></u>'}</div><div class="sx-desc"></div><div class="sx-tabs"><i class="on"></i><i></i><i></i></div><div class="sx-cards">${'<div></div>'.repeat(phone ? 2 : 4)}</div><div class="sx-panel"></div></div>`;
    const figs = [
      ['desk', '桌面 · 侧栏展开', '侧栏 240px（grey-50 底，右侧 1px 线）+ 工作区（内边距 24px）。默认没有顶栏。', `${nav()}${work()}`],
      ['desk', '桌面 · 侧栏收起', '侧栏收成 64px 图标栏，悬停显示名称；工作区跟着变宽。', `${nav(0, 1)}${work()}`],
      ['desk', '设置类页面', '侧栏 + 二级导航 248px（白底，右侧 1px 线）+ 工作区。', `${nav()}<div class="sx-sub">${'<span></span>'.repeat(6)}</div>${work()}`],
      ['phone', '手机 · 抽屉', '小于 768px 时侧栏变成抽屉，标题前放打开按钮；工作区左右 16px。', `${work(1)}<div class="sx-drawer">${nav()}</div>`],
    ];
    return `<div class="sx-grid">${figs.map(([k, t, d, inner]) => `<figure class="sx-fig"><div class="sx-frame ${k}"><div class="sx-in">${inner}</div></div><figcaption><b>${t}</b><span>${d}</span></figcaption></figure>`).join('')}</div>`;
  }
  function paintShell() {}
  function vSpacing() {
    const S = D.spacing, L = D.layout;
    if (!S || !L) return '<p class="muted">没有读取到间距与布局 token。</p>';
    const sv = k => px(tokVal(S, (S.semantic[k] || {}).$value));
    const levels = [['元素内', 'inline', '图标 + 文字；标签 + 输入框', sv('inline')], ['组内', 'group-item', '一组指标卡之间；按钮组', sv('group-item')], ['组与组', 'group', '指标卡组和旁边的列表之间', sv('group')], ['区块与区块', 'section', '页面里的两个分区', sv('section')]];
    const bps = entries(L.breakpoint).map(([k, o]) => [k, px(o.$value), o]);
    const maxBp = 1600;
    return docHead('间距与布局', '用间距表达层级：同一组里间距小，组与组之间间距大。页面结构从任务出发，先放最重要的信息和操作。')
      + sec('scale', '间距刻度', '4px 基准。只用下列档位，点击一行复制数值。', tokTable(S, S.space, 'space.', v => `<i class="sp-bar" style="width:${Math.max(px(v), 1)}px"></i>`, true))
      + sec('levels', '层级与间距', '进入更高一层级时，间距至少升一档；所有区块等间距会让分组消失。', `<div class="lv-list">${levels.map(([n, v, eg, w]) => `<div class="lv-row"><b>${n}</b><span class="lv-demo"><i></i><em style="width:${w}px"></em><i></i></span><code>${v} · ${w}px</code><span class="muted">${eg}</span></div>`).join('')}</div>`)
      + sec('semantic', '按用途的间距', '组件与页面优先用这一层。', tokTable(S, S.semantic, '', v => `<i class="sp-bar" style="width:${Math.max(px(v), 1)}px"></i>`))
      + sec('size', '控件与行高', '产品界面默认紧凑密度：控件 control-sm、表格行 table-row。', tokTable(S, S.size, 'size.', (v, k) => k.startsWith('icon') ? `<i class="sz-icon" style="width:${px(v)}px;height:${px(v)}px"></i>` : `<i class="sz-ctl" style="height:${Math.min(px(v), 64)}px"></i>`))
      + sec('breakpoints', '断点', '产品界面以 1280 为主设计宽度，同时照顾车间手持终端、工控屏和控制室大屏。选一个场景，或拖动右侧边缘，看布局怎么变。', sceneFrame('layout', 1280) + `<div class="bp-ruler">${bps.map(([k, w]) => `<span style="left:${(w / maxBp) * 100}%"><b>${k}</b>${w}</span>`).join('')}</div>` + tokTable(L, L.breakpoint, 'breakpoint.', () => ''))
      + sec('shell', '页面结构', '产品页面是左侧导航 + 右侧工作区，不放顶栏。下面是四种常见外壳，具体数值见 02-components/guidelines/app-shell.md。', shellLab() + tokTable(L, L.shell, 'shell.', () => ''))
      + sec('rules', '使用规则', '', rulesBox(rulesOf(S).concat(rulesOf(L))));
  }

  // ---------- 圆角、线宽与阴影 ----------
  // 线宽 playground：选场景、选线型、拖线宽，对照规范
  const BW_SCENES = [
    ['card', '卡片', { w: 1, style: 'solid', color: 'border' }, '<div class="bl-card"><b>CNC-03</b><span>主轴温度</span><strong>72.4 °C</strong></div>'],
    ['table', '表格', { w: 1, style: 'solid', color: 'border' }, '<div class="bl-table"><span>PLC-7</span><span>在线</span><span class="on">CNC-03</span><span>告警</span><span>AGV-2</span><span>在线</span></div>'],
    ['input', '输入框焦点', { w: 2, style: 'solid', color: 'strong' }, '<div class="bl-input">Line-01<i></i></div>'],
    ['nav', '选中项', { w: 2, style: 'solid', color: 'strong' }, '<div class="bl-nav"><span>设备</span><span class="on">告警</span><span>工单</span></div>'],
    ['drop', '拖放区', { w: 1, style: 'dashed', color: 'muted' }, '<div class="bl-drop">把文件拖到这里</div>'],
    ['chart', '图表强调', { w: 2, style: 'solid', color: 'brand' }, '<svg class="bl-chart" viewBox="0 0 200 80" preserveAspectRatio="none"><path class="l1" d="M0 60 C40 50 60 62 100 44 S160 40 200 30"/><path class="l2" d="M0 50 C40 40 70 30 100 36 S160 20 200 12"/></svg>'],
  ];
  const BW_STYLES = [['solid', '实线'], ['dashed', '虚线'], ['dotted', '点线']];
  const BW_COLORS = [['border', '边框色'], ['strong', '前景色'], ['muted', '弱前景'], ['brand', '品牌绿']];
  const BW_COLOR_CSS = { border: 'var(--border)', strong: 'var(--foreground)', muted: 'var(--muted-foreground)', brand: '#73B200' };
  const bw = { scene: 'card', w: 1, style: 'solid', color: 'border' };
  const bwCss = () => `border: ${bw.w}px ${bw.style} ${BW_COLOR_CSS[bw.color]};`;
  function bwVerdict() {
    const r = BW_SCENES.find(x => x[0] === bw.scene)[2], ok = r.w === bw.w && r.style === bw.style;
    const rec = `${r.w}px ${BW_STYLES.find(x => x[0] === r.style)[1]}`;
    return `<span class="bw-verdict ${ok ? 'ok' : ''}">${ok ? '符合规范' : '规范建议'}</span><span class="muted">${rec}</span>`;
  }
  const borderLab = () => { const sc = BW_SCENES.find(x => x[0] === bw.scene);
    return `<div class="spec bw"><div class="bw-form">
      <span class="bw-l">场景</span><div>${seg('bwscene', BW_SCENES.map(x => [x[0], x[1]]), bw.scene)}</div>
      <span class="bw-l">线型</span><div>${seg('bwstyle', BW_STYLES, bw.style)}</div>
      <span class="bw-l">颜色</span><div>${seg('bwcolor', BW_COLORS, bw.color)}</div>
      <span class="bw-l">线宽</span><div class="bw-w"><input type="range" id="bw-w" min="1" max="4" step="1" value="${bw.w}" aria-label="线宽"><b id="bw-wv">${bw.w}px</b></div></div>
      <div class="spec-body bw-stage" data-bw-scene="${bw.scene}" style="--bw:${bw.w}px;--bs:${bw.style};--bc:${BW_COLOR_CSS[bw.color]}">${sc[3]}</div>
      <div class="spec-foot bw-foot"><span id="bw-ver">${bwVerdict()}</span><code id="bw-css">${bwCss()}</code>${copyBtn(bwCss())}</div></div>`; };
  function bwPaint() {
    const st = document.querySelector('.bw-stage'); if (!st) return;
    st.style.setProperty('--bw', bw.w + 'px'); st.style.setProperty('--bs', bw.style); st.style.setProperty('--bc', BW_COLOR_CSS[bw.color]);
    document.getElementById('bw-wv').textContent = bw.w + 'px'; document.getElementById('bw-ver').innerHTML = bwVerdict();
    document.getElementById('bw-css').textContent = bwCss(); const cb = document.querySelector('.bw-foot [data-copy]'); if (cb) cb.dataset.copy = bwCss();
  }
  function vShape() {
    const R = D.radius, B = D.border, H = D.shadow;
    if (!R || !B || !H) return '<p class="muted">没有读取到圆角、线宽与阴影 token。</p>';
    return docHead('圆角、线宽与阴影', '近直角、细线为主：控件 4px、卡片 6px；层级先靠细线和间距，阴影克制使用。')
      + sec('radius', '圆角', '控件 4px，卡片 6px，上限 8px；圆形元素是唯一的例外。', `<div class="shape-grid">${entries(R.radius).map(([k, o]) => `<button type="button" class="shape-card" data-copy="${esc(o.$value)}"><span class="shape-demo" style="border-radius:${k === 'full' ? '999px' : o.$value}${k === 'full' ? ';width:96px;height:32px' : ''}"></span><code>radius.${k}</code><b>${esc(o.$value === '9999px' ? '全圆' : o.$value)}</b><small>${esc(o.$description)}</small></button>`).join('')}</div>` + ruleList(R))
      + sec('concentric', '嵌套圆角', '内层圆角 = 外层圆角 − 内边距。拖动两个滑块，对比「同心」与「等值」。', `<div class="spec cc"><div class="spec-bar">${seg('ccmode', [['concentric', '同心'], ['equal', '等值']], 'concentric')}<span class="spacer"></span><label class="ctl"><span class="ctl-h">外层圆角<b id="cc-ov">6px</b></span><input type="range" id="cc-o" min="0" max="16" value="6"></label><label class="ctl"><span class="ctl-h">内边距<b id="cc-iv">8px</b></span><input type="range" id="cc-i" min="2" max="24" value="8"></label></div><div class="spec-body cc-stage"><div class="cc-outer" id="cc-outer"><div class="cc-inner" id="cc-inner"><i></i><i></i></div></div></div><div class="spec-foot"><code id="cc-f">inner 0 = outer 6 − inset 8</code></div></div>`)
      + sec('border', '线宽', '', borderLab())
      + sec('shadow', '阴影', '页面内的容器不用阴影。阴影只出现在浮层和交互反馈上。', `<div class="shape-grid sh">${entries(H.shadow).map(([k, o]) => `<button type="button" class="shape-card" data-copy="${esc(o.$value)}"><span class="shape-demo sh" style="box-shadow:${o.$value === 'none' ? 'none' : o.$value}"></span><code>shadow.${k}</code><small>${esc(o.$description)}${why(o)}</small></button>`).join('')}</div>` + ruleList(H));
  }


  // ---------- 动效：两种模式与场景 ----------
  const moVal = (M, ref) => { const n = walk(M, ref); return n ? n.$value : null; };
  const moCb = v => Array.isArray(v) ? `cubic-bezier(${v.join(',')})` : v;
  function moModes(M) {
    const card = (k, n, d, dur, ez) => `<div class="mm-card" data-mm-dur="${parseFloat(dur)}" data-mm-ez="${moCb(ez)}"><div class="mm-track"><i></i></div><div class="mm-body"><b>${n}</b><span>${d}</span><code>${dur} · ${k}</code></div><button type="button" class="ui-btn outline" data-mm-play>${I.replay}播放</button></div>`;
    return `<div class="mm-grid">${card('standard', '高效动效', '产品界面。快、不打扰，用户几乎注意不到它，只感到界面跟手。', M.duration.slow.$value, M.easing.standard.$value)}${card('expressive-standard', '表现动效', '官网、品牌内容、Logo 动画。更舒展，用来强调重要时刻。', M.duration.emphasis.$value, M.easing['expressive-standard'].$value)}</div>`;
  }
  function moSurfaces(M) {
    const rows = entries(M.surface).map(([k, o]) => { const v = o.$value, d = moVal(M, v.duration), x = moVal(M, v.exitDuration || v.duration);
      return `<div class="ms-row" data-ms-in="${parseFloat(d)}" data-ms-out="${parseFloat(x)}" data-ms-ein="${moCb(moVal(M, v.enter))}" data-ms-eout="${moCb(moVal(M, v.exit))}" data-ms-kind="${k}"><code>surface.${k}</code><span>${esc(o.$description)}</span><span class="ms-t">进入 ${d}<br>退出 ${x}</span><span class="ms-demo" data-k="${k}">${({ hover: '<button type="button" class="ms-btn">保存</button>', disclosure: '<div class="ms-acc"><div class="ms-acc-h">CNC-03 <span>›</span></div><div class="ms-acc-b">主轴温度 72.4 °C</div></div>', contextual: '<div class="ms-tip-wrap"><span class="ms-tip">阈值 80 °C</span><span class="ms-ic">i</span></div>', invoke: '<div class="ms-dlg-wrap"><div class="ms-mask"></div><div class="ms-dlg"><b>停机？</b><span>确认 取消</span></div></div>', panel: '<div class="ms-pan-wrap"><div class="ms-pan">详情</div></div>', notify: '<div class="ms-toast-wrap"><div class="ms-toast">已导出</div></div>', data: '<div class="ms-data"><b>72.4</b> °C</div>' })[k] || '<i></i>'}</span><button type="button" class="icon-btn" data-ms-play aria-label="播放">${I.replay}</button></div>`; }).join('');
    return `<div class="ms-list">${rows}</div>`;
  }
  function playMm(card) { const i = card.querySelector('.mm-track i'); i.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${card.querySelector('.mm-track').clientWidth - 24}px)` }], { duration: +card.dataset.mmDur, easing: card.dataset.mmEz, fill: 'forwards' }); }
  function playMs(row) {
    const d = row.dataset, k = d.msKind, box = row.querySelector('.ms-demo');
    const IN = { duration: +d.msIn, easing: d.msEin, fill: 'forwards' }, OUT = { duration: +d.msOut, easing: d.msEout, fill: 'forwards' };
    const pair = (el, from, to) => el.animate([from, to], IN).finished.then(() => new Promise(r => setTimeout(r, 900))).then(() => el.animate([to, from], OUT));
    const q = c => box.querySelector(c);
    if (k === 'hover') return pair(q('.ms-btn'), { backgroundColor: 'var(--background)' }, { backgroundColor: 'var(--muted)' });
    if (k === 'disclosure') { q('.ms-acc-h span').animate([{ transform: 'rotate(0)' }, { transform: 'rotate(90deg)' }], IN); return pair(q('.ms-acc-b'), { opacity: 0, transform: 'scaleY(0)' }, { opacity: 1, transform: 'scaleY(1)' }); }
    if (k === 'contextual') return pair(q('.ms-tip'), { opacity: 0, transform: 'translateX(-50%) scale(0.96)' }, { opacity: 1, transform: 'translateX(-50%) scale(1)' });
    if (k === 'invoke') { pair(q('.ms-mask'), { opacity: 0 }, { opacity: 1 }); return pair(q('.ms-dlg'), { opacity: 0, transform: 'translate(-50%, -50%) scale(0.98)' }, { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }); }
    if (k === 'panel') return pair(q('.ms-pan'), { transform: 'translateX(100%)' }, { transform: 'translateX(0)' });
    if (k === 'notify') return pair(q('.ms-toast'), { opacity: 0, transform: 'translate(-50%, 8px)' }, { opacity: 1, transform: 'translate(-50%, 0)' });
    if (k === 'data') { const b = q('b'); b.textContent = b.textContent === '72.4' ? '72.6' : '72.4'; return q('.ms-data').animate([{ backgroundColor: 'var(--accent)' }, { backgroundColor: 'transparent' }], { duration: +d.msIn * 3, easing: d.msEin }); }
  }


  // ---------- 动效 ----------
  const MO = { ez: 'productive' };
  function vMotion() {
    const M = D.motion;
    if (!M) return '<p class="muted">没有读取到动效 token。</p>';
    const dur = k => px((M.duration[k] || {}).$value);
    const curve = v => { const [a, b, c, d] = v; const X = x => 10 + x * 180, Y = y => 90 - y * 70; return `<svg viewBox="0 0 200 100" class="ez"><path class="ez-guide" d="M10 90 H190 M10 20 H190"/><path class="ez-handle" d="M${X(0)} ${Y(0)} L${X(a)} ${Y(b)} M${X(1)} ${Y(1)} L${X(c)} ${Y(d)}"/><circle class="ez-pt" cx="${X(a)}" cy="${Y(b)}" r="3"/><circle class="ez-pt" cx="${X(c)}" cy="${Y(d)}" r="3"/><path class="ez-curve" d="M${X(0)} ${Y(0)} C ${X(a)} ${Y(b)}, ${X(c)} ${Y(d)}, ${X(1)} ${Y(1)}"/></svg>`; };
    const cardOf = (k, o) => { const pair = ext(o).pair || 'duration.base'; const ms = dur(pair.split('.')[1]); const cb = `cubic-bezier(${o.$value.join(', ')})`; return `<div class="ez-card" data-ez="${cb}" data-ms="${ms}"><div class="ez-head"><div><code>easing.${k}</code><p>${esc(o.$description)}</p></div><button type="button" class="ez-play" data-ez-play aria-label="播放">${'<svg viewBox="0 0 16 16"><path d="M5 3.5v9l7-4.5z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>'}</button></div>${curve(o.$value)}<div class="ez-track"><i></i></div><p class="ez-why">${esc(ext(o).rationale || '')}</p><code class="ez-foot">${cb} · ${ms}ms</code></div>`; };

    const ezMode = MO.ez;
    const cardsF = entries(M.easing).filter(([k]) => (ezMode === 'expressive') === k.startsWith('expressive')).map(([k, o]) => cardOf(k, o)).join('');
    return docHead('动效', '动效只用来说明变化：东西从哪里来、到哪里去、状态变成了什么。产品界面的过渡在 300ms 以内；系统开启「减少动态效果」时改为瞬时或只变透明度。')
      + sec('surfaces', '动效场景', '每个场景的进入、退出时长和曲线已经定好，点播放看效果；写代码时按场景取值，不临时拼。', moSurfaces(M))
      + sec('modes', '两种模式', '产品界面用高效动效，官网、品牌内容和 Logo 动画用表现动效，同一界面不混用。', moModes(M))
      + sec('easing', '曲线', '按模式筛选；每条曲线配一个推荐时长，点播放对比。', `<div class="ez-mode">${seg('ezmode', [['productive', '高效'], ['expressive', '表现']], ezMode)}</div><div class="ez-grid">${cardsF}</div>`)
      + sec('duration', '时长', '', tokTable(M, M.duration, 'duration.', v => `<i class="sp-bar" style="width:${Math.min(px(v) / 4, 120)}px"></i>`))
      + sec('rules', '使用规则', '', ruleList(M));
  }

  const VIEWS = { spacing: vSpacing, shape: vShape, motion: vMotion, home: vHome, foundation: vFoundation, color: vColor, typography: vTypo, components: vComponents, scaffold: vScaffold, templates: vTemplates, logo: vLogo, texture: vTexture, illustration: vIllustration, designmd: vDesignMd, skills: vSkills };
  let current = '';
  function route(keepScroll) {
    if (!location.hash) history.replaceState(null, '', '#home');
    const id = location.hash.slice(1).replace(/[^a-z0-9-]/gi, '') || 'home';
    const page = id.startsWith('c-') ? 'components' : id;
    const scrollY = window.scrollY;
    const prev = current; current = page;
    if (page !== prev || keepScroll !== 'anchor') {
      // 首页 = 工作台首屏 + 与 Foundation 页完全相同的页面结构（同一个 doc-wrap、侧栏、目录）
      const body = page === 'home'
        ? `<div class="doc-wrap p-home"><div class="doc">${vHome()}</div></div><div class="doc-wrap p-foundation p-after-hero"><div class="doc">${(current = 'foundation', vFoundation())}</div><nav class="toc" id="toc" aria-label="本页"></nav></div>`
        : `<div class="doc-wrap p-${page}"><div class="doc">${(VIEWS[page] || (() => vSoon(page)))()}</div><nav class="toc" id="toc" aria-label="本页"></nav></div>`;
      current = page;
      document.getElementById('main').innerHTML = body;
      buildToc();
      document.dispatchEvent(new CustomEvent('portal:render'));
    }
    heroState();
    document.querySelectorAll('[data-r]').forEach(a => { if (a.dataset.r === (id === 'home' ? 'foundation' : id)) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    document.getElementById('sidebar').classList.remove('open');
    const item = NAV.flatMap(g => g.items).find(i => i[0] === page);
    document.title = page === 'home' ? 'Tier0 Design System' : `${item ? item[1] : page} · Tier0`;
    if (id.startsWith('c-')) { const el = document.getElementById(id); if (el) el.scrollIntoView(); }
    else if (keepScroll === true) window.scrollTo(0, scrollY);
    else window.scrollTo(0, 0);
    heroState();
  }

  document.addEventListener('click', e => {
    const t = e.target;
    const cp = t.closest('[data-copy]'); if (cp) { e.preventDefault(); copy(cp.dataset.copy); return; }
    const jp = t.closest('[data-jump]'); if (jp) { e.preventDefault(); const el = document.getElementById(jp.dataset.jump); if (el) el.scrollIntoView({ behavior: 'smooth' }); return; }
    const vw = t.closest('[data-view]'); if (vw) { const sp = vw.closest('[data-spec]'); sp.querySelectorAll('[data-view]').forEach(b => b.setAttribute('aria-pressed', b === vw)); sp.querySelectorAll('[data-pane]').forEach(p => { p.hidden = p.dataset.pane !== vw.dataset.view; }); return; }
    const ep = t.closest('[data-ez-play]'); if (ep) { playEz(ep.closest('.ez-card')); return; }
    const blt = t.closest('.bl-table span'); if (blt) { const all = [...blt.parentElement.children]; const i = all.indexOf(blt) & ~1; all.forEach(x => x.classList.remove('on')); all[i].classList.add('on'); return; }
    const bln = t.closest('.bl-nav span'); if (bln) { bln.parentElement.querySelectorAll('span').forEach(x => x.classList.toggle('on', x === bln)); return; }
    const bld = t.closest('.bl-drop'); if (bld) { bld.classList.toggle('on'); bld.textContent = bld.classList.contains('on') ? '已放入：line-01.csv' : '把文件拖到这里'; return; }
    const blc = t.closest('.bl-chart'); if (blc) { blc.classList.toggle('swap'); return; }
    const mmp = t.closest('[data-mm-play]'); if (mmp) { playMm(mmp.closest('.mm-card')); return; }
    const msp = t.closest('[data-ms-play]'); if (msp) { playMs(msp.closest('.ms-row')); return; }
    if (t.closest('[data-dm-copy]')) { copy(D.designmd); return; }
    if (t.closest('[data-dm-ai]')) { copy(`请按下面的 DESIGN.md 做界面。开头的 token 是唯一数值来源，后面的原则用来判断取舍。不要另造颜色、字号、间距或圆角。\n\n${D.designmd}`); return; }
    if (t.closest('[data-sig-png]')) { document.getElementById('sig-cv').toBlob(b => download(b, `tier0-email-signature-${SIG.lang}.png`)); return; }
    if (t.closest('[data-sig-html]')) { sigHtml().then(h => download(new Blob([`<!doctype html><meta charset="utf-8">${h}`], { type: 'text/html' }), `tier0-email-signature-${SIG.lang}.html`)); return; }
    if (t.closest('[data-sig-copy]')) { sigHtml().then(h => { try { navigator.clipboard.write([new ClipboardItem({ 'text/html': new Blob([h], { type: 'text/html' }), 'text/plain': new Blob([h], { type: 'text/plain' }) })]).then(() => toast && toast('已复制，粘贴到邮件客户端的签名设置里')); } catch { copy(h); } }); return; }
    if (t.closest('[data-sig-reset]')) { sigData(); SIG.data[SIG.lang] = JSON.parse(JSON.stringify(SIG_DEF[SIG.lang])); sigStore.set(SIG.data); return route(true); }
    const cpng = t.closest('[data-card-png]'); if (cpng) { const side = cpng.dataset.cardPng; document.getElementById('bc-' + side).toBlob(b => download(b, `tier0-card-${CARD.lang}-${side}.png`)); return; }
    const csvg = t.closest('[data-card-svg]'); if (csvg) { exportCardSvg(csvg.dataset.cardSvg); return; }
    if (t.closest('[data-card-reset]')) { cardData(); CARD.data[CARD.lang] = JSON.parse(JSON.stringify(CARD_DEF[CARD.lang])); CARD.qrImg = null; cardStore.set(CARD.data); return route(true); }
    if (t.closest('[data-dl-copy]')) { dlSource().then(copy); return; }
    if (t.closest('[data-dl-dl]')) { dlSource().then(x => download(new Blob([x], { type: 'text/javascript' }), 'datalines-grid.js')); return; }
    if (t.closest('[data-lab-png]')) { labExportPng(); return; }
    const lwb = t.closest('[data-lab-webm]'); if (lwb) { labExportWebm(lwb); return; }
    const lp = t.closest('[data-lab-preset]'); if (lp) { const pr = LAB_PRESETS.find(x => x[0] === lp.dataset.labPreset); Object.assign(lab, pr[2], { preset: pr[0] }); route(true); return; }
    if (t.closest('[data-lab-reset]')) { Object.assign(lab, LAB_DEF); route(true); return; }
    const lw = t.closest('[data-logo-webm]'); if (lw) { const sm = lw.closest('details').querySelector('summary'); lw.closest('details').open = false; exportLogoWebm(sm, lw.dataset.logoWebm); return; }
    const ll = t.closest('[data-logo-lottie]'); if (ll) { ll.closest('details').open = false; exportLogoLottie(ll.dataset.logoLottie); return; }
    document.querySelectorAll('details.menu[open]').forEach(d => { if (!d.contains(t)) d.open = false; });
    if (t.closest('[data-logo-replay]')) { playLogo(t.closest('.spec').querySelector('.t0-logo')); return; }
    const md = t.closest('[data-mo-demo]'); if (md) { const M = D.motion; const ms = k => parseFloat(M.duration[k].$value); const cb = k => `cubic-bezier(${M.easing[k].$value.join(',')})`;
      if (md.dataset.moDemo === 'menu') { const el = document.getElementById('mo-menu'); const open = !el.classList.contains('open'); el.style.transition = open ? `opacity ${ms('base')}ms ${cb('enter')}, transform ${ms('base')}ms ${cb('enter')}` : `opacity ${ms('fast')}ms ${cb('exit')}, transform ${ms('fast')}ms ${cb('exit')}`; el.classList.toggle('open', open); md.textContent = open ? '关闭下拉' : '打开下拉'; }
      if (md.dataset.moDemo === 'drawer') { const el = document.getElementById('mo-drawer'); el.style.transition = `transform ${ms('slow')}ms ${cb('standard')}`; const open = !el.classList.contains('open'); el.classList.toggle('open', open); md.textContent = open ? '收回侧滑面板' : '推入侧滑面板'; }
      return; }
    const cm = t.closest('[data-seg="ccmode"] button'); if (cm) { cm.parentElement.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b === cm)); ccPaint(); return; }
    const mp = t.closest('[data-mo-play]'); if (mp) { mp.closest('.mo-row').querySelectorAll('[data-mo-dur]').forEach(b => { b.style.transition = 'none'; b.style.transform = 'translateX(0)'; void b.offsetWidth; b.style.transition = `transform ${b.dataset.moDur}ms ${b.dataset.moEase || 'cubic-bezier(0.4,0,0.2,1)'}`; b.style.transform = 'translateX(calc(var(--mo-w) - 16px))'; }); return; }
    const tab = t.closest('[data-tab]'); if (tab) { const w = tab.closest('[data-tabs]'); w.querySelectorAll('[data-tab]').forEach(b => b.setAttribute('aria-selected', b === tab)); w.querySelector('.ui-tabs-panel').textContent = tab.dataset.tab; return; }
    const sg = t.closest('[data-seg] button'); if (sg) {
      const k = sg.parentElement.dataset.seg, v = sg.dataset.v;
      if (k === 'sheader' || k === 'sside' || k === 'sdevice') { sg.parentElement.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === sg))); paintShell(sg.closest('[data-shell-lab]')); return; }
      if (k === 'labmode') { lab.mode = v; sg.parentElement.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === sg))); return; }
      if (k === 'bwscene') { const r = BW_SCENES.find(x => x[0] === v)[2]; Object.assign(bw, { scene: v }, r); return route(true); }
      if (k === 'bwstyle' || k === 'bwcolor') { bw[k === 'bwstyle' ? 'style' : 'color'] = v; sg.parentElement.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === sg))); bwPaint(); return; }
      if (k === 'siglang') { SIG.lang = v; return route(true); }
      if (k === 'cardlang') { CARD.lang = v; CARD.qrImg = null; return route(true); }
      if (k === 'ezmode') { MO.ez = v; return route(true); }
      if (k === 'txgroup') { txGroup = v; return route(true); }
      if (k === 'labcolor') { lab.color = v; sg.parentElement.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === sg))); return; }
      if (k === 'labsrc') { labUseSrc(v); sg.parentElement.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === sg))); return; }
      if (k === 'lgtheme') { lgTheme = v; sg.parentElement.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === sg))); const st = document.querySelector('.logo-mo'); if (st) st.classList.toggle('on-dark', v === 'dark'); return; }
      if (k === 'tyfam') ty.fam = v; if (k === 'tyset') ty.set = v; if (k === 'ctheme') compTheme = v; if (k === 'skill') sk.id = v;
      return route(true);
    }
  });
  document.addEventListener('input', e => {
    if (labInput(e)) return;
    if (e.target.id === 'bw-w') { bw.w = +e.target.value; bwPaint(); return; }
    const id = e.target.id;
    if (id === 'cc-o' || id === 'cc-i') ccPaint();
    if (id === 'ty-w' || id === 'ty-s' || id === 'ty-l' || id === 'ty-t') {
      ty.ls = +document.getElementById('ty-t').value; document.getElementById('ty-tv').textContent = ty.ls + 'em';
      ty.w = +document.getElementById('ty-w').value; ty.s = +document.getElementById('ty-s').value; ty.lh = +document.getElementById('ty-l').value;
      document.getElementById('ty-wv').textContent = ty.w; document.getElementById('ty-sv').textContent = ty.s + 'px'; document.getElementById('ty-lv').textContent = ty.lh;
      const smp = document.getElementById('ty-sample'); smp.style.fontWeight = ty.w; smp.style.fontSize = ty.s + 'px'; smp.style.lineHeight = ty.lh; smp.style.letterSpacing = ty.ls + 'em';
      const f = smp.closest('.spec').querySelector('.spec-foot'); f.querySelector('code').textContent = tyCss(); f.querySelector('[data-copy]').dataset.copy = tyCss();
    }
    if (id === 'sk-brief') { sk.brief = e.target.value; document.getElementById('sk-out').innerHTML = codeBlock(skPrompt()); }
  });
  // 首页工作台：跟随鼠标的「向下滚动」提示，外圈随滚动进度填满，滚到底后消失
  const scrollCue = (() => {
    if (!matchMedia('(pointer: fine)').matches) return { update() {} };
    const el = document.createElement('div'); el.className = 'scroll-cue'; el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<svg viewBox="0 0 48 48"><circle class="sc-track" cx="24" cy="24" r="21"/><circle class="sc-prog" cx="24" cy="24" r="21" pathLength="1"/><circle class="sc-dot" cx="24" cy="24" r="3"/></svg><span></span>';
    document.body.appendChild(el);
    let inside = false, p = 0;
    const show = () => el.classList.toggle('on', inside && p < 0.995);
    addEventListener('pointermove', e => { const wb = document.querySelector('.wb'); inside = !!wb && document.body.classList.contains('hero-on') && !e.target.closest('a, button, .topbar'); el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; show(); }, { passive: true });
    document.addEventListener('pointerleave', () => { inside = false; show(); });
    return { update() { const wb = document.querySelector('.wb'); p = wb ? Math.min(1, Math.max(0, scrollY / Math.max(1, wb.offsetHeight - innerHeight * 1.2))) : 1; el.style.setProperty('--p', p); el.querySelector('span').textContent = lang === 'zh' ? '向下滚动' : 'Scroll to view'; show(); } };
  })();
  function heroState() {
    const wb = document.querySelector('.wb');
    // 进入和离开用不同阈值（滞回），停在临界点附近时侧栏和顶栏不会来回切换
    const b = document.body.classList, h = wb ? wb.offsetHeight : 0;
    b.toggle('hero-on', !!wb && scrollY < h * (b.contains('hero-on') ? 0.38 : 0.35));
    b.toggle('nav-short', !!wb && scrollY < (b.contains('nav-short') ? 32 : 16));
    scrollCue.update();
  }
  function playEz(card) { if (!card) return; const k = card.querySelector('.ez-track i'); k.style.transition = 'none'; k.style.left = '0px'; void k.offsetWidth; k.style.transition = `left ${card.dataset.ms}ms ${card.dataset.ez}`; k.style.left = 'calc(100% - 28px)'; }
  function ccPaint() { const o = document.getElementById('cc-o'); if (!o) return; const i = document.getElementById('cc-i'); const mode = (document.querySelector('[data-seg="ccmode"] [aria-pressed="true"]') || {}).dataset; const ov = +o.value, iv = +i.value; const inner = mode && mode.v === 'equal' ? ov : Math.max(0, ov - iv);
    const out = document.getElementById('cc-outer'), inn = document.getElementById('cc-inner'); out.style.borderRadius = ov + 'px'; out.style.padding = iv + 'px'; inn.style.borderRadius = inner + 'px';
    document.getElementById('cc-ov').textContent = ov + 'px'; document.getElementById('cc-iv').textContent = iv + 'px';
    document.getElementById('cc-f').textContent = mode && mode.v === 'equal' ? `inner ${inner} = outer ${ov}（等值，四角间隙不均）` : `inner ${inner} = outer ${ov} − inset ${iv}${ov - iv < 0 ? '（小于 0 取 0）' : ''}`; }
  (() => { const bm = document.querySelector('.brandmark'); if (!bm) return; bm.innerHTML = logoSvg(); })();
  document.addEventListener('change', e => { if (e.target.id === 'lab-file' && e.target.files[0]) { const f = e.target.files[0]; labSource(URL.createObjectURL(f), f.type.startsWith('video')); } });
  document.addEventListener('t0:qr-ready', () => mountCard());
  if (document.fonts) document.fonts.ready.then(() => drawSig());
  document.addEventListener('portal:render', () => { mountScaffold(); mountPreviews(); mountScenes(); mountLab(); mountDatalines(); mountCard(); drawSig(); ccPaint(); const cards = document.querySelectorAll('.ez-card'); if (!cards.length) return; const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { playEz(e.target); io.unobserve(e.target); } }), { threshold: 0.6 }); cards.forEach(c => io.observe(c)); });
  window.addEventListener('scroll', () => { if (buildToc.spy) buildToc.spy(); heroState(); }, { passive: true });
  window.addEventListener('hashchange', () => route('anchor'));

  (async function start() {
    renderShell();
    if (location.hash !== '#home') history.replaceState(null, '', '#home');
    document.getElementById('main').innerHTML = '<div class="loading"><i class="sig"></i>读取中</div>';
    await load(); applyTokens(); route();
  })();
})();
