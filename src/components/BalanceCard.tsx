import { Landmark, UserIcon, Wallet } from "lucide-react";
import { inr } from "../utils/utils";
import type { Account } from "../types/types";

export const BalanceCard = ({ accounts }: { accounts: Account[] }) => {
  const total = accounts.filter(a => !a.isDisabled).reduce((sum, a) => sum + a.balance, 0);
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