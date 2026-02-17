import { MetricCard } from "~/components/dashboard/metric-card";
import { AnimatedCard } from "~/components/dashboard/animated-card";
import { PlatformLineChart } from "~/components/dashboard/charts/platform-line-chart";
import { ContentTable } from "~/components/dashboard/content-table";
import { DemographicsChart } from "~/components/dashboard/charts/demographics-chart";
import { CountriesList } from "~/components/dashboard/charts/countries-list";
import { PLATFORM_CONFIG } from "~/lib/mock-data/config";
import type { SnapchatData } from "~/types/social-media";

const ACCENT = PLATFORM_CONFIG.snapchat.color;

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
  return (
    <div className="space-y-8">
      {/* Profile Metrics */}
      <AnimatedCard>
        <div>
          <h3 className="font-heading mb-4 text-lg font-semibold">Profil</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
            <MetricCard label="Snap-Punkte" value={data.score} change={data.scoreChange} accentColor={ACCENT} />
            <MetricCard label="Freunde" value={data.friends} change={data.friendsChange} accentColor={ACCENT} />
            <MetricCard label="Beste Freunde" value={data.bestFriends} format="number" accentColor={ACCENT} />
            <MetricCard label="Streaks" value={data.streaks} change={data.streaksChange} format="number" accentColor={ACCENT} />
            <MetricCard label="Längster Streak" value={data.longestStreak} format="number" accentColor={ACCENT} />
          </div>
        </div>
      </AnimatedCard>

      {/* Stories Metrics */}
      <AnimatedCard delay={0.05}>
        <div>
          <h3 className="font-heading mb-4 text-lg font-semibold">Stories</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
            <MetricCard label="Story-Aufrufe" value={data.storyViews} change={data.storyViewsChange} accentColor={ACCENT} />
            <MetricCard label="Stories gepostet" value={data.storiesPosted} format="number" accentColor={ACCENT} />
            <MetricCard label="Ø Abschlussrate" value={data.avgCompletionRate} change={data.avgCompletionRateChange} format="percentage" accentColor={ACCENT} />
            <MetricCard label="Screenshots" value={data.totalScreenshots} accentColor={ACCENT} />
            <MetricCard label="Antworten" value={data.totalReplies} accentColor={ACCENT} />
          </div>
        </div>
      </AnimatedCard>

      {/* Stories Table */}
      {data.stories.length > 0 && (
        <AnimatedCard delay={0.1}>
          <ContentTable title="Stories-Performance" columns={STORY_COLUMNS} data={data.stories} />
        </AnimatedCard>
      )}

      {/* Story Views Over Time */}
      <AnimatedCard delay={0.1}>
        <PlatformLineChart title="Story-Aufrufe über Zeit" data={data.storyViewsOverTime} color={ACCENT} />
      </AnimatedCard>

      {/* Spotlight Section */}
      <AnimatedCard delay={0.1}>
        <div>
          <h3 className="font-heading mb-4 text-lg font-semibold">Spotlight</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <MetricCard label="Spotlight-Aufrufe" value={data.spotlightViews} change={data.spotlightViewsChange} accentColor={ACCENT} />
          </div>
        </div>
      </AnimatedCard>

      {/* Spotlight Table */}
      {data.spotlights.length > 0 && (
        <AnimatedCard delay={0.1}>
          <ContentTable title="Spotlight-Performance" columns={SPOTLIGHT_COLUMNS} data={data.spotlights} />
        </AnimatedCard>
      )}

      {/* Spotlight Views Over Time */}
      <AnimatedCard delay={0.1}>
        <PlatformLineChart title="Spotlight-Aufrufe über Zeit" data={data.spotlightViewsOverTime} color={ACCENT} />
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
    </div>
  );
}
