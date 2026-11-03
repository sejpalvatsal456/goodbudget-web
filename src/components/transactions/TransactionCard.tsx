import { ArrowLeftRight, ArrowBigDown, ArrowBigUp } from "lucide-react";
import type { Transaction } from "../../types/types";
import { inr } from "../../utils/utils";

type TransactionCardProps = {
  transactions: Transaction[];
};

export const TransactionCard = ({ transactions }: TransactionCardProps) => {
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
