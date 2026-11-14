import { useEffect, useState } from "react";
import { Sidebar } from "./components/SideBar";
import { type Transaction } from "./types/types";
import { useTransactions } from "./hooks/useTransactions";
import {
  defaultFilter,
  TransactionFilter,
} from "./components/transactions/TransactionFilter";
import { useAuth } from "./components/AuthContext";
import { useNavigate } from "react-router-dom";
import { TransactionsHeader } from "./components/transactions/TransactionHeader";
import { TransactionDrawer } from "./components/transactions/TransactionDrawer";
import { TransactionCard } from "./components/transactions/TransactionCard";
import { TransactionList } from "./components/transactions/TransactionList";
import { CategoryPanel } from "./components/transactions/CategoryPanel";
import { useCategory } from "./hooks/useCategory";
import { mapTransaction } from "./utils/utils";

const TransactionPage = () => {
  const [active, setActive] = useState<string>("Transactions");
  const [filters, setFilters] = useState(defaultFilter);
  const { transactions, loadingTransactions } = useTransactions();
  const { categories, loadingCategories } = useCategory();
  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>(transactions);
  const { user, apiFetch, isInitializing, statusCode } = useAuth();
  const [drawer, setDrawer] = useState<Partial<Transaction> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (statusCode === 401) {
      navigate("/login?callback=/transactions");
    }
  }, [isInitializing]);

  useEffect(() => {
    if (loadingTransactions) return;
    // console.log("Transactions from API: ");
    // console.log(transactions);
  }, [transactions, loadingTransactions]);

  // TODO add category filter
  useEffect(() => {
    if (loadingTransactions) return;
    console.log(filters);
    const newTransactions = transactions
      .filter(
        (t) =>
          t.merchant.includes(filters.query) ||
          t.cat_name?.includes(filters.query),
      )
      .filter(
        (t) =>
          filters.category === "all" ||
          (filters.category === "null" && t.cat_id === null) ||
          t.cat_id === filters.category,
      )
      .filter((t) => filters.status === "all" || t.status === filters.status)
      .filter((t) => filters.type === "all" || t.type === filters.type);
    setFilteredTransactions(newTransactions);
    // console.log(newTransactions);
  }, [filters, transactions]);

  const handleSubmit = async (
    value: Omit<Transaction, "id" | "when" | "cat_name">,
  ) => {
    const id = drawer?.id;
    const cat_id = value.cat_id || null;  

    const method = id ? "PATCH" : "POST";

    const payload = id 
    ? {
      tran_id: id,
      tran_status: value.status,
      tran_merchant: value.merchant,
      tran_amount: value.amount,
      cat_id,
    } : {
      tran_merchant: value.merchant,
      tran_status: value.status,
      tran_type: value.type,
      acc_id: value.acc_id,
      tran_amount: value.amount,
      cat_id,
    }

    const res = await apiFetch("/transactions", {
      method: method,
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if(!data.ok) {
      console.log(data.msg);
      return;
    }

    // if (!data) return;

    const t = mapTransaction(data.result);
    setFilteredTransactions((list) =>
      id ? list.map((x) => (x.id === t.id ? t : x)) : [...list, t],
    );
    setDrawer(null);
  };

  const handledelete = async (id: string) => {
    const res = await apiFetch("/transactions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tran_id: id }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.log(data.msg);
      return;
    }
    console.log(data);
    setFilteredTransactions((list) => list.filter((t) => t.id !== id));
    setDrawer(null);
  };

  return (
    <div className="flex min-h-screen bg-[#fffdfd] font-sans text-ink">
      <Sidebar active={active} onChange={setActive} />
      <div className="min-w-0 flex-1 px-4 py-5.5 lg:px-7">
        <TransactionsHeader name={user?.user_name || "-"} />
        <div className="grid mt-5 gap-4 xl:grid-cols-[1fr_300px]">
          <div className="space-y-4">
            <TransactionCard transactions={filteredTransactions} />
            <TransactionFilter
              filters={filters}
              onChange={setFilters}
              categories={loadingCategories ? [] : categories}
              onAdd={() => {
                setDrawer({
                  type: "expense",
                  status: "success",
                  merchant: "",
                  amount: 0,
                  cat_id: null,
                });
              }}
            />
            <TransactionList
              transactions={filteredTransactions}
              onEdit={(t: Transaction) => {
                setDrawer(t);
              }}
            />
          </div>
          <CategoryPanel />
          <TransactionDrawer
            transaction={drawer}
            onAdd={handleSubmit}
            onClose={() => setDrawer(null)}
            onDelete={handledelete}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
