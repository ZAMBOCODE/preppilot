import type { Insight } from "~/types/social-media";

export function getInsights(): Insight[] {
  return [
    {
      id: "insight-1",
      type: "positive",
      title: "Engagement-Rate steigt kontinuierlich",
      description:
        "Deine TikTok Engagement-Rate liegt bei 7.8% und ist damit 23% höher als der Branchendurchschnitt von 6.3%. Besonders Duett-Videos performen überdurchschnittlich gut.",
      metric: "engagementRate",
      change: 23,
      platform: "tiktok",
    },
    {
      id: "insight-2",
      type: "negative",
      title: "YouTube CTR gesunken",
      description:
        "Deine Click-Through-Rate auf YouTube ist in den letzten 14 Tagen von 5.8% auf 4.2% gefallen. Thumbnails mit Gesichtern und kontrastreichem Text performen bei dir normalerweise 40% besser.",
      metric: "clickThroughRate",
      change: -27.6,
      platform: "youtube",
    },
    {
      id: "insight-3",
      type: "action",
      title: "Beste Post-Zeit verpasst",
      description:
        "Du postest auf Instagram meistens um 14:00 Uhr, aber deine Audience ist zwischen 19:00 und 21:00 Uhr am aktivsten. Eine Verschiebung könnte deine Reichweite um bis zu 35% steigern.",
      metric: "reach",
      change: -35,
      platform: "instagram",
    },
    {
      id: "insight-4",
      type: "neutral",
      title: "Instagram Algorithmus Update",
      description:
        "Instagram hat letzte Woche einen Algorithmus-Update ausgerollt, der längere Reels (60-90 Sekunden) bevorzugt. Deine durchschnittliche Reel-Länge liegt bei 28 Sekunden. Teste längere Formate.",
      platform: "instagram",
    },
    {
      id: "insight-5",
      type: "positive",
      title: "Snapchat Wachstum beschleunigt",
      description:
        "Deine Snapchat Spotlight-Views sind diese Woche um 42% gestiegen. Der Trend zeigt, dass dein humorvoller Content dort besonders gut ankommt. Weiter so!",
      metric: "spotlightViews",
      change: 42,
      platform: "snapchat",
    },
    {
      id: "insight-6",
      type: "action",
      title: "YouTube Shorts als Wachstumshebel",
      description:
        "Du postest nur 2 YouTube Shorts pro Woche, aber sie bringen 60% deiner neuen Abonnenten. Erhöhe auf 5 Shorts pro Woche, um das Wachstum auf dem Weg zur 1M-Marke zu beschleunigen.",
      metric: "subscribers",
      change: 60,
      platform: "youtube",
    },
    {
      id: "insight-7",
      type: "negative",
      title: "Instagram Story Completion Rate sinkt",
      description:
        "Die Abschlussrate deiner Instagram Stories ist von 72% auf 58% gefallen. Stories mit mehr als 8 Slides verlieren deutlich an Zuschauern. Halte deine Stories kürzer und interaktiver.",
      metric: "storyCompletionRate",
      change: -19.4,
      platform: "instagram",
    },
    {
      id: "insight-8",
      type: "positive",
      title: "Cross-Platform Synergien erkannt",
      description:
        "Follower, die dir auf mindestens 2 Plattformen folgen, haben eine 3x höhere Engagement-Rate. Deine Cross-Promotion-Posts letzte Woche haben 12.000 neue Multi-Plattform-Follower gebracht.",
      metric: "crossPlatformFollowers",
      change: 18,
    },
    {
      id: "insight-9",
      type: "action",
      title: "TikTok LIVE Potenzial ungenutzt",
      description:
        "Deine letzten 3 TikTok Lives hatten durchschnittlich 45.000 Zuschauer, aber du streamst nur einmal pro Woche. Creator in deiner Größe streamen 3-4x wöchentlich und wachsen 2x schneller.",
      metric: "liveViewers",
      platform: "tiktok",
    },
    {
      id: "insight-10",
      type: "neutral",
      title: "Zielgruppen-Verschiebung erkannt",
      description:
        "Der Anteil der 25-34-Jährigen in deiner Audience ist im letzten Monat von 28% auf 32% gestiegen, während die 13-17-Jährigen leicht zurückgehen. Das kann Auswirkungen auf Markendeals haben.",
      metric: "demographics",
      change: 4,
    },
  ];
}
