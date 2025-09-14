import { Search, Filter, X, Users, SortAsc, SortDesc } from "lucide-react";
import { useState } from "react";

interface LeadFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  sortBy: "score" | "name";
  setSortBy: (sort: "score" | "name") => void;
}

const LeadFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
}: LeadFiltersProps) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSortToggle = () => {
    if (sortBy === "score") {
      setSortBy("name");
      setSortOrder("asc");
    } else {
      setSortBy("score");
      setSortOrder("desc");
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const getStatusCount = (status: string) => {
    const counts: Record<string, number> = {
      all: 12,
      new: 5,
      contacted: 3,
      qualified: 2,
      unqualified: 1,
      converted: 1,
    };
    return counts[status] || 0;
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 rounded-t-xl overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Lead Management
              </h2>
              <p className="text-sm text-purple-100">
                Search, filter, and sort your leads
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-6 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-5">
            <label className="block text-sm font-medium text-purple-100 mb-2">
              Search Leads
            </label>
            <div className="relative group">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search by name, company, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 text-gray-700 border border-gray-200 rounded-xl bg-white/95 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 placeholder:text-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-4">
            <label className="block text-sm font-medium text-purple-100 mb-2">
              Filter by Status
            </label>
            <div className="relative group">
              <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-10 py-3 text-gray-700 border border-gray-200 rounded-xl bg-white/95 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="all">
                  All Status ({getStatusCount("all")})
                </option>
                <option value="new">New ({getStatusCount("new")})</option>
                <option value="contacted">
                  Contacted ({getStatusCount("contacted")})
                </option>
                <option value="qualified">
                  Qualified ({getStatusCount("qualified")})
                </option>
                <option value="unqualified">
                  Unqualified ({getStatusCount("unqualified")})
                </option>
                <option value="converted">
                  Converted ({getStatusCount("converted")})
                </option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <label className="block text-sm font-medium text-purple-100 mb-2">
              Sort Options
            </label>
            <button
              onClick={handleSortToggle}
              className="w-full flex items-center justify-center px-4 py-3 text-gray-700 border border-gray-200 rounded-xl bg-white/95 backdrop-blur-sm hover:bg-white hover:shadow-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 group"
            >
              {sortOrder === "desc" ? (
                <SortDesc className="w-4 h-4 mr-2 text-gray-500 group-hover:text-purple-600" />
              ) : (
                <SortAsc className="w-4 h-4 mr-2 text-gray-500 group-hover:text-purple-600" />
              )}
              <span className="font-medium">
                {sortBy === "score" ? "Score" : "Name"}
              </span>
              <span className="ml-1 text-sm text-gray-500">
                ({sortOrder === "desc" ? "High-Low" : "A-Z"})
              </span>
            </button>
          </div>
        </div>

        {(searchTerm || statusFilter !== "all") && (
          <div className="mt-4 pt-4 border-t border-purple-400/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-purple-100">
                  Active Filters:
                </span>
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                      Search: "{searchTerm}"
                      <button
                        onClick={clearSearch}
                        className="ml-2 hover:bg-white/20 rounded-full p-0.5 transition-colors duration-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  {statusFilter !== "all" && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                      Status: {statusFilter}
                      <button
                        onClick={() => setStatusFilter("all")}
                        className="ml-2 hover:bg-white/20 rounded-full p-0.5 transition-colors duration-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="text-xs text-purple-200 hover:text-white font-medium underline decoration-dotted underline-offset-2 transition-colors duration-200"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadFilters;
