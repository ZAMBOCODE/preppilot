import type { TimePeriod, OverviewData } from "~/types/social-media";
import { generateTimeSeries } from "./helpers";

export function getOverviewData(period: TimePeriod): OverviewData {
  // Generate active hours heatmap data (Mon-Sun, 0-23h)
  const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  const activeHours: { hour: number; day: string; activity: number }[] = [];

  let seed = 777;
  const seededRandom = () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return seed / 2147483647;
  };

  for (const day of days) {
    const isWeekend = day === "Sa" || day === "So";
    for (let hour = 0; hour < 24; hour++) {
      let base = 5;
      // Morning commute bump (7-9)
      if (hour >= 7 && hour <= 9) base = isWeekend ? 20 : 35;
      // Lunch break (12-13)
      if (hour >= 12 && hour <= 13) base = isWeekend ? 40 : 50;
      // Afternoon (14-17)
      if (hour >= 14 && hour <= 17) base = isWeekend ? 45 : 30;
      // Evening peak (18-22)
      if (hour >= 18 && hour <= 22) base = isWeekend ? 85 : 75;
      // Late night (23, 0-2)
      if (hour === 23 || hour <= 2) base = isWeekend ? 30 : 15;
      // Night sleep (3-6)
      if (hour >= 3 && hour <= 6) base = isWeekend ? 8 : 3;

      const variance = (seededRandom() - 0.5) * 20;
      activeHours.push({
        hour,
        day,
        activity: Math.max(0, Math.min(100, Math.round(base + variance))),
      });
    }
  }

  return {
    totalFollowers: 5_198_000,
    totalFollowersChange: 4.1,
    totalEngagementRate: 5.6,
    totalEngagementRateChange: 0.3,
    topPerformingPlatform: "tiktok",
    totalPosts: 2_890,
    totalPostsChange: 6.2,
    totalReach: 18_400_000,
    totalReachChange: 7.8,
    totalImpressions: 42_600_000,
    totalImpressionsChange: 5.4,
    totalVideoViews: 210_000_000,
    totalVideoViewsChange: 9.1,
    totalLikes: 35_330_000,
    totalLikesChange: 6.8,
    totalComments: 2_140_000,
    totalCommentsChange: 3.2,
    totalShares: 4_870_000,
    totalSharesChange: 8.5,
    followersByPlatform: {
      tiktok: 2_430_000,
      instagram: 1_820_000,
      youtube: 948_000,
      snapchat: 0,
      shopify: 1_192,
    },
    followerGrowth: [
      { platform: "tiktok", data: generateTimeSeries(period, 81_000, 0.3, 0.03, 501) },
      { platform: "instagram", data: generateTimeSeries(period, 60_700, 0.25, 0.025, 502) },
      { platform: "youtube", data: generateTimeSeries(period, 31_600, 0.2, 0.02, 503) },
      { platform: "snapchat", data: generateTimeSeries(period, 413, 0.35, 0.015, 504) },
      { platform: "shopify", data: generateTimeSeries(period, 40, 0.3, 0.02, 505) },
    ],
    engagementComparison: [
      { platform: "tiktok", rate: 7.8, totalEngagements: 20_830_000 },
      { platform: "instagram", rate: 5.4, totalEngagements: 10_540_000 },
      { platform: "youtube", rate: 4.2, totalEngagements: 3_620_000 },
      { platform: "snapchat", rate: 3.1, totalEngagements: 340_000 },
      { platform: "shopify", rate: 3.2, totalEngagements: 1_192 },
    ],
    reachByPlatform: [
      { platform: "tiktok", reach: 8_200_000, impressions: 22_400_000 },
      { platform: "instagram", reach: 4_200_000, impressions: 12_800_000 },
      { platform: "youtube", reach: 5_600_000, impressions: 6_800_000 },
      { platform: "snapchat", reach: 400_000, impressions: 600_000 },
      { platform: "shopify", reach: 43_800, impressions: 87_600 },
    ],
    audienceDemographics: {
      ageGroups: [
        { range: "13-17", percentage: 8 },
        { range: "18-24", percentage: 35 },
        { range: "25-34", percentage: 32 },
        { range: "35-44", percentage: 15 },
        { range: "45-54", percentage: 7 },
        { range: "55+", percentage: 3 },
      ],
      gender: { male: 42, female: 54, other: 4 },
      topCountries: [
        { country: "Deutschland", percentage: 34, followers: 1_767_000 },
        { country: "Österreich", percentage: 12, followers: 623_000 },
        { country: "Schweiz", percentage: 9, followers: 467_000 },
        { country: "USA", percentage: 8, followers: 415_000 },
        { country: "Großbritannien", percentage: 6, followers: 311_000 },
        { country: "Frankreich", percentage: 5, followers: 259_000 },
        { country: "Niederlande", percentage: 4, followers: 207_000 },
        { country: "Türkei", percentage: 3, followers: 155_000 },
      ],
    },
    contentPerformance: [
      { platform: "tiktok", posts: 124, avgEngagement: 7.8, bestPostTime: "19:00" },
      { platform: "instagram", posts: 89, avgEngagement: 5.4, bestPostTime: "12:00" },
      { platform: "youtube", posts: 12, avgEngagement: 4.2, bestPostTime: "17:00" },
      { platform: "snapchat", posts: 45, avgEngagement: 3.1, bestPostTime: "21:00" },
      { platform: "shopify", posts: 8, avgEngagement: 3.2, bestPostTime: "20:00" },
    ],
    platformRadar: [
      {
        platform: "tiktok",
        followerGrowth: 88,
        engagementRate: 92,
        reach: 78,
        impressions: 85,
        contentOutput: 95,
      },
      {
        platform: "instagram",
        followerGrowth: 72,
        engagementRate: 68,
        reach: 65,
        impressions: 74,
        contentOutput: 70,
      },
      {
        platform: "youtube",
        followerGrowth: 55,
        engagementRate: 60,
        reach: 82,
        impressions: 58,
        contentOutput: 30,
      },
      {
        platform: "snapchat",
        followerGrowth: 40,
        engagementRate: 45,
        reach: 28,
        impressions: 22,
        contentOutput: 50,
      },
      {
        platform: "shopify",
        followerGrowth: 62,
        engagementRate: 55,
        reach: 35,
        impressions: 40,
        contentOutput: 20,
      },
    ],
    activeHours,
    engagementByType: [
      { type: "Likes", count: 35_330_000 },
      { type: "Kommentare", count: 2_140_000 },
      { type: "Shares", count: 4_870_000 },
      { type: "Gespeichert", count: 1_620_000 },
    ],
    contentMixByPlatform: [
      { platform: "tiktok", posts: 124 },
      { platform: "instagram", posts: 89 },
      { platform: "youtube", posts: 12 },
      { platform: "snapchat", posts: 45 },
      { platform: "shopify", posts: 8 },
    ],
    topContentCrossPlatform: [
      {
        id: "tcp-1",
        platform: "tiktok",
        title: "POV: Du bist der letzte im Büro um 23 Uhr",
        metric: "Aufrufe",
        value: 14_800_000,
        postedAt: "2026-02-03",
      },
      {
        id: "tcp-2",
        platform: "youtube",
        title: "Ich habe 30 Tage nur mit KI gearbeitet - Das Ergebnis",
        metric: "Aufrufe",
        value: 2_340_000,
        postedAt: "2026-01-28",
      },
      {
        id: "tcp-3",
        platform: "instagram",
        title: "Meine ehrliche Morning Routine als Content Creator",
        metric: "Likes",
        value: 487_000,
        postedAt: "2026-02-10",
      },
      {
        id: "tcp-4",
        platform: "tiktok",
        title: "Wenn dein Algorithmus dich besser kennt als deine Freunde",
        metric: "Shares",
        value: 892_000,
        postedAt: "2026-02-07",
      },
      {
        id: "tcp-5",
        platform: "instagram",
        title: "Vorher/Nachher: Mein Setup-Upgrade 2026",
        metric: "Gespeichert",
        value: 124_000,
        postedAt: "2026-02-12",
      },
      {
        id: "tcp-6",
        platform: "youtube",
        title: "Die Wahrheit über Social Media Einnahmen in Deutschland",
        metric: "Kommentare",
        value: 18_700,
        postedAt: "2026-02-01",
      },
      {
        id: "tcp-7",
        platform: "tiktok",
        title: "Deutsch lernen mit Memes - Teil 47",
        metric: "Aufrufe",
        value: 8_900_000,
        postedAt: "2026-02-14",
      },
      {
        id: "tcp-8",
        platform: "snapchat",
        title: "Behind the Scenes: Videodreh in den Alpen",
        metric: "Aufrufe",
        value: 340_000,
        postedAt: "2026-02-09",
      },
    ],
    viewsByCountry: [
      { country: "Deutschland", code: "DE", views: 71_400_000, percentage: 34 },
      { country: "Österreich", code: "AT", views: 25_200_000, percentage: 12 },
      { country: "Schweiz", code: "CH", views: 18_900_000, percentage: 9 },
      { country: "USA", code: "US", views: 16_800_000, percentage: 8 },
      { country: "Großbritannien", code: "GB", views: 12_600_000, percentage: 6 },
      { country: "Frankreich", code: "FR", views: 10_500_000, percentage: 5 },
      { country: "Niederlande", code: "NL", views: 8_400_000, percentage: 4 },
      { country: "Türkei", code: "TR", views: 6_300_000, percentage: 3 },
      { country: "Brasilien", code: "BR", views: 4_200_000, percentage: 2 },
      { country: "Polen", code: "PL", views: 4_200_000, percentage: 2 },
    ],
    viewsByCityTop: [
      { city: "Berlin", country: "Deutschland", views: 18_200_000, percentage: 8.7 },
      { city: "Hamburg", country: "Deutschland", views: 11_400_000, percentage: 5.4 },
      { city: "Munich", country: "Deutschland", views: 10_800_000, percentage: 5.1 },
      { city: "Vienna", country: "Österreich", views: 14_600_000, percentage: 7.0 },
      { city: "Zurich", country: "Schweiz", views: 8_200_000, percentage: 3.9 },
      { city: "Cologne", country: "Deutschland", views: 7_400_000, percentage: 3.5 },
      { city: "Frankfurt", country: "Deutschland", views: 6_800_000, percentage: 3.2 },
      { city: "London", country: "Großbritannien", views: 5_600_000, percentage: 2.7 },
      { city: "Düsseldorf", country: "Deutschland", views: 4_200_000, percentage: 2.0 },
      { city: "Stuttgart", country: "Deutschland", views: 3_800_000, percentage: 1.8 },
    ],
  };
}
