#!/usr/bin/env python3
"""用 scripts/design-md.template.md 的写法说明，加上 01-tokens 与 00-foundation 的内容，生成仓库根目录的 DESIGN.md。

DESIGN.md 采用通用格式：YAML front matter 放机器可读的 token，正文按
Overview / Colors / Typography / Layout / Elevation & Depth / Shapes / Components / Do's and Don'ts
组织。不要手改 DESIGN.md，改 token 或 foundation 后重新运行：python3 scripts/build_design_md.py
"""
import json, re, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
T = ROOT / '01-tokens'
load = lambda p: json.loads((T / p).read_text(encoding='utf-8'))
BASE, LIGHT, DARK = load('color/base.json'), load('color/light.json'), load('color/dark.json')
TYPO, SPACE, LAYOUT = load('typography.json'), load('spacing.json'), load('layout.json')
RADIUS, BORDER, SHADOW, MOTION = load('radius.json'), load('border.json'), load('shadow.json'), load('motion.json')
FOUND = (ROOT / '00-foundation/foundation.md').read_text(encoding='utf-8')

DOCS = {'color': BASE, 'font': TYPO, 'space': SPACE, 'radius': RADIUS}

def walk(ref):
    parts = ref.strip('{}').split('.')
    for doc in [DOCS.get(parts[0]), BASE, TYPO, SPACE, RADIUS]:
        node = doc
        try:
            for p in parts:
                node = node[p]
            return node
        except (KeyError, TypeError):
            continue
    raise KeyError(ref)

def val(v, depth=0):
    if isinstance(v, str) and v.startswith('{') and depth < 6:
        n = walk(v)
        return val(n['$value'] if isinstance(n, dict) else n, depth + 1)
    return v

ext = lambda o: (o.get('$extensions') or {}).get('tier0', {})
entries = lambda g: [(k, v) for k, v in g.items() if not k.startswith('$') and isinstance(v, dict)]
first = lambda s: (s or '').split('——')[0].strip()

def section(md, head):
    m = re.search(r'^' + re.escape(head) + r'\s*\n(.*?)(?=^#{1,3} |\Z)', md, re.S | re.M)
    return m.group(1).strip() if m else ''

def fam(v):
    v = val(v)
    return v[0] if isinstance(v, list) else v

def q(s):
    return '"' + str(s).replace('"', '\\"') + '"'

# ---------- front matter ----------
fm = ['---', 'version: alpha', 'name: tier0-design', 'description: ' + q('设计、搭建或改进 Tier0 出品的产品界面、平台应用、官网和宣传物料时使用。提供 Tier0 的品牌语境、取舍顺序、场景判断、视觉系统（近单色、品牌绿只做信号、细线、近直角）、要拒绝的生成式习惯和全部 token。')]

fm.append('colors:')
for g in ['surface', 'brand', 'status']:
    for k, o in entries(LIGHT['color'][g]):
        fm.append(f'  {k}: {q(val(o["$value"]))}')
fm.append('colors-dark:')
for g in ['surface', 'brand', 'status']:
    for k, o in entries(DARK['color'][g]):
        fm.append(f'  {k}: {q(val(o["$value"]))}')

fm.append('colors-auxiliary:')
for g, o in entries(BASE['color']['auxiliary']):
    for k, v in entries(o):
        fm.append(f'  {g}-{k}: {q(val(v["$value"]))}')
fm.append('typography:')
for setname in ['product', 'web']:
    for k, o in entries(TYPO['typography'][setname]):
        v = o['$value']
        if isinstance(v, str):
            v = walk(v)['$value']
        name = k if setname == 'product' else f'web-{k}'
        fm.append(f'  {name}:')
        fm.append(f'    fontFamily: {q(fam(v["fontFamily"]))}')
        for key in ['fontSize', 'fontWeight', 'lineHeight', 'letterSpacing']:
            if key in v:
                fm.append(f'    {key}: {q(val(v[key]))}')

fm.append('rounded:')
for k, o in entries(RADIUS['radius']):
    fm.append(f'  {k}: {q(val(o["$value"]))}')
fm.append('spacing:')
for k, o in entries(SPACE['space']):
    fm.append(f'  {q(k)}: {q(val(o["$value"]))}')
for k, o in entries(SPACE['semantic']):
    fm.append(f'  {k}: {q(val(o["$value"]))}')
fm.append('components:')
COMP = {
    'button-primary': {'backgroundColor': '{colors.primary}', 'textColor': '{colors.primary-foreground}', 'typography': '{typography.label}', 'rounded': '{rounded.md}', 'height': val(SPACE['size']['control-sm']['$value']), 'padding': '0 ' + val(SPACE['semantic']['button-x']['$value'])},
    'button-highlight': {'backgroundColor': '{colors.highlight}', 'textColor': '{colors.highlight-foreground}', 'typography': '{typography.label}', 'rounded': '{rounded.md}', 'height': val(SPACE['size']['control-sm']['$value'])},
    'input': {'backgroundColor': '{colors.background}', 'textColor': '{colors.foreground}', 'typography': '{typography.body-sm}', 'rounded': '{rounded.md}', 'height': val(SPACE['size']['control-md']['$value']), 'padding': '0 ' + val(SPACE['semantic']['control-x']['$value'])},
    'card': {'backgroundColor': '{colors.card}', 'textColor': '{colors.foreground}', 'rounded': '{rounded.lg}', 'padding': val(SPACE['semantic']['card-padding']['$value'])},
    'table-row': {'height': val(SPACE['size']['table-row']['$value']), 'typography': '{typography.body-sm}'},
}
for name, props in COMP.items():
    fm.append(f'  {name}:')
    for k, v in props.items():
        fm.append(f'    {k}: {q(v)}')
