import { useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "~/components/ui/drawer";
import { NAV_GROUPS, isNavGroupActive, isNavItemActive } from "~/components/header-nav";
import { cn } from "~/lib/utils";

export function MobileNav() {
  const currentSearch = useSearch({ from: "/" });
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur md:hidden">
      <div className="flex h-14 items-center justify-around px-2">
        {NAV_GROUPS.map((group) => {
          const active = isNavGroupActive(group, currentSearch);
          const GroupIcon = group.icon;

          if (!group.items) {
            return (
              <Button
                key={group.key}
                variant="ghost"
                size="icon"
                className={cn("rounded-full", active && "bg-secondary")}
                asChild
              >
                <Link to="/" search={group.search!}>
                  <GroupIcon className="size-5" />
                </Link>
              </Button>
            );
          }

          return (
            <Drawer
              key={group.key}
              open={openDrawer === group.key}
              onOpenChange={(open) => setOpenDrawer(open ? group.key : null)}
            >
              <DrawerTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("rounded-full", active && "bg-secondary")}
                >
                  <GroupIcon className="size-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>{group.label}</DrawerTitle>
                  <DrawerDescription className="sr-only">
                    Navigation: {group.label}
                  </DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col gap-1 px-4 pb-6">
                  {group.items.map((item) => {
                    const itemActive = isNavItemActive(item.search, currentSearch);
                    const ItemIcon = item.icon;
                    return (
                      <Link
                        key={item.title}
                        to="/"
                        search={item.search}
                        onClick={() => setOpenDrawer(null)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                          itemActive
                            ? "bg-secondary font-medium"
                            : "hover:bg-accent",
                        )}
                      >
                        <ItemIcon className="size-5" />
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </DrawerContent>
            </Drawer>
          );
        })}
      </div>
    </nav>
  );
}
