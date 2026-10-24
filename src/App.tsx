import { useState } from "react";
import {
  Wallet,
  
  Landmark, Utensils,
  ShoppingCart,
  Briefcase,
  Bus,
  Clapperboard,
  Zap,
  Smartphone} from "lucide-react";
import { useAuth } from "./components/AuthContext";

import { Sidebar, MobileNav } from "./components/SideBar";
import { Header } from "./components/Header";
import { BalanceCard } from "./components/BalanceCard";
import { RecentTransactions } from "./components/RecentTransactions";
import { QuickActions } from "./components/QuickActions";
import { SetBudgetRow } from "./components/SetBudgetRow";
import { YourAccounts } from "./components/YourAccounts";
import { BudgetCta } from "./components/BudgetCta";

/* ------------------------------- Sample data ------------------------------- */
// Replace these with data from your API.

const ACCOUNTS: Account[] = [
  { id: "1", name: "HDFC Bank", type: "Savings Account", balance: 25000, kind: "bank", icon: Landmark, color: "bg-sky-500" },
  { id: "2", name: "Cash", type: "Wallet", balance: 2450, kind: "cash", icon: Wallet, color: "bg-coral" },
  { id: "3", name: "SBI Bank", type: "Current Account", balance: 12000, kind: "bank", icon: Landmark, color: "bg-violet-500" },
  { id: "4", name: "Paytm", type: "UPI Wallet", balance: 3200, kind: "cash", icon: Smartphone, color: "bg-teal-500" },
];

const TRANSACTIONS: Transaction[] = [
  { id: "t1", category: "Food & Dining", merchant: "Zomato", amount: -320, when: "Today, 1:24 PM", status: "Pending", icon: Utensils, tint: "bg-rose-100 text-rose-500" },
  { id: "t2", category: "Shopping", merchant: "Amazon", amount: -1499, when: "Today, 11:05 AM", status: "Pending", icon: ShoppingCart, tint: "bg-sky-100 text-sky-500" },
  { id: "t3", category: "Salary", merchant: "Company", amount: 25000, when: "Yesterday, 10:00 AM", status: "Completed", icon: Briefcase, tint: "bg-green-100 text-green-600" },
  { id: "t4", category: "Transportation", merchant: "Uber", amount: -185, when: "Yesterday, 8:30 PM", status: "Completed", icon: Bus, tint: "bg-violet-100 text-violet-500" },
  { id: "t5", category: "Entertainment", merchant: "Netflix", amount: -649, when: "15 Oct, 7:00 PM", status: "Completed", icon: Clapperboard, tint: "bg-orange-100 text-orange-500" },
  { id: "t6", category: "Utilities", merchant: "Electricity", amount: -1200, when: "14 Oct, 6:15 PM", status: "Completed", icon: Zap, tint: "bg-teal-100 text-teal-500" },
];

/* ----------------------------------- App ---------------------------------- */

export default function App() {
  const { user, isInitializing } = useAuth();

  const [active, setActive] = useState("Home");
  const name = user?.user_name ?? "there";

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Restoring your session...
      </div>
    );
  }

  if (!user) {
    console.log("No user");
  } else {
    console.log(user);
  }

  return (
    <div className="flex min-h-screen bg-[#fffdfd] font-sans text-ink">
      <Sidebar active={active} onChange={setActive} />

      <main className="min-w-0 flex-1 px-4 py-5.5 lg:px-7">
        <Header name={name} />
        <MobileNav active={active} onChange={setActive} />

        <div className="mt-6.5 grid gap-6.5 xl:grid-cols-[minmax(0,1fr)_346px]">
          <div>
            <BalanceCard accounts={ACCOUNTS} />
            <RecentTransactions items={TRANSACTIONS} />
          </div>

          <div>
            <QuickActions />
            <SetBudgetRow />
            <YourAccounts accounts={ACCOUNTS} />
            <BudgetCta />
          </div>
        </div>
      </main>
    </div>
  );
}