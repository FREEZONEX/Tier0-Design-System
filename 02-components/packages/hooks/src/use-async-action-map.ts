'use client';

import { useCallback, useRef, useState } from 'react';

type LoadingMap = Record<string, boolean>;

export function useAsyncActionMap() {
  const lockRef = useRef<Record<string, boolean>>({});
  const [loadingMap, setLoadingMap] = useState<LoadingMap>({});

  const setLoading = (key: string, value: boolean) => {
    setLoadingMap((prev) => {
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });
  };

  const run = useCallback(async <T>(key: string, fn: () => Promise<T>): Promise<T | undefined> => {
    if (lockRef.current[key]) return;

    lockRef.current[key] = true;
    setLoading(key, true);

    try {
      return await fn();
    } finally {
      lockRef.current[key] = false;
      setLoading(key, false);
    }
  }, []);

  const isLoading = useCallback(
    (key: string) => {
      return !!loadingMap[key];
    },
    [loadingMap]
  );

  const canRun = useCallback((key: string) => !lockRef.current[key], []);

  const anyLoading = Object.values(loadingMap).some(Boolean);

  return {
    run,
    canRun,
    isLoading,
    anyLoading,
    loadingMap,
  };
}
