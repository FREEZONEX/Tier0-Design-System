# Skills 注册表

本目录放 **可独立触发的 Agent Skills**。日常设计规范仍走根目录 [`SKILL.md`](../SKILL.md)。

| Skill | 干什么 | 入口 |
|-------|--------|------|
| **tier0-design** | 产品 UI / 官网 / PPT **规范路由** | [`../SKILL.md`](../SKILL.md) |
| **tier0-slide-skill** | 销售/售前 deck：**素材 → HTML + 可编辑 PPTX** | [`tier0-slide-skill/README.md`](tier0-slide-skill/README.md) |

## 一键安装 tier0-slide-skill

不 clone 整仓时，终端一行命令即可装到本机 Cursor / Codex：

```bash
curl -fsSL https://raw.githubusercontent.com/FREEZONEX/Tier0-Design-System/main/skills/tier0-slide-skill/scripts/install-skill.sh | bash
```

装完后新开对话：`@tier0-slide-skill …`

## 冲突时听谁

1. 颜色 / 字体 / 禁忌 → `tokens/`、`surfaces/ppt/`、`references/ppt-checklist.md`
2. 怎么生成 deck → `skills/tier0-slide-skill/`
3. 更深规范骨架 → `references/ppt-*.md`

## 本仓库内 Cursor 如何发现

```bash
mkdir -p .cursor/skills
ln -sfn ../../skills/tier0-slide-skill .cursor/skills/tier0-slide-skill
cd skills/tier0-slide-skill && npm install
```

然后读 [`tier0-slide-skill/README.md`](tier0-slide-skill/README.md)。
