import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { AgeGroup, GenderSplit } from "~/types/social-media";

interface DemographicsChartProps {
  ageGroups: AgeGroup[];
  gender: GenderSplit;
  accentColor?: string;
}

export function DemographicsChart({ ageGroups, gender, accentColor = "#851330" }: DemographicsChartProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Age Distribution */}
      <Card className="border-0 bg-secondary/50 shadow-none">
        <CardHeader>
          <CardTitle className="font-heading text-base font-semibold">Altersverteilung</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageGroups} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                <XAxis dataKey="range" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} className="fill-muted-foreground" />
                <YAxis tickFormatter={(v: number) => `${v}%`} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} className="fill-muted-foreground" width={40} />
                <Tooltip formatter={(value: number) => [`${value}%`, "Zielgruppe"]} contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-card)", fontSize: "13px" }} />
                <Bar dataKey="percentage" fill={accentColor} fillOpacity={0.8} radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gender Split */}
      <Card className="border-0 bg-secondary/50 shadow-none">
        <CardHeader>
          <CardTitle className="font-heading text-base font-semibold">Geschlechterverteilung</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: "Weiblich", value: gender.female, color: accentColor },
              { label: "Männlich", value: gender.male, color: `${accentColor}99` },
              { label: "Andere", value: gender.other, color: `${accentColor}55` },
            ].map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-medium tabular-nums">{item.value}%</span>
                </div>
                <div className="bg-muted h-2 overflow-hidden rounded-full">
                  <div className="h-full rounded-full transition-all" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
