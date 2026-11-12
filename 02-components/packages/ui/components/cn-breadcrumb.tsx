import { cn } from '@tier0/utils';
import _ from 'lodash';
import { Fragment, MouseEvent } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

type BreadcrumbItemType = { title: React.ReactNode; url?: string; [prop: string]: any; onClick?: () => void };

export interface CnBreadcrumbProps {
  items: BreadcrumbItemType[];
  separator?: React.ReactNode;
  onClick?: (item: BreadcrumbItemType) => void;
  className?: string;
  itemClassName?: string;
  pageClassName?: string;
  rootClassName?: string;
}
export default function CnBreadcrumb({
  items,
  separator = null,
  onClick,
  className,
  itemClassName,
  pageClassName,
  rootClassName,
}: CnBreadcrumbProps) {
  const handleItemClick = (event: MouseEvent<HTMLLIElement>, item: BreadcrumbItemType) => {
    const hasNavigationHandler = !!onClick || !!item.onClick;
    if (!hasNavigationHandler) return;

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    if (onClick) onClick(item);
    if (item.onClick) item.onClick();
  };

  return (
    <Breadcrumb className={rootClassName}>
      <BreadcrumbList className={className}>
        {_.map(items, (item, i) => {
          const itemKey = item.key ?? `${_.isString(item.title) ? item.title : 'breadcrumb'}_${i}`;
          if (i === items.length - 1) {
            return (
              <BreadcrumbItem key={itemKey} className={itemClassName}>
                <BreadcrumbPage className={pageClassName} title={_.isString(item.title) ? item.title : undefined}>
                  {item.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            );
          } else {
            return (
              <Fragment key={itemKey}>
                <BreadcrumbItem
                  onClick={(event) => handleItemClick(event, item)}
                  title={_.isString(item.title) ? item.title : undefined}
                  className={cn(
                    onClick || item.url || item.onClick ? 'hover:text-text cursor-pointer' : '',
                    itemClassName
                  )}
                >
                  {item.url ? (
                    <BreadcrumbLink href={item.url} className="text-muted-foreground! hover:text-text!">
                      {item.title}
                    </BreadcrumbLink>
                  ) : (
                    item.title
                  )}
                </BreadcrumbItem>
                <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
              </Fragment>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
