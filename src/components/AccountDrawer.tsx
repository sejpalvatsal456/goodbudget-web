import { useEffect, useState } from "react";
import { Pause, Play, X } from "lucide-react";
import type { Account } from "../types/types";
import { GROUPS, TYPE_LABEL } from "../constants/constant";
import { Button } from "./ui/Button";
import { Field, SelectInput, TextInput, Toggle } from "./ui/Field";

type Values = Omit<Account, "id">;

const typeOptions = GROUPS.flatMap((g) =>
  g.types.map((t) => ({
    value: t,
    label: g.types.length > 1 ? `${g.label} (${TYPE_LABEL[t as Account["type"]]})` : TYPE_LABEL[t as Account["type"]],
  })),
);

interface FormProps {
  account: Partial<Account>;
  onSubmit: (values: Values) => void;
  onCancel: () => void;
}

const AccountForm = ({ account, onSubmit, onCancel }: FormProps) => {
  const { id, ...initial } = account;
  const isEdit = !!id;
  const [v, setV] = useState<Values>({ name: "", type: "saving", balance: 0, isDisabled: false, ...initial, kind: initial.kind ?? "bank" });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(v);
      }}
      className="space-y-4"
    >
      <Field label="Account Type">
        <SelectInput value={v.type} onChange={(e) => setV({ ...v, type: e.target.value as Account["type"] })}>
          {typeOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </SelectInput>
      </Field>

      <Field label="Account Name">
        <TextInput value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} placeholder="e.g. HDFC Savings" required />
      </Field>

      <Field label="Initial Balance" hint={isEdit ? undefined : "Optional"}>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted">₹</span>
          <TextInput
            type="number"
            step="0.01"
            min="0"
            value={v.balance || ""}
            onChange={(e) => setV({ ...v, balance: Number(e.target.value) })}
            placeholder="0.00"
            className="pl-7"
          />
        </div>
      </Field>

      {isEdit ? (
        <div className="space-y-2 border-t border-black/5 pt-4">
          <Button variant="outline" className="w-full" onClick={() => onSubmit({ ...v, isDisabled: !v.isDisabled })}>
            {v.isDisabled ? <Play size={13} /> : <Pause size={13} />}
            {v.isDisabled ? "Enable Account" : "Disable Account"}
          </Button>
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">Set as Active</span>
            <Toggle checked={!v.isDisabled} onChange={(on) => setV({ ...v, isDisabled: !on })} label="Set as active" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="neutral" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Create Account</Button>
          </div>
        </>
      )}
    </form>
  );
};

interface Props {
  account: Partial<Account> | null; // has id = edit, no id = add
  onClose: () => void;
  onSubmit: (values: Values) => void;
}

export const AccountDrawer = ({ account, onClose, onSubmit }: Props) => {
  useEffect(() => {
    if (!account) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [account, onClose]);

  if (!account) return null;
  const title = account.id ? "Edit Account" : "Add Account";

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <aside role="dialog" aria-label={title} className="relative h-full w-full overflow-y-auto bg-white p-5 shadow-xl sm:w-[320px]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-semibold">{title}</h2>
          <button onClick={onClose} className="text-muted hover:text-ink" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <AccountForm key={account.id ?? account.type} account={account} onSubmit={onSubmit} onCancel={onClose} />
      </aside>
    </div>
  );
};