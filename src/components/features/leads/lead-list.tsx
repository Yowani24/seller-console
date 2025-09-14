import { useMemo, useState } from "react";
import { Users, Search, Zap, TrendingUp } from "lucide-react";
import type { ILead } from "../../../types";
import LeadFilters from "./lead-filters";
import { getScoreColor, getStatusColor } from "../../../utils/formatters";
import LeadListItem from "./lead-list-item";

interface LeadListProps {
  leads: ILead[];
  onLeadClick: (lead: ILead) => void;
  selectedLead: ILead | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  sortBy: "score" | "name";
  setSortBy: (sort: "score" | "name") => void;
}

const LeadList = ({
  leads,
  onLeadClick,
  selectedLead,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
}: LeadListProps) => {
  const [showStats] = useState(true);

  const filteredAndSortedLeads = useMemo(() => {
    const filtered = leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "score") {
        return b.score - a.score;
      } else {
        return a.name.localeCompare(b.name);
      }
    });
  }, [leads, searchTerm, statusFilter, sortBy]);

  const getLeadStats = useMemo(() => {
    const total = filteredAndSortedLeads.length;
    const highScore = filteredAndSortedLeads.filter(
      (lead) => lead.score >= 80
    ).length;
    const avgScore =
      total > 0
        ? Math.round(
            filteredAndSortedLeads.reduce((sum, lead) => sum + lead.score, 0) /
              total
          )
        : 0;
    const converted = filteredAndSortedLeads.filter(
      (lead) => lead.status === "converted"
    ).length;

    return { total, highScore, avgScore, converted };
  }, [filteredAndSortedLeads]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <LeadFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {filteredAndSortedLeads.length > 0 && showStats && (
        <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 border-b border-gray-200 px-4 py-3 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="grid grid-cols-2 sm:flex sm:items-center sm:space-x-6 gap-4 sm:gap-0">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">
                  {getLeadStats.total} Total
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-gray-700">
                  {getLeadStats.highScore} High Score
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">
                  Avg: {getLeadStats.avgScore}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">
                  {getLeadStats.converted} Converted
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative">
        {filteredAndSortedLeads.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
              {searchTerm || statusFilter !== "all" ? (
                <Search className="w-10 h-10 text-gray-400" />
              ) : (
                <Users className="w-10 h-10 text-gray-400" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {searchTerm || statusFilter !== "all"
                ? "No matching leads"
                : "No leads yet"}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search terms or filters to find what you're looking for."
                : "Start adding leads to build your pipeline and track potential opportunities."}
            </p>
            {(searchTerm || statusFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="mt-6 inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <div className="max-h-[600px] overflow-y-auto scrollBarStyles">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-100 to-indigo-100 sticky top-0 z-10 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>Lead Information</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Source
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4" />
                          <span>Score</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {filteredAndSortedLeads.map((lead) => (
                      <LeadListItem
                        key={lead.id}
                        lead={lead}
                        isSelected={selectedLead?.id === lead.id}
                        onClick={() => onLeadClick(lead)}
                        getScoreColor={getScoreColor}
                        getStatusColor={getStatusColor}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="md:hidden p-4 space-y-1 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {filteredAndSortedLeads.map((lead) => (
                <LeadListItem
                  key={lead.id}
                  lead={lead}
                  isSelected={selectedLead?.id === lead.id}
                  onClick={() => onLeadClick(lead)}
                  getScoreColor={getScoreColor}
                  getStatusColor={getStatusColor}
                />
              ))}
            </div>
          </>
        )}

        {filteredAndSortedLeads.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
        )}
      </div>

      {filteredAndSortedLeads.length > 0 && (
        <div className="bg-gray-50 px-4 py-3 sm:px-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold">
                {filteredAndSortedLeads.length}
              </span>{" "}
              of <span className="font-semibold">{leads.length}</span> leads
            </p>
            <div className="text-xs text-gray-500">
              Sorted by{" "}
              {sortBy === "score" ? "Score (High to Low)" : "Name (A-Z)"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadList;
