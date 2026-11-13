'use client';

import { cn } from '@tier0/utils';
import { TableProps as AntdTableProps, Table, TableColumnsType } from 'antd';
import { useTranslations } from 'next-intl';
import { CSSProperties, ElementType, PointerEvent, ReactNode, ThHTMLAttributes, useMemo } from 'react';
import { CnTableColumnLike, CnTableColumnResizeConfig, useCnTableColumnLayout } from '../cn-table-column-layout';
import { Spinner } from '../ui/spinner';

type AntTableBaseColumn<T> = NonNullable<AntdTableProps<T>['columns']>[number];

export type AntTableColumn<T> = AntTableBaseColumn<T> & Pick<CnTableColumnLike, 'resizable' | 'minWidth' | 'maxWidth'>;

type AntTableGroupColumn<T> = AntTableColumn<T> & {
  children: AntTableColumn<T>[];
};

type AntTableLeafColumn<T> = AntTableColumn<T> & {
  children?: undefined;
};

export interface AntTableProps<T> extends Omit<AntdTableProps<T>, 'columns'> {
  columns?: AntTableColumn<T>[];
  columnResize?: CnTableColumnResizeConfig;
}

interface PreparedLeafColumn<T> {
  kind: 'leaf';
  column: AntTableLeafColumn<T>;
  resizeKey: string;
  leafIndex: number;
}

interface PreparedGroupColumn<T> {
  kind: 'group';
  column: AntTableGroupColumn<T>;
  resizeKey: string;
  children: PreparedColumn<T>[];
}

type PreparedColumn<T> = PreparedLeafColumn<T> | PreparedGroupColumn<T>;

type AntTableResizeColumnMeta = CnTableColumnLike;

interface AntResizableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  resizable?: boolean;
  widthPx?: number | null;
  resizeMeta?: AntTableResizeColumnMeta;
  columnIndex?: number;
  resizeLabel?: string;
  onResizeStart?: (column: AntTableResizeColumnMeta, index: number, event: PointerEvent<HTMLButtonElement>) => void;
  baseHeaderCell?: ElementType;
}

function isColumnGroup<T>(column: AntTableColumn<T>): column is AntTableGroupColumn<T> {
  return Array.isArray((column as { children?: unknown }).children);
}

function getColumnDataIndex<T>(column: AntTableColumn<T>) {
  return (column as { dataIndex?: string | number | readonly (string | number)[] }).dataIndex;
}

function getResizeKey<T>(column: AntTableColumn<T>, indexPath: number[]) {
  if (column.key !== undefined && column.key !== null) {
    return String(column.key);
  }

  const dataIndex = getColumnDataIndex(column);

  if (Array.isArray(dataIndex)) {
    return dataIndex.map(String).join('.');
  }

  if (dataIndex !== undefined && dataIndex !== null) {
    return String(dataIndex);
  }

  return `column-${indexPath.join('-')}`;
}

function prepareColumns<T>(
  columns: AntTableColumn<T>[] = [],
  indexPath: number[] = [],
  leafColumns: AntTableResizeColumnMeta[] = []
): PreparedColumn<T>[] {
  return columns.map((column, index) => {
    const nextIndexPath = [...indexPath, index];
    const resizeKey = getResizeKey(column, nextIndexPath);
    if (isColumnGroup(column)) {
      return {
        kind: 'group' as const,
        column,
        resizeKey,
        children: prepareColumns(column.children, nextIndexPath, leafColumns),
      };
    }

    const leafIndex =
      leafColumns.push({
        dataIndex: resizeKey,
        width: column.width,
        fixed: column.fixed as CnTableColumnLike['fixed'],
        resizable: column.resizable,
        minWidth: column.minWidth,
        maxWidth: column.maxWidth,
      }) - 1;

    return {
      kind: 'leaf' as const,
      column: column as AntTableLeafColumn<T>,
      resizeKey,
      leafIndex,
    };
  });
}

