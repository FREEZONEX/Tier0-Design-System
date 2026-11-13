# 给 AI 的入口

Read DESIGN.md before any UI work.

- 做任何 Tier0 的设计、开发或评审：先读 `.agents/skills/tier0-design/SKILL.md`（取舍顺序、分阶段工作法、品牌图形），再读根目录 `DESIGN.md`（视觉取值，8 段）。
- 用到具体组件时，读 `02-components/guidelines/` 里对应的文件。
- 一条规则只写一处：值和「选哪个值」在 `01-tokens/`，组件和页面怎么搭在 `02-components/guidelines/`，`DESIGN.md` 只做汇总。
- `DESIGN.md` 由 `scripts/build_design_md.py` 生成：front matter 来自 `01-tokens/`，正文来自 `scripts/design-md.body.md`，Components 段取自各 guideline 的「> 摘要」行。不要手改 `DESIGN.md`，改源文件后重新运行脚本，再运行 `python3 scripts/check_rules.py` 确认没有重复规则。
- 文字类内容一律使用中文。
