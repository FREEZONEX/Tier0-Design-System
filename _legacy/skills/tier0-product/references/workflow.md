# 交付工作流

从「给我一个 Figma 链接」到「开发能照着实现的原型」。每一步写明输入、动作和产出。

## 0. 对齐范围

**输入**：用户消息里的 Figma 链接、截图、补充要求。

确认这几件事，能从上下文推断就不要问：

| 项 | 例子 |
|----|------|
| 主稿节点 | `17896:5453`（最新 Plan & Billing section） |
| 沿用旧版的节点 | `10982:79999`（旧版弹窗、边界场景） |
| 角色 | Owner / Builder；哪些模块 owner-only |
| 场景与边界态 | 正常、试用、满额、新空间无数据、已取消、未绑卡、加载中、失败 |
| 交付对象 | 开发（要组件映射）还是评审（要流程完整） |
| 语言 | 产品界面英文；是否需要中文切换 |

把用户这轮和之前说过的硬要求记进约束账本（[`execution-contract`](../../../references/execution-contract.md) §0），之后每轮修改都对照，避免改 A 丢 B。

**链接解析**：`figma.com/design/<fileKey>/...?node-id=17896-5453` → fileKey + nodeId `17896:5453`（`-` 换成 `:`）。

## 1. 取 Figma

先截图看全貌，再用脚本取数。只靠截图估尺寸会出错，弹窗宽度、字号、间距必须取实数。

**截图**（Figma MCP）：

```
get_screenshot(fileKey, nodeId, maxDimension=1400)
```

section 很大时先列子节点，再逐个截图：

```js
// use_figma，只读
const s = await figma.getNodeByIdAsync('17896:5453');
return s.children.map(c => `${c.id} | ${c.type} | ${c.name} | ${Math.round(c.width)}x${Math.round(c.height)}`).join('\n');
```

**取精确规格**：遍历帧内文字、图标、自动布局。根节点自身不要被位置过滤掉。

```js
// use_figma，只读。把 FRAME_ID 换成目标帧；CONTENT_X 是内容区左边界（跳过侧栏）
const FRAME_ID = '17844:85586', CONTENT_X = 480;
const root = await figma.getNodeByIdAsync(FRAME_ID);
const fx = root.absoluteBoundingBox.x, fy = root.absoluteBoundingBox.y, out = [];
const hex = (p) => { const f = p && p !== figma.mixed && p[0]; return f && f.color ? '#' + ['r','g','b'].map(k => Math.round(f.color[k]*255).toString(16).padStart(2,'0')).join('') : ''; };
const walk = (n) => {
  if (n.visible === false) return;
  const bb = n.absoluteBoundingBox; if (!bb) return;
  const inC = bb.x - fx >= CONTENT_X, pos = `@${Math.round(bb.x-fx)},${Math.round(bb.y-fy)}`;
  if (n.type === 'TEXT' && inC) { out.push(`T "${n.characters.slice(0,36)}" ${n.fontSize} ${n.fontName.family} ${n.fontName.style} ${hex(n.fills)} ${pos}`); return; }
  if (n.type === 'INSTANCE' && bb.width <= 24 && inC) { out.push(`I ${n.mainComponent?.name} ${Math.round(bb.width)}px ${pos}`); return; }
  if (inC && n.layoutMode && n.layoutMode !== 'NONE') out.push(`F "${n.name}" gap=${n.itemSpacing} pad=${n.paddingTop},${n.paddingRight},${n.paddingBottom},${n.paddingLeft} r=${n.cornerRadius} ${Math.round(bb.width)}x${Math.round(bb.height)} ${pos}`);
  if ('children' in n) n.children.forEach(walk);
};
walk(root);
return out.slice(0, 300).join('\n');
```

**弹窗宽度**：对每个旧版弹窗节点取 `width`、`paddingLeft`、`itemSpacing`。Tier0 弹窗常见 480 / 500，内边距 32。

**图标**：有的图标不是 INSTANCE 而是名为 `icon/blocks` 的 FRAME，按名字找：

```js
root.findAll(n => n.name.startsWith('icon/')).map(n => `${n.name} ${Math.round(n.width)}px`)
```

