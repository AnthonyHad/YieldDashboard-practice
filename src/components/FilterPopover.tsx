import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export function FilterPopover({
  uniqueChains,
  selectedChain,
  setSelectedChain,
  uniqueProjects,
  selectedProject,
  setSelectedProject,
  resetFilters,
}: {
  uniqueChains: string[];
  selectedChain: string;
  setSelectedChain: (c: string) => void;
  uniqueProjects: string[];
  selectedProject: string;
  setSelectedProject: (p: string) => void;
  resetFilters: () => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" aria-label="Filter pools">
          <Filter className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Filter</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-56 space-y-4 rounded-xl
    bg-card
    dark:bg-gray-900/80
    border
    border-gray-300
    dark:border-gray-700
    shadow-xl
    p-5
    min-w-[260px]
    z-30
    backdrop-blur"
      >
        <div>
          <label className="block mb-1 text-sm font-medium">Chain</label>
          <select
            className="w-full rounded px-2 py-1 bg-background border"
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value)}
          >
            <option value="All">All Chains</option>
            {uniqueChains.map((chain) => (
              <option key={chain} value={chain}>
                {chain}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Project</label>
          <select
            className="w-full rounded px-2 py-1 bg-background border"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="All">All Projects</option>
            {uniqueProjects.map((project) => (
              <option key={project} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
      </PopoverContent>
    </Popover>
  );
}
