import { useState } from "react";
import { MetricCard } from "~/components/dashboard/metric-card";
import { MetricsBarChart } from "~/components/dashboard/metrics-bar-chart";
import { AnimatedCard } from "~/components/dashboard/animated-card";
import { PlatformLineChart } from "~/components/dashboard/charts/platform-line-chart";
import { ContentTable } from "~/components/dashboard/content-table";
import { HashtagList } from "~/components/dashboard/hashtag-list";
import { DemographicsChart } from "~/components/dashboard/charts/demographics-chart";
import { CountriesList } from "~/components/dashboard/charts/countries-list";
import { TrafficSourcesChart } from "~/components/dashboard/charts/traffic-sources-chart";
import { TopVideosGrid } from "~/components/dashboard/top-videos-grid";
import { VideoDetailSheet } from "~/components/dashboard/video-detail-sheet";
import { CollapsibleSection } from "~/components/dashboard/collapsible-section";
import { Card, CardContent } from "~/components/ui/card";
import { PLATFORM_CONFIG } from "~/lib/mock-data/config";
import { useIsMobile } from "~/hooks/use-media-query";
import type { TikTokData, TikTokVideo } from "~/types/social-media";

const ACCENT = PLATFORM_CONFIG.tiktok.color;

const TOP_VIDEO_METRICS = [
  { key: "views", label: "Aufrufe" },
  { key: "likes", label: "Likes" },
  { key: "shares", label: "Shares" },
  { key: "comments", label: "Kommentare" },
  { key: "saves", label: "Gespeichert" },
];

const VIDEO_DETAIL_METRICS = [
  { label: "Aufrufe", key: "views" },
  { label: "Likes", key: "likes" },
  { label: "Shares", key: "shares" },
  { label: "Kommentare", key: "comments" },
  { label: "Gespeichert", key: "saves" },
  { label: "Ø Wiedergabe", key: "avgWatchTime", format: "text" as const },
  { label: "Vollst. %", key: "watchFullPercentage", format: "percentage" as const },
  { label: "Gepostet", key: "postedAt", format: "date" as const },
];

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
  const [selectedVideo, setSelectedVideo] = useState<TikTokVideo | null>(null);
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
            setSelectedVideo(item as unknown as TikTokVideo);
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
        platformName="TikTok"
      />

      {/* Hero Metrics: only 3 key numbers */}
      <AnimatedCard>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <MetricCard label="Follower" value={data.followers} change={data.followersChange} accentColor={ACCENT} />
          <MetricCard label="Aufrufe gesamt" value={data.totalViews} change={data.totalViewsChange} accentColor={ACCENT} />
          <MetricCard label="Engagement-Rate" value={data.engagementRate} change={data.engagementRateChange} format="percentage" accentColor={ACCENT} />
        </div>
      </AnimatedCard>

      {/* Engagement + Profil als Balkendiagramme */}
      <AnimatedCard delay={0.05}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <MetricsBarChart
            title="Engagement"
            accentColor={ACCENT}
            metrics={[
              { label: "Likes", value: data.likes, change: data.likesChange },
              { label: "Kommentare", value: data.comments, change: data.commentsChange },
              { label: "Shares", value: data.shares, change: data.sharesChange },
              { label: "Gespeichert", value: data.saves, change: data.savesChange },
            ]}
          />
          <MetricsBarChart
            title="Profil & Wiedergabe"
            accentColor={ACCENT}
            metrics={[
              { label: "Profilaufrufe", value: data.profileViews, change: data.profileViewsChange },
              { label: "Folge ich", value: data.following, format: "number" },
              { label: "Ø Wiedergabe", value: 0, textValue: data.avgWatchTime, format: "text" },
              { label: "Vollst. %", value: data.watchFullPercentage, change: data.watchFullPercentageChange, format: "percentage" },
            ]}
          />
        </div>
      </AnimatedCard>

      {/* Charts: Views Over Time + Followers Over Time */}
      <AnimatedCard delay={0.1}>
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

      {/* Traffic Sources + Device Breakdown side by side */}
      <AnimatedCard delay={0.1}>
        {isMobile ? (
          <CollapsibleSection title="Traffic & Geräte">
            <div className="space-y-6">
              <TrafficSourcesChart data={data.trafficSources} accentColor={ACCENT} />
              <div className="grid grid-cols-2 gap-3">
                {data.deviceBreakdown.map((device) => (
                  <Card key={device.device} className="border-0 bg-secondary/60 shadow-none">
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
          </CollapsibleSection>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <TrafficSourcesChart data={data.trafficSources} accentColor={ACCENT} />
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

      {/* Live Streams */}
      {data.liveStreams.length > 0 && (
        <AnimatedCard delay={0.1}>
          <ContentTable title="Livestreams" columns={LIVE_COLUMNS} data={data.liveStreams} />
        </AnimatedCard>
      )}
    </div>
  );
}
