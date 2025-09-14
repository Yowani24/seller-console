import { Target, Users } from "lucide-react";

interface HeaderProps {
  leadCount: number;
  opportunityCount: number;
}

const Header = ({ leadCount, opportunityCount }: HeaderProps) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Target className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-xl font-semibold text-gray-900">
              Seller Console
            </h1>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {leadCount} Leads
            </div>
            <div className="flex items-center">
              <Target className="w-4 h-4 mr-1" />
              {opportunityCount} Opportunities
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
