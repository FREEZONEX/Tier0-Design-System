'use client';
import _ from 'lodash';
import { Key, useCallback, useEffect, useRef, useState } from 'react';

interface UsePaginationParams {
  initPageSize?: number;
  initPageSizes?: number[];
  initPage?: number;
  fetchApi: any;
  defaultParams?: any;
  firstNotGetData?: boolean;
  onSuccessCallback?: (data: any) => void;
  onErrorCallback?: (error: any) => void;
  autoRefresh?: boolean;
  refreshInterval?: number;
  rowKey?: string;
  defaultSort?: any;
  appendData?: boolean;
}

export const isCanceledRequestError = (error: unknown, signal?: AbortSignal) => {
  if (signal?.aborted) return true;
  const candidate = error as { name?: string; code?: string; __CANCEL__?: boolean } | null;
  return (
    candidate?.name === 'AbortError' ||
    candidate?.name === 'CanceledError' ||
    candidate?.code === 'ERR_CANCELED' ||
    candidate?.__CANCEL__ === true
  );
};

export const usePagination = <T>({
  initPageSize = 20,
  initPage = 1,
  initPageSizes = [10, 20, 30, 50, 100],
  fetchApi,
  defaultParams = {},
  firstNotGetData,
  onSuccessCallback,
  onErrorCallback,
  autoRefresh = false,
  refreshInterval = 5000,
  rowKey = 'id',
  defaultSort = {},
  appendData = false,
}: UsePaginationParams) => {
  /** ========== State ========== */
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalRef = useRef(0);
  const skipFirstRef = useRef(Boolean(firstNotGetData));

  /** 请求参数 */
  const [requestParams, setRequestParams] = useState({
    pageNo: initPage,
    pageSize: initPageSize,
    search: {},
    sort: defaultSort,
  });

  /** ========== 工具函数 ========== */
  const cancelRequest = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /** ========== getData（保持最新，但引用稳定） ========== */

  const getData = useCallback(
    async (needLoading = true, { clearSelect = false } = {}) => {
      clearTimer();
      cancelRequest();

      const controller = new AbortController();
      abortRef.current = controller;

      if (needLoading) setLoading(true);

      try {
        const res = await fetchApi(
          {
            ...defaultParams,
            ...requestParams.search,
            ...requestParams.sort,
            pageNo: requestParams.pageNo,
            pageSize: requestParams.pageSize,
          },
          { signal: controller.signal }
        );

        if (controller.signal.aborted || abortRef.current !== controller) return;

        if (appendData && requestParams.pageNo > 1) {
          // 按 rowKey 幂等去重：OFFSET 翻页期间列表被并发增删会使页窗口漂移，下一页可能
          // 携带已加载过的行（真实事故：首页 Favorites 滚动翻页时其它入口新增收藏，页窗口
          // 下移导致同一条记录被 append 两次，渲染出同名同时间的重复行 + React key 冲突）。
          // 无 rowKey 值的行不参与去重，原样保留。
          setData((prev) => {
            const incoming = res?.list || [];
            const seen = new Set(prev.map((row: any) => row?.[rowKey]).filter((key: unknown) => key != null));
            return [
              ...prev,
              ...incoming.filter((row: any) => {
                const key = row?.[rowKey];
                return key == null || !seen.has(key);
              }),
            ];
          });
        } else {
          setData(res?.list || []);
        }

        totalRef.current = res?.total ?? 0;

        onSuccessCallback?.(res);

        // 如果后端修改了 pageNo，则同步 back
        if (res?.pageNo && _.toNumber(res.pageNo) !== requestParams.pageNo) {
          setRequestParams((o) => ({ ...o, pageNo: _.toNumber(res.pageNo) }));
        }
        if (res?.list?.length === 0 && _.toNumber(res.pageNo) > 1) {
          setRequestParams((o) => ({ ...o, pageNo: _.toNumber(res.pageNo) - 1 }));
        }
      } catch (err: any) {
        if (!isCanceledRequestError(err, controller.signal) && abortRef.current === controller) {
          onErrorCallback?.(err);
        }
      } finally {
        if (abortRef.current !== controller) return;
        abortRef.current = null;
        if (needLoading) setLoading(false);

        if (clearSelect) {
          setSelectedRowKeys([]);
          setSelectedRows([]);
        }

        if (autoRefresh) {
          timerRef.current = setTimeout(() => getDataRef.current(false), refreshInterval);
        }
      }
    },
    [
      requestParams,
      autoRefresh,
      refreshInterval,
      appendData,
      rowKey,
      fetchApi,
      defaultParams,
      cancelRequest,
      clearTimer,
      onSuccessCallback,
      onErrorCallback,
    ]
  );

  /** 持有 getData 的最新版本，但引用稳定 */
  const getDataRef = useRef(getData);
  useEffect(() => {
    getDataRef.current = getData;
  }, [getData]);

  /** ========== Effect（依赖安全，不会死循环） ========== */
  useEffect(() => {
    if (skipFirstRef.current) {
      skipFirstRef.current = false;

      if (autoRefresh && !firstNotGetData) {
        timerRef.current = setTimeout(() => getDataRef.current(false), refreshInterval);
      }
      return;
    }

    getDataRef.current();

    return () => {
      clearTimer();
      cancelRequest();
    };
  }, [requestParams, autoRefresh, firstNotGetData, refreshInterval, clearTimer, cancelRequest]);

  /** ========== 对外暴露的更新方法 ========== */
  const updateParams = (patch: Partial<typeof requestParams>) => setRequestParams((p) => ({ ...p, ...patch }));

  const getValidPageNo = (current: number, pageSize: number) => {
    const totalPages = Math.max(1, Math.ceil(totalRef.current / pageSize));
    return Math.min(Math.max(current, 1), totalPages);
  };

  const onPageChange = (current: number, pageSize?: number) => {
    const nextPageSize = pageSize ?? requestParams.pageSize;
    updateParams({ pageNo: getValidPageNo(current, nextPageSize), pageSize: nextPageSize });
  };

  const setSearchParams = (search: any, reset = true) => {
    updateParams({
      pageNo: 1,
      search: reset ? search : { ...requestParams.search, ...search },
    });
  };

  const setSort = (sort: any) => updateParams({ sort, pageNo: 1 });

  const reload = () => updateParams({ pageNo: 1 });

  const clearData = () => {
    cancelRequest();
    clearTimer();
    setLoading(false);
    setData([]);
    totalRef.current = 0;
  };

  /** ========== Row Selection ========== */
  const onRowSelectChange = (keys: Key[], rows?: T[]) => {
    setSelectedRowKeys(keys);
    setSelectedRows(rows ?? (keys.map((k) => data.find((d: any) => d[rowKey] === k)).filter(Boolean) as T[]));
  };

  /** ========== 表格 onChange（排序） ========== */
  const onChange = (_: any, __: any, sort: any, action: any) => {
    if (action.action !== 'sort') return;

    if (Array.isArray(sort)) {
      setSort({
        sortData: sort.map((s) => ({
          orderCode: s.column.sortKey || (_.isArray(s.field) ? s.field.join('.') : s.field),
          isAsc: s.order === 'ascend',
        })),
      });
    } else {
      if (!sort.field) return setSort(defaultSort);

      setSort({
        orderCode: sort.column.sortKey || (_.isArray(sort.field) ? sort.field.join('.') : sort.field),
        isAsc: sort.order === 'ascend',
      });
    }
  };

  /** ========== 返回内容 ========== */
  return {
    loading,
    data,
    setData,
    reload,
    refreshRequest: getDataRef.current, // 给外部调用稳定版本
    pagination: {
      total: totalRef.current,
      current: requestParams.pageNo,
      pageSize: requestParams.pageSize,
      pageSizes: initPageSizes,
      onChange: onPageChange,
    },
    searchParams: requestParams.search,
    setSearchParams,
    sortParams: requestParams.sort,
    setSort,
    setPagination: onPageChange,
    clearData,
    hasMore: data.length < totalRef.current,
    rowSelection: {
      selectedRowKeys,
      onChange: onRowSelectChange,
    },
    selectedRows,
    onChange, // table sort/filter
  };
};
