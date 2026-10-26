import type { HTMLAttributes } from "react";

export const Card = ({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`rounded-2xl border border-black/5 bg-white p-4 shadow-[0_1px_8px_rgba(0,0,0,0.04)] ${className}`} {...props} />
);