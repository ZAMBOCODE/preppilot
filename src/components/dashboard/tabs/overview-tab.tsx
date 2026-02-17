import { MetricCard } from "~/components/dashboard/metric-card";
import { AnimatedCard } from "~/components/dashboard/animated-card";
import { FollowerGrowthChart } from "~/components/dashboard/charts/follower-growth-chart";
import { EngagementComparisonChart } from "~/components/dashboard/charts/engagement-comparison-chart";
import { DemographicsChart } from "~/components/dashboard/charts/demographics-chart";
import {
  PlatformDistributionChart,
  GrowthRadarChart,
  PostingHeatmap,
  CountriesList,
  EngagementPieChart,
  ViewsByLocation,
} from "~/components/dashboard/charts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { PLATFORM_CONFIG, PLATFORMS } from "~/lib/mock-data/config";
import { formatCompactNumber } from "~/lib/mock-data/helpers";
import { cn } from "~/lib/utils";
import type { OverviewData, Platform } from "~/types/social-media";
import type { ViewMode } from "~/components/dashboard/view-mode-toggle";

interface OverviewTabProps {
  data: OverviewData;
  viewMode: ViewMode;
}

// ── Helpers ────────────────────────────────────────────────────────

function buildDistributionData(record: Record<Platform, number>) {
  return Object.entries(record).map(([platform, count]) => ({
    name: PLATFORM_CONFIG[platform as Platform].name,
    value: count,
    color: PLATFORM_CONFIG[platform as Platform].color,
  }));
}

function buildReachDistribution(data: OverviewData) {
  const map: Record<string, number> = {};
  for (const item of data.reachByPlatform) {
    map[item.platform] = item.reach;
  }
  return Object.entries(map).map(([platform, value]) => ({
    name: PLATFORM_CONFIG[platform as Platform].name,
    value,
    color: PLATFORM_CONFIG[platform as Platform].color,
  }));
}

function buildImpressionsDistribution(data: OverviewData) {
  const map: Record<string, number> = {};
  for (const item of data.reachByPlatform) {
    map[item.platform] = item.impressions;
  }
  return Object.entries(map).map(([platform, value]) => ({
    name: PLATFORM_CONFIG[platform as Platform].name,
    value,
    color: PLATFORM_CONFIG[platform as Platform].color,
  }));
}

// ── Dashboard View ─────────────────────────────────────────────────

