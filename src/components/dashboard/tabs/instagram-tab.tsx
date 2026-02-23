import { useState } from "react";
import { MetricCard } from "~/components/dashboard/metric-card";
import { MetricsBarChart } from "~/components/dashboard/metrics-bar-chart";
import { AnimatedCard } from "~/components/dashboard/animated-card";
import { PlatformLineChart } from "~/components/dashboard/charts/platform-line-chart";
import { EngagementPieChart } from "~/components/dashboard/charts/engagement-pie-chart";
import { ContentTable } from "~/components/dashboard/content-table";
import { DemographicsChart } from "~/components/dashboard/charts/demographics-chart";
import { CountriesList } from "~/components/dashboard/charts/countries-list";
import { TopVideosGrid } from "~/components/dashboard/top-videos-grid";
import { VideoDetailSheet } from "~/components/dashboard/video-detail-sheet";
import { CollapsibleSection } from "~/components/dashboard/collapsible-section";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { PLATFORM_CONFIG } from "~/lib/mock-data/config";
import { useIsMobile } from "~/hooks/use-media-query";
import type { InstagramData } from "~/types/social-media";

const ACCENT = PLATFORM_CONFIG.instagram.color;

type ContentType = "reels" | "stories" | "posts";

const REEL_METRIC_OPTIONS = [
  { key: "views", label: "Aufrufe" },
  { key: "likes", label: "Likes" },
  { key: "comments", label: "Kommentare" },
  { key: "saves", label: "Gespeichert" },
  { key: "shares", label: "Shares" },
];

const STORY_METRIC_OPTIONS = [
  { key: "impressions", label: "Impressionen" },
  { key: "reach", label: "Reichweite" },
  { key: "replies", label: "Antworten" },
];

const POST_METRIC_OPTIONS = [
  { key: "likes", label: "Likes" },
  { key: "comments", label: "Kommentare" },
  { key: "saves", label: "Gespeichert" },
  { key: "reach", label: "Reichweite" },
];

const REEL_DETAIL_METRICS = [
  { label: "Aufrufe", key: "views" },
  { label: "Likes", key: "likes" },
  { label: "Kommentare", key: "comments" },
  { label: "Gespeichert", key: "saves" },
  { label: "Shares", key: "shares" },
  { label: "Reichweite", key: "reach" },
  { label: "Gepostet", key: "postedAt", format: "date" as const },
];

const STORY_DETAIL_METRICS = [
  { label: "Impressionen", key: "impressions" },
  { label: "Reichweite", key: "reach" },
  { label: "Ausstiege", key: "exits" },
  { label: "Antworten", key: "replies" },
  { label: "Weiter getippt", key: "tapsForward" },
  { label: "Zurück getippt", key: "tapsBack" },
  { label: "Gepostet", key: "postedAt", format: "date" as const },
];

const POST_DETAIL_METRICS = [
  { label: "Typ", key: "type", format: "text" as const },
  { label: "Likes", key: "likes" },
  { label: "Kommentare", key: "comments" },
  { label: "Gespeichert", key: "saves" },
  { label: "Shares", key: "shares" },
  { label: "Reichweite", key: "reach" },
  { label: "Impressionen", key: "impressions" },
  { label: "Gepostet", key: "postedAt", format: "date" as const },
];

const STORY_COLUMNS = [
  { key: "title", label: "Story", format: "text" as const },
  { key: "impressions", label: "Impressionen", format: "compact" as const },
  { key: "reach", label: "Reichweite", format: "compact" as const },
  { key: "exits", label: "Ausstiege", format: "compact" as const },
  { key: "replies", label: "Antworten", format: "compact" as const },
  { key: "tapsForward", label: "Weiter getippt", format: "compact" as const },
  { key: "tapsBack", label: "Zurück getippt", format: "compact" as const },
  { key: "postedAt", label: "Gepostet", format: "date" as const },
];

const REEL_COLUMNS = [
  { key: "title", label: "Reel", format: "text" as const },
  { key: "views", label: "Aufrufe", format: "compact" as const },
  { key: "likes", label: "Likes", format: "compact" as const },
  { key: "comments", label: "Kommentare", format: "compact" as const },
  { key: "saves", label: "Gespeichert", format: "compact" as const },
  { key: "shares", label: "Shares", format: "compact" as const },
  { key: "reach", label: "Reichweite", format: "compact" as const },
  { key: "postedAt", label: "Gepostet", format: "date" as const },
];

const POST_COLUMNS = [
  { key: "title", label: "Beitrag", format: "text" as const },
  { key: "type", label: "Typ", format: "text" as const },
  { key: "likes", label: "Likes", format: "compact" as const },
  { key: "comments", label: "Kommentare", format: "compact" as const },
  { key: "saves", label: "Gespeichert", format: "compact" as const },
  { key: "shares", label: "Shares", format: "compact" as const },
  { key: "reach", label: "Reichweite", format: "compact" as const },
  { key: "impressions", label: "Impressionen", format: "compact" as const },
  { key: "postedAt", label: "Gepostet", format: "date" as const },
];

interface InstagramTabProps {
  data: InstagramData;
}

