// src/components/PoolDetail.tsx
import PoolCharts from "./poolCharts";

import Link from "next/link";

import type { Pool } from "@/lib/getDefiLlamaPools";

type PoolDetailProps = {
  pool: Pool;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartData: any[];
};

export default function PoolDetail({ pool, chartData }: PoolDetailProps) {
  return (
    <div className="max-w-3xl mx-auto py-6">
      <Link href="/" className="text-blue-600">
        &larr; Back
      </Link>
      <h1 className="text-2xl font-bold mt-4 mb-2">
        {pool.project} - {pool.symbol}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
        <div>
          <div>
            <b>Chain:</b> {pool.chain}
          </div>
          <div>
            <b>Asset:</b> {pool.symbol}
          </div>
          <div>
            <b>TVL:</b> ${pool.tvlUsd.toLocaleString()}
          </div>
          <div>
            <b>APY:</b> {pool.apy?.toFixed(2) ?? "N/A"}%
          </div>
          {/* <div>
            <b>Underlying:</b> {pool.underlyingTokens?.join(", ") ?? "—"}
          </div> */}
        </div>
        <div className="flex flex-col gap-2">
          <Link
            href={`https://etherscan.io/address/${pool.pool}`}
            target="_blank"
            className="underline text-blue-600"
          >
            View on Etherscan
          </Link>
          {/* {pool.url && (
            <Link
              href={pool.url}
              target="_blank"
              className="underline text-blue-600"
            >
              Visit Protocol
            </Link>
          )} */}
        </div>
      </div>
      <div className="mt-8">
        <PoolCharts chartData={chartData} />
      </div>
    </div>
  );
}
