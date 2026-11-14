import type { Account, ApiTransaction, Transaction } from "../types/types";
import { GROUPS } from "../constants/constant";

export const inr = (n: number) => `₹${Math.abs(n).toLocaleString("en-IN")}`;

export const greeting = () => {
  const h = new Date().getHours();
  return h < 12
    ? "Good Morning,"
    : h < 17
      ? "Good Afternoon,"
      : "Good Evening,";
};

export const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const groupOf = (a: Account) =>
  GROUPS.find((g) => g.types.includes(a.type.toLowerCase())) ?? GROUPS[0];

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const mapTransaction = (tran: ApiTransaction): Transaction => {
  return {
    id: tran.tran_id,
    cat_id: tran.cat_id,
    cat_name: tran.cat_name,
    merchant: tran.tran_merchant,
    amount: Number(tran.tran_amount), // negative = expense, positive = income
    acc_id: tran.account_id,
    when: new Date(tran.created_at).toDateString(),
    status: tran.tran_status,
    type: tran.tran_type,
  };
};
