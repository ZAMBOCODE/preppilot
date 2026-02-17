import { useState } from "react";
import type { Competitor, Platform } from "~/types/social-media";
import { PLATFORM_CONFIG, PLATFORMS } from "~/lib/mock-data/config";
import { formatCompactNumber } from "~/lib/mock-data/helpers";
import { AnimatedCard } from "~/components/dashboard/animated-card";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

interface OwnPlatformData {
  platform: Platform;
  followers: number;
  engagementRate: number;
  postsPerWeek: number;
  avgViews: number;
}

interface CompetitorBenchmarkingProps {
  competitors: Competitor[];
  ownData: OwnPlatformData[];
}

const OWN_COLOR = "#851330";
const COMPETITOR_COLORS = ["#6b7280", "#9ca3af", "#d1d5db", "#4b5563"];

export function CompetitorBenchmarking({
  competitors,
  ownData,
}: CompetitorBenchmarkingProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("tiktok");

  const ownPlatformData = ownData.find(
    (d) => d.platform === selectedPlatform,
  );

  // Build chart data: "Du" + competitors
  const chartData: {
    name: string;
    followers: number;
    isOwn: boolean;
  }[] = [];

  if (ownPlatformData) {
    chartData.push({
      name: "Du",
      followers: ownPlatformData.followers,
      isOwn: true,
    });
  }

  competitors.forEach((comp) => {
    const platformData = comp.platforms.find(
      (p) => p.platform === selectedPlatform,
    );
    if (platformData) {
      chartData.push({
        name: comp.name,
        followers: platformData.followers,
        isOwn: false,
      });
    }
  });

  // Build table rows
  interface TableRowData {
    name: string;
    avatar: string;
    isOwn: boolean;
    followers: number;
    engagementRate: number;
    postsPerWeek: number;
    avgViews: number;
  }

  const tableRows: TableRowData[] = [];

  if (ownPlatformData) {
    tableRows.push({
      name: "Du (zzzlim)",
      avatar: "ZZ",
      isOwn: true,
      followers: ownPlatformData.followers,
      engagementRate: ownPlatformData.engagementRate,
      postsPerWeek: ownPlatformData.postsPerWeek,
      avgViews: ownPlatformData.avgViews,
    });
  }

  competitors.forEach((comp) => {
    const platformData = comp.platforms.find(
      (p) => p.platform === selectedPlatform,
    );
    if (platformData) {
      tableRows.push({
        name: comp.name,
        avatar: comp.avatar,
        isOwn: false,
        followers: platformData.followers,
        engagementRate: platformData.engagementRate,
        postsPerWeek: platformData.postsPerWeek,
        avgViews: platformData.avgViews,
      });
    }
  });

  // Find best values for bold styling
  const bestFollowers = Math.max(...tableRows.map((r) => r.followers));
  const bestEngagement = Math.max(...tableRows.map((r) => r.engagementRate));
  const bestPostsPerWeek = Math.max(...tableRows.map((r) => r.postsPerWeek));
  const bestAvgViews = Math.max(...tableRows.map((r) => r.avgViews));

  return (
    <AnimatedCard>
      <Card className="gap-0 border-0 bg-secondary/50 py-0 shadow-none">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-lg">Wettbewerber-Vergleich</CardTitle>
          <CardDescription>Benchmark gegen ähnliche Creator</CardDescription>
        </CardHeader>

      <CardContent className="p-4">
        {/* Platform toggle */}
        <div className="flex items-center gap-1 mb-6 rounded-lg bg-background/50 border border-border/50 p-1 w-fit">
          {PLATFORMS.map((platform) => (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                selectedPlatform === platform
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {PLATFORM_CONFIG[platform].name}
            </button>
          ))}
        </div>

        {/* Bar chart */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Follower-Vergleich
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tickFormatter={(value: number) =>
                    formatCompactNumber(value)
                  }
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  width={50}
                />
                <Tooltip
                  formatter={(value: number) => [
                    formatCompactNumber(value),
                    "Follower",
                  ]}
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-card)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="followers" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={
                        entry.isOwn
                          ? OWN_COLOR
                          : COMPETITOR_COLORS[index - 1] ??
                            COMPETITOR_COLORS[0]
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparison table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Creator</TableHead>
              <TableHead className="text-right">Follower</TableHead>
              <TableHead className="text-right">Engagement</TableHead>
              <TableHead className="text-right">Posts/Woche</TableHead>
              <TableHead className="text-right">
                &Oslash; Aufrufe
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableRows.map((row) => (
              <TableRow
                key={row.name}
                className={row.isOwn ? "bg-primary/5" : ""}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className={`size-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        row.isOwn
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {row.avatar}
                    </div>
                    <span
                      className={`text-sm ${row.isOwn ? "font-semibold text-primary" : ""}`}
                    >
                      {row.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  className={`text-right text-sm ${
                    row.followers === bestFollowers ? "font-bold" : ""
                  }`}
                >
                  {formatCompactNumber(row.followers)}
                </TableCell>
                <TableCell
                  className={`text-right text-sm ${
                    row.engagementRate === bestEngagement ? "font-bold" : ""
                  }`}
                >
                  {row.engagementRate.toFixed(1)}%
                </TableCell>
                <TableCell
                  className={`text-right text-sm ${
                    row.postsPerWeek === bestPostsPerWeek ? "font-bold" : ""
                  }`}
                >
                  {row.postsPerWeek}
                </TableCell>
                <TableCell
                  className={`text-right text-sm ${
                    row.avgViews === bestAvgViews ? "font-bold" : ""
                  }`}
                >
                  {formatCompactNumber(row.avgViews)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </AnimatedCard>
  );
}
