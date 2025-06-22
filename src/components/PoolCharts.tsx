// components/PoolCharts.tsx
"use client";

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatDate, formatCurrency } from "@/lib/utils";
import { useMemo } from "react";

interface PoolChartProps {
  data: Array<{
    date: string; // ISO "YYYY-MM-DD"
    tvl: number;
    apy: number;
  }>;
}

export default function PoolCharts({ data }: PoolChartProps) {
  // 1) Keep one point per week (e.g. every 7th day)
  const weeklyData = useMemo(() => data.filter((_, i) => i % 7 === 0), [data]);

  // 2) Pick the first weekly sample of each calendar month
  const monthTicks = useMemo(() => {
    const seen = new Set<string>();
    const ticks: string[] = [];
    for (const { date } of weeklyData) {
      const [year, month] = date.split("-");
      const key = `${year}-${month}`;
      if (!seen.has(key)) {
        seen.add(key);
        ticks.push(date);
      }
    }
    return ticks;
  }, [weeklyData]);

  // 3) Formatter to display "Mon YYYY"
  const monthFormatter = (isoDate: string) =>
    new Date(isoDate).toLocaleDateString(undefined, {
      month: "short",
      year: "numeric",
    });

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400" />
          <span className="text-sm font-medium text-foreground">TVL</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500 dark:bg-purple-400" />
          <span className="text-sm font-medium text-foreground">APY</span>
        </div>
      </div>

      <ChartContainer
        config={{
          tvl: { label: "TVL", color: "hsl(217 91% 60%)" },
          apy: { label: "APY", color: "hsl(271 81% 56%)" },
        }}
        className="h-[400px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={weeklyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-muted dark:stroke-gray-700"
              opacity={0.3}
            />

            <XAxis
              dataKey="date"
              ticks={monthTicks}
              tickFormatter={monthFormatter}
              interval={0}
              angle={-35}
              textAnchor="end"
              className="text-xs"
              fontSize={12}
            />

            <YAxis
              yAxisId="tvl"
              orientation="left"
              tickFormatter={formatCurrency}
              className="text-xs"
              fontSize={12}
            />
            <YAxis
              yAxisId="apy"
              orientation="right"
              tickFormatter={(v) => `${v.toFixed(1)}%`}
              className="text-xs"
              fontSize={12}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent className="dark:bg-gray-800 dark:border-gray-700" />
              }
              labelFormatter={(v) => formatDate(v)}
              formatter={(value, name) => [
                name === "tvl"
                  ? formatCurrency(value as number)
                  : `${(value as number).toFixed(2)}%`,
                name === "tvl" ? " TVL" : " APY",
              ]}
            />

            <Line
              yAxisId="tvl"
              type="monotone"
              dataKey="tvl"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                stroke: "#3b82f6",
                strokeWidth: 2,
                fill: "#3b82f6",
                className: "drop-shadow-lg",
              }}
            />
            <Line
              yAxisId="apy"
              type="monotone"
              dataKey="apy"
              stroke="#a855f7"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                stroke: "#a855f7",
                strokeWidth: 2,
                fill: "#a855f7",
                className: "drop-shadow-lg",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
