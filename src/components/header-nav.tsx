import type { Icon } from "@tabler/icons-react";
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

export interface NavSearchParams {
  view: string;
  tab?: string;
}

export interface NavItem {
  title: string;
  icon: Icon;
  search: NavSearchParams;
}

export interface NavGroup {
  key: string;
  label: string;
  icon: Icon;
  items?: NavItem[];
  search?: NavSearchParams;
}

export const NAV_GROUPS: NavGroup[] = [
  {
    key: "overview",
    label: "Übersicht",
    icon: IconChartBar,
    search: { view: "dashboard", tab: "overview" },
  },
  {
    key: "platforms",
    label: "Plattformen",
    icon: IconBrandTiktok,
    items: [
      { title: "TikTok", icon: IconBrandTiktok, search: { view: "dashboard", tab: "tiktok" } },
      { title: "Instagram", icon: IconBrandInstagram, search: { view: "dashboard", tab: "instagram" } },
      { title: "YouTube", icon: IconBrandYoutube, search: { view: "dashboard", tab: "youtube" } },
      { title: "Snapchat", icon: IconBrandSnapchat, search: { view: "dashboard", tab: "snapchat" } },
      { title: "Shopify", icon: IconShoppingCart, search: { view: "dashboard", tab: "shopify" } },
    ],
  },
  {
    key: "features",
    label: "Features",
    icon: IconSparkles,
    items: [
      { title: "Kalender", icon: IconCalendar, search: { view: "calendar" } },
      { title: "Ziele", icon: IconTarget, search: { view: "goals" } },
      { title: "KI-Insights", icon: IconSparkles, search: { view: "insights" } },
      { title: "Wettbewerber", icon: IconUsers, search: { view: "competitors" } },
      { title: "Benachrichtigungen", icon: IconBell, search: { view: "alerts" } },
      { title: "Export", icon: IconDownload, search: { view: "export" } },
    ],
  },
  {
    key: "settings",
    label: "Einstellungen",
    icon: IconSettings,
    items: [
      { title: "Einstellungen", icon: IconSettings, search: { view: "dashboard" } },
      { title: "Hilfe", icon: IconHelp, search: { view: "dashboard" } },
    ],
  },
];

export function isNavItemActive(
  itemSearch: NavSearchParams,
  currentSearch: { view?: string; tab?: string },
): boolean {
  if (itemSearch.tab) {
    return currentSearch.view === itemSearch.view && currentSearch.tab === itemSearch.tab;
  }
  return currentSearch.view === itemSearch.view && !currentSearch.tab;
}

export function isNavGroupActive(
  group: NavGroup,
  currentSearch: { view?: string; tab?: string },
): boolean {
  if (group.search) return isNavItemActive(group.search, currentSearch);
  if (group.items) return group.items.some((item) => isNavItemActive(item.search, currentSearch));
  return false;
}
