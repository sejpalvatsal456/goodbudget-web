import { ChevronDown } from "lucide-react";
import { initials } from "../../utils/utils";
import Logo from "../Logo";

export default function SummaryHeader({ name }: { name: string }) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <div className="mb-2.5 lg:hidden">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Summary</h1>
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
}
