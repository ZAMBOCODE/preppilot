import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { PLATFORM_CONFIG } from "~/lib/mock-data/config";
import type { Platform, TimeSeriesDataPoint } from "~/types/social-media";
import { formatCompactNumber } from "~/lib/mock-data/helpers";

interface FollowerGrowthChartProps {
  data: { platform: Platform; data: TimeSeriesDataPoint[] }[];
}

export function FollowerGrowthChart({ data }: FollowerGrowthChartProps) {
  const merged = data[0]?.data.map((point, i) => {
    const entry: Record<string, string | number> = { date: point.date };
    for (const series of data) {
      entry[series.platform] = series.data[i]?.value ?? 0;
    }
    return entry;
  }) ?? [];

  return (
    <Card className="border-0 bg-secondary/50 shadow-none">
      <CardHeader>
        <CardTitle className="font-heading text-base font-semibold">Follower-Wachstum</CardTitle>
        <CardDescription>Tägliche neue Follower auf allen Plattformen</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={merged} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
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
                formatter={(value: number, name: string) => [formatCompactNumber(value), PLATFORM_CONFIG[name as Platform]?.name ?? name]}
                labelFormatter={(label: string) => new Date(label).toLocaleDateString("de-DE", { day: "2-digit", month: "long" })}
                contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-card)", fontSize: "13px" }}
              />
              {data.map((series) => (
                <Area
                  key={series.platform}
                  type="monotone"
                  dataKey={series.platform}
                  stroke={PLATFORM_CONFIG[series.platform].color}
                  fill={PLATFORM_CONFIG[series.platform].color}
                  fillOpacity={0.08}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="mt-3 flex flex-wrap gap-4 text-xs">
          {data.map((series) => (
            <div key={series.platform} className="flex items-center gap-1.5">
              <div className="size-2 rounded-full" style={{ backgroundColor: PLATFORM_CONFIG[series.platform].color }} />
              <span className="text-muted-foreground">{PLATFORM_CONFIG[series.platform].name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
