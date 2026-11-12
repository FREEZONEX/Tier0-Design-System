'use client';

import { ReactNode } from 'react';

interface StatsCardProps {
  label: ReactNode;
  value: ReactNode;
  style?: React.CSSProperties;
}

export default function ComStatsCard({ label, value, style }: StatsCardProps) {
  return (
    <div className="flex h-[114px] w-full flex-col justify-between rounded-md border-1 p-4" style={style}>
      <div className="text-text-tertiary text-sm font-medium">{label}</div>
      <div className="text-xl font-medium">{value}</div>
    </div>
  );
}
