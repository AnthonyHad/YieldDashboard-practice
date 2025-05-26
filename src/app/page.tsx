import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getDefiLlamaPools } from "@/lib/getDefiLlamaPools";

export default async function HomePage() {
  const pools = await getDefiLlamaPools();

  return (
    <main>
      <h1>Pools List</h1>
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
          {pools.slice(0, 30).map((pool) => (
            <TableRow key={pool.poolId}>
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
    </main>
  );
}
