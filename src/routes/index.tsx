import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState, useMemo, useCallback } from "react";
import { TimePeriodSelector } from "~/components/dashboard/time-period-selector";
import { PlatformFilter } from "~/components/dashboard/platform-filter";
import { OverviewTab } from "~/components/dashboard/tabs/overview-tab";
import { TikTokTab } from "~/components/dashboard/tabs/tiktok-tab";
import { InstagramTab } from "~/components/dashboard/tabs/instagram-tab";
import { YouTubeTab } from "~/components/dashboard/tabs/youtube-tab";
import { SnapchatTab } from "~/components/dashboard/tabs/snapchat-tab";
import { ShopifyTab } from "~/components/dashboard/tabs/shopify-tab";
import { GoalsPanel } from "~/components/dashboard/goals-panel";
import { InsightsPanel } from "~/components/dashboard/insights-panel";
import { AlertsPanel } from "~/components/dashboard/alerts-panel";
import { ContentCalendar } from "~/components/dashboard/content-calendar";
import { CompetitorBenchmarking } from "~/components/dashboard/competitor-benchmarking";
import { ExportPanel } from "~/components/dashboard/export-panel";
import {
  getOverviewData,
  getTikTokData,
  getInstagramData,
  getYouTubeData,
  getSnapchatData,
  getGoals,
  getInsights,
  getCompetitors,
  getAlerts,
  getCalendarPosts,
  getShopifyData,
} from "~/lib/mock-data";
import { PLATFORMS } from "~/lib/mock-data/config";
import type { TimePeriod, Platform } from "~/types/social-media";
import { ViewModeToggle } from "~/components/dashboard/view-mode-toggle";
import type { ViewMode } from "~/components/dashboard/view-mode-toggle";
import { SiteHeader } from "~/components/site-header";
import { MobileNav } from "~/components/mobile-nav";
import { useIsMobile } from "~/hooks/use-media-query";
import { cn } from "~/lib/utils";

type AppView = "dashboard" | "calendar" | "goals" | "insights" | "competitors" | "alerts" | "export";

export const Route = createFileRoute("/")({
  component: DashboardPage,
  validateSearch: (search: Record<string, unknown>) => ({
    view: (search.view as AppView) || "dashboard",
    tab: (search.tab as string) || "overview",
  }),
});

const VIEW_TITLES: Record<AppView, { title: string; subtitle: string }> = {
  dashboard: { title: "Analyse", subtitle: "Verfolge deine Performance auf allen Plattformen" },
  calendar: { title: "Content-Kalender", subtitle: "Plane und verwalte deine Inhalte" },
  goals: { title: "Ziele & Fortschritt", subtitle: "Verfolge den Fortschritt deiner Social-Media-Ziele" },
  insights: { title: "KI-Insights", subtitle: "Automatisch generierte Empfehlungen und Analysen" },
  competitors: { title: "Wettbewerber", subtitle: "Benchmark gegen ähnliche Creator" },
  alerts: { title: "Benachrichtigungen", subtitle: "Wichtige Änderungen bei deinen Metriken" },
  export: { title: "Daten exportieren", subtitle: "Lade deine Analytics-Daten herunter" },
};

function DashboardPage() {
  const { view: currentView, tab: activeTab } = useSearch({ from: "/" });
  const isMobile = useIsMobile();

  const [timePeriod, setTimePeriod] = useState<TimePeriod>("30d");
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");
  const [enabledPlatforms, setEnabledPlatforms] = useState<Platform[]>([...PLATFORMS]);
  const [alerts, setAlerts] = useState(() => getAlerts());

  const overviewData = useMemo(() => getOverviewData(timePeriod), [timePeriod]);
  const tiktokData = useMemo(() => getTikTokData(timePeriod), [timePeriod]);
  const instagramData = useMemo(() => getInstagramData(timePeriod), [timePeriod]);
  const youtubeData = useMemo(() => getYouTubeData(timePeriod), [timePeriod]);
  const snapchatData = useMemo(() => getSnapchatData(timePeriod), [timePeriod]);
  const shopifyData = useMemo(() => getShopifyData(timePeriod), [timePeriod]);
  const goals = useMemo(() => getGoals(), []);
  const insights = useMemo(() => getInsights(), []);
  const competitors = useMemo(() => getCompetitors(), []);
  const calendarPosts = useMemo(() => getCalendarPosts(), []);

  const handleAcknowledge = useCallback((id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)));
  }, []);

  const ownCompetitorData: { platform: Platform; followers: number; engagementRate: number; postsPerWeek: number; avgViews: number }[] = [
    { platform: "tiktok", followers: tiktokData.followers, engagementRate: tiktokData.engagementRate, postsPerWeek: 8, avgViews: Math.round(tiktokData.totalViews / 124) },
    { platform: "instagram", followers: instagramData.followers, engagementRate: 5.4, postsPerWeek: 6, avgViews: Math.round(instagramData.reach / 89) },
    { platform: "youtube", followers: youtubeData.subscribers, engagementRate: 4.2, postsPerWeek: 2, avgViews: Math.round(youtubeData.totalViews / 12) },
    { platform: "snapchat", followers: snapchatData.friends, engagementRate: 3.1, postsPerWeek: 5, avgViews: Math.round(snapchatData.storyViews / 45) },
  ];

  const viewInfo = VIEW_TITLES[(currentView as AppView)] || VIEW_TITLES.dashboard;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col">
          <div className={cn(
            "flex flex-1 flex-col gap-4 md:gap-6 p-3 md:p-4 lg:p-8",
            isMobile && "pb-20",
          )}>
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-1">
                <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">{viewInfo.title}</h1>
                <p className="text-muted-foreground text-sm">{viewInfo.subtitle}</p>
              </div>
              {currentView === "dashboard" && (
                <TimePeriodSelector value={timePeriod} onChange={setTimePeriod} />
              )}
            </div>

            {/* Dashboard: render active platform tab */}
            {currentView === "dashboard" && activeTab === "overview" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  <ViewModeToggle value={viewMode} onChange={setViewMode} />
                  <div className="hidden sm:block h-5 w-px bg-border" />
                  <PlatformFilter enabled={enabledPlatforms} onChange={setEnabledPlatforms} />
                </div>
                <OverviewTab data={overviewData} viewMode={viewMode} enabledPlatforms={enabledPlatforms} />
              </div>
            )}
            {currentView === "dashboard" && activeTab === "tiktok" && (
              <TikTokTab data={tiktokData} />
            )}
            {currentView === "dashboard" && activeTab === "instagram" && (
              <InstagramTab data={instagramData} />
            )}
            {currentView === "dashboard" && activeTab === "youtube" && (
              <YouTubeTab data={youtubeData} />
            )}
            {currentView === "dashboard" && activeTab === "snapchat" && (
              <SnapchatTab data={snapchatData} />
            )}
            {currentView === "dashboard" && activeTab === "shopify" && (
              <ShopifyTab data={shopifyData} />
            )}

            {/* Feature views */}
            {currentView === "calendar" && <ContentCalendar posts={calendarPosts} />}
            {currentView === "goals" && <GoalsPanel goals={goals} />}
            {currentView === "insights" && <InsightsPanel insights={insights} />}
            {currentView === "competitors" && (
              <CompetitorBenchmarking competitors={competitors} ownData={ownCompetitorData} />
            )}
            {currentView === "alerts" && <AlertsPanel alerts={alerts} onAcknowledge={handleAcknowledge} />}
            {currentView === "export" && <ExportPanel overviewData={overviewData} />}
          </div>
        </div>
      </main>
      {isMobile && <MobileNav />}
    </div>
  );
}
