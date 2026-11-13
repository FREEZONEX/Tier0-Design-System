'use client';

import { storageOpt } from '@tier0/utils';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

export interface CnTableColumnResizeConfig {
  enabled?: boolean;
  persistKey?: string;
  fillRemainingColumnKey?: string;
}

export interface CnTableColumnLike {
  dataIndex: string;
  width?: number | string;
  fixed?: 'left' | 'right';
  resizable?: boolean;
  minWidth?: number;
  maxWidth?: number;
}

interface ColumnLayoutState {
  key: string;
  widthPx: number | null;
  styleWidth: number | string;
  isResizable: boolean;
  isUserResized: boolean;
}

interface ActiveResizeState {
  key: string;
  startX: number;
  startWidth: number;
  minWidth: number;
  maxWidth?: number;
}

interface UseCnTableColumnLayoutArgs<TColumn extends CnTableColumnLike> {
  columns: TColumn[];
  columnResize?: CnTableColumnResizeConfig;
  selectionColWidth: number;
}

const DEFAULT_MIN_COLUMN_WIDTH = 40;
const COLUMN_RESIZE_STORAGE_PREFIX = 'cn-table-column-widths';

function parsePercentWidth(width?: number | string) {
  if (typeof width !== 'string') return null;
  const normalized = width.trim();
  if (!normalized.endsWith('%')) return null;

  const value = Number.parseFloat(normalized.slice(0, -1));
  return Number.isFinite(value) ? value : null;
}

function areWidthMapsEqual(a: Record<string, number>, b: Record<string, number>) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) return false;

  return aKeys.every((key) => Math.abs((a[key] ?? 0) - (b[key] ?? 0)) < 0.5);
}

