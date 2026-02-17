import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { formatCompactNumber } from "~/lib/mock-data/helpers";

interface PlatformDistributionChartProps {
  title: string;
  data: { name: string; value: number; color: string }[];
  valueFormat?: "number" | "percentage";
}

export function PlatformDistributionChart({ title, data, valueFormat = "number" }: PlatformDistributionChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <Card className="border-0 bg-secondary/50 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="font-heading text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="h-[180px] w-[180px] flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  nameKey="name"
                  strokeWidth={2}
                  stroke="var(--color-card)"
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [
                    valueFormat === "percentage" ? `${value}%` : formatCompactNumber(value),
                    "",
                  ]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-card)",
                    fontSize: "13px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2.5">
            {data.map((entry) => {
              const pct = total > 0 ? ((entry.value / total) * 100).toFixed(1) : "0";
              return (
                <div key={entry.name} className="flex items-center gap-2.5">
                  <div className="size-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
                  <div className="flex flex-1 items-baseline justify-between gap-2">
                    <span className="text-sm">{entry.name}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading text-sm font-semibold tabular-nums">
                        {valueFormat === "percentage" ? `${entry.value}%` : formatCompactNumber(entry.value)}
                      </span>
                      <span className="text-muted-foreground text-xs tabular-nums">{pct}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
