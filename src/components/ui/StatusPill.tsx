export const StatusPill = ({ status }: { status: Transaction["status"] }) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-[12px] font-medium ${
        status === "Pending" ? "bg-amber-100 text-amber-500" : "bg-green-100 text-green-600"
      }`}
    >
      {status}
    </span>
  );
}