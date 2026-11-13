import { cn } from '@tier0/utils';
import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';

type ComGlobalSpinnerSize = 'page' | 'section' | 'inline';

interface ComGlobalSpinnerProps extends ComponentPropsWithoutRef<'span'> {
  size?: ComGlobalSpinnerSize;
}

const spinnerSizeClassNames: Record<ComGlobalSpinnerSize, string> = {
  page: 'global-spinner--page',
  section: 'global-spinner--section',
  inline: 'global-spinner--inline',
};

function ComGlobalSpinner({ className, size = 'page', ...props }: ComGlobalSpinnerProps) {
  const t = useTranslations();
  return (
    <span
      role="status"
      aria-label={t('ui.common.loading')}
      className={cn('global-spinner block', spinnerSizeClassNames[size], className)}
      data-size={size}
      {...props}
    />
  );
}

export { ComGlobalSpinner, type ComGlobalSpinnerSize };
