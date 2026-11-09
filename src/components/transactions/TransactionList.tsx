import { MoreVertical } from "lucide-react";
import type { Transaction } from "../../types/types";
import { inr } from "../../utils/utils";
import { StatusPill } from "../ui/StatusPill";

export const TransactionList = ({
  transactions,
  onEdit,
}: {
  transactions: Transaction[];
  onEdit: (t: Transaction) => void;
}) => {
  return (
    <ul className="divide-y divide-line rounded-2xl border border-line bg-white px-2.5 shadow-[0_1px_2px_rgba(17,26,51,.03)]">
      {transactions.map((t) => (
        <li key={t.id} className="flex items-center gap-3 px-2.5 py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-medium">
              {t.cat_name ?? "Uncategoried Transaction"}
            </p>
            <p className="truncate text-[12px] text-muted">{t.merchant}</p>
          </div>
          <div className="text-right sm:w-38.5 sm:text-left">
            <p
              className={`text-[14px] font-semibold ${t.type === "expense" ? "text-coral" : "text-green-600"}`}
            >
              {t.type === "expense" ? "- " : "+ "}
              {inr(t.amount)}
            </p>
            <p className="text-[12px] text-muted">{t.when}</p>
          </div>
          <div className="hidden w-22.5 justify-center sm:flex">
            <StatusPill status={t.status} />
          </div>
          <button
            onClick={() => onEdit(t)}
            className="text-muted hover:text-ink"
          >
            <MoreVertical size={16} />
          </button>
        </li>
      ))}
    </ul>
  );
};
