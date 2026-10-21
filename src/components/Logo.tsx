import { Wallet } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-xl bg-coral text-white">
        <Wallet size={18} strokeWidth={1.8} />
      </span>
      <span className="text-xl font-semibold tracking-tight">
        Good<span className="text-coral">Budget</span>
      </span>
    </div>
  );
}

export default Logo;