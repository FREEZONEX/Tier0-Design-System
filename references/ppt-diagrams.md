# Marketing Deck — 主视觉与图示（Diagrams & Visuals）

Tier0 deck 的信息图 **偏工业编辑风**：结构线 + 等轴测线稿 + 品牌蓝辅助。避免 WebGL 流体背景、照片墙网格或满屏装饰动画。

---

## 1. 封面主视觉（类型 A · 必用资产）


| 项   | 规则                                                                          |
| --- | --------------------------------------------------------------------------- |
| 文件  | [assets/marketing-cover-visual.svg](../assets/marketing-cover-visual.svg) |
| 角色  | 右侧偏下 **唯一** 主视觉；禁止手绘替代                                                      |
| 构图  | `position:absolute` 贴右边缘铺满全高；主体视觉重心居右 |
| 文案区 | 左 ~44vw（`.deck-cover__content`），不与 SVG 重叠 |
| 叠加  | 仅允许低对比点阵；**禁止**装饰斜线或大面积 accent1 色块 |


HTML 参考：[preview/ppt/slide-cover-A.html](../preview/ppt/slide-cover-A.html)（交付时改为全屏 slide，见 layout-lock）。

Logo：左下 **Tier0** wordmark（如 `tier0-logo-lime.svg`），**无** 母公司条。

---

## 2. 封底二维码（类型 A2 · 仅最后一页）


| 项   | 规则 |
| --- | --- |
| 文件（深底） | [assets/website-qrcode-white.png](../assets/website-qrcode-white.png) |
| 文件（浅底，备用） | [assets/website-qrcode-black.png](../assets/website-qrcode-black.png) |
| 角色 | 封底 **唯一** 扫码入口；链接 `https://tier0.app` |
| 落位 | 右下角；类名 `.deck-qrcode`（`tokens/deck.css`） |
| 尺寸 | `clamp(72px, 9vw, 112px)` 宽；`bottom: 16px`，与页脚同底边 |
| 层级 | `z-index: 3`，高于右侧 `deck-cover__visual` |

**仅**变体 A2（Closing）使用；封面 A1 **不放** QR。section 加 `deck-slide--closing`：Logo + 版权左对齐，右侧预留 QR 条带。

HTML 参考：[preview/ppt/slide-closing-A2.html](../preview/ppt/slide-closing-A2.html)。

---

## 3. 架构 / 数据流图（类型 D） 

推荐语义（销售叙事顺序）：

```
Source Flow  →  Namespace  →  Event Flow
```


| 原则   | 做法                                             |
| ---- | ---------------------------------------------- |
| 绘制方式 | 简单 **SVG 或 CSS** 线框；线宽一致                       |
| 颜色   | 轴线 accent1（`#B2ED1D`）；冷侧结构 `#1D77FE` @ 70%/45% |
| 标签   | Plex Regular 14px；避免 10px 以下投屏不可读              |
| 图标   | 小处可用 Lucide；**不用** Lucide 画整张架构                |
| 密度   | 单页一个模型；多模型拆页                                   |


**禁止：** 3D 透视截图风、随机渐变、第二套蓝色、满屏荧光底。

---

## 4. 等轴测 / 模块插画（白底右栏）

类型 C 常见 **右栏线稿模块**：

- 白/浅灰面 + accent1 局部填色 + `#1D77FE` 透明辅助
- 与左侧 Plex 正文 **底对齐** 或顶对齐正文区（勿贴到页脚）
- 若用产品截图，见 §5

---

## 5. 时间轴（类型 D 变体）

- 主轴：`--ppt-accent-marker`
- 节点：小方块或圆点同色
- 说明字：≥14px；年份 / 阶段用 Plex Medium

---

## 6. 截图与配图

### 6.1 路径与交付


| 阶段          | 规则                                               |
| ----------- | ------------------------------------------------ |
| 草稿（技能内）     | 可复制 `assets/`、`preview/` 相对路径                    |
| **交付 HTML** | Base64 或审核过的 HTTPS；**禁止** `file://`、`/Users/...` |


### 6.2 比例建议


| 落位       | 比例                              |
| -------- | ------------------------------- |
| C 页右栏主图  | 16:10 或 4:3                     |
| 宽屏架构条    | 16:9                            |
| UI 截图再设计 | 16:10，`object-fit: contain` 保文字 |


### 6.3 截图保真

用户要求 **保留 UI 像素** 时：

- 优先裁切 + 留白，**不要** AI 重绘界面
- 可加浅底 `#F4F4F4` 或白卡描边，与 Masterdeck 卡片一致
- 不要画进 PPT 页脚、页码、假 chrome

### 6.4 AI 生成配图（可选）

Tier0 **无** 内置 image-prompt 库。若用外部图像模型：

- 图内 **无** Tier0/FREEZONEX 假 Logo、无页脚
- 语言跟随 deck（中文 deck → 中文标注）
- 比例先匹配槽位再生成
- 人文照片与工业 UNS 叙事慎用夸张赛博风

---

## 7. 深色页装饰

- B 章节目：低对比 **网格点** 即可
- **避免** 大块 accent1 铺底
- Tektur 白字 ≥48pt

---

## 8. 自检（图示专项）

- 封面是否为官方 `marketing-cover-visual.svg`
- 封底（A2）右下是否为官方 QR（深底用 `website-qrcode-white.png`）
- 架构是否 Source → Namespace → Event 顺序（除非改既有故事）
- 是否只有一种 stroke 风格的 Lucide
- 交付 HTML 是否无本地路径
- 投屏最小字号 ≥14px（标签 / 图注）

完整清单见 [ppt-checklist.md](ppt-checklist.md)。