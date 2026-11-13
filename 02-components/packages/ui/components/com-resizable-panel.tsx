'use client';

import { useResizablePanel } from '@tier0/hooks';
import { cn } from '@tier0/utils';
import React from 'react';

interface ResizablePanelProps {
  children: React.ReactNode;
  defaultWidth: number;
  minWidth: number;
  maxWidth: number;
  rightPanelMinWidth?: number;
  className?: string;
  resizeHandleClassName?: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function ComResizablePanel({
  children,
  defaultWidth,
  minWidth,
  maxWidth,
  rightPanelMinWidth,
  className = '',
  resizeHandleClassName,
  containerRef,
}: ResizablePanelProps) {
  const { width, isResizing, handleResizeStart } = useResizablePanel({
    defaultWidth,
    minWidth,
    maxWidth,
    rightPanelMinWidth,
    containerRef,
  });

  return (
    <div className={`relative shrink-0 ${className}`} style={{ width }}>
      {children}
      <div
        className={cn('absolute top-0 -right-3 bottom-0 z-10 w-6 cursor-col-resize', resizeHandleClassName)}
        onPointerDown={handleResizeStart}
      >
        <div
          className={`mx-auto h-full w-px transition-colors ${
            isResizing ? 'bg-border' : 'hover:bg-border/60 bg-transparent'
          }`}
        />
      </div>
    </div>
  );
}
