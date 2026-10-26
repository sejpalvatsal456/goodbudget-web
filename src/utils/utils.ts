import type { Account, AccountGroupKey } from "../types/types";
import { GROUPS } from "../constants/constant";

export const inr = (n: number) => `₹${Math.abs(n).toLocaleString("en-IN")}`;

export const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good Morning," : h < 17 ? "Good Afternoon," : "Good Evening,";
};

export const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const groupOf = (a: Account) => GROUPS.find((g) => g.types.includes(a.type)) ?? GROUPS[0];