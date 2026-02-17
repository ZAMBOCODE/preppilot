import { Separator } from "~/components/ui/separator";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { ThemeToggle } from "~/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="flex shrink-0 items-center border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-2 px-4 py-2.5 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-1 data-[orientation=vertical]:h-4"
        />
        <span className="text-muted-foreground text-sm">Analyse-Dashboard</span>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
