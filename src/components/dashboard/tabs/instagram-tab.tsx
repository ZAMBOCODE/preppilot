import { MetricCard } from "~/components/dashboard/metric-card";
import { AnimatedCard } from "~/components/dashboard/animated-card";
import { PlatformLineChart } from "~/components/dashboard/charts/platform-line-chart";
import { EngagementPieChart } from "~/components/dashboard/charts/engagement-pie-chart";
import { ContentTable } from "~/components/dashboard/content-table";
import { DemographicsChart } from "~/components/dashboard/charts/demographics-chart";
import { CountriesList } from "~/components/dashboard/charts/countries-list";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { PLATFORM_CONFIG } from "~/lib/mock-data/config";
import { formatCompactNumber } from "~/lib/mock-data/helpers";
import type { InstagramData } from "~/types/social-media";

const ACCENT = PLATFORM_CONFIG.instagram.color;

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
  return (
    <div className="space-y-8">
      {/* Profile Metrics */}
      <AnimatedCard>
        <div>
          <h3 className="font-heading mb-4 text-lg font-semibold">Profil</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
            <MetricCard label="Follower" value={data.followers} change={data.followersChange} accentColor={ACCENT} />
            <MetricCard label="Folge ich" value={data.following} format="number" accentColor={ACCENT} />
            <MetricCard label="Beiträge" value={data.posts} format="number" accentColor={ACCENT} />
            <MetricCard label="Profilbesuche" value={data.profileVisits} change={data.profileVisitsChange} accentColor={ACCENT} />
            <MetricCard label="Website-Klicks" value={data.websiteClicks} change={data.websiteClicksChange} accentColor={ACCENT} />
            <MetricCard label="E-Mail-Klicks" value={data.emailClicks} format="number" accentColor={ACCENT} />
          </div>
        </div>
      </AnimatedCard>

      {/* Engagement Metrics */}
      <AnimatedCard delay={0.05}>
        <div>
          <h3 className="font-heading mb-4 text-lg font-semibold">Engagement</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <MetricCard label="Likes" value={data.likes} change={data.likesChange} accentColor={ACCENT} />
            <MetricCard label="Kommentare" value={data.comments} change={data.commentsChange} accentColor={ACCENT} />
            <MetricCard label="Gespeichert" value={data.saves} change={data.savesChange} accentColor={ACCENT} />
            <MetricCard label="Shares" value={data.shares} change={data.sharesChange} accentColor={ACCENT} />
          </div>
        </div>
      </AnimatedCard>

      {/* Discovery Metrics */}
      <AnimatedCard delay={0.1}>
        <div>
          <h3 className="font-heading mb-4 text-lg font-semibold">Entdecken</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <MetricCard label="Reichweite" value={data.reach} change={data.reachChange} accentColor={ACCENT} />
            <MetricCard label="Impressionen" value={data.impressions} change={data.impressionsChange} accentColor={ACCENT} />
            <MetricCard label="Erreichte Konten" value={data.accountsReached} accentColor={ACCENT} />
            <MetricCard label="Interagierte Konten" value={data.accountsEngaged} accentColor={ACCENT} />
          </div>
        </div>
      </AnimatedCard>

      {/* Stories Section */}
      <AnimatedCard delay={0.15}>
        <div>
          <h3 className="font-heading mb-4 text-lg font-semibold">Stories</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <MetricCard label="Story-Aufrufe" value={data.storiesViews} change={data.storiesViewsChange} accentColor={ACCENT} />
            <MetricCard label="Stories gepostet" value={data.storiesPosted} format="number" accentColor={ACCENT} />
            <MetricCard label="Ø Ausstiegsrate" value={data.avgStoryExitRate} format="percentage" accentColor={ACCENT} />
            <MetricCard label="Ø Antwortrate" value={data.avgStoryReplyRate} format="percentage" accentColor={ACCENT} />
          </div>
        </div>
      </AnimatedCard>

      {data.stories.length > 0 && (
        <AnimatedCard delay={0.1}>
          <ContentTable title="Stories-Performance" columns={STORY_COLUMNS} data={data.stories} />
        </AnimatedCard>
      )}

      {/* Charts: 2x2 Grid */}
      <AnimatedCard delay={0.1}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PlatformLineChart title="Reichweite über Zeit" data={data.reachOverTime} color={ACCENT} />
          <EngagementPieChart data={data.engagementByType} />
          <PlatformLineChart title="Impressionen über Zeit" data={data.impressionsOverTime} color={ACCENT} />
          <PlatformLineChart title="Follower-Wachstum" data={data.followerGrowthOverTime} color={ACCENT} />
        </div>
      </AnimatedCard>

      {/* Content Type Performance */}
      <AnimatedCard delay={0.1}>
        <div>
          <h3 className="font-heading mb-4 text-lg font-semibold">Performance nach Inhaltstyp</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {data.contentTypePerformance.map((item) => (
              <Card key={item.type} className="border-0 bg-secondary/50 shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium">
                    <div className="size-2 rounded-full" style={{ backgroundColor: ACCENT }} />
                    {item.type}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted-foreground text-xs">Anzahl</span>
                    <span className="font-heading text-base font-semibold tabular-nums">
                      {item.count}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted-foreground text-xs">Ø Reichweite</span>
                    <span className="font-heading text-base font-semibold tabular-nums">
                      {formatCompactNumber(item.avgReach)}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted-foreground text-xs">Ø Engagement</span>
                    <span className="font-heading text-base font-semibold tabular-nums">
                      {formatCompactNumber(item.avgEngagement)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedCard>

      {/* Reels Performance Table */}
      <AnimatedCard delay={0.1}>
        <ContentTable title="Reels-Performance" columns={REEL_COLUMNS} data={data.reelsPerformance} />
      </AnimatedCard>

      {/* Top Posts Table */}
      <AnimatedCard delay={0.1}>
        <ContentTable title="Top-Beiträge" columns={POST_COLUMNS} data={data.topPosts} />
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
