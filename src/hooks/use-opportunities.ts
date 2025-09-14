import { useState } from "react";
import type { IOpportunity } from "../types";

export const useOpportunities = () => {
  const [opportunities, setOpportunities] = useState<IOpportunity[]>([]);

  const addOpportunity = (opportunity: IOpportunity) => {
    setOpportunities((prev) => [...prev, opportunity]);
  };

  return { opportunities, addOpportunity, setOpportunities };
};
