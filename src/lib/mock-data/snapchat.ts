import type { TimePeriod, SnapchatData } from "~/types/social-media";
import { generateTimeSeries } from "./helpers";

export function getSnapchatData(period: TimePeriod): SnapchatData {
  return {
    score: 458_000, scoreChange: 1.8, friends: 12_400, friendsChange: 2.3, bestFriends: 24,
    storyViews: 340_000, storyViewsChange: 4.1, storiesPosted: 89,
    avgCompletionRate: 72.4, avgCompletionRateChange: 1.2, totalScreenshots: 18_400, totalReplies: 12_600,
    stories: [
      { id: "ss1", title: "Wochenend-Abenteuer", views: 48_000, screenshots: 3_200, replies: 1_800, completionRate: 78, postedAt: "2026-02-15" },
      { id: "ss2", title: "Neues Produkt Teaser", views: 42_000, screenshots: 4_500, replies: 2_100, completionRate: 82, postedAt: "2026-02-13" },
      { id: "ss3", title: "Tag im Leben", views: 38_000, screenshots: 2_100, replies: 1_400, completionRate: 74, postedAt: "2026-02-11" },
      { id: "ss4", title: "Essen-Bewertung", views: 35_000, screenshots: 1_800, replies: 980, completionRate: 68, postedAt: "2026-02-09" },
      { id: "ss5", title: "Reise-Snaps: Italien", views: 44_000, screenshots: 3_800, replies: 2_400, completionRate: 85, postedAt: "2026-02-07" },
      { id: "ss6", title: "Fragen & Antworten", views: 31_000, screenshots: 1_200, replies: 3_200, completionRate: 71, postedAt: "2026-02-05" },
    ],
    storyViewsOverTime: generateTimeSeries(period, 11_300, 0.4, 0.015, 401),
    streaks: 847, streaksChange: -1.2, longestStreak: 412,
    spotlightViews: 1_200_000, spotlightViewsChange: 12.4,
    spotlights: [
      { id: "sp1", title: "Viraler Tanz-Challenge", views: 480_000, favorites: 34_000, shares: 12_000, totalWatchTime: "2,400h", postedAt: "2026-02-10" },
      { id: "sp2", title: "Koch-Hack enthüllt", views: 320_000, favorites: 22_000, shares: 8_400, totalWatchTime: "1,600h", postedAt: "2026-02-06" },
      { id: "sp3", title: "Haustier-Compilation", views: 240_000, favorites: 18_000, shares: 6_200, totalWatchTime: "1,100h", postedAt: "2026-02-02" },
      { id: "sp4", title: "Sonnenuntergang Timelapse", views: 160_000, favorites: 12_000, shares: 4_800, totalWatchTime: "780h", postedAt: "2026-01-28" },
    ],
    spotlightViewsOverTime: generateTimeSeries(period, 40_000, 0.5, 0.04, 402),
    audienceDemographics: {
      ageGroups: [{ range: "13-17", percentage: 18 }, { range: "18-24", percentage: 45 }, { range: "25-34", percentage: 25 }, { range: "35-44", percentage: 8 }, { range: "45+", percentage: 4 }],
      gender: { male: 40, female: 56, other: 4 },
      topCountries: [{ country: "Deutschland", percentage: 42, followers: 5_200 }, { country: "Österreich", percentage: 15, followers: 1_860 }, { country: "Schweiz", percentage: 12, followers: 1_488 }, { country: "Frankreich", percentage: 8, followers: 992 }, { country: "Niederlande", percentage: 6, followers: 744 }],
    },
  };
}
