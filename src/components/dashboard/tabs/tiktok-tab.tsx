import { MetricCard } from "~/components/dashboard/metric-card";
import { AnimatedCard } from "~/components/dashboard/animated-card";
import { PlatformLineChart } from "~/components/dashboard/charts/platform-line-chart";
import { ContentTable } from "~/components/dashboard/content-table";
import { HashtagList } from "~/components/dashboard/hashtag-list";
import { DemographicsChart } from "~/components/dashboard/charts/demographics-chart";
import { CountriesList } from "~/components/dashboard/charts/countries-list";
import { TrafficSourcesChart } from "~/components/dashboard/charts/traffic-sources-chart";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { PLATFORM_CONFIG } from "~/lib/mock-data/config";
import { formatCompactNumber } from "~/lib/mock-data/helpers";
import type { TikTokData } from "~/types/social-media";

const ACCENT = PLATFORM_CONFIG.tiktok.color;

const VIDEO_COLUMNS = [
  { key: "title", label: "Video", format: "text" as const },
  { key: "views", label: "Aufrufe", format: "compact" as const },
  { key: "likes", label: "Likes", format: "compact" as const },
  { key: "shares", label: "Shares", format: "compact" as const },
  { key: "comments", label: "Kommentare", format: "compact" as const },
  { key: "saves", label: "Gespeichert", format: "compact" as const },
  { key: "avgWatchTime", label: "Ø Wiedergabe", format: "text" as const },
  { key: "watchFullPercentage", label: "Vollst. %", format: "text" as const },
  { key: "postedAt", label: "Gepostet", format: "date" as const },
];

const LIVE_COLUMNS = [
  { key: "title", label: "Stream", format: "text" as const },
  { key: "peakViewers", label: "Max. Zuschauer", format: "compact" as const },
  { key: "totalViewers", label: "Zuschauer gesamt", format: "compact" as const },
  { key: "duration", label: "Dauer", format: "text" as const },
  { key: "diamonds", label: "Diamanten", format: "compact" as const },
  { key: "newFollowers", label: "Neue Follower", format: "compact" as const },
  { key: "date", label: "Datum", format: "date" as const },
];

interface TikTokTabProps {
  data: TikTokData;
}

export function TikTokTab({ data }: TikTokTabProps) {
  return (
    <div className="space-y-8">
      {/* Row 1: Key Metrics */}
      <AnimatedCard>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
          <MetricCard label="Follower" value={data.followers} change={data.followersChange} accentColor={ACCENT} />
          <MetricCard label="Folge ich" value={data.following} format="number" accentColor={ACCENT} />
          <MetricCard label="Profilaufrufe" value={data.profileViews} change={data.profileViewsChange} accentColor={ACCENT} />
          <MetricCard label="Aufrufe gesamt" value={data.totalViews} change={data.totalViewsChange} accentColor={ACCENT} />
          <MetricCard label="Likes gesamt" value={data.likes} change={data.likesChange} accentColor={ACCENT} />
          <MetricCard label="Kommentare" value={data.comments} change={data.commentsChange} accentColor={ACCENT} />
          <MetricCard label="Shares" value={data.shares} change={data.sharesChange} accentColor={ACCENT} />
          <MetricCard label="Gespeichert" value={data.saves} change={data.savesChange} accentColor={ACCENT} />
          <MetricCard label="Engagement-Rate" value={data.engagementRate} change={data.engagementRateChange} format="percentage" accentColor={ACCENT} />
          <MetricCard label="Ø Wiedergabezeit" value={data.avgWatchTime} accentColor={ACCENT} />
          <MetricCard label="Vollst. angesehen %" value={data.watchFullPercentage} change={data.watchFullPercentageChange} format="percentage" accentColor={ACCENT} />
        </div>
      </AnimatedCard>

      {/* Charts: Views Over Time + Followers Over Time */}
      <AnimatedCard delay={0.05}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PlatformLineChart title="Aufrufe über Zeit" data={data.viewsOverTime} color={ACCENT} />
          <PlatformLineChart title="Follower über Zeit" data={data.followersOverTime} color={ACCENT} />
        </div>
      </AnimatedCard>

      {/* Video Performance Table */}
      <AnimatedCard delay={0.1}>
        <ContentTable title="Video-Performance" columns={VIDEO_COLUMNS} data={data.videoPerformance} />
      </AnimatedCard>

      {/* Trending Hashtags */}
      <AnimatedCard delay={0.1}>
        <HashtagList hashtags={data.trendingHashtags} />
      </AnimatedCard>

      {/* Audience Demographics */}
      <AnimatedCard delay={0.1}>
        <div>
          <h3 className="font-heading mb-4 text-lg font-semibold">Zielgruppe</h3>
          <DemographicsChart
            ageGroups={data.audienceDemographics.ageGroups}
            gender={data.audienceDemographics.gender}
            accentColor={ACCENT}
          />
        </div>
      </AnimatedCard>

      {/* Top Countries */}
      <AnimatedCard delay={0.1}>
        <CountriesList data={data.audienceDemographics.topCountries} accentColor={ACCENT} />
      </AnimatedCard>

      {/* Traffic Sources */}
      <AnimatedCard delay={0.1}>
        <TrafficSourcesChart data={data.trafficSources} accentColor={ACCENT} />
      </AnimatedCard>

      {/* Device Breakdown */}
      <AnimatedCard delay={0.1}>
        <div>
          <h3 className="font-heading mb-4 text-lg font-semibold">Geräteverteilung</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {data.deviceBreakdown.map((device) => (
              <Card key={device.device} className="border-0 bg-secondary/50 shadow-none">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                      {device.device}
                    </span>
                    <span className="font-heading text-2xl font-semibold tabular-nums">
                      {device.percentage}%
                    </span>
                    <div className="bg-muted h-1.5 overflow-hidden rounded-full">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${device.percentage}%`, backgroundColor: ACCENT, opacity: 0.7 }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedCard>

      {/* Live Streams */}
      {data.liveStreams.length > 0 && (
        <AnimatedCard delay={0.1}>
          <ContentTable title="Livestreams" columns={LIVE_COLUMNS} data={data.liveStreams} />
        </AnimatedCard>
      )}
    </div>
  );
}
