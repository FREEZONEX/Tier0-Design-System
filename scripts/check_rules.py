#!/usr/bin/env python3
"""检查「一条规则只写一处」。

规则有三个归属：
- 01-tokens/*.json 的 $extensions.tier0.rules：选哪个值
- 02-components/guidelines/*.md：组件和页面怎么搭
- scripts/design-md.body.md：DESIGN.md 的总说明（Components 段由 guidelines 的摘要生成）

脚本把三处的句子拆开比对，同一句话（去掉标点和空白后至少 16 个字）出现在两个以上文件里就报出来。
guidelines 的「> 摘要」行会进入 DESIGN.md，属于有意的引用，不参与比对。
用法：python3 scripts/check_rules.py（有重复时退出码为 1）
"""
import json, re, sys, pathlib
from collections import defaultdict

ROOT = pathlib.Path(__file__).resolve().parent.parent
MIN = 16


def sentences(text):
    for part in re.split(r'[。；\n]', text):
        norm = re.sub(r'[\s`*_>（）()「」，、：:,.\-|]', '', part)
        if len(norm) >= MIN:
            yield norm, part.strip(' -*>')


def token_rules():
    for f in sorted((ROOT / '01-tokens').rglob('*.json')):
        def walk(o):
            if isinstance(o, dict):
                yield from ((o.get('$extensions') or {}).get('tier0', {}).get('rules') or [])
                for k, v in o.items():
                    if not k.startswith('$'):
                        yield from walk(v)
        yield f, '\n'.join(walk(json.loads(f.read_text(encoding='utf-8'))))


def sources():
    yield from token_rules()
    for f in sorted((ROOT / '02-components/guidelines').glob('*.md')):
        if f.name == 'README.md':
            continue
        text = '\n'.join(l for l in f.read_text(encoding='utf-8').splitlines() if not l.startswith('> 摘要'))
        text = re.sub(r'```.*?```', '', text, flags=re.S)  # 代码示例不算规则
        yield f, text
    yield ROOT / 'scripts/design-md.body.md', (ROOT / 'scripts/design-md.body.md').read_text(encoding='utf-8')


seen = defaultdict(set)
sample = {}
for f, text in sources():
    for norm, raw in sentences(text):
        seen[norm].add(str(f.relative_to(ROOT)))
        sample.setdefault(norm, raw)

dups = {k: v for k, v in seen.items() if len(v) > 1}
for k, files in sorted(dups.items(), key=lambda x: sorted(x[1])):
    print(f'重复：{sample[k][:60]}…\n  出现在：' + '、'.join(sorted(files)))
print(f'共 {len(dups)} 处重复。' if dups else '没有发现重复的规则。')
sys.exit(1 if dups else 0)
