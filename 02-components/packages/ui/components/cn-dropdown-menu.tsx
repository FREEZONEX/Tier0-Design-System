'use client';

import { cn } from '@tier0/utils';
import { Loader } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { DropdownMenuItem } from './ui/dropdown-menu';

export type CnDropdownMenuItemProps = ComponentProps<typeof DropdownMenuItem> & {
  /** 异步操作进行中：统一渲染禁用态 + 左侧 spinner，语义对齐 Button 的 loading。 */
  loading?: boolean;
  /**
   * 前导图标。loading 时被 spinner **替换**（而非并列），语义对齐 Button 的 icon。
   * 图标放进 children 时组件无从分辨哪个是前导图标，只能在 spinner 之后再渲染一遍，
   * 于是"转圈 + 原图标"同时出现——带图标的菜单项请一律用本 prop。
   */
  icon?: ReactNode;
};

// CnDropdownMenuItem 在 shadcn 原生 DropdownMenuItem 上补齐 loading 语义（原生只有 disabled，
// spinner 与禁用态需调用方手拼、易漏）。loading 时禁用（disabled=loading||disabled，Radix 据此加
// pointer-events-none，阻止重复触发异步）并在左侧显示 spinner；不传 loading 时行为与原生完全一致。
// 语义对齐 @tier0/ui Button 的 loading / icon prop（同一 Loader 图标、同一 leading 槽位）。
// 原生 dropdown-menu 保持不改。
export function CnDropdownMenuItem({
  loading = false,
  icon,
  disabled,
  className,
  children,
  ...props
}: CnDropdownMenuItemProps) {
  return (
    <DropdownMenuItem disabled={loading || disabled} className={cn(className)} {...props}>
      {/* leading 槽位：loading 时是 spinner，否则是 icon，二者互斥 */}
      {loading ? <Loader className="size-4 animate-spin" /> : icon}
      {children}
    </DropdownMenuItem>
  );
}
