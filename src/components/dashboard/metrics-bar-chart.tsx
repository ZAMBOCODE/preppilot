import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { formatCompactNumber } from "~/lib/mock-data/helpers";

export interface BarMetric {
  label: string;
  value: number;
  change?: number;
  format?: "number" | "compact" | "percentage" | "text" | "currency";
  textValue?: string;
}

interface MetricsBarChartProps {
  title: string;
  metrics: BarMetric[];
  accentColor?: string;
  className?: string;
}

function formatValue(metric: BarMetric): string {
  if (metric.textValue) return metric.textValue;
  if (metric.format === "percentage") return `${metric.value}%`;
  if (metric.format === "currency") return `€${metric.value.toLocaleString("de-DE")}`;
  if (metric.format === "number") return metric.value.toLocaleString("de-DE");
  return formatCompactNumber(metric.value);
}

export function MetricsBarChart({ title, metrics, accentColor = "var(--color-primary)", className }: MetricsBarChartProps) {
  const maxVal = Math.max(...metrics.filter((m) => m.format !== "percentage" && m.format !== "text").map((m) => m.value), 1);

  return (
    <Card className={cn("border-0 bg-secondary/60 shadow-none", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="font-heading text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {metrics.map((metric) => {
          const barWidth = metric.format === "percentage"
            ? metric.value
            : (metric.value / maxVal) * 100;

          return (
            <div key={metric.label} className="flex items-center gap-3">
              <span className="text-muted-foreground w-28 shrink-0 text-xs font-medium">
                {metric.label}
              </span>
              <div className="relative h-6 flex-1 overflow-hidden rounded bg-muted/60">
                <div
                  className="absolute inset-y-0 left-0 rounded transition-all duration-500"
                  style={{
                    width: `${Math.max(barWidth, 2)}%`,
                    backgroundColor: accentColor,
                    opacity: 0.2,
                  }}
                />
                <div
                  className="absolute inset-y-0 left-0 w-0.5 rounded-l"
                  style={{
                    width: `${Math.max(barWidth, 2)}%`,
                    maxWidth: "3px",
                    backgroundColor: accentColor,
                    opacity: 0.8,
                  }}
                />
              </div>
              <span className="w-16 shrink-0 text-right font-heading text-sm font-semibold tabular-nums">
                {formatValue(metric)}
              </span>
              {metric.change !== undefined && (
                <span
                  className={cn(
                    "inline-flex w-14 shrink-0 items-center justify-end gap-0.5 text-[11px] font-medium",
                    metric.change >= 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400",
                  )}
                >
                  {metric.change >= 0 ? (
                    <IconTrendingUp className="size-3" />
                  ) : (
                    <IconTrendingDown className="size-3" />
                  )}
                  {metric.change >= 0 ? "+" : ""}
                  {metric.change}%
                </span>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
