import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import type { TimePeriod } from "~/types/social-media";

interface TimePeriodSelectorProps {
  value: TimePeriod;
  onChange: (period: TimePeriod) => void;
}

export function TimePeriodSelector({ value, onChange }: TimePeriodSelectorProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => { if (v) onChange(v as TimePeriod); }}
      variant="outline"
      size="sm"
    >
      <ToggleGroupItem value="7d">7D</ToggleGroupItem>
      <ToggleGroupItem value="30d">30D</ToggleGroupItem>
      <ToggleGroupItem value="90d">90D</ToggleGroupItem>
    </ToggleGroup>
  );
}
