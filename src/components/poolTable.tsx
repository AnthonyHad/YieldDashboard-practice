"use client";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PoolCharts from "./PoolCharts";
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

import { formatCurrency } from "@/lib/utils";

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

const getPoolDetails = (pool: Pool): PoolDetails => ({
  ...pool,
  asset: pool.symbol,
  etherscanUrl: `https://etherscan.io/token/${pool.symbol.toLowerCase()}`,
  historicalData: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    tvl: pool.tvlUsd * (0.8 + Math.random() * 0.4),
    apy: pool.apy * (0.7 + Math.random() * 0.6),
  })),
});

const getChainColor = (chain: string) => {
  const colors = {
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
    BSC: "bg-amber-200 text-amber-900 border-amber-300 dark:bg-amber-700 dark:text-amber-100 dark:border-amber-800", // BSC = Binance Smart Chain
  };
  return (
    colors[chain as keyof typeof colors] ||
    "bg-gray-200 text-gray-900 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
  );
};

export default function PoolTable({ pools }: PoolTableProps) {
  const [expandedPool, setExpandedPool] = useState<string | null>(null);
  const [poolDetails, setPoolDetails] = useState<PoolDetails | null>(null);

  const handleRowClick = (pool: Pool) => {
    if (expandedPool === pool.pool) {
      setExpandedPool(null);
      setPoolDetails(null);
    } else {
      setExpandedPool(pool.pool);
      setPoolDetails(getPoolDetails(pool));
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card dark:bg-gray-900/50 dark:border-gray-800 shadow-lg">
        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground border-b dark:border-gray-800 bg-muted/30 dark:bg-gray-800/30">
          <div className="col-span-1"></div>
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
            className="border-b last:border-b-0 dark:border-gray-800"
          >
            <div
              className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/50 dark:hover:bg-gray-800/50 cursor-pointer transition-all duration-200"
              onClick={() => handleRowClick(pool)}
            >
              <div className="col-span-1 flex items-center">
                {expandedPool === pool.pool ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform" />
                )}
              </div>

              <div className="col-span-2 flex items-center">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 flex items-center justify-center text-white text-xs font-bold mr-3 shadow-md">
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
                <span className="inline-flex items-center gap-1">
                  {typeof pool.apyReward === "number" && pool.apyReward > 0 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="ml-1 align-middle cursor-pointer text-blue-500">
                            <Info size={16} />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div>
                            <div>
                              <b>Base:</b>{" "}
                              {typeof pool.apyBase === "number"
                                ? pool.apyBase.toFixed(2) + "%"
                                : "N/A"}
                            </div>
                            <div>
                              <b>Reward:</b>{" "}
                              {typeof pool.apyReward === "number"
                                ? pool.apyReward.toFixed(2) + "%"
                                : "N/A"}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </span>
              </div>

              <div className="col-span-1 flex items-center">
                {pool.apyPct1D && pool.apyPct1D > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>

            {expandedPool === pool.pool && poolDetails && (
              <div className="p-6 bg-muted/20 dark:bg-gray-800/30 border-t dark:border-gray-800">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {poolDetails.project} - {poolDetails.symbol}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>
                          Chain:{" "}
                          <span className="text-foreground font-medium">
                            {poolDetails.chain}
                          </span>
                        </span>
                        <span>
                          Asset:{" "}
                          <span className="text-foreground font-medium">
                            {poolDetails.asset}
                          </span>
                        </span>
                        <span>
                          TVL:{" "}
                          <span className="text-foreground font-medium">
                            {formatCurrency(poolDetails.tvlUsd)}
                          </span>
                        </span>
                        <span>
                          APY:{" "}
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            {poolDetails.apy.toFixed(2)}%
                          </span>
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

                  <Card className="dark:bg-gray-900/50 dark:border-gray-800">
                    <CardContent className="p-6">
                      <PoolCharts data={poolDetails.historicalData} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