export function InstagramTab({ data }: InstagramTabProps) {
  const [contentType, setContentType] = useState<ContentType>("reels");
  const [selectedItem, setSelectedItem] = useState<Record<string, unknown> | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const isMobile = useIsMobile();

  const currentItems = contentType === "reels"
    ? data.reelsPerformance
    : contentType === "stories"
      ? data.stories
      : data.topPosts;

  const currentMetricOptions = contentType === "reels"
    ? REEL_METRIC_OPTIONS
    : contentType === "stories"
      ? STORY_METRIC_OPTIONS
      : POST_METRIC_OPTIONS;

  const currentDetailMetrics = contentType === "reels"
    ? REEL_DETAIL_METRICS
    : contentType === "stories"
      ? STORY_DETAIL_METRICS
      : POST_DETAIL_METRICS;

  const contentTypeLabel = contentType === "reels" ? "Reels" : contentType === "stories" ? "Stories" : "Beiträge";

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Top 5 Content */}
      <AnimatedCard>
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h3 className="font-heading text-lg font-semibold">Top 5 {contentTypeLabel}</h3>
            <ToggleGroup
              type="single"
              value={contentType}
              onValueChange={(v) => v && setContentType(v as ContentType)}
              variant="outline"
              size="sm"
            >
              <ToggleGroupItem value="reels" className="text-xs">Reels</ToggleGroupItem>
              <ToggleGroupItem value="stories" className="text-xs">Stories</ToggleGroupItem>
              <ToggleGroupItem value="posts" className="text-xs">Beiträge</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <TopVideosGrid
            title=""
            items={currentItems}
            metricOptions={currentMetricOptions}
            accentColor={ACCENT}
            onItemClick={(item) => {
              setSelectedItem(item as unknown as Record<string, unknown>);
              setSheetOpen(true);
            }}
          />
        </div>
      </AnimatedCard>

      <VideoDetailSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        video={selectedItem}
        metrics={currentDetailMetrics}
        accentColor={ACCENT}
        platformName="Instagram"
      />

      {/* Hero Metrics: 3 key numbers */}
      <AnimatedCard>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <MetricCard label="Follower" value={data.followers} change={data.followersChange} accentColor={ACCENT} />
          <MetricCard label="Reichweite" value={data.reach} change={data.reachChange} accentColor={ACCENT} />
          <MetricCard label="Impressionen" value={data.impressions} change={data.impressionsChange} accentColor={ACCENT} />
        </div>
      </AnimatedCard>

      {/* Engagement + Discovery als Balkendiagramme */}
      <AnimatedCard delay={0.05}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <MetricsBarChart
            title="Engagement"
            accentColor={ACCENT}
            metrics={[
              { label: "Likes", value: data.likes, change: data.likesChange },
              { label: "Kommentare", value: data.comments, change: data.commentsChange },
              { label: "Gespeichert", value: data.saves, change: data.savesChange },
              { label: "Shares", value: data.shares, change: data.sharesChange },
            ]}
          />
          <MetricsBarChart
            title="Profil & Entdecken"
            accentColor={ACCENT}
            metrics={[
              { label: "Profilbesuche", value: data.profileVisits, change: data.profileVisitsChange },
              { label: "Website-Klicks", value: data.websiteClicks, change: data.websiteClicksChange },
              { label: "E-Mail-Klicks", value: data.emailClicks, format: "number" },
              { label: "Erreichte Konten", value: data.accountsReached },
              { label: "Interagierte", value: data.accountsEngaged },
            ]}
          />
        </div>
      </AnimatedCard>

      {/* Stories als Balkendiagramm */}
      <AnimatedCard delay={0.1}>
        {isMobile ? (
          <CollapsibleSection title="Stories">
            <MetricsBarChart
              title=""
              accentColor={ACCENT}
              metrics={[
                { label: "Aufrufe", value: data.storiesViews, change: data.storiesViewsChange },
                { label: "Gepostet", value: data.storiesPosted, format: "number" },
                { label: "Ausstiegsrate", value: data.avgStoryExitRate, format: "percentage" },
                { label: "Antwortrate", value: data.avgStoryReplyRate, format: "percentage" },
              ]}
            />
          </CollapsibleSection>
        ) : (
          <MetricsBarChart
            title="Stories"
            accentColor={ACCENT}
            metrics={[
              { label: "Aufrufe", value: data.storiesViews, change: data.storiesViewsChange },
              { label: "Gepostet", value: data.storiesPosted, format: "number" },
              { label: "Ausstiegsrate", value: data.avgStoryExitRate, format: "percentage" },
              { label: "Antwortrate", value: data.avgStoryReplyRate, format: "percentage" },
            ]}
          />
        )}
      </AnimatedCard>

      {/* Charts: 2x2 */}
      <AnimatedCard delay={0.1}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PlatformLineChart title="Reichweite über Zeit" data={data.reachOverTime} color={ACCENT} />
          <EngagementPieChart data={data.engagementByType} />
          <PlatformLineChart title="Impressionen über Zeit" data={data.impressionsOverTime} color={ACCENT} />
          <PlatformLineChart title="Follower-Wachstum" data={data.followerGrowthOverTime} color={ACCENT} />
        </div>
      </AnimatedCard>

      {/* Reels Performance Table */}
      <AnimatedCard delay={0.1}>
        <ContentTable title="Reels-Performance" columns={REEL_COLUMNS} data={data.reelsPerformance} />
      </AnimatedCard>

      {/* Stories Table */}
      {data.stories.length > 0 && (
        <AnimatedCard delay={0.1}>
          <ContentTable title="Stories-Performance" columns={STORY_COLUMNS} data={data.stories} />
        </AnimatedCard>
      )}

      {/* Top Posts Table */}
      <AnimatedCard delay={0.1}>
        <ContentTable title="Top-Beiträge" columns={POST_COLUMNS} data={data.topPosts} />
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
    </div>
  );
}
