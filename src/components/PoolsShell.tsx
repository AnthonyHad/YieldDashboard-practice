// components/PoolsShell.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import SearchBar from "@/components/SearchBar";
import PoolTable from "@/components/PoolTable";
import { Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { Pool } from "@/lib/getDefiLlamaPools";

type PoolShellProps = { pools: Pool[] };

export default function PoolsShell({ pools }: PoolShellProps) {
  const [search, setSearch] = useState("");
  // how many items are we currently showing?
  const [limit, setLimit] = useState(10);
  const loader = useRef<HTMLDivElement>(null);

  // 1) Filter first, then slice
  const filtered = pools.filter((p) =>
    [p.symbol, p.project, p.chain].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );
  const visiblePools = filtered.slice(0, limit);

  // 2) Whenever we change search, reset limit
  useEffect(() => {
    setLimit(10);
  }, [search]);

  // 3) When the "loader" div enters viewport, bump the limit
  const onIntersect: IntersectionObserverCallback = useCallback(
    (entries) => {
      if (entries[0].isIntersecting && limit < filtered.length) {
        setLimit((l) => Math.min(filtered.length, l + 10));
      }
    },
    [limit, filtered.length]
  );

  useEffect(() => {
    const obs = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: "200px", // start loading a bit before the bottom
      threshold: 0,
    });
    if (loader.current) obs.observe(loader.current);
    return () => obs.disconnect();
  }, [onIntersect]);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div className="flex-1 md:max-w-md">
          <SearchBar onSearch={setSearch} />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg bg-card dark:bg-gray-900/50 shadow overflow-x-auto">
        <PoolTable pools={visiblePools} />
      </div>

      {/* sentinel div – we watch this to know when to load more */}
      <div ref={loader} />

      {/* optional “no more” message */}
      {limit >= filtered.length && (
        <p className="text-center py-4 text-sm text-muted-foreground">
          You’ve reached the end!
        </p>
      )}
    </div>
  );
}
