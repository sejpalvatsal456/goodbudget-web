import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Transaction } from "../../types/types";
import { Field, SelectInput, TextInput } from "../ui/Field";
import { Button } from "../ui/Button";
import { useAccount } from "../../hooks/useAccounts";
import { useCategory } from "../../hooks/useCategory";

type Values = Omit<Transaction, "id" | "when" | "cat_name">;

// TODO: Add Category Field after category page is created
// TODO: Add Transaction Date to change
// TODO: Add Transaction Mode

const lock = (on: boolean) =>
  on ? { disabled: true, style: { backgroundColor: "#eee", color: "#888" } } : {};

const TransactionForm = ({
  initial,
  onSubmit,
  onCancel,
  onDelete,
}: {
  initial: Partial<Transaction>;
  onSubmit: (v: Values) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
}) => {
  const isEdit = !!initial.id;
  // success and failed transactions are final, only delete is allowed
  const isFinal = isEdit && initial.status !== "pending";
  const { accounts, loadingAccounts } = useAccount();
  const { categories, loadingCategories } = useCategory();
  const [v, setV] = useState<Values>({
    cat_id: initial.cat_id || "",
    amount: 0,
    type: "expense",
    status: "success",
    acc_id: initial.acc_id || "",
    merchant: "",
    ...initial,
  });

  useEffect(() => {
    if (loadingAccounts || !accounts?.length) return;
    setV((p) => ({ ...p, acc_id: p.acc_id || accounts[0].id }));
  }, [accounts, loadingAccounts]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!isFinal) onSubmit(v);
      }}
      className="space-y-4"
    >
      {isFinal && (
        <p className="text-xs text-muted">
          This transaction is {initial.status} and can no longer be edited.
        </p>
      )}
      <Field label="Transaction Type">
        <SelectInput
          value={v.type}
          onChange={(e) => setV({ ...v, type: e.target.value as Transaction["type"] })}
          {...lock(isEdit)}
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
          {...lock(isFinal)}
        />
      </Field>
      <Field label="Account">
        <SelectInput
          value={v.acc_id}
          onChange={(e) => setV({ ...v, acc_id: e.target.value })}
          {...lock(isEdit)}
        >
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Amount">
        <TextInput
          type="number"
          min="0"
          step="0.01"
          value={v.amount}
          onChange={(e) => setV({ ...v, amount: Number(e.target.value) })}
          {...lock(isFinal)}
        />
      </Field>
      <Field label="Category">
        <SelectInput
          value={v.cat_id || ""}
          onChange={(e) => setV({ ...v, cat_id: e.target.value || null })}
          {...lock(isFinal)}
        >
          <option value="">Uncategorized</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Status">
        <SelectInput
          value={v.status}
          onChange={(e) => setV({ ...v, status: e.target.value as Transaction["status"] })}
          {...lock(isFinal)}
        >
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </SelectInput>
      </Field>
      {isEdit && initial.id ? (
        <div className="space-y-2 border-t border-black/5 pt-4">
          <Button type="button" variant="outline" className="w-full" onClick={() => onDelete(initial.id!)}>
            Delete Transaction
          </Button>
          {!isFinal && (
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="neutral" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={loadingAccounts || loadingCategories}>
            Issue
          </Button>
        </div>
      )}
    </form>
  );
};

export const TransactionDrawer = ({
  transaction,
  onAdd,
  onClose,
  onDelete,
}: {
  transaction: Partial<Transaction> | null;
  onAdd: (value: Values) => void;
  onClose: () => void;
  onDelete: (id: string) => void;
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
          onDelete={onDelete}
        />
      </aside>
    </div>
  );
};
