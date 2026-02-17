import type { Competitor } from "~/types/social-media";

export function getCompetitors(): Competitor[] {
  return [
    {
      id: "comp-1",
      name: "MaxVibes",
      avatar: "MV",
      platforms: [
        {
          platform: "tiktok",
          followers: 3_100_000,
          engagementRate: 6.9,
          postsPerWeek: 12,
          avgViews: 1_450_000,
        },
        {
          platform: "instagram",
          followers: 2_200_000,
          engagementRate: 4.8,
          postsPerWeek: 7,
          avgViews: 680_000,
        },
        {
          platform: "youtube",
          followers: 720_000,
          engagementRate: 5.1,
          postsPerWeek: 2,
          avgViews: 340_000,
        },
        {
          platform: "snapchat",
          followers: 180_000,
          engagementRate: 2.8,
          postsPerWeek: 5,
          avgViews: 45_000,
        },
      ],
    },
    {
      id: "comp-2",
      name: "LenaContent",
      avatar: "LC",
      platforms: [
        {
          platform: "tiktok",
          followers: 1_980_000,
          engagementRate: 8.4,
          postsPerWeek: 8,
          avgViews: 2_100_000,
        },
        {
          platform: "instagram",
          followers: 2_650_000,
          engagementRate: 6.2,
          postsPerWeek: 10,
          avgViews: 920_000,
        },
        {
          platform: "youtube",
          followers: 1_150_000,
          engagementRate: 3.8,
          postsPerWeek: 1,
          avgViews: 520_000,
        },
        {
          platform: "snapchat",
          followers: 95_000,
          engagementRate: 3.5,
          postsPerWeek: 3,
          avgViews: 28_000,
        },
      ],
    },
    {
      id: "comp-3",
      name: "JannikDaily",
      avatar: "JD",
      platforms: [
        {
          platform: "tiktok",
          followers: 4_500_000,
          engagementRate: 5.6,
          postsPerWeek: 18,
          avgViews: 980_000,
        },
        {
          platform: "instagram",
          followers: 1_340_000,
          engagementRate: 3.9,
          postsPerWeek: 5,
          avgViews: 310_000,
        },
        {
          platform: "youtube",
          followers: 560_000,
          engagementRate: 4.5,
          postsPerWeek: 3,
          avgViews: 180_000,
        },
        {
          platform: "snapchat",
          followers: 420_000,
          engagementRate: 4.1,
          postsPerWeek: 8,
          avgViews: 92_000,
        },
      ],
    },
    {
      id: "comp-4",
      name: "SophieTalks",
      avatar: "ST",
      platforms: [
        {
          platform: "tiktok",
          followers: 2_100_000,
          engagementRate: 9.2,
          postsPerWeek: 6,
          avgViews: 3_200_000,
        },
        {
          platform: "instagram",
          followers: 1_780_000,
          engagementRate: 5.7,
          postsPerWeek: 8,
          avgViews: 540_000,
        },
        {
          platform: "youtube",
          followers: 890_000,
          engagementRate: 6.3,
          postsPerWeek: 2,
          avgViews: 710_000,
        },
        {
          platform: "snapchat",
          followers: 210_000,
          engagementRate: 3.2,
          postsPerWeek: 4,
          avgViews: 58_000,
        },
      ],
    },
  ];
}
