import PoolDetail from "@/app/components/poolDetail";

import { getDefiLlamaPoolById } from "@/lib/getDefiLlamaPoolById";
import { getDefiLlamaPoolChart } from "@/lib/getDefiLlamaPoolChart";

export default async function PoolDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const pool = await getDefiLlamaPoolById(params.id);
  const chartData = await getDefiLlamaPoolChart(params.id);

  if (!pool) return <div>Pool not found</div>;

  return <PoolDetail pool={pool} chartData={chartData} />;
}
