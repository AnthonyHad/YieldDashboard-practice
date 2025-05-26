// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getDefiLlamaPoolChart(id: string): Promise<any[]> {
  const res = await fetch(`https://yields.llama.fi/chart/${id}`);
  const data = await res.json();
  return data.data; // Array of historical TVL, APY, etc.
}
