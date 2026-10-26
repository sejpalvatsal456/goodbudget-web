import { Plus, Search } from "lucide-react";
import { GROUPS } from "../constants/constant";
import { Button } from "./ui/Button";
import { SelectInput } from "./ui/Field";

export const defaultFilters = { query: "", group: "all", status: "all", sort: "balance" };
export type Filters = typeof defaultFilters;

const selects = [
  { key: "group", options: [["all", "All Types"], ...GROUPS.map((g) => [g.key, g.label])] },
  { key: "status", options: [["all", "All Status"], ["active", "Active"], ["disabled", "Disabled"]] },
  { key: "sort", options: [["balance", "Sort by Balance"], ["name", "Sort by Name"]] },
];

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onAdd: () => void;
}

export const AccountFilters = ({ filters, onChange, onAdd }: Props) => (
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
          value={filters[s.key as keyof Filters]}
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
      <Plus size={14} /> Add Account
    </Button>
  </div>
);