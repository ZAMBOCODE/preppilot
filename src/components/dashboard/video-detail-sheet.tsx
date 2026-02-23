import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "~/components/ui/sheet";
import { Badge } from "~/components/ui/badge";
import { formatCompactNumber } from "~/lib/mock-data/helpers";

export interface DetailMetric {
  label: string;
  key: string;
  format?: "compact" | "percentage" | "text" | "date";
}

interface VideoDetailSheetProps<T extends Record<string, unknown>> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  video: T | null;
  metrics: DetailMetric[];
  accentColor: string;
  platformName: string;
}

function formatValue(value: unknown, format?: string) {
  if (value == null) return "–";
  if (format === "percentage") return `${value}%`;
  if (format === "text") return String(value);
  if (format === "date") {
    return new Date(String(value)).toLocaleDateString("de-DE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return formatCompactNumber(Number(value) || 0);
}

export function VideoDetailSheet<T extends Record<string, unknown>>({
  open,
  onOpenChange,
  video,
  metrics,
  accentColor,
  platformName,
}: VideoDetailSheetProps<T>) {
  if (!video) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <Badge
              style={{ backgroundColor: accentColor, color: "#fff", borderColor: "transparent" }}
            >
              {platformName}
            </Badge>
          </div>
          <SheetTitle className="font-heading text-lg leading-snug">
            {String(video.title)}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Detail-Metriken für {String(video.title)}
          </SheetDescription>
        </SheetHeader>

        {video.thumbnailUrl && (
          <div className="px-4">
            <img
              src={String(video.thumbnailUrl)}
              alt={String(video.title)}
              className="aspect-video w-full rounded-lg object-cover"
            />
          </div>
        )}

        <div className="space-y-1 px-4 pb-6">
          <h4 className="text-muted-foreground mb-3 text-xs font-medium uppercase tracking-wider">
            Metriken
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric) => (
              <div
                key={metric.key}
                className="rounded-lg bg-secondary/60 p-3"
              >
                <span className="text-muted-foreground text-xs">{metric.label}</span>
                <p className="font-heading text-lg font-semibold tabular-nums">
                  {formatValue(video[metric.key], metric.format)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
