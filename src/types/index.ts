export interface ILead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: "new" | "contacted" | "qualified" | "unqualified" | "converted";
}

export interface IOpportunity {
  id: string;
  name: string;
  stage: string;
  amount?: number;
  accountName: string;
  createdAt: Date;
}
