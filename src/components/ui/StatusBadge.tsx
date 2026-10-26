export const StatusBadge = ({ active }: { active: boolean }) => (
  <span
    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
      active ? "bg-emerald-100 text-emerald-600" : "bg-black/5 text-muted"
    }`}
  >
    {active ? "Active" : "Disabled"}
  </span>
);