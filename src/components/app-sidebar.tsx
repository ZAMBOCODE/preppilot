import * as React from "react";
import {
  IconBrandTiktok,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandSnapchat,
  IconShoppingCart,
  IconChartBar,
  IconCalendar,
  IconTarget,
  IconSparkles,
  IconUsers,
  IconBell,
  IconDownload,
  IconSettings,
  IconHelp,
} from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

import { NavMain } from "~/components/nav-main";
import { NavSecondary } from "~/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

const navMain = [
  {
    title: "Übersicht",
    icon: IconChartBar,
    search: { view: "dashboard" as const },
  },
];

const navPlatforms = [
  {
    title: "TikTok",
    icon: IconBrandTiktok,
    search: { view: "dashboard" as const, tab: "tiktok" },
  },
  {
    title: "Instagram",
    icon: IconBrandInstagram,
    search: { view: "dashboard" as const, tab: "instagram" },
  },
  {
    title: "YouTube",
    icon: IconBrandYoutube,
    search: { view: "dashboard" as const, tab: "youtube" },
  },
  {
    title: "Snapchat",
    icon: IconBrandSnapchat,
    search: { view: "dashboard" as const, tab: "snapchat" },
  },
  {
    title: "Shopify",
    icon: IconShoppingCart,
    search: { view: "dashboard" as const, tab: "shopify" },
  },
];

const navFeatures = [
  {
    title: "Kalender",
    icon: IconCalendar,
    search: { view: "calendar" as const },
  },
  {
    title: "Ziele",
    icon: IconTarget,
    search: { view: "goals" as const },
  },
  {
    title: "KI-Insights",
    icon: IconSparkles,
    search: { view: "insights" as const },
  },
  {
    title: "Wettbewerber",
    icon: IconUsers,
    search: { view: "competitors" as const },
  },
  {
    title: "Benachrichtigungen",
    icon: IconBell,
    search: { view: "alerts" as const },
  },
  {
    title: "Export",
    icon: IconDownload,
    search: { view: "export" as const },
  },
];

const navSecondary = [
  {
    title: "Einstellungen",
    url: "#",
    icon: IconSettings,
  },
  {
    title: "Hilfe",
    url: "#",
    icon: IconHelp,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/">
                <div className="flex items-center gap-2">
                  <img
                    src="/logo.png"
                    alt="zZzlim Logo"
                    className="h-7 w-auto"
                  />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavMain items={navPlatforms} label="Plattformen" />
        <NavMain items={navFeatures} label="Features" />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
}
