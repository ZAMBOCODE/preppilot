# CLAUDE.md

## Project Summary

SocialPulse — Social Media Analytics Dashboard for monitoring TikTok, Instagram, YouTube, and Snapchat metrics. Tab-based interface with an Overview + individual platform tabs. Currently uses mock data, designed for future API integration.

## Tech Stack

- **Framework:** TanStack Start + React 19 + TypeScript
- **UI:** shadcn/ui + Tailwind CSS v4
- **Charts:** Recharts
- **Backend:** Supabase (kept for future use, currently unused)
- **Runtime:** Bun
- **Deployment:** Docker + Coolify

## File Structure

**Note:** TanStack Start uses `src/` (not `app/` like Next.js).

```
├── src/
│   ├── routes/
│   │   ├── __root.tsx             # Root layout (ThemeProvider)
│   │   └── index.tsx              # Main dashboard (Sidebar + Tabs)
│   ├── components/
│   │   ├── ui/                    # shadcn components
│   │   ├── dashboard/
│   │   │   ├── metric-card.tsx    # KPI card with change indicator
│   │   │   ├── time-period-selector.tsx  # 7D/30D/90D toggle
│   │   │   ├── content-table.tsx  # Video/Reel performance table
│   │   │   ├── hashtag-list.tsx   # TikTok trending hashtags
│   │   │   ├── charts/
│   │   │   │   ├── follower-growth-chart.tsx
│   │   │   │   ├── engagement-comparison-chart.tsx
│   │   │   │   ├── platform-line-chart.tsx
│   │   │   │   └── engagement-pie-chart.tsx
│   │   │   └── tabs/
│   │   │       ├── overview-tab.tsx
│   │   │       ├── tiktok-tab.tsx
│   │   │       ├── instagram-tab.tsx
│   │   │       ├── youtube-tab.tsx
│   │   │       └── snapchat-tab.tsx
│   │   ├── app-sidebar.tsx        # Sidebar navigation
│   │   ├── site-header.tsx        # Top header bar
│   │   ├── nav-main.tsx           # Primary nav items
│   │   ├── nav-secondary.tsx      # Secondary nav items
│   │   ├── theme-provider.tsx     # Dark mode provider
│   │   └── theme-toggle.tsx       # Light/Dark/System toggle
│   ├── lib/
│   │   ├── mock-data/             # Mock data (API-ready structure)
│   │   │   ├── config.ts          # Platform colors & metadata
│   │   │   ├── helpers.ts         # Time series generator
│   │   │   ├── overview.ts
│   │   │   ├── tiktok.ts
│   │   │   ├── instagram.ts
│   │   │   ├── youtube.ts
│   │   │   └── snapchat.ts
│   │   ├── supabase.ts            # Supabase client (kept for later)
│   │   └── utils.ts               # cn() helper
│   └── types/
│       └── social-media.ts        # All TypeScript interfaces
├── types/
│   └── supabase.ts                # Generated Supabase types
```

## Key Patterns

**Mock Data:** All data functions in `src/lib/mock-data/` take a `TimePeriod` parameter and return typed data. Swap internals for real API calls later.

**Platform Config:** `PLATFORM_CONFIG` in `config.ts` maps each platform to brand colors (TikTok=#00f2ea, Instagram=#E1306C, YouTube=#FF0000, Snapchat=#FFFC00).

**Charts:** Recharts with `ResponsiveContainer`. Charts wrap in a `div` with explicit height (e.g., `h-[300px]`).

**shadcn/ui:** Use shadcn MCP to search and install components.

## Commands

```bash
bun install          # Install deps
bun run dev          # Dev server
bun run build        # Production build
```

## Notes

- Desktop-first responsive design
- Dark mode supported via next-themes
- No auth required currently (Supabase client kept for future use)
- Tab structure: Overview | TikTok | Instagram | YouTube | Snapchat
