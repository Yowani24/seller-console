import { Search, Filter, ArrowUpDown } from "lucide-react";

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
  return (
    <div className="p-4 border-b border-gray-200 bg-purple-500 rounded-t-lg">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-gray-500 border border-gray-300 rounded-lg outline-none bg-white"
          />
        </div>

        <div className="relative">
          <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2 text-gray-500 outline-none border border-gray-300 rounded-lg bg-white"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="unqualified">Unqualified</option>
            <option value="converted">Converted</option>
          </select>
        </div>

        <button
          onClick={() => setSortBy(sortBy === "score" ? "name" : "score")}
          className="flex items-center px-3 py-2 text-gray-500 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100"
        >
          <ArrowUpDown className="w-4 h-4 mr-2" />
          Sort by {sortBy === "score" ? "Score" : "Name"}
        </button>
      </div>
    </div>
  );
};

export default LeadFilters;
