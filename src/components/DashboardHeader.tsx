import { Search, Filter, Download, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardHeader() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 to-purple-600">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              DeFi Yield Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground">
            Discover and analyze the best yield opportunities across DeFi
            protocols
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
            Live Data
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pools, projects, or tokens..."
            className="pl-10 bg-background border-border dark:bg-gray-900/50 dark:border-gray-800"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="dark:border-gray-800 dark:hover:bg-gray-800"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="dark:border-gray-800 dark:hover:bg-gray-800"
        >
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
}
