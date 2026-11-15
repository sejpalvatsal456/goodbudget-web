
import {
  Pie,
  PieChart,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { inr } from "../../utils/utils";

interface PieChartData {
  name: string;
  value: number;
}

interface Props {
  data: PieChartData[];
  centerText?: string;
  centerLabel?: string;
}

const COLORS = [
  "#fe696e",
  "#55a5f7",
  "#ffb443",
  "#9b75e8",
  "#c7c9d9",
  "#22c55e",
  "#06b6d4",
];

export default function ExpensePieChart({
  data,
  centerLabel,
}: Props) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const formatAmount = (amount: number) =>
    `₹${amount.toLocaleString("en-IN")}`;

  return (
    <div className="flex items-center w-full gap-5">

      {/* Donut Chart */}
      <div className="w-[42%] aspect-square shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="68%"
              outerRadius="100%"
              paddingAngle={2}
              stroke="none"
              isAnimationActive
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            {/* Center content */}
            <text
              x="50%"
              y="47%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="currentColor"
              fontSize={28}
              fontWeight={700}
            >
              {inr(total)}
            </text>

            <text
              x="50%"
              y="57%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#888888"
              fontSize={11}
            >
              {centerLabel}
            </text>

            <Tooltip
              formatter={(value) => formatAmount(Number(value))}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legends */}
      <div className="flex-1 max-w-[40%] flex flex-col gap-4">
        {data.map((entry, index) => {
          const percentage =
            total > 0 ? (entry.value / total) * 100 : 0;

          return (
            <div
              key={entry.name}
              className="grid grid-cols-[minmax(0,1fr)_48px_40px] items-center gap-2"
            >
              {/* Category */}
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{
                    backgroundColor:
                      COLORS[index % COLORS.length],
                  }}
                />

                <span className="text-sm truncate">
                  {entry.name}
                </span>
              </div>

              {/* Percentage */}
              <span className="text-sm text-right tabular-nums">
                {percentage.toFixed(1)}%
              </span>

              {/* Amount */}
              <span className="text-sm font-semibold text-right tabular-nums">
                {formatAmount(entry.value)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
