import { motion } from "framer-motion";
import type { MetricAlert, AlertSeverity, Platform } from "~/types/social-media";
import { PLATFORM_CONFIG } from "~/lib/mock-data/config";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  IconAlertTriangle,
  IconAlertCircle,
  IconInfoCircle,
  IconCheck,
} from "@tabler/icons-react";

interface AlertsPanelProps {
  alerts: MetricAlert[];
  onAcknowledge?: (id: string) => void;
}

const SEVERITY_ORDER: Record<AlertSeverity, number> = {
  critical: 0,
  warning: 1,
  info: 2,
};

const SEVERITY_ICON_MAP: Record<
  AlertSeverity,
  { icon: typeof IconAlertCircle; className: string }
> = {
  critical: { icon: IconAlertCircle, className: "text-red-600 dark:text-red-400" },
  warning: { icon: IconAlertTriangle, className: "text-amber-600 dark:text-amber-400" },
  info: { icon: IconInfoCircle, className: "text-blue-600 dark:text-blue-400" },
};

function formatRelativeTime(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return "gerade eben";
  if (diffMinutes < 60) return `vor ${diffMinutes} Min.`;
  if (diffHours < 24) return `vor ${diffHours} Std.`;
  if (diffDays === 1) return "vor 1 Tag";
  return `vor ${diffDays} Tagen`;
}

function getSeverityBadgeClass(severity: AlertSeverity): string {
  switch (severity) {
    case "critical":
      return "bg-red-500/10 text-red-600 dark:text-red-400 border-transparent";
    case "warning":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-transparent";
    case "info":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-transparent";
  }
}

function getSeverityLabel(severity: AlertSeverity): string {
  switch (severity) {
    case "critical":
      return "Kritisch";
    case "warning":
      return "Warnung";
    case "info":
      return "Info";
  }
}

export function AlertsPanel({ alerts, onAcknowledge }: AlertsPanelProps) {
  const unacknowledgedCount = alerts.filter((a) => !a.acknowledged).length;

  const sortedAlerts = [...alerts].sort((a, b) => {
    // Unacknowledged first
    if (a.acknowledged !== b.acknowledged) {
      return a.acknowledged ? 1 : -1;
    }
    // Then by severity
    if (SEVERITY_ORDER[a.severity] !== SEVERITY_ORDER[b.severity]) {
      return SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity];
    }
    // Then by timestamp (newest first)
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <Card className="border-0 bg-secondary/50 shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Benachrichtigungen</CardTitle>
          {unacknowledgedCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {unacknowledgedCount}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          {sortedAlerts.map((alert, index) => {
            const { icon: Icon, className: iconClass } =
              SEVERITY_ICON_MAP[alert.severity];
            const platformConfig = PLATFORM_CONFIG[alert.platform as Platform];
            const changeStr =
              alert.change >= 0
                ? `+${alert.change}%`
                : `${alert.change}%`;

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: alert.acknowledged ? 0.5 : 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className={`flex items-start gap-3 rounded-lg p-3 transition-opacity ${
                  alert.acknowledged ? "opacity-50" : ""
                }`}
              >
                {/* Left: Severity icon */}
                <div className="mt-0.5 shrink-0">
                  <Icon className={`size-4 ${iconClass}`} />
                </div>

                {/* Center: Content */}
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  {/* First line: Platform + metric + severity */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="size-1.5 rounded-full"
                        style={{ backgroundColor: platformConfig.color }}
                      />
                      <span className="text-xs font-medium">
                        {platformConfig.name}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {alert.metric}
                    </span>
                    <Badge
                      className={`text-[10px] px-1.5 py-0 ${getSeverityBadgeClass(alert.severity)}`}
                    >
                      {getSeverityLabel(alert.severity)}
                    </Badge>
                  </div>

                  {/* Second line: Message */}
                  <p className="text-sm leading-snug">{alert.message}</p>

                  {/* Third line: Value change + timestamp */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-mono">
                      {alert.currentValue.toLocaleString("de-DE")} &larr;{" "}
                      {alert.previousValue.toLocaleString("de-DE")} ({changeStr})
                    </span>
                    <span>&middot;</span>
                    <span>{formatRelativeTime(alert.timestamp)}</span>
                  </div>
                </div>

                {/* Right: Acknowledge button */}
                {!alert.acknowledged && onAcknowledge && (
                  <button
                    type="button"
                    onClick={() => onAcknowledge(alert.id)}
                    className="mt-0.5 shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    title="Als gelesen markieren"
                  >
                    <IconCheck className="size-4" />
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
