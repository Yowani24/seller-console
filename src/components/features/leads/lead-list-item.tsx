import { User } from "lucide-react";
import type { ILead } from "../../../types";

interface LeadListItemProps {
  lead: ILead;
  isSelected: boolean;
  onClick: () => void;
  getScoreColor: (score: number) => string;
  getStatusColor: (status: string) => string;
}

const LeadListItem = ({
  lead,
  isSelected,
  onClick,
  getScoreColor,
  getStatusColor,
}: LeadListItemProps) => {
  return (
    <tr
      onClick={onClick}
      className={`cursor-pointer hover:bg-gray-50 group ${
        isSelected ? "bg-blue-50" : ""
      }`}
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center min-w-9 min-h-9 bg-gray-200 rounded-full">
            <User className="text-gray-500" size={20} />
          </div>
          <div>
            <div className="font-medium text-gray-900 group-hover:text-purple-500">
              {lead.name}
            </div>
            <div className="text-sm text-gray-500">{lead.company}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{lead.source}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(
            lead.score
          )}`}
        >
          {lead.score}
        </span>
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
            lead.status
          )}`}
        >
          {lead.status}
        </span>
      </td>
    </tr>
  );
};

export default LeadListItem;
