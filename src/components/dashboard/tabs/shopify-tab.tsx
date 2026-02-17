import { AnimatedCard } from "~/components/dashboard/animated-card";
import { Card, CardContent } from "~/components/ui/card";
import { PLATFORM_CONFIG } from "~/lib/mock-data/config";
import { formatCompactNumber } from "~/lib/mock-data/helpers";
import type { ShopifyData, ComparisonTimeSeriesPoint, CustomerTimeSeriesPoint } from "~/types/social-media";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ContentTable } from "~/components/dashboard/content-table";

const ACCENT = PLATFORM_CONFIG.shopify.color;
const PREVIOUS_COLOR = "var(--color-muted-foreground)";

// ── Helpers ─────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("de-DE", { day: "numeric", month: "short" });
}

function ChangeIndicator({ value, className = "" }: { value: number; className?: string }) {
  const isPositive = value > 0;
  return (
    <span
      className={`font-medium ${isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"} ${className}`}
    >
      {isPositive ? "↑" : "↓"}
      {Math.abs(value)}%
    </span>
  );
}

// ── Shared Chart Components ──────────────────────────────────────────

function ComparisonLineChart({ data, label }: { data: ComparisonTimeSeriesPoint[]; label: string }) {
  return (
    <div className="mt-4">
      <span className="text-muted-foreground mb-2 block text-[10px] font-semibold uppercase tracking-widest">
        {label}
      </span>
      <div className="h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fontSize: 10 }}
              className="fill-muted-foreground"
              interval="preserveStartEnd"
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v: number) => formatCompactNumber(v)}
              tick={{ fontSize: 10 }}
              className="fill-muted-foreground"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                formatCompactNumber(value),
                name === "current" ? "Aktuell" : "Vorherig",
              ]}
              labelFormatter={(label: string) =>
                new Date(label).toLocaleDateString("de-DE", { day: "2-digit", month: "long" })
              }
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid var(--color-border)",
                background: "var(--color-card)",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="previous"
              stroke={PREVIOUS_COLOR}
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
              opacity={0.5}
            />
            <Line type="monotone" dataKey="current" stroke={ACCENT} strokeWidth={2} dot={false} />
            <Legend
              iconType="plainline"
              iconSize={16}
              formatter={(value: string) => (
                <span className="text-muted-foreground text-[10px]">
                  {value === "current" ? "Aktueller Zeitraum" : "Vorheriger Zeitraum"}
                </span>
              )}
              wrapperStyle={{ paddingTop: "8px" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ComparisonBarChart({ data, label }: { data: ComparisonTimeSeriesPoint[]; label: string }) {
  return (
    <div className="mt-4">
      <span className="text-muted-foreground mb-2 block text-[10px] font-semibold uppercase tracking-widest">
        {label}
      </span>
      <div className="h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fontSize: 10 }}
              className="fill-muted-foreground"
              interval="preserveStartEnd"
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v: number) => `€${formatCompactNumber(v)}`}
              tick={{ fontSize: 10 }}
              className="fill-muted-foreground"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                `€${formatCompactNumber(value)}`,
                name === "current" ? "Aktuell" : "Vorherig",
              ]}
              labelFormatter={(label: string) =>
                new Date(label).toLocaleDateString("de-DE", { day: "2-digit", month: "long" })
              }
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid var(--color-border)",
                background: "var(--color-card)",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="previous" fill={PREVIOUS_COLOR} opacity={0.3} radius={[2, 2, 0, 0]} />
            <Bar dataKey="current" fill={ACCENT} opacity={0.8} radius={[2, 2, 0, 0]} />
            <Legend
              iconType="square"
              iconSize={8}
              formatter={(value: string) => (
                <span className="text-muted-foreground text-[10px]">
                  {value === "current" ? "Aktueller Zeitraum" : "Vorheriger Zeitraum"}
                </span>
              )}
              wrapperStyle={{ paddingTop: "8px" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CustomerAreaChart({ data }: { data: CustomerTimeSeriesPoint[] }) {
  return (
    <div className="mt-4">
      <span className="text-muted-foreground mb-2 block text-[10px] font-semibold uppercase tracking-widest">
        Kunden über Zeit
      </span>
      <div className="h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fontSize: 10 }}
              className="fill-muted-foreground"
              interval="preserveStartEnd"
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              className="fill-muted-foreground"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                value,
                name === "firstTime" ? "Erstkunden" : "Wiederkehrend",
              ]}
              labelFormatter={(label: string) =>
                new Date(label).toLocaleDateString("de-DE", { day: "2-digit", month: "long" })
              }
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid var(--color-border)",
                background: "var(--color-card)",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="returning"
              stackId="1"
              stroke="#1a5276"
              fill="#1a5276"
              fillOpacity={0.7}
            />
            <Area
              type="monotone"
              dataKey="firstTime"
              stackId="1"
              stroke={ACCENT}
              fill={ACCENT}
              fillOpacity={0.7}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value: string) => (
                <span className="text-muted-foreground text-[10px]">
                  {value === "firstTime" ? "Erstkunden" : "Wiederkehrend"}
                </span>
              )}
              wrapperStyle={{ paddingTop: "8px" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Product / Order Table Columns ────────────────────────────────────

const PRODUCT_COLUMNS = [
  { key: "title", label: "Produkt", format: "text" as const },
  { key: "revenue", label: "Umsatz", format: "currency" as const },
  { key: "units", label: "Verkauft", format: "compact" as const },
  { key: "avgPrice", label: "Ø Preis", format: "currency" as const },
];

const ORDER_COLUMNS = [
  { key: "orderNumber", label: "Bestellung", format: "text" as const },
  { key: "total", label: "Betrag", format: "currency" as const },
  { key: "items", label: "Artikel", format: "text" as const },
  { key: "status", label: "Status", format: "text" as const },
  { key: "date", label: "Datum", format: "date" as const },
];

// ── Main Component ──────────────────────────────────────────────────

interface ShopifyTabProps {
  data: ShopifyData;
}

export function ShopifyTab({ data }: ShopifyTabProps) {
  return (
    <div className="space-y-6">
      {/* Row 1: Total Sales | Sessions | Returning Customer Rate */}
      <AnimatedCard>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Total Sales */}
          <Card className="border-0 bg-secondary/50 shadow-none">
            <CardContent className="p-5">
              <span className="text-muted-foreground text-sm font-medium">Gesamtumsatz</span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="font-heading text-3xl font-bold tabular-nums">
                  €{data.totalSales.toLocaleString("de-DE")}
                </span>
                <ChangeIndicator value={data.totalSalesChange} className="text-sm" />
              </div>
              <div className="mt-3 space-y-1.5">
                {data.salesByChannel.map((ch) => (
                  <div key={ch.channel} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{ch.channel}</span>
                    <div className="flex items-center gap-3">
                      <span className="tabular-nums">€{ch.amount.toLocaleString("de-DE")}</span>
                      <ChangeIndicator value={ch.change} className="text-xs" />
                    </div>
                  </div>
                ))}
              </div>
              <ComparisonLineChart data={data.salesOverTime} label="Umsatz über Zeit" />
            </CardContent>
          </Card>

          {/* Online Store Sessions */}
          <Card className="border-0 bg-secondary/50 shadow-none">
            <CardContent className="p-5">
              <span className="text-muted-foreground text-sm font-medium">Online-Store-Sitzungen</span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="font-heading text-3xl font-bold tabular-nums">
                  {data.sessions.toLocaleString("de-DE")}
                </span>
                <ChangeIndicator value={data.sessionsChange} className="text-sm" />
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Besucher</span>
                <div className="flex items-center gap-3">
                  <span className="tabular-nums">{data.visitors.toLocaleString("de-DE")}</span>
                  <ChangeIndicator value={data.visitorsChange} className="text-xs" />
                </div>
              </div>
              <ComparisonLineChart data={data.sessionsOverTime} label="Sitzungen über Zeit" />
            </CardContent>
          </Card>

          {/* Returning Customer Rate */}
          <Card className="border-0 bg-secondary/50 shadow-none">
            <CardContent className="p-5">
              <span className="text-muted-foreground text-sm font-medium">Wiederkehrende Kunden</span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="font-heading text-3xl font-bold tabular-nums">
                  {data.returningCustomerRate}%
                </span>
                <ChangeIndicator value={data.returningCustomerRateChange} className="text-sm" />
              </div>
              <CustomerAreaChart data={data.customersOverTime} />
            </CardContent>
          </Card>
        </div>
      </AnimatedCard>

      {/* Row 2: Conversion Rate | Average Order Value | Total Orders */}
      <AnimatedCard delay={0.05}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Conversion Rate */}
          <Card className="border-0 bg-secondary/50 shadow-none">
            <CardContent className="p-5">
              <span className="text-muted-foreground text-sm font-medium">Conversion-Rate</span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="font-heading text-3xl font-bold tabular-nums">
                  {data.conversionRate}%
                </span>
                <ChangeIndicator value={data.conversionRateChange} className="text-sm" />
              </div>
              <div className="mt-4">
                <span className="text-muted-foreground mb-3 block text-[10px] font-semibold uppercase tracking-widest">
                  Conversion-Funnel
                </span>
                <div className="space-y-3">
                  {data.conversionFunnel.map((step) => (
                    <div key={step.label} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{step.label}</span>
                        <div className="flex items-center gap-3">
                          <span className="tabular-nums">{step.rate}%</span>
                          <ChangeIndicator value={step.rateChange} className="text-xs" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-xs">
                          {step.sessions.toLocaleString("de-DE")} Sitzungen
                        </span>
                        <div className="bg-muted ml-4 h-1.5 flex-1 overflow-hidden rounded-full">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${(step.rate / data.conversionFunnel[0]!.rate) * 100}%`,
                              backgroundColor: ACCENT,
                              opacity: 0.7,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Average Order Value */}
          <Card className="border-0 bg-secondary/50 shadow-none">
            <CardContent className="p-5">
              <span className="text-muted-foreground text-sm font-medium">Ø Bestellwert</span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="font-heading text-3xl font-bold tabular-nums">
                  €{data.avgOrderValue.toFixed(2)}
                </span>
                <ChangeIndicator value={data.avgOrderValueChange} className="text-sm" />
              </div>
              <ComparisonBarChart data={data.avgOrderValueOverTime} label="Bestellwert über Zeit" />
            </CardContent>
          </Card>

          {/* Total Orders */}
          <Card className="border-0 bg-secondary/50 shadow-none">
            <CardContent className="p-5">
              <span className="text-muted-foreground text-sm font-medium">Bestellungen gesamt</span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="font-heading text-3xl font-bold tabular-nums">
                  {data.totalOrders.toLocaleString("de-DE")}
                </span>
                <ChangeIndicator value={data.totalOrdersChange} className="text-sm" />
              </div>
              <ComparisonLineChart data={data.ordersOverTime} label="Bestellungen über Zeit" />
            </CardContent>
          </Card>
        </div>
      </AnimatedCard>

      {/* Row 3: Sessions by Device */}
      <AnimatedCard delay={0.1}>
        <Card className="border-0 bg-secondary/50 shadow-none">
          <CardContent className="p-5">
            <span className="text-muted-foreground text-sm font-medium">Sitzungen nach Gerätetyp</span>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {data.sessionsByDevice.map((device) => (
                <div key={device.device} className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                      {device.device}
                    </span>
                    <span className="font-heading text-lg font-semibold tabular-nums">
                      {device.percentage}%
                    </span>
                  </div>
                  <div className="bg-muted h-2 overflow-hidden rounded-full">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${device.percentage}%`, backgroundColor: ACCENT, opacity: 0.7 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </AnimatedCard>

      {/* Top Products Table */}
      <AnimatedCard delay={0.15}>
        <ContentTable title="Top-Produkte" columns={PRODUCT_COLUMNS} data={data.topProducts} />
      </AnimatedCard>

      {/* Recent Orders Table */}
      <AnimatedCard delay={0.2}>
        <ContentTable title="Letzte Bestellungen" columns={ORDER_COLUMNS} data={data.recentOrders} />
      </AnimatedCard>
    </div>
  );
}
