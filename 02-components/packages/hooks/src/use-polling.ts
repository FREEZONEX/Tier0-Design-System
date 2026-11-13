'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

type MaybePromise<T = any> = T | Promise<T>;

interface UsePollingOptions {
  /** 是否启用轮询 */
  enabled?: boolean;
  /** 是否在挂载时立即执行一次 */
  immediate?: boolean;
  /** 是否在页面不可见时自动暂停 */
  autoPauseOnHidden?: boolean;
}

// 不变量：任意时刻至多一轮 callback 在途；active 期间调度链恰好一条（本代次定时器，或一轮在途 callback）。
// start/stop 都会切换代次并作废定时器与补跑标记，旧代次的在途 run 落地后不得再续链。
function createPollingScheduler(getCallback: () => () => MaybePromise<void>, getDelay: () => number) {
  let generation = 0;
  let active = false;
  let inFlight = false;
  let rerunOnSettle = false;
  let timer: ReturnType<typeof setTimeout> | null = null;

  function advanceGeneration(nextActive: boolean) {
    generation += 1;
    active = nextActive;
    rerunOnSettle = false;
    if (timer) clearTimeout(timer);
    timer = null;
  }

  function schedule() {
    timer = setTimeout(() => {
      timer = null;
      tick();
    }, getDelay());
  }

  async function execute() {
    const runGeneration = generation;
    inFlight = true;
    try {
      await getCallback()();
    } finally {
      inFlight = false;
      if (active && rerunOnSettle) {
        rerunOnSettle = false;
        void execute();
      } else if (active && runGeneration === generation) {
        schedule();
      }
    }
  }

  function tick() {
    if (!active) return;
    // 上一轮（可能属于已作废的代次）还没落地时不并发，改为落地后立即补跑一次
    if (inFlight) {
      rerunOnSettle = true;
      return;
    }
    void execute();
  }

  return {
    start(runImmediately: boolean) {
      advanceGeneration(true);
      if (runImmediately) tick();
      else schedule();
    },
    stop() {
      advanceGeneration(false);
    },
    isActive: () => active,
  };
}

/**
 * 通用 usePolling Hook
 * - 支持同步/异步函数
 * - 防止并发重叠：上一轮落地后才排下一轮，同一实例至多一轮在途
 * - 可手动暂停/恢复（恢复时立即执行一次；已在运行则忽略）
 * - 页面隐藏自动暂停、重新可见自动恢复（可选）
 */
export function usePolling(
  callback: () => MaybePromise<void>,
  delay = 5000,
  { enabled = true, immediate = true, autoPauseOnHidden = true }: UsePollingOptions = {}
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  const delayRef = useRef(delay);
  delayRef.current = delay;
  // 只在 enabled effect 存活期间为 true：禁用或卸载后，外部残留的 resume() 不能复活轮询
  const enabledRef = useRef(false);
  const [scheduler] = useState(() =>
    createPollingScheduler(
      () => callbackRef.current,
      () => delayRef.current
    )
  );

  useEffect(() => {
    if (!enabled) return;
    enabledRef.current = true;
    scheduler.start(immediate);
    return () => {
      enabledRef.current = false;
      scheduler.stop();
    };
  }, [enabled, delay, immediate, scheduler]);

  const pause = useCallback(() => scheduler.stop(), [scheduler]);

  const resume = useCallback(() => {
    if (!enabledRef.current || scheduler.isActive()) return;
    scheduler.start(true);
  }, [scheduler]);

  // 页面可见性监听
  useEffect(() => {
    if (!autoPauseOnHidden) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') pause();
      else resume();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [autoPauseOnHidden, pause, resume]);

  return { pause, resume };
}
