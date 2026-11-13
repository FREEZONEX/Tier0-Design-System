'use client';

import { cn } from '@tier0/utils';
import { MouseEventHandler, ReactNode } from 'react';
interface ComIconTagProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLSpanElement>;
}
export default function ComIconTag({ className, children, onClick }: ComIconTagProps) {
  return (
    <span
      className={cn('bg-bg-accent text-text-secondary flex h-8 w-8 items-center justify-center rounded-md', className)}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
