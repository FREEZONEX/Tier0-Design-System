#!/usr/bin/env python3
"""生成仓库根目录的 DESIGN.md（遵循 DESIGN.md 格式：version / name / description 加 colors、typography、rounded、spacing、components 等 token；正文只写用法）。

- 精确数值只放在 YAML front matter；暗色主题的取值放在 `## Themes` 表格（格式允许的例外）。
- 正文只写用法与原则，章节顺序固定：Overview, Colors, Themes, Typography, Layout,
  Elevation & Depth, Shapes, Components, Motion, Do's and Don'ts。
- 数值来自 01-tokens，品牌与原则来自 00-foundation，组件用法写在本脚本的 COMPONENTS_MD。
改 token 或 foundation 后运行：python3 scripts/build_design_md.py
"""
import json, re, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
T = ROOT / '01-tokens'
load = lambda p: json.loads((T / p).read_text(encoding='utf-8'))
BASE, LIGHT, DARK = load('color/base.json'), load('color/light.json'), load('color/dark.json')
TYPO, SPACE, LAYOUT = load('typography.json'), load('spacing.json'), load('layout.json')
RADIUS, BORDER, SHADOW, MOTION = load('radius.json'), load('border.json'), load('shadow.json'), load('motion.json')
FOUND = (ROOT / '00-foundation/foundation.md').read_text(encoding='utf-8')
DOCS = {'color': BASE, 'font': TYPO, 'space': SPACE, 'radius': RADIUS, 'typography': TYPO}

def walk(ref):
    parts = ref.strip('{}').split('.')
    node = DOCS.get(parts[0])
    for p in parts:
        node = node[p]
    return node

def val(v, depth=0):
    if isinstance(v, str) and v.startswith('{') and depth < 8:
        n = walk(v)
        return val(n['$value'] if isinstance(n, dict) else n, depth + 1)
    return v

ext = lambda o: (o.get('$extensions') or {}).get('tier0', {})
entries = lambda g: [(k, v) for k, v in g.items() if not k.startswith('$') and isinstance(v, dict)]
q = lambda s: '"' + str(s).replace('"', '\\"') + '"'
rules = lambda doc: '\n'.join(f'- {r}' for r in ext(doc).get('rules', []))

def section(md, head):
    m = re.search(r'^' + re.escape(head) + r'\s*\n(.*?)(?=^#{1,3} |\Z)', md, re.S | re.M)
    return m.group(1).strip().rstrip('-').strip() if m else ''

def typo(o):
    v = o['$value']
    while isinstance(v, str):
        v = walk(v)['$value']
    f = val(v['fontFamily'])
    return {'fontFamily': f[0] if isinstance(f, list) else f, 'fontSize': val(v['fontSize']), 'fontWeight': val(v['fontWeight']),
            'lineHeight': val(v['lineHeight']), 'letterSpacing': val(v.get('letterSpacing', '0px'))}

# ---------- front matter ----------
fm = ['---', 'version: alpha', 'name: Tier0',
      'description: ' + q('Tier0 为制造业构建 Agentic 工业数据平台。界面近单色、克制、精确：白底细线组织结构，品牌绿只做信号，近直角，产品本身就是展示。')]
fm.append('colors:')
for g in ['surface', 'brand', 'status']:
    for k, o in entries(LIGHT['color'][g]):
        fm.append(f'  {k}: {q(val(o["$value"]))}')
for g, o in entries(BASE['color']['auxiliary']):
    fm.append(f'  {g}-500: {q(val(o["500"]["$value"]))}')
fm.append('typography:')
prod = {k: typo(o) for k, o in entries(TYPO['typography']['product'])}
for k, v in prod.items():
    fm.append(f'  {k}:'); fm += [f'    {a}: {q(b)}' for a, b in v.items()]
for k, o in entries(TYPO['typography']['web']):
    v = typo(o)
    if prod.get(k) == v:
        continue  # 与产品字阶相同的不重复
    fm.append(f'  web-{k}:'); fm += [f'    {a}: {q(b)}' for a, b in v.items()]
fm.append('rounded:')
fm += [f'  {k}: {q(val(o["$value"]))}' for k, o in entries(RADIUS['radius'])]
fm.append('spacing:')
fm += [f'  {q(k)}: {q(val(o["$value"]))}' for k, o in entries(SPACE['space'])]
fm += [f'  {k}: {q(val(o["$value"]))}' for k, o in entries(SPACE['semantic'])]
fm += [f'  {k}: {q(val(o["$value"]))}' for k, o in entries(SPACE['size'])]
size = lambda k: val(SPACE['size'][k]['$value'])
COMP = {
    'button-primary': {'backgroundColor': '{colors.primary}', 'textColor': '{colors.primary-foreground}', 'typography': '{typography.label}', 'rounded': '{rounded.md}', 'height': '{spacing.control-sm}', 'padding': '{spacing.button-x}'},
    'button-highlight': {'backgroundColor': '{colors.highlight}', 'textColor': '{colors.highlight-foreground}', 'typography': '{typography.label}', 'rounded': '{rounded.md}', 'height': '{spacing.control-sm}', 'padding': '{spacing.button-x}'},
    'input': {'backgroundColor': '{colors.background}', 'textColor': '{colors.foreground}', 'typography': '{typography.body-sm}', 'rounded': '{rounded.md}', 'height': '{spacing.control-md}', 'padding': '{spacing.control-x}'},
    'card': {'backgroundColor': '{colors.card}', 'textColor': '{colors.foreground}', 'rounded': '{rounded.lg}', 'padding': '{spacing.card-padding}'},
    'table-row': {'height': '{spacing.table-row}', 'typography': '{typography.body-sm}'},
    'metric': {'textColor': '{colors.foreground}', 'typography': '{typography.metric}'},
}
fm.append('shadow:')
fm += [f'  {k}: {q(val(o["$value"]))}' for k, o in entries(SHADOW['shadow'])]
fm.append('motion:')
fm += [f'  duration-{k}: {q(val(o["$value"]))}' for k, o in entries(MOTION['duration'])]
fm += [f'  easing-{k}: {q("cubic-bezier(" + ", ".join(str(x) for x in val(o["$value"])) + ")")}' for k, o in entries(MOTION['easing'])]
fm.append('layout:')
fm.append(f'  grid.columns: {q(LAYOUT["grid"]["columns"]["$value"])}')
for k in ['gutter', 'gutter-mobile']:
    fm.append(f'  grid.{k}: {q(val(LAYOUT["grid"][k]["$value"]))}')
