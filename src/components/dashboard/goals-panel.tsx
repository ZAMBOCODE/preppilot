import { motion } from "framer-motion";
import {
  IconCheck,
  IconFlame,
  IconRocket,
  IconFlag,
  IconTrophy,
} from "@tabler/icons-react";
import type { Goal, Platform } from "~/types/social-media";
import { PLATFORM_CONFIG } from "~/lib/mock-data/config";
import { formatCompactNumber } from "~/lib/mock-data/helpers";

interface GoalsPanelProps {
  goals: Goal[];
}

const ALL_COLOR = "#851330";

function getGoalColor(platform: Goal["platform"]): string {
  if (platform === "all") return ALL_COLOR;
  return PLATFORM_CONFIG[platform as Platform].color;
}

function getGoalIcon(percentage: number) {
  if (percentage >= 100) return IconTrophy;
  if (percentage >= 90) return IconFlag;
  if (percentage >= 70) return IconFlame;
  if (percentage >= 40) return IconRocket;
  return IconRocket;
}

function getPlatformLabel(platform: Goal["platform"]): string {
  if (platform === "all") return "Alle Plattformen";
  return PLATFORM_CONFIG[platform as Platform].name;
}

function daysUntil(deadline: string): number {
  const now = new Date();
  const target = new Date(deadline);
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}

export function GoalsPanel({ goals }: GoalsPanelProps) {
  // Sort by percentage (closest to completion first)
  const sorted = [...goals].sort((a, b) => {
    const pA = (a.current / a.target) * 100;
    const pB = (b.current / b.target) * 100;
    return pB - pA;
  });

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-lg font-semibold">Ziele & Roadmap</h2>
        <p className="text-muted-foreground text-sm">
          Verfolge den Fortschritt deiner Social-Media-Ziele
        </p>
      </div>

      {/* Roadmap Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        <div className="flex flex-col gap-0">
          {sorted.map((goal, i) => {
            const color = getGoalColor(goal.platform);
            const percentage = Math.min(
              (goal.current / goal.target) * 100,
              100,
            );
            const isComplete = percentage >= 100;
            const isAlmost = percentage >= 90 && !isComplete;
            const days = daysUntil(goal.deadline);
            const Icon = getGoalIcon(percentage);

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="relative flex gap-4 pb-8 last:pb-0"
              >
                {/* Timeline node */}
                <div className="relative z-10 flex shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.08 + 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="flex size-12 items-center justify-center rounded-full border-2"
                    style={{
                      borderColor: color,
                      backgroundColor: isComplete
                        ? color
                        : `color-mix(in oklch, ${color} 10%, transparent)`,
                    }}
                  >
                    {isComplete ? (
                      <IconCheck className="size-5 text-white" />
                    ) : (
                      <Icon
                        className="size-5"
                        style={{ color }}
                      />
                    )}
                  </motion.div>
                </div>

                {/* Content card */}
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 rounded-xl border border-border/50 bg-secondary/50 p-4 transition-shadow hover:shadow-md"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: `color-mix(in oklch, ${color} 15%, transparent)`,
                            color,
                          }}
                        >
                          {getPlatformLabel(goal.platform)}
                        </span>
                        {isComplete && (
                          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            Erreicht!
                          </span>
                        )}
                        {isAlmost && (
                          <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                            Fast geschafft!
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-sm font-semibold">
                        {goal.label}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span
                        className="font-heading text-2xl font-bold tabular-nums"
                        style={{ color }}
                      >
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: i * 0.08 + 0.3,
                        ease: [0.21, 0.47, 0.32, 0.98],
                      }}
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: color,
                        boxShadow: `0 0 8px ${color}40`,
                      }}
                    />
                  </div>

                  {/* Metrics row */}
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">
                        <span className="font-semibold text-foreground">
                          {formatCompactNumber(goal.current)}
                        </span>{" "}
                        / {formatCompactNumber(goal.target)}
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground">
                        Noch{" "}
                        <span className="font-semibold text-foreground">
                          {formatCompactNumber(goal.target - goal.current)}
                        </span>{" "}
                        übrig
                      </span>
                    </div>
                    <span className="text-muted-foreground tabular-nums">
                      {days > 0
                        ? `${days} Tage übrig`
                        : "Frist abgelaufen"}
                    </span>
                  </div>

                  {/* Milestones dots */}
                  <div className="mt-3 flex items-center gap-1">
                    {[25, 50, 75, 100].map((milestone) => (
                      <div key={milestone} className="flex items-center gap-1">
                        <div
                          className="size-1.5 rounded-full transition-all"
                          style={{
                            backgroundColor:
                              percentage >= milestone ? color : "var(--color-muted)",
                            opacity: percentage >= milestone ? 1 : 0.4,
                          }}
                        />
                        {milestone < 100 && (
                          <div className="h-px w-3 bg-border" />
                        )}
                      </div>
                    ))}
                    <span className="ml-1 text-[10px] text-muted-foreground tabular-nums">
                      25 · 50 · 75 · 100%
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Summary bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/50 bg-secondary/50 px-5 py-3"
      >
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Ziele gesamt
            </span>
            <span className="font-heading text-xl font-bold tabular-nums">
              {goals.length}
            </span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex flex-col">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Ø Fortschritt
            </span>
            <span className="font-heading text-xl font-bold tabular-nums">
              {(
                goals.reduce(
                  (sum, g) => sum + Math.min((g.current / g.target) * 100, 100),
                  0,
                ) / goals.length
              ).toFixed(0)}
              %
            </span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex flex-col">
            <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Erreicht
            </span>
            <span className="font-heading text-xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
              {goals.filter((g) => g.current >= g.target).length}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {goals
            .filter((g) => (g.current / g.target) * 100 >= 90 && g.current < g.target)
            .map((g) => (
              <span
                key={g.id}
                className="rounded-full px-2 py-1 text-[10px] font-semibold"
                style={{
                  backgroundColor: `color-mix(in oklch, ${getGoalColor(g.platform)} 12%, transparent)`,
                  color: getGoalColor(g.platform),
                }}
              >
                {g.label} — bald erreicht!
              </span>
            ))}
        </div>
      </motion.div>
    </section>
  );
}
