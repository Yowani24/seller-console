import { Building2, ExternalLink, Mail, Calendar } from "lucide-react";
import type { ILead } from "../../../types";

interface LeadListItemProps {
  lead: ILead;
  isSelected: boolean;
  onClick: () => void;
  getScoreColor: (score: number) => string;
  getStatusColor: (status: string) => string;
}

const getScoreIcon = (score: number) => {
  if (score >= 80) return "🔥";
  if (score >= 60) return "⭐";
  if (score >= 40) return "📈";
  return "📊";
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getAvatarColor = (name: string) => {
  const colors = [
    "bg-gradient-to-br from-blue-500 to-blue-600",
    "bg-gradient-to-br from-purple-500 to-purple-600",
    "bg-gradient-to-br from-green-500 to-green-600",
    "bg-gradient-to-br from-orange-500 to-orange-600",
    "bg-gradient-to-br from-pink-500 to-pink-600",
    "bg-gradient-to-br from-indigo-500 to-indigo-600",
  ];
  const index = name.length % colors.length;
  return colors[index];
};

const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
};

const LeadListItem = ({
  lead,
  isSelected,
  onClick,
  getScoreColor,
  getStatusColor,
}: LeadListItemProps) => {
  return (
    <>
      <tr
        onClick={onClick}
        className={`hidden md:table-row cursor-pointer group transition-all duration-200 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/30 ${
          isSelected
            ? "bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-500"
            : "hover:shadow-sm"
        }`}
      >
        <td className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md ${getAvatarColor(
                  lead.name
                )}`}
              >
                {getInitials(lead.name)}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <p className="text-base font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200 truncate">
                  {lead.name}
                </p>
                <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <Building2 className="w-4 h-4 mr-1.5 text-gray-400" />
                <span className="truncate">{lead.company}</span>
              </div>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <Mail className="w-3 h-3 mr-1" />
                <span className="truncate">{lead.email}</span>
              </div>
            </div>
          </div>
        </td>

        <td className="px-6 py-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-900">
              {lead.source}
            </span>
          </div>
        </td>

        <td className="px-6 py-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getScoreIcon(lead.score)}</span>
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm ${getScoreColor(
                lead.score
              )}`}
            >
              {lead.score}
            </span>
          </div>
        </td>

        <td className="px-6 py-4">
          <span
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium capitalize shadow-sm ${getStatusColor(
              lead.status
            )}`}
          >
            {lead.status}
          </span>
        </td>

        <td className="px-6 py-4 text-right">
          <div className="flex items-center justify-end text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(new Date())}</span>
          </div>
        </td>
      </tr>

      <div
        onClick={onClick}
        className={`md:hidden mb-4 bg-white rounded-xl border transition-all duration-200 cursor-pointer group hover:shadow-lg hover:border-purple-200 ${
          isSelected
            ? "border-purple-300 shadow-md bg-gradient-to-r from-blue-50/50 to-purple-50/50"
            : "border-gray-200 hover:shadow-md"
        }`}
      >
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md flex-shrink-0 ${getAvatarColor(
                  lead.name
                )}`}
              >
                {getInitials(lead.name)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200 truncate">
                    {lead.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <Building2 className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{lead.company}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1 flex-shrink-0 ml-3">
              <span className="text-lg">{getScoreIcon(lead.score)}</span>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${getScoreColor(
                  lead.score
                )}`}
              >
                {lead.score}
              </span>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <Mail className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
              <span className="truncate">{lead.email}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs font-medium text-gray-600">
                  {lead.source}
                </span>
              </div>

              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                <span>{formatDate(new Date())}</span>
              </div>
            </div>

            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize shadow-sm ${getStatusColor(
                lead.status
              )}`}
            >
              {lead.status}
            </span>
          </div>
        </div>

        {isSelected && (
          <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-xl"></div>
        )}
      </div>
    </>
  );
};

export default LeadListItem;
