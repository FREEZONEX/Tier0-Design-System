# Skills 注册表

本目录放 **可独立触发的 Agent Skills**。日常设计规范仍走根目录 [`SKILL.md`](../SKILL.md)。

| Skill | 干什么 | 入口 |
|-------|--------|------|
| **tier0-design** | 产品 UI / 官网 / PPT **规范路由** | [`../SKILL.md`](../SKILL.md) |
| **tier0-slide-skill** | 销售/售前 deck：**素材 → HTML + 可编辑 PPTX** | [`tier0-slide-skill/README.md`](tier0-slide-skill/README.md) |

## 冲突时听谁

1. 颜色 / 字体 / 禁忌 → `tokens/`、`surfaces/ppt/`、`references/ppt-checklist.md`
2. 怎么生成 deck → `skills/tier0-slide-skill/`
3. 更深规范骨架 → `references/ppt-*.md`

## Cursor 如何发现

```bash
mkdir -p .cursor/skills
ln -sfn ../../skills/tier0-slide-skill .cursor/skills/tier0-slide-skill
```

首次使用 PPT skill：

```bash
cd skills/tier0-slide-skill && npm install
```

然后读 [`tier0-slide-skill/README.md`](tier0-slide-skill/README.md) 的「三步上手」。
