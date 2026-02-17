import { MetricCard } from "~/components/dashboard/metric-card";
import { AnimatedCard } from "~/components/dashboard/animated-card";
import { PlatformLineChart } from "~/components/dashboard/charts/platform-line-chart";
import { ContentTable } from "~/components/dashboard/content-table";
import { DemographicsChart } from "~/components/dashboard/charts/demographics-chart";
import { CountriesList } from "~/components/dashboard/charts/countries-list";
import { TrafficSourcesChart } from "~/components/dashboard/charts/traffic-sources-chart";
import { Card, CardContent } from "~/components/ui/card";
import { PLATFORM_CONFIG } from "~/lib/mock-data/config";
import type { YouTubeData } from "~/types/social-media";

const ACCENT = PLATFORM_CONFIG.youtube.color;

const VIDEO_COLUMNS = [
  { key: "title", label: "Video", format: "text" as const },
  { key: "views", label: "Aufrufe", format: "compact" as const },
  { key: "likes", label: "Likes", format: "compact" as const },
  { key: "dislikes", label: "Dislikes", format: "compact" as const },
  { key: "comments", label: "Kommentare", format: "compact" as const },
  { key: "watchTimeHours", label: "Wiedergabe (h)", format: "compact" as const },
  { key: "avgViewDuration", label: "Ø Dauer", format: "text" as const },
  { key: "avgViewPercentage", label: "Ø %", format: "text" as const },
  { key: "impressions", label: "Impressionen", format: "compact" as const },
  { key: "ctr", label: "CTR %", format: "text" as const },
  { key: "publishedAt", label: "Veröffentlicht", format: "date" as const },
];

const SEARCH_COLUMNS = [
  { key: "term", label: "Suchbegriff", format: "text" as const },
  { key: "views", label: "Aufrufe", format: "compact" as const },
  { key: "impressions", label: "Impressionen", format: "compact" as const },
];

interface YouTubeTabProps {
  data: YouTubeData;
}

export function YouTubeTab({ data }: YouTubeTabProps) {
  return (
    <div className="space-y-8">
      {/* Channel Metrics */}
      <AnimatedCard>
        <div>
          <h3 className="font-heading mb-4 text-lg font-semibold">Kanal</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            <MetricCard label="Abonnenten" value={data.subscribers} change={data.subscribersChange} accentColor={ACCENT} />
            <MetricCard label="Aufrufe gesamt" value={data.totalViews} change={data.totalViewsChange} accentColor={ACCENT} />
            <MetricCard label="Wiedergabezeit (h)" value={data.watchTimeHours} change={data.watchTimeChange} accentColor={ACCENT} />
            <MetricCard label="Likes" value={data.likes} change={data.likesChange} accentColor={ACCENT} />
            <MetricCard label="Kommentare" value={data.comments} change={data.commentsChange} accentColor={ACCENT} />
            <MetricCard label="Shares" value={data.shares} change={data.sharesChange} accentColor={ACCENT} />
            <MetricCard label="Ø Dauer" value={data.averageViewDuration} accentColor={ACCENT} />
            <MetricCard label="Ø Wiedergabe %" value={data.avgViewPercentage} format="percentage" accentColor={ACCENT} />
            <MetricCard label="Impressionen" value={data.impressions} change={data.impressionsChange} accentColor={ACCENT} />
            <MetricCard label="CTR" value={data.clickThroughRate} change={data.clickThroughRateChange} format="percentage" accentColor={ACCENT} />
            <MetricCard label="Einzigartige Zuschauer" value={data.uniqueViewers} change={data.uniqueViewersChange} accentColor={ACCENT} />
          </div>
        </div>
      </AnimatedCard>

      {/* Revenue Section */}
      <AnimatedCard delay={0.05}>
        <div>
          <h3 className="font-heading mb-4 text-lg font-semibold">Einnahmen</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <MetricCard label="Gesch. Einnahmen" value={`$${data.estimatedRevenue.toLocaleString()}`} change={data.estimatedRevenueChange} accentColor={ACCENT} />
            <MetricCard label="RPM" value={`$${data.rpm.toFixed(2)}`} accentColor={ACCENT} />
            <MetricCard label="CPM" value={`$${data.cpm.toFixed(2)}`} accentColor={ACCENT} />
            <MetricCard label="Anzeigen-Impressionen" value={data.adImpressions} accentColor={ACCENT} />
          </div>
        </div>
      </AnimatedCard>

      {/* Charts: 2x2 Grid */}
      <AnimatedCard delay={0.1}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PlatformLineChart title="Aufrufe über Zeit" data={data.viewsOverTime} color={ACCENT} />
          <PlatformLineChart title="Wiedergabezeit über Zeit" data={data.watchTimeOverTime} color={ACCENT} />
          <PlatformLineChart title="Abonnenten über Zeit" data={data.subscribersOverTime} color={ACCENT} />
          <PlatformLineChart title="Einnahmen über Zeit" data={data.revenueOverTime} color={ACCENT} />
        </div>
      </AnimatedCard>

      {/* Video Performance Table */}
      <AnimatedCard delay={0.1}>
        <ContentTable title="Video-Performance" columns={VIDEO_COLUMNS} data={data.videoPerformance} />
      </AnimatedCard>

      {/* Traffic Sources */}
      <AnimatedCard delay={0.1}>
        <TrafficSourcesChart data={data.trafficSources} accentColor={ACCENT} />
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

      {/* Viewer Types */}
      <AnimatedCard delay={0.1}>
        <div>
          <h3 className="font-heading mb-4 text-lg font-semibold">Zuschauertypen</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {data.viewerTypes.map((vt) => (
              <Card key={vt.type} className="border-0 bg-secondary/50 shadow-none">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                      {vt.type}
                    </span>
                    <span className="font-heading text-2xl font-semibold tabular-nums">
                      {vt.percentage}%
                    </span>
                    <div className="bg-muted h-1.5 overflow-hidden rounded-full">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${vt.percentage}%`, backgroundColor: ACCENT, opacity: 0.7 }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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

      {/* Top Search Terms */}
      <AnimatedCard delay={0.1}>
        <ContentTable title="Top-Suchbegriffe" columns={SEARCH_COLUMNS} data={data.topSearchTerms} />
      </AnimatedCard>
    </div>
  );
}
