import { getDefiLlamaPools } from "@/lib/getDefiLlamaPools";

export default async function HomePage() {
  const pools = await getDefiLlamaPools();

  return (
    <main>
      <h1>Pools List</h1>
      <table>
        <thead>
          <tr>
            <th>Chain</th>
            <th>Project</th>
            <th>Symbol</th>
            <th>TVL (USD)</th>
            <th>APY Base</th>
            <th>APY Reward</th>
            <th>APY</th>
            <th>Reward Tokens</th>
            <th>APY Pct 1D</th>
            <th>APY Pct 7D</th>
            <th>APY Pct 30D</th>
          </tr>
        </thead>

        <tbody>
          {pools.slice(0, 30).map((pool) => (
            <tr key={pool.project + pool.symbol + pool.chain}>
              <td>{pool.chain}</td>
              <td>{pool.project}</td>
              <td>{pool.symbol}</td>
              <td>{pool.tvlUsd.toLocaleString()}</td>
              <td>{pool.apyBase ? pool.apyBase.toFixed(2) : "N/A"}%</td>
              <td>{pool.apyReward ? pool.apyReward.toFixed(2) : "N/A"}%</td>
              <td>{pool.apy ? pool.apy.toFixed(2) : "N/A"}%</td>
              <td>{pool.rewardTokens ? pool.rewardTokens : "N/A"}</td>
              <td>{pool.apyPct1D ? pool.apyPct1D.toFixed(2) : "N/A"}%</td>
              <td>{pool.apyPct7D ? pool.apyPct7D.toFixed(2) : "N/A"}%</td>
              <td>{pool.apyPct30D ? pool.apyPct30D.toFixed(2) : "N/A"}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
