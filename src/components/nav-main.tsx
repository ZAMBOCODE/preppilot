import { type Icon } from "@tabler/icons-react";
import { Link, useRouterState } from "@tanstack/react-router";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

export function NavMain({
  items,
  label,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
  label?: string;
}) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const currentSearch = routerState.location.search;

  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = (() => {
              // For query-param based nav (/?view=X or /?tab=X)
              if (item.url.includes("?")) {
                const params = new URLSearchParams(item.url.split("?")[1]);
                const view = params.get("view");
                const tab = params.get("tab");
                const searchParams = new URLSearchParams(currentSearch as string);
                const currentView = searchParams.get("view");
                const currentTab = searchParams.get("tab");

                if (view) return currentView === view;
                if (tab) return currentTab === tab;
                return false;
              }
              // Default: dashboard view when no params
              if (item.url === "/" || item.url === "/?view=dashboard") {
                return currentPath === "/" && !currentSearch;
              }
              return currentPath.startsWith(item.url);
            })();

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                  <Link to={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
