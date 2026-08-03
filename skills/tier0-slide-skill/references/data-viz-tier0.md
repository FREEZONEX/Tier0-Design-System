# Data Visualisation · Tier0

> 优先级最高。图表的职责是让客户更快看懂「发生了什么变化、为什么重要、证据来自哪里」，不是填满页面。

## 0. 开工前的数据契约

每个图表先写清四件事，缺任何一项都不要画成 KPI：

| 必填 | 示例 |
|---|---|
| 指标定义 | 平均上线周期（从需求确认到首个生产版本） |
| 维度 / 对象 | 客户项目；部署站点；季度 |
| 单位与时间范围 | 天；2025 Q1–Q4 |
| 来源 / 口径 | CRM 导出；客户调研；内部产品遥测 |

没有真实数据时，用一行 `DATA PENDING · CONFIRM WITH CUSTOMER` 占位，不要捏造百分比、金额或 benchmark。

## 1. 图形选择：先问题，后图表

| 要回答的问题 | 首选 | 登记版式 | 不要用 |
|---|---|---|---|
| 两个方案谁更快 / 更低 | 横向比较条形图 | S18 / S21 | 饼图、仪表盘 |
| 指标随时间如何变化 | 4–8 点折线或柱形趋势 | S02 / S20 | 无刻度的装饰曲线 |
| 一个数字为何重要 | 单一 hero KPI + 一句口径 | S20 / S22 | 把同一数字塞入多张卡 |
| 多项指标的组成或排序 | 横向条形图 / 账本行 | S20 / S21 | 彩虹色并列柱 |
| 过程每一步损耗 | 有数量的漏斗 / 累积条 | S11 / S20 | 只有箭头的流程图 |
| 系统关系 | S14 闭环 / S17 架构图 | S14 / S17 | 拿图表伪装架构图 |

默认一页只回答一个数据问题。若图表需要长篇解释，拆成「结论页」和「证据页」。

## 2. Tier0 数据视觉语法

- **比较编码**：默认 `--ink` / `--surface-grey`；只用一个 `--accent` focus 值。
- **绿色语义**：selected、active、目标值、已达成；绝不用于所有柱和所有文字。
- **标签位置**：数值贴近数据，不放图例里猜；标签最小 14px，说明最小 16px。
- **网格与线**：只有需要读精确差异时保留 1px `--border-subtle`；不用厚网格。
- **数值格式**：使用 `font-feature-settings:"tnum"`；统一小数位、千分位、币种和正负号。
- **来源**：图表下方保留 `.viz-source`，投屏时可读，不与页面导航冲突。
- **无障碍**：每张图加 `aria-label`，把关键结论写成临近 HTML 文本，不能只依赖颜色。

## 3. 可直接使用的比较条形图

使用模板内 `.viz-*` 组件；每页只允许一个 `.is-focus`，除非是明确的二元 before/after。

```html
<figure class="viz-figure" data-viz="comparison" aria-label="平均上线周期：Tier0 为 14 天，传统定制开发为 90 天">
  <div class="viz-figure__head">
    <div class="viz-figure__title">TIME TO FIRST APP</div>
    <div class="viz-figure__note">days · pilot sample, 2026 Q1</div>
  </div>
  <div class="viz-bars">
    <div class="viz-bars__row is-muted">
      <div class="viz-bars__label">Custom build</div>
      <div class="viz-bars__track"><div class="viz-bars__fill" style="--value:100"></div></div>
      <div class="viz-bars__value">90 d</div>
    </div>
    <div class="viz-bars__row">
      <div class="viz-bars__label">Tier0</div>
      <div class="viz-bars__track"><div class="viz-bars__fill is-focus" style="--value:16"></div></div>
      <div class="viz-bars__value">14 d</div>
    </div>
  </div>
  <figcaption class="viz-delta">
    <strong class="viz-delta__number is-focus">6.4×</strong>
    <span class="viz-delta__label">faster time to first production application</span>
  </figcaption>
  <p class="viz-source">SOURCE · Customer pilot cohort · Jan–Mar 2026</p>
</figure>
```

需要入场动效时，页面写 `data-animate="data-viz"`。模板会先呈现结构，再依次画条；`B` 静态模式和系统 reduced-motion 会直接呈现最终状态。

## 4. 质量自检

- [ ] 可否用一句话说出图表的结论？
- [ ] 数据、单位、时间范围与来源都存在？
- [ ] 是否只有一个亮绿色 focus？
- [ ] 是否移除了无用 legend、网格线、图标和 3D 效果？
- [ ] 数字、标签和来源是否在 100% 投屏预览下可读？
- [ ] 图表最低边缘是否在 `--nav-safe-bottom` 之上？
