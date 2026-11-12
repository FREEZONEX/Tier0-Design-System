'use client';

import _ from 'lodash';
import { useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';

interface ChartLineProps {
  chartConfig: ChartConfig;
  data: any[];
  height?: number | string;
  lineChartProps?: any;
  xAxisProps?: any;
  yAxisProps?: any;
  lineProps?: any;
  showYAxis?: boolean;
  showLegend?: boolean;
  className?: string;
}

export function ChartLine({
  data,
  chartConfig,
  height,
  lineChartProps = {},
  xAxisProps = {},
  yAxisProps = {},
  lineProps = {},
  showYAxis,
  showLegend,
  className,
}: ChartLineProps) {
  const [hoveringDataKey, setHoveringDataKey] = useState(null);

  const handleMouseEnter = (payload: any) => {
    setHoveringDataKey(payload.dataKey || null);
  };

  const handleMouseLeave = () => {
    setHoveringDataKey(null);
  };

  return (
    <ChartContainer config={chartConfig} className={className} height={height}>
      <LineChart
        accessibilityLayer
        data={data}
        // margin={{
        //   left: 12,
        //   right: 12,
        // }}
        {...lineChartProps}
      >
        <CartesianGrid vertical={true} />
        <XAxis tickLine={false} axisLine={false} tickMargin={8} {...xAxisProps} />
        {showYAxis && <YAxis tickLine={false} axisLine={false} tickMargin={0} {...yAxisProps} />}
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        {_.map(_.keys(chartConfig), (key) => (
          <Line
            key={key}
            dataKey={key}
            type="linear"
            stroke={`var(--color-${key})`}
            strokeOpacity={hoveringDataKey === null ? 1 : key === hoveringDataKey ? 1 : 0.3}
            strokeWidth={2}
            {...lineProps}
          />
        ))}
        {showLegend && (
          <ChartLegend
            content={<ChartLegendContent onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />}
          />
        )}
      </LineChart>
    </ChartContainer>
  );
}
