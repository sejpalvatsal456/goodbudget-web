import type { Transaction } from "../../types/types";

export const StatusPill = ({ status }: { status: Transaction["status"] }) => {

  const colors = {
    pending: "bg-amber-100 text-amber-500",
    success: "bg-green-100 text-green-500",
    failed: "bg-red-100 text-red-500"
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-[12px] font-medium ${colors[status]}`}
    >
      {status}
    </span>
  );
}