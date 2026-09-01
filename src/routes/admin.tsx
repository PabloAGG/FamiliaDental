import { useState } from "react";
import { Outlet, createFileRoute, redirect, useLocation } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { NotificationBell } from "@/components/admin/NotificationBell";
import { Toaster } from "@/components/ui/sonner";
import { isAdminAuthenticated } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  beforeLoad: ({ location }) => {
    if (location.pathname === "/admin/login") return;

    if (!isAdminAuthenticated()) {
      throw redirect({ to: "/admin/login" });
    }
  },
  head: () => ({
    meta: [{ title: "Admin · Familia Dental" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (location.pathname === "/admin/login") {
    return (
      <>
        <Outlet />
        <Toaster />
      </>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between h-16 px-4 border-b border-border bg-card shrink-0">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-foreground hover:bg-muted md:hidden"
            aria-label="Abrir menú de administración"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden md:block" />
          <div className="flex items-center gap-2">
            <NotificationBell />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      <Toaster />
    </div>
  );
}
