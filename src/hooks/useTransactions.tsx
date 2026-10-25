import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";

type ApiTransaction = {
  tran_id: string,
  trans_desc: string,
  tran_status: "pending" | "completed" | "failed",
  user_id: string,
  account_id: string,
  tran_merchant: string,
  tran_mode: string,
  tran_type: "income" | "expense",
  tran_date:  string,
  tran_amount: string,
  created_at: string,
  updated_at: string,
  deleted_at: string | null,
  cat_id: string | null
};

type ResponseType = {
  msg: string,
  result: ApiTransaction[]
};

export const useTransactions = () => {
  const { user, isInitializing, apiFetch } = useAuth();
  const [tranactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const mapTransaction = (tran: ApiTransaction): Transaction => {
    return {
      id: tran.tran_id,
      category: tran.cat_id,
      merchant: tran.tran_merchant,
      amount: (tran.tran_type === "income" ? +1 : -1) * Number(tran.tran_amount), // negative = expense, positive = income
      when: (new Date(tran.created_at)).toDateString(),
      status: tran.tran_type,
    }
  }

  const fetchTransactions = async() => {
    try {
      const res = await apiFetch("/transactions");
      const data: ResponseType = await res.json();

      if(!res.ok) {
        console.error(data.msg);
        setError(data.msg);
        return;
      }
      const transactions = data.result.map((tran, _) => mapTransaction(tran))
      setTransactions(transactions);
      setError(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(isInitializing || !user) return;
    void fetchTransactions();
  }, [apiFetch, user, isInitializing]);

  return {
    tranactions,
    loadingTransactions,
    error
  };
};