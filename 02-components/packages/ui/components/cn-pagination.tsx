'use client';

import { cn } from '@tier0/utils';
import { useTranslations } from 'next-intl';
import { useMemo, useRef, useState } from 'react';
import { Input } from './ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export interface CnPaginationProps {
  current: number;
  total: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (page: number, size: number) => void;
  showTotal?: boolean;
  showPageSize?: boolean;
  showQuickJumper?: boolean;
  className?: string;
}

export default function CnPagination({
  current,
  total,
  pageSize,
  pageSizeOptions = [10, 20, 30, 50, 100],
  onPageChange,
  onPageSizeChange,
  showTotal = true,
  showPageSize = true,
  showQuickJumper = true,
  className,
}: CnPaginationProps) {
  const t = useTranslations();
  const [goToPage, setGoToPage] = useState('');
  const goToPageInputRef = useRef<HTMLInputElement>(null);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

  // 生成页码数组
  const getPageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      // 如果总页数少于等于最大可见数，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 总是显示第一页
      pages.push(1);

      // 计算省略号位置
      const startEllipsis = current > 4;
      const endEllipsis = current < totalPages - 3;

      if (startEllipsis && endEllipsis) {
        // 当前页在中间：1 ... current-1 current current+1 ... totalPages
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (startEllipsis) {
        // 当前页靠近末尾：1 ... totalPages-3 totalPages-2 totalPages-1 totalPages
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // 当前页靠近开头：1 2 3 4 ... totalPages
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  }, [current, totalPages]);

  const handleGoToPage = () => {
    const page = parseInt(goToPage);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setGoToPage('');
      goToPageInputRef.current?.blur();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGoToPage();
    }
  };

  const handlePageSizeChange = (value: string) => {
    const nextPageSize = parseInt(value);
    const nextTotalPages = Math.max(1, Math.ceil(total / nextPageSize));
    onPageSizeChange?.(Math.min(current, nextTotalPages), nextPageSize);
  };

  return (
    <div className={cn('flex items-center gap-2 pt-6', className)}>
      {/* 左侧：总数 */}
      {showTotal && <div className="text-sm whitespace-nowrap">{t('ui.pagination.totalItems', { total })}</div>}
      <div className="flex h-6 items-center gap-1 whitespace-nowrap">
        {/* 中间：页码 */}
        <Pagination className="mx-0 h-6 w-auto">
          <PaginationContent className="gap-0">
            <PaginationItem className="h-6 flex-auto">
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (current > 1) onPageChange(current - 1);
                }}
                className={cn(
                  'h-6 w-auto px-1 py-0 pl-1! text-sm',
                  current === 1 && 'pointer-events-none opacity-50',
                  '[&_span]:hidden'
                )}
              />
            </PaginationItem>
            {getPageNumbers.map((page, index) => {
              if (page === '...') {
                return (
                  <PaginationItem key={`ellipsis-${index}`} className="h-6 flex-auto">
                    <PaginationEllipsis className="text-bg-secondary h-6 w-auto px-1 font-normal" />
                  </PaginationItem>
                );
              }
              const pageNum = page as number;
              const isActive = current === pageNum;
              return (
                <PaginationItem className="h-6 flex-auto" key={`page-${pageNum}-${index}`}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(pageNum);
                    }}
                    isActive={isActive}
                    className={cn(
                      'text-text h-6 w-auto bg-transparent px-2 font-normal hover:bg-transparent',
                      isActive && 'border-highlight-border text-highlight-text-deep! border font-medium'
                    )}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem className="h-6 flex-auto">
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (current < totalPages) onPageChange(current + 1);
                }}
                className={cn(
                  'h-6 w-auto px-1 py-0 pr-1!',
                  current === totalPages && 'pointer-events-none opacity-50',
                  '[&_span]:hidden'
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {/* 右侧：每页数量和跳转 */}

        {showPageSize && (
          <div className="flex items-center">
            {onPageSizeChange ? (
              <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
                <SelectTrigger className="h-6! w-auto gap-1 px-2 py-0">
                  <SelectValue>{t('ui.pagination.perPage', { size: pageSize })}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {pageSizeOptions.map((size) => (
                      <SelectItem
                        key={size}
                        value={String(size)}
                        className={cn({ 'bg-bg-accent font-medium': pageSize === size })}
                      >
                        {t('ui.pagination.perPage', { size })}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <span className="text-muted-foreground text-sm">{t('ui.pagination.perPage', { size: pageSize })}</span>
            )}
          </div>
        )}
      </div>
      {showQuickJumper && getPageNumbers.length > 1 && (
        <div className="flex items-center gap-2">
          <span className="text-sm">{t('ui.pagination.goTo')}</span>
          <Input
            ref={goToPageInputRef}
            // type="number"
            value={goToPage}
            onChange={(e) => setGoToPage(e.target.value)}
            onKeyPress={handleKeyPress}
            onBlur={handleGoToPage}
            placeholder=""
            className="h-6 w-11"
            min={1}
            max={totalPages}
          />
          <span>{t('ui.pagination.page')}</span>
        </div>
      )}
    </div>
  );
}