for g in ['shell', 'width', 'breakpoint']:
    for k, o in entries(LAYOUT[g]):
        v = o['$value']
        v = val(v) if not (isinstance(v, str) and v.startswith('{size')) else val(SPACE['size'][v.strip('{}').split('.')[1]]['$value'])
        fm.append(f'  {g}.{k}: {q(v)}')
fm.append('border:')
fm += [f'  "{k}": {q(val(o["$value"]))}' for k, o in entries(BORDER['border'])]
fm.append('components:')
for name, props in COMP.items():
    fm.append(f'  {name}:'); fm += [f'    {k}: {q(v)}' for k, v in props.items()]
fm.append('---')

# ---------- markdown ----------
what = section(FOUND, '### Tier0 是什么')
traits = re.findall(r'^\| \*\*(.+?)\*\* \| (.+?) \|$', section(FOUND, '### 特征'), re.M)
principles = re.findall(r'\*\*(.+?)\*\*\n(.+)', section(FOUND, '## 2. 设计原则'))
anti = re.findall(r'^\| (?!类别|---)(.+?) \| (.+?) \|$', section(FOUND, '### 禁止（Anti）'), re.M)

themes = ['| Token | 亮色 | 暗色 |', '|---|---|---|']
for g in ['surface', 'brand', 'status']:
    for k, o in entries(LIGHT['color'][g]):
        themes.append(f'| `{k}` | {val(o["$value"])} | {val(DARK["color"][g][k]["$value"])} |')

COMPONENTS_MD = (ROOT / 'scripts/design-md.components.md').read_text(encoding='utf-8').strip()

body = ['', '## Overview', '', what, '', '\n'.join(f'- **{t}**：{d}' for t, d in traits), '',
        '## Colors', '', rules(LIGHT['color']), '',
        '- 状态色的浅底（组件没有覆盖时）：背景用状态色 10% 透明度（暗色 15%），描边 10%（暗色 25%），文字和图标用状态色本身。整块横幅提示用 4% 底色加 30% 描边。',
        '- 辅助色（`red-500` 等）只用于图表系列和分类标签；完整色阶见 `01-tokens/color/base.json`。', '',
        '## Themes', '', '亮色和暗色共用同一套 token 名称，深色模式由 `.dark` 类切换。', '', '\n'.join(themes), '',
        '## Typography', '', rules(TYPO['typography']), '',
        '- 字体加载：Tier0-Frontend 用 `next/font/google` 加载 Inter 和 IBM Plex Sans；独立页面用 Google Fonts 加载 Inter、IBM Plex Sans 和 IBM Plex Mono。中文不加载 Web 字体。', '',
        '## Layout', '', rules(SPACE), rules(LAYOUT), '',
        '## Elevation & Depth', '', SHADOW.get('$description', ''), '', rules(SHADOW), '',
        '## Shapes', '', rules(RADIUS), rules(BORDER), '',
        '## Components', '', COMPONENTS_MD, '',
        '## Motion', '', rules(MOTION), '',
        "## Do's and Don'ts", '', '**Do**', ''] + [f'- **{t}**：{d.strip()}' for t, d in principles] + ['', "**Don't**", ''] + [f'- {c}：{d}' for c, d in anti] + [
        '- 英文全大写、加宽字距的小标签和眉题（如 `TOKENS`、`OVERVIEW`）。',
        '- 等宽字体用在代码和命令行以外的地方：读数、标签、导航、路径说明都用常规字体。',
        '- 不承载内容、只用来划分空间的宽顶栏。',
        '- 导航、菜单、列表的悬停和选中用品牌绿。',
        '- 产品界面里整块填灰的卡片；为了和旁边对齐而拉高、留出大片空白的区块。',
        '- 所有区块用同一个间距，分不出哪些是一组。',
        '- 一个面板里标题、操作、筛选、列表之间层层加分割线。',
        '- 同一个信息同时用图标、颜色和文字重复表达。',
        '- 原型的状态切换、方案切换混进产品界面里。',
        '- 页面上单独出现的 Tier0 标志用文字代替 SVG。', '']
out = re.sub(r'\n{3,}', '\n\n', '\n'.join(fm + body))
(ROOT / 'DESIGN.md').write_text(out, encoding='utf-8')
print('DESIGN.md', len(out.splitlines()), 'lines', len(out), 'chars')
