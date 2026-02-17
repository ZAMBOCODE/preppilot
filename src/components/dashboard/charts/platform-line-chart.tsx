import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { TimeSeriesDataPoint } from "~/types/social-media";
import { formatCompactNumber } from "~/lib/mock-data/helpers";

interface PlatformLineChartProps {
  title: string;
  data: TimeSeriesDataPoint[];
  color: string;
}

export function PlatformLineChart({ title, data, color }: PlatformLineChartProps) {
  return (
    <Card className="border-0 bg-secondary/50 shadow-none">
      <CardHeader>
        <CardTitle className="font-heading text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={(v: string) => new Date(v).toLocaleDateString("de-DE", { day: "2-digit", month: "short" })}
                className="text-xs fill-muted-foreground"
                tick={{ fontSize: 11 }}
                interval="preserveStartEnd"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v: number) => formatCompactNumber(v)}
                className="text-xs fill-muted-foreground"
                tick={{ fontSize: 11 }}
                width={50}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: number) => [formatCompactNumber(value), title]}
                labelFormatter={(label: string) => new Date(label).toLocaleDateString("de-DE", { day: "2-digit", month: "long" })}
                contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-card)", fontSize: "13px" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                fill={color}
                fillOpacity={0.08}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
