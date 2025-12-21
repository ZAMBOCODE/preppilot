# CLAUDE.md

## Project Summary

Business Dashboard for managing customers and meetings. Full meeting lifecycle with Claude MCP integration. Learning project for testing AI-assisted development workflow.

## Tech Stack

- **Framework:** TanStack Start + React 19 + TypeScript
- **UI:** shadcn/ui + Tailwind CSS v4
- **Backend:** Supabase (PostgreSQL, Auth, RLS)
- **Forms:** TanStack Form + Zod
- **Runtime:** Bun
- **Deployment:** Docker + Coolify

## File Structure

**Note:** TanStack Start uses `src/` (not `app/` like Next.js).

```
├── src/
│   ├── routes/                    # File-based routing
│   │   ├── __root.tsx             # Root layout
│   │   ├── index.tsx              # Dashboard
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   ├── customers/
│   │   │   ├── index.tsx          # List
│   │   │   ├── new.tsx
│   │   │   └── $customerId/
│   │   │       ├── index.tsx      # Detail
│   │   │       └── edit.tsx
│   │   └── meetings/
│   │       ├── index.tsx          # List
│   │       ├── new.tsx
│   │       └── $meetingId/
│   │           ├── index.tsx      # Detail (3 tabs)
│   │           └── edit.tsx
│   ├── components/
│   │   └── ui/                    # shadcn components
│   └── lib/
│       ├── supabase.ts            # Supabase client
│       └── utils.ts
├── types/
│   └── supabase.ts                # Generated types
├── mcp/
│   └── server.ts                  # Claude MCP server
└── supabase/
    └── migrations/                # SQL migrations
```

## Key Patterns

**Supabase Types:** Generate with `bunx supabase gen types typescript --project-id XXX > types/supabase.ts`

**shadcn/ui:** Use shadcn MCP to search and install components. Example: "search for a date picker component" → install via MCP.

**Forms:** TanStack Form with Zod schemas for validation.

**Auth:** Supabase Auth with RLS. User metadata includes `display_name` and `avatar_url`.

**Markdown:** All note fields support Markdown with interactive checkboxes.

## Database Tables

- **customers:** id, user_id, name, company, email, phone, communication_style, timestamps
- **meetings:** id, user_id, customer_id, title, scheduled_at, status, preparation, notes, transcript, timestamps

## MCP Tools

1. `get_meetings` – Fetch meetings with full details
2. `create_meeting_with_prep` – Create meeting + push prep notes

## Commands

```bash
bun install          # Install deps
bun run dev          # Dev server
bun run build        # Production build
```

## Notes

- Desktop-first responsive design
- Dark mode supported
- Status enum: planned | completed | cancelled
