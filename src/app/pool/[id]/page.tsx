import PoolDetail from "@/components/PoolDetail";

import { getDefiLlamaPoolById } from "@/lib/getDefiLlamaPoolById";
import { getDefiLlamaPoolChart } from "@/lib/getDefiLlamaPoolChart";

export default async function PoolDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const pool = await getDefiLlamaPoolById(params.id);
  const apiData = await getDefiLlamaPoolChart(params.id);

  const chartData = apiData.map((point) => ({
    date: point.timestamp,
    tvl: point.tvlUsd,
    apy: point.apy,
  }));

  if (!pool) return <div>Pool not found</div>;

  return <PoolDetail pool={pool} chartData={chartData} />;
}
