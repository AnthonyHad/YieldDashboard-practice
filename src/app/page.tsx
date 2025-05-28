import { getDefiLlamaPools } from "@/lib/getDefiLlamaPools";

import PoolTable from "../components/poolTable";

export default async function HomePage() {
  const pools = await getDefiLlamaPools();

  return (
    <main>
      <h1>DeFi Yield Dashboard</h1>
      <PoolTable pools={pools.slice(0, 50)} />
    </main>
  );
}
