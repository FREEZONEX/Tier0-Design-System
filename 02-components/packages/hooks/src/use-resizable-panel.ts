import { useCallback, useEffect, useState } from 'react';

interface UseResizablePanelOptions {
  defaultWidth: number;
  minWidth: number;
  maxWidth: number;
  rightPanelMinWidth?: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function useResizablePanel({
  defaultWidth,
  minWidth,
  maxWidth,
  rightPanelMinWidth = 0,
  containerRef,
}: UseResizablePanelOptions) {
  const [width, setWidth] = useState(defaultWidth);
  const [isResizing, setIsResizing] = useState(false);

  const clampWidth = useCallback(
    (nextWidth: number) => {
      const containerWidth = containerRef.current?.getBoundingClientRect().width ?? 0;
      const maxWidthByContainer =
        containerWidth > 0 ? Math.max(containerWidth - rightPanelMinWidth, minWidth) : maxWidth;
      return Math.min(Math.max(nextWidth, minWidth), Math.min(maxWidth, maxWidthByContainer));
    },
    [minWidth, maxWidth, rightPanelMinWidth, containerRef]
  );

  const handleResizeStart = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsResizing(true);
  }, []);

  useEffect(() => {
    if (!isResizing) return;

    const handlePointerMove = (event: PointerEvent) => {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      const nextWidth = event.clientX - containerRect.left;
      setWidth(clampWidth(nextWidth));
    };

    const handlePointerUp = () => {
      setIsResizing(false);
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [clampWidth, isResizing, containerRef]);

  return {
    width,
    isResizing,
    handleResizeStart,
  };
}
