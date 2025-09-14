import { AlertCircle, X } from "lucide-react";

interface ErrorToastProps {
  error: string;
  onClose: () => void;
}

const ErrorToast = ({ error, onClose }: ErrorToastProps) => {
  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
      <AlertCircle className="w-4 h-4 mr-2" />
      {error}
      <button onClick={onClose} className="ml-2 p-1 hover:bg-red-600 rounded">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ErrorToast;
