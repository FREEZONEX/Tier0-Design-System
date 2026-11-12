'use client';

import { CaretDownFilled, CaretUpFilled, FilterFilled } from '@ant-design/icons';
import { cn, resolveStaticImageSrc } from '@tier0/utils';
import _ from 'lodash';
import { useTranslations } from 'next-intl';
import { ReactNode, useState } from 'react';
import tableNoDataSvg from '../assets/images/table_no_data.svg';
import CnPagination from './cn-pagination';
import { CnTableColumnLike, CnTableColumnResizeConfig, useCnTableColumnLayout } from './cn-table-column-layout';
import { ComLoading } from './com-loading';
import { Checkbox } from './ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const tableNoDataSrc = resolveStaticImageSrc(tableNoDataSvg);

export interface CnTableColumnFilterDropdownProps {
  column: CnTableColumn;
  filtered: boolean;
  open: boolean;
  close: () => void;
  setOpen: (open: boolean) => void;
}

export type CnTableSortOrder = 'asc' | 'desc';

export interface CnTableColumn extends CnTableColumnLike {
  title: ReactNode;
  dataIndex: string;
  showTitle?: boolean;
  ellipsis?: boolean;
  sorter?: boolean;
  /** 排序回调使用的字段名，默认取 dataIndex（dataIndex 为嵌套路径时必传） */
  sortKey?: string;
  filtered?: boolean;
  filterValue?: unknown;
  filterDropdown?: ReactNode | ((props: CnTableColumnFilterDropdownProps) => ReactNode);
  filterIcon?: ReactNode | ((filtered: boolean) => ReactNode);
  filterPopoverProps?: Pick<
    React.ComponentProps<typeof PopoverContent>,
    'align' | 'side' | 'sideOffset' | 'className' | 'onOpenAutoFocus'
  >;
  width?: number | string;
  className?: string;
  render?: (value: any, record: any, index: number) => React.ReactNode;
}

type Column = CnTableColumn;

interface PaginationConfig {
  current: number;
  total: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onChange: (page: number) => void;
  onPageSizeChange?: (page: number, size: number) => void;
}

export interface EnhancedRowSelectionState {
  isAllSelected: boolean;
  selectedRowKeys: any[];
  excludedRowKeys: any[];
}

type RowSelectionMode = 'default' | 'enhanced';

export interface RowSelectionConfig {
  selectedRowKeys?: any[];
  onChange?: (keys: any[], selectedRows: any[]) => void;
  mode?: RowSelectionMode;
  state?: EnhancedRowSelectionState;
  onStateChange?: (nextState: EnhancedRowSelectionState) => void;
  selectionBarActions?:
    | ReactNode
    | ((args: {
        total: number;
        selectedCount: number;
        isAllSelected: boolean;
        onSelectAll: () => void;
        onClear: () => void;
      }) => ReactNode);
}

export interface CnTableProps {
  columns: CnTableColumn[];
  dataSource: any[];

  rowKey?: string;
  className?: string;

  pagination?: false | PaginationConfig;

  rowSelection?: RowSelectionConfig;

  scroll?: {
    y?: number | string;
  };
  bordered?: boolean;
  loading?: boolean;
  columnResize?: CnTableColumnResizeConfig;
  onRow?: (record: any, index: number) => React.HTMLAttributes<HTMLTableRowElement>;

  /** 受控排序：当前排序字段（对应 column.sortKey ?? dataIndex） */
  sortField?: string;
  sortOrder?: CnTableSortOrder;
  /** 点击排序表头时触发，循环 asc → desc → 清除（两者 undefined） */
  onSortChange?: (field: string | undefined, order: CnTableSortOrder | undefined) => void;
}

interface SelectionBarProps {
  total: number;
  selectedCount: number;
  isAllSelected: boolean;
  onSelectAll: () => void;
  onClear: () => void;
  selectionBarActions?: ReactNode;
  t: ReturnType<typeof useTranslations>;
}

