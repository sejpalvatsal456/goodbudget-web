import { Plus, Search } from "lucide-react";
import { Button } from "../components/ui/Button";
import { SelectInput } from "../components/ui/Field";
import type { TypeFilter, StatusFilter, SortKey } from "../types/types";

interface Props {
  query: string;
  onQueryChange: (v: string) => void;
  typeFilter: TypeFilter;
  onTypeChange: (v: TypeFilter) => void;
  status: StatusFilter;
  onStatusChange: (v: StatusFilter) => void;
  sort: SortKey;
  onSortChange: (v: SortKey) => void;
  onAdd: () => void;
}

export const AccountToolbar = (p: Props) => (
  <div className="flex flex-wrap items-center gap-2">
    <label className="hidden h-9 min-w-[180px] flex-1 items-center gap-2 rounded-lg border border-black/10 bg-white px-3 text-muted md:flex">
      <Search size={14} />
      <input
        value={p.query}
        onChange={(e) => p.onQueryChange(e.target.value)}
        placeholder="Search by account name..."
        className="w-full bg-transparent text-xs text-ink outline-none placeholder:text-muted"
      />
    </label>

    <div className="w-[120px]">
      <SelectInput value={p.typeFilter} onChange={(e) => p.onTypeChange(e.target.value as TypeFilter)} aria-label="Type">
        <option value="all">All Types</option>
        <option value="cash">Cash</option>
        <option value="bank">Bank</option>
        <option value="credit">Credit</option>
      </SelectInput>
    </div>
    <div className="w-[120px]">
      <SelectInput value={p.status} onChange={(e) => p.onStatusChange(e.target.value as StatusFilter)} aria-label="Status">
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="disabled">Disabled</option>
      </SelectInput>
    </div>
    <div className="w-[140px]">
      <SelectInput value={p.sort} onChange={(e) => p.onSortChange(e.target.value as SortKey)} aria-label="Sort">
        <option value="balance">Sort by Balance</option>
        <option value="name">Sort by Name</option>
      </SelectInput>
    </div>

    <Button onClick={p.onAdd} className="ml-auto h-9">
      <Plus size={14} /> Add Account
    </Button>
  </div>
);