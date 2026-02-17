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
    url: "/?view=dashboard",
    icon: IconChartBar,
  },
];

const navPlatforms = [
  {
    title: "TikTok",
    url: "/?tab=tiktok",
    icon: IconBrandTiktok,
  },
  {
    title: "Instagram",
    url: "/?tab=instagram",
    icon: IconBrandInstagram,
  },
  {
    title: "YouTube",
    url: "/?tab=youtube",
    icon: IconBrandYoutube,
  },
  {
    title: "Snapchat",
    url: "/?tab=snapchat",
    icon: IconBrandSnapchat,
  },
  {
    title: "Shopify",
    url: "/?tab=shopify",
    icon: IconShoppingCart,
  },
];

const navFeatures = [
  {
    title: "Kalender",
    url: "/?view=calendar",
    icon: IconCalendar,
  },
  {
    title: "Ziele",
    url: "/?view=goals",
    icon: IconTarget,
  },
  {
    title: "KI-Insights",
    url: "/?view=insights",
    icon: IconSparkles,
  },
  {
    title: "Wettbewerber",
    url: "/?view=competitors",
    icon: IconUsers,
  },
  {
    title: "Benachrichtigungen",
    url: "/?view=alerts",
    icon: IconBell,
  },
  {
    title: "Export",
    url: "/?view=export",
    icon: IconDownload,
  },
];

const navSecondary = [
  {
    title: "Einstellungen",
    url: "/settings",
    icon: IconSettings,
  },
  {
    title: "Hilfe",
    url: "/help",
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
