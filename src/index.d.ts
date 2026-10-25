type User = {
  user_name: string,
  user_id: string,
  user_email: string,
  user_username: string,
}

type Account = {
  id: string;
  name: string;
  type: string;
  balance: number;
  kind: "bank" | "cash";
  icon: LucideIcon;
  color: string;
};

type Transaction = {
  id: string;
  category: string | null;
  merchant: string;
  amount: number; // negative = expense, positive = income
  when: string;
  status: string;
};