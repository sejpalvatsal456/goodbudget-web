import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { Landmark, Wallet } from "lucide-react";

type ApiAccount = {
  acc_id: string;
  acc_type: string;
  acc_name: string;
  acc_balance: string;
  user_id: string;
  acc_is_disabled: boolean;
  created_at: string;
  updated_at: string;
};

type ResponseType = {
  msg: string;
  result: ApiAccount[];
};

export const useAccount = () => {
  const { user, apiFetch, isInitializing } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const parseAccount = (account: ApiAccount): Account => {
    const isCash = account.acc_type == "cash";

    return {
      id: account.acc_id,
      name: account.acc_name,
      type: account.acc_type.replace(/[_-]/g, " ").toUpperCase(),
      balance: Number(account.acc_balance),
      kind: isCash ? "cash" : "bank",
      icon: isCash ? Wallet : Landmark,
      color: isCash ? "bg-coral" : "bg-sky-500",
    };
  };

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/accounts");
      const data: ResponseType = await res.json();
      if (!res.ok) {
        console.log(data.msg);
        return;
      }
      console.log(data);
      const accounts = data.result.map((acc, _) => parseAccount(acc));
      setAccounts(accounts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isInitializing || !user) return;
    void fetchAccounts();
  }, [apiFetch, user, isInitializing]);

  return {
    loading,
    accounts,
  };
};
