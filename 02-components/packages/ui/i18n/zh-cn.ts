const zhCn = {
  ui: {
    common: {
      ok: '确认',
      cancel: '取消',
      loading: '加载中',
      close: '关闭',
      more: '更多'
    },
    breadcrumb: {
      ariaLabel: '面包屑'
    },
    confirm: {
      deleteTitle: '删除',
      deleteCta: '删除',
      deletePromptRich: '确认要删除<name></name>？该操作不可撤销。'
    },
    dialog: {
      ok: '确认',
      cancel: '取消'
    },
    table: {
      selectionSummary: '已选择 {count} 项',
      selectAll: '选择全部 {total} 项',
      clear: '清空',
      emptyAlt: '空',
      emptyTitle: '暂无数据',
      emptyDesc: '当前没有可展示的内容。',
      resizeColumn: '调整 {columnName} 列宽'
    },
    pagination: {
      ariaLabel: '分页',
      previous: '上一页',
      next: '下一页',
      goTo: '跳转到',
      page: '页',
      totalItems: '共 {total} 项',
      perPage: '{size} / 页',
      goToPreviousPage: '前往上一页',
      goToNextPage: '前往下一页',
      morePages: '更多页'
    },
    command: {
      paletteTitle: '命令面板',
      paletteDesc: '搜索并执行命令...',
      searchPlaceholder: '搜索...'
    },
    multiSelect: {
      placeholder: '请选择...',
      searchPlaceholder: '搜索...',
      empty: '暂无数据'
    },
    filter: {
      title: '筛选...',
      trigger: '筛选',
      reset: '重置',
      apply: '立即应用'
    },
    sidebar: {
      title: '侧边栏',
      mobileDesc: '显示移动端侧边栏。',
      toggle: '切换侧边栏'
    },
    clipboard: {
      copy: '复制',
      copied: '已复制'
    },
    select: {
      placeholder: '请选择'
    }
  }
} as const;

export default zhCn;
