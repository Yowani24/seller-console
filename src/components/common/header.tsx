import { Target, Users } from "lucide-react";

interface HeaderProps {
  leadCount: number;
  opportunityCount: number;
}

const Header = ({ leadCount, opportunityCount }: HeaderProps) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden md:flex items-center justify-between h-16">
          <div className="flex items-center">
            <Target className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-xl font-semibold text-gray-900">
              Seller Console
            </h1>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span className="hidden lg:inline">Leads: </span>
              {leadCount}
            </div>
            <div className="flex items-center">
              <Target className="w-4 h-4 mr-1" />
              <span className="hidden lg:inline">Opportunities: </span>
              {opportunityCount}
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="flex items-center justify-center h-14 border-b border-gray-100">
            <Target className="w-6 h-6 text-blue-600 mr-2" />
            <h1 className="text-lg font-semibold text-gray-900">
              Seller Console
            </h1>
          </div>

          <div className="flex items-center justify-around h-12 text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span className="font-medium">{leadCount}</span>
              <span className="ml-1 text-xs">Leads</span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="flex items-center">
              <Target className="w-4 h-4 mr-1" />
              <span className="font-medium">{opportunityCount}</span>
              <span className="ml-1 text-xs">Opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
