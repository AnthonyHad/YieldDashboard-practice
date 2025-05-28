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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Info } from "lucide-react";

import type { Pool } from "@/lib/getDefiLlamaPools";

export default function PoolTable({ pools }: { pools: Pool[] }) {
  const router = useRouter();

  pools.forEach((pool) => {
    if (typeof pool.apy !== "number") {
      console.log("APY not a number:", pool.apy, pool);
    }
  });

  return (
    <Table>
      <TableCaption>A list of top pools.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Chain</TableHead>
          <TableHead>TVL (USD)</TableHead>
          <TableHead>APY</TableHead>
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
            <TableCell>{pool.symbol}</TableCell>
            <TableCell>{pool.project}</TableCell>
            <TableCell>{pool.chain}</TableCell>
            <TableCell>{pool.tvlUsd.toLocaleString()}</TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1">
                {typeof pool.apy === "number" && !isNaN(pool.apy)
                  ? pool.apy.toFixed(2) + "%"
                  : "-"}
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// Old code snippets:

// {
//   /* <TableHead>APY Base</TableHead>
//           <TableHead>APY Reward</TableHead> */
// }
// {
//   /* <TableHead>Reward Tokens</TableHead> */
// }
// {
//   /* <TableHead>APY Pct 1D</TableHead>
//           <TableHead>APY Pct 7D</TableHead>
//           <TableHead>APY Pct 30D</TableHead> */
// }

// {
//   /* <TableCell>
//               {pool.apyBase ? `${pool.apyBase.toFixed(2)}%` : "-"}
//             </TableCell>
//             <TableCell>
//               {pool.apyReward ? `${pool.apyReward.toFixed(2)}%` : "-"}
//             </TableCell> */
// }
// {
//   /* <TableCell>
//               {pool.rewardTokens ? pool.rewardTokens : "N/A"}
//             </TableCell> */
// }
// {
//   /* <TableCell>
//               {pool.apyPct1D ? `${pool.apyPct1D.toFixed(2)}%` : "-"}
//             </TableCell>
//             <TableCell>
//               {pool.apyPct7D ? `${pool.apyPct7D.toFixed(2)}%` : "-"}
//             </TableCell>
//             <TableCell>
//               {pool.apyPct30D ? `${pool.apyPct30D.toFixed(2)}%` : "-"}
//             </TableCell> */
// }
