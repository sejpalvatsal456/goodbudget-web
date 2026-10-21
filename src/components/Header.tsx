import { Search, Bell, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import { greeting, initials } from "../utils/utils";

export const Header = ({ name }: { name: string }) => {
  return (
    <header className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <div className="mb-2.5 lg:hidden">
          <Logo />
        </div>
        <p className="text-base text-muted">{greeting()}</p>
        <h1 className="flex items-center gap-2.5 text-4xl font-bold tracking-tight">
          {name} <span aria-hidden="true">👋</span>
        </h1>
        <p className="mt-1.5 text-[12px] italic text-muted">Track your spending, save more, achieve your goals.</p>
      </div>

      <div className="flex w-full items-center gap-3 sm:w-auto">
        <label className="flex h-9.5 flex-1 items-center gap-2.5 rounded-xl bg-[#f6f6f9] px-3 text-muted sm:w-[288px] sm:flex-none">
          <Search size={16} />
          <input
            type="search"
            placeholder="Search transactions, accounts..."
            className="w-full bg-transparent text-xs text-ink outline-none placeholder:text-muted"
          />
        </label>
        <button className="relative text-ink/70" aria-label="Notifications">
          <Bell size={19} strokeWidth={1.6} />
          <span className="absolute right-0 top-0 size-2 rounded-full bg-coral ring-2 ring-white" />
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
}