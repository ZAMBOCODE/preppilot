import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";

interface PostingHeatmapProps {
  data: { hour: number; day: string; activity: number }[];
  accentColor?: string;
}

const DAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function PostingHeatmap({ data, accentColor = "#851330" }: PostingHeatmapProps) {
  const maxActivity = Math.max(...data.map((d) => d.activity), 1);

  const getActivity = (day: string, hour: number) => {
    return data.find((d) => d.day === day && d.hour === hour)?.activity ?? 0;
  };

  return (
    <Card className="border-0 bg-secondary/50 shadow-none">
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
