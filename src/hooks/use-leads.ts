import { useState, useEffect } from "react";
import { api } from "../utils/api";
import { useLocalStorage } from "./use-localStorage";
import type { ILead } from "../types";
import { mockLeads } from "../data/mock-data";

export const useLeads = () => {
  const [leads, setLeads] = useState<ILead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useLocalStorage(
    "sellerConsoleSearchTerm",
    ""
  );
  const [statusFilter, setStatusFilter] = useLocalStorage(
    "sellerConsoleStatusFilter",
    "all"
  );
  const [sortBy, setSortBy] = useLocalStorage<"score" | "name">(
    "sellerConsoleSortBy",
    "score"
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await api(mockLeads);
        setLeads(data);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
        // setError("Failed to load leads. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const updateLead = (id: string, updates: Partial<ILead>) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead))
    );
  };

  return {
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
  };
};
