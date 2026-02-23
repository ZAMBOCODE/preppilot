import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { formatCompactNumber } from "~/lib/mock-data/helpers";
import { useIsMobile } from "~/hooks/use-media-query";

interface Column {
  key: string;
  label: string;
  format?: "compact" | "date" | "text" | "currency";
}

interface ContentTableProps {
  title: string;
  columns: Column[];
  data: Record<string, unknown>[];
}

export function ContentTable({ title, columns, data }: ContentTableProps) {
  const isMobile = useIsMobile();

  const formatCell = (value: unknown, format?: string) => {
    if (format === "compact" && typeof value === "number") return formatCompactNumber(value);
    if (format === "currency" && typeof value === "number") return `€${value.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (format === "date" && typeof value === "string") {
      return new Date(value).toLocaleDateString("de-DE", { day: "2-digit", month: "short" });
    }
    return String(value ?? "");
  };

  const titleColumn = columns[0];
  const metricColumns = columns.slice(1, 4);

  return (
    <Card className="border-0 bg-secondary/60 shadow-none">
      <CardHeader>
        <CardTitle className="font-heading text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isMobile ? (
          <div className="flex flex-col gap-2">
            {data.map((row, i) => (
              <div
                key={i}
                className="cursor-pointer rounded-lg bg-secondary/60 p-3 active:opacity-80"
              >
                {titleColumn && (
                  <p className="line-clamp-2 text-sm font-bold">
                    {formatCell(row[titleColumn.key], titleColumn.format)}
                  </p>
                )}
                {metricColumns.length > 0 && (
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {metricColumns.map((col) => (
                      <div key={col.key} className="min-w-0">
                        <p className="text-[10px] text-muted-foreground">{col.label}</p>
                        <p className="text-sm font-semibold tabular-nums">
                          {formatCell(row[col.key], col.format)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                {columns.map((col) => (
                  <TableHead key={col.key} className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{col.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, i) => (
                <TableRow key={i} className="border-border/30">
                  {columns.map((col) => (
                    <TableCell key={col.key} className="text-sm tabular-nums">{formatCell(row[col.key], col.format)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
