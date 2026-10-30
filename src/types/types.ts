import type { LucideIcon } from "lucide-react";

export type User = {
  user_name: string,
  user_id: string,
  user_email: string,
  user_username: string,
}

export type Account = {
  id: string;
  name: string;
  type: string;
  balance: number;
  kind: "bank" | "cash";
  icon?: LucideIcon;
  color?: string;
  isDisabled: boolean;
};

export interface Activity {
  id: string;
  title: string;
  amount: number; // positive = money in, negative = money out
  date: string;
}

export type AccountGroupKey = "cash" | "bank" | "credit";
export type StatusFilter = "all" | "active" | "disabled";
export type TypeFilter = "all" | AccountGroupKey;
export type SortKey = "balance" | "name";

export const TransactionTypeValues = ['income', 'expense'] as const;
export const TransactionStatusValues = ['completed', 'pending', 'failed'] as const;

export type Transaction = {
  id: string;
  category: string | null;
  merchant: string;
  amount: number; // negative = expense, positive = income
  when: string;
  type: typeof TransactionTypeValues[number];
  status: typeof TransactionStatusValues[number]
};