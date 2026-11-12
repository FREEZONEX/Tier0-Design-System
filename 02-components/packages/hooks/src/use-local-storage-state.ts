'use client';
import { useCallback, useEffect, useState } from 'react';

const read = (key: string) => {
  if (typeof window === 'undefined') return null;

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const write = (key: string, value: string) => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // localStorage may be unavailable in restricted browser contexts.
  }
};

/**
 * 带写入能力的 localStorage 状态。与只读的 useLocalStorage 并列：
 * 后者用于「跟随外部写入的值」，本 hook 用于「本组件既读又写的用户偏好」。
 *
 * - 首帧恒返回 fallback，水合后的 effect 里才读 localStorage：SSR 阶段没有
 *   localStorage，若在 useState initializer 里读会造成 hydration mismatch。
 * - 监听 storage 事件，其它标签页改写同一 key 时本页跟随更新。
 *
 * 返回值恒为字符串（localStorage 的原始值可能是任意历史遗留内容），
 * 调用方需要联合类型时自行收窄校验。
 */
export function useLocalStorageState(key: string, fallback: string) {
  const [value, setValue] = useState(fallback);

  useEffect(() => {
    const stored = read(key);
    if (stored !== null) setValue(stored);
  }, [key]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== key || event.oldValue === event.newValue) return;
      setValue(event.newValue ?? fallback);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [fallback, key]);

  const setStoredValue = useCallback(
    (next: string) => {
      setValue(next);
      write(key, next);
    },
    [key]
  );

  return [value, setStoredValue] as const;
}
