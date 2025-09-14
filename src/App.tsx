import { useState } from "react";
import { useLeads } from "./hooks/use-leads";
import { useOpportunities } from "./hooks/use-opportunities";
import type { ILead } from "./types";
import LoadingSpinner from "./components/common/loading-spinner";
import ErrorScreen from "./components/common/error-screen";
import Header from "./components/common/header";
import LeadList from "./components/features/leads/lead-list";
import OpportunityList from "./components/features/opportunities";
import SlideOverPanel from "./components/common/slide-over-panel";
import ErrorToast from "./components/common/error-toast";

function App() {
  const {
    leads,
    loading,
    error,
    updateLead,
    setLeads,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
  } = useLeads();

  const { opportunities, addOpportunity } = useOpportunities();
  const [selectedLead, setSelectedLead] = useState<ILead | null>(null);
  const [appError, setAppError] = useState<string | null>(null);

  const handleLeadClick = (lead: ILead) => {
    setSelectedLead(lead);
  };

  const handleCloseSlideOver = () => {
    setSelectedLead(null);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error && leads.length === 0) {
    return <ErrorScreen error={error} onRetry={handleRetry} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        leadCount={leads.length}
        opportunityCount={opportunities.length}
      />

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <LeadList
              leads={leads}
              onLeadClick={handleLeadClick}
              selectedLead={selectedLead}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>

          <div>
            <OpportunityList opportunities={opportunities} />
          </div>
        </div>
      </div>

      {selectedLead && (
        <SlideOverPanel
          lead={selectedLead}
          onClose={handleCloseSlideOver}
          onUpdateLead={updateLead}
          onConvertLead={addOpportunity}
          setLeads={setLeads}
          setError={setAppError}
        />
      )}

      {appError && (
        <ErrorToast error={appError} onClose={() => setAppError(null)} />
      )}
    </div>
  );
}

export default App;
