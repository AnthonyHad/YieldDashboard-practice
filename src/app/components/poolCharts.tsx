// src/components/PoolCharts.tsx
"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export type ChartDatum = {
  timestamp: string; // Date/time string (ISO format)
  tvlUsd: number; // Total Value Locked in USD
  apy: number | null; // Total APY
  apyBase: number | null; // Base APY
  apyReward: number | null; // Reward APY (if available)
  il7d?: number | null; // Impermanent loss 7d (if available)
  apyBase7d?: number | null; // 7-day avg base APY (if available)
  // ...add any other fields you encounter
};

type PoolChartsProps = {
  chartData: ChartDatum[];
};

export default function PoolCharts({ chartData }: PoolChartsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2">
        <h3 className="font-semibold mb-2">TVL (USD)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <XAxis dataKey="timestamp" hide />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="tvlUsd"
              stroke="#38bdf8"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full md:w-1/2">
        <h3 className="font-semibold mb-2">APY (%)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <XAxis dataKey="timestamp" hide />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="apy" stroke="#16a34a" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
