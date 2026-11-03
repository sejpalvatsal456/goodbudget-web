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


const TransactionPage = () => {
  const [active, setActive] = useState<string>("Transactions");
  const [filters, setFilters] = useState(defaultFilter);
  const { transactions, loadingTransactions } = useTransactions();
  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>(transactions);
  const { apiFetch, isInitializing, statusCode } = useAuth();
  const [drawer, setDrawer] = useState<Partial<Transaction> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (statusCode === 401) {
      navigate("/login?callback=/transactions");
    }
  }, [isInitializing]);


  // TODO: add filter for query field
  useEffect(() => {
    if (loadingTransactions) return;
    console.log(filters);
    console.log("Filtered Transactions: ");
    const newTransactions = transactions
      .filter((t) => filters.status === "all" || t.status === filters.status)
      .filter((t) => filters.type === "all" || t.type === filters.type);
    setFilteredTransactions(newTransactions);
    console.log(newTransactions);
  }, [filters, transactions]);

  const handleSubmit = async(value: Omit<Transaction, "id" | "when">) => {
    // console.log(value);
    const id =  drawer?.id;
    if (id) {
      // edit mode
    } else {
      // add mode
      const payload = {
        tran_merchant: value.merchant,
        tran_status: value.status,
        tran_type: value.type,
        account_id: value.acc_id,
        tran_amount: value.amount 
      };

      const res = await apiFetch("/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if(!res.ok) {
        console.log(data.msg);
        return;
      }
      console.log("Data from API: ");
      console.log(data);
      const newTran: Transaction = {
        id: data.result.tran_id,
        merchant: data.result.tran_merchant,
        type: data.result.tran_type,
        status: data.result.tran_status,
        amount: data.result.tran_amount,
        acc_id: data.result.account_id,
        category: data.result.cat_name,
        when: (new Date(data.result.created_at)).toDateString()
      }
      setFilteredTransactions(list => [...list, newTran])
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fffdfd] font-sans text-ink">
      <Sidebar active={active} onChange={setActive} />
      <div className="min-w-0 flex-1 px-4 py-5.5 lg:px-7">
        <TransactionsHeader name="Vatsal" />
        <div className="grid mt-5 gap-4 xl:grid-cols-[1fr_300px]">
          <div className="space-y-4">
            <TransactionCard transactions={filteredTransactions} />
            <TransactionFilter
              filters={filters}
              onChange={setFilters}
              // onAdd={() => openAdd()}
              onAdd={() => {
                setDrawer({
                  type: "expense",
                  status: "success",
                  merchant: "",
                  amount: 0,
                  category: null,
                });
              }}
            />
            <TransactionList transactions={filteredTransactions} />
          </div>
          <TransactionDrawer
            transaction={drawer}
            onAdd={handleSubmit}
            onClose={() => setDrawer(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
