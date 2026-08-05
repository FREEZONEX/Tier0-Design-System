# Archify × Tier0 Slide Skill

把 [tt-a1i/archify](https://github.com/tt-a1i/archify) 的**架构图生成方法**接到 Tier0 Slide Skill：拓扑、校验、导出跟 Archify；**视觉必须落回 Tier0 VI**（IBM Plex、黑灰、`#B2ED1D` 信号、直角、无霓虹多色语义彩虹）。

Vendored package：`vendor/archify/`（MIT，upstream `archify` skill v2.13）。

## 何时用 Archify

| 场景 | 工具 |
|------|------|
| 复杂系统图、需校验的 topology、序列/数据流/生命周期 | **Archify**（本文件）→ 导出 PNG/SVG 进证据槽 |
| 销售页上简单 hub / linear / tree（≤6 节点） | 优先 `architecture-native`（HTML/PPTX 原生节点线），见 `architecture-diagrams-tier0.md` |
| 用户已给架构截图 | `imageRole=product-evidence`，不要用 Archify 重画假拓扑 |

## 工作流（跟 Archify Fast path）

1. 选类型：`architecture` | `workflow` | `sequence` | `dataflow` | `lifecycle`。
2. 读 `vendor/archify/schemas/<type>.schema.json` + `common.schema.json` + 一个 `examples/` 样本（只学字段形状，不抄事实）。
3. 先写 candidate JSON（`meta.quality_profile: "showcase"`），主路径清晰，≤12 主节点。
4. 校验 / 交付（在 skill 根或 vendor 目录）：

```bash
node vendor/archify/bin/archify.mjs validate <type> candidate.json --quality showcase --json
node vendor/archify/bin/archify.mjs deliver <type> candidate.json out/diagram.html --quality showcase --json
```

5. **套 Tier0 主题**（强制，覆盖 Archify 默认多色 console）：

```bash
node scripts/apply-archify-tier0-theme.mjs out/diagram.html
```

6. 导出静态证据进 deck：浏览器 Export → PNG/SVG，或 Share Card；放入 `images/{页号}-architecture-{语义}.png`，`imageRole=architecture-native` 仅当图是原生节点；栅格导出用 `product-evidence` / `illustration` 不适用——用 `imageRole` 文档约定：`architecture-export`。

推荐 viewer：`theme=light` + `preset=blueprint`（直角、少 glow）。交付 HTML 后立即跑 theme 脚本。

## Tier0 视觉锁（覆盖 Archify DESIGN）

Archify 默认 JetBrains Mono + cyan/violet/amber 语义色——**不得直接进 Tier0 销售页**。

| Archify | Tier0 映射 |
|---------|------------|
| JetBrains Mono | IBM Plex Mono（标签）/ IBM Plex Sans（标题） |
| frontend cyan | 近墨描边 + 浅灰填；焦点用 `#B2ED1D` |
| backend green | `#73B200` 仅可读绿字；面用 `#F5FBDE` |
| database violet / cloud amber / … | 一律灰阶墨线；禁止彩虹节点 |
| 圆角 pill / glow | 直角或 4px；无 glow |
| Signal Flow 氛围 | 禁止用于客户 deck |

关系语法仍服从 `architecture-diagrams-tier0.md`：一图一种 grammar（hub / linear / tree / contrast）。

## 与 deck.json 的衔接

- 复杂图：Archify → PNG/SVG → `canvas` / `feature-split` / 证据槽。
- 简单图：继续用 dual builder 原生 `rect`/`line`/`text`，不要为装饰去跑 Archify。
- 禁止把 Archify 示例 topology 或 Proof Lab 场景事实拷进客户材料。

## 上游更新

```bash
# 从 upstream zip 刷新 vendor（排除 test）
curl -fsSL -o /tmp/archify.zip https://github.com/tt-a1i/archify/archive/refs/heads/main.zip
# 解压后 rsync 到 vendor/archify，保留本仓库的 tier0 theme 资产
```

完整 Archify 契约：`vendor/archify/SKILL.md`、`references/authoring-contract.md`、`references/delivery-contract.md`。
