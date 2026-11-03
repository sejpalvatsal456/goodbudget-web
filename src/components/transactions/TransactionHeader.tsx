import { ChevronDown } from "lucide-react";
import { initials } from "../../utils/utils";
import Logo from "../Logo";

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