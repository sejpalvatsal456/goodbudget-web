import { useState } from "react";
import {
  Wallet,
  PieChart,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Plus,
  Landmark,
  User as UserIcon,
  Utensils,
  ShoppingCart,
  Briefcase,
  Bus,
  Clapperboard,
  Zap,
  Smartphone,
  Target,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "./components/AuthContext";

import Logo from './components/Logo';
import { Sidebar, MobileNav } from "./components/SideBar";
import { inr } from "./utils/utils";
import { Header } from "./components/Header";


/* ---------------------------------- Types --------------------------------- */

type Account = {
  id: string;
  name: string;
  type: string;
  balance: number;
  kind: "bank" | "cash";
  icon: LucideIcon;
  color: string;
};

type Transaction = {
  id: string;
  category: string;
  merchant: string;
  amount: number; // negative = expense, positive = income
  when: string;
  status: "Pending" | "Completed";
  icon: LucideIcon;
  tint: string;
};

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

const QUICK_ACTIONS: { label: string; icon: LucideIcon; tile: string; circle: string }[] = [
  { label: "Add Transaction", icon: Plus, tile: "bg-coral/10 border-coral/20", circle: "bg-coral text-white" },
  { label: "View Accounts", icon: Wallet, tile: "bg-sky-50 border-sky-200", circle: "bg-sky-200 text-sky-600" },
  { label: "Get Summary", icon: PieChart, tile: "bg-green-50 border-green-200", circle: "bg-green-200 text-green-600" },
];

/* --------------------------------- Helpers --------------------------------- */



/* ------------------------------- Sub-components ----------------------------- */




function BalanceCard({ accounts }: { accounts: Account[] }) {
  const total = accounts.reduce((sum, a) => sum + a.balance, 0);
  const cash = accounts.filter((a) => a.kind === "cash").length;
  const bank = accounts.filter((a) => a.kind === "bank").length;

  const stats = [
    { icon: UserIcon, value: String(accounts.length), label: "Accounts" },
    { icon: Landmark, value: `${cash} / ${bank}`, label: "Cash / Bank" },
  ];

  return (
    <section className="flex flex-wrap items-center gap-x-6.5 gap-y-5 rounded-2xl border border-coral/35 bg-[#fff0ef] p-5">
      <div className="flex items-center gap-5">
        <span className="grid size-[70px] shrink-0 place-items-center rounded-full bg-coral text-white">
          <Wallet size={32} strokeWidth={1.6} />
        </span>
        <div>
          <p className="text-base">Total Balance</p>
          <p className="text-4xl font-bold tracking-tight text-green-600">{inr(total)}</p>
        </div>
      </div>

      <div className="ml-auto flex">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex min-w-[120px] flex-col items-center border-l border-coral/20 px-5">
            <span className="grid size-11 place-items-center rounded-full bg-coral/20 text-coral">
              <Icon size={21} strokeWidth={1.7} />
            </span>
            <p className="mt-2.5 text-2xl font-bold">{value}</p>
            <p className="text-[14px] text-ink/80">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatusPill({ status }: { status: Transaction["status"] }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-[12px] font-medium ${
        status === "Pending" ? "bg-amber-100 text-amber-500" : "bg-green-100 text-green-600"
      }`}
    >
      {status}
    </span>
  );
}

function RecentTransactions({ items }: { items: Transaction[] }) {
  return (
    <section className="mt-7">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[22px] font-bold tracking-tight">Recent Transactions</h2>
        <a href="/transactions" className="flex items-center gap-1.5 text-coral underline-offset-4 hover:underline">
          View All <ArrowRight size={14} />
        </a>
      </div>

      <ul className="divide-y divide-line rounded-2xl border border-line bg-white px-2.5 shadow-[0_1px_2px_rgba(17,26,51,.03)]">
        {items.map(({ id, category, merchant, amount, when, status, icon: Icon, tint }) => (
          <li key={id} className="flex items-center gap-3 px-2.5 py-3">
            <span className={`grid size-[42px] shrink-0 place-items-center rounded-full ${tint}`}>
              <Icon size={19} strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-medium">{category}</p>
              <p className="truncate text-[12px] text-muted">{merchant}</p>
            </div>
            <div className="text-right sm:w-38.5 sm:text-left">
              <p className={`text-[14px] font-semibold ${amount < 0 ? "text-coral" : "text-green-600"}`}>
                {amount < 0 ? "- " : "+ "}
                {inr(amount)}
              </p>
              <p className="text-[12px] text-muted">{when}</p>
            </div>
            <div className="hidden w-22.5 justify-center sm:flex">
              <StatusPill status={status} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function QuickActions() {
  return (
    <section className="grid grid-cols-3 gap-1.5 rounded-2xl border border-line bg-white p-1.5">
      {QUICK_ACTIONS.map(({ label, icon: Icon, tile, circle }) => (
        <button
          key={label}
          className={`flex h-[98px] flex-col items-center justify-center gap-2.5 rounded-xl border px-1 text-center text-[12px] leading-tight transition hover:-translate-y-0.5 hover:shadow-sm ${tile}`}
        >
          <span className={`grid size-[40px] place-items-center rounded-full ${circle}`}>
            <Icon size={19} strokeWidth={2} />
          </span>
          {label}
        </button>
      ))}
    </section>
  );
}

function SetBudgetRow() {
  return (
    <button className="mt-4 flex h-[74px] w-full items-center gap-4 rounded-2xl border border-orange-100 bg-orange-50/70 px-4 text-left transition hover:shadow-sm">
      <span className="grid size-[46px] place-items-center rounded-full bg-orange-100 text-orange-500">
        <BarChart3 size={22} strokeWidth={1.8} />
      </span>
      <span className="text-[13px] leading-snug">
        Set
        <br />
        Budget
      </span>
    </button>
  );
}

function YourAccounts({ accounts }: { accounts: Account[] }) {
  return (
    <section className="mt-4 rounded-2xl border border-line bg-white p-3">
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-[17px] font-bold tracking-tight">Your Accounts</h2>
        <a href="/accounts" className="flex items-center gap-1 text-[12px] text-coral hover:underline">
          View All <ArrowRight size={12} />
        </a>
      </div>
      <ul className="flex flex-col gap-2.5">
        {accounts.map(({ id, name, type, balance, icon: Icon, color }) => (
          <li key={id}>
            <button className="flex h-[61px] w-full items-center gap-3 rounded-xl border border-line bg-white px-3 text-left transition hover:bg-[#fafafc]">
              <span className={`grid size-[40px] shrink-0 place-items-center rounded-full text-white ${color}`}>
                <Icon size={19} strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-medium">{name}</span>
                <span className="block text-[12px] text-muted">{type}</span>
              </span>
              <span className="text-[14px] font-semibold text-green-600">{inr(balance)}</span>
              <ChevronRight size={14} className="text-muted" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function BudgetCta() {
  return (
    <section className="mt-4 flex items-center gap-3 rounded-2xl border border-coral/25 bg-[#fff0ef] p-4">
      <span className="grid size-[58px] shrink-0 place-items-center rounded-full bg-white text-coral">
        <Target size={30} strokeWidth={1.7} />
      </span>
      <div className="flex-1">
        <p className="text-[13px] font-semibold leading-snug">
          Set a budget,
          <br />
          stay in control.
        </p>
        <p className="mt-1 text-[12px] text-muted">Small steps, big goals.</p>
      </div>
      <button className="grid size-8 place-items-center rounded-full bg-coral/15 text-coral" aria-label="Set a budget">
        <ArrowRight size={14} />
      </button>
    </section>
  );
}

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