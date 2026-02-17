import { motion } from "framer-motion";
import type { Insight, InsightType, Platform } from "~/types/social-media";
import { PLATFORM_CONFIG } from "~/lib/mock-data/config";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconBulb,
  IconInfoCircle,
  IconSparkles,
} from "@tabler/icons-react";

interface InsightsPanelProps {
  insights: Insight[];
}

const INSIGHT_ICON_MAP: Record<
  InsightType,
  { icon: typeof IconTrendingUp; className: string }
> = {
  positive: { icon: IconTrendingUp, className: "text-emerald-600 dark:text-emerald-400" },
  negative: { icon: IconTrendingDown, className: "text-red-600 dark:text-red-400" },
  action: { icon: IconBulb, className: "text-amber-600 dark:text-amber-400" },
  neutral: { icon: IconInfoCircle, className: "text-blue-600 dark:text-blue-400" },
};

export function InsightsPanel({ insights }: InsightsPanelProps) {
  return (
    <Card className="border-0 bg-secondary/50 shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>KI-Insights</CardTitle>
          <IconSparkles className="size-4 text-primary" />
        </div>
        <CardDescription>Automatisch generierte Empfehlungen</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          {insights.map((insight, index) => {
            const { icon: Icon, className: iconClass } =
              INSIGHT_ICON_MAP[insight.type];
            const isLast = index === insights.length - 1;

            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className={`flex items-start gap-3 py-3 ${
                  !isLast ? "border-b border-border/50" : ""
                }`}
              >
                {/* Left: Icon */}
                <div className="mt-0.5 shrink-0">
                  <Icon className={`size-4 ${iconClass}`} />
                </div>

                {/* Center: Title + Description */}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="text-sm font-medium">{insight.title}</span>
                  <span className="line-clamp-2 text-xs text-muted-foreground">
                    {insight.description}
                  </span>
                </div>

                {/* Right: Platform + Change */}
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  {insight.platform && (
                    <div className="flex items-center gap-1.5">
                      <div
                        className="size-1.5 rounded-full"
                        style={{
                          backgroundColor:
                            PLATFORM_CONFIG[insight.platform as Platform].color,
                        }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {PLATFORM_CONFIG[insight.platform as Platform].name}
                      </span>
                    </div>
                  )}
                  {insight.change !== undefined && (
                    <span
                      className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium ${
                        insight.change >= 0
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-red-500/10 text-red-600 dark:text-red-400"
                      }`}
                    >
                      {insight.change >= 0 ? "+" : ""}
                      {insight.change}%
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
