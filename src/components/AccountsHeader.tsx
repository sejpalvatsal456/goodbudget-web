import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import Logo from "../components/Logo";
import { initials } from "../utils/utils";

interface Props {
  name: string;
  query: string;
  onQueryChange: (value: string) => void;
}

export const AccountsHeader = ({ name, query, onQueryChange }: Props) => (
  <header className="flex flex-wrap items-start justify-between gap-3">
    <div>
      <div className="mb-2.5 lg:hidden">
        <Logo />
      </div>
      <h1 className="text-2xl font-bold tracking-tight">Accounts</h1>
      <p className="mt-1 text-[12px] italic text-muted">Manage your accounts and keep track of your money.</p>
    </div>

    <div className="flex w-full items-center gap-3 sm:w-auto">
      <label className="flex h-9.5 flex-1 items-center gap-2.5 rounded-xl bg-[#f6f6f9] px-3 text-muted sm:w-[240px] sm:flex-none">
        <Search size={16} />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search accounts..."
          className="w-full bg-transparent text-xs text-ink outline-none placeholder:text-muted"
        />
      </label>
      <button className="text-ink/70" aria-label="Filters">
        <SlidersHorizontal size={18} strokeWidth={1.6} />
      </button>
      <button className="flex items-center gap-1.5" aria-label="Account menu">
        <span className="grid size-9 place-items-center rounded-full bg-coral/15 text-xs font-medium text-coral">
          {initials(name)}
        </span>
        <ChevronDown size={13} className="text-muted" />
      </button>
    </div>
  </header>
);