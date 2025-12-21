import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "~/contexts/auth";
import { getUserDisplayName } from "~/lib/supabase";

export const Route = createFileRoute("/_authenticated/")({
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();
  const displayName = getUserDisplayName(user);

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome, {displayName}</h1>
      <p className="text-muted-foreground">
        This is your dashboard. Manage customers and meetings from the sidebar.
      </p>
    </div>
  );
}
