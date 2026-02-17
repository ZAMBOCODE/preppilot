import type { TimePeriod, TikTokData } from "~/types/social-media";
import { generateTimeSeries } from "./helpers";

export function getTikTokData(period: TimePeriod): TikTokData {
  return {
    followers: 2_430_000, followersChange: 5.2, following: 347,
    likes: 18_700_000, likesChange: 8.1,
    totalViews: 142_000_000, totalViewsChange: 12.4,
    profileViews: 3_800_000, profileViewsChange: 6.3,
    shares: 890_000, sharesChange: 3.7,
    comments: 1_240_000, commentsChange: 6.9,
    saves: 2_100_000, savesChange: 9.2,
    engagementRate: 7.8, engagementRateChange: 0.4,
    avgWatchTime: "12.4s", watchFullPercentage: 34.2, watchFullPercentageChange: 1.8,
    viewsOverTime: generateTimeSeries(period, 1_580_000, 0.4, 0.03, 101),
    followersOverTime: generateTimeSeries(period, 81_000, 0.3, 0.03, 102),
    videoPerformance: [
      { id: "v1", title: "Morgenroutine schiefgelaufen", views: 12_400_000, likes: 980_000, shares: 145_000, comments: 89_000, saves: 210_000, avgWatchTime: "18.2s", watchFullPercentage: 42, postedAt: "2026-02-10" },
      { id: "v2", title: "POV: Erster Tag im neuen Job", views: 8_900_000, likes: 720_000, shares: 98_000, comments: 67_000, saves: 156_000, avgWatchTime: "15.8s", watchFullPercentage: 38, postedAt: "2026-02-08" },
      { id: "v3", title: "Ich teste jedes Street Food in Tokyo", views: 6_200_000, likes: 540_000, shares: 78_000, comments: 45_000, saves: 189_000, avgWatchTime: "22.1s", watchFullPercentage: 28, postedAt: "2026-02-05" },
      { id: "v4", title: "3-Minuten-Rezepte die du brauchst", views: 5_800_000, likes: 490_000, shares: 67_000, comments: 38_000, saves: 320_000, avgWatchTime: "14.5s", watchFullPercentage: 45, postedAt: "2026-02-03" },
      { id: "v5", title: "So habe ich 10.000€ diesen Monat verdient", views: 4_100_000, likes: 380_000, shares: 56_000, comments: 34_000, saves: 98_000, avgWatchTime: "16.7s", watchFullPercentage: 31, postedAt: "2026-01-30" },
      { id: "v6", title: "Outfit-Check Challenge", views: 3_700_000, likes: 310_000, shares: 42_000, comments: 28_000, saves: 76_000, avgWatchTime: "11.3s", watchFullPercentage: 52, postedAt: "2026-01-28" },
      { id: "v7", title: "Life Hack: Ordnungstipps", views: 2_900_000, likes: 260_000, shares: 38_000, comments: 22_000, saves: 145_000, avgWatchTime: "19.8s", watchFullPercentage: 26, postedAt: "2026-01-25" },
      { id: "v8", title: "Duett mit @creator123", views: 2_100_000, likes: 190_000, shares: 29_000, comments: 18_000, saves: 34_000, avgWatchTime: "9.6s", watchFullPercentage: 58, postedAt: "2026-01-22" },
    ],
    trendingHashtags: [
      { tag: "#fyp", uses: 342, views: 48_000_000 }, { tag: "#viral", uses: 289, views: 35_000_000 },
      { tag: "#foodtok", uses: 156, views: 22_000_000 }, { tag: "#lifehack", uses: 134, views: 18_000_000 },
      { tag: "#ootd", uses: 98, views: 14_000_000 }, { tag: "#storytime", uses: 87, views: 11_000_000 },
      { tag: "#grwm", uses: 76, views: 9_200_000 }, { tag: "#recipe", uses: 65, views: 7_800_000 },
    ],
    audienceDemographics: {
      ageGroups: [
        { range: "13-17", percentage: 12 }, { range: "18-24", percentage: 42 }, { range: "25-34", percentage: 28 },
        { range: "35-44", percentage: 11 }, { range: "45-54", percentage: 5 }, { range: "55+", percentage: 2 },
      ],
      gender: { male: 38, female: 58, other: 4 },
      topCountries: [
        { country: "Deutschland", percentage: 38, followers: 923_000 }, { country: "Österreich", percentage: 14, followers: 340_000 },
        { country: "Schweiz", percentage: 10, followers: 243_000 }, { country: "USA", percentage: 7, followers: 170_000 },
        { country: "Großbritannien", percentage: 5, followers: 121_000 },
      ],
      topCities: [
        { city: "Berlin", percentage: 12 }, { city: "Vienna", percentage: 8 }, { city: "Munich", percentage: 7 },
        { city: "Hamburg", percentage: 6 }, { city: "Zurich", percentage: 5 },
      ],
    },
    trafficSources: [
      { source: "Für dich-Seite", percentage: 62, views: 88_000_000 }, { source: "Profil", percentage: 14, views: 19_900_000 },
      { source: "Folge-ich-Feed", percentage: 11, views: 15_600_000 }, { source: "Suche", percentage: 7, views: 9_900_000 },
      { source: "Sounds", percentage: 4, views: 5_700_000 }, { source: "Hashtags", percentage: 2, views: 2_800_000 },
    ],
    deviceBreakdown: [{ device: "iOS", percentage: 64 }, { device: "Android", percentage: 34 }, { device: "Sonstige", percentage: 2 }],
    activeHours: [
      { hour: 8, day: "Mo", activity: 35 }, { hour: 12, day: "Mo", activity: 55 }, { hour: 18, day: "Mo", activity: 78 }, { hour: 21, day: "Mo", activity: 92 },
      { hour: 12, day: "Fr", activity: 65 }, { hour: 18, day: "Fr", activity: 88 }, { hour: 21, day: "Fr", activity: 98 },
      { hour: 10, day: "Sa", activity: 70 }, { hour: 14, day: "Sa", activity: 85 }, { hour: 20, day: "Sa", activity: 100 },
      { hour: 10, day: "So", activity: 68 }, { hour: 14, day: "So", activity: 82 }, { hour: 19, day: "So", activity: 94 },
    ],
    liveStreams: [
      { id: "l1", title: "Fragen & Antworten mit Followern", peakViewers: 12_400, totalViewers: 89_000, duration: "1:32:00", diamonds: 45_200, newFollowers: 2_300, date: "2026-02-09" },
      { id: "l2", title: "Koch-Livestream", peakViewers: 8_900, totalViewers: 56_000, duration: "0:58:00", diamonds: 23_100, newFollowers: 1_100, date: "2026-02-02" },
      { id: "l3", title: "Hinter den Kulissen", peakViewers: 6_200, totalViewers: 34_000, duration: "0:45:00", diamonds: 12_800, newFollowers: 780, date: "2026-01-26" },
    ],
  };
}
