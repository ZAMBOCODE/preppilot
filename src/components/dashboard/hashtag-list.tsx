import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { formatCompactNumber } from "~/lib/mock-data/helpers";

interface HashtagListProps {
  hashtags: { tag: string; uses: number; views: number }[];
}

export function HashtagList({ hashtags }: HashtagListProps) {
  return (
    <Card className="border-0 bg-secondary/50 shadow-none">
      <CardHeader>
        <CardTitle className="font-heading text-base font-semibold">Trend-Hashtags</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {hashtags.map((ht) => (
            <div
              key={ht.tag}
              className="flex items-center gap-2 rounded-full bg-background px-3 py-1.5 text-sm"
            >
              <span className="font-medium">{ht.tag}</span>
              <span className="text-muted-foreground text-xs">{formatCompactNumber(ht.views)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
