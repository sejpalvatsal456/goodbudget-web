import { ArrowLeftRight, Home, PieChart, Settings, Wallet, type LucideIcon } from "lucide-react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

const NAV: { label: string; icon: LucideIcon, destination: string }[] = [
  { label: "Home", icon: Home, destination: '/' },
  { label: "Accounts", icon: Wallet, destination: "/accounts" },
  { label: "Transactions", icon: ArrowLeftRight, destination: "/transactions" },
  { label: "Summary", icon: PieChart, destination: "/summary" },
  { label: "Settings", icon: Settings, destination: "/settings" },
];

function SidebarArt() {

  return (
    <div className="mt-auto flex flex-col items-center pt-8 text-center">
      <svg viewBox="0 0 140 110" className="w-25.5" aria-hidden="true">
        <ellipse cx="70" cy="98" rx="55" ry="7" fill="#ffe3e0" />
        <g fill="#5f9c98">
          <path d="M14 40c14 3 22 20 16 38-14-3-22-20-16-38z" />
          <path d="M8 66c14-2 26 8 28 24-14 2-26-8-28-24z" />
        </g>
        <rect x="30" y="40" width="82" height="54" rx="9" fill="#ff6b6b" transform="rotate(-8 70 67)" />
        <rect x="36" y="46" width="70" height="42" rx="6" fill="none" stroke="#ffb3b0" strokeDasharray="4 3" transform="rotate(-8 70 67)" />
        <circle cx="52" cy="26" r="9" fill="#f6c343" stroke="#e5a91f" strokeWidth="2" />
        <circle cx="96" cy="68" r="5" fill="#fff" />
      </svg>
      <p className="mt-3 text-xs leading-relaxed text-muted">
        Better money habits,
        <br />a brighter future.
      </p>
    </div>
  );
}

export const Sidebar = ({ active, onChange }: { active: string; onChange: (l: string) => void }) => {
  const navigate = useNavigate();
  return (
    <aside className="sticky top-0 hidden h-screen w-[206px] shrink-0 flex-col border-r border-line bg-white px-4 py-5.5 lg:flex">
      <div className="px-1">
        <Logo />
      </div>
      <nav className="mt-8 flex flex-col gap-1.5" aria-label="Main">
        {NAV.map(({ label, icon: Icon, destination }) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => {
                navigate(destination)
                onChange(label)
              }}
              aria-current={isActive ? "page" : undefined}
              className={`flex h-[40px] items-center gap-3 rounded-xl px-3 text-[13px] transition ${
                isActive
                  ? "bg-coral/12 font-medium text-coral"
                  : "text-ink/80 hover:bg-coral/6"
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.7} className={isActive ? "fill-coral/90" : ""} />
              {label}
            </button>
          );
        })}
      </nav>
      <SidebarArt />
    </aside>
  );
}

export const MobileNav = ({ active, onChange }: { active: string; onChange: (l: string) => void }) => {
  return (
    <nav className="-mx-4 mt-3 flex gap-1.5 overflow-x-auto px-4 pb-1 lg:hidden" aria-label="Main">
      {NAV.map(({ label, icon: Icon }) => (
        <button
          key={label}
          onClick={() => onChange(label)}
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs ${
            active === label ? "bg-coral text-white" : "bg-coral/10 text-ink/80"
          }`}
        >
          <Icon size={13} /> {label}
        </button>
      ))}
    </nav>
  );
}

// export default { Sidebar, MobileNav };

