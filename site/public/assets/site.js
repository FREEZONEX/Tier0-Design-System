/* Tier0 Design System portal.
   Reads 00-foundation/foundation.md and 01-tokens/*.json at runtime.
   Layout: sidebar · single scrolling document. Components mirror Tier0-Frontend packages/ui. */
(function () {
  'use strict';

  const FE = 'Tier0-Frontend/packages/ui/components/';
  const I = {
    copy: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="5" y="5" width="9" height="9" rx="1"/><path d="M11 5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2"/></svg>',
    github: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
    sun: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="3"/><path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3 3l1 1M12 12l1 1M3 13l1-1M12 4l1-1"/></svg>',
    moon: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7z"/></svg>',
    auto: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6"/><path d="M8 2a6 6 0 0 1 0 12z" fill="currentColor"/></svg>',
    menu: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 4h12M2 8h12M2 12h12"/></svg>',
    plus: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 3v10M3 8h10"/></svg>',
    arrow: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>',
    info: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.5"/><path d="M8 7v4M8 5v.01"/></svg>',
    alert: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.5"/><path d="M8 4.5v4M8 11v.01"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  };

  // ---------- components: mirror Tier0-Frontend packages/ui ----------
  const COMPONENTS = [
    { id: 'button', zh: '按钮', en: 'Button', src: 'ui/button.tsx',
      desc: '默认变体是品牌绿按钮，用于页面主操作；primary 为近黑。尺寸 sm 32 / md 36 / lg 40，默认 sm，左右内边距统一 16px。',
      html: () => `<div class="stack">
        <div class="hstack"><span class="col-label">变体</span><button class="ui-btn default">default</button><button class="ui-btn primary">primary</button><button class="ui-btn secondary">secondary</button><button class="ui-btn outline">outline</button><button class="ui-btn ghost">ghost</button><button class="ui-btn destructive">destructive</button><button class="ui-btn link">link</button></div>
        <div class="hstack"><span class="col-label">尺寸</span><button class="ui-btn default">sm 32</button><button class="ui-btn default md">md 36</button><button class="ui-btn default lg">lg 40</button><button class="ui-btn outline icon" aria-label="新建">${I.plus}</button></div>
        <div class="hstack"><span class="col-label">状态</span><button class="ui-btn primary">${I.plus}新建数据源</button><button class="ui-btn default is-loading"><span class="ui-spin"></span>运行中</button><button class="ui-btn outline" disabled>不可用</button></div></div>`,
      code: `import { Button } from '@tier0/ui/components/ui/button';\n\n<Button>运行 Agent</Button>\n<Button variant="primary" size="md">保存</Button>\n<Button variant="outline">取消</Button>\n<Button loading>运行中</Button>` },
    { id: 'input', zh: '输入框', en: 'Input', src: 'ui/input.tsx · ui/textarea.tsx',
      desc: '高 36px，边框用 input 色。聚焦时边框变为品牌绿并带 2px 浅绿外圈；校验失败时改为红色。',
      html: () => `<div class="grid2">
        <div class="ui-field"><label class="ui-label" for="d-in">数据源名称</label><input class="ui-input" id="d-in" placeholder="例如 PLC-S7-01"><span class="ui-hint">点击输入框查看聚焦样式</span></div>
        <div class="ui-field"><label class="ui-label" for="d-in2">端点地址</label><input class="ui-input" id="d-in2" aria-invalid="true" value="opc.tcp://"><span class="ui-hint err">地址格式不正确</span></div>
        <div class="ui-field"><label class="ui-label" for="d-ta">描述</label><textarea class="ui-textarea" id="d-ta" placeholder="补充说明"></textarea></div>
        <div class="ui-field"><label class="ui-label" for="d-dis">只读</label><input class="ui-input" id="d-dis" value="Factory-A / Line-01" disabled></div></div>`,
      code: `import { Input } from '@tier0/ui/components/ui/input';\n\n<Input placeholder="例如 PLC-S7-01" />\n<Input aria-invalid icon={<SearchIcon />} />` },
    { id: 'select', zh: '选择器', en: 'Select', src: 'ui/select.tsx · cn-select.tsx',
      desc: '与输入框同一形制：高 36px（sm 32），展开和聚焦时同样使用品牌绿边框。',
      html: () => `<div class="ui-field"><label class="ui-label" for="d-sel">协议</label><select class="ui-select" id="d-sel"><option>OPC UA</option><option>Modbus TCP</option><option>MQTT</option></select></div>`,
      code: `import { CnSelect } from '@tier0/ui/components/cn-select';\n\n<CnSelect options={[{ label: 'OPC UA', value: 'opcua' }]} />` },
    { id: 'choice', zh: '复选 · 单选 · 开关', en: 'Checkbox · Radio · Switch', src: 'ui/checkbox.tsx · ui/radio-group.tsx · ui/switch.tsx',
      desc: '选中态统一使用 primary（近黑）。复选框 16px、圆角 4px；开关 32 × 18。',
      html: () => `<div class="grid2">
        <div class="stack"><label class="ui-check"><input type="checkbox" checked>订阅实时数据</label><label class="ui-check"><input type="checkbox">保留历史</label></div>
        <div class="stack"><label class="ui-check"><input type="radio" name="d-r" checked>按设备</label><label class="ui-check"><input type="radio" name="d-r">按工序</label></div>
        <div class="stack"><label class="ui-check"><input type="checkbox" class="ui-switch" role="switch" checked>自动重连</label><label class="ui-check"><input type="checkbox" class="ui-switch" role="switch">告警通知</label></div>
        <div class="stack"><span class="ui-label">采样频率</span><input type="range" class="ui-slider" value="60" aria-label="采样频率"></div></div>`,
      code: `<Checkbox defaultChecked />\n<RadioGroup defaultValue="device">…</RadioGroup>\n<Switch defaultChecked />` },
    { id: 'badge', zh: '徽标 · 状态标签', en: 'Badge · Status', src: 'ui/badge.tsx · com-icon-tag.tsx',
      desc: '徽标为全圆角 12px 字。状态标签用于真实结果，颜色总是配合文字；品牌绿实底只用于"实时"一类信号。',
      html: () => `<div class="stack">
        <div class="hstack"><span class="col-label">Badge</span><span class="ui-badge default">default</span><span class="ui-badge secondary">secondary</span><span class="ui-badge outline">outline</span><span class="ui-badge destructive">destructive</span></div>
        <div class="hstack"><span class="col-label">状态</span><span class="ui-tag ok"><i></i>已连接</span><span class="ui-tag warn"><i></i>接近上限</span><span class="ui-tag err"><i></i>离线</span><span class="ui-tag info"><i></i>同步中</span><span class="ui-tag hl">实时</span></div></div>`,
      code: `import { Badge } from '@tier0/ui/components/ui/badge';\n\n<Badge variant="secondary">OPC UA</Badge>` },
    { id: 'tabs', zh: '标签页', en: 'Tabs', src: 'ui/tabs.tsx · cn-tabs.tsx',
      desc: '浅灰轨道（高 36、内边距 3px），选中项为白底加轻阴影。',
      html: () => `<div class="ui-tabs" data-tabs><div class="ui-tabs-list" role="tablist"><button role="tab" aria-selected="true" data-tab="指标：温度、压力、转速">指标</button><button role="tab" aria-selected="false" data-tab="状态：运行、空闲、停机">状态</button><button role="tab" aria-selected="false" data-tab="动作：启动、停止、复位">动作</button></div><div class="ui-tabs-panel">指标：温度、压力、转速</div></div>`,
      code: `<Tabs defaultValue="metrics">\n  <TabsList>\n    <TabsTrigger value="metrics">指标</TabsTrigger>\n    <TabsTrigger value="state">状态</TabsTrigger>\n  </TabsList>\n</Tabs>` },
    { id: 'table', zh: '表格', en: 'Table', src: 'ui/table.tsx · cn-table.tsx · ant-table',
      desc: '表头高 40px、字重 500；单元格内边距 8px，行间 1px 细线，悬停为半透明浅灰，选中行为浅灰底。数字等宽右对齐。',
      html: () => `<table class="ui-table"><thead><tr><th>设备</th><th>产线</th><th>状态</th><th class="r">温度 °C</th></tr></thead><tbody>
        <tr><td>CNC-01</td><td>Line-01</td><td><span class="ui-tag ok"><i></i>运行</span></td><td class="r">61.2</td></tr>
        <tr data-state="selected"><td>CNC-03</td><td>Line-01</td><td><span class="ui-tag warn"><i></i>过热</span></td><td class="r">72.4</td></tr>
        <tr><td>CNC-04</td><td>Line-02</td><td><span class="ui-tag err"><i></i>离线</span></td><td class="r">—</td></tr></tbody></table>`,
      code: `import { CnTable } from '@tier0/ui/components/cn-table';\n\n<CnTable columns={columns} dataSource={rows} rowKey="id" />` },
    { id: 'card', zh: '卡片 · 统计卡', en: 'Card · Stats', src: 'ui/card.tsx · com-stats-card.tsx',
      desc: '圆角 10px、1px 边框加轻阴影，内边距 24px。',
      html: () => `<div class="grid2">
        <div class="ui-card"><div><div class="ui-card-title">Line-01</div><div class="ui-card-desc">3 台设备在线，1 台告警</div></div><div class="ui-card-foot"><button class="ui-btn outline">查看</button><button class="ui-btn default">运行 Agent</button></div></div>
        <div class="ui-card ui-stat"><div><div class="ui-card-desc" style="margin:0">今日接入数据点</div><div class="v">128,406</div><div class="ui-card-desc">较昨日 +4.2%</div></div></div></div>`,
      code: `<Card>\n  <CardHeader><CardTitle>Line-01</CardTitle></CardHeader>\n  <CardFooter>…</CardFooter>\n</Card>` },
    { id: 'alert', zh: '提示', en: 'Alert', src: 'ui/alert.tsx',
      desc: '圆角 6px，图标 16px。错误提示使用浅红底与浅红边框。',
      html: () => `<div class="stack"><div class="ui-alert">${I.info}<b>数据源已更新</b><span>新配置将在下一次采样时生效。</span></div><div class="ui-alert destructive">${I.alert}<b>连接失败</b><span>无法访问 opc.tcp://10.0.0.12。</span></div><div class="ui-alert error">${I.alert}<b>配额已用完</b><span>升级套餐以继续接入数据点。</span></div></div>`,
      code: `<Alert variant="destructive">\n  <AlertTitle>连接失败</AlertTitle>\n  <AlertDescription>…</AlertDescription>\n</Alert>` },
    { id: 'feedback', zh: '进度 · 骨架 · 头像 · 气泡', en: 'Progress · Skeleton · Avatar · Tooltip', src: 'ui/progress.tsx · ui/skeleton.tsx · com-avatar.tsx · ui/tooltip.tsx',
      desc: '进度条高 8px 全圆角；工具提示为近黑底 12px 字。',
      html: () => `<div class="grid2">
        <div class="stack"><div class="ui-progress"><span style="width:68%"></span></div><div class="stack" style="gap:8px;width:240px"><div class="ui-skel" style="height:14px;width:100%"></div><div class="ui-skel" style="height:14px;width:70%"></div></div></div>
        <div class="stack"><div class="ui-avatars"><span class="ui-avatar">AL</span><span class="ui-avatar">MK</span><span class="ui-avatar">YX</span><span class="ui-avatar">+4</span></div><span class="ui-tooltip">复制数据路径</span></div></div>`,
      code: `<Progress value={68} />\n<Skeleton className="h-4 w-full" />\n<Tooltip><TooltipContent>复制数据路径</TooltipContent></Tooltip>` },
    { id: 'menu', zh: '下拉菜单', en: 'Dropdown menu', src: 'ui/dropdown-menu.tsx · cn-dropdown-menu.tsx',
      desc: '浮层使用阴影；菜单项高 32px，危险操作用红色文字。',
      html: () => `<div class="ui-menu"><div>重命名<small>⌘R</small></div><div>复制路径</div><div>导出</div><hr><div class="danger">删除</div></div>`,
      code: `<DropdownMenu>\n  <DropdownMenuTrigger asChild><Button variant="ghost">…</Button></DropdownMenuTrigger>\n  <DropdownMenuContent>…</DropdownMenuContent>\n</DropdownMenu>` },
    { id: 'dialog', zh: '弹窗', en: 'Dialog', src: 'cn-dialog.tsx · com-confirm-dialog.tsx',
      desc: '业务弹窗优先用 CnDialog / ComConfirmDialog。内边距 32px，遮罩为 50% 黑。',
      html: () => `<div class="ui-overlay"><div class="ui-dialog light-scope"><span class="x">${I.x}</span><div><h3>断开数据源？</h3><p>PLC-S7-01 的数据将停止同步，已接入的历史数据保留。</p></div><div class="ui-dialog-foot"><button class="ui-btn outline">取消</button><button class="ui-btn destructive">断开</button></div></div></div>`,
      code: `import { ComConfirmDialog } from '@tier0/ui/components/com-confirm-dialog';\n\n<ComConfirmDialog title="断开数据源？" onSubmit={() => disconnect()} />` },
  ];

  const SKILLS = [
    { id: 'tier0-ui', zh: 'UI 界面', desc: '按设计系统生成产品界面和页面。', typo: 'product' },
    { id: 'tier0-web', zh: '官网', desc: '生成官网页面与区块。', typo: 'web' },
    { id: 'tier0-slides', zh: 'Slides', desc: '生成符合品牌的演示文稿。', typo: 'web' },
    { id: 'tier0-marketing', zh: '宣传物料', desc: '生成社媒图、海报等宣传物料。', typo: 'web' },
  ];
  const NAV = [
    { zh: '', en: '', items: [['foundation', 'Foundation', 'Foundation']] },
    { zh: 'Tokens', en: 'Tokens', items: [['color', '颜色', 'Color'], ['typography', '字体', 'Typography'], ['spacing', '间距与圆角', 'Spacing & radius', 1], ['motion', '动效', 'Motion', 1]] },
    { zh: 'Components', en: 'Components', items: [['components', '全部组件', 'All components']] },
    { zh: 'Brand', en: 'Brand', items: [['logo', 'Logo', 'Logo'], ['templates', '模版', 'Templates', 1]] },
    { zh: 'Skills', en: 'Skills', items: [['skills', 'AI 调用规则', 'AI guidelines'], ['designmd', 'DESIGN.md', 'DESIGN.md', 1]] },
  ];
  const I18N = { tbd: { zh: '待定', en: 'TBD' }, copy: { zh: '复制', en: 'Copy' }, copied: { zh: '已复制', en: 'Copied' } };

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
      tryFetch('01-tokens/typography.json'), tryFetch('00-foundation/foundation.md', 'text')]);
    Object.assign(D, { base: r[0], light: r[1], dark: r[2], typo: r[3], md: r[4] || '' });
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
  const sec = (id, title, lead, body) => `<section class="sec" id="${id}"><h2>${esc(title)}</h2>${lead ? `<p class="lead">${lead}</p>` : ''}${body}</section>`;
  const docHead = (title, desc) => `<header class="doc-head"><h1>${esc(title)}</h1>${desc ? `<p>${desc}</p>` : ''}</header>`;
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
    document.getElementById('theme-btn').addEventListener('click', () => setMode(MODES[(MODES.indexOf(store.get('t0-theme', 'system')) + 1) % 3]));
    document.getElementById('lang-btn').addEventListener('click', () => { lang = lang === 'zh' ? 'en' : 'zh'; store.set('t0-lang', lang); document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'; renderSidebar(); route(); });
    setMode(store.get('t0-theme', 'system'));
    renderSidebar();
  }

  // ---------- home ----------
  function vHome() {
    const tags = [['PLC / MODBUS', '-0.7,1.17,-0.2'], ['UNS / Factory-A / Line-01', '0.05,1.72,-0.3'], ['EDGE_BOX / 192.168.1.50', '0.95,1.02,-0.05']];
    return `<section class="wb" data-workbench><div class="wb-stage"><canvas aria-hidden="true"></canvas>
        ${tags.map(([t, a]) => `<span class="wb-tag" data-anchor="${a}"><i></i>${t}</span>`).join('')}
</div></section>
      <div class="home-body">${vFoundation()}</div>`;
  }
  function initHome() {
    const t = document.getElementById('ro-t'), b = document.getElementById('ro-b'), l = document.getElementById('ro-l');
    if (!t || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearInterval(initHome.i);
    initHome.i = setInterval(() => { if (!document.body.contains(t)) return clearInterval(initHome.i); t.textContent = (71.8 + Math.random() * 1.4).toFixed(1); const x = Math.round(62 + Math.random() * 12); b.style.width = x + '%'; l.textContent = x + '%'; }, 1600);
  }

  // ---------- foundation ----------
  function traitArt(i) {
    const art = [
      '<div class="mini-panel"><span class="signal-dot"></span><code>已连接</code><div class="mini-bars"><i></i><i></i><i></i></div><strong>72.4 <small>°C</small></strong></div>',
      '<div class="surface-stack"><div></div><div></div><div><span></span><span></span></div></div>',
      '<div class="line-grid"><i></i><i></i><i></i><i></i><i></i><i></i></div>',
      '<div class="corner-frame"><div></div><code>R 4</code></div>',
      '<div class="mini-panel"><code>产线设备</code><div class="mini-bars"><i></i><i></i><i></i></div><div class="mini-action">查看数据 ↗</div></div>',
      '<div class="mini-tree"><span>工厂</span><span>└ 产线</span><span>　└ 设备 <i></i></span></div>'
    ];
    return `<div class="trait-art art-${i}" aria-hidden="true">${art[i]}</div>`;
  }
  function vFoundation() {
    const traits = mdRows(mdSection('### 特征'));
    const principles = [...mdSection('## 2. 设计原则').matchAll(/\*\*(.+?)\*\*\n(.+)/g)];
    const what = mdSection('### Tier0 是什么');
    const story = mdSection('### 故事');
    const traitIntro = mdSection('## 3. 品牌特征').split(/\n###\s/)[0].trim();
    const opener = plain(mdSection('# Tier0 Foundation').split('\n').map(l => l.trim()).find(l => l && !l.startsWith('#')) || '');
    return docHead('Foundation', (opener.split('。')[0] || '设计系统的起点') + '。')
      + sec('brand-story','Tier0 品牌故事','', `<div class="brand-copy">${md([what, story].filter(Boolean).join('\n\n'))}</div><iframe class="brand-story-animation" src="assets/brand-story.html?v=5" title="Tier0 品牌故事：接入、组织与生成" sandbox="allow-scripts" loading="eager"></iframe>`)

      + sec('brand-traits','品牌特征','', `<div class="brand-copy">${md(traitIntro)}</div><div class="trait-grid">${traits.map((t,i)=>`<details class="trait-card"><summary>${traitArt(i)}<div class="trait-title"><h3>${esc(plain(t[0]))}</h3><span class="trait-plus">+</span></div><p>${esc(plain(t[1]).split('。')[0])}。</p></summary><div class="trait-rule">${esc(plain(t[1]))}</div></details>`).join('')}</div>`)
      + sec('design-principles','设计原则','',`<div class="principle-grid">${principles.map((m)=>`<article><h3>${esc(m[1])}</h3><p>${esc(m[2])}</p></article>`).join('')}</div>`) ;
  }

  // ---------- color ----------
  function vColor() {
    if (!D.base) return '<p class="muted">没有读取到颜色 token。</p>';
    const c = D.base.color;
    const brand = entries(c.brand).map(([k, v]) => ({ name: ext(v).displayName || k, hex: colorOf(v.$value), desc: (v.$description || '').split('——')[0] }));
    const ramp = ([g, list]) => `<div class="ramp-line"><span>${esc(g)}</span><div class="ramp">${list.map(([n, hex]) => `<button data-copy="${hex}" style="background:${hex}" title="${esc(n)} ${hex}" aria-label="${esc(n)} ${hex}"></button>`).join('')}</div></div>`;
    const scale = entries(c.scale).map(([g, o]) => [g, o.$value ? [[g, colorOf(o.$value)]] : entries(o).map(([s, v]) => [`${g}-${s}`, colorOf(v.$value)])]);
    const aux = entries(c.auxiliary).map(([g, o]) => [g, entries(o).map(([s, v]) => [`${g}-${s}`, colorOf(v.$value)])]);
    const sem = CORE.map(g => [(D.light.color[g].$description || g).split('。')[0], entries(D.light.color[g]).map(([k, v]) => ({ k, l: colorOf(v.$value), d: colorOf(D.dark.color[g][k].$value), desc: (v.$description || '').split('——')[0] }))]);
    const rules = ext(D.light.color).rules || [];
    return docHead('颜色', '近单色的界面，品牌绿只出现在信号、实时数据、选中和重点区块上。点击任一色块复制色值。')
      + sec('brand', '品牌色', '五个品牌色构成 Tier0 的识别。', `<div class="sw-grid">${brand.map(x => `<button class="sw" data-copy="${x.hex}"><div class="chip" style="background:${x.hex}"></div><b>${esc(x.name)}</b><span>${x.hex}</span></button>`).join('')}</div>`)
      + sec('scale', '色阶', '绿、黑、灰三组色阶，与前端 <code>packages/theme</code> 同名。', `<div class="ramps">${scale.map(ramp).join('')}</div>`)
      + sec('aux', '辅助色', '只用于图表和分类标签，不带语义。', `<div class="ramps">${aux.map(ramp).join('')}</div>`)
      + sec('tokens', '用途 token', '组件只使用这一层。左为浅色、右为深色，点击一行复制变量。', `<div data-island="token-grid" data-props="${esc(JSON.stringify(sem.flatMap(([t, list]) => list.map(x => ({ group: t, token: x.k, light: x.l, dark: x.d, desc: x.desc })))))}">` + `<table class="tok-table"><thead><tr><th>Token</th><th>浅 / 深</th><th>用途</th></tr></thead><tbody>${sem.map(([t, list]) => `<tr class="grp"><td colspan="3">${esc(t)}</td></tr>` + list.map(x => `<tr data-copy="var(--${x.k})"><td><code>--${x.k}</code></td><td><span class="pair"><i style="background:${x.l}"></i><i style="background:${x.d}"></i></span></td><td class="d">${esc(x.desc)}</td></tr>`).join('')).join('')}</tbody></table>` + '</div>')
      + sec('rules', '使用规则', '', `<ol class="rules">${rules.map(r => `<li>${esc(r)}</li>`).join('')}</ol>`);
  }

  // ---------- typography ----------
  const ty = { fam: 'display', w: 600, s: 64, set: 'product' };
  const FAMS = [['display', 'Inter'], ['sans', 'IBM Plex Sans'], ['mono', 'IBM Plex Mono']];
  function tyCss() { return `font-family: var(--font-${ty.fam}); font-weight: ${ty.w}; font-size: ${ty.s}px;`; }
  function vTypo() {
    if (!D.typo) return '<p class="muted">没有读取到字体 token。</p>';
    const group = D.typo.typography[ty.set];
    const rows = entries(group).map(([k, v]) => {
      const src = typeof v.$value === 'string' ? walk(D.typo, v.$value) : v;
      const t = typoResolve(src.$value); const fk = String(src.$value.fontFamily).replace(/[{}]/g, '').split('.').pop();
      const tt = ext(v).textTransform || ext(src).textTransform || '';
      const famName = (D.typo.font.family[fk] || { $value: [fk] }).$value[0];
      const css = `font-family:var(--font-${fk});font-size:${t.fontSize};line-height:${t.lineHeight};font-weight:${t.fontWeight};letter-spacing:${t.letterSpacing || 0};${tt ? 'text-transform:' + tt + ';' : ''}`;
      const sample = tt ? 'Edge data / Independent sources' : (parseInt(t.fontSize) >= 20 ? '一次接入，处处复用' : '设备和业务系统的数据只需接入一次，就能被语义化集成。');
      return `<div class="ty-row"><div class="meta"><b>${esc(k)}</b><span>${esc(famName)} ${t.fontWeight} · ${parseInt(t.fontSize)} / ${parseInt(t.lineHeight)}</span></div><div class="sample" style="${css}">${esc(sample)}</div></div>`;
    }).join('');
    const fams = entries(D.typo.font.family).map(([k, v]) => `<div class="fam"><div class="aa" style="font-family:var(--font-${k === 'sc' ? 'sans' : k})">Aa 字</div><b>${esc(v.$value[0])}</b><span>${esc((v.$description || '').split('——')[0])}</span></div>`).join('');
    return docHead('字体', '标题用 Inter，正文用 IBM Plex Sans，代码与数据用 IBM Plex Mono，中文回落到 IBM Plex Sans SC。')
      + sec('specimen', '试排', '选择字体，调整字重和字号，然后直接改写示例文字。', `<div class="spec"><div class="spec-bar">${seg('tyfam', FAMS, ty.fam)}<span class="spacer"></span>
          <label class="ctl"><span class="ctl-h">字重<b id="ty-wv">${ty.w}</b></span><input type="range" id="ty-w" min="400" max="700" step="100" value="${ty.w}"></label>
          <label class="ctl"><span class="ctl-h">字号<b id="ty-sv">${ty.s}px</b></span><input type="range" id="ty-s" min="12" max="96" value="${ty.s}"></label></div>
        <div class="spec-body"><div class="spec-sample" id="ty-sample" contenteditable="true" spellcheck="false" style="${tyCss()};line-height:1.08;letter-spacing:${ty.fam === 'display' ? '-0.03em' : '0'}">Connect once, Reuse everywhere. 一次接入，处处复用。</div></div>${foot(tyCss())}</div>`)
      + sec('scale', '字阶', '每一级都按实际大小展示。产品字阶用于产品后台，官网字阶用于官网、Deck 和宣传物料。', `<div style="margin-bottom:16px">${seg('tyset', [['product', '产品字阶'], ['web', '官网字阶']], ty.set)}</div><div>${rows}</div>`)
      + sec('families', '字体家族', '', `<div class="fam-grid">${fams}</div>`)
      + sec('rules', '使用规则', '', `<ol class="rules">${(ext(D.typo.typography).rules || []).map(r => `<li>${esc(r)}</li>`).join('')}</ol>`);
  }

  // ---------- components (one page) ----------
  let compTheme = 'auto';
  function vComponents() {
    const scope = compTheme === 'dark' ? ' dark-scope' : compTheme === 'light' ? ' light-scope' : '';
    return docHead('组件', `以 Tier0-Frontend 的 <code>packages/ui</code> 为准，按前端的尺寸、圆角、颜色和状态还原。代码请以前端仓库为准。`)
      + `<div style="margin:-24px 0 40px">${seg('ctheme', [['auto', '跟随页面'], ['light', '浅色'], ['dark', '深色']], compTheme)}</div>`
      + COMPONENTS.map(c => sec('c-' + c.id, c.zh, esc(c.desc), `<div class="spec" data-spec>
          <div class="spec-tabs"><div class="seg sm" role="tablist"><button type="button" data-view="preview" aria-pressed="true">预览</button><button type="button" data-view="code" aria-pressed="false">代码</button></div>
            <div class="src-list">${c.src.split(' · ').map(f => `<button type="button" class="src-chip" data-copy="${esc(FE + f)}" title="复制路径 ${esc(FE + f)}">${esc(f.replace(/^ui\//, ''))}</button>`).join('')}</div></div>
          <div class="spec-body center${scope}" data-pane="preview">${c.html()}</div>
          <div class="spec-code" data-pane="code" hidden>${codeBlock(c.code)}</div></div>`)).join('');
  }

  // ---------- logo ----------
  const LOGOS = [['tier0-logo-black.svg', '标准版', '#FFFFFF'], ['tier0-logo-black.svg', '浅灰底', '#FAFAFA'], ['tier0-logo-white.svg', '反白版', '#050B14'], ['tier0-logo-lime.svg', '品牌绿版', '#050B14']];
  function vLogo() {
    return docHead('Logo', '字标使用 Tektur，交付时为路径。只在下面四种底色上使用。')
      + sec('variants', '版本', '', `<div class="logo-grid">${LOGOS.map(([f, n, bg]) => `<div class="logo-card"><div class="stage" style="background:${bg}"><img alt="Tier0 ${n}" src="${asset('03-brand/logo/assets/' + f)}"></div><div class="foot"><span>${n}<span class="muted"> · ${bg}</span></span><a class="ui-btn ghost" href="${asset('03-brand/logo/assets/' + f)}" target="_blank" rel="noopener">SVG ${I.arrow}</a></div></div>`).join('')}</div>`);
  }

  // ---------- skills ----------
  const sk = { id: 'tier0-ui', brief: '做一页展示 Line-01 实时状态的看板' };
  function skPrompt() {
    const s = SKILLS.find(x => x.id === sk.id);
    return `/${s.id}\n\n需求：${sk.brief}\n\n要求：\n- 先读取 00-foundation/foundation.md 与 01-tokens/README.md\n- 组件使用 Tier0-Frontend 的 @tier0/ui\n- 颜色只用 color/light.json、color/dark.json 主层 token\n- 字体使用 typography.${s.typo}\n- 完成后对照 Foundation 的 Anti 表自查`;
  }
  function vSkills() {
    const s = SKILLS.find(x => x.id === sk.id);
    return docHead('Skills', '把设计系统交给 AI：选一个出口，写下需求，复制指令发给 Agent。')
      + sec('try', '试用', esc(s.desc), `<div class="spec"><div class="spec-bar">${seg('skill', SKILLS.map(x => [x.id, x.zh]), sk.id)}</div>
          <div class="spec-body" style="display:grid;gap:16px"><div class="ui-field" style="width:100%;max-width:640px"><label class="ui-label" for="sk-brief">需求</label><input class="ui-input" id="sk-brief" value="${esc(sk.brief)}"></div><div id="sk-out">${codeBlock(skPrompt())}</div></div></div>`)
      + sec('files', '文件结构', '', codeBlock(`04-skills/${s.id}/\n├── SKILL.md\n├── references/\n├── assets/\n├── examples/\n└── gotchas.md`));
  }

  function vSoon(id) {
    const item = NAV.flatMap(g => g.items).find(i => i[0] === id);
    return docHead(item ? item[1] : id, '这一部分还在梳理中，确定后会出现在这里。');
  }

  // ---------- router ----------
  function buildToc() {
    const hs = [...document.querySelectorAll('.doc .sec[id] > h2, .prose h2')];
    hs.forEach((h, i) => { if (!h.id && !h.parentElement.id) h.id = 'sec-' + i; });
    const toc = document.getElementById('toc');
    if (hs.length < 2) { toc.innerHTML = ''; buildToc.spy = null; return; }
    toc.innerHTML = '<h6>本页</h6>' + hs.map(h => { const id = h.parentElement.id && h.parentElement.classList.contains('sec') ? h.parentElement.id : h.id; return `<a href="#${current}" data-jump="${id}">${esc(h.textContent)}</a>`; }).join('');
    const links = [...toc.querySelectorAll('a')];
    buildToc.spy = () => { let on = links[0]; hs.forEach((h, i) => { if (h.getBoundingClientRect().top < 160) on = links[i]; }); links.forEach(a => a.classList.toggle('on', a === on)); };
    buildToc.spy();
  }
  const VIEWS = { home: vHome, foundation: vFoundation, color: vColor, typography: vTypo, components: vComponents, logo: vLogo, skills: vSkills };
  let current = '';
  function route(keepScroll) {
    if (!location.hash) history.replaceState(null, '', '#foundation');
    const id = location.hash.slice(1).replace(/[^a-z0-9-]/gi, '') || 'foundation';
    const page = id.startsWith('c-') ? 'components' : id;
    const scrollY = window.scrollY;
    const prev = current; current = page;
    if (page !== prev || keepScroll !== 'anchor') {
      document.getElementById('main').innerHTML = `<div class="doc-wrap p-${page}${page === 'home' ? ' p-foundation' : ''}"><div class="doc">${(VIEWS[page] || (() => vSoon(page)))()}</div><nav class="toc" id="toc" aria-label="本页"></nav></div>`;
      buildToc();
      document.dispatchEvent(new CustomEvent('portal:render'));
    }
    heroState();
    document.querySelectorAll('[data-r]').forEach(a => { if (a.dataset.r === id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
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
    const tab = t.closest('[data-tab]'); if (tab) { const w = tab.closest('[data-tabs]'); w.querySelectorAll('[data-tab]').forEach(b => b.setAttribute('aria-selected', b === tab)); w.querySelector('.ui-tabs-panel').textContent = tab.dataset.tab; return; }
    const sg = t.closest('[data-seg] button'); if (sg) {
      const k = sg.parentElement.dataset.seg, v = sg.dataset.v;
      if (k === 'tyfam') ty.fam = v; if (k === 'tyset') ty.set = v; if (k === 'ctheme') compTheme = v; if (k === 'skill') sk.id = v;
      return route(true);
    }
  });
  document.addEventListener('input', e => {
    const id = e.target.id;
    if (id === 'ty-w' || id === 'ty-s') {
      ty.w = +document.getElementById('ty-w').value; ty.s = +document.getElementById('ty-s').value;
      document.getElementById('ty-wv').textContent = ty.w; document.getElementById('ty-sv').textContent = ty.s + 'px';
      const smp = document.getElementById('ty-sample'); smp.style.fontWeight = ty.w; smp.style.fontSize = ty.s + 'px';
      const f = smp.closest('.spec').querySelector('.spec-foot'); f.querySelector('code').textContent = tyCss(); f.querySelector('[data-copy]').dataset.copy = tyCss();
    }
    if (id === 'sk-brief') { sk.brief = e.target.value; document.getElementById('sk-out').innerHTML = codeBlock(skPrompt()); }
  });
  function heroState() {
    const wb = document.querySelector('.wb');
    document.body.classList.toggle('hero-on', !!wb && scrollY < wb.offsetHeight - innerHeight * 1.2);
    document.body.classList.toggle('nav-short', !!wb && scrollY < 24);
  }
  window.addEventListener('scroll', () => { if (buildToc.spy) buildToc.spy(); heroState(); }, { passive: true });
  window.addEventListener('hashchange', () => route('anchor'));

  (async function start() {
    renderShell();
    document.getElementById('main').innerHTML = '<div class="loading"><i class="sig"></i>读取中</div>';
    await load(); applyTokens(); route();
  })();
})();
