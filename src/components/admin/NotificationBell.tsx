import { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Bell } from "lucide-react";
import { mockNotifications, type Notification } from "@/lib/mock-data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Notificaciones">
          <Bell className="h-5 w-5 text-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h3 className="font-bold text-sm text-foreground">Notificaciones</h3>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs text-primary hover:underline">
              Marcar todo leído
            </button>
          )}
        </div>
        <div className="max-h-72 overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`px-4 py-3 border-b border-border last:border-0 ${n.read ? "opacity-60" : "bg-primary/5"}`}
            >
              <p className="text-sm text-foreground">{n.message}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(n.time, { addSuffix: true, locale: es })}
              </p>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
