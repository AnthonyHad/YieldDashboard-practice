// components/SearchBar.tsx
"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  onSearch: (q: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    onSearch(e.target.value);
  }

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        value={value}
        onChange={handleChange}
        placeholder="Search pools, projects, or tokens…"
        className="pl-10 bg-background border-border dark:bg-gray-900/50 dark:border-gray-800"
        aria-label="Search"
      />
    </div>
  );
}

// Having state here is only important for debouncing purposes otherwise we can let the parent manage the state.