function AntResizableHeaderCell({
  children,
  className,
  resizable,
  widthPx,
  resizeMeta,
  columnIndex,
  resizeLabel,
  onResizeStart,
  baseHeaderCell: BaseHeaderCell = 'th',
  ...props
}: AntResizableHeaderCellProps) {
  const HeaderCell = BaseHeaderCell as any;

  return (
    <HeaderCell {...props} className={cn(className, resizable && 'group/resize relative')}>
      {children}
      {resizable && widthPx !== null && resizeMeta && columnIndex !== undefined && onResizeStart && (
        <button
          type="button"
          aria-label={resizeLabel ?? resizeMeta.dataIndex}
          className="before:bg-border absolute top-0 right-0 bottom-0 z-20 w-2 translate-x-1/2 cursor-col-resize touch-none opacity-0 transition-opacity duration-150 group-hover/resize:opacity-100 before:absolute before:top-2 before:bottom-2 before:left-1/2 before:w-px before:-translate-x-1/2 before:content-[''] hover:opacity-100 focus-visible:opacity-100"
          onPointerDown={(event) => onResizeStart(resizeMeta, columnIndex, event)}
        />
      )}
    </HeaderCell>
  );
}

function normalizeEllipsis(ellipsis: AntTableBaseColumn<any>['ellipsis']) {
  if (ellipsis === false) {
    return false;
  }

  if (ellipsis && typeof ellipsis === 'object') {
    return {
      showTitle: true,
      ...ellipsis,
    };
  }

  return { showTitle: true };
}

function getLockedColumnWidthStyle<T>(
  column: AntTableLeafColumn<T>,
  widthPx?: number | null
): CSSProperties | undefined {
  if (widthPx === null || widthPx === undefined) return undefined;
  if (column.resizable !== false || column.minWidth === undefined || column.minWidth !== column.maxWidth)
    return undefined;

  return {
    width: widthPx,
    minWidth: widthPx,
    maxWidth: widthPx,
  };
}

function mergeCellStyle(
  baseStyle: CSSProperties | undefined,
  lockedStyle: CSSProperties | undefined
): CSSProperties | undefined {
  if (!lockedStyle) return baseStyle;
  return {
    ...baseStyle,
    ...lockedStyle,
  };
}

