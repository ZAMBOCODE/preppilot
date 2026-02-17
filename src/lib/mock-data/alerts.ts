import type { MetricAlert } from "~/types/social-media";

export function getAlerts(): MetricAlert[] {
  return [
    {
      id: "alert-1",
      severity: "critical",
      platform: "youtube",
      metric: "CTR",
      message:
        "Click-Through-Rate ist in den letzten 7 Tagen um 27.6% gefallen. Thumbnails und Titel sollten optimiert werden.",
      currentValue: 4.2,
      previousValue: 5.8,
      change: -27.6,
      timestamp: "2026-02-17T10:30:00",
      acknowledged: false,
    },
    {
      id: "alert-2",
      severity: "warning",
      platform: "instagram",
      metric: "Story Completion Rate",
      message:
        "Die Story-Abschlussrate ist von 72% auf 58% gesunken. Kürzere Stories mit Umfragen könnten helfen.",
      currentValue: 58,
      previousValue: 72,
      change: -19.4,
      timestamp: "2026-02-16T14:15:00",
      acknowledged: false,
    },
    {
      id: "alert-3",
      severity: "critical",
      platform: "tiktok",
      metric: "Avg. Watch Time",
      message:
        "Die durchschnittliche Wiedergabezeit ist unter 8 Sekunden gefallen. Videos mit Hook in den ersten 2 Sekunden performen 3x besser.",
      currentValue: 7.8,
      previousValue: 11.2,
      change: -30.4,
      timestamp: "2026-02-17T08:00:00",
      acknowledged: false,
    },
    {
      id: "alert-4",
      severity: "info",
      platform: "instagram",
      metric: "Neue Follower",
      message:
        "Ungewöhnlich hoher Follower-Zuwachs (+18.000 in 24h). Möglicherweise durch virale Reel-Performance ausgelöst.",
      currentValue: 18_000,
      previousValue: 4_200,
      change: 328.6,
      timestamp: "2026-02-15T19:45:00",
      acknowledged: true,
    },
    {
      id: "alert-5",
      severity: "warning",
      platform: "youtube",
      metric: "Subscriber Growth",
      message:
        "Das Abonnenten-Wachstum hat sich diese Woche verlangsamt. Nur +2.100 neue Subs vs. +4.800 letzte Woche.",
      currentValue: 2_100,
      previousValue: 4_800,
      change: -56.3,
      timestamp: "2026-02-16T09:00:00",
      acknowledged: false,
    },
    {
      id: "alert-6",
      severity: "info",
      platform: "tiktok",
      metric: "Viral Content",
      message:
        "Dein Video 'POV: Du bist der letzte im Büro' hat 14.8M Views erreicht und ist auf der For-You-Page im Trending.",
      currentValue: 14_800_000,
      previousValue: 0,
      change: 100,
      timestamp: "2026-02-14T22:30:00",
      acknowledged: true,
    },
    {
      id: "alert-7",
      severity: "warning",
      platform: "snapchat",
      metric: "Streak Verluste",
      message:
        "12 Streaks sind in den letzten 3 Tagen abgelaufen. Regelmäßigere Snap-Aktivität wird empfohlen.",
      currentValue: 156,
      previousValue: 168,
      change: -7.1,
      timestamp: "2026-02-17T06:00:00",
      acknowledged: false,
    },
    {
      id: "alert-8",
      severity: "critical",
      platform: "instagram",
      metric: "Reach",
      message:
        "Die organische Reichweite ist im Vergleich zur Vorwoche um 32% eingebrochen. Mögliche Algorithmus-Änderung oder Shadow-Ban prüfen.",
      currentValue: 2_860_000,
      previousValue: 4_200_000,
      change: -31.9,
      timestamp: "2026-02-17T11:00:00",
      acknowledged: false,
    },
  ];
}