export function useCnTableColumnLayout<TColumn extends CnTableColumnLike>({
  columns,
  columnResize,
  selectionColWidth,
}: UseCnTableColumnLayoutArgs<TColumn>) {
  const enabled = columnResize?.enabled ?? false;
  const fillRemainingColumnKey = columnResize?.fillRemainingColumnKey;
  const persistStorageKey = columnResize?.persistKey
    ? `${COLUMN_RESIZE_STORAGE_PREFIX}:${columnResize.persistKey}`
    : undefined;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeResizeRef = useRef<ActiveResizeState | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [measuredWidths, setMeasuredWidths] = useState<Record<string, number>>({});
  const [runtimeWidths, setRuntimeWidths] = useState<Record<string, number>>({});
  const hasUserResizedColumns = Object.keys(runtimeWidths).length > 0;

  const columnLayouts = useMemo<ColumnLayoutState[]>(() => {
    const baseLayouts = columns.map((column) => {
      const key = column.dataIndex;
      const width = column.width;
      const runtimeWidth = runtimeWidths[key];
      const percentWidth = parsePercentWidth(width);
      const measuredWidth = measuredWidths[key];
      // 运行时宽度的优先级最高：
      // 1. 用户拖拽后的 px 宽度
      // 2. 初始 number 宽度
      // 3. 初始百分比宽度按容器换算后的 px
      // 4. 无 width 列首次渲染后的实际测量值
      const widthPx =
        runtimeWidth ??
        (typeof width === 'number'
          ? width
          : percentWidth !== null
            ? Math.max((containerWidth * percentWidth) / 100, column.minWidth ?? DEFAULT_MIN_COLUMN_WIDTH)
            : (measuredWidth ?? null));
      const resolvedStyleWidth =
        enabled && widthPx !== null
          ? `${Math.round(widthPx)}px`
          : (runtimeWidth ?? width ?? (measuredWidth ? `${measuredWidth}px` : 'auto'));

      return {
        key,
        widthPx,
        styleWidth: resolvedStyleWidth,
        isResizable: enabled && column.resizable !== false,
        isUserResized: runtimeWidth !== undefined,
      };
    });

    if (!enabled || !fillRemainingColumnKey || containerWidth <= 0) {
      return baseLayouts;
    }

    const fillColumnIndex = columns.findIndex((column) => column.dataIndex === fillRemainingColumnKey);
    const fillColumn = columns[fillColumnIndex];
    const fillLayout = baseLayouts[fillColumnIndex];

    if (!fillColumn || !fillLayout?.isResizable || fillLayout.widthPx === null) {
      return baseLayouts;
    }

    const availableWidth = Math.max(containerWidth - selectionColWidth, 0);
    const resolvedWidth = baseLayouts.reduce((total, layout) => {
      if (layout.widthPx === null) return total;
      return total + layout.widthPx;
    }, 0);
    const remainingWidth = Math.round(availableWidth - resolvedWidth);

    if (remainingWidth <= 0) {
      return baseLayouts;
    }

    const maxWidth = fillColumn.maxWidth;
    const nextWidth =
      maxWidth === undefined
        ? fillLayout.widthPx + remainingWidth
        : Math.min(fillLayout.widthPx + remainingWidth, maxWidth);

    if (nextWidth <= fillLayout.widthPx) {
      return baseLayouts;
    }

    const normalizedWidth = Math.round(nextWidth);

    return baseLayouts.map((layout, index) =>
      index === fillColumnIndex
        ? {
            ...layout,
            widthPx: normalizedWidth,
            styleWidth: `${normalizedWidth}px`,
          }
        : layout
    );
  }, [columns, containerWidth, enabled, fillRemainingColumnKey, measuredWidths, runtimeWidths, selectionColWidth]);

  useEffect(() => {
    const columnKeys = new Set(columns.map((column) => column.dataIndex));

    // 列配置变化后清掉已经不存在的 key，避免旧 state 影响新表头。
    setMeasuredWidths((previous) => {
      const next = Object.fromEntries(Object.entries(previous).filter(([key]) => columnKeys.has(key)));
      return areWidthMapsEqual(previous, next) ? previous : next;
    });

    setRuntimeWidths((previous) => {
      const next = Object.fromEntries(Object.entries(previous).filter(([key]) => columnKeys.has(key)));
      return areWidthMapsEqual(previous, next) ? previous : next;
    });
  }, [columns]);

  const columnLayoutMap = useMemo(
    () => Object.fromEntries(columnLayouts.map((layout) => [layout.key, layout])),
    [columnLayouts]
  );

  useEffect(() => {
    if (!enabled || !persistStorageKey) {
      return;
    }

    // 恢复时直接写 runtimeWidths，这样后续布局和 fixed 偏移都走同一套像素宽来源。
    const storedWidths = storageOpt.get(persistStorageKey);
    if (!storedWidths || typeof storedWidths !== 'object') {
      return;
    }

    const nextRuntimeWidths = columns.reduce<Record<string, number>>((acc, column) => {
      const storedWidth = storedWidths[column.dataIndex];
      if (typeof storedWidth !== 'number' || !Number.isFinite(storedWidth)) {
        return acc;
      }

      const minWidth = column.minWidth ?? DEFAULT_MIN_COLUMN_WIDTH;
      const maxWidth = column.maxWidth;
      let normalizedWidth = Math.max(Math.round(storedWidth), minWidth);

      if (maxWidth !== undefined) {
        normalizedWidth = Math.min(normalizedWidth, maxWidth);
      }

      acc[column.dataIndex] = normalizedWidth;
      return acc;
    }, {});

    setRuntimeWidths((previous) => (areWidthMapsEqual(previous, nextRuntimeWidths) ? previous : nextRuntimeWidths));
  }, [columns, enabled, persistStorageKey]);

  useEffect(() => {
    if (!enabled || !persistStorageKey) {
      return;
    }

    if (Object.keys(runtimeWidths).length === 0) {
      storageOpt.remove(persistStorageKey);
      return;
    }

    storageOpt.set(persistStorageKey, runtimeWidths);
  }, [enabled, persistStorageKey, runtimeWidths]);

  useLayoutEffect(() => {
    if (!enabled || hasUserResizedColumns) return;

    // 对没有显式 width 的列，首屏先从 th 实际宽度取一次基准值，再允许进入拖拽。
    const headerCells = containerRef.current?.querySelectorAll<HTMLTableCellElement>('th[data-column-key]');
    const nextMeasuredWidths = columns.reduce<Record<string, number>>((acc, column) => {
      if (runtimeWidths[column.dataIndex] !== undefined) return acc;

      const headerCell = Array.from(headerCells ?? []).find((cell) => cell.dataset.columnKey === column.dataIndex);
      if (!headerCell) return acc;

      const width = headerCell.getBoundingClientRect().width;
      if (width > 0) {
        acc[column.dataIndex] = Math.round(width);
      }

      return acc;
    }, {});

    if (!areWidthMapsEqual(nextMeasuredWidths, measuredWidths)) {
      setMeasuredWidths(nextMeasuredWidths);
    }
  }, [columns, enabled, hasUserResizedColumns, measuredWidths, runtimeWidths]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 百分比宽度依赖容器宽度，容器变化时需要重新换算未被用户拖拽过的列。
    const updateContainerWidth = () => {
      const computedStyle = window.getComputedStyle(container);
      const horizontalPadding =
        (Number.parseFloat(computedStyle.paddingLeft) || 0) + (Number.parseFloat(computedStyle.paddingRight) || 0);

      setContainerWidth(Math.max(Math.round(container.clientWidth - horizontalPadding), 0));
    };

    updateContainerWidth();

    const observer = new ResizeObserver(() => {
      updateContainerWidth();
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };
  }, []);

  const getColumnWidthPx = (index: number) => columnLayouts[index]?.widthPx ?? 0;

  const getFixedStyle = (column: TColumn, index: number, zIndex = 5) => {
    if (!column.fixed) return {};

    let left = selectionColWidth;
    let right = 0;

    if (column.fixed === 'left') {
      // fixed 偏移必须累计“当前生效的像素宽”，否则拖拽后 sticky 会错位。
      for (let i = 0; i < index; i++) {
        left += getColumnWidthPx(i);
      }

      return {
        position: 'sticky' as const,
        left,
        zIndex,
      };
    }

    for (let i = index + 1; i < columns.length; i++) {
      right += getColumnWidthPx(i);
    }

    return {
      position: 'sticky' as const,
      right,
      zIndex,
    };
  };

  const stopResize = () => {
    activeResizeRef.current = null;
    if (typeof document !== 'undefined') {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', stopResize);
  };

  const handlePointerMove = (event: PointerEvent) => {
    const activeResize = activeResizeRef.current;
    if (!activeResize) return;

    const delta = event.clientX - activeResize.startX;
    let nextWidth = activeResize.startWidth + delta;

    nextWidth = Math.max(nextWidth, activeResize.minWidth);

    if (activeResize.maxWidth !== undefined) {
      nextWidth = Math.min(nextWidth, activeResize.maxWidth);
    }

    const normalizedWidth = Math.round(nextWidth);

    setRuntimeWidths((previous) => {
      if (previous[activeResize.key] === normalizedWidth) return previous;
      return {
        ...previous,
        [activeResize.key]: normalizedWidth,
      };
    });
  };

  const startResize = (column: TColumn, index: number, event: React.PointerEvent<HTMLButtonElement>) => {
    const layout = columnLayoutMap[column.dataIndex];
    if (!enabled || !layout?.isResizable || layout.widthPx === null) return;
    const startWidth = layout.widthPx;

    // 从首次拖拽开始，这一列就进入 runtime px 模式；
    // 对百分比列来说，这一步等价于“保留当前视觉宽度，然后按 px 继续拖”。
    event.preventDefault();
    event.stopPropagation();

    activeResizeRef.current = {
      key: column.dataIndex,
      startX: event.clientX,
      startWidth,
      minWidth: column.minWidth ?? DEFAULT_MIN_COLUMN_WIDTH,
      maxWidth: column.maxWidth,
    };

    setRuntimeWidths((previous) => {
      if (previous[column.dataIndex] !== undefined) return previous;

      return {
        ...previous,
        [column.dataIndex]: Math.round(startWidth),
      };
    });

    if (typeof document !== 'undefined') {
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopResize);
  };

  return {
    columnLayouts,
    containerRef,
    getFixedStyle,
    startResize,
  };
}
