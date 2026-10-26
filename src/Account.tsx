import { useState } from "react";
import { AccountGroup } from "./components/AccountGroup";
import { AccountsHeader } from "./components/AccountsHeader";
import { AccountSidebar } from "./components/AccountSideBar";
import { BalanceCard } from "./components/BalanceCard";
import { GROUPS } from "./constants/constant";
import type { Account, Activity } from "./types/types";
import { groupOf } from "./utils/utils";
import { AccountFilters, defaultFilters } from "./components/AccountFilter";
import { AccountDrawer } from "./components/AccountDrawer";
import { Sidebar } from "./components/SideBar";

export const MOCK_ACCOUNTS: Account[] = [
  {
    id: "1",
    name: "Wallet",
    type: "cash",
    kind: "cash",
    balance: 2340,
    isDisabled: false,
  },
  {
    id: "2",
    name: "HDFC Bank",
    type: "saving",
    kind: "bank",
    balance: 5780,
    isDisabled: false,
  },
  {
    id: "3",
    name: "SBI Current Account",
    type: "current",
    kind: "bank",
    balance: 2440,
    isDisabled: false,
  },
  {
    id: "4",
    name: "HDFC Credit Card",
    type: "credit_card",
    kind: "bank",
    balance: 1000,
    isDisabled: false,
  },
];

export const MOCK_ACTIVITY: Activity[] = [
  {
    id: "a1",
    title: "Money added to Wallet",
    amount: 1000,
    date: "Oct 25, 2026 • 10:42 AM",
  },
  {
    id: "a2",
    title: "Payment from HDFC Bank",
    amount: 2500,
    date: "Oct 24, 2026 • 04:15 PM",
  },
  {
    id: "a3",
    title: "Payment to Credit Card",
    amount: -1000,
    date: "Oct 23, 2026 • 09:30 AM",
  },
];

export const AccountPage = () => {
  const [active, setActive] = useState<string>("Accounts");
  const [accounts, setAccounts] = useState<Account[]>(MOCK_ACCOUNTS); // TODO: load from API
  const [filters, setFilters] = useState(defaultFilters);
  const [drawer, setDrawer] = useState<Partial<Account> | null>(null);

  const q = filters.query.trim().toLowerCase();
  const visible = accounts
    .filter((a) => a.name.toLowerCase().includes(q))
    .filter((a) => filters.group === "all" || groupOf(a).key === filters.group)
    .filter(
      (a) =>
        filters.status === "all" ||
        (filters.status === "active") !== a.isDisabled,
    )
    .sort((a, b) =>
      filters.sort === "balance"
        ? b.balance - a.balance
        : a.name.localeCompare(b.name),
    );

  const openAdd = (type: Account["type"] = "saving") => setDrawer({ type });

  const save = (values: Omit<Account, "id">) => {
    const id = drawer?.id;
    setAccounts((list) =>
      id
        ? list.map((a) => (a.id === id ? { ...a, ...values } : a))
        : [...list, { ...values, id: crypto.randomUUID() }],
    );
    setDrawer(null);
  };

  return (
    <div className="flex min-h-screen bg-[#fffdfd] font-sans text-ink">
      <Sidebar active={active} onChange={setActive} />
      <div className="min-w-0 flex-1 px-4 py-5.5 lg:px-7">
        <AccountsHeader
          name="Vatsal"
          query={filters.query}
          onQueryChange={(query) => setFilters({ ...filters, query })}
        />

        <div className="grid gap-4 xl:grid-cols-[1fr_230px]">
          <div className="space-y-4">
            <BalanceCard accounts={accounts} />
            <AccountFilters
              filters={filters}
              onChange={setFilters}
              onAdd={() => openAdd()}
            />
            {GROUPS.map((g) => (
              <AccountGroup
                key={g.key}
                group={g}
                accounts={visible.filter((a) => groupOf(a) === g)}
                onEdit={setDrawer}
                onAdd={openAdd}
              />
            ))}
          </div>

          <aside className="space-y-4">
            <AccountSidebar activity={MOCK_ACTIVITY} onAdd={() => openAdd()} />
          </aside>
        </div>

        <AccountDrawer
          account={drawer}
          onClose={() => setDrawer(null)}
          onSubmit={save}
        />
      </div>
    </div>
  );
};

export default AccountPage;
