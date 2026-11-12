'use client';
import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export function useUpdateEffect(effect: EffectCallback, deps: DependencyList) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
