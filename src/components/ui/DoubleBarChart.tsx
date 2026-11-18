import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
} from "recharts";
import { inr } from "../../utils/utils";

interface WeekwiseTransaction {
  week: number;
  income: number | string;
  expense: number | string;
}

export default function DoubleBarChart({
  data,
}: {
  data: WeekwiseTransaction[];
}) {
  const chartData = data.map((item) => ({
    week: `Week ${item.week}`,
    income: Number(item.income),
    expense: Number(item.expense),
  }));

  return (
    <ResponsiveContainer width="100%" height="80%">
      <BarChart
        data={chartData}
        responsive
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 5,
        }}
        barGap={8}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#e5e7eb"
        />

        <XAxis
          dataKey="week"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#6b7280", fontSize: 12 }}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#6b7280", fontSize: 12 }}
          tickFormatter={inr}
          width={75}
        />

        <Tooltip
          formatter={(value, name) => [
            inr(Number(value)),
            name === "Income" ? "Income" : "Expense",
          ]}
          contentStyle={{
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
          }}
        />

        <Bar
          dataKey="income"
          name="Income"
          fill="#22c55e"
          radius={[5, 5, 0, 0]}
          maxBarSize={35}
        />

        <Bar
          dataKey="expense"
          name="Expense"
          fill="#f87171"
          radius={[5, 5, 0, 0]}
          maxBarSize={35}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
