# 图标与插画

## 按场景选库

| 表面 | 图标库 | 实现 |
|------|--------|------|
| **产品 UI** | **[Lucide](https://lucide.dev)**（与 Tier0-Frontend `lucide-react` 一致） | [`skills/tier0-product`](../skills/tier0-product/SKILL.md) · [icons-lucide.md](icons-lucide.md) |
| **官网、PPT、HTML 原型** | **[Lucide](https://lucide.dev)** | [icons-lucide.md](icons-lucide.md) · `preview/_shared/icons-lucide.html` |

## 产品 UI（Lucide）

- 以 Tier0-Frontend 为准：业务代码统一 `lucide-react`，不使用 Carbon
- 图标名取 Figma 节点里的名字（如 `icon/coins` → `coins`），原型固定 Lucide 版本并核对图标存在
- 卡片头 16px、Tab 14px、标签内帮助图标 12px，描边颜色跟随文字 token
- 旧的 Carbon 组件稿 `ui_kits/tier0-product/Icons.jsx` 仅作历史参考

## Lucide（官网 / PPT）

见 **[icons-lucide.md](icons-lucide.md)** — 引用方式、按位置选标、**带 Icon 卡片**规格。

## 禁止（全场景）

- Emoji 作 UI 图标  
- Unicode `✓` 代替勾选 SVG  
- 同一页混用两套图标库  

## 插画（共享方向）

- 等轴测、细线工业设备图  
- 黑/灰结构线 + `#B2ED1D` 数据流高光  
- 无 stock 摄影、无厚重 3D  

PPT 主视觉细则见 `surfaces/ppt/README.md`。