注意：
- `findAllWithCriteria` 不进入 instance 内部，找实例里的文字用 `findAll(n => n.type === 'TEXT')`
- 同一个 section 里可能有旧帧和新帧，按位置和名字确认哪个是最新
- 节点报 not found 时重新列 section 子节点，别猜 ID

**产出**：每个帧的截图 + 一份规格清单（字号、间距、宽度、图标名、颜色）。

## 2. 读代码真源

在 Tier0-Frontend 里读，不凭记忆写 class。

| 要什么 | 路径 |
|--------|------|
| 原色阶 | `packages/theme/src/variables.scss` |
| 语义 token（含暗色） | `packages/theme/src/themes.scss` |
| Tailwind `@theme` 映射 | `packages/theme/src/tailwind.css` |
| 字体 | `apps/saas-dashboard/app/fonts.ts`（IBM Plex Sans = app，Inter = display） |
| Button | `packages/ui/components/ui/button.tsx` |
| CnDialog / Dialog | `packages/ui/components/cn-dialog.tsx` · `ui/dialog.tsx` |
| CnTabs | `packages/ui/components/cn-tabs.tsx` · `ui/tabs.tsx` |
| CnProgress | `packages/ui/components/cn-progress.tsx` |
| Input / Tooltip / Table / DropdownMenu / Sonner / Chart | `packages/ui/components/ui/*.tsx` |
| 业务组件 | 对应页面的 `components/`，如 `apps/saas-dashboard/app/ws/[workspaceId]/(pages)/settings/components/workspace/plan/` |
| 文案 | `apps/saas-dashboard/messages/modules/<module>/en.json`（和 `zh-cn.json`） |
| 业务阈值 / 规则 | 如 `apps/saas-dashboard/lib/usage-progress.ts`、`@tier0/business` |

工作区里有 Frontend 时直接 Glob/Read；没有时提示用户把它加进工作区。

**产出**：组件 class 清单、token 值表、要用的 i18n key 与原文、业务规则（谁能看、什么时候禁用）。

## 3. 列状态矩阵

写成表，后面直接变成原型控制的选项和交付说明的「状态与规则」：

| 状态 | 表现 |
|------|------|
| Builder（非 Owner） | 隐藏 Billing tab、增减席位、购买 |
| Trial | 标签 Trial；增席置灰 + 提示；无计费周期行 |
| 未绑卡 | Add Seats 换成 Add Card + 提示 |
| 额度用尽 | 进度条与百分比变红，不加说明文字 |
| 空数据 | 指标 0 + 图表 / 表格空状态 |

Figma 里有的状态全部覆盖；Figma 没画、代码里存在的状态，按代码规则补，并在交付说明里标出。

## 4. 搭骨架

- 形态 A：复制 [`templates/handoff-starter.html`](../templates/handoff-starter.html)，替换示例页面
- 形态 B：参照 `examples/onboarding-flow.html` 的 CSS 复刻层与状态机
- 形态 C：React 组件开发后打包成单文件（参照 `examples/login-visual.html`）

文件放在会话临时目录或用户指定位置，不放进业务仓库。

## 5. 实现顺序

1. 壳层（侧栏、设置菜单只做外观，标「既有，非本次范围」）
2. 页面主体：按 Figma 规格清单逐块写，数值用规格清单里的
3. 弹窗：旧版节点逐个还原，宽度用实测值
4. 交互：步进器、优惠码、确认支付、取消订阅等链路走通，带 loading 和 Toast
5. 原型控制、组件标注、交付说明（见 [`handoff-kit.md`](handoff-kit.md)）

## 6. 验证

见 [`verification.md`](verification.md)。至少：语法检查、脚本跑一遍无报错、看桌面和 400px 截图、实测弹窗宽度。

## 7. 交付

- 有 Artifact 能力时发布成页面（默认私有），同时把 HTML 文件发给用户
- 回复结构：链接 → 做了什么（按页面 / 弹窗 / 状态分组）→ 与 Figma 或代码的差异 → 待确认 → 提醒共享给开发
- 没跑过的检查要说没跑，不要写成已验证

## 8. 迭代

- 用户逐条提意见时，每条都回 Figma 取实数再改，改完逐条回复
- 改同一个文件，发布到同一个链接
- 反馈里暴露的通用问题，补进 [`verification.md`](verification.md) 的「已知坑」
