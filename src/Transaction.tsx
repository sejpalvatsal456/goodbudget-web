import { useEffect, useState } from "react";
import { Sidebar } from "./components/SideBar";
import { initials, inr } from "./utils/utils";
import {
  ArrowBigDown,
  ArrowBigUp,
  ArrowLeftRight,
  ChevronDown,
} from "lucide-react";
import Logo from "./components/Logo";
import { type Transaction } from "./types/types";
import { useTransactions } from "./hooks/useTransactions";
import {
  defaultFilter,
  TransactionFilter,
} from "./components/transactions/TransactionFilter";
import { useAuth } from "./components/AuthContext";
import { useNavigate } from "react-router-dom";
import { StatusPill } from "./components/ui/StatusPill";

// TODO: Clean this shit

interface TransactionsHeaderProps {
  name: string;
}

export const TransactionsHeader = ({ name }: TransactionsHeaderProps) => (
  <header className="flex flex-wrap items-start justify-between gap-3">
    <div>
      <div className="mb-2.5 lg:hidden">
        <Logo />
      </div>
      <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
      <p className="mt-1 text-[12px] italic text-muted">
        Track all your income and expense in one place.
      </p>
    </div>

    <div className="flex w-full items-center gap-3 sm:w-auto">
      <button className="flex items-center gap-1.5" aria-label="Account menu">
        <span className="grid size-9 place-items-center rounded-full bg-coral/15 text-xs font-medium text-coral">
          {initials(name)}
        </span>
        <ChevronDown size={13} className="text-muted" />
      </button>
    </div>
  </header>
);

type TransactionCardProps = {
  transactions: Transaction[];
};

const TransactionCard = ({ transactions }: TransactionCardProps) => {
  const totalTransactions = transactions.length;
  const totalIncome = transactions
    .filter((t) => t.type === "income" && t.status === "success")
    .reduce((amount, tran) => {
      return amount + tran.amount;
    }, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense" && t.status === "success")
    .reduce((total, tran) => {
      return total + tran.amount;
    }, 0);

  return (
    <div className="flex flex-row w-[100%] gap-10">
      {/* Total transactions in this month */}
      <section className="flex flex-wrap w-full items-center gap-x-6.5 gap-y-5 rounded-2xl border border-sky-200 bg-sky-50 p-5">
        <span className="grid size-11 place-items-center rounded-full bg-sky-100 text-sky-600">
          <ArrowLeftRight size={24} strokeWidth={1.7} />
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500">Total Transactions</p>
          <p className="text-3xl font-bold tracking-tight">
            {totalTransactions}
          </p>
        </div>
      </section>

      <section className="flex flex-wrap w-full items-center gap-x-6.5 gap-y-5 rounded-2xl border border-green-200 bg-green-50 p-5">
        <span className="grid size-11 place-items-center rounded-full bg-green-200 text-green-600">
          <ArrowBigDown size={21} strokeWidth={1.7} />
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500">Total Income</p>
          <p className="text-3xl font-bold tracking-tight text-green-500">
            {inr(totalIncome)}
          </p>
        </div>
      </section>

      <section className="flex flex-wrap w-full items-center gap-x-6.5 gap-y-5 rounded-2xl border border-coral/10 bg-coral/20 p-5">
        <span className="grid size-11 place-items-center rounded-full bg-coral/30 text-coral">
          <ArrowBigUp size={24} strokeWidth={1.7} />
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500">Total Expense</p>
          <p className="text-3xl font-bold tracking-tight text-red-500">
            -{inr(totalExpense)}
          </p>
        </div>
      </section>
    </div>
  );
};

const TransactionList = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <ul className="divide-y divide-line rounded-2xl border border-line bg-white px-2.5 shadow-[0_1px_2px_rgba(17,26,51,.03)]">
      {transactions.map(({ id, category, merchant, amount, when, status }) => (
        <li key={id} className="flex items-center gap-3 px-2.5 py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-medium">
              {category ?? "Uncategoried Transaction"}
            </p>
            <p className="truncate text-[12px] text-muted">{merchant}</p>
          </div>
          <div className="text-right sm:w-38.5 sm:text-left">
            <p
              className={`text-[14px] font-semibold ${amount < 0 ? "text-coral" : "text-green-600"}`}
            >
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
  );
};

const TransactionPage = () => {
  const [active, setActive] = useState<string>("Transactions");
  const [filters, setFilters] = useState(defaultFilter);
  const { transactions, loadingTransactions } = useTransactions();
  const [ filteredTransactions, setFilteredTransactions ] = useState<Transaction[]>(transactions);
  const { isInitializing, statusCode } = useAuth();
  const navigate = useNavigate();

  // console.log(TransactionStatusValues)
  // console.log(transactions);

  useEffect(() => {
    if (statusCode === 401) {
      navigate("/login?callback=/transactions");
    }
  }, [isInitializing]);

  useEffect(() => {
    console.log(filters);
    console.log("Filtered Transactions: ")
    const newTransactions = transactions
        .filter(t => filters.status === "all" || t.status === filters.status)
        .filter(t => filters.type === "all" || t.type === filters.type);
    setFilteredTransactions(newTransactions);
    console.log(newTransactions)
  }, [filters, transactions]);

  return (
    <div className="flex min-h-screen bg-[#fffdfd] font-sans text-ink">
      <Sidebar active={active} onChange={setActive} />
      <div className="min-w-0 flex-1 px-4 py-5.5 lg:px-7">
        <TransactionsHeader name="Vatsal" />
        <div className="grid mt-5 gap-4 xl:grid-cols-[1fr_300px]">
          <div className="space-y-4">
            <TransactionCard
              transactions={filteredTransactions}
            />
            <TransactionFilter
              filters={filters}
              onChange={setFilters}
              // onAdd={() => openAdd()}
              onAdd={() => {}}
            />
            <TransactionList transactions={filteredTransactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