fm.append('---')

# ---------- body ----------
def table(rows, head):
    out = ['| ' + ' | '.join(head) + ' |', '|' + '---|' * len(head)]
    out += ['| ' + ' | '.join(str(c) for c in r) + ' |' for r in rows]
    return '\n'.join(out)

def rules(doc):
    return '\n'.join(f'- {r}' for r in ext(doc).get('rules', []))

what = section(FOUND, '### Tier0 是什么')
principles = re.findall(r'\*\*(.+?)\*\*\n(.+)', section(FOUND, '## 2. 设计原则'))
anti = re.findall(r'^\| (?!类别|---)(.+?) \| (.+?) \|$', section(FOUND, '### 禁止（Anti）'), re.M)

story = [x.strip() for x in section(FOUND, '### 故事').split('\n\n') if x.strip()]
traits = section(FOUND, '### 特征').rstrip('-\n ')
def joinrules(*docs):
    return '\n'.join(r for r in (rules(d) for d in docs) if r)

tok = ['### 颜色', '']
for g in ['surface', 'brand', 'status']:
    grp = LIGHT['color'][g]
    tok += [f'**{first(grp.get("$description", g)).split("。")[0]}**', '',
            table([(f'`{k}`', val(o['$value']), val(DARK['color'][g][k]['$value']), first(o.get('$description', ''))) for k, o in entries(grp)], ['Token', '亮色', '暗色', '用途']), '']
aux = BASE['color']['auxiliary']
tok += [f'**{first(aux.get("$description", "辅助色")).split("。")[0]}**（{first(aux.get("$description", "")).split("。", 1)[-1].strip()}）', '',
        table([(g, *[val(o[k]['$value']) for k in ['100', '300', '500', '700', '900']]) for g, o in entries(aux)], ['色相', '100', '300', '500', '700', '900']), '']
tok += ['### 字体', '', table([(k, ' / '.join(val(o['$value'])[:2]), first(o.get('$description', ''))) for k, o in entries(TYPO['font']['family'])], ['字体', '首选', '说明']), '']
for setname, title in [('product', '产品字阶'), ('web', '官网字阶')]:
    rows = []
    for k, o in entries(TYPO['typography'][setname]):
        v = o['$value'] if not isinstance(o['$value'], str) else walk(o['$value'])['$value']
        rows.append((k, val(v['fontSize']), val(v['lineHeight']), val(v['fontWeight']), first(o.get('$description', ''))))
    tok += [f'**{title}**', '', table(rows, ['名称', '字号', '行高', '字重', '用途']), '']
tok += ['### 间距', '', table([(f'space.{k}', val(o['$value']), first(o.get('$description', ''))) for k, o in entries(SPACE['space'])], ['Token', '值', '用途']), '',
        table([(k, val(o['$value']), first(o.get('$description', ''))) for k, o in entries(SPACE['size'])], ['尺寸', '值', '用途']), '',
        '### 断点', '', table([(k, val(o['$value']), first(o.get('$description', ''))) for k, o in entries(LAYOUT['breakpoint'])], ['名称', '宽度', '场景']), '',
        '### 圆角', '', table([(f'radius.{k}', val(o['$value']), first(o.get('$description', ''))) for k, o in entries(RADIUS['radius'])], ['Token', '值', '用途']), '',
        '### 线宽', '', table([(f'border.{k}', val(o['$value']), first(o.get('$description', ''))) for k, o in entries(BORDER['border'])], ['Token', '值', '用途']), '',
        '### 阴影', '', table([(f'shadow.{k}', f'`{val(o["$value"])}`', first(o.get('$description', ''))) for k, o in entries(SHADOW['shadow'])], ['Token', '值', '用途']), '',
        '### 动效', '', table([(f'duration.{k}', val(o['$value']), first(o.get('$description', ''))) for k, o in entries(MOTION['duration'])], ['Token', '值', '用途']), '',
        table([(f'easing.{k}', 'cubic-bezier(' + ', '.join(str(x) for x in val(o['$value'])) + ')', first(o.get('$description', ''))) for k, o in entries(MOTION['easing'])], ['Token', '值', '用途'])]

fill = {
    'WHAT': what,
    'STORY_LAST': story[-1] if story else '',
    'TRAITS': traits,
    'COLOR_RULES': rules(LIGHT['color']),
    'TYPO_RULES': first(TYPO['typography'].get('$description', '')) + '\n\n' + rules(TYPO['typography']),
    'SPACE_RULES': joinrules(SPACE, LAYOUT),
    'SHAPE_RULES': joinrules(RADIUS, BORDER, SHADOW),
    'MOTION_RULES': rules(MOTION),
    'ANTI': '\n'.join(f'- {c}：{d}' for c, d in anti),
    'PRINCIPLES': '\n'.join(f'- **{t}**：{d.strip()}' for t, d in principles),
    'TOKENS': '\n'.join(tok),
}
tpl = (ROOT / 'scripts/design-md.template.md').read_text(encoding='utf-8')
for k, v in fill.items():
    tpl = tpl.replace('{{' + k + '}}', v.strip())
body = ['', '> 本文件由 `scripts/build_design_md.py` 根据 `scripts/design-md.template.md`、`01-tokens/` 与 `00-foundation/` 生成，请勿手改。', '', tpl]
out = '\n'.join(fm + body)
out = re.sub(r'\n{3,}', '\n\n', out)
(ROOT / 'DESIGN.md').write_text(out, encoding='utf-8')
print('DESIGN.md', len(out.splitlines()), 'lines')
