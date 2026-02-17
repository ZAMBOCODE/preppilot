import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { CountryData } from "~/types/social-media";
import { formatCompactNumber } from "~/lib/mock-data/helpers";

interface CountriesListProps {
  data: CountryData[];
  accentColor?: string;
}

export function CountriesList({ data, accentColor = "#851330" }: CountriesListProps) {
  return (
    <Card className="border-0 bg-secondary/50 shadow-none">
      <CardHeader>
        <CardTitle className="font-heading text-base font-semibold">Top Länder</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((country, i) => (
            <div key={country.country} className="flex items-center gap-3">
              <span className="text-muted-foreground w-5 text-right text-xs tabular-nums">{i + 1}</span>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{country.country}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs tabular-nums">{formatCompactNumber(country.followers)}</span>
                    <span className="font-medium tabular-nums">{country.percentage}%</span>
                  </div>
                </div>
                <div className="bg-muted h-1.5 overflow-hidden rounded-full">
                  <div className="h-full rounded-full transition-all" style={{ width: `${country.percentage}%`, backgroundColor: accentColor, opacity: 0.7 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
