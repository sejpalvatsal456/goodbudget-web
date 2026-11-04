import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Transaction } from "../../types/types";
import { Field, SelectInput, TextInput } from "../ui/Field";
import { Button } from "../ui/Button";
import { useAccount } from "../../hooks/useAccounts";

type Values = Omit<Transaction, "id" | "when">;

// TODO: Add Category Field after category page is created
// TODO: Add Transaction Date to change
// TODO: Add Transaction Mode
const TransactionForm = ({
  initial,
  onSubmit,
  onCancel,
}: {
  initial: Partial<Transaction>;
  onSubmit: (v: Values) => void;
  onCancel: () => void;
}) => {
  const isEdit = !!initial.id;
  const { accounts, loadingAccounts } = useAccount();
  const [v, setV] = useState<Values>({
    category: null,
    amount: 0,
    type: "expense",
    status: "success",
    acc_id: initial.acc_id || "",
    merchant: "",
    ...initial,
  });

  useEffect(() => {
    if (!accounts || loadingAccounts) return;
    setV({ ...v, acc_id: v.acc_id === "" ? accounts[0].id : v.acc_id });
  }, [accounts]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(v);
      }}
      className="space-y-4"
    >
      <Field label="Transaction Type">
        <SelectInput
          value={v.type}
          onChange={(e) =>
            setV({ ...v, type: e.target.value as Transaction["type"] })
          }
          disabled={isEdit}
          style={isEdit ? { backgroundColor: "#eee", color: "#888" } : {}}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </SelectInput>
      </Field>
      <Field label="Merchant">
        <TextInput
          value={v.merchant}
          onChange={(e) => setV({ ...v, merchant: e.target.value })}
          placeholder="Merchant Name..."
        />
      </Field>
      <Field label="Account">
        <SelectInput
          value={v.acc_id}
          onChange={(e) => setV({ ...v, acc_id: e.target.value })}
          disabled={isEdit}
          style={isEdit ? { backgroundColor: "#eee", color: "#888" } : {}}
        >
          {accounts.map((acc, key) => (
            <option key={key} value={acc.id}>
              {acc.name}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Amount">
        <TextInput
          type="number"
          value={v.amount}
          onChange={(e) => setV({ ...v, amount: parseInt(e.target.value) })}
          disabled={isEdit}
          style={isEdit ? { backgroundColor: "#eee", color: "#888" } : {}}
        /> 
      </Field>
      <Field label="Status">
        <SelectInput
          value={v.status}
          onChange={(e) =>
            setV({ ...v, status: e.target.value as Transaction["status"] })
          }
          disabled={isEdit && v.status === "success"}
          style={isEdit && v.status === "success" ? { backgroundColor: "#eee", color: "#888" } : {}}
        >
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </SelectInput>
      </Field>
      {isEdit ? (
        <div className="space-y-2 border-t border-black/5 pt-4">
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <Button variant="neutral" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={loadingAccounts}>Issue</Button>
        </div>
      )}
    </form>
  );
};

export const TransactionDrawer = ({
  transaction,
  onAdd,
  onClose,
}: {
  transaction: Partial<Transaction> | null;
  onAdd: (value: Values) => void;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (!transaction) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [transaction, onClose]);

  if (!transaction) return null;
  const title = transaction.id ? "Edit Transaction" : "Add Transaction";

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <aside
        role="dialog"
        aria-label={title}
        className="relative h-full w-full overflow-y-auto bg-white p-5 shadow-xl sm:w-[320px]"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-ink"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <TransactionForm
          initial={transaction}
          onSubmit={onAdd}
          onCancel={onClose}
        />
      </aside>
    </div>
  );
};
