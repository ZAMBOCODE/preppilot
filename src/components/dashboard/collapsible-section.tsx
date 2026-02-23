import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "~/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  className,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-2"
      >
        <h3 className="font-heading text-lg font-semibold">{title}</h3>
        <IconChevronDown
          className={cn(
            "text-muted-foreground size-5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}
