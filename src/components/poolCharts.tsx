"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import dayjs from "dayjs";

// Format TVL as $X.Xb or $X.Xm
const formatTvl = (value: number) => {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}b`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}m`;
  return `$${value.toLocaleString()}`;
};

const formatApy = (value: number) =>
  value < 1 ? `${value.toFixed(2)}%` : `${value.toFixed(1)}%`;

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
    <div className="w-full bg-[#15151b] rounded-xl shadow-md p-4">
      <ResponsiveContainer width="100%" height={360}>
        <LineChart
          data={chartData}
          margin={{ left: 24, right: 24, top: 16, bottom: 8 }}
        >
          <XAxis
            dataKey="timestamp"
            minTickGap={40}
            tickFormatter={(v) => dayjs(v).format("MMM YY")}
            stroke="#555"
          />
          <YAxis
            yAxisId="tvl"
            orientation="left"
            tickFormatter={formatTvl}
            stroke="#38bdf8"
            axisLine={false}
            tickLine={false}
            padding={{ top: 8, bottom: 8 }}
            domain={["dataMin", "dataMax"]}
          />
          <YAxis
            yAxisId="apy"
            orientation="right"
            tickFormatter={formatApy}
            stroke="#f472b6"
            axisLine={false}
            tickLine={false}
            padding={{ top: 8, bottom: 8 }}
            domain={["dataMin", "dataMax"]}
          />
          <RechartsTooltip
            content={({ active, payload, label }) => {
              if (!active || !payload) return null;
              const tvl = payload.find((p) => p.dataKey === "tvlUsd")?.value;
              const apy = payload.find((p) => p.dataKey === "apy")?.value;
              return (
                <div className="bg-[#222232] p-3 rounded shadow text-white text-xs">
                  <div className="mb-1">
                    <b>{dayjs(label).format("DD MMM YYYY")}</b>
                  </div>
                  <div>TVL: {formatTvl(Number(tvl))}</div>
                  <div>
                    APY:{" "}
                    {apy !== null && apy !== undefined
                      ? formatApy(Number(apy))
                      : "N/A"}
                  </div>
                </div>
              );
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            formatter={(val) =>
              val === "tvlUsd" ? (
                <span style={{ color: "#38bdf8" }}>TVL</span>
              ) : (
                <span style={{ color: "#f472b6" }}>APY</span>
              )
            }
          />
          <Line
            yAxisId="tvl"
            type="monotone"
            dataKey="tvlUsd"
            stroke="#38bdf8"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <Line
            yAxisId="apy"
            type="monotone"
            dataKey="apy"
            stroke="#f472b6"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
