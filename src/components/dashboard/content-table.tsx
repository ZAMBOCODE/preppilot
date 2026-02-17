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
  const formatCell = (value: unknown, format?: string) => {
    if (format === "compact" && typeof value === "number") return formatCompactNumber(value);
    if (format === "currency" && typeof value === "number") return `€${value.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (format === "date" && typeof value === "string") {
      return new Date(value).toLocaleDateString("de-DE", { day: "2-digit", month: "short" });
    }
    return String(value ?? "");
  };

  return (
    <Card className="border-0 bg-secondary/50 shadow-none">
      <CardHeader>
        <CardTitle className="font-heading text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
