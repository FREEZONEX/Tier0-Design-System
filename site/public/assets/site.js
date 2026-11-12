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
    open: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2" y="2.5" width="12" height="11" rx="1.5"/><path d="M2 5.5h12"/></svg>',
    download: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 2.5v8M4.5 7L8 10.5 11.5 7M3 13.5h10"/></svg>',
    replay: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.5 8a5.5 5.5 0 1 0 1.6-3.9M2.5 2.5v2.6h2.6"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  };

  // ---------- components: mirror Tier0-Frontend packages/ui ----------
  const COMPONENTS = [
    { id: 'button', zh: '按钮', en: 'Button', src: 'ui/button.tsx',
      desc: '用于触发一个操作。一个视图只放一个 primary（黑底）作为主操作；品牌绿 default 只给需要强调的工作流操作。尺寸 sm 32（默认）、md 36、lg 40。跳转到别的页面用链接，不用按钮。',
      html: () => `<div class="stack">
        <div class="hstack"><span class="col-label">变体</span><button class="ui-btn default">default</button><button class="ui-btn primary">primary</button><button class="ui-btn secondary">secondary</button><button class="ui-btn outline">outline</button><button class="ui-btn ghost">ghost</button><button class="ui-btn destructive">destructive</button><button class="ui-btn link">link</button></div>
        <div class="hstack"><span class="col-label">尺寸</span><button class="ui-btn default">sm 32</button><button class="ui-btn default md">md 36</button><button class="ui-btn default lg">lg 40</button><button class="ui-btn outline icon" aria-label="新建">${I.plus}</button></div>
        <div class="hstack"><span class="col-label">状态</span><button class="ui-btn primary">${I.plus}新建数据源</button><button class="ui-btn default is-loading"><span class="ui-spin"></span>运行中</button><button class="ui-btn outline" disabled>不可用</button></div></div>`,
      code: `import { Button } from '@tier0/ui/components/ui/button';\n\n<Button>运行 Agent</Button>\n<Button variant="primary" size="md">保存</Button>\n<Button variant="outline">取消</Button>\n<Button loading>运行中</Button>` },
    { id: 'input', zh: '输入框', en: 'Input', src: 'ui/input.tsx · ui/textarea.tsx',
      desc: '用于输入一行文字。聚焦时出现品牌绿外圈；校验失败时边框变红，并在下方说明怎么改。',
      html: () => `<div class="grid2">
        <div class="ui-field"><label class="ui-label" for="d-in">数据源名称</label><input class="ui-input" id="d-in" placeholder="例如 PLC-S7-01"><span class="ui-hint">点击输入框查看聚焦样式</span></div>
        <div class="ui-field"><label class="ui-label" for="d-in2">端点地址</label><input class="ui-input" id="d-in2" aria-invalid="true" value="opc.tcp://"><span class="ui-hint err">地址格式不正确</span></div>
        <div class="ui-field"><label class="ui-label" for="d-ta">描述</label><textarea class="ui-textarea" id="d-ta" placeholder="补充说明"></textarea></div>
        <div class="ui-field"><label class="ui-label" for="d-dis">只读</label><input class="ui-input" id="d-dis" value="Factory-A / Line-01" disabled></div></div>`,
      code: `import { Input } from '@tier0/ui/components/ui/input';\n\n<Input placeholder="例如 PLC-S7-01" />\n<Input aria-invalid icon={<SearchIcon />} />` },
    { id: 'select', zh: '选择器', en: 'Select', src: 'ui/select.tsx · cn-select.tsx',
      desc: '用于从较多选项里选一个；只有 2 到 5 个选项时用单选或分段控件更直接。与输入框同一形制。',
      html: () => `<div class="ui-field"><label class="ui-label" for="d-sel">协议</label><select class="ui-select" id="d-sel"><option>OPC UA</option><option>Modbus TCP</option><option>MQTT</option></select></div>`,
      code: `import { CnSelect } from '@tier0/ui/components/cn-select';\n\n<CnSelect options={[{ label: 'OPC UA', value: 'opcua' }]} />` },
    { id: 'choice', zh: '复选 · 单选 · 开关', en: 'Checkbox · Radio · Switch', src: 'ui/checkbox.tsx · ui/radio-group.tsx · ui/switch.tsx',
      desc: '复选用于多选；单选用于 2 到 5 个互斥选项；开关用于立即生效的开和关。选中态统一用 primary。',
      html: () => `<div class="grid2">
        <div class="stack"><label class="ui-check"><input type="checkbox" checked>订阅实时数据</label><label class="ui-check"><input type="checkbox">保留历史</label></div>
        <div class="stack"><label class="ui-check"><input type="radio" name="d-r" checked>按设备</label><label class="ui-check"><input type="radio" name="d-r">按工序</label></div>
        <div class="stack"><label class="ui-check"><input type="checkbox" class="ui-switch" role="switch" checked>自动重连</label><label class="ui-check"><input type="checkbox" class="ui-switch" role="switch">告警通知</label></div>
        <div class="stack"><span class="ui-label">采样频率</span><input type="range" class="ui-slider" value="60" aria-label="采样频率"></div></div>`,
      code: `<Checkbox defaultChecked />\n<RadioGroup defaultValue="device">…</RadioGroup>\n<Switch defaultChecked />` },
    { id: 'badge', zh: '徽标 · 状态标签', en: 'Badge · Status', src: 'ui/badge.tsx · com-icon-tag.tsx',
      desc: '状态标签（AntTag 浅底）表达真实的结果，颜色总配合文字；徽标（Badge 实底）只用于计数。同一个状态不再配图标重复表达。',
      html: () => `<div class="stack">
        <div class="hstack"><span class="col-label">Badge</span><span class="ui-badge default">default</span><span class="ui-badge secondary">secondary</span><span class="ui-badge outline">outline</span><span class="ui-badge destructive">destructive</span></div>
        <div class="hstack"><span class="col-label">状态</span><span class="ui-tag ok"><i></i>已连接</span><span class="ui-tag warn"><i></i>接近上限</span><span class="ui-tag err"><i></i>离线</span><span class="ui-tag info"><i></i>同步中</span><span class="ui-tag hl">实时</span></div></div>`,
      code: `import { Badge } from '@tier0/ui/components/ui/badge';\n\n<Badge variant="secondary">OPC UA</Badge>` },
    { id: 'tabs', zh: '标签页', en: 'Tabs', src: 'ui/tabs.tsx · cn-tabs.tsx',
      desc: '用于在同一对象的几个视图之间切换；表示先后顺序的流程用步骤条，不用标签页。',
      html: () => `<div class="ui-tabs" data-tabs><div class="ui-tabs-list" role="tablist"><button role="tab" aria-selected="true" data-tab="指标：温度、压力、转速">指标</button><button role="tab" aria-selected="false" data-tab="状态：运行、空闲、停机">状态</button><button role="tab" aria-selected="false" data-tab="动作：启动、停止、复位">动作</button></div><div class="ui-tabs-panel">指标：温度、压力、转速</div></div>`,
      code: `<Tabs defaultValue="metrics">\n  <TabsList>\n    <TabsTrigger value="metrics">指标</TabsTrigger>\n    <TabsTrigger value="state">状态</TabsTrigger>\n  </TabsList>\n</Tabs>` },
    { id: 'table', zh: '表格', en: 'Table', src: 'ui/table.tsx · cn-table.tsx · ant-table',
      desc: '用于需要比较、排序、筛选的结构化数据。行间细线，悬停浅灰；数字右对齐并用等宽数字。',
      html: () => `<table class="ui-table"><thead><tr><th>设备</th><th>产线</th><th>状态</th><th class="r">温度 °C</th></tr></thead><tbody>
        <tr><td>CNC-01</td><td>Line-01</td><td><span class="ui-tag ok"><i></i>运行</span></td><td class="r">61.2</td></tr>
        <tr data-state="selected"><td>CNC-03</td><td>Line-01</td><td><span class="ui-tag warn"><i></i>过热</span></td><td class="r">72.4</td></tr>
        <tr><td>CNC-04</td><td>Line-02</td><td><span class="ui-tag err"><i></i>离线</span></td><td class="r">—</td></tr></tbody></table>`,
      code: `import { CnTable } from '@tier0/ui/components/cn-table';\n\n<CnTable columns={columns} dataSource={rows} rowKey="id" />` },
    { id: 'card', zh: '卡片 · 统计卡', en: 'Card · Stats', src: 'ui/card.tsx · com-stats-card.tsx',
      desc: '用于把一组相关信息放在一起，如一台设备或一个指标。同组卡片之间用 group-item 间距；卡片里不再套卡片。',
      html: () => `<div class="grid2">
        <div class="ui-card"><div><div class="ui-card-title">Line-01</div><div class="ui-card-desc">3 台设备在线，1 台告警</div></div><div class="ui-card-foot"><button class="ui-btn outline">查看</button><button class="ui-btn default">运行 Agent</button></div></div>
        <div class="ui-card ui-stat"><div><div class="ui-card-desc" style="margin:0">今日接入数据点</div><div class="v">128,406</div><div class="ui-card-desc">较昨日 +4.2%</div></div></div></div>`,
      code: `<Card>\n  <CardHeader><CardTitle>Line-01</CardTitle></CardHeader>\n  <CardFooter>…</CardFooter>\n</Card>` },
    { id: 'alert', zh: '提示', en: 'Alert', src: 'ui/alert.tsx',
      desc: '用于影响整个页面或区块、需要一直看到的提示，问题解决前不消失；一次性的操作结果用轻提示。',
      html: () => `<div class="stack"><div class="ui-alert">${I.info}<b>数据源已更新</b><span>新配置将在下一次采样时生效。</span></div><div class="ui-alert destructive">${I.alert}<b>连接失败</b><span>无法访问 opc.tcp://10.0.0.12。</span></div><div class="ui-alert error">${I.alert}<b>配额已用完</b><span>升级套餐以继续接入数据点。</span></div></div>`,
      code: `<Alert variant="destructive">\n  <AlertTitle>连接失败</AlertTitle>\n  <AlertDescription>…</AlertDescription>\n</Alert>` },
    { id: 'feedback', zh: '进度 · 骨架 · 头像 · 气泡', en: 'Progress · Skeleton · Avatar · Tooltip', src: 'ui/progress.tsx · ui/skeleton.tsx · com-avatar.tsx · ui/tooltip.tsx',
      desc: '进度条用于能预估的等待；骨架用于首次加载；工具提示只放补充说明，必须看到的信息不放进提示。',
      html: () => `<div class="grid2">
        <div class="stack"><div class="ui-progress"><span style="width:68%"></span></div><div class="stack" style="gap:8px;width:240px"><div class="ui-skel" style="height:14px;width:100%"></div><div class="ui-skel" style="height:14px;width:70%"></div></div></div>
        <div class="stack"><div class="ui-avatars"><span class="ui-avatar">AL</span><span class="ui-avatar">MK</span><span class="ui-avatar">YX</span><span class="ui-avatar">+4</span></div><span class="ui-tooltip">复制数据路径</span></div></div>`,
      code: `<Progress value={68} />\n<Skeleton className="h-4 w-full" />\n<Tooltip><TooltipContent>复制数据路径</TooltipContent></Tooltip>` },
    { id: 'menu', zh: '下拉菜单', en: 'Dropdown menu', src: 'ui/dropdown-menu.tsx · cn-dropdown-menu.tsx',
      desc: '用于收起次要操作和更多选项；危险操作放在最后，用红色文字。',
      html: () => `<div class="ui-menu"><div>重命名<small>⌘R</small></div><div>复制路径</div><div>导出</div><hr><div class="danger">删除</div></div>`,
      code: `<DropdownMenu>\n  <DropdownMenuTrigger asChild><Button variant="ghost">…</Button></DropdownMenuTrigger>\n  <DropdownMenuContent>…</DropdownMenuContent>\n</DropdownMenu>` },
    { id: 'dialog', zh: '弹窗', en: 'Dialog', src: 'cn-dialog.tsx · com-confirm-dialog.tsx',
      desc: '用于需要确认或集中填写、值得打断当前流程的任务；能就地完成的操作不用弹窗。危险操作的确认按钮用 destructive。',
      html: () => `<div class="ui-overlay"><div class="ui-dialog light-scope"><span class="x">${I.x}</span><div><h3>断开数据源？</h3><p>PLC-S7-01 的数据将停止同步，已接入的历史数据保留。</p></div><div class="ui-dialog-foot"><button class="ui-btn outline">取消</button><button class="ui-btn destructive">断开</button></div></div></div>`,
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
    { zh: 'Tokens', en: 'Tokens', items: [['color', '颜色', 'Color'], ['typography', '字体', 'Typography'], ['spacing', '间距与布局', 'Spacing & layout'], ['shape', '圆角、线宽与阴影', 'Radius, border & shadow'], ['motion', '动效', 'Motion']] },
    { zh: 'Components', en: 'Components', items: [['components', 'Tier0 平台组件', 'Tier0 platform'], ['scaffold', '应用脚手架', 'App scaffold']] },
    { zh: 'Brand', en: 'Brand', items: [['logo', 'Logo', 'Logo'], ['texture', 'Texture', 'Texture'], ['illustration', '插画与图形', 'Illustration'], ['templates', '模版', 'Templates', 1]] },
    { zh: 'Skills', en: 'Skills', items: [['skills', 'AI 调用规则', 'AI guidelines'], ['designmd', 'DESIGN.md', 'DESIGN.md']] },
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
      tryFetch('01-tokens/typography.json'), tryFetch('00-foundation/foundation.md', 'text'),
      tryFetch('01-tokens/spacing.json'), tryFetch('01-tokens/layout.json'), tryFetch('01-tokens/radius.json'),
      tryFetch('01-tokens/border.json'), tryFetch('01-tokens/shadow.json'), tryFetch('01-tokens/motion.json'), tryFetch('DESIGN.md', 'text')]);
    Object.assign(D, { base: r[0], light: r[1], dark: r[2], typo: r[3], md: r[4] || '', spacing: r[5], layout: r[6], radius: r[7], border: r[8], shadow: r[9], motion: r[10], designmd: r[11] || '' });
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
  // 品牌特征配图：统一为 1px 线稿，只有需要强调的那一处用品牌绿；悬停时演示该特征
  function traitArt(i) {
    const art = [
      // 信号灯：一排设备，只有运行中的那个亮起
      '<svg viewBox="0 0 200 120"><g class="ln">' + [0,1,2,3,4].map(k => `<rect x="${18 + k * 34}" y="38" width="26" height="44" rx="2"/>`).join('') + '</g><g>' + [0,1,2,3,4].map(k => `<rect class="${k === 2 ? 'sig-on' : 'sig-off'}" x="${27 + k * 34}" y="48" width="8" height="8"/>`).join('') + '</g><path class="ln" d="M18 96 H182"/></svg>',
      // 白底浅灰：白色卡片放在浅灰区块上
      '<svg viewBox="0 0 200 120"><rect class="fill-sub" x="20" y="18" width="160" height="84" rx="2"/><rect class="fill-card lift" x="40" y="34" width="120" height="52" rx="2"/><path class="ln faint" d="M54 52 H130 M54 64 H112"/></svg>',
      // 细线为主：表格网格，悬停选中一格
      '<svg viewBox="0 0 200 120"><rect class="cell" x="80" y="44" width="40" height="32"/><g class="ln"><rect x="40" y="12" width="120" height="96"/><path d="M80 12 V108 M120 12 V108 M40 44 H160 M40 76 H160"/></g></svg>',
      // 近直角：4px 圆角的放大标注
      '<svg viewBox="0 0 200 120"><rect class="ln" x="44" y="22" width="112" height="76" rx="4"/><path class="ln faint dim" d="M44 34 H30 M56 22 V8"/><text class="lbl" x="22" y="18">R4</text></svg>',
      // 产品即展示：界面窗口，数据条在悬停时推进
      '<svg viewBox="0 0 200 120"><g class="ln"><rect x="30" y="16" width="140" height="88" rx="2"/><path d="M30 30 H170"/></g><g class="bars"><rect x="46" y="72" width="12" height="20"/><rect x="66" y="60" width="12" height="32"/><rect x="86" y="66" width="12" height="26"/><rect class="b-on" x="106" y="48" width="12" height="44"/><rect x="126" y="56" width="12" height="36"/></g></svg>',
      // 工程气质：UNS 层级树，末端节点亮起
      '<svg viewBox="0 0 200 120"><g class="ln"><path d="M52 26 V58 H86 M52 58 V90 H86 M98 58 H128 V74 H150"/><rect x="40" y="16" width="24" height="20" rx="2"/><rect x="86" y="48" width="24" height="20" rx="2"/><rect x="86" y="80" width="24" height="20" rx="2"/></g><rect class="node-on" x="150" y="68" width="12" height="12"/></svg>'
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

      + sec('brand-traits','品牌特征','', `<div class="brand-copy">${md(traitIntro)}</div><div class="trait-grid">${traits.map((t,i)=>{ const full = plain(t[1]); const k = full.indexOf('。'); const head = k >= 0 ? full.slice(0, k + 1) : full; const rest = k >= 0 ? full.slice(k + 1).trim() : ''; return rest ? `<details class="trait-card"><summary>${traitArt(i)}<div class="trait-title"><h3>${esc(plain(t[0]))}</h3><span class="trait-plus" aria-hidden="true">+</span></div><p>${esc(head)}</p></summary><div class="trait-rule">${esc(rest)}</div></details>` : `<div class="trait-card"><div class="trait-static">${traitArt(i)}<div class="trait-title"><h3>${esc(plain(t[0]))}</h3></div><p>${esc(head)}</p></div></div>`; }).join('')}</div>`)
      + sec('design-principles','设计原则','',`<div class="principle-grid">${principles.map((m)=>`<article><h3>${esc(m[1])}</h3><p>${esc(m[2])}</p></article>`).join('')}</div>`) ;
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
  function vComponents() {
    const scope = compTheme === 'dark' ? ' dark-scope' : compTheme === 'light' ? ' light-scope' : '';
    return docHead('Tier0 平台组件', `Tier0 平台自身使用的组件，代码复刻自前端，在仓库的 <code>02-components/packages</code>，可以直接引用。生成平台应用模版用的是另一套：<a href="#scaffold">应用脚手架</a>。`)
      + `<div class="repo-row">${repoCard('https://github.com/FREEZONEX/Tier0-Design-System/tree/feature/design-system-redesign/02-components', I.github, '组件代码', '02-components/packages')}</div>`

      + `<div style="margin:-24px 0 40px">${seg('ctheme', [['auto', '跟随页面'], ['light', '亮色'], ['dark', '暗色']], compTheme)}</div>`
      + COMPONENTS.map(c => sec('c-' + c.id, c.zh, esc(c.desc), `<div class="spec" data-spec>
          <div class="spec-tabs"><div class="seg sm" role="tablist"><button type="button" data-view="preview" aria-pressed="true">预览</button><button type="button" data-view="code" aria-pressed="false">代码</button></div>
            <div class="src-list">${c.src.split(' · ').map(f => `<button type="button" class="src-chip" data-copy="${esc(FE + f)}" title="复制路径 ${esc(FE + f)}">${esc(f.replace(/^ui\//, ''))}</button>`).join('')}</div></div>
          <div class="spec-body center${scope}" data-pane="preview">${c.html()}</div>
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
  function vIllustration() {
    return docHead('插画与图形', '三种图形风格，分别用于解释原理、说明架构和品牌宣传。')
      + ILLUS.map(([id, n, d, imgs, rules]) => sec('il-' + id, n, d, `<div class="il-grid il-${id}">${imgs.map(([f0, cap]) => { const f = lang === 'en' && IL_EN.includes(f0) ? f0 + '-en' : f0; return `<figure class="il-fig"><a href="${asset('assets/brand/' + f + '.jpg')}" target="_blank" rel="noopener"><img src="${asset('assets/brand/' + f + '.jpg')}" alt="${esc(cap)}" loading="lazy"></a><figcaption>${esc(cap)}</figcaption></figure>`; }).join('')}</div>`)).join('');
  }

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
      + sec('list', '纹理', '点击卡片底部复制 CSS。', `<div class="tx-tabs">${seg('txgroup', TX_GROUPS.map(g => [g[0], g[1]]), grp[0])}</div><div class="tx-grid">${TEXTURES.filter(t => grp[2].includes(t[0])).map(card).join('')}</div>`)
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
    return `/${s.id}\n\n需求：${sk.brief}\n\n要求：\n- 先读 04-skills/tier0-design/SKILL.md，再按它的指引读 DESIGN.md 对应章节\n- 产品界面用 02-components 里的 @tier0/ui 组件\n- 颜色、字体、间距只用 DESIGN.md 里的 token\n- 原型的状态切换放进左下角「原型控制」\n- 完成后对照 DESIGN.md 的 Do's and Don'ts 和 skill 的自查清单检查`;
  }
  function vSkills() {
    const s = SKILLS.find(x => x.id === sk.id);
    return docHead('Skills', '把设计系统交给 AI：写下需求，复制指令发给 Agent。Agent 会先读 tier0-design，再按任务读 DESIGN.md 的对应章节。')
      + sec('try', '试用', esc(s.desc), `<div class="spec"><div class="spec-bar">${seg('skill', SKILLS.map(x => [x.id, x.zh]), sk.id)}</div>
          <div class="spec-body" style="display:grid;gap:16px"><div class="ui-field" style="width:100%;max-width:640px"><label class="ui-label" for="sk-brief">需求</label><input class="ui-input" id="sk-brief" value="${esc(sk.brief)}"></div><div id="sk-out">${codeBlock(skPrompt())}</div></div></div>`)
      + sec('files', '文件结构', '', codeBlock(`04-skills/${s.id}/\n├── SKILL.md\n├── references/\n├── assets/\n├── examples/\n└── gotchas.md`));
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
    return docHead('DESIGN.md', '给 AI 和设计工具读的设计说明：开头是机器可读的 token，后面是用途和原则。内容由 token 与 Foundation 自动生成，跟着它们一起更新。', actions)
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
    if (w < 1024) return { bp: w < 768 ? 'sm' : 'md', notes: ['侧栏仍在抽屉里，内容占满宽度', '指标卡两列', '页面内边距 16px → 24px', '正文 14px，数据数字 24px'] };
    if (w < 1280) return { bp: 'lg', notes: ['侧栏常驻，可收起为 48px 图标列', '指标卡三列', '页面内边距 24px'] };
    if (w < 1536) return { bp: 'xl · 主设计宽度', notes: ['侧栏 256px 常驻', '指标卡四列，图表与列表并排', '正文 14px，标题 20px'] };
    return { bp: '2xl', notes: ['内容区最大 1440px，超出后居中', '站远处看：关键数字放大到 40px', '仍是四列，不为填满而拉宽表格'] };
  }
  const sceneFrame = (id, w) => `<div class="scene" data-scene="${id}">
      <div class="scene-bar">${seg('scene-' + id, SCENES.map(([v, n]) => [String(v), n]), String(w))}<span class="spacer"></span><span class="scene-w"><b data-sw>${w}px</b><span data-sbp>${sceneOf(w).bp}</span></span></div>
      <div class="scene-stage"><div class="scene-box" style="width:${w}px"><div class="scene-scale"><div class="sv">
        <header class="sv-top"><span class="sv-menu">${I.menu}</span><b>Factory-A / Line-01</b><span class="sv-status"><i></i>运行中</span></header>
        <aside class="sv-side"><b>Tier0</b><span class="on">产线总览</span><span>设备</span><span>告警</span><span>工单</span></aside>
        <main class="sv-main"><h3>产线总览</h3><p>12 台设备在线，2 条告警待处理。</p>
          <div class="sv-kpis">${[['OEE', '86.4', '%'], ['产量', '1,284', '件'], ['主轴温度', '72.4', '°C'], ['告警', '2', '条']].map(([k, v, u]) => `<div class="sv-kpi"><span>${k}</span><b>${v}<small>${u}</small></b></div>`).join('')}</div>
          <div class="sv-row"><div class="sv-chart">${Array.from({ length: 24 }, (_, n) => `<i style="height:${30 + Math.round(Math.abs(Math.sin(n * 0.7)) * 60)}%"></i>`).join('')}</div><div class="sv-list">${['CNC-03 温度偏高', 'AGV-2 电量低', 'PLC-7 已恢复'].map(t => `<span>${t}</span>`).join('')}</div></div>
        </main></div></div><span class="scene-handle" title="拖动调整宽度"></span></div></div>
      </div>`;
  function sceneSet(root, w) {
    w = Math.round(Math.max(320, Math.min(1600, w)));
    const box = root.querySelector('.scene-box'), stage = root.querySelector('.scene-stage'), sc0 = root.querySelector('.scene-scale');
    const fit = Math.min(1, (stage.clientWidth - 32) / w);
    root.dataset.w = w; sc0.style.width = w + 'px'; sc0.style.setProperty('--fit', fit);
    box.style.width = (w * fit) + 'px'; box.style.height = (root.querySelector('.sv').offsetHeight * fit) + 'px'; box.dataset.fit = fit;
    const sc = sceneOf(w); root.querySelector('[data-sw]').textContent = w + 'px' + (fit < 1 ? ` · ${Math.round(fit * 100)}%` : ''); root.querySelector('[data-sbp]').textContent = sc.bp;
    
    root.querySelectorAll('.seg button').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.v === w)));
  }
  function mountScenes() {
    document.querySelectorAll('[data-scene]').forEach(root => {
      if (root.dataset.on) return; root.dataset.on = '1';
      const box = root.querySelector('.scene-box'); sceneSet(root, +root.dataset.init || parseInt(box.style.width));
      root.querySelector('.seg').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { e.stopPropagation(); sceneSet(root, +b.dataset.v); } }, true);
      const h = root.querySelector('.scene-handle');
      h.addEventListener('pointerdown', e => { h.setPointerCapture(e.pointerId); const x0 = e.clientX, w0 = +root.dataset.w, fit = +box.dataset.fit || 1;
        const mv = ev => sceneSet(root, w0 + (ev.clientX - x0) / fit); const up = () => { h.removeEventListener('pointermove', mv); h.removeEventListener('pointerup', up); };
        h.addEventListener('pointermove', mv); h.addEventListener('pointerup', up); });
    });
  }
  addEventListener('resize', () => document.querySelectorAll('[data-scene]').forEach(r => sceneSet(r, +r.dataset.w)));

  // ---------- 间距与布局 ----------
  function shellLab() {
    const bars = Array.from({ length: 12 }, () => '<i></i>').join('');
    return `<div class="shell-lab" data-shell-lab><div class="spec-bar"><span>顶栏</span>${seg('sheader', [['0', '不要'], ['48', '窄顶栏']], '0')}<span>侧栏</span>${seg('sside', [['256', '展开'], ['48', '收起'], ['288', '抽屉'], ['0', '不要']], '256')}<span>内边距</span>${seg('spad', [['24', '桌面'], ['16', '手持']], '24')}</div><div class="shell-stage"><div class="shell-demo shell-live no-top" data-shell-demo style="--sd-side:256px;--sd-top:0px;--sd-pad:24px"><div class="sd-top">窄顶栏：面包屑、搜索、当前对象</div><div class="sd-side" data-shell-side>侧栏</div><div class="sd-main"><div class="sd-grid">${bars}</div><span>工作区 · 白底 · 12 栏</span></div></div><p class="shell-read" data-shell-read>无顶栏 · 侧栏展开 256px · 内边距 24px</p></div></div>`;
  }
  function paintShell(lab) {
    if (!lab) return;
    const on = name => { const el = lab.querySelector(`[data-seg="${name}"] [aria-pressed="true"]`); return el ? el.dataset.v : ''; };
    const top = on('sheader') || '0', side = on('sside') || '256', pad = on('spad') || '24';
    const demo = lab.querySelector('[data-shell-demo]');
    demo.style.setProperty('--sd-top', top + 'px');
    demo.style.setProperty('--sd-side', side + 'px');
    demo.style.setProperty('--sd-pad', pad + 'px');
    demo.classList.toggle('no-top', top === '0');
    demo.classList.toggle('no-side', side === '0');
    const sideName = { 0: '无侧栏', 48: '侧栏收起 48px', 256: '侧栏展开 256px', 288: '侧栏抽屉 288px' }[side] || `侧栏 ${side}px`;
    lab.querySelector('[data-shell-side]').textContent = side === '48' ? '' : '侧栏';
    lab.querySelector('[data-shell-read]').textContent = `${top === '0' ? '无顶栏' : '窄顶栏 48px'} · ${sideName} · 内边距 ${pad}px`;
  }
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
      + sec('shell', '页面结构', '从任务出发决定要不要顶栏和侧栏。常见是左侧导航 + 右侧工作区，不要顶栏；需要顶栏时保持窄，只放有用的内容。', shellLab() + tokTable(L, L.shell, 'shell.', () => ''))
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
      return `<div class="ms-row" data-ms-in="${parseFloat(d)}" data-ms-out="${parseFloat(x)}" data-ms-ein="${moCb(moVal(M, v.enter))}" data-ms-eout="${moCb(moVal(M, v.exit))}" data-ms-kind="${k}"><code>surface.${k}</code><span>${esc(o.$description)}</span><span class="ms-t">进入 ${d}<br>退出 ${x}</span><span class="ms-demo"><i></i></span><button type="button" class="icon-btn" data-ms-play aria-label="播放">${I.replay}</button></div>`; }).join('');
    return `<div class="ms-list">${rows}</div>`;
  }
  function playMm(card) { const i = card.querySelector('.mm-track i'); i.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${card.querySelector('.mm-track').clientWidth - 24}px)` }], { duration: +card.dataset.mmDur, easing: card.dataset.mmEz, fill: 'forwards' }); }
  function playMs(row) {
    const i = row.querySelector('.ms-demo i'), d = row.dataset, k = d.msKind;
    const from = k === 'contextual' ? { opacity: 0, transform: 'scale(0.96)' } : k === 'panel' ? { transform: 'translateX(-100%)' } : k === 'disclosure' ? { transform: 'scaleY(0)' } : k === 'notify' ? { opacity: 0, transform: 'translateY(8px)' } : k === 'hover' || k === 'data' ? { backgroundColor: 'var(--muted)' } : { opacity: 0, transform: 'scale(0.98)' };
    const to = { opacity: 1, transform: 'none', backgroundColor: 'var(--foreground)' };
    i.animate([from, to], { duration: +d.msIn, easing: d.msEin, fill: 'forwards' }).finished.then(() => setTimeout(() => i.animate([to, from], { duration: +d.msOut, easing: d.msEout, fill: 'forwards' }), 500));
  }

  // ---------- 动效 ----------
  function vMotion() {
    const M = D.motion;
    if (!M) return '<p class="muted">没有读取到动效 token。</p>';
    const dur = k => px((M.duration[k] || {}).$value);
    const curve = v => { const [a, b, c, d] = v; const X = x => 10 + x * 180, Y = y => 90 - y * 70; return `<svg viewBox="0 0 200 100" class="ez"><path class="ez-guide" d="M10 90 H190 M10 20 H190"/><path class="ez-handle" d="M${X(0)} ${Y(0)} L${X(a)} ${Y(b)} M${X(1)} ${Y(1)} L${X(c)} ${Y(d)}"/><circle class="ez-pt" cx="${X(a)}" cy="${Y(b)}" r="3"/><circle class="ez-pt" cx="${X(c)}" cy="${Y(d)}" r="3"/><path class="ez-curve" d="M${X(0)} ${Y(0)} C ${X(a)} ${Y(b)}, ${X(c)} ${Y(d)}, ${X(1)} ${Y(1)}"/></svg>`; };
    const cards = entries(M.easing).map(([k, o]) => { const pair = ext(o).pair || 'duration.base'; const ms = dur(pair.split('.')[1]); const cb = `cubic-bezier(${o.$value.join(', ')})`; return `<div class="ez-card" data-ez="${cb}" data-ms="${ms}"><div class="ez-head"><div><code>easing.${k}</code><p>${esc(o.$description)}</p></div><button type="button" class="ez-play" data-ez-play aria-label="播放">${'<svg viewBox="0 0 16 16"><path d="M5 3.5v9l7-4.5z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>'}</button></div>${curve(o.$value)}<div class="ez-track"><i></i></div><p class="ez-why">${esc(ext(o).rationale || '')}</p><code class="ez-foot">${cb} · ${ms}ms</code></div>`; }).join('');
    const scene = `<div class="spec mo-lab"><div class="spec-bar"><span class="muted">点击按钮，在真实组件上看每一档动效</span></div><div class="spec-body mo-stage">
      <div class="mo-demo"><button type="button" class="ui-btn outline" data-mo-demo="menu">打开下拉</button><div class="mo-menu" id="mo-menu"><div>重命名</div><div>复制路径</div><div>导出</div></div><small>进入 enter · ${dur('base')}ms，关闭 exit · ${dur('fast')}ms</small></div>
      <div class="mo-demo"><button type="button" class="ui-btn outline" data-mo-demo="drawer">推入侧滑面板</button><div class="mo-drawer-wrap"><div class="mo-drawer" id="mo-drawer"><b>CNC-03</b><span>主轴温度 72.4 °C</span></div></div><small>移动 standard · ${dur('slow')}ms</small></div>
      <div class="mo-demo"><button type="button" class="ui-btn primary mo-hover">悬停 / 按下</button><small>颜色变化 · ${dur('fast')}ms</small></div>
      <div class="mo-demo"><span class="mo-led"><i class="sig" style="animation-duration:${M.duration.signal.$value}"></i>运行中</span><small>循环 signal · ${M.duration.signal.$value}，同一视图只有一个</small></div>
    </div></div>`;
    return docHead('动效', '动效帮助用户理解变化：东西从哪里来、到哪里去、现在处于什么状态。产品界面用高效动效，品牌场合用表现动效；不用来装饰。')
      + sec('scene', '场景演示', '每种界面变化对应一组固定的时长和曲线。', scene)
      + sec('easing', '曲线', '每条曲线进入视野时播放一次，点击右上角可再次播放。不用回弹和弹性曲线：工业界面里回弹会被读成「数值在抖动」。', `<div class="ez-grid">${cards}</div>`)
      + sec('duration', '时长', '移动距离越大，时长越长；退出比进入短。', tokTable(M, M.duration, 'duration.', v => `<i class="sp-bar" style="width:${Math.min(px(v) / 4, 120)}px"></i>`))
      + sec('modes', '两种模式', '', moModes(M))
      + sec('surfaces', '动效场景', '', moSurfaces(M))
      + sec('rules', '使用规则', '', ruleList(M));
  }

  const VIEWS = { spacing: vSpacing, shape: vShape, motion: vMotion, home: vHome, foundation: vFoundation, color: vColor, typography: vTypo, components: vComponents, scaffold: vScaffold, logo: vLogo, texture: vTexture, illustration: vIllustration, designmd: vDesignMd, skills: vSkills };
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
      if (k === 'sheader' || k === 'sside' || k === 'spad') { sg.parentElement.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === sg))); paintShell(sg.closest('[data-shell-lab]')); return; }
      if (k === 'labmode') { lab.mode = v; sg.parentElement.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === sg))); return; }
      if (k === 'bwscene') { const r = BW_SCENES.find(x => x[0] === v)[2]; Object.assign(bw, { scene: v }, r); return route(true); }
      if (k === 'bwstyle' || k === 'bwcolor') { bw[k === 'bwstyle' ? 'style' : 'color'] = v; sg.parentElement.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === sg))); bwPaint(); return; }
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
    document.body.classList.toggle('hero-on', !!wb && scrollY < wb.offsetHeight * 0.1);
    document.body.classList.toggle('nav-short', !!wb && scrollY < 24);
    scrollCue.update();
  }
  function playEz(card) { if (!card) return; const k = card.querySelector('.ez-track i'); k.style.transition = 'none'; k.style.left = '0px'; void k.offsetWidth; k.style.transition = `left ${card.dataset.ms}ms ${card.dataset.ez}`; k.style.left = 'calc(100% - 28px)'; }
  function ccPaint() { const o = document.getElementById('cc-o'); if (!o) return; const i = document.getElementById('cc-i'); const mode = (document.querySelector('[data-seg="ccmode"] [aria-pressed="true"]') || {}).dataset; const ov = +o.value, iv = +i.value; const inner = mode && mode.v === 'equal' ? ov : Math.max(0, ov - iv);
    const out = document.getElementById('cc-outer'), inn = document.getElementById('cc-inner'); out.style.borderRadius = ov + 'px'; out.style.padding = iv + 'px'; inn.style.borderRadius = inner + 'px';
    document.getElementById('cc-ov').textContent = ov + 'px'; document.getElementById('cc-iv').textContent = iv + 'px';
    document.getElementById('cc-f').textContent = mode && mode.v === 'equal' ? `inner ${inner} = outer ${ov}（等值，四角间隙不均）` : `inner ${inner} = outer ${ov} − inset ${iv}${ov - iv < 0 ? '（小于 0 取 0）' : ''}`; }
  (() => { const bm = document.querySelector('.brandmark'); if (!bm) return; bm.innerHTML = logoSvg(); })();
  document.addEventListener('change', e => { if (e.target.id === 'lab-file' && e.target.files[0]) { const f = e.target.files[0]; labSource(URL.createObjectURL(f), f.type.startsWith('video')); } });
  document.addEventListener('portal:render', () => { mountScaffold(); mountScenes(); mountLab(); ccPaint(); const cards = document.querySelectorAll('.ez-card'); if (!cards.length) return; const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { playEz(e.target); io.unobserve(e.target); } }), { threshold: 0.6 }); cards.forEach(c => io.observe(c)); });
  window.addEventListener('scroll', () => { if (buildToc.spy) buildToc.spy(); heroState(); }, { passive: true });
  window.addEventListener('hashchange', () => route('anchor'));

  (async function start() {
    renderShell();
    document.getElementById('main').innerHTML = '<div class="loading"><i class="sig"></i>读取中</div>';
    await load(); applyTokens(); route();
  })();
})();
