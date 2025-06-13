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

interface PoolChartProps {
  data: Array<{
    date: string;
    tvl: number;
    apy: number;
  }>;
}

export default function PoolCharts({ data }: PoolChartProps) {
  console.log("Chart data:", data);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400"></div>
          <span className="text-sm font-medium text-foreground">TVL</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500 dark:bg-purple-400"></div>
          <span className="text-sm font-medium text-foreground">APY</span>
        </div>
      </div>

      <ChartContainer
        config={{
          tvl: {
            label: "TVL",
            color: "hsl(217 91% 60%)", // Blue for both modes
          },
          apy: {
            label: "APY",
            color: "hsl(271 81% 56%)", // Purple for both modes
          },
        }}
        className="h-[400px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-muted dark:stroke-gray-700"
              opacity={0.3}
            />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              className="text-xs"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              yAxisId="tvl"
              orientation="left"
              tickFormatter={formatCurrency}
              className="text-xs"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              yAxisId="apy"
              orientation="right"
              tickFormatter={(value) => `${value.toFixed(1)}%`}
              className="text-xs"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent className="dark:bg-gray-800 dark:border-gray-700" />
              }
              labelFormatter={(value) => formatDate(value)}
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
