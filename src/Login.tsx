import { useState, type FormEvent } from "react";
import {
  Wallet,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Heart,
} from "lucide-react";
import { useAuth, type User } from "./components/AuthContext";
import financeIllustation from "./assets/goodbudget-finance-illustration.svg";
import Logo from "./components/Logo";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

type LoginResponse = {
  msg: string;
  user: User;
  accessToken: string;
  refreshToken: string;
};

type LoginProps = {
  onSuccess?: (user: User) => void;
};

const FEATURES = [
  { icon: ShieldCheck, title: "Secure", sub: "Your data is safe" },
  { icon: Zap, title: "Easy to Use", sub: "Simple & clean" },
  { icon: TrendingUp, title: "Better Habits", sub: "Build wealth" },
  { icon: Heart, title: "For You", sub: "Always" },
];


const fieldClass =
  "mb-4 flex h-12 items-center gap-3 rounded-xl border border-line bg-white px-4 text-ink transition focus-within:border-coral focus-within:ring-2 focus-within:ring-coral/15 sm:h-13";

const inputClass =
  "min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-[#8b91a9] sm:text-base";
const focusRing =
  "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-coral/40";

export default function Login({ onSuccess }: LoginProps) {
  const { setAuth } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim() || !password) {
      setError("Enter your email or username and your password.");
      return;
    }

    setLoading(true);
    try {
      // Adjust the route and field names to match your Express auth controller.
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim(), password }),
      });
      const data = (await res
        .json()
        .catch(() => null)) as Partial<LoginResponse> | null;

      if (!res.ok || !data?.accessToken || !data.user) {
        throw new Error(
          data?.msg ?? "Login failed. Check your details and try again.",
        );
      }

      // Access token lives in memory (AuthProvider). The refresh token is persisted
      // so the session can be restored after a reload.
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("refreshToken");
      if (data.refreshToken) {
        (remember ? localStorage : sessionStorage).setItem(
          "refreshToken",
          data.refreshToken,
        );
      }

      console.log(data.user)

      setAuth(data.accessToken, data.user);
      onSuccess?.(data.user);
      // location.href = '/';
      navigate('/');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-white font-sans text-ink md:grid-cols-2">
      {/* Left: brand panel */}
      <aside className="flex flex-col bg-[linear-gradient(160deg,#fff4f2_0%,#ffeceb_100%)] px-6 py-7 md:px-9 md:py-10 xl:px-10 xl:pb-10 xl:pt-10">
        <Logo />

        <h1 className="mt-7 text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:mt-8 xl:mt-10 xl:text-[56px]">
          Take Control of
          <br />
          Your <span className="text-coral">Finances</span>
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-muted xl:text-base">
          Track your spending, save more,
          <br className="hidden xl:block" />
          and build a better tomorrow.
        </p>

        <div className="hidden min-h-0 flex-1 flex-col md:flex">
          <img
            src={financeIllustation}
            alt="Wallet, coins and a phone showing a growth chart"
            className="mx-auto mt-6 w-full max-w-[420px]"
          />
          <ul className="mt-6 grid grid-cols-4 gap-2 text-center">
            {FEATURES.map(({ icon: Icon, title, sub }) => (
              <li key={title} className="flex flex-col items-center gap-1">
                <span className="mb-1.5 grid size-10 place-items-center rounded-full bg-[#ffe2df] text-coral">
                  <Icon size={20} strokeWidth={2} />
                </span>
                <strong className="text-[15px] font-medium">{title}</strong>
                <small className="text-[13px] text-[#9aa0b8]">{sub}</small>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Right: form panel */}
      <main className="flex min-h-full flex-col items-center px-6 py-16 md:px-8 xl:px-12">
        <p className="self-end text-sm text-muted">
          New here?{" "}
          <a
            href="/signup"
            className="ml-1.5 inline-flex items-center gap-1 font-medium text-coral hover:underline"
          >
            Create an account <ArrowRight size={14} />
          </a>
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full max-w-[460px] mt-20"
        >
          <h2 className="text-3xl font-bold tracking-[-0.03em] xl:text-4xl">
            Welcome Back
          </h2>
          <p className="mb-7 mt-3 text-sm leading-relaxed text-muted sm:text-base md:mb-8">
            Log in to your GoodBudget account
            <br className="hidden xl:block" />
            to continue your financial journey.
          </p>

          <label className={fieldClass}>
            <Mail size={22} strokeWidth={1.6} />
            <input
              type="text"
              placeholder="Email or Username"
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              aria-label="Email or Username"
              className={inputClass}
            />
          </label>

          <label className={fieldClass}>
            <Lock size={22} strokeWidth={1.6} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="grid cursor-pointer place-items-center p-1 text-muted"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </label>

          <div className="-mt-1 mb-5 flex items-center justify-end">
            
            <a
              href="/forgot-password"
              className="text-[17px] font-medium text-coral hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {error && (
            <p
              role="alert"
              className="mb-4 rounded-[10px] bg-[#fff0f0] px-4 py-3 text-[15px] text-[#c93030]"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`flex h-s w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-coral text-[19px] font-medium text-white transition hover:bg-coral-dark active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70 sm:h-16 ${focusRing}`}
          >
            {loading ? (
              "Logging in…"
            ) : (
              <>
                Login <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
