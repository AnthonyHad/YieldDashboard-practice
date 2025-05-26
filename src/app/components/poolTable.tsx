"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Pool } from "@/lib/getDefiLlamaPools";

export default function PoolTable({ pools }: { pools: Pool[] }) {
  const router = useRouter();

  return (
    <Table>
      <TableCaption>A list of top pools.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Chain</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Symbol</TableHead>
          <TableHead>TVL (USD)</TableHead>
          <TableHead>APY Base</TableHead>
          <TableHead>APY Reward</TableHead>
          <TableHead>APY</TableHead>
          <TableHead>Reward Tokens</TableHead>
          <TableHead>APY Pct 1D</TableHead>
          <TableHead>APY Pct 7D</TableHead>
          <TableHead>APY Pct 30D</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pools.map((pool) => (
          <TableRow
            key={pool.pool}
            className="cursor-pointer hover:bg-gray-100"
            onClick={() => router.push(`/pool/${pool.pool}`)}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                router.push(`/pool/${pool.pool}`);
              }
            }}
          >
            <TableCell>{pool.chain}</TableCell>
            <TableCell>{pool.project}</TableCell>
            <TableCell>{pool.symbol}</TableCell>
            <TableCell>{pool.tvlUsd.toLocaleString()}</TableCell>
            <TableCell>
              {pool.apyBase ? pool.apyBase.toFixed(2) : "N/A"}%
            </TableCell>
            <TableCell>
              {pool.apyReward ? pool.apyReward.toFixed(2) : "N/A"}%
            </TableCell>
            <TableCell>{pool.apy ? pool.apy.toFixed(2) : "N/A"}%</TableCell>
            <TableCell>
              {pool.rewardTokens ? pool.rewardTokens : "N/A"}
            </TableCell>
            <TableCell>
              {pool.apyPct1D ? pool.apyPct1D.toFixed(2) : "N/A"}%
            </TableCell>
            <TableCell>
              {pool.apyPct7D ? pool.apyPct7D.toFixed(2) : "N/A"}%
            </TableCell>
            <TableCell>
              {pool.apyPct30D ? pool.apyPct30D.toFixed(2) : "N/A"}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
