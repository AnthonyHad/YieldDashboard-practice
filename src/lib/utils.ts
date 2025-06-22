import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Pool } from "@/lib/getDefiLlamaPools";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
  return `$${value.toFixed(2)}`;
}

export function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "2-digit",
  });
}

export function exportToCSV(pools: Pool[]) {
  if (!pools.length) return;

  // Define columns to export (customize as needed)
  const headers = [
    "Symbol",
    "Project",
    "Chain",
    "TVL (USD)",
    "APY",
    "Base APY",
    "Reward APY",
  ];

  // Prepare CSV rows
  const rows = pools.map((pool) => [
    pool.symbol,
    pool.project,
    pool.chain,
    pool.tvlUsd,
    pool.apy,
    pool.apyBase ?? "",
    pool.apyReward ?? "",
  ]);

  // Convert to CSV string
  const csvContent =
    headers.join(",") +
    "\n" +
    rows
      .map((row) =>
        row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

  // Create a blob and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `pools_export_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
