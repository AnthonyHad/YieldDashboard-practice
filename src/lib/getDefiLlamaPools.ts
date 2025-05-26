export type Pool = {
  chain: string;
  project: string;
  symbol: string;
  tvlUsd: number;
  apyBase: number;
  apyReward: number | null;
  apy: number;
  rewardTokens: string;
  pool: string;
  apyPct1D: number;
  apyPct7D: number;
  apyPct30D: number;
};

export async function getDefiLlamaPools(): Promise<Pool[]> {
  const response = await fetch("https://yields.llama.fi/pools");
  if (!response.ok) {
    throw new Error("Failed to fetch pools data");
  }

  const json = await response.json();

  const pools = json.data.map((pool: Pool) => ({
    chain: pool.chain,
    project: pool.project,
    symbol: pool.symbol,
    tvlUsd: pool.tvlUsd,
    apyBase: pool.apyBase,
    apyReward: pool.apyReward,
    apy: pool.apy,
    rewardTokens: pool.rewardTokens,
    pool: pool.pool,
    apyPct1D: pool.apyPct1D,
    apyPct7D: pool.apyPct7D,
    apyPct30D: pool.apyPct30D,
  }));

  console.log(pools);
  return pools;
}
