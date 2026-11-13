'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const VOID_ACTION_LOCK_DURATION = 600;

type AsyncAction<TArgs extends unknown[]> = (...args: TArgs) => void | PromiseLike<unknown>;

interface UseSingleFlightResult<TArgs extends unknown[]> {
  execute: (...args: TArgs) => Promise<void>;
  locked: boolean;
  pending: boolean;
}

function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return (
    value !== null &&
    (typeof value === 'object' || typeof value === 'function') &&
    typeof (value as PromiseLike<unknown>).then === 'function'
  );
}

export function useSingleFlight<TArgs extends unknown[]>(action?: AsyncAction<TArgs>): UseSingleFlightResult<TArgs> {
  const [locked, setLocked] = useState(false);
  const [pending, setPending] = useState(false);
  const lockedRef = useRef(false);
  const operationIdRef = useRef(0);
  const releaseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  const release = useCallback((operationId: number) => {
    if (operationIdRef.current !== operationId) return;

    if (releaseTimerRef.current) {
      clearTimeout(releaseTimerRef.current);
      releaseTimerRef.current = null;
    }

    lockedRef.current = false;
    if (mountedRef.current) {
      setLocked(false);
      setPending(false);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      operationIdRef.current += 1;
      lockedRef.current = false;

      if (releaseTimerRef.current) {
        clearTimeout(releaseTimerRef.current);
        releaseTimerRef.current = null;
      }
    };
  }, []);

  const execute = useCallback(
    async (...args: TArgs) => {
      if (!action || lockedRef.current) return;

      const operationId = operationIdRef.current + 1;
      operationIdRef.current = operationId;
      lockedRef.current = true;
      setLocked(true);

      let result: void | PromiseLike<unknown>;
      try {
        result = action(...args);
      } catch (error) {
        release(operationId);
        throw error;
      }

      let promiseLike: boolean;
      try {
        promiseLike = isPromiseLike(result);
      } catch (error) {
        release(operationId);
        throw error;
      }

      if (!promiseLike) {
        if (!mountedRef.current) return;

        releaseTimerRef.current = setTimeout(() => {
          release(operationId);
        }, VOID_ACTION_LOCK_DURATION);
        return;
      }

      if (mountedRef.current) {
        setPending(true);
      }
      try {
        await Promise.resolve(result);
      } finally {
        release(operationId);
      }
    },
    [action, release]
  );

  return {
    execute,
    locked,
    pending,
  };
}
