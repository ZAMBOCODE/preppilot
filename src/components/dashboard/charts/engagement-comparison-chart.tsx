import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { PLATFORM_CONFIG } from "~/lib/mock-data/config";
import type { Platform } from "~/types/social-media";

interface EngagementComparisonChartProps {
  data: { platform: Platform; rate: number; totalEngagements: number }[];
}

export function EngagementComparisonChart({ data }: EngagementComparisonChartProps) {
  const chartData = data.map((d) => ({
    name: PLATFORM_CONFIG[d.platform].name,
    platform: d.platform,
    rate: d.rate,
  }));

  return (
    <Card className="border-0 bg-secondary/50 shadow-none">
      <CardHeader>
        <CardTitle className="font-heading text-base font-semibold">Engagement-Rate</CardTitle>
        <CardDescription>Vergleich über Plattformen</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} vertical={false} />
              <XAxis
                type="number"
                tickFormatter={(v: number) => `${v}%`}
                className="text-xs fill-muted-foreground"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                className="text-xs fill-muted-foreground"
                tick={{ fontSize: 12 }}
                width={80}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: number) => [`${value}%`, "Engagement-Rate"]}
                contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-card)", fontSize: "13px" }}
              />
              <Bar dataKey="rate" radius={[0, 6, 6, 0]} barSize={24}>
                {chartData.map((entry) => (
                  <Cell key={entry.platform} fill={PLATFORM_CONFIG[entry.platform as Platform].color} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
