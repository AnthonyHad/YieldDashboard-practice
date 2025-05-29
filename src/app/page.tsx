import { getDefiLlamaPools } from "@/lib/getDefiLlamaPools";

import PoolsShell from "@/components/PoolsShell";

export default async function HomePage() {
  const pools = await getDefiLlamaPools();

  return (
    <main>
      <div className="rounded-xl  bg-card text-card-foreground shadow-sm">
        <PoolsShell pools={pools.slice(0, 70)} />
      </div>
    </main>
  );
}
