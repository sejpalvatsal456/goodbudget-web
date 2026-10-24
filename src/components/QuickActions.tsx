import { type LucideIcon, Plus, Wallet, PieChart } from "lucide-react";

const QUICK_ACTIONS: { label: string; icon: LucideIcon; tile: string; circle: string }[] = [
  { label: "Add Transaction", icon: Plus, tile: "bg-coral/10 border-coral/20", circle: "bg-coral text-white" },
  { label: "View Accounts", icon: Wallet, tile: "bg-sky-50 border-sky-200", circle: "bg-sky-200 text-sky-600" },
  { label: "Get Summary", icon: PieChart, tile: "bg-green-50 border-green-200", circle: "bg-green-200 text-green-600" },
];


export const QuickActions = () => {
  return (
    <section className="grid grid-cols-3 gap-1.5 rounded-2xl border border-line bg-white p-1.5">
      {QUICK_ACTIONS.map(({ label, icon: Icon, tile, circle }) => (
        <button
          key={label}
          className={`flex h-[98px] flex-col items-center justify-center gap-2.5 rounded-xl border px-1 text-center text-[12px] leading-tight transition hover:-translate-y-0.5 hover:shadow-sm ${tile}`}
        >
          <span className={`grid size-[40px] place-items-center rounded-full ${circle}`}>
            <Icon size={19} strokeWidth={2} />
          </span>
          {label}
        </button>
      ))}
    </section>
  );
}