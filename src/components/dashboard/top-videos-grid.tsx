import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "~/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { Badge } from "~/components/ui/badge";
import { formatCompactNumber } from "~/lib/mock-data/helpers";
import { useIsMobile } from "~/hooks/use-media-query";

export interface MetricOption {
  key: string;
  label: string;
  format?: "compact" | "percentage" | "text";
}

interface TopVideosGridProps<T extends Record<string, unknown>> {
  title: string;
  items: T[];
  metricOptions: MetricOption[];
  accentColor: string;
  onItemClick: (item: T) => void;
}

export function TopVideosGrid<T extends Record<string, unknown>>({
  title,
  items,
  metricOptions,
  accentColor,
  onItemClick,
}: TopVideosGridProps<T>) {
  const [sortMetric, setSortMetric] = useState(metricOptions[0].key);
  const isMobile = useIsMobile();
  const displayCount = isMobile ? 3 : 5;

  const sorted = useMemo(() => {
    return [...items]
      .sort((a, b) => {
        const aVal = Number(a[sortMetric]) || 0;
        const bVal = Number(b[sortMetric]) || 0;
        return bVal - aVal;
      })
      .slice(0, displayCount);
  }, [items, sortMetric, displayCount]);

  const activeOption = metricOptions.find((m) => m.key === sortMetric) ?? metricOptions[0];

  function formatMetricValue(value: unknown, format?: string) {
    if (format === "percentage") return `${value}%`;
    if (format === "text") return String(value);
    return formatCompactNumber(Number(value) || 0);
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        {title && <h3 className="font-heading text-lg font-semibold">{title}</h3>}
        <div className={isMobile ? "w-full overflow-x-auto" : undefined}>
          <ToggleGroup
            type="single"
            value={sortMetric}
            onValueChange={(v) => v && setSortMetric(v)}
            variant="outline"
            size="sm"
            className={isMobile ? "flex-nowrap" : undefined}
          >
            {metricOptions.map((option) => (
              <ToggleGroupItem
                key={option.key}
                value={option.key}
                className={isMobile ? "shrink-0 text-xs" : "text-xs"}
              >
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {sorted.map((item, index) => (
          <motion.div
            key={String(item.id)}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              className="cursor-pointer border-0 bg-secondary/50 shadow-none transition-colors hover:bg-secondary/80"
              onClick={() => onItemClick(item)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={String(item.thumbnailUrl)}
                    alt={String(item.title)}
                    className={`w-full rounded-t-xl object-cover ${
                      isMobile ? "aspect-[16/9]" : "aspect-[4/3]"
                    }`}
                    loading="lazy"
                  />
                  <Badge
                    className="absolute top-2 left-2 text-xs font-bold"
                    style={{ backgroundColor: accentColor, color: "#fff", borderColor: "transparent" }}
                  >
                    #{index + 1}
                  </Badge>
                </div>
                <div className="space-y-1.5 p-3">
                  <p className="font-heading text-sm font-semibold leading-snug line-clamp-2">
                    {String(item.title)}
                  </p>
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted-foreground text-xs">{activeOption.label}</span>
                    <span className="font-heading text-base font-semibold tabular-nums">
                      {formatMetricValue(item[sortMetric], activeOption.format)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
