import { useState } from "react";
import type { CalendarPost, Platform } from "~/types/social-media";
import { PLATFORM_CONFIG } from "~/lib/mock-data/config";
import { formatCompactNumber } from "~/lib/mock-data/helpers";
import { AnimatedCard } from "~/components/dashboard/animated-card";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

interface ContentCalendarProps {
  posts: CalendarPost[];
}

const STATUS_LABELS: Record<CalendarPost["status"], string> = {
  published: "Veröffentlicht",
  scheduled: "Geplant",
  draft: "Entwurf",
};

const TYPE_LABELS: Record<CalendarPost["type"], string> = {
  video: "Video",
  image: "Bild",
  story: "Story",
  reel: "Reel",
  short: "Short",
  spotlight: "Spotlight",
  live: "Live",
};

const DAY_HEADERS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

/**
 * Build the February 2026 calendar grid.
 * February 2026 starts on Sunday (day index 6 in Mon-Sun layout).
 * 28 days total.
 */
function buildCalendarGrid(): (number | null)[][] {
  // Feb 1, 2026 = Sunday. In a Mon-Sun grid, Sunday is index 6.
  const startOffset = 6;
  const totalDays = 28;
  const weeks: (number | null)[][] = [];
  let currentDay = 1;

  // First week: pad with nulls until Sunday
  const firstWeek: (number | null)[] = [];
  for (let i = 0; i < 7; i++) {
    if (i < startOffset) {
      firstWeek.push(null);
    } else {
      firstWeek.push(currentDay++);
    }
  }
  weeks.push(firstWeek);

  // Remaining weeks
  while (currentDay <= totalDays) {
    const week: (number | null)[] = [];
    for (let i = 0; i < 7; i++) {
      if (currentDay <= totalDays) {
        week.push(currentDay++);
      } else {
        week.push(null);
      }
    }
    weeks.push(week);
  }

  return weeks;
}

function getPostsForDay(posts: CalendarPost[], day: number): CalendarPost[] {
  return posts.filter((post) => {
    const postDate = new Date(post.scheduledAt);
    return postDate.getDate() === day && postDate.getMonth() === 1; // February = 1
  });
}

export function ContentCalendar({ posts }: ContentCalendarProps) {
  const weeks = buildCalendarGrid();

  const publishedCount = posts.filter((p) => p.status === "published").length;
  const scheduledCount = posts.filter((p) => p.status === "scheduled").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;

  // Upcoming scheduled posts (next 5)
  const upcomingPosts = posts
    .filter((p) => p.status === "scheduled")
    .sort(
      (a, b) =>
        new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
    )
    .slice(0, 5);

  const today = new Date();
  const isToday = (day: number) =>
    today.getFullYear() === 2026 &&
    today.getMonth() === 1 &&
    today.getDate() === day;

  return (
    <AnimatedCard>
      <Card className="gap-0 border-0 bg-secondary/50 py-0 shadow-none">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-lg">Content-Kalender</CardTitle>
        <p className="text-sm text-muted-foreground">Februar 2026</p>
      </CardHeader>

      <CardContent className="p-4">
        {/* Calendar grid */}
        <div className="mb-4">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAY_HEADERS.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-muted-foreground py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Week rows */}
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="grid grid-cols-7 gap-1">
              {week.map((day, dayIdx) => {
                if (day === null) {
                  return <div key={dayIdx} className="h-16" />;
                }

                const dayPosts = getPostsForDay(posts, day);

                return (
                  <div
                    key={dayIdx}
                    className={`h-16 rounded-md border p-1 flex flex-col gap-0.5 ${
                      isToday(day)
                        ? "border-primary bg-primary/5"
                        : "border-border/50 bg-background/50"
                    }`}
                  >
                    <span
                      className={`text-xs font-medium leading-none ${
                        isToday(day)
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {day}
                    </span>

                    <div className="flex flex-wrap gap-0.5 mt-auto">
                      {dayPosts.map((post) => (
                        <Tooltip key={post.id}>
                          <TooltipTrigger asChild>
                            <div
                              className={`size-2.5 rounded-full shrink-0 cursor-pointer transition-transform hover:scale-150 ${
                                post.status === "scheduled"
                                  ? "ring-1 ring-offset-1 ring-offset-background opacity-70"
                                  : post.status === "draft"
                                    ? "opacity-30"
                                    : ""
                              }`}
                              style={{
                                backgroundColor:
                                  PLATFORM_CONFIG[post.platform].color,
                                ...(post.status === "scheduled"
                                  ? {
                                      ringColor:
                                        PLATFORM_CONFIG[post.platform].color,
                                    }
                                  : {}),
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="max-w-64 bg-popover text-popover-foreground border shadow-md p-3"
                          >
                            <div className="flex flex-col gap-1.5">
                              <p className="text-xs font-semibold leading-tight">
                                {post.title}
                              </p>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span
                                  className="inline-flex items-center gap-1 text-[10px] font-medium"
                                  style={{
                                    color:
                                      PLATFORM_CONFIG[post.platform].color,
                                  }}
                                >
                                  <span
                                    className="size-1.5 rounded-full"
                                    style={{
                                      backgroundColor:
                                        PLATFORM_CONFIG[post.platform].color,
                                    }}
                                  />
                                  {PLATFORM_CONFIG[post.platform].name}
                                </span>
                                <Badge
                                  variant="secondary"
                                  className="text-[10px] px-1.5 py-0"
                                >
                                  {TYPE_LABELS[post.type]}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="text-[10px] px-1.5 py-0"
                                >
                                  {STATUS_LABELS[post.status]}
                                </Badge>
                              </div>
                              {post.performance && (
                                <div className="flex gap-3 text-[10px] text-muted-foreground mt-0.5">
                                  <span>
                                    {formatCompactNumber(
                                      post.performance.views,
                                    )}{" "}
                                    Aufrufe
                                  </span>
                                  <span>
                                    {formatCompactNumber(
                                      post.performance.likes,
                                    )}{" "}
                                    Likes
                                  </span>
                                  <span>
                                    {formatCompactNumber(
                                      post.performance.comments,
                                    )}{" "}
                                    Kommentare
                                  </span>
                                </div>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-3">
          {(Object.keys(PLATFORM_CONFIG) as Platform[]).map((platform) => (
            <div key={platform} className="flex items-center gap-1.5">
              <div
                className="size-2 rounded-full"
                style={{ backgroundColor: PLATFORM_CONFIG[platform].color }}
              />
              <span className="text-xs text-muted-foreground">
                {PLATFORM_CONFIG[platform].name}
              </span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <p className="text-xs text-muted-foreground mb-4">
          {publishedCount} veröffentlicht, {scheduledCount} geplant,{" "}
          {draftCount} Entwürfe
        </p>

        {/* Upcoming scheduled posts */}
        {upcomingPosts.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Anstehende Beiträge</h3>
            <div className="flex flex-col gap-1.5">
              {upcomingPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-3 rounded-md bg-background/50 border border-border/50 px-3 py-2"
                >
                  <span className="text-xs text-muted-foreground tabular-nums shrink-0">
                    {new Date(post.scheduledAt).toLocaleDateString("de-DE", {
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </span>
                  <div
                    className="size-2 rounded-full shrink-0"
                    style={{
                      backgroundColor: PLATFORM_CONFIG[post.platform].color,
                    }}
                  />
                  <span className="text-sm truncate flex-1">{post.title}</span>
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0 shrink-0"
                  >
                    {TYPE_LABELS[post.type]}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
        </CardContent>
      </Card>
    </AnimatedCard>
  );
}
