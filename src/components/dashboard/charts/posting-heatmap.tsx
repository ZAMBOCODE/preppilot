import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { Badge } from "~/components/ui/badge";
import { useIsMobile } from "~/hooks/use-media-query";

interface PostingHeatmapProps {
  data: { hour: number; day: string; activity: number }[];
  accentColor?: string;
}

const DAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

function MobileHeatmap({ data, accentColor = "#851330" }: PostingHeatmapProps) {
  // Calculate peak hours per day
  const peaksByDay = DAYS.map((day) => {
    const dayData = data.filter((d) => d.day === day);
    if (dayData.length === 0) return { day, peakHour: 0, activity: 0 };
    const peak = dayData.reduce((best, curr) => (curr.activity > best.activity ? curr : best));
    return { day, peakHour: peak.hour, activity: peak.activity };
  });

  const maxActivity = Math.max(...peaksByDay.map((p) => p.activity), 1);

  return (
    <Card className="border-0 bg-secondary/60 shadow-none">
      <CardHeader>
        <CardTitle className="font-heading text-base font-semibold">Beste Posting-Zeiten</CardTitle>
        <CardDescription>Wann deine Zielgruppe am aktivsten ist</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {peaksByDay.map((peak) => {
            const intensity = peak.activity / maxActivity;
            return (
              <div key={peak.day} className="flex items-center gap-3">
                <span className="w-8 shrink-0 text-sm font-medium">{peak.day}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${intensity * 100}%`,
                      backgroundColor: accentColor,
                      opacity: 0.7,
                    }}
                  />
                </div>
                <Badge
                  variant="outline"
                  className="shrink-0 text-xs tabular-nums"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  {peak.peakHour}:00
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function DesktopHeatmap({ data, accentColor = "#851330" }: PostingHeatmapProps) {
  const maxActivity = Math.max(...data.map((d) => d.activity), 1);

  const getActivity = (day: string, hour: number) => {
    return data.find((d) => d.day === day && d.hour === hour)?.activity ?? 0;
  };

  return (
    <Card className="border-0 bg-secondary/60 shadow-none">
      <CardHeader>
        <CardTitle className="font-heading text-base font-semibold">Zielgruppen-Aktivität</CardTitle>
        <CardDescription>Beste Zeiten zum Posten basierend auf Zielgruppen-Aktivität</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Hour labels */}
            <div className="mb-1 flex">
              <div className="w-10 flex-shrink-0" />
              <div className="flex flex-1 gap-[2px]">
                {HOURS.map((h) => (
                  <div key={h} className="flex-1 text-center text-[9px] text-muted-foreground tabular-nums">
                    {h % 3 === 0 ? `${h}:00` : ""}
                  </div>
                ))}
              </div>
            </div>
            {/* Grid */}
            <TooltipProvider delayDuration={100}>
              <div className="flex flex-col gap-[2px]">
                {DAYS.map((day) => (
                  <div key={day} className="flex items-center gap-0">
                    <span className="w-10 flex-shrink-0 text-xs text-muted-foreground">{day}</span>
                    <div className="flex flex-1 gap-[2px]">
                      {HOURS.map((hour) => {
                        const activity = getActivity(day, hour);
                        const intensity = activity / maxActivity;
                        return (
                          <Tooltip key={hour}>
                            <TooltipTrigger asChild>
                              <div
                                className="aspect-square flex-1 rounded-[3px] transition-colors"
                                style={{
                                  backgroundColor: accentColor,
                                  opacity: Math.max(0.05, intensity * 0.85),
                                }}
                              />
                            </TooltipTrigger>
                            <TooltipContent className="text-xs">
                              <p className="font-medium">{day} {hour}:00</p>
                              <p className="text-muted-foreground">Aktivität: {activity}</p>
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </TooltipProvider>
            {/* Legend */}
            <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
              <span>Weniger</span>
              {[0.05, 0.25, 0.5, 0.75, 1].map((v) => (
                <div
                  key={v}
                  className="size-3 rounded-[2px]"
                  style={{ backgroundColor: accentColor, opacity: v * 0.85 }}
                />
              ))}
              <span>Mehr</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PostingHeatmap(props: PostingHeatmapProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileHeatmap {...props} /> : <DesktopHeatmap {...props} />;
}
