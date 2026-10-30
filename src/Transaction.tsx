import { useEffect, useState } from "react";
import { Sidebar } from "./components/SideBar";
import { initials, inr } from "./utils/utils";
import {
  ArrowBigDown,
  ArrowBigUp,
  ArrowLeftRight,
  ChevronDown
} from "lucide-react";
import Logo from "./components/Logo";
import { TransactionStatusValues, type Transaction } from "./types/types";
import { useTransactions } from "./hooks/useTransactions";
import { defaultFilter, TransactionFilter } from "./components/transactions/TransactionFilter";

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
    .filter((t) => t.type === "income")
    .reduce((amount, tran) => {
      return amount + tran.amount;
    }, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
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



const TransactionPage = () => {
  const [active, setActive] = useState<string>("Transactions");
  const [filters, setFilters] = useState(defaultFilter);
  const { transactions, loadingTransactions } = useTransactions();

  console.log(TransactionStatusValues)

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <div className="flex min-h-screen bg-[#fffdfd] font-sans text-ink">
      <Sidebar active={active} onChange={setActive} />
      <div className="min-w-0 flex-1 px-4 py-5.5 lg:px-7">
        <TransactionsHeader name="Vatsal" />
        <div className="grid mt-5 gap-4 xl:grid-cols-[1fr_230px]">
          <div className="space-y-4">
            <TransactionCard
              transactions={loadingTransactions ? [] : transactions}
            />
            <TransactionFilter
              filters={filters}
              onChange={setFilters}
              // onAdd={() => openAdd()}
              onAdd={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
