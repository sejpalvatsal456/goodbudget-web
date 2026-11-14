import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import type { Transaction, ApiTransaction } from "../types/types";
import { mapTransaction } from "../utils/utils";

type ResponseType = {
  msg: string,
  result: ApiTransaction[]
};

export const useTransactions = () => {
  const { user, isInitializing, apiFetch } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    transactions,
    loadingTransactions,
    error
  };
};