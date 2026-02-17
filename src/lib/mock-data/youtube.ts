import type { TimePeriod, YouTubeData } from "~/types/social-media";
import { generateTimeSeries } from "./helpers";

export function getYouTubeData(period: TimePeriod): YouTubeData {
  return {
    subscribers: 948_000, subscribersChange: 2.9, totalViews: 68_000_000, totalViewsChange: 4.5,
    watchTimeHours: 2_400_000, watchTimeChange: 3.8, likes: 3_200_000, likesChange: 5.1,
    comments: 420_000, commentsChange: 3.2, shares: 180_000, sharesChange: 4.8,
    averageViewDuration: "8:42", avgViewPercentage: 42.5,
    impressions: 28_000_000, impressionsChange: 6.2, clickThroughRate: 5.8, clickThroughRateChange: 0.3,
    uniqueViewers: 4_200_000, uniqueViewersChange: 3.5,
    estimatedRevenue: 18_400, estimatedRevenueChange: 7.2, rpm: 4.82, cpm: 12.40, adImpressions: 14_800_000,
    viewsOverTime: generateTimeSeries(period, 756_000, 0.35, 0.02, 301),
    watchTimeOverTime: generateTimeSeries(period, 26_700, 0.3, 0.02, 302),
    subscribersOverTime: generateTimeSeries(period, 31_600, 0.2, 0.02, 303),
    revenueOverTime: generateTimeSeries(period, 205, 0.4, 0.03, 304),
    videoPerformance: [
      { id: "yt1", title: "Ich habe eine Woche mit 1€/Tag gelebt", views: 4_200_000, likes: 320_000, dislikes: 4_200, comments: 42_000, watchTimeHours: 180_000, avgViewDuration: "12:34", avgViewPercentage: 52, impressions: 8_400_000, ctr: 6.2, publishedAt: "2026-02-11" },
      { id: "yt2", title: "Die Wahrheit über Produktivitäts-Hacks", views: 3_100_000, likes: 240_000, dislikes: 3_100, comments: 31_000, watchTimeHours: 145_000, avgViewDuration: "10:22", avgViewPercentage: 48, impressions: 6_200_000, ctr: 5.8, publishedAt: "2026-02-07" },
      { id: "yt3", title: "Mein Traum-Setup aufbauen", views: 2_800_000, likes: 210_000, dislikes: 2_800, comments: 28_000, watchTimeHours: 130_000, avgViewDuration: "14:18", avgViewPercentage: 45, impressions: 5_600_000, ctr: 5.4, publishedAt: "2026-02-03" },
      { id: "yt4", title: "Ich reagiere auf eure Kommentare", views: 2_400_000, likes: 190_000, dislikes: 2_400, comments: 35_000, watchTimeHours: 98_000, avgViewDuration: "8:45", avgViewPercentage: 55, impressions: 4_800_000, ctr: 6.8, publishedAt: "2026-01-30" },
      { id: "yt5", title: "Investieren für Anfänger – Der komplette Guide", views: 2_100_000, likes: 175_000, dislikes: 2_100, comments: 22_000, watchTimeHours: 120_000, avgViewDuration: "18:32", avgViewPercentage: 38, impressions: 4_200_000, ctr: 4.9, publishedAt: "2026-01-26" },
      { id: "yt6", title: "Ein Tag in meinem Leben: Remote arbeiten", views: 1_800_000, likes: 150_000, dislikes: 1_800, comments: 19_000, watchTimeHours: 85_000, avgViewDuration: "11:28", avgViewPercentage: 44, impressions: 3_600_000, ctr: 5.2, publishedAt: "2026-01-22" },
      { id: "yt7", title: "Top 10 Apps die du 2026 brauchst", views: 1_500_000, likes: 130_000, dislikes: 1_500, comments: 16_000, watchTimeHours: 72_000, avgViewDuration: "9:56", avgViewPercentage: 47, impressions: 3_000_000, ctr: 5.6, publishedAt: "2026-01-18" },
    ],
    topVideos: [
      { id: "yt1", title: "Ich habe eine Woche mit 1€/Tag gelebt", views: 4_200_000, likes: 320_000, dislikes: 4_200, comments: 42_000, watchTimeHours: 180_000, avgViewDuration: "12:34", avgViewPercentage: 52, impressions: 8_400_000, ctr: 6.2, publishedAt: "2026-02-11" },
      { id: "yt2", title: "Die Wahrheit über Produktivitäts-Hacks", views: 3_100_000, likes: 240_000, dislikes: 3_100, comments: 31_000, watchTimeHours: 145_000, avgViewDuration: "10:22", avgViewPercentage: 48, impressions: 6_200_000, ctr: 5.8, publishedAt: "2026-02-07" },
      { id: "yt3", title: "Mein Traum-Setup aufbauen", views: 2_800_000, likes: 210_000, dislikes: 2_800, comments: 28_000, watchTimeHours: 130_000, avgViewDuration: "14:18", avgViewPercentage: 45, impressions: 5_600_000, ctr: 5.4, publishedAt: "2026-02-03" },
    ],
    trafficSources: [
      { source: "Startseite", percentage: 32, views: 21_800_000 }, { source: "Vorgeschlagene Videos", percentage: 28, views: 19_000_000 },
      { source: "Suche", percentage: 18, views: 12_200_000 }, { source: "Extern", percentage: 10, views: 6_800_000 },
      { source: "Kanalseite", percentage: 7, views: 4_800_000 }, { source: "Benachrichtigungen", percentage: 3, views: 2_000_000 },
      { source: "Playlists", percentage: 2, views: 1_400_000 },
    ],
    audienceDemographics: {
      ageGroups: [{ range: "13-17", percentage: 5 }, { range: "18-24", percentage: 30 }, { range: "25-34", percentage: 35 }, { range: "35-44", percentage: 18 }, { range: "45-54", percentage: 8 }, { range: "55+", percentage: 4 }],
      gender: { male: 52, female: 44, other: 4 },
      topCountries: [{ country: "Deutschland", percentage: 30, followers: 284_000 }, { country: "USA", percentage: 15, followers: 142_000 }, { country: "Österreich", percentage: 10, followers: 94_000 }, { country: "Schweiz", percentage: 8, followers: 75_000 }, { country: "Großbritannien", percentage: 7, followers: 66_000 }],
    },
    viewerTypes: [{ type: "Wiederkehrende Zuschauer", percentage: 45 }, { type: "Neue Zuschauer", percentage: 55 }],
    deviceBreakdown: [{ device: "Mobil", percentage: 58 }, { device: "Desktop", percentage: 28 }, { device: "TV", percentage: 10 }, { device: "Tablet", percentage: 4 }],
    topSearchTerms: [
      { term: "Produktivitäts-Tipps", views: 890_000, impressions: 4_200_000 }, { term: "ein Tag in meinem Leben", views: 650_000, impressions: 3_100_000 },
      { term: "Budget-Challenge", views: 520_000, impressions: 2_800_000 }, { term: "Setup-Tour 2026", views: 410_000, impressions: 2_200_000 },
      { term: "Investieren für Anfänger", views: 380_000, impressions: 1_900_000 }, { term: "Remote-Work-Tipps", views: 290_000, impressions: 1_500_000 },
    ],
  };
}
