import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/layout/DashboardShell";

export const Route = createFileRoute("/dashboard")({
  component: DashboardShell,
});