function SelectionBar({
  total,
  selectedCount,
  // isAllSelected,
  onSelectAll,
  onClear,
  selectionBarActions,
  t,
}: SelectionBarProps) {
  if (selectedCount === 0) return null;
  const canSelectAll = total > selectedCount;

  const Divider = <span className="bg-bg-accent h-4 w-px shrink-0" aria-hidden="true" />;

  return (
    <div className="bg-bg border-border-secondary mb-4 flex items-center justify-between rounded-md border py-1.5 pr-1.5 pl-3 text-sm">
      <div className="text-text-secondary flex items-center gap-2">
        <span className="leading-6">{t('ui.table.selectionSummary', { count: selectedCount })}</span>
        {canSelectAll && (
          <>
            {Divider}
            <button
              type="button"
              className="text-highlight-text-deep cursor-pointer leading-6 underline underline-offset-2"
              onClick={onSelectAll}
            >
              {t('ui.table.selectAll', { total })}
            </button>
          </>
        )}
        {Divider}
        <button type="button" className="text-error cursor-pointer leading-6" onClick={onClear}>
          {t('ui.table.clear')}
        </button>
      </div>
      <div className="flex items-center justify-end gap-2">{selectionBarActions}</div>
    </div>
  );
}

// interface SelectionDropdownProps {
//   total: number;
//   currentPageCount: number;
//   isAllSelected: boolean;
//   isPageAllSelected: boolean;
//   onSelectAll: () => void;
//   onSelectPage: () => void;
//   onClear: () => void;
// }

// function SelectionDropdown({
//   total,
//   currentPageCount,
//   isAllSelected,
//   isPageAllSelected,
//   onSelectAll,
//   onSelectPage,
//   onClear,
// }: SelectionDropdownProps) {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <button
//           type="button"
//           className="text-text-tertiary hover:text-text inline-flex h-4 w-4 items-center justify-center rounded-sm"
//           aria-label="Open selection menu"
//         >
//           <ChevronDown className="size-3.5" />
//         </button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="start" sideOffset={6}>
//         <DropdownMenuItem onSelect={onSelectAll}>
//           <Check className={cn('mr-2 size-3.5 shrink-0', isAllSelected ? 'opacity-100' : 'opacity-0')} />
//           {`Select All (${total})`}
//         </DropdownMenuItem>
//         <DropdownMenuItem onSelect={onSelectPage}>
//           <Check
//             className={cn('mr-2 size-3.5 shrink-0', !isAllSelected && isPageAllSelected ? 'opacity-100' : 'opacity-0')}
//           />
//           {`Select This Page (${currentPageCount})`}
//         </DropdownMenuItem>
//         <DropdownMenuItem className="text-error focus:text-error" onSelect={onClear}>
//           <span className="inline-block w-[22px]" />
//           Deselect All
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

