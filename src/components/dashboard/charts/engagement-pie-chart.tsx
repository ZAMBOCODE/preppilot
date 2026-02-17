import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { formatCompactNumber } from "~/lib/mock-data/helpers";

// Brand-harmonized colors (burgundy palette)
const COLORS = ["#851330", "#B44D60", "#D4899A", "#A03050"];

interface EngagementPieChartProps {
  data: { type: string; count: number }[];
}

export function EngagementPieChart({ data }: EngagementPieChartProps) {
  return (
    <Card className="border-0 bg-secondary/50 shadow-none">
      <CardHeader>
        <CardTitle className="font-heading text-base font-semibold">Engagement-Verteilung</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                dataKey="count"
                nameKey="type"
                strokeWidth={0}
              >
                {data.map((_entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [formatCompactNumber(value), name]}
                contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-card)", fontSize: "13px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-4 text-xs">
          {data.map((entry, i) => (
            <div key={entry.type} className="flex items-center gap-1.5">
              <div className="size-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="text-muted-foreground">{entry.type}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
