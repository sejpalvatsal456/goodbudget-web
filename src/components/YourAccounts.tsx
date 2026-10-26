import { ArrowRight, ChevronRight } from "lucide-react";
import { inr } from "../utils/utils";
import type { Account } from "../types/types";

export const YourAccounts = ({ accounts }: { accounts: Account[] }) => {
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