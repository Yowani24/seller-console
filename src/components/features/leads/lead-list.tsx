import { useMemo } from "react";
import { Users } from "lucide-react";
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
  const filteredAndSortedLeads = useMemo(() => {
    const filtered = leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase());
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

  return (
    <div className="bg-white rounded-lg shadow">
      <LeadFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="overflow-hidden">
        {filteredAndSortedLeads.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No leads found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto scrollBarStyles">
            <table className="w-full">
              <thead className="bg-purple-100 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Lead
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Source
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Score
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAndSortedLeads?.map((lead) => (
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
        )}
      </div>
    </div>
  );
};

export default LeadList;
