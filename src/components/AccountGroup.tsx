import { MoreVertical, Plus } from "lucide-react";
import type { Account } from "../types/types";
import { TYPE_LABEL, type Group, type GroupMeta } from "../constants/constant";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { IconBubble } from "./ui/IconBubble";
import { groupOf, inr } from "../utils/utils";

const Row = ({ account, onEdit }: { account: Account; onEdit: (a: Account) => void }) => {
  const g = groupOf(account);
  return (
    <div className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${g.row} ${account.isDisabled ? "opacity-60" : ""}`}>
      <IconBubble icon={g.icon} tone={g.bubble} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium">{account.name}</p>
        <p className="text-[11px] text-muted">{TYPE_LABEL[account.type]}</p>
      </div>
      <span
        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
          account.isDisabled ? "bg-black/5 text-muted" : "bg-emerald-100 text-emerald-600"
        }`}
      >
        {account.isDisabled ? "Disabled" : "Active"}
      </span>
      <p className="w-24 text-right text-xs font-semibold">{inr(account.balance)}</p>
      <button onClick={() => onEdit(account)} className="text-muted hover:text-ink" aria-label={`Edit ${account.name}`}>
        <MoreVertical size={16} />
      </button>
    </div>
  );
};

interface Props {
  group: Group;
  accounts: Account[];
  onEdit: (account: Account) => void;
  onAdd: (type: Account["type"]) => void;
}

export const AccountGroup = ({ group, accounts, onEdit, onAdd }: Props) => (
  <Card className="space-y-2.5">
    <div className="flex items-center gap-2">
      <IconBubble icon={group.icon} tone={group.bubble} size={30} />
      <h2 className="text-sm font-semibold">
        {group.label} Accounts ({accounts.length})
      </h2>
    </div>

    {accounts.map((a) => (
      <Row key={a.id} account={a} onEdit={onEdit} />
    ))}

    <Button variant="outline" onClick={() => onAdd(group.types[0] as Account["type"])} className="h-8 text-[11px]">
      <Plus size={13} /> Add {group.label} Account
    </Button>
  </Card>
);