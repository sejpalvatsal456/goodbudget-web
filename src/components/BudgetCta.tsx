import { Target, ArrowRight } from "lucide-react";

export const BudgetCta = () => {
  return (
    <section className="mt-4 flex items-center gap-3 rounded-2xl border border-coral/25 bg-[#fff0ef] p-4">
      <span className="grid size-[58px] shrink-0 place-items-center rounded-full bg-white text-coral">
        <Target size={30} strokeWidth={1.7} />
      </span>
      <div className="flex-1">
        <p className="text-[13px] font-semibold leading-snug">
          Set a budget,
          <br />
          stay in control.
        </p>
        <p className="mt-1 text-[12px] text-muted">Small steps, big goals.</p>
      </div>
      <button className="grid size-8 place-items-center rounded-full bg-coral/15 text-coral" aria-label="Set a budget">
        <ArrowRight size={14} />
      </button>
    </section>
  );
}