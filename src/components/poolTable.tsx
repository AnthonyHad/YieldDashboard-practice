"use client";

import { useState } from "react";
import { getDefiLlamaPoolChart } from "@/lib/getDefiLlamaPoolChart";
import PoolCharts from "./PoolCharts";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Info,
} from "lucide-react";

import type { Pool } from "@/lib/getDefiLlamaPools";

interface PoolDetails extends Pool {
  asset: string;
  etherscanUrl?: string;
  historicalData: {
    date: string;
    tvl: number;
    apy: number;
  }[];
}

interface PoolTableProps {
  pools: Pool[];
}

const getChainColor = (chain: string) => {
  const colors: Record<string, string> = {
    Ethereum:
      "bg-blue-200 text-blue-900 border-blue-300 dark:bg-blue-800 dark:text-blue-100 dark:border-blue-700",
    Solana:
      "bg-purple-200 text-purple-900 border-purple-300 dark:bg-purple-800 dark:text-purple-100 dark:border-purple-700",
    Tron: "bg-red-200 text-red-900 border-red-300 dark:bg-red-800 dark:text-red-100 dark:border-red-700",
    Polygon:
      "bg-violet-200 text-violet-900 border-violet-300 dark:bg-violet-800 dark:text-violet-100 dark:border-violet-700",
    Base: "bg-sky-200 text-sky-900 border-sky-300 dark:bg-sky-800 dark:text-sky-100 dark:border-sky-700",
    Avalanche:
      "bg-rose-200 text-rose-900 border-rose-300 dark:bg-rose-800 dark:text-rose-100 dark:border-rose-700",
    BSC: "bg-amber-200 text-amber-900 border-amber-300 dark:bg-amber-700 dark:text-amber-100 dark:border-amber-800",
  };
  return (
    colors[chain] ??
    "bg-gray-200 text-gray-900 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
  );
};

export default function PoolTable({ pools }: PoolTableProps) {
  const [expandedPool, setExpandedPool] = useState<string | null>(null);
  const [poolDetails, setPoolDetails] = useState<PoolDetails | null>(null);
  const [loading, setLoading] = useState(false);

  // 1) Your click handler stays synchronous
  const handleRowClick = (pool: Pool) => {
    if (expandedPool === pool.pool) {
      setExpandedPool(null);
      setPoolDetails(null);
    } else {
      setExpandedPool(pool.pool);
      fetchChartData(pool);
    }
  };

  // 2) The async fetch is a separate function (in the same component)
  const fetchChartData = async (pool: Pool) => {
    setLoading(true);
    try {
      const historicalData = await getDefiLlamaPoolChart(pool.pool);

      const updatedHistoricalData = historicalData.map((r) => ({
        // chart wants .date, .tvl, .apy
        date: r.timestamp, // keep the ISO string, or wrap in new Date(r.timestamp)
        tvl: r.tvlUsd,
        apy: r.apy ?? 0,
      }));

      setPoolDetails({
        ...pool,
        asset: pool.symbol,
        etherscanUrl: `https://etherscan.io/token/${pool.symbol.toLowerCase()}`,
        historicalData: updatedHistoricalData,
      });
    } catch (err) {
      console.error("Failed to fetch chart data:", err);
      setPoolDetails(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card dark:bg-gray-900/50 dark:border-gray-800 shadow-lg">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground border-b dark:border-gray-800 bg-muted/30 dark:bg-gray-800/30">
          <div className="col-span-1" />
          <div className="col-span-2">Symbol</div>
          <div className="col-span-2">Project</div>
          <div className="col-span-2">Chain</div>
          <div className="col-span-2">TVL</div>
          <div className="col-span-2">APY</div>
          <div className="col-span-1">Trend</div>
        </div>

        {pools.map((pool) => (
          <div
            key={pool.pool}
            className="border-b last:border-0 dark:border-gray-800"
          >
            <div
              className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/50 dark:hover:bg-gray-800/50 cursor-pointer transition-all duration-200"
              onClick={() => handleRowClick(pool)}
            >
              <div className="col-span-1 flex items-center">
                {expandedPool === pool.pool ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>

              <div className="col-span-2 flex items-center">
                <div
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500
                              flex items-center justify-center text-white text-xs font-bold mr-3 shadow-md"
                >
                  {pool.symbol.slice(0, 2)}
                </div>
                <span className="font-medium text-foreground">
                  {pool.symbol}
                </span>
              </div>

              <div className="col-span-2 flex items-center">
                <span className="text-sm text-muted-foreground">
                  {pool.project}
                </span>
              </div>

              <div className="col-span-2 flex items-center">
                <Badge
                  variant="secondary"
                  className={`${getChainColor(pool.chain)} border`}
                >
                  {pool.chain}
                </Badge>
              </div>

              <div className="col-span-2 flex items-center">
                <span className="font-mono text-foreground font-medium">
                  {formatCurrency(pool.tvlUsd)}
                </span>
              </div>

              <div className="col-span-2 flex items-center">
                <span className="font-mono text-green-600 dark:text-green-400 font-medium">
                  {pool.apy.toFixed(2)}%
                </span>
                {(pool.apyReward ?? 0) > 0 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-1 cursor-pointer text-blue-500">
                          <Info size={16} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div>
                          <div>
                            <b>Base:</b> {(pool.apyBase ?? 0).toFixed(2)}%
                          </div>
                          <div>
                            <b>Reward:</b> {(pool.apyReward ?? 0).toFixed(2)}%
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>

              <div className="col-span-1 flex items-center">
                {pool.apyPct1D > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>

            {/* Expanded detail panel */}
            {expandedPool === pool.pool && (
              <div className="p-6 bg-muted/20 dark:bg-gray-800/30 border-t dark:border-gray-800">
                {loading ? (
                  <p className="text-sm text-muted-foreground">
                    Loading chart data…
                  </p>
                ) : (
                  poolDetails && (
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">
                            {poolDetails.project} – {poolDetails.symbol}
                          </h3>
                          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                            <span>
                              Chain:{" "}
                              <strong className="text-foreground">
                                {poolDetails.chain}
                              </strong>
                            </span>
                            <span>
                              Asset:{" "}
                              <strong className="text-foreground">
                                {poolDetails.asset}
                              </strong>
                            </span>
                            <span>
                              TVL:{" "}
                              <strong className="text-foreground">
                                {formatCurrency(poolDetails.tvlUsd)}
                              </strong>
                            </span>
                            <span>
                              APY:{" "}
                              <strong className="text-green-600 dark:text-green-400">
                                {poolDetails.apy.toFixed(2)}%
                              </strong>
                            </span>
                          </div>
                        </div>
                        {poolDetails.etherscanUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="dark:border-gray-700 dark:hover:bg-gray-800"
                          >
                            <a
                              href={poolDetails.etherscanUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View on Etherscan
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>

                      {/* Chart */}
                      <Card className="dark:bg-gray-900/50 dark:border-gray-800">
                        <CardContent className="p-6">
                          <PoolCharts data={poolDetails.historicalData} />
                        </CardContent>
                      </Card>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
