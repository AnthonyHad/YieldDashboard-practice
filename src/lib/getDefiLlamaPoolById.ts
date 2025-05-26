import type { Pool } from "./getDefiLlamaPools";

export async function getDefiLlamaPoolById(id: string): Promise<Pool | null> {
  const res = await fetch("https://yields.llama.fi/pools");
  const data = await res.json();
  return data.data.find((p: Pool) => p.pool === id) ?? null;
}
