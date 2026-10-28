import { BarChart3, FileText, Plus } from "lucide-react";
import type { Activity } from "../types/types";
import { IconBubble } from "./ui/IconBubble";
import type { HTMLAttributes } from "react";

const actions = [
  { icon: FileText, label: "View All Transactions" },
  { icon: BarChart3, label: "Get Summary" },
];

interface Props {
  activity?: Activity[];
  onAdd: () => void;
}

const Card = ({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`rounded-2xl border border-black/5 bg-white p-4 shadow-[0_1px_8px_rgba(0,0,0,0.04)] ${className}`} {...props} />
);

export const AccountSidebar = ({ activity, onAdd }: Props) => (
  <>
    <Card>
      <h2 className="mb-3 text-sm font-semibold">Quick Actions</h2>
      <div className="space-y-2">
        <button onClick={onAdd} className="flex w-full items-center gap-3 rounded-xl bg-coral/10 px-3 py-2 text-xs font-medium hover:bg-coral/15">
          <IconBubble icon={Plus} tone="bg-coral text-white" size={30} />
          Add Account
        </button>
        {actions.map(({ icon, label }) => (
          <button key={label} className="flex w-full items-center gap-3 rounded-xl bg-[#f6f6f9] px-3 py-2 text-xs font-medium hover:bg-black/5">
            <IconBubble icon={icon} tone="bg-white text-ink/70" size={30} />
            {label}
          </button>
        ))}
      </div>
    </Card>
{/* 
    <Card>
      <h2 className="mb-3 text-sm font-semibold">Recent Activity</h2>
      <ul className="space-y-3.5">
        {activity.map((item) => {
          const isIn = item.amount > 0;
          return (
            <li key={item.id} className="flex items-start gap-2.5">
              <IconBubble
                icon={isIn ? ArrowUp : ArrowDown}
                tone={isIn ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-500"}
                size={28}
              />
              <div className="min-w-0">
                <p className="truncate text-[11px] font-medium">{item.title}</p>
                <p className={`text-[11px] font-semibold ${isIn ? "text-emerald-600" : "text-red-500"}`}>
                  {isIn ? "+" : "-"} {inr(item.amount)}
                </p>
                <p className="text-[10px] text-muted">{item.date}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card> */}
  </>
);