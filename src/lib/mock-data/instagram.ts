import type { TimePeriod, InstagramData } from "~/types/social-media";
import { generateTimeSeries } from "./helpers";

export function getInstagramData(period: TimePeriod): InstagramData {
  return {
    followers: 1_820_000, followersChange: 3.8, following: 892, posts: 1_247,
    profileVisits: 2_100_000, profileVisitsChange: 4.5, websiteClicks: 34_000, websiteClicksChange: 7.2, emailClicks: 8_400,
    likes: 9_400_000, likesChange: 5.2, comments: 620_000, commentsChange: 4.1,
    saves: 340_000, savesChange: 7.8, shares: 180_000, sharesChange: 6.3,
    reach: 4_200_000, reachChange: 6.3, impressions: 12_800_000, impressionsChange: 4.9,
    accountsReached: 3_800_000, accountsEngaged: 890_000,
    storiesViews: 890_000, storiesViewsChange: 2.1, storiesPosted: 156, avgStoryExitRate: 22.4, avgStoryReplyRate: 1.8,
    stories: [
      { id: "s1", title: "Neue Kollektion Vorschau", impressions: 145_000, reach: 98_000, exits: 18_000, replies: 2_400, tapsForward: 12_000, tapsBack: 3_200, postedAt: "2026-02-14" },
      { id: "s2", title: "Tag im Büro", impressions: 132_000, reach: 89_000, exits: 15_000, replies: 1_800, tapsForward: 10_500, tapsBack: 2_800, postedAt: "2026-02-13" },
      { id: "s3", title: "Umfrage: Sommerpläne?", impressions: 128_000, reach: 92_000, exits: 12_000, replies: 4_200, tapsForward: 8_900, tapsBack: 4_100, postedAt: "2026-02-12" },
      { id: "s4", title: "Produkt-Unboxing", impressions: 118_000, reach: 78_000, exits: 20_000, replies: 1_200, tapsForward: 14_000, tapsBack: 2_100, postedAt: "2026-02-10" },
      { id: "s5", title: "Behind the Scenes: Shooting", impressions: 110_000, reach: 72_000, exits: 14_000, replies: 980, tapsForward: 9_800, tapsBack: 2_400, postedAt: "2026-02-08" },
    ],
    reelsPerformance: [
      { id: "r1", title: "Sommer-Vibes Compilation", views: 3_200_000, likes: 280_000, comments: 18_000, saves: 42_000, shares: 28_000, reach: 2_800_000, postedAt: "2026-02-12" },
      { id: "r2", title: "Hinter den Kulissen: Fotoshooting", views: 2_800_000, likes: 240_000, comments: 15_000, saves: 38_000, shares: 22_000, reach: 2_400_000, postedAt: "2026-02-09" },
      { id: "r3", title: "Get Ready With Me", views: 2_100_000, likes: 190_000, comments: 12_000, saves: 28_000, shares: 16_000, reach: 1_800_000, postedAt: "2026-02-06" },
      { id: "r4", title: "Travel Vlog: Paris Edition", views: 1_900_000, likes: 170_000, comments: 11_000, saves: 35_000, shares: 14_000, reach: 1_600_000, postedAt: "2026-02-04" },
      { id: "r5", title: "Hautpflege-Routine 2026", views: 1_600_000, likes: 145_000, comments: 9_800, saves: 52_000, shares: 11_000, reach: 1_300_000, postedAt: "2026-02-01" },
      { id: "r6", title: "Was ich an einem Tag esse", views: 1_400_000, likes: 120_000, comments: 8_200, saves: 31_000, shares: 9_200, reach: 1_100_000, postedAt: "2026-01-29" },
    ],
    topPosts: [
      { id: "p1", title: "Sonnenuntergang auf Santorini", type: "image", likes: 340_000, comments: 12_000, saves: 89_000, shares: 15_000, reach: 2_100_000, impressions: 3_400_000, postedAt: "2026-02-11" },
      { id: "p2", title: "Neue Wohnung Tour", type: "carousel", likes: 280_000, comments: 18_000, saves: 67_000, shares: 12_000, reach: 1_800_000, impressions: 2_900_000, postedAt: "2026-02-07" },
      { id: "p3", title: "Marken-Kooperation enthüllt", type: "image", likes: 220_000, comments: 9_800, saves: 34_000, shares: 8_400, reach: 1_500_000, impressions: 2_200_000, postedAt: "2026-02-03" },
      { id: "p4", title: "Café-Entdeckungen", type: "carousel", likes: 195_000, comments: 7_600, saves: 45_000, shares: 6_200, reach: 1_200_000, impressions: 1_800_000, postedAt: "2026-01-31" },
    ],
    reachOverTime: generateTimeSeries(period, 140_000, 0.35, 0.025, 201),
    impressionsOverTime: generateTimeSeries(period, 426_000, 0.3, 0.02, 202),
    followerGrowthOverTime: generateTimeSeries(period, 60_700, 0.25, 0.025, 203),
    engagementByType: [{ type: "Likes", count: 9_400_000 }, { type: "Kommentare", count: 620_000 }, { type: "Gespeichert", count: 340_000 }, { type: "Shares", count: 180_000 }],
    contentTypePerformance: [
      { type: "Reels", avgReach: 1_800_000, avgEngagement: 6.8, count: 48 },
      { type: "Karussells", avgReach: 1_200_000, avgEngagement: 5.2, count: 32 },
      { type: "Bilder", avgReach: 800_000, avgEngagement: 3.9, count: 64 },
      { type: "Videos", avgReach: 600_000, avgEngagement: 4.1, count: 12 },
    ],
    audienceDemographics: {
      ageGroups: [{ range: "13-17", percentage: 6 }, { range: "18-24", percentage: 38 }, { range: "25-34", percentage: 34 }, { range: "35-44", percentage: 14 }, { range: "45-54", percentage: 6 }, { range: "55+", percentage: 2 }],
      gender: { male: 36, female: 60, other: 4 },
      topCountries: [{ country: "Deutschland", percentage: 36, followers: 655_000 }, { country: "Österreich", percentage: 11, followers: 200_000 }, { country: "Schweiz", percentage: 9, followers: 163_000 }, { country: "USA", percentage: 8, followers: 145_000 }, { country: "Großbritannien", percentage: 6, followers: 109_000 }],
      topCities: [{ city: "Berlin", percentage: 11 }, { city: "Munich", percentage: 8 }, { city: "Hamburg", percentage: 7 }, { city: "Vienna", percentage: 6 }, { city: "Cologne", percentage: 5 }],
    },
    activeHours: [
      { hour: 7, day: "Mo", activity: 40 }, { hour: 12, day: "Mo", activity: 72 }, { hour: 18, day: "Mo", activity: 65 },
      { hour: 12, day: "Fr", activity: 78 }, { hour: 18, day: "Fr", activity: 80 },
      { hour: 10, day: "Sa", activity: 82 }, { hour: 14, day: "Sa", activity: 88 },
      { hour: 10, day: "So", activity: 85 }, { hour: 14, day: "So", activity: 90 }, { hour: 19, day: "So", activity: 95 },
    ],
  };
}
