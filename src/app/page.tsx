import { getDefiLlamaPools } from "@/lib/getDefiLlamaPools";

import PoolTable from "@/components/PoolTable";

export default async function HomePage() {
  const pools = await getDefiLlamaPools();

  return (
    <main>
      <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
        <PoolTable pools={pools.slice(0, 50)} />
      </div>
    </main>
  );
}
