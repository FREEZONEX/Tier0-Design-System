'use client';

import type { MouseEvent } from 'react';
import { useSingleFlight } from '../hooks/use-single-flight';
import { Button, type ButtonProps } from './ui/button';

export type CnAsyncButtonProps = Omit<ButtonProps, 'onClick' | 'asChild'> & {
  asChild?: never;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | PromiseLike<unknown>;
};

export function CnAsyncButton({ loading = false, disabled = false, onClick, ...buttonProps }: CnAsyncButtonProps) {
  const { execute, locked, pending } = useSingleFlight(onClick);

  return (
    <Button
      {...buttonProps}
      onClick={onClick ? execute : undefined}
      loading={Boolean(loading || pending)}
      disabled={Boolean(disabled || locked)}
    />
  );
}
