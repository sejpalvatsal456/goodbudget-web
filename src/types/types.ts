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
export const TransactionStatusValues = ['success', 'pending', 'failed'] as const;

export type Transaction = {
  id: string;
  cat_id: string | null;
  cat_name: string | null;
  merchant: string;
  amount: number; // negative = expense, positive = income
  when: string;
  acc_id: string;
  type: typeof TransactionTypeValues[number];
  status: typeof TransactionStatusValues[number]
};

export type ApiTransaction = {
  tran_id: string,
  trans_desc: string,
  tran_status: "pending" | "success" | "failed",
  user_id: string,
  account_id: string,
  tran_merchant: string,
  tran_mode: string,
  tran_type: "income" | "expense",
  tran_date:  string,
  tran_amount: string,
  created_at: string,
  updated_at: string,
  deleted_at: string | null,
  cat_id: string | null,
  cat_name: string | null
};

export type Category = {
  id: string;
  name: string;
  desc: string;
}