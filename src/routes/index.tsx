import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState, useMemo, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TimePeriodSelector } from "~/components/dashboard/time-period-selector";
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
import {
  IconBrandTiktok,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandSnapchat,
  IconChartBar,
  IconShoppingCart,
} from "@tabler/icons-react";
import type { TimePeriod, Platform } from "~/types/social-media";
import { ViewModeToggle } from "~/components/dashboard/view-mode-toggle";
import type { ViewMode } from "~/components/dashboard/view-mode-toggle";
import { AppSidebar } from "~/components/app-sidebar";
import { SiteHeader } from "~/components/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

type AppView = "dashboard" | "calendar" | "goals" | "insights" | "competitors" | "alerts" | "export";

export const Route = createFileRoute("/")({
  component: DashboardPage,
  validateSearch: (search: Record<string, unknown>) => ({
    view: (search.view as AppView) || "dashboard",
    tab: (search.tab as string) || undefined,
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
  const { view: searchView, tab: searchTab } = useSearch({ from: "/" });
  const currentView = (searchView || "dashboard") as AppView;

  const [timePeriod, setTimePeriod] = useState<TimePeriod>("30d");
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");
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

  // Build own data for competitor comparison
  const ownCompetitorData: { platform: Platform; followers: number; engagementRate: number; postsPerWeek: number; avgViews: number }[] = [
    { platform: "tiktok", followers: tiktokData.followers, engagementRate: tiktokData.engagementRate, postsPerWeek: 8, avgViews: Math.round(tiktokData.totalViews / 124) },
    { platform: "instagram", followers: instagramData.followers, engagementRate: 5.4, postsPerWeek: 6, avgViews: Math.round(instagramData.reach / 89) },
    { platform: "youtube", followers: youtubeData.subscribers, engagementRate: 4.2, postsPerWeek: 2, avgViews: Math.round(youtubeData.totalViews / 12) },
    { platform: "snapchat", followers: snapchatData.friends, engagementRate: 3.1, postsPerWeek: 5, avgViews: Math.round(snapchatData.storyViews / 45) },
  ];

  const defaultTab = searchTab || "overview";
  const viewInfo = VIEW_TITLES[currentView] || VIEW_TITLES.dashboard;

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
              {/* Header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                  <h1 className="font-heading text-3xl font-semibold tracking-tight">{viewInfo.title}</h1>
                  <p className="text-muted-foreground">{viewInfo.subtitle}</p>
                </div>
                {currentView === "dashboard" && (
                  <TimePeriodSelector value={timePeriod} onChange={setTimePeriod} />
                )}
              </div>

              {/* Content based on current view */}
              {currentView === "dashboard" && (
                <Tabs defaultValue={defaultTab}>
                  <div className="overflow-x-auto -mx-4 px-4 md:-mx-8 md:px-8">
                    <TabsList className="w-fit">
                      <TabsTrigger value="overview" className="gap-1.5">
                        <IconChartBar className="size-4" />
                        Übersicht
                      </TabsTrigger>
                      <TabsTrigger value="tiktok" className="gap-1.5">
                        <IconBrandTiktok className="size-4" />
                        TikTok
                      </TabsTrigger>
                      <TabsTrigger value="instagram" className="gap-1.5">
                        <IconBrandInstagram className="size-4" />
                        Instagram
                      </TabsTrigger>
                      <TabsTrigger value="youtube" className="gap-1.5">
                        <IconBrandYoutube className="size-4" />
                        YouTube
                      </TabsTrigger>
                      <TabsTrigger value="snapchat" className="gap-1.5">
                        <IconBrandSnapchat className="size-4" />
                        Snapchat
                      </TabsTrigger>
                      <TabsTrigger value="shopify" className="gap-1.5">
                        <IconShoppingCart className="size-4" />
                        Shopify
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="overview" className="mt-6">
                    <div className="mb-6">
                      <ViewModeToggle value={viewMode} onChange={setViewMode} />
                    </div>
                    <OverviewTab data={overviewData} viewMode={viewMode} />
                  </TabsContent>
                  <TabsContent value="tiktok" className="mt-6">
                    <TikTokTab data={tiktokData} />
                  </TabsContent>
                  <TabsContent value="instagram" className="mt-6">
                    <InstagramTab data={instagramData} />
                  </TabsContent>
                  <TabsContent value="youtube" className="mt-6">
                    <YouTubeTab data={youtubeData} />
                  </TabsContent>
                  <TabsContent value="snapchat" className="mt-6">
                    <SnapchatTab data={snapchatData} />
                  </TabsContent>
                  <TabsContent value="shopify" className="mt-6">
                    <ShopifyTab data={shopifyData} />
                  </TabsContent>
                </Tabs>
              )}

              {currentView === "calendar" && (
                <ContentCalendar posts={calendarPosts} />
              )}

              {currentView === "goals" && (
                <GoalsPanel goals={goals} />
              )}

              {currentView === "insights" && (
                <InsightsPanel insights={insights} />
              )}

              {currentView === "competitors" && (
                <CompetitorBenchmarking
                  competitors={competitors}
                  ownData={ownCompetitorData}
                />
              )}

              {currentView === "alerts" && (
                <AlertsPanel alerts={alerts} onAcknowledge={handleAcknowledge} />
              )}

              {currentView === "export" && (
                <ExportPanel overviewData={overviewData} />
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
