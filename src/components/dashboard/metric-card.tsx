import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { formatCompactNumber } from "~/lib/mock-data/helpers";

interface MetricCardProps {
  label: string;
  value: number | string;
  change?: number;
  format?: "number" | "percentage" | "compact";
  accentColor?: string;
}

export function MetricCard({ label, value, change, format = "compact", accentColor }: MetricCardProps) {
  const formattedValue =
    typeof value === "string"
      ? value
      : format === "percentage"
        ? `${value}%`
        : format === "compact"
          ? formatCompactNumber(value)
          : value.toLocaleString();

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="gap-0 border-0 bg-secondary/50 py-0 shadow-none">
        <CardContent className="p-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              {accentColor && (
                <div className="size-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
              )}
              <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{label}</span>
            </div>
            <span className="font-heading text-2xl font-semibold tracking-tight">{formattedValue}</span>
            {change !== undefined && (
              <div className="flex items-center gap-1.5 text-xs">
                <span className={cn(
                  "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-medium",
                  change >= 0
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-red-500/10 text-red-600 dark:text-red-400"
                )}>
                  {change >= 0 ? <IconTrendingUp className="size-3" /> : <IconTrendingDown className="size-3" />}
                  {change >= 0 ? "+" : ""}{change}%
                </span>
                <span className="text-muted-foreground">vs. Vorz.</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
