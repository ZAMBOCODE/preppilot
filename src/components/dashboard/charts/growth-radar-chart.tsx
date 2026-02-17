import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { PLATFORM_CONFIG } from "~/lib/mock-data/config";
import type { Platform } from "~/types/social-media";

interface GrowthRadarChartProps {
  data: {
    platform: Platform;
    followerGrowth: number;
    engagementRate: number;
    reach: number;
    impressions: number;
    contentOutput: number;
  }[];
}

export function GrowthRadarChart({ data }: GrowthRadarChartProps) {
  const metrics = ["Follower-\nWachstum", "Engagement-\nRate", "Reichweite", "Impressionen", "Content-\nProduktion"];
  const keys = ["followerGrowth", "engagementRate", "reach", "impressions", "contentOutput"] as const;

  const chartData = metrics.map((metric, i) => {
    const entry: Record<string, string | number> = { metric };
    for (const d of data) {
      entry[d.platform] = d[keys[i]];
    }
    return entry;
  });

  return (
    <Card className="border-0 bg-secondary/50 shadow-none">
      <CardHeader>
        <CardTitle className="font-heading text-base font-semibold">Plattform-Performance</CardTitle>
        <CardDescription>Normierte Scores (0-100) pro Metrik</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData} cx="50%" cy="48%" outerRadius="65%">
              <PolarGrid
                gridType="polygon"
                stroke="var(--color-border)"
                strokeOpacity={0.6}
              />
              <PolarAngleAxis
                dataKey="metric"
                tick={{ fontSize: 12, fontWeight: 500, fill: "var(--color-foreground)" }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                tickCount={5}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-card)",
                  fontSize: "13px",
                }}
                formatter={(value: number, name: string) => {
                  const platformName = PLATFORM_CONFIG[name as Platform]?.name ?? name;
                  return [`${value}/100`, platformName];
                }}
              />
              {data.map((d, i) => (
                <Radar
                  key={d.platform}
                  name={d.platform}
                  dataKey={d.platform}
                  stroke={PLATFORM_CONFIG[d.platform].color}
                  fill={PLATFORM_CONFIG[d.platform].color}
                  fillOpacity={0.15 + i * 0.05}
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: PLATFORM_CONFIG[d.platform].color, strokeWidth: 0 }}
                />
              ))}
              <Legend
                formatter={(value: string) => PLATFORM_CONFIG[value as Platform]?.name ?? value}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
