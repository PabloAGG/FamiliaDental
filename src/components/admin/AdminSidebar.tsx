import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { BarChart3, CalendarDays, ClipboardList, LogOut, X } from "lucide-react";
import { signOut } from "@/lib/auth";

const navItems = [
  { to: "/admin" as const, label: "Calendario", icon: CalendarDays, exact: true },
  { to: "/admin/citas" as const, label: "Gestión de Citas", icon: ClipboardList },
  { to: "/admin/analiticas" as const, label: "Analíticas y Reportes", icon: BarChart3 },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (to: string, exact?: boolean) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={onClose} />}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-card border-r border-border transition-transform duration-300 md:translate-x-0 md:static md:z-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-border">
          <span className="font-heading text-lg font-extrabold text-foreground tracking-tight">
            Familia <span className="text-primary">Dental</span>
          </span>
          <button
            onClick={onClose}
            className="md:hidden p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.to, item.exact);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              RD
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Recepción</p>
              <p className="text-xs text-muted-foreground">Familia Dental</p>
            </div>
          </div>
          <button
            type="button"
            onClick={async () => {
              await signOut();
              onClose();
              await navigate({ to: "/admin/login" });
            }}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}
