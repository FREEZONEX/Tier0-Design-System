import { cn } from '@tier0/utils';
import { Tag, TagProps } from 'antd';
import _ from 'lodash';
import styles from './style.module.scss';

export type TagTheme =
  | 'default'
  | 'fx-green'
  | 'blue'
  | 'success'
  | 'error'
  | 'warning'
  | 'sky'
  | 'orange'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'amber'
  | 'violet'
  | 'lime';

export function AntTag({
  children,
  theme = 'default',
  icon,
  iconClassName,
  className,
  bordered = false,
  ...restProps
}: TagProps & { theme?: TagTheme; iconClassName?: string }) {
  return (
    <Tag
      className={cn(
        styles['AntTag-wrapper'],
        {
          'theme-default': theme === 'default',
          'theme-fx-green': theme === 'fx-green',
          'theme-success': theme === 'success',
          'theme-error': theme === 'error',
          'theme-warning': theme === 'warning',
          'theme-blue': theme === 'blue',
          'theme-sky': theme === 'sky',
          'theme-orange': theme === 'orange',
          'theme-green': theme === 'green',
          'theme-emerald': theme === 'emerald',
          'theme-teal': theme === 'teal',
          'theme-cyan': theme === 'cyan',
          'theme-amber': theme === 'amber',
          'theme-violet': theme === 'violet',
          'theme-lime': theme === 'lime',
          'border-none': !bordered, // 需要放最后才会覆盖
        },
        className
      )}
      bordered={bordered}
      {...restProps}
      icon={icon ? <i className={cn('mr-2 block leading-none', iconClassName)}>{icon}</i> : undefined}
      title={_.isString(children) ? children : ''}
    >
      <span>{children}</span>
    </Tag>
  );
}
