import { useState } from "react";
import { MetricCard } from "~/components/dashboard/metric-card";
import { MetricsBarChart } from "~/components/dashboard/metrics-bar-chart";
import { AnimatedCard } from "~/components/dashboard/animated-card";
import { PlatformLineChart } from "~/components/dashboard/charts/platform-line-chart";
import { ContentTable } from "~/components/dashboard/content-table";
import { DemographicsChart } from "~/components/dashboard/charts/demographics-chart";
import { CountriesList } from "~/components/dashboard/charts/countries-list";
import { TopVideosGrid } from "~/components/dashboard/top-videos-grid";
import { VideoDetailSheet } from "~/components/dashboard/video-detail-sheet";
import { CollapsibleSection } from "~/components/dashboard/collapsible-section";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { PLATFORM_CONFIG } from "~/lib/mock-data/config";
import { useIsMobile } from "~/hooks/use-media-query";
import type { SnapchatData } from "~/types/social-media";

const ACCENT = PLATFORM_CONFIG.snapchat.color;

type SnapContentType = "stories" | "spotlights";

const STORY_METRIC_OPTIONS = [
  { key: "views", label: "Aufrufe" },
  { key: "screenshots", label: "Screenshots" },
  { key: "replies", label: "Antworten" },
  { key: "completionRate", label: "Abschluss %", format: "percentage" as const },
];

const SPOTLIGHT_METRIC_OPTIONS = [
  { key: "views", label: "Aufrufe" },
  { key: "favorites", label: "Favoriten" },
  { key: "shares", label: "Shares" },
];

const STORY_DETAIL_METRICS = [
  { label: "Aufrufe", key: "views" },
  { label: "Screenshots", key: "screenshots" },
  { label: "Antworten", key: "replies" },
  { label: "Abschlussrate", key: "completionRate", format: "percentage" as const },
  { label: "Gepostet", key: "postedAt", format: "date" as const },
];

const SPOTLIGHT_DETAIL_METRICS = [
  { label: "Aufrufe", key: "views" },
  { label: "Favoriten", key: "favorites" },
  { label: "Shares", key: "shares" },
  { label: "Wiedergabezeit", key: "totalWatchTime", format: "text" as const },
  { label: "Gepostet", key: "postedAt", format: "date" as const },
];

const STORY_COLUMNS = [
  { key: "title", label: "Story", format: "text" as const },
  { key: "views", label: "Aufrufe", format: "compact" as const },
  { key: "screenshots", label: "Screenshots", format: "compact" as const },
  { key: "replies", label: "Antworten", format: "compact" as const },
  { key: "completionRate", label: "Abschluss %", format: "text" as const },
  { key: "postedAt", label: "Gepostet", format: "date" as const },
];

const SPOTLIGHT_COLUMNS = [
  { key: "title", label: "Spotlight", format: "text" as const },
  { key: "views", label: "Aufrufe", format: "compact" as const },
  { key: "favorites", label: "Favoriten", format: "compact" as const },
  { key: "shares", label: "Shares", format: "compact" as const },
  { key: "totalWatchTime", label: "Wiedergabezeit", format: "text" as const },
  { key: "postedAt", label: "Gepostet", format: "date" as const },
];

interface SnapchatTabProps {
  data: SnapchatData;
}

export function SnapchatTab({ data }: SnapchatTabProps) {
  const [contentType, setContentType] = useState<SnapContentType>("stories");
  const [selectedItem, setSelectedItem] = useState<Record<string, unknown> | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const isMobile = useIsMobile();

  const currentItems = contentType === "stories" ? data.stories : data.spotlights;
  const currentMetricOptions = contentType === "stories" ? STORY_METRIC_OPTIONS : SPOTLIGHT_METRIC_OPTIONS;
  const currentDetailMetrics = contentType === "stories" ? STORY_DETAIL_METRICS : SPOTLIGHT_DETAIL_METRICS;
  const contentTypeLabel = contentType === "stories" ? "Stories" : "Spotlights";

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
              onValueChange={(v) => v && setContentType(v as SnapContentType)}
              variant="outline"
              size="sm"
            >
              <ToggleGroupItem value="stories" className="text-xs">Stories</ToggleGroupItem>
              <ToggleGroupItem value="spotlights" className="text-xs">Spotlights</ToggleGroupItem>
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
        platformName="Snapchat"
      />

      {/* Hero Metrics: 3 key numbers */}
      <AnimatedCard>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <MetricCard label="Snap-Punkte" value={data.score} change={data.scoreChange} accentColor={ACCENT} />
          <MetricCard label="Freunde" value={data.friends} change={data.friendsChange} accentColor={ACCENT} />
          <MetricCard label="Story-Aufrufe" value={data.storyViews} change={data.storyViewsChange} accentColor={ACCENT} />
        </div>
      </AnimatedCard>

      {/* Profil + Stories als Balkendiagramme */}
      <AnimatedCard delay={0.05}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <MetricsBarChart
            title="Profil"
            accentColor={ACCENT}
            metrics={[
              { label: "Beste Freunde", value: data.bestFriends, format: "number" },
              { label: "Streaks", value: data.streaks, change: data.streaksChange, format: "number" },
              { label: "Längster Streak", value: data.longestStreak, format: "number" },
            ]}
          />
          <MetricsBarChart
            title="Stories"
            accentColor={ACCENT}
            metrics={[
              { label: "Gepostet", value: data.storiesPosted, format: "number" },
              { label: "Abschlussrate", value: data.avgCompletionRate, change: data.avgCompletionRateChange, format: "percentage" },
              { label: "Screenshots", value: data.totalScreenshots },
              { label: "Antworten", value: data.totalReplies },
            ]}
          />
        </div>
      </AnimatedCard>

      {/* Charts: Story Views + Spotlight Views */}
      <AnimatedCard delay={0.1}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PlatformLineChart title="Story-Aufrufe über Zeit" data={data.storyViewsOverTime} color={ACCENT} />
          <PlatformLineChart title="Spotlight-Aufrufe über Zeit" data={data.spotlightViewsOverTime} color={ACCENT} />
        </div>
      </AnimatedCard>

      {/* Spotlight summary */}
      <AnimatedCard delay={0.1}>
        <MetricsBarChart
          title="Spotlight"
          accentColor={ACCENT}
          metrics={[
            { label: "Aufrufe", value: data.spotlightViews, change: data.spotlightViewsChange },
          ]}
        />
      </AnimatedCard>

      {/* Stories Table */}
      {data.stories.length > 0 && (
        <AnimatedCard delay={0.1}>
          <ContentTable title="Stories-Performance" columns={STORY_COLUMNS} data={data.stories} />
        </AnimatedCard>
      )}

      {/* Spotlight Table */}
      {data.spotlights.length > 0 && (
        <AnimatedCard delay={0.1}>
          <ContentTable title="Spotlight-Performance" columns={SPOTLIGHT_COLUMNS} data={data.spotlights} />
        </AnimatedCard>
      )}

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
