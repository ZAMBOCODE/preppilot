import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { IconLayoutDashboard, IconChartPie, IconTable } from "@tabler/icons-react";

export type ViewMode = "dashboard" | "charts" | "comparison";

interface ViewModeToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => { if (v) onChange(v as ViewMode); }}
      variant="outline"
      size="sm"
    >
      <ToggleGroupItem value="dashboard" className="gap-1.5">
        <IconLayoutDashboard className="size-3.5" />
        Dashboard
      </ToggleGroupItem>
      <ToggleGroupItem value="charts" className="gap-1.5">
        <IconChartPie className="size-3.5" />
        Diagramme
      </ToggleGroupItem>
      <ToggleGroupItem value="comparison" className="gap-1.5">
        <IconTable className="size-3.5" />
        Vergleich
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
