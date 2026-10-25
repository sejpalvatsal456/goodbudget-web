import { useEffect, useState } from "react";
import { useAuth } from "./components/AuthContext";

import { Sidebar, MobileNav } from "./components/SideBar";
import { Header } from "./components/Header";
import { BalanceCard } from "./components/BalanceCard";
import { RecentTransactions } from "./components/RecentTransactions";
import { QuickActions } from "./components/QuickActions";
import { SetBudgetRow } from "./components/SetBudgetRow";
import { YourAccounts } from "./components/YourAccounts";
import { BudgetCta } from "./components/BudgetCta";
import { useAccount } from "./hooks/useAccounts";
import { useTransactions } from "./hooks/useTransactions";

/* ------------------------------- Sample data ------------------------------- */
// Replace these with data from your API.

export default function App() {
  const { user, isInitializing, apiFetch } = useAuth();
  const { loadingAccounts, accounts } = useAccount();
  const { loadingTransactions, tranactions } = useTransactions();

  if(!loadingTransactions) {
    console.log(tranactions);
  }

  const [active, setActive] = useState("Home");
  const name = user?.user_name ?? "there";

  useEffect(() => {
    if (isInitializing) return;
    if (!user) return;
    const getBalance = async () => {
      try {
        const res = await apiFetch("/accounts");
        const data = await res.json();
        if (!res.ok) {
          console.log(data.msg);
          return;
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    void getBalance();
  }, [user, apiFetch, isInitializing]);

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Restoring your session...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#fffdfd] font-sans text-ink">
      <Sidebar active={active} onChange={setActive} />

      <main className="min-w-0 flex-1 px-4 py-5.5 lg:px-7">
        <Header name={name} />
        <MobileNav active={active} onChange={setActive} />

        <div className="mt-6.5 grid gap-6.5 xl:grid-cols-[minmax(0,1fr)_346px]">
          <div>
            <BalanceCard accounts={loadingAccounts ? [] : accounts} />
            <RecentTransactions items={loadingTransactions ? [] : tranactions} />
          </div>

          <div>
            <QuickActions />
            <SetBudgetRow />
            <YourAccounts accounts={loadingAccounts ? [] : accounts} />
            <BudgetCta />
          </div>
        </div>
      </main>
    </div>
  );
}
