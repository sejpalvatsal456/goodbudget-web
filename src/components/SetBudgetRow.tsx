import { BarChart3 } from "lucide-react";

export const SetBudgetRow = () => {
  return (
    <button className="mt-4 flex h-[74px] w-full items-center gap-4 rounded-2xl border border-orange-100 bg-orange-50/70 px-4 text-left transition hover:shadow-sm">
      <span className="grid size-[46px] place-items-center rounded-full bg-orange-100 text-orange-500">
        <BarChart3 size={22} strokeWidth={1.8} />
      </span>
      <span className="text-[13px] leading-snug">
        Set
        <br />
        Budget
      </span>
    </button>
  );
};
