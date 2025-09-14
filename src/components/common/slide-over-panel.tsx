import React, { useState } from "react";
import { X, Check, Target, Loader2, Edit3Icon } from "lucide-react";
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
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium text-gray-900">Lead Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{lead.name}</h3>
                <p className="text-sm text-gray-600">{lead.company}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Score
                </label>
                <span
                  className={`inline-flex px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(
                    lead.score
                  )}`}
                >
                  {lead.score}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Source
                </label>
                <p className="text-sm text-gray-900">{lead.source}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                      className={`inline-flex px-2 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                    {lead.status !== "converted" && (
                      <button
                        onClick={() => handleEditLead(lead)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        <Edit3Icon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
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
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        emailError ? "border-red-300" : "border-gray-300"
                      }`}
                    />
                    {emailError && (
                      <p className="mt-1 text-xs text-red-600">{emailError}</p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-900">{lead.email}</p>
                    {lead.status !== "converted" && (
                      <button
                        onClick={() => handleEditLead(lead)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        <Edit3Icon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t p-4">
            {editingLead?.id === lead.id ? (
              <div className="flex space-x-3">
                <button
                  onClick={handleSaveLead}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Check className="w-4 h-4 mr-2" />
                  )}
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={saving}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
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
                className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
};

export default SlideOverPanel;
