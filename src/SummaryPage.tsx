import { useEffect, useState } from "react";
import { Sidebar } from "./components/SideBar";
import SummaryHeader from "./components/summary/SummaryHeader";
import { useAuth } from "./components/AuthContext";
import { ArrowBigDown, ArrowBigUp, Wallet } from "lucide-react";
import { inr } from "./utils/utils";
import { Card } from "./components/ui/Card";
import PieChartWithPaddingAngle from "./components/ui/PieChart";
import { SelectInput } from "./components/ui/Field";
import DoubleBarChart from "./components/ui/DoubleBarChart";

// Income and Expense Pie Chart
interface CategorySummary {
  id: string | null;
  name: string;
  value: string | number;
}

const IncomeExpensePie = ({
  incomeData,
  expenseData,
}: {
  incomeData: CategorySummary[];
  expenseData: CategorySummary[];
}) => {
  const [option, setOption] = useState<string>("expense");

  return (
    <Card className="w-1/2 px-10 pb-5">
      <div className="w-[30%] mb-5">
        <SelectInput
          onChange={e => setOption(e.target.value)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </SelectInput>
      </div>
      <PieChartWithPaddingAngle
        data={(option === "expense" ? expenseData : incomeData).map((item) => ({
          name: item.name,
          value: Number(item.value),
        }))}
        centerLabel="Total Expense"
      />
    </Card>
  );
};

// Income vs expense Bar Chart

interface WeekwiseTransaction {
  week: number;
  income: number | string;
  expense: number | string;
}

const WeekwiseTransactionChart = ({data} : { data: WeekwiseTransaction[] }) => {
  return (
    <Card className="w-1/2 px-10">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Income vs Expense
        </h2>
      </div>
      <DoubleBarChart data={data} />

    </Card>
  )
}

export const SummaryPage = () => {
  const [active, setActive] = useState<string>("Summary");
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [expenseData, setExpenseData] = useState<CategorySummary[]>([]);
  const [incomeData, setIncomeData] = useState<CategorySummary[]>([]);
  const [weekwiseData, setWeekwiseData] = useState<WeekwiseTransaction[]>([]);

  const { user, isInitializing, apiFetch } = useAuth();

  useEffect(() => {
    if (isInitializing || !user) return;

    const fetchData = async () => {
      const end_date = new Date();
      const start_date = new Date(
        end_date.getFullYear(),
        end_date.getMonth(),
        1,
      );
      const url = `/summary/all?start_date=${start_date.toISOString()}&end_date=${end_date.toISOString()}`;
      const res = await apiFetch(url, {
        method: "GET",
      });

      const data = await res.json();
      // console.log(data);
      // console.log(data.categorywiseExpenseResult);
      setExpenseData(data.categorywiseExpenseResult);
      setIncomeData(data.categorywiseIncomeResult);
      setTotalExpense(data.result.total_value_of_expense);
      setTotalIncome(data.result.total_value_of_income);

      const weekwiseUrl = `/summary/week?start_date=${start_date.toISOString()}&end_date=${end_date.toISOString()}`;
      const weekwiseRes = await apiFetch(weekwiseUrl, {
        method: "GET"
      })

      const weekwiseData = await weekwiseRes.json();
      console.log(weekwiseData);
      setWeekwiseData(weekwiseData.result)

    };

    void fetchData();
  }, [user, isInitializing, apiFetch]);

  return (
    <div className="flex min-h-screen bg-[#fffdfd] font-sans text-ink">
      <Sidebar active={active} onChange={setActive} />
      <div className="min-w-0 flex-1 px-4 py-5.5 lg:px-7">
        <SummaryHeader name={user?.user_name || "-"} />
        <div className="my-5">
          <h1>All Transaction Summary</h1>

          <div className="flex mt-5 flex-row w-[100%] gap-10">
            {/* Total Income */}
            <section className="flex flex-wrap w-full items-center gap-x-6.5 gap-y-5 rounded-2xl border border-green-200 bg-green-50 p-5">
              <span className="grid size-11 place-items-center rounded-full bg-green-200 text-green-600">
                <ArrowBigDown size={21} strokeWidth={1.7} />
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Total Income</p>
                <p className="text-3xl font-bold tracking-tight text-green-500">
                  {inr(totalIncome)}
                </p>
              </div>
            </section>

            {/* Total Expense */}
            <section className="flex flex-wrap w-full items-center gap-x-6.5 gap-y-5 rounded-2xl border border-coral/10 bg-coral/20 p-5">
              <span className="grid size-11 place-items-center rounded-full bg-coral/30 text-coral">
                <ArrowBigUp size={24} strokeWidth={1.7} />
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Total Expense</p>
                <p className="text-3xl font-bold tracking-tight text-red-500">
                  -{inr(totalExpense)}
                </p>
              </div>
            </section>

            <section className="flex flex-wrap w-full items-center gap-x-6.5 gap-y-5 rounded-2xl border border-sky-200 bg-sky-50 p-5">
              <span className="grid size-11 place-items-center rounded-full bg-sky-100 text-sky-600">
                <Wallet size={24} strokeWidth={1.7} />
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Net Balance</p>
                <p
                  className={`text-3xl font-bold tracking-tight ${totalExpense > totalIncome ? "text-red-600" : "text-green-600"}`}
                >
                  {(totalExpense > totalIncome ? "-" : "+") +
                    inr(totalExpense - totalIncome)}
                </p>
              </div>
            </section>

            <section className="flex flex-wrap w-full items-center gap-x-6.5 gap-y-5 rounded-2xl border border-sky-200 bg-sky-50 p-5">
              {/* <span className="grid size-11 place-items-center rounded-full bg-sky-100 text-sky-600">
                <ArrowLeftRight size={24} strokeWidth={1.7} />
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Total Transactions</p>
                <p className="text-3xl font-bold tracking-tight">{0}</p>
              </div> */}
            </section>
          </div>

          <div className="mt-5 flex gap-10 flex-row">
            <IncomeExpensePie incomeData={incomeData} expenseData={expenseData} />
            <WeekwiseTransactionChart data={weekwiseData}  />
          </div>
        </div>
      </div>
    </div>
  );
};
