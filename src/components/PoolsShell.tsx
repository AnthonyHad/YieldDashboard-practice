// components/PoolsShell.tsx
"use client";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import PoolTable from "@/components/PoolTable";
import { Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Pool } from "@/lib/getDefiLlamaPools";

type PoolShellProps = {
  pools: Pool[];
};

export default function PoolsShell({ pools }: PoolShellProps) {
  const [search, setSearch] = useState("");

  const filteredPools = pools.filter(
    (pool) =>
      pool.symbol.toLowerCase().includes(search.toLowerCase()) ||
      pool.project.toLowerCase().includes(search.toLowerCase()) ||
      pool.chain.toLowerCase().includes(search.toLowerCase())
    // Add more fields if you want!
  );

  return (
    <div>
      {/* Toolbar */}
      <div
        className="
       flex flex-col md:flex-row md:items-center justify-between
    gap-3 mb-4 px-0
    rounded-t-lg shadow-sm
    w-full
      "
      >
        {/* Search Left */}
        <div className="flex-1 md:max-w-md">
          <SearchBar onSearch={setSearch} />
        </div>
        {/* Buttons Right */}
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <Button
            variant="outline"
            size="sm"
            className="dark:border-gray-800 dark:hover:bg-gray-800"
            aria-label="Filter Pools"
          >
            <Filter className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="dark:border-gray-800 dark:hover:bg-gray-800"
            aria-label="Export Pools"
          >
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>
      {/* Table */}
      <div className="rounded-b-lg bg-card dark:bg-gray-900/50  shadow-lg overflow-x-auto">
        <PoolTable pools={filteredPools} />
      </div>
    </div>
  );
}
