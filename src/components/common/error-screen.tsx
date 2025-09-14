import { AlertCircle } from "lucide-react";

interface ErrorScreenProps {
  error: string;
  onRetry?: () => void;
}

const ErrorScreen = ({ error, onRetry }: ErrorScreenProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Error Loading Data
        </h2>
        <p className="text-gray-600 mb-4">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorScreen;
