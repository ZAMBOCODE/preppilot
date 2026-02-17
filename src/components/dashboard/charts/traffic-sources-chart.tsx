import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { TrafficSource } from "~/types/social-media";
import { formatCompactNumber } from "~/lib/mock-data/helpers";

interface TrafficSourcesChartProps {
  data: TrafficSource[];
  accentColor?: string;
}

export function TrafficSourcesChart({ data, accentColor = "#851330" }: TrafficSourcesChartProps) {
  return (
    <Card className="border-0 bg-secondary/50 shadow-none">
      <CardHeader>
        <CardTitle className="font-heading text-base font-semibold">Traffic-Quellen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
              <XAxis type="number" tickFormatter={(v: number) => `${v}%`} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} className="fill-muted-foreground" />
              <YAxis type="category" dataKey="source" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={110} className="fill-muted-foreground" />
              <Tooltip
                formatter={(value: number, _name: string, props: { payload: TrafficSource }) => [`${value}% (${formatCompactNumber(props.payload.views)} Aufrufe)`, "Traffic"]}
                contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-card)", fontSize: "13px" }}
              />
              <Bar dataKey="percentage" fill={accentColor} fillOpacity={0.75} radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
