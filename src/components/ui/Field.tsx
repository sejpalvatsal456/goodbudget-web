import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

const control =
  "h-9 w-full rounded-lg border border-black/10 bg-white px-3 text-xs text-ink outline-none placeholder:text-muted focus:border-coral/60";

export const Field = ({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) => (
  <label className="block">
    <span className="mb-1.5 block text-xs font-medium">
      {label} {hint && <span className="font-normal text-muted">({hint})</span>}
    </span>
    {children}
  </label>
);

export const TextInput = ({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input className={`${control} ${className}`} {...props} />
);

export const SelectInput = ({ children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) => (
  <span className="relative block">
    <select className={`${control} appearance-none pr-8`} {...props}>
      {children}
    </select>
    <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted" />
  </span>
);

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export const Toggle = ({ checked, onChange, label }: ToggleProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={() => onChange(!checked)}
    className={`relative h-5 w-9 rounded-full transition-colors ${checked ? "bg-coral" : "bg-black/15"}`}
  >
    <span className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-all ${checked ? "left-4.5" : "left-0.5"}`} />
  </button>
);