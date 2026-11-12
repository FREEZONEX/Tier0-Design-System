'use client';

import _ from 'lodash';
import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';

interface ChartAreaProps {
  chartConfig: ChartConfig;
  data: any[];
  height?: number | string;
  areaChartProps?: any;
  xAxisProps?: any;
  yAxisProps?: any;
  areaProps?: any;
  showYAxis?: boolean;
  showLegend?: boolean;
  className?: string;
}

export function ChartArea({
  data,
  chartConfig,
  height,
  areaChartProps = {},
  xAxisProps = {},
  yAxisProps = {},
  areaProps = {},
  showYAxis,
  showLegend,
  className,
}: ChartAreaProps) {
  const [hoveringDataKey, setHoveringDataKey] = useState(null);

  const handleMouseEnter = (payload: any) => {
    setHoveringDataKey(payload.dataKey || null);
  };

  const handleMouseLeave = () => {
    setHoveringDataKey(null);
  };

  return (
    <ChartContainer config={chartConfig} className={className} height={height}>
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 0,
          right: 12,
        }}
        {...areaChartProps}
      >
        <defs>
          {_.map(_.keys(chartConfig), (key) => (
            <linearGradient id={`fill${key}`} x1="0" y1="0" x2="0" y2="1" key={key}>
              <stop offset="5%" stopColor={`var(--color-${key})`} stopOpacity={0.8} />
              <stop offset="95%" stopColor={`var(--color-${key})`} stopOpacity={0.1} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis tickLine={false} axisLine={false} tickMargin={8} {...xAxisProps} />
        {showYAxis && <YAxis tickLine={false} axisLine={false} tickMargin={4} width={48} {...yAxisProps} />}
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        {_.map(_.keys(chartConfig), (key) => (
          <Area
            key={key}
            dataKey={key}
            type="natural"
            stroke={`var(--color-${key})`}
            fill={`url(#fill${key})`}
            strokeOpacity={hoveringDataKey === null ? 1 : key === hoveringDataKey ? 1 : 0.3}
            // strokeWidth={2}
            {...areaProps}
          />
        ))}
        {showLegend && (
          <ChartLegend
            content={<ChartLegendContent onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />}
          />
        )}
      </AreaChart>
    </ChartContainer>
  );
}
