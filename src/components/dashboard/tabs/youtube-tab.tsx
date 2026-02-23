import { useState } from "react";
import { MetricCard } from "~/components/dashboard/metric-card";
import { MetricsBarChart } from "~/components/dashboard/metrics-bar-chart";
import { AnimatedCard } from "~/components/dashboard/animated-card";
import { PlatformLineChart } from "~/components/dashboard/charts/platform-line-chart";
import { ContentTable } from "~/components/dashboard/content-table";
import { DemographicsChart } from "~/components/dashboard/charts/demographics-chart";
import { CountriesList } from "~/components/dashboard/charts/countries-list";
import { TrafficSourcesChart } from "~/components/dashboard/charts/traffic-sources-chart";
import { TopVideosGrid } from "~/components/dashboard/top-videos-grid";
import { VideoDetailSheet } from "~/components/dashboard/video-detail-sheet";
import { CollapsibleSection } from "~/components/dashboard/collapsible-section";
import { PLATFORM_CONFIG } from "~/lib/mock-data/config";
import { useIsMobile } from "~/hooks/use-media-query";
import type { YouTubeData, YouTubeVideo } from "~/types/social-media";

const ACCENT = PLATFORM_CONFIG.youtube.color;

const TOP_VIDEO_METRICS = [
  { key: "views", label: "Aufrufe" },
  { key: "likes", label: "Likes" },
  { key: "comments", label: "Kommentare" },
  { key: "watchTimeHours", label: "Wiedergabezeit" },
  { key: "ctr", label: "CTR", format: "percentage" as const },
];

const VIDEO_DETAIL_METRICS = [
  { label: "Aufrufe", key: "views" },
  { label: "Likes", key: "likes" },
  { label: "Dislikes", key: "dislikes" },
  { label: "Kommentare", key: "comments" },
  { label: "Wiedergabezeit (h)", key: "watchTimeHours" },
  { label: "Ø Dauer", key: "avgViewDuration", format: "text" as const },
  { label: "Ø Wiedergabe %", key: "avgViewPercentage", format: "percentage" as const },
  { label: "Impressionen", key: "impressions" },
  { label: "CTR %", key: "ctr", format: "percentage" as const },
  { label: "Veröffentlicht", key: "publishedAt", format: "date" as const },
];

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
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Top 5 Videos */}
      <AnimatedCard>
        <TopVideosGrid
          title="Top 5 Videos"
          items={data.videoPerformance}
          metricOptions={TOP_VIDEO_METRICS}
          accentColor={ACCENT}
          onItemClick={(item) => {
            setSelectedVideo(item as unknown as YouTubeVideo);
            setSheetOpen(true);
          }}
        />
      </AnimatedCard>

      <VideoDetailSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        video={selectedVideo as unknown as Record<string, unknown>}
        metrics={VIDEO_DETAIL_METRICS}
        accentColor={ACCENT}
        platformName="YouTube"
      />

      {/* Hero Metrics: 3 key numbers */}
      <AnimatedCard>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <MetricCard label="Abonnenten" value={data.subscribers} change={data.subscribersChange} accentColor={ACCENT} />
          <MetricCard label="Aufrufe gesamt" value={data.totalViews} change={data.totalViewsChange} accentColor={ACCENT} />
          <MetricCard label="Wiedergabezeit (h)" value={data.watchTimeHours} change={data.watchTimeChange} accentColor={ACCENT} />
        </div>
      </AnimatedCard>

      {/* Engagement + Wiedergabe als Balkendiagramme */}
      <AnimatedCard delay={0.05}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <MetricsBarChart
            title="Engagement"
            accentColor={ACCENT}
            metrics={[
              { label: "Likes", value: data.likes, change: data.likesChange },
              { label: "Kommentare", value: data.comments, change: data.commentsChange },
              { label: "Shares", value: data.shares, change: data.sharesChange },
              { label: "Impressionen", value: data.impressions, change: data.impressionsChange },
              { label: "CTR", value: data.clickThroughRate, change: data.clickThroughRateChange, format: "percentage" },
            ]}
          />
          <MetricsBarChart
            title="Einnahmen"
            accentColor={ACCENT}
            metrics={[
              { label: "Einnahmen", value: data.estimatedRevenue, change: data.estimatedRevenueChange, format: "currency" },
              { label: "RPM", value: data.rpm, format: "currency" },
              { label: "CPM", value: data.cpm, format: "currency" },
              { label: "Anzeigen-Impr.", value: data.adImpressions },
              { label: "Ø Wiedergabe %", value: data.avgViewPercentage, format: "percentage" },
            ]}
          />
        </div>
      </AnimatedCard>

      {/* Charts: 2x2 */}
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

      {/* Traffic Sources + Viewer Types + Devices */}
      <AnimatedCard delay={0.1}>
        {isMobile ? (
          <CollapsibleSection title="Traffic & Zuschauertypen">
            <div className="space-y-6">
              <TrafficSourcesChart data={data.trafficSources} accentColor={ACCENT} />
              <MetricsBarChart
                title="Zuschauertypen"
                accentColor={ACCENT}
                metrics={data.viewerTypes.map((vt) => ({
                  label: vt.type,
                  value: vt.percentage,
                  format: "percentage" as const,
                }))}
              />
              <MetricsBarChart
                title="Geräteverteilung"
                accentColor={ACCENT}
                metrics={data.deviceBreakdown.map((d) => ({
                  label: d.device,
                  value: d.percentage,
                  format: "percentage" as const,
                }))}
              />
            </div>
          </CollapsibleSection>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <TrafficSourcesChart data={data.trafficSources} accentColor={ACCENT} />
            <MetricsBarChart
              title="Zuschauertypen"
              accentColor={ACCENT}
              metrics={data.viewerTypes.map((vt) => ({
                label: vt.type,
                value: vt.percentage,
                format: "percentage" as const,
              }))}
            />
            <MetricsBarChart
              title="Geräteverteilung"
              accentColor={ACCENT}
              metrics={data.deviceBreakdown.map((d) => ({
                label: d.device,
                value: d.percentage,
                format: "percentage" as const,
              }))}
            />
          </div>
        )}
      </AnimatedCard>

      {/* Audience Demographics + Countries */}
      <AnimatedCard delay={0.1}>
        {isMobile ? (
          <CollapsibleSection title="Zielgruppe & Länder">
            <div className="space-y-6">
              <DemographicsChart
                ageGroups={data.audienceDemographics.ageGroups}
                gender={data.audienceDemographics.gender}
                accentColor={ACCENT}
              />
              <CountriesList data={data.audienceDemographics.topCountries} accentColor={ACCENT} />
            </div>
          </CollapsibleSection>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <h3 className="font-heading mb-4 text-lg font-semibold">Zielgruppe</h3>
              <DemographicsChart
                ageGroups={data.audienceDemographics.ageGroups}
                gender={data.audienceDemographics.gender}
                accentColor={ACCENT}
              />
            </div>
            <CountriesList data={data.audienceDemographics.topCountries} accentColor={ACCENT} />
          </div>
        )}
      </AnimatedCard>

      {/* Top Search Terms */}
      <AnimatedCard delay={0.1}>
        <ContentTable title="Top-Suchbegriffe" columns={SEARCH_COLUMNS} data={data.topSearchTerms} />
      </AnimatedCard>
    </div>
  );
}
