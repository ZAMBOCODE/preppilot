import type { TimePeriod, TimeSeriesDataPoint, ComparisonTimeSeriesPoint, CustomerTimeSeriesPoint } from "~/types/social-media";

export function getDaysForPeriod(period: TimePeriod): number {
  return period === "7d" ? 7 : period === "30d" ? 30 : 90;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

export function generateTimeSeries(
  period: TimePeriod,
  baseValue: number,
  variance: number = 0.3,
  trend: number = 0.02,
  seed: number = 42,
): TimeSeriesDataPoint[] {
  const days = getDaysForPeriod(period);
  const points: TimeSeriesDataPoint[] = [];
  const now = new Date();

  const random = seededRandom(seed);

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const trendFactor = 1 + trend * ((days - i) / days);
    const randomVariance = 1 + (random() - 0.5) * variance;
    points.push({
      date: date.toISOString().split("T")[0]!,
      value: Math.round(baseValue * trendFactor * randomVariance),
    });
  }
  return points;
}

export function generateComparisonTimeSeries(
  period: TimePeriod,
  baseValue: number,
  variance: number = 0.3,
  trend: number = 0.02,
  seed: number = 42,
): ComparisonTimeSeriesPoint[] {
  const days = getDaysForPeriod(period);
  const points: ComparisonTimeSeriesPoint[] = [];
  const now = new Date();

  const randomCurrent = seededRandom(seed);
  const randomPrevious = seededRandom(seed + 500);

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const trendFactor = 1 + trend * ((days - i) / days);
    points.push({
      date: date.toISOString().split("T")[0]!,
      current: Math.round(baseValue * trendFactor * (1 + (randomCurrent() - 0.5) * variance)),
      previous: Math.round(baseValue * 0.82 * (1 + (randomPrevious() - 0.5) * variance)),
    });
  }
  return points;
}

export function generateCustomerTimeSeries(
  period: TimePeriod,
  baseFirstTime: number,
  baseReturning: number,
  seed: number = 42,
): CustomerTimeSeriesPoint[] {
  const days = getDaysForPeriod(period);
  const points: CustomerTimeSeriesPoint[] = [];
  const now = new Date();

  const random = seededRandom(seed);

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    points.push({
      date: date.toISOString().split("T")[0]!,
      firstTime: Math.round(baseFirstTime * (0.7 + random() * 0.6)),
      returning: Math.round(baseReturning * (0.6 + random() * 0.8)),
    });
  }
  return points;
}

export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}
