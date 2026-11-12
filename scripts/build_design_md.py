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
DOCS = {'color': BASE, 'font': TYPO, 'space': SPACE, 'radius': RADIUS, 'typography': TYPO, 'duration': MOTION, 'easing': MOTION}

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
for k in ['columns', 'gutter', 'gutter-mobile']:
    v = LAYOUT['grid'][k]['$value']
    v = val(v) if isinstance(v, str) else v
    fm.append(f'  grid-{k}: {v if isinstance(v, (int, float)) or str(v).isdigit() else q(v)}')
for g in ['shell', 'width', 'breakpoint']:
    for k, o in entries(LAYOUT[g]):
        v = o['$value']
        v = val(v) if not (isinstance(v, str) and v.startswith('{size')) else val(SPACE['size'][v.strip('{}').split('.')[1]]['$value'])
        fm.append(f'  {g}-{k}: {q(v)}')
fm.append('components:')
for name, props in COMP.items():
    fm.append(f'  {name}:'); fm += [f'    {k}: {q(v)}' for k, v in props.items()]
fm.append('---')

# ---------- markdown ----------
themes = ['| Token | 亮色 | 暗色 |', '|---|---|---|']
for g in ['surface', 'brand', 'status']:
    for k, o in entries(LIGHT['color'][g]):
        themes.append(f'| `{k}` | {val(o["$value"])} | {val(DARK["color"][g][k]["$value"])} |')
body = (ROOT / 'scripts/design-md.body.md').read_text(encoding='utf-8').replace('{{themes}}', '\n'.join(themes))
VALS = {f'colors.{k}': val(o['$value']) for grp in ['surface', 'brand', 'status'] for k, o in entries(LIGHT['color'][grp])}
VALS.update({f'shadow.{k}': val(o['$value']) for k, o in entries(SHADOW['shadow'])})
body = re.sub(r'\{\{([\w.-]+)\}\}', lambda m: VALS[m.group(1)], body)
out = re.sub(r'\n{3,}', '\n\n', '\n'.join(fm) + '\n\n' + body.strip() + '\n')
(ROOT / 'DESIGN.md').write_text(out, encoding='utf-8')
print('DESIGN.md', len(out.splitlines()), 'lines', len(out), 'chars')
