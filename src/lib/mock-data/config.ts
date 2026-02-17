import type { Platform, PlatformConfig } from "~/types/social-media";

export const PLATFORM_CONFIG: Record<Platform, PlatformConfig> = {
  tiktok: {
    id: "tiktok",
    name: "TikTok",
    color: "#00f2ea",
    bgColor: "bg-[#00f2ea]/10",
    textColor: "text-[#00f2ea]",
    borderColor: "border-[#00f2ea]/30",
  },
  instagram: {
    id: "instagram",
    name: "Instagram",
    color: "#E1306C",
    bgColor: "bg-[#E1306C]/10",
    textColor: "text-[#E1306C]",
    borderColor: "border-[#E1306C]/30",
  },
  youtube: {
    id: "youtube",
    name: "YouTube",
    color: "#FF0000",
    bgColor: "bg-[#FF0000]/10",
    textColor: "text-[#FF0000]",
    borderColor: "border-[#FF0000]/30",
  },
  snapchat: {
    id: "snapchat",
    name: "Snapchat",
    color: "#FFFC00",
    bgColor: "bg-[#FFFC00]/10",
    textColor: "text-[#FFFC00]",
    borderColor: "border-[#FFFC00]/30",
  },
  shopify: {
    id: "shopify",
    name: "Shopify",
    color: "#95BF47",
    bgColor: "bg-[#95BF47]/10",
    textColor: "text-[#95BF47]",
    borderColor: "border-[#95BF47]/30",
  },
};

export const PLATFORMS: Platform[] = ["tiktok", "instagram", "youtube", "snapchat", "shopify"];
