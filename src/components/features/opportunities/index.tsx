import { Target } from "lucide-react";
import type { IOpportunity } from "../../../types";

interface OpportunityListProps {
  opportunities: IOpportunity[];
}

const OpportunityList = ({ opportunities }: OpportunityListProps) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 bg-purple-500 rounded-t-lg">
        <h2 className="text-lg font-medium text-white">Opportunities</h2>
      </div>
      <div className="p-4">
        {opportunities.length === 0 ? (
          <div className="text-center py-8">
            <Target className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No opportunities yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="p-3 border border-gray-200 rounded-lg"
              >
                <div className="font-medium text-gray-900 text-sm">
                  {opp.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {opp.stage} • {opp.accountName}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunityList;
