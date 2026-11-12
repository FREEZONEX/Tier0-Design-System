import { LoaderIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@tier0/utils';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  const t = useTranslations();
  return (
    <LoaderIcon
      role="status"
      aria-label={t('ui.common.loading')}
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
