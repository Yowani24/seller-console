import {
  Target,
  TrendingUp,
  Building2,
  Calendar,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import type { IOpportunity } from "../../../types";
import type { JSX } from "react";

interface OpportunityListProps {
  opportunities: IOpportunity[];
}

const getStageColor = (stage: string) => {
  const stageColors: Record<string, string> = {
    Prospecting: "bg-blue-100 text-blue-800 border-blue-200",
    Qualification: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Proposal: "bg-orange-100 text-orange-800 border-orange-200",
    Negotiation: "bg-purple-100 text-purple-800 border-purple-200",
    "Closed Won": "bg-green-100 text-green-800 border-green-200",
    "Closed Lost": "bg-red-100 text-red-800 border-red-200",
  };
  return stageColors[stage] || "bg-gray-100 text-gray-800 border-gray-200";
};

const getStageIcon = (stage: string) => {
  const stageIcons: Record<string, JSX.Element> = {
    Prospecting: <Target className="w-3 h-3" />,
    Qualification: <BarChart3 className="w-3 h-3" />,
    Proposal: <TrendingUp className="w-3 h-3" />,
    Negotiation: <ChevronRight className="w-3 h-3" />,
    "Closed Won": <TrendingUp className="w-3 h-3" />,
    "Closed Lost": <Target className="w-3 h-3" />,
  };
  return stageIcons[stage] || <Target className="w-3 h-3" />;
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const OpportunityList = ({ opportunities }: OpportunityListProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Opportunities
              </h2>
              <p className="text-sm text-purple-100">
                {opportunities.length}{" "}
                {opportunities.length === 1 ? "opportunity" : "opportunities"}
              </p>
            </div>
          </div>
          {opportunities.length > 0 && (
            <div className="hidden sm:flex items-center space-x-2 text-purple-100">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Pipeline</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {opportunities.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No opportunities yet
            </h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              Convert qualified leads into opportunities to start tracking your
              sales pipeline.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:gap-4">
            {opportunities.map((opp, index) => (
              <div
                key={opp.id}
                className="group relative bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-md hover:border-purple-200 transition-all duration-200 cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-200 truncate">
                      {opp.name}
                    </h3>
                    <div className="flex items-center mt-1 text-gray-600">
                      <Building2 className="w-4 h-4 mr-1.5 flex-shrink-0" />
                      <span className="text-sm font-medium truncate">
                        {opp.accountName}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStageColor(
                        opp.stage
                      )}`}
                    >
                      {getStageIcon(opp.stage)}
                      <span className="ml-1.5">{opp.stage}</span>
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1.5 flex-shrink-0" />
                    <span className="font-medium">
                      Created {formatDate(opp.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunityList;
