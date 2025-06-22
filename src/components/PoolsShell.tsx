// components/PoolsShell.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import SearchBar from "@/components/SearchBar";
import PoolTable from "@/components/PoolTable";
import { FilterPopover } from "@/components/FilterPopover";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

import { exportToCSV } from "@/lib/utils";

import type { Pool } from "@/lib/getDefiLlamaPools";

type PoolShellProps = { pools: Pool[] };

export default function PoolsShell({ pools }: PoolShellProps) {
  const [search, setSearch] = useState("");
  const [selectedChain, setSelectedChain] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<string>("All");

  // how many items are we currently showing?
  const [limit, setLimit] = useState(10);
  const loader = useRef<HTMLDivElement>(null);

  const uniqueChains = Array.from(
    new Set(pools.map((pool) => pool.chain))
  ).sort();
  const uniqueProjects = Array.from(
    new Set(pools.map((pool) => pool.project))
  ).sort();

  function resetFilters() {
    setSelectedChain("All");
    setSelectedProject("All");
  }

  // 1) Filter first, then slice
  const filtered = pools.filter((p) => {
    const matchesSearch = [p.symbol, p.project, p.chain].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    );

    const matchesChain = selectedChain === "All" || p.chain === selectedChain;
    const matchesProject =
      selectedProject === "All" || p.project === selectedProject;

    return matchesSearch && matchesChain && matchesProject;
  });
  const visiblePools = filtered.slice(0, limit);

  // 2) Whenever we change search, reset limit
  useEffect(() => {
    setLimit(20);
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
          <FilterPopover
            uniqueChains={uniqueChains}
            selectedChain={selectedChain}
            setSelectedChain={setSelectedChain}
            uniqueProjects={uniqueProjects}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            resetFilters={resetFilters}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportToCSV(filtered)}
          >
            <Download className="mr-2 h-4 w-4 " />
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