export function AntTable<T>({
  className,
  pagination,
  scroll,
  tableLayout,
  rowSelection,
  bordered = true,
  loading = false,
  columns,
  locale,
  components,
  columnResize,
  ...props
}: AntTableProps<T>) {
  const t = useTranslations();
  const isColumnResizeEnabled = columnResize?.enabled ?? false;
  const selectionColumnWidth =
    rowSelection && typeof rowSelection === 'object'
      ? typeof rowSelection.columnWidth === 'number'
        ? rowSelection.columnWidth
        : 32
      : 0;
  const { preparedColumns, leafColumns } = useMemo(() => {
    const nextLeafColumns: AntTableResizeColumnMeta[] = [];
    const nextPreparedColumns = prepareColumns(columns ?? [], [], nextLeafColumns);

    return {
      preparedColumns: nextPreparedColumns,
      leafColumns: nextLeafColumns,
    };
  }, [columns]);
  const { columnLayouts, containerRef, startResize } = useCnTableColumnLayout({
    columns: leafColumns,
    columnResize,
    selectionColWidth: selectionColumnWidth,
  });
  const hasUserResizedColumns = columnLayouts.some((layout) => layout.isUserResized);
  const resizedTableWidth = useMemo(() => {
    return columnLayouts.reduce((total, layout) => total + (layout.widthPx ?? 0), selectionColumnWidth);
  }, [columnLayouts, selectionColumnWidth]);
  const columnLayoutMap = useMemo(
    () => Object.fromEntries(columnLayouts.map((layout) => [layout.key, layout])),
    [columnLayouts]
  );
  const newPagination = pagination
    ? {
        total: pagination?.total,
        style: { display: 'flex', justifyContent: 'flex-end', padding: '24px 0 0', margin: 0 },
        pageSize: pagination?.pageSize || 10,
        showTotal: (total: number) => t('ui.pagination.totalItems', { total }),
        showQuickJumper: true,
        pageSizeOptions: [10, 20, 30, 50, 100],
        showSizeChanger: true,
        ...pagination,
      }
    : pagination;
  const baseHeaderCell = components?.header?.cell ?? 'th';
  const mergedComponents = {
    ...components,
    header: {
      ...components?.header,
      cell: (cellProps: AntResizableHeaderCellProps) => (
        <AntResizableHeaderCell {...cellProps} baseHeaderCell={baseHeaderCell} />
      ),
    },
  };
  const resizedColumns = useMemo<TableColumnsType<T>>(() => {
    const mapColumns = (columnList: PreparedColumn<T>[]): TableColumnsType<T> =>
      columnList.map((column) => {
        if (column.kind === 'group') {
          return {
            ...column.column,
            children: mapColumns(column.children),
          };
        }

        const layout = columnLayoutMap[column.resizeKey];
        const resizeMeta = leafColumns[column.leafIndex];
        const { column: leafColumn } = column;
        const originalOnHeaderCell = leafColumn.onHeaderCell;
        const originalOnCell = leafColumn.onCell;
        const resizeColumnName = typeof leafColumn.title === 'string' ? leafColumn.title : column.resizeKey;
        const lockedWidthStyle = getLockedColumnWidthStyle(leafColumn, layout?.widthPx);

        return {
          ...leafColumn,
          width: layout?.styleWidth ?? leafColumn.width,
          ellipsis: normalizeEllipsis(leafColumn.ellipsis),
          onHeaderCell: (currentColumn: AntTableBaseColumn<T>) => {
            const nextProps = originalOnHeaderCell?.(currentColumn as any) ?? {};
            const style = mergeCellStyle(nextProps.style as CSSProperties | undefined, lockedWidthStyle);

            return {
              ...nextProps,
              ...(style ? { style } : {}),
              'data-column-key': column.resizeKey,
              resizable: layout?.isResizable ?? false,
              widthPx: layout?.widthPx ?? null,
              resizeMeta,
              columnIndex: column.leafIndex,
              resizeLabel: t('ui.table.resizeColumn', { columnName: resizeColumnName }),
              onResizeStart: startResize,
            };
          },
          onCell: lockedWidthStyle
            ? (record: T, rowIndex?: number) => {
                const nextProps = originalOnCell?.(record, rowIndex) ?? {};
                const style = mergeCellStyle(nextProps.style as CSSProperties | undefined, lockedWidthStyle);

                return {
                  ...nextProps,
                  ...(style ? { style } : {}),
                };
              }
            : originalOnCell,
        };
      });

    return mapColumns(preparedColumns);
  }, [columnLayoutMap, leafColumns, preparedColumns, startResize, t]);
  const mergedScroll =
    isColumnResizeEnabled && (hasUserResizedColumns || scroll?.x !== undefined || columnResize?.fillRemainingColumnKey)
      ? { ...scroll, x: scroll?.x ?? resizedTableWidth }
      : scroll;
  const mergedTableLayout = tableLayout ?? (isColumnResizeEnabled ? 'fixed' : undefined);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {loading && (
        <div className="bg-bg/50 absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      )}
      <Table
        className={bordered ? 'table-bordered' : ''}
        size="small"
        pagination={newPagination}
        columns={resizedColumns}
        components={mergedComponents}
        rowSelection={rowSelection}
        rowKey="id"
        rowClassName="group/row"
        style={{ height: '100%' }}
        locale={{
          emptyText: t('ui.table.emptyTitle'),
          ...locale,
        }}
        scroll={mergedScroll}
        tableLayout={mergedTableLayout}
        {...props}
      />
    </div>
  );
}
