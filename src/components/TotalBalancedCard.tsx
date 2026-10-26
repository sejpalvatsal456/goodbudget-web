import { Wallet } from "lucide-react";
import type { Account } from "../types/types";
import { GROUPS } from "../constants/constant";
import { IconBubble } from "./ui/IconBubble";
import { inr } from "../utils/utils";

const sum = (list: Account[]) => list.reduce((s, a) => s + a.balance, 0);

export const BalanceCard = ({ accounts }: { accounts: Account[] }) => {
  const active = accounts.filter((a) => !a.isDisabled);

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-coral/15 bg-coral/5 p-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3 sm:flex-1">
        <IconBubble icon={Wallet} tone="bg-coral text-white" size={44} />
        <div>
          <p className="text-xs text-ink/80">Total Balance</p>
          <p className="text-2xl font-bold tracking-tight">{inr(sum(active))}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-coral/15 sm:flex-[1.6]">
        {GROUPS.map((g) => {
          const list = active.filter((a) => g.types.includes(a.type));
          return (
            <div key={g.key} className="flex flex-col items-center gap-0.5 px-2 text-center">
              <IconBubble icon={g.icon} tone={g.bubble} />
              <span className="text-xs font-semibold">{list.length}</span>
              <span className="text-[11px] text-muted">
                {g.label} {list.length === 1 ? "Account" : "Accounts"}
              </span>
              <span className="text-[11px] font-medium">{inr(sum(list))}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};