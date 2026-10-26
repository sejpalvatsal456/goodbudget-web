import { CreditCard, Landmark, Wallet, type LucideIcon } from "lucide-react";
import type { Account, AccountGroupKey, Activity } from "../types/types";

export interface GroupMeta {
  label: string;
  short: string;
  addLabel: string;
  defaultType: Account['type'];
  types: Account['type'][];
  icon: LucideIcon;
  bubble: string; // icon bubble colors
  row: string; // row background + border
}

export const GROUPS = [
  { key: "cash", label: "Cash", icon: Wallet, types: ["cash"], bubble: "bg-coral/15 text-coral", row: "border-coral/15 bg-coral/5" },
  { key: "bank", label: "Bank", icon: Landmark, types: ["saving", "current"], bubble: "bg-sky-100 text-sky-600", row: "border-black/5 bg-white" },
  { key: "credit", label: "Credit", icon: CreditCard, types: ["credit_card"], bubble: "bg-violet-100 text-violet-600", row: "border-violet-100 bg-violet-50/60" },
];
 
export type Group = (typeof GROUPS)[number];

export const GROUP_ORDER: AccountGroupKey[] = ["cash", "bank", "credit"];

export const TYPE_LABEL: Record<Account['type'], string> = {
  cash: "Cash",
  saving: "Saving",
  current: "Current",
  credit_card: "Credit Card",
};
 
export const TYPE_OPTIONS: { value: Account['type']; label: string }[] = [
  { value: "cash", label: "Cash" },
  { value: "saving", label: "Bank (Saving)" },
  { value: "current", label: "Bank (Current)" },
  { value: "credit_card", label: "Credit Card" },
];