function DashboardView({ data }: { data: OverviewData }) {
  const followerDistribution = buildDistributionData(data.followersByPlatform);
  const reachDistribution = buildReachDistribution(data);

  return (
    <div className="space-y-8">
      {/* Row 1: 7 Key Metrics */}
      <AnimatedCard>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-7">
          <MetricCard
            label="Follower gesamt"
            value={data.totalFollowers}
            change={data.totalFollowersChange}
          />
          <MetricCard
            label="Engagement-Rate"
            value={data.totalEngagementRate}
            change={data.totalEngagementRateChange}
            format="percentage"
          />
          <MetricCard
            label="Top-Plattform"
            value={PLATFORM_CONFIG[data.topPerformingPlatform].name}
            accentColor={PLATFORM_CONFIG[data.topPerformingPlatform].color}
          />
          <MetricCard
            label="Beiträge gesamt"
            value={data.totalPosts}
            change={data.totalPostsChange}
          />
          <MetricCard
            label="Reichweite gesamt"
            value={data.totalReach}
            change={data.totalReachChange}
          />
          <MetricCard
            label="Impressionen gesamt"
            value={data.totalImpressions}
            change={data.totalImpressionsChange}
          />
          <MetricCard
            label="Video-Aufrufe"
            value={data.totalVideoViews}
            change={data.totalVideoViewsChange}
          />
        </div>
      </AnimatedCard>

      {/* Row 2: 3 Engagement Metrics */}
      <AnimatedCard delay={0.05}>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          <MetricCard
            label="Likes gesamt"
            value={data.totalLikes}
            change={data.totalLikesChange}
          />
          <MetricCard
            label="Kommentare gesamt"
            value={data.totalComments}
            change={data.totalCommentsChange}
          />
          <MetricCard
            label="Shares gesamt"
            value={data.totalShares}
            change={data.totalSharesChange}
          />
        </div>
      </AnimatedCard>

      {/* Row 3: Follower Growth + Follower Distribution */}
      <AnimatedCard delay={0.1}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <FollowerGrowthChart data={data.followerGrowth} />
          </div>
          <div className="lg:col-span-2">
            <PlatformDistributionChart
              title="Follower nach Plattform"
              data={followerDistribution}
            />
          </div>
        </div>
      </AnimatedCard>

      {/* Row 4: Engagement Comparison + Engagement Pie */}
      <AnimatedCard delay={0.15}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <EngagementComparisonChart data={data.engagementComparison} />
          <EngagementPieChart data={data.engagementByType} />
        </div>
      </AnimatedCard>

      {/* Row 5: Growth Radar + Reach Distribution */}
      <AnimatedCard delay={0.2}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <GrowthRadarChart data={data.platformRadar} />
          <PlatformDistributionChart
            title="Reichweite nach Plattform"
            data={reachDistribution}
          />
        </div>
      </AnimatedCard>

      {/* Row 6: Posting Heatmap */}
      <AnimatedCard delay={0.1}>
        <PostingHeatmap data={data.activeHours} />
      </AnimatedCard>

      {/* Row 7: Demographics + Countries */}
      <AnimatedCard delay={0.1}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <h3 className="font-heading mb-4 text-lg font-semibold">Zielgruppen-Demografie</h3>
            <DemographicsChart
              ageGroups={data.audienceDemographics.ageGroups}
              gender={data.audienceDemographics.gender}
            />
          </div>
          <div>
            <h3 className="font-heading mb-4 text-lg font-semibold">Top Länder</h3>
            <CountriesList data={data.audienceDemographics.topCountries} />
          </div>
        </div>
      </AnimatedCard>

      {/* Row 8: Views by Location */}
      <AnimatedCard delay={0.1}>
        <div>
          <h3 className="font-heading mb-4 text-lg font-semibold">Aufrufe nach Standort</h3>
          <ViewsByLocation countries={data.viewsByCountry} cities={data.viewsByCityTop} />
        </div>
      </AnimatedCard>

      {/* Row 9: Top Content Cross-Platform */}
      <AnimatedCard delay={0.1}>
        <div>
          <h3 className="font-heading mb-4 text-lg font-semibold">Beste Inhalte plattformübergreifend</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.topContentCrossPlatform.map((item) => (
              <Card key={item.id} className="border-0 bg-secondary/50 shadow-none">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="size-2 rounded-full"
                        style={{ backgroundColor: PLATFORM_CONFIG[item.platform].color }}
                      />
                      <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                        {PLATFORM_CONFIG[item.platform].name}
                      </span>
                    </div>
                    <p className="font-heading text-sm font-semibold leading-snug line-clamp-2">
                      {item.title}
                    </p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-muted-foreground text-xs">{item.metric}</span>
                      <span className="font-heading text-base font-semibold tabular-nums">
                        {formatCompactNumber(item.value)}
                      </span>
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {new Date(item.postedAt).toLocaleDateString("de-DE", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
}

// ── Charts View ────────────────────────────────────────────────────

function ChartsView({ data }: { data: OverviewData }) {
  const followerDistribution = buildDistributionData(data.followersByPlatform);
  const reachDistribution = buildReachDistribution(data);
  const impressionsDistribution = buildImpressionsDistribution(data);

  return (
    <div className="space-y-8">
      {/* Follower Growth - full width */}
      <AnimatedCard>
        <FollowerGrowthChart data={data.followerGrowth} />
      </AnimatedCard>

      {/* 3 columns: Followers / Reach / Impressions distribution */}
      <AnimatedCard delay={0.05}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <PlatformDistributionChart
            title="Follower nach Plattform"
            data={followerDistribution}
          />
          <PlatformDistributionChart
            title="Reichweite nach Plattform"
            data={reachDistribution}
          />
          <PlatformDistributionChart
            title="Impressionen nach Plattform"
            data={impressionsDistribution}
          />
        </div>
      </AnimatedCard>

      {/* Engagement Comparison + Engagement Pie side by side */}
      <AnimatedCard delay={0.1}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <EngagementComparisonChart data={data.engagementComparison} />
          <EngagementPieChart data={data.engagementByType} />
        </div>
      </AnimatedCard>

      {/* Growth Radar - full width */}
      <AnimatedCard delay={0.1}>
        <GrowthRadarChart data={data.platformRadar} />
      </AnimatedCard>

      {/* Posting Heatmap - full width */}
      <AnimatedCard delay={0.1}>
        <PostingHeatmap data={data.activeHours} />
      </AnimatedCard>

      {/* Demographics + Countries side by side */}
      <AnimatedCard delay={0.1}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <h3 className="font-heading mb-4 text-lg font-semibold">Zielgruppen-Demografie</h3>
            <DemographicsChart
              ageGroups={data.audienceDemographics.ageGroups}
              gender={data.audienceDemographics.gender}
            />
          </div>
          <div>
            <h3 className="font-heading mb-4 text-lg font-semibold">Top Länder</h3>
            <CountriesList data={data.audienceDemographics.topCountries} />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
}

// ── Comparison View ────────────────────────────────────────────────

interface ComparisonRow {
  metric: string;
  values: Record<Platform, string | number>;
  rawValues: Record<Platform, number>;
  format?: "number" | "percentage" | "text";
}

function ComparisonView({ data }: { data: OverviewData }) {
  const platformFollowers = data.followersByPlatform;

  const engagementByPlatform: Record<Platform, number> = {} as Record<Platform, number>;
  const reachByPlatform: Record<Platform, number> = {} as Record<Platform, number>;
  const impressionsByPlatform: Record<Platform, number> = {} as Record<Platform, number>;
  const postsByPlatform: Record<Platform, number> = {} as Record<Platform, number>;
  const bestPostTimeByPlatform: Record<Platform, string> = {} as Record<Platform, string>;
  const avgEngagementByPlatform: Record<Platform, number> = {} as Record<Platform, number>;

  for (const item of data.engagementComparison) {
    engagementByPlatform[item.platform] = item.rate;
  }
  for (const item of data.reachByPlatform) {
    reachByPlatform[item.platform] = item.reach;
    impressionsByPlatform[item.platform] = item.impressions;
  }
  for (const item of data.contentPerformance) {
    postsByPlatform[item.platform] = item.posts;
    bestPostTimeByPlatform[item.platform] = item.bestPostTime;
    avgEngagementByPlatform[item.platform] = item.avgEngagement;
  }

  const rows: ComparisonRow[] = [
    {
      metric: "Follower",
      values: Object.fromEntries(
        PLATFORMS.map((p) => [p, formatCompactNumber(platformFollowers[p] ?? 0)]),
      ) as Record<Platform, string>,
      rawValues: Object.fromEntries(
        PLATFORMS.map((p) => [p, platformFollowers[p] ?? 0]),
      ) as Record<Platform, number>,
    },
    {
      metric: "Engagement-Rate",
      values: Object.fromEntries(
        PLATFORMS.map((p) => [p, `${engagementByPlatform[p] ?? 0}%`]),
      ) as Record<Platform, string>,
      rawValues: Object.fromEntries(
        PLATFORMS.map((p) => [p, engagementByPlatform[p] ?? 0]),
      ) as Record<Platform, number>,
      format: "percentage",
    },
    {
      metric: "Reichweite",
      values: Object.fromEntries(
        PLATFORMS.map((p) => [p, formatCompactNumber(reachByPlatform[p] ?? 0)]),
      ) as Record<Platform, string>,
      rawValues: Object.fromEntries(
        PLATFORMS.map((p) => [p, reachByPlatform[p] ?? 0]),
      ) as Record<Platform, number>,
    },
    {
      metric: "Impressionen",
      values: Object.fromEntries(
        PLATFORMS.map((p) => [p, formatCompactNumber(impressionsByPlatform[p] ?? 0)]),
      ) as Record<Platform, string>,
      rawValues: Object.fromEntries(
        PLATFORMS.map((p) => [p, impressionsByPlatform[p] ?? 0]),
      ) as Record<Platform, number>,
    },
    {
      metric: "Beiträge",
      values: Object.fromEntries(
        PLATFORMS.map((p) => [p, postsByPlatform[p] ?? 0]),
      ) as Record<Platform, string | number>,
      rawValues: Object.fromEntries(
        PLATFORMS.map((p) => [p, postsByPlatform[p] ?? 0]),
      ) as Record<Platform, number>,
    },
    {
      metric: "Beste Postzeit",
      values: Object.fromEntries(
        PLATFORMS.map((p) => [p, bestPostTimeByPlatform[p] ?? "-"]),
      ) as Record<Platform, string>,
      rawValues: Object.fromEntries(
        PLATFORMS.map((p) => [p, 0]),
      ) as Record<Platform, number>,
      format: "text",
    },
    {
      metric: "Ø Engagement",
      values: Object.fromEntries(
        PLATFORMS.map((p) => [p, `${avgEngagementByPlatform[p] ?? 0}%`]),
      ) as Record<Platform, string>,
      rawValues: Object.fromEntries(
        PLATFORMS.map((p) => [p, avgEngagementByPlatform[p] ?? 0]),
      ) as Record<Platform, number>,
      format: "percentage",
    },
  ];

  function getBestPlatform(row: ComparisonRow): Platform | null {
    if (row.format === "text") return null;
    let best: Platform | null = null;
    let bestVal = -Infinity;
    for (const p of PLATFORMS) {
      const val = row.rawValues[p] ?? 0;
      if (val > bestVal) {
        bestVal = val;
        best = p;
      }
    }
    return best;
  }

  return (
    <AnimatedCard>
      <Card className="border-0 bg-secondary/50 shadow-none">
        <CardHeader>
          <CardTitle className="font-heading text-lg font-semibold">
            Plattform-Vergleich
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[160px]">Metrik</TableHead>
              {PLATFORMS.map((p) => (
                <TableHead key={p}>
                  <div className="flex items-center gap-2">
                    <div
                      className="size-2 rounded-full"
                      style={{ backgroundColor: PLATFORM_CONFIG[p].color }}
                    />
                    {PLATFORM_CONFIG[p].name}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const best = getBestPlatform(row);
              return (
                <TableRow key={row.metric}>
                  <TableCell className="font-medium">{row.metric}</TableCell>
                  {PLATFORMS.map((p) => {
                    const isBest = best === p;
                    return (
                      <TableCell
                        key={p}
                        className={cn("tabular-nums", isBest && "font-bold")}
                        style={{
                          backgroundColor: `${PLATFORM_CONFIG[p].color}08`,
                        }}
                      >
                        {row.values[p]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AnimatedCard>
  );
}

// ── Main Component ─────────────────────────────────────────────────

export function OverviewTab({ data, viewMode }: OverviewTabProps) {
  switch (viewMode) {
    case "charts":
      return <ChartsView data={data} />;
    case "comparison":
      return <ComparisonView data={data} />;
    case "dashboard":
    default:
      return <DashboardView data={data} />;
  }
}
