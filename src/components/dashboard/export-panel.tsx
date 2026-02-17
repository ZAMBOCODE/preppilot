import { motion } from "framer-motion";
import {
  IconDownload,
  IconFileSpreadsheet,
  IconFileText,
} from "@tabler/icons-react";
import type { Platform, OverviewData } from "~/types/social-media";
import { PLATFORM_CONFIG } from "~/lib/mock-data/config";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";

interface ExportPanelProps {
  overviewData: OverviewData;
  onExportCSV?: () => void;
  onExportJSON?: () => void;
}

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function generateCSV(data: OverviewData): string {
  const rows: (string | number)[][] = [
    ["Metrik", "Wert", "Änderung (%)"],
    ["Follower gesamt", data.totalFollowers, data.totalFollowersChange],
    [
      "Engagement-Rate",
      data.totalEngagementRate,
      data.totalEngagementRateChange,
    ],
    ["Beiträge gesamt", data.totalPosts, data.totalPostsChange],
    ["Reichweite gesamt", data.totalReach, data.totalReachChange],
    ["Impressionen gesamt", data.totalImpressions, data.totalImpressionsChange],
    ["Videoaufrufe gesamt", data.totalVideoViews, data.totalVideoViewsChange],
    ["Likes gesamt", data.totalLikes, data.totalLikesChange],
    ["Kommentare gesamt", data.totalComments, data.totalCommentsChange],
    ["Shares gesamt", data.totalShares, data.totalSharesChange],
    [],
    ["Plattform", "Follower"],
    ...Object.entries(data.followersByPlatform).map(
      ([platform, followers]) => [
        PLATFORM_CONFIG[platform as Platform]?.name ?? platform,
        followers,
      ],
    ),
    [],
    ["Plattform", "Engagement-Rate", "Interaktionen gesamt"],
    ...data.engagementComparison.map((e) => [
      PLATFORM_CONFIG[e.platform].name,
      e.rate,
      e.totalEngagements,
    ]),
    [],
    ["Plattform", "Reichweite", "Impressionen"],
    ...data.reachByPlatform.map((r) => [
      PLATFORM_CONFIG[r.platform].name,
      r.reach,
      r.impressions,
    ]),
  ];

  return rows.map((r) => r.join(",")).join("\n");
}

export function ExportPanel({
  overviewData,
  onExportCSV,
  onExportJSON,
}: ExportPanelProps) {
  function handleCSVExport() {
    const csv = generateCSV(overviewData);
    downloadFile(csv, "analytics-export.csv", "text/csv;charset=utf-8;");
    onExportCSV?.();
  }

  function handleJSONExport() {
    const json = JSON.stringify(overviewData, null, 2);
    downloadFile(json, "analytics-export.json", "application/json");
    onExportJSON?.();
  }

  return (
    <Card className="gap-0 border-0 bg-secondary/50 py-0 shadow-none">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg">Daten exportieren</CardTitle>
        <CardDescription>
          Lade deine Analytics-Daten herunter
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* CSV Export */}
          <motion.button
            type="button"
            onClick={handleCSVExport}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="group flex flex-col items-center gap-3 rounded-lg border border-border/50 bg-background/50 p-6 text-center transition-all hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"
          >
            <div className="flex size-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 transition-colors group-hover:bg-emerald-500/20">
              <IconFileSpreadsheet className="size-6" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">CSV-Export</span>
              <span className="text-xs text-muted-foreground">
                Alle Metriken als CSV-Datei
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
              <IconDownload className="size-3.5" />
              Herunterladen
            </div>
          </motion.button>

          {/* JSON Export */}
          <motion.button
            type="button"
            onClick={handleJSONExport}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="group flex flex-col items-center gap-3 rounded-lg border border-border/50 bg-background/50 p-6 text-center transition-all hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"
          >
            <div className="flex size-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors group-hover:bg-blue-500/20">
              <IconFileText className="size-6" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">JSON-Export</span>
              <span className="text-xs text-muted-foreground">
                Rohdaten im JSON-Format
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
              <IconDownload className="size-3.5" />
              Herunterladen
            </div>
          </motion.button>
        </div>
      </CardContent>
    </Card>
  );
}