export default function CnTable({
  columns,
  dataSource,
  rowKey = 'id',
  pagination,
  rowSelection,
  scroll,
  bordered = true,
  loading = false,
  columnResize,
  className,
  onRow,
  sortField,
  sortOrder,
  onSortChange,
}: CnTableProps) {
  const t = useTranslations();
  const [openColumnFilters, setOpenColumnFilters] = useState<Record<string, boolean>>({});
  const enableScroll = scroll?.y;
  const showLoadingEmpty = loading && dataSource.length === 0;
  const allRowKeys = dataSource.map((item) => item[rowKey]);
  const isEnhanced = rowSelection?.mode === 'enhanced';
  const selectionState: EnhancedRowSelectionState = {
    isAllSelected: rowSelection?.state?.isAllSelected ?? false,
    selectedRowKeys: rowSelection?.state?.selectedRowKeys ?? [],
    excludedRowKeys: rowSelection?.state?.excludedRowKeys ?? [],
  };
  const selectedSet = new Set(isEnhanced ? selectionState.selectedRowKeys : rowSelection?.selectedRowKeys || []);
  const excludedSet = new Set(isEnhanced ? selectionState.excludedRowKeys : []);
  const selectionColWidth = rowSelection ? 48 : 0;
  const totalSelectable = pagination ? pagination.total : dataSource.length;
  // 列宽、fixed 偏移、拖拽状态统一放进内部布局 hook，避免继续堆在 JSX 里。
  const { columnLayouts, containerRef, getFixedStyle, startResize } = useCnTableColumnLayout({
    columns,
    columnResize,
    selectionColWidth,
  });

  const getSelectedRows = (keys: any[]) => {
    const keySet = new Set(keys);
    return dataSource.filter((d) => keySet.has(d[rowKey]));
  };

  const emitDefaultSelectionChange = (keys: any[]) => {
    if (!rowSelection?.onChange) return;
    const uniqueKeys = Array.from(new Set(keys));
    rowSelection.onChange(uniqueKeys, getSelectedRows(uniqueKeys));
  };

  const getCurrentPageSelectedKeysByState = (state: EnhancedRowSelectionState) => {
    if (state.isAllSelected) {
      const excluded = new Set(state.excludedRowKeys);
      return allRowKeys.filter((key) => !excluded.has(key));
    }

    const selected = new Set(state.selectedRowKeys);
    return allRowKeys.filter((key) => selected.has(key));
  };

  const emitEnhancedSelectionState = (nextState: EnhancedRowSelectionState) => {
    const normalizedState: EnhancedRowSelectionState = {
      isAllSelected: nextState.isAllSelected,
      selectedRowKeys: Array.from(new Set(nextState.selectedRowKeys)),
      excludedRowKeys: Array.from(new Set(nextState.excludedRowKeys)),
    };

    rowSelection?.onStateChange?.(normalizedState);

    if (rowSelection?.onChange) {
      const pageKeys = getCurrentPageSelectedKeysByState(normalizedState);
      rowSelection.onChange(pageKeys, getSelectedRows(pageKeys));
    }
  };

  const isRowChecked = (key: any) => {
    if (!rowSelection) return false;

    if (isEnhanced) {
      return selectionState.isAllSelected ? !excludedSet.has(key) : selectedSet.has(key);
    }

    return selectedSet.has(key);
  };

  const renderColGroup = () => (
    <colgroup>
      {rowSelection && <col style={{ width: selectionColWidth }} />}
      {/* table-fixed 下最终宽度还是以 colgroup 为准，所以这里统一读运行时宽度结果。 */}
      {columns.map((col, index) => (
        <col key={col.dataIndex} style={{ width: columnLayouts[index]?.styleWidth ?? col.width ?? 'auto' }} />
      ))}
    </colgroup>
  );

  const isAllSelected = allRowKeys.length > 0 && allRowKeys.every((key) => isRowChecked(key));
  const isPartialSelected = !isAllSelected && allRowKeys.some((key) => isRowChecked(key));
  const selectedCount = isEnhanced
    ? selectionState.isAllSelected
      ? Math.max(totalSelectable - selectionState.excludedRowKeys.length, 0)
      : selectionState.selectedRowKeys.length
    : selectedSet.size;

  const toggleSelectAll = (checked: boolean) => {
    if (!rowSelection) return;

    if (!isEnhanced) {
      emitDefaultSelectionChange(checked ? allRowKeys : []);
      return;
    }

    if (selectionState.isAllSelected) {
      const excluded = new Set(selectionState.excludedRowKeys);
      allRowKeys.forEach((key) => {
        if (checked) {
          excluded.delete(key);
        } else {
          excluded.add(key);
        }
      });

      emitEnhancedSelectionState({
        isAllSelected: true,
        selectedRowKeys: selectionState.selectedRowKeys,
        excludedRowKeys: Array.from(excluded),
      });
      return;
    }

    const selected = new Set(selectionState.selectedRowKeys);
    allRowKeys.forEach((key) => {
      if (checked) {
        selected.add(key);
      } else {
        selected.delete(key);
      }
    });

    emitEnhancedSelectionState({
      isAllSelected: false,
      selectedRowKeys: Array.from(selected),
      excludedRowKeys: [],
    });
  };

  const toggleSelectRow = (key: any, checked: boolean) => {
    if (!rowSelection) return;

    if (!isEnhanced) {
      const selected = new Set(rowSelection.selectedRowKeys || []);
      if (checked) {
        selected.add(key);
      } else {
        selected.delete(key);
      }
      emitDefaultSelectionChange(Array.from(selected));
      return;
    }

    if (selectionState.isAllSelected) {
      const excluded = new Set(selectionState.excludedRowKeys);
      if (checked) {
        excluded.delete(key);
      } else {
        excluded.add(key);
      }

      emitEnhancedSelectionState({
        isAllSelected: true,
        selectedRowKeys: selectionState.selectedRowKeys,
        excludedRowKeys: Array.from(excluded),
      });
      return;
    }

    const selected = new Set(selectionState.selectedRowKeys);
    if (checked) {
      selected.add(key);
    } else {
      selected.delete(key);
    }

    emitEnhancedSelectionState({
      isAllSelected: false,
      selectedRowKeys: Array.from(selected),
      excludedRowKeys: [],
    });
  };

  // const selectThisPage = () => {
  //   if (!isEnhanced) return;

  //   emitEnhancedSelectionState({
  //     isAllSelected: false,
  //     selectedRowKeys: [...allRowKeys],
  //     excludedRowKeys: [],
  //   });
  // };

  const selectAll = () => {
    if (!isEnhanced) return;

    emitEnhancedSelectionState({
      isAllSelected: true,
      selectedRowKeys: [],
      excludedRowKeys: [],
    });
  };

  const clearAll = () => {
    if (!isEnhanced) return;

    emitEnhancedSelectionState({
      isAllSelected: false,
      selectedRowKeys: [],
      excludedRowKeys: [],
    });
  };

  const resolvedSelectionBarActions =
    typeof rowSelection?.selectionBarActions === 'function'
      ? rowSelection.selectionBarActions({
          total: totalSelectable,
          selectedCount,
          isAllSelected: selectionState.isAllSelected,
          onSelectAll: selectAll,
          onClear: clearAll,
        })
      : rowSelection?.selectionBarActions;

  const headerCellWithDivider =
    'relative last:before:hidden before:absolute before:h-[22px] before:top-2 before:right-0 before:bottom-2 before:w-px before:bg-border';

  const getSortKey = (col: Column) => col.sortKey ?? col.dataIndex;

  const handleSortClick = (col: Column) => {
    if (!onSortChange) return;
    const key = getSortKey(col);
    if (sortField !== key) return onSortChange(key, 'asc');
    if (sortOrder === 'asc') return onSortChange(key, 'desc');
    onSortChange(undefined, undefined);
  };

  const renderSortCarets = (col: Column) => {
    const active = sortField === getSortKey(col);
    return (
      <span className="flex shrink-0 flex-col text-[9px] leading-none" aria-hidden="true">
        <CaretUpFilled className={active && sortOrder === 'asc' ? 'text-primary' : 'text-text-tertiary'} />
        <CaretDownFilled
          className={cn('-mt-[3px]', active && sortOrder === 'desc' ? 'text-primary' : 'text-text-tertiary')}
        />
      </span>
    );
  };

  const getCellTitle = (col: Column, rawValue: any, renderedValue: ReactNode) => {
    if (col.showTitle === false) return undefined;
    if (_.isString(renderedValue) || _.isNumber(renderedValue)) return String(renderedValue);
    if (_.isString(rawValue) || _.isNumber(rawValue)) return String(rawValue);
    return '';
  };

  const getFixedRowClassName = (checked: boolean) =>
    checked
      ? '[&>td[data-fixed-cell=true]]:bg-bg-tertiary [&:hover>td[data-fixed-cell=true]]:bg-bg-accent'
      : '[&:hover>td[data-fixed-cell=true]]:bg-bg-tertiary';

  const getFixedCellClassName = (col: Column) => {
    if (!col.fixed) return '';

    return 'relative bg-bg transition-colors';
  };

  const isColumnFiltered = (col: Column) => {
    if (typeof col.filtered === 'boolean') return col.filtered;

    if (Array.isArray(col.filterValue)) {
      return col.filterValue.length > 0;
    }

    if (_.isString(col.filterValue)) {
      return col.filterValue.trim().length > 0;
    }

    return col.filterValue !== undefined && col.filterValue !== null;
  };

  const setColumnFilterOpen = (columnKey: string, open: boolean) => {
    setOpenColumnFilters((previous) => {
      if ((previous[columnKey] ?? false) === open) return previous;

      return {
        ...previous,
        [columnKey]: open,
      };
    });
  };

  const renderColumnFilter = (col: Column) => {
    if (!col.filterDropdown) return null;

    const filtered = isColumnFiltered(col);
    const open = openColumnFilters[col.dataIndex] ?? false;
    const filterIcon =
      typeof col.filterIcon === 'function' ? (
        col.filterIcon(filtered)
      ) : col.filterIcon ? (
        col.filterIcon
      ) : (
        <FilterFilled className={cn('size-3', filtered ? 'text-primary!' : 'text-text-tertiary')} />
      );

    const dropdownContent =
      typeof col.filterDropdown === 'function'
        ? col.filterDropdown({
            column: col,
            filtered,
            open,
            close: () => setColumnFilterOpen(col.dataIndex, false),
            setOpen: (nextOpen) => setColumnFilterOpen(col.dataIndex, nextOpen),
          })
        : col.filterDropdown;

    const filterPopoverProps = col.filterPopoverProps;

    return (
      <Popover open={open} onOpenChange={(nextOpen) => setColumnFilterOpen(col.dataIndex, nextOpen)}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              'text-text-tertiary hover:bg-bg-secondary relative z-10 inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-sm transition-colors',
              filtered && 'text-primary'
            )}
            aria-label={_.isString(col.title) ? col.title : col.dataIndex}
          >
            {filterIcon}
          </button>
        </PopoverTrigger>
        <PopoverContent
          align={filterPopoverProps?.align ?? 'end'}
          side={filterPopoverProps?.side ?? 'bottom'}
          sideOffset={filterPopoverProps?.sideOffset ?? 8}
          className={cn('w-auto min-w-40 p-0', filterPopoverProps?.className)}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            filterPopoverProps?.onOpenAutoFocus?.(event);
          }}
        >
          {dropdownContent}
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className={cn('relative flex w-full flex-col', className)}>
      {loading && <ComLoading />}
      <div className={cn({ 'rounded-md border': bordered })}>
        {rowSelection && isEnhanced && (
          <SelectionBar
            total={totalSelectable}
            selectedCount={selectedCount}
            isAllSelected={selectionState.isAllSelected}
            onSelectAll={selectAll}
            onClear={clearAll}
            selectionBarActions={resolvedSelectionBarActions}
            t={t}
          />
        )}

        {showLoadingEmpty ? (
          <div className="h-80 w-full" style={enableScroll ? { height: scroll.y } : undefined} />
        ) : (
          <div
            ref={containerRef}
            className="w-full overflow-x-auto"
            style={enableScroll ? { maxHeight: scroll.y } : {}}
          >
            <table className="w-full table-fixed caption-bottom text-sm">
              {renderColGroup()}

              <TableHeader className="bg-bg sticky top-0 z-10 font-medium">
                <TableRow>
                  {rowSelection && (
                    <TableHead
                      // className={cn('bg-bg rounded-tl-md py-2', isEnhanced ? 'px-4 text-left' : 'w-10 px-0 text-center')}
                      className={cn('bg-bg w-12 rounded-tl-md px-0 py-2 text-center')}
                    >
                      {/* <div className={cn('flex items-center', isEnhanced ? 'gap-1' : 'justify-center')}> */}
                      <Checkbox
                        checked={isPartialSelected ? 'indeterminate' : isAllSelected}
                        onCheckedChange={(v) => toggleSelectAll(!!v)}
                      />

                      {/* 暂时取消下拉选择的交互 */}
                      {/* {isEnhanced && (
                        <SelectionDropdown
                          total={totalSelectable}
                          currentPageCount={allRowKeys.length}
                          isAllSelected={selectionState.isAllSelected}
                          isPageAllSelected={isAllSelected}
                          onSelectAll={selectAll}
                          onSelectPage={selectThisPage}
                          onClear={clearAll}
                        />
                      )} */}
                      {/* </div> */}
                    </TableHead>
                  )}

                  {columns.map((col, index) => (
                    <TableHead
                      key={col.dataIndex}
                      data-column-key={col.dataIndex}
                      aria-sort={
                        col.sorter && sortField === getSortKey(col)
                          ? sortOrder === 'asc'
                            ? 'ascending'
                            : 'descending'
                          : undefined
                      }
                      className={cn(
                        'group/resize bg-bg text-text-tertiary px-4 py-2 last:rounded-tr-md',
                        headerCellWithDivider,
                        col.className
                      )}
                      style={getFixedStyle(col, index, 20)}
                      title={col.showTitle === false ? undefined : _.isString(col.title) ? col.title : ''}
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        {col.sorter ? (
                          <button
                            type="button"
                            className="flex min-w-0 flex-1 cursor-pointer items-center gap-1 text-left font-medium select-none"
                            onClick={() => handleSortClick(col)}
                          >
                            <span className="min-w-0 truncate">{col.title}</span>
                            {renderSortCarets(col)}
                          </button>
                        ) : (
                          <div className="min-w-0 flex-1 truncate">{col.title}</div>
                        )}
                        {renderColumnFilter(col)}
                      </div>
                      {/* 只把拖拽入口挂在表头，不侵入 cell 渲染逻辑。 */}
                      {columnLayouts[index]?.isResizable && columnLayouts[index]?.widthPx !== null && (
                        <button
                          type="button"
                          aria-label={t('ui.table.resizeColumn', { columnName: col.dataIndex })}
                          className={cn(
                            "before:bg-border absolute top-0 right-0 bottom-0 z-20 w-2 cursor-col-resize touch-none opacity-0 transition-opacity duration-150 group-hover/resize:opacity-100 before:absolute before:top-2 before:bottom-2 before:left-1/2 before:w-px before:-translate-x-1/2 before:content-[''] hover:opacity-100 focus-visible:opacity-100",
                            index === columns.length - 1 ? 'translate-x-0' : 'translate-x-1/2'
                          )}
                          onPointerDown={(event) => startResize(col, index, event)}
                        />
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {dataSource.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + (rowSelection ? 1 : 0)}
                      className="hover:bg-bg py-30 text-center"
                    >
                      <div className="flex flex-col items-center justify-center gap-1">
                        {/* eslint-disable-next-line @next/next/no-img-element -- Shared packages cannot depend on next/image for a fixed local SVG. */}
                        <img src={tableNoDataSrc} width={100} height={76} alt={t('ui.table.emptyAlt')} />
                        <p className="text-text-tertiary text-center text-[20px] leading-7 font-medium tracking-[-0.1px]">
                          {t('ui.table.emptyTitle')}
                        </p>
                        <p className="text-text-tertiary text-center text-sm leading-5">{t('ui.table.emptyDesc')}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  dataSource.map((record, index) => {
                    const key = record[rowKey];
                    const rowChecked = isRowChecked(key);
                    const rowProps = onRow?.(record, index) || {};
                    const { className: rowClassName, ...restRowProps } = rowProps;

                    return (
                      <TableRow
                        key={key}
                        {...restRowProps}
                        className={cn(
                          'group/row hover:bg-bg-tertiary',
                          rowChecked ? 'bg-bg-tertiary hover:bg-bg-accent' : '',
                          getFixedRowClassName(rowChecked),
                          rowClassName
                        )}
                      >
                        {rowSelection && (
                          <TableCell className="w-12 px-0 py-2 text-center">
                            <Checkbox checked={rowChecked} onCheckedChange={(v) => toggleSelectRow(key, !!v)} />
                          </TableCell>
                        )}

                        {columns.map((col, colIndex) => {
                          const value = _.get(record, col.dataIndex);
                          const renderedValue = col.render ? col.render(value, record, index) : value;
                          return (
                            <TableCell
                              key={col.dataIndex}
                              className={cn(
                                col.ellipsis !== false && 'truncate',
                                'px-4 py-2 leading-6',
                                col.className,
                                getFixedCellClassName(col)
                              )}
                              data-fixed-cell={col.fixed ? true : undefined}
                              style={getFixedStyle(col, colIndex)}
                              title={getCellTitle(col, value, renderedValue)}
                            >
                              {renderedValue}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </table>
          </div>
        )}
      </div>

      {pagination && dataSource.length > 0 && (
        <CnPagination
          className="justify-end"
          current={pagination.current}
          pageSize={pagination.pageSize}
          pageSizeOptions={pagination.pageSizeOptions}
          total={pagination.total}
          onPageChange={pagination.onChange}
          onPageSizeChange={pagination.onPageSizeChange}
        />
      )}
    </div>
  );
}
