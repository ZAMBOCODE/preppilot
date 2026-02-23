import { PLATFORM_CONFIG, PLATFORMS } from "~/lib/mock-data/config";
import { cn } from "~/lib/utils";
import type { Platform } from "~/types/social-media";

interface PlatformFilterProps {
  enabled: Platform[];
  onChange: (platforms: Platform[]) => void;
}

export function PlatformFilter({ enabled, onChange }: PlatformFilterProps) {
  function toggle(platform: Platform) {
    if (enabled.includes(platform)) {
      // Don't allow deselecting all
      if (enabled.length <= 1) return;
      onChange(enabled.filter((p) => p !== platform));
    } else {
      onChange([...enabled, platform]);
    }
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {PLATFORMS.map((p) => {
        const config = PLATFORM_CONFIG[p];
        const isActive = enabled.includes(p);
        return (
          <button
            key={p}
            type="button"
            onClick={() => toggle(p)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all",
              isActive
                ? "border-transparent text-white shadow-sm"
                : "border-border bg-background text-muted-foreground opacity-50 hover:opacity-75",
            )}
            style={isActive ? { backgroundColor: config.color } : undefined}
          >
            <span
              className={cn("size-1.5 rounded-full", !isActive && "bg-current")}
              style={isActive ? { backgroundColor: "rgba(255,255,255,0.6)" } : undefined}
            />
            {config.name}
          </button>
        );
      })}
    </div>
  );
}
