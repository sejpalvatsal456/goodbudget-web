import { Plus, Search } from "lucide-react";
import {
  TransactionStatusValues,
  TransactionTypeValues,
} from "../../types/types";
import { capitalize } from "../../utils/utils";
import { SelectInput } from "../ui/Field";
import { Button } from "../ui/Button";

export const defaultFilter = { query: "", status: "all", type: "all" };

type TranFilter = typeof defaultFilter;

type TransactionFilterProps = {
  filters: TranFilter;
  onChange: (filter: TranFilter) => void;
  onAdd: () => void;
};

// [ ]: add a filter for "by accounts"

const selects: {
  key: Exclude<keyof TranFilter, "query">;
  options: string[][];
}[] = [
  {
    key: "status",
    options: [
      ["all", "All Transactions"],
      ...TransactionStatusValues.map((value) => [value, capitalize(value)]),
    ],
  },
  {
    key: "type",
    options: [
      ["all", "All Types"],
      ...TransactionTypeValues.map((value) => [value, capitalize(value)]),
    ],
  },
];

export const TransactionFilter = ({
  filters,
  onChange,
  onAdd,
}: TransactionFilterProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <label className="hidden h-9 min-w-[180px] flex-1 items-center gap-2 rounded-lg border border-black/10 bg-white px-3 text-muted md:flex">
        <Search size={14} />
        <input
          value={filters.query}
          onChange={(e) => onChange({ ...filters, query: e.target.value })}
          placeholder="Search by account name..."
          className="w-full bg-transparent text-xs text-ink outline-none placeholder:text-muted"
        />
      </label>
      {selects.map((s) => (
        <div key={s.key} className="w-[130px]">
          <SelectInput
            aria-label={s.key}
            // value={filters[s.key as keyof Filters]}
            value={filters[s.key]}
            onChange={(e) => onChange({ ...filters, [s.key]: e.target.value })}
          >
            {s.options.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </SelectInput>
        </div>
      ))}
      <Button onClick={onAdd} className="ml-auto h-9">
        <Plus size={14} /> Add Transactions
      </Button>
    </div>
  );
};
