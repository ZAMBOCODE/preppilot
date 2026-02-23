import { Link, useSearch } from "@tanstack/react-router";
import { IconChevronDown } from "@tabler/icons-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ThemeToggle } from "~/components/theme-toggle";
import { useIsMobile } from "~/hooks/use-media-query";
import { NAV_GROUPS, isNavGroupActive, isNavItemActive } from "~/components/header-nav";
import { cn } from "~/lib/utils";

export function SiteHeader() {
  const isMobile = useIsMobile();
  const currentSearch = useSearch({ from: "/" });

  if (isMobile) {
    return (
      <header className="sticky top-0 z-40 flex h-14 items-center border-b bg-background/95 px-4 backdrop-blur">
        <Link to="/" search={{ view: "dashboard", tab: "overview" }}>
          <img src="/logo.png" alt="zZzlim" className="h-7 w-auto" />
        </Link>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center border-b bg-background/95 px-4 backdrop-blur lg:px-6">
      <Link to="/" search={{ view: "dashboard", tab: "overview" }} className="mr-6 shrink-0">
        <img src="/logo.png" alt="zZzlim" className="h-7 w-auto" />
      </Link>

      <nav className="flex items-center gap-1">
        {NAV_GROUPS.map((group) => {
          const active = isNavGroupActive(group, currentSearch);
          const GroupIcon = group.icon;

          if (!group.items) {
            return (
              <Button
                key={group.key}
                variant={active ? "secondary" : "ghost"}
                size="sm"
                className="rounded-full gap-1.5"
                asChild
              >
                <Link to="/" search={group.search!}>
                  <GroupIcon className="size-4" />
                  {group.label}
                </Link>
              </Button>
            );
          }

          return (
            <DropdownMenu key={group.key}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={active ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-full gap-1.5"
                >
                  <GroupIcon className="size-4" />
                  {group.label}
                  <IconChevronDown className="size-3 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {group.items.map((item) => {
                  const itemActive = isNavItemActive(item.search, currentSearch);
                  const ItemIcon = item.icon;
                  return (
                    <DropdownMenuItem key={item.title} asChild>
                      <Link
                        to="/"
                        search={item.search}
                        className={cn(itemActive && "bg-accent font-medium")}
                      >
                        <ItemIcon className="size-4" />
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        })}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
