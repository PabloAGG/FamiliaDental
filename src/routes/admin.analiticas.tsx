import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";

export const Route = createFileRoute("/admin/analiticas")({
  component: AnalyticsDashboard,
});
