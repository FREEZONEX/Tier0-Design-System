'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseCountdownOptions {
  onEnd?: () => void; // 倒计时结束回调
  autoStart?: boolean; // 是否自动开始
}

export function useCountdown(initialSeconds: number, options?: UseCountdownOptions) {
  const { onEnd, autoStart = true } = options || {};
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [running, setRunning] = useState(autoStart);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const start = useCallback(() => {
    if (timeLeft <= 0) return;
    setRunning(true);
  }, [timeLeft]);

  const pause = useCallback(() => {
    setRunning(false);
  }, []);

  const reset = useCallback(
    (seconds = initialSeconds) => {
      clearTimer();
      setTimeLeft(seconds);
      setRunning(autoStart);
    },
    [initialSeconds, autoStart]
  );

  // 倒计时逻辑
  useEffect(() => {
    if (!running || timeLeft <= 0) {
      clearTimer();
      if (timeLeft <= 0 && onEnd) onEnd();
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          if (onEnd) onEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [running, timeLeft, onEnd]);

  return { timeLeft, start, pause, reset, running };
}
