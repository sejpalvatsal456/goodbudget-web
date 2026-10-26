import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "neutral";

const styles: Record<Variant, string> = {
  primary: "bg-coral text-white hover:bg-coral/90",
  outline: "border border-coral/40 text-coral hover:bg-coral/5",
  neutral: "border border-black/10 bg-white text-ink hover:bg-black/[0.03]",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = ({ variant = "primary", className = "", type = "button", ...props }: Props) => (
  <button
    type={type}
    className={`inline-flex h-8.5 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-colors disabled:opacity-50 ${styles[variant]} ${className}`}
    {...props}
  />
);