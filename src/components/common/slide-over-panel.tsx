import React, { useState, useEffect } from "react";
import {
  X,
  Check,
  Target,
  Loader2,
  Edit3,
  Mail,
  Building2,
  Award,
  TrendingUp,
} from "lucide-react";
import { validateEmail } from "../../utils/validation";
import { getScoreColor, getStatusColor } from "../../utils/formatters";
import type { ILead, IOpportunity } from "../../types";
import { api } from "../../utils/api";

interface SlideOverPanelProps {
  lead: ILead;
  onClose: () => void;
  onUpdateLead: (id: string, updates: Partial<ILead>) => void;
  onConvertLead: (opportunity: IOpportunity) => void;
  setLeads: React.Dispatch<React.SetStateAction<ILead[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const SlideOverPanel = ({
  lead,
  onClose,
  onUpdateLead,
  onConvertLead,
  setLeads,
  setError,
}: SlideOverPanelProps) => {
  const [editingLead, setEditingLead] = useState<ILead | null>(null);
  const [editForm, setEditForm] = useState<{
    status: ILead["status"];
    email: string;
  }>({
    status: lead.status,
    email: lead.email,
  });
  const [emailError, setEmailError] = useState("");
  const [saving, setSaving] = useState(false);
  const [converting, setConverting] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleEditLead = (lead: ILead) => {
    setEditingLead(lead);
    setEditForm({ status: lead.status, email: lead.email });
    setEmailError("");
  };

  const handleSaveLead = async () => {
    if (!editingLead) return;

    if (!validateEmail(editForm.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    try {
      setSaving(true);

      const updatedLead = { ...editingLead, ...editForm };
      onUpdateLead(editingLead.id, editForm);
      setEditingLead(null);

      await api(updatedLead, 500);
    } catch (err) {
      setLeads((prev) =>
        prev.map((lead) => (lead.id === editingLead.id ? editingLead : lead))
      );
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingLead(null);
    setEmailError("");
  };

  const handleConvertLead = async (lead: ILead) => {
    try {
      setConverting(true);

      const newOpportunity: IOpportunity = {
        id: `opp-${Date.now()}`,
        name: `${lead.company} - ${lead.name}`,
        stage: "Prospecting",
        accountName: lead.company,
        createdAt: new Date(),
      };

      onConvertLead(newOpportunity);
      onUpdateLead(lead.id, { status: "converted" });
      onClose();
      await api(newOpportunity, 800);
    } catch (err) {
      setLeads((prev) => prev.map((l) => (l.id === lead.id ? lead : l)));
      setError((err as Error).message);
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-4 sm:pl-6 lg:pl-8">
        <div className="w-screen max-w-sm sm:max-w-md lg:max-w-lg">
          <div className="flex h-full flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {lead.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Lead Details
                  </h2>
                  <p className="text-sm text-gray-600">
                    Manage lead information
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/80 rounded-lg transition-colors duration-200 group"
                aria-label="Close panel"
              >
                <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold text-gray-900 truncate">
                        {lead.name}
                      </h3>
                      <div className="flex items-center mt-2 text-gray-600">
                        <Building2 className="w-4 h-4 mr-2 flex-shrink-0" />
                        <p className="text-sm truncate">{lead.company}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Award className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Lead Score
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          Quality rating
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(
                          lead.score
                        )}`}
                      >
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {lead.score}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-md transition-shadow duration-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lead Source
                  </label>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <p className="text-sm font-medium text-gray-900">
                      {lead.source}
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-md transition-shadow duration-200">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Status
                  </label>
                  {editingLead?.id === lead.id ? (
                    <select
                      value={editForm.status}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          status: e.target.value as ILead["status"],
                        }))
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="unqualified">Unqualified</option>
                      <option value="converted">Converted</option>
                    </select>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium capitalize ${getStatusColor(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                      {lead.status !== "converted" && (
                        <button
                          onClick={() => handleEditLead(lead)}
                          className="inline-flex items-center px-3 py-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                          <Edit3 className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center mb-3">
                    <Mail className="w-4 h-4 text-gray-500 mr-2" />
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                  </div>
                  {editingLead?.id === lead.id ? (
                    <div>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm ${
                          emailError
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter email address"
                      />
                      {emailError && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                          {emailError}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-900 font-medium break-all">
                        {lead.email}
                      </p>
                      {lead.status !== "converted" && (
                        <button
                          onClick={() => handleEditLead(lead)}
                          className="ml-3 inline-flex items-center px-3 py-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors duration-200 flex-shrink-0"
                        >
                          <Edit3 className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 bg-gray-50 px-4 py-4 sm:px-6">
              {editingLead?.id === lead.id ? (
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={handleSaveLead}
                    disabled={saving}
                    className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Check className="w-4 h-4 mr-2" />
                    )}
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={saving}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium text-sm"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() =>
                    lead.status !== "converted" && handleConvertLead(lead)
                  }
                  disabled={converting || lead.status === "converted"}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm shadow-lg hover:shadow-xl"
                >
                  {converting ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Target className="w-4 h-4 mr-2" />
                  )}
                  {lead.status === "converted"
                    ? "Already Converted"
                    : "Convert to Opportunity"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideOverPanel;
