import { useState, useMemo } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
} from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Appointment, statusColors } from "@/lib/mock-data";

type CalendarViewMode = "day" | "week" | "month";

interface CalendarViewProps {
  appointments: Appointment[];
}

export function CalendarView({ appointments }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<CalendarViewMode>("month");

  const navigate = (dir: "prev" | "next") => {
    const fn = dir === "next"
      ? viewMode === "month" ? addMonths : viewMode === "week" ? addWeeks : addDays
      : viewMode === "month" ? subMonths : viewMode === "week" ? subWeeks : subDays;
    setCurrentDate((d) => fn(d, 1));
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-bold text-foreground min-w-[200px] text-center capitalize">
            {viewMode === "day" && format(currentDate, "EEEE d MMMM yyyy", { locale: es })}
            {viewMode === "week" && `${format(startOfWeek(currentDate, { weekStartsOn: 1 }), "d MMM", { locale: es })} – ${format(endOfWeek(currentDate, { weekStartsOn: 1 }), "d MMM yyyy", { locale: es })}`}
            {viewMode === "month" && format(currentDate, "MMMM yyyy", { locale: es })}
          </h2>
          <Button variant="ghost" size="icon" onClick={() => navigate("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())} className="ml-2">
            Hoy
          </Button>
        </div>
        <div className="flex rounded-lg border border-border overflow-hidden">
          {(["day", "week", "month"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${viewMode === mode ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"}`}
            >
              {mode === "day" ? "Día" : mode === "week" ? "Semana" : "Mes"}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 px-4 py-2 border-b border-border bg-muted/30">
        {(Object.entries(statusColors) as [string, { bg: string; text: string; label: string }][]).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5 text-xs">
            <span className={`w-3 h-3 rounded-sm ${val.bg}`} />
            <span className="text-muted-foreground">{val.label}</span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="p-2 sm:p-4">
        {viewMode === "month" && <MonthView currentDate={currentDate} appointments={appointments} />}
        {viewMode === "week" && <WeekView currentDate={currentDate} appointments={appointments} />}
        {viewMode === "day" && <DayView currentDate={currentDate} appointments={appointments} />}
      </div>
    </div>
  );
}

function MonthView({ currentDate, appointments }: { currentDate: Date; appointments: Appointment[] }) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  return (
    <div>
      <div className="grid grid-cols-7 mb-1">
        {dayNames.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-2">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
        {days.map((day) => {
          const dayAppts = appointments.filter((a) => isSameDay(a.date, day));
          const isToday = isSameDay(day, new Date());
          const inMonth = isSameMonth(day, currentDate);
          return (
            <div
              key={day.toISOString()}
              className={`min-h-[80px] sm:min-h-[100px] p-1.5 bg-card ${!inMonth ? "opacity-40" : ""}`}
            >
              <span className={`text-xs font-medium ${isToday ? "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center" : "text-foreground"}`}>
                {format(day, "d")}
              </span>
              <div className="mt-1 space-y-0.5">
                {dayAppts.slice(0, 3).map((a) => {
                  const sc = statusColors[a.status];
                  return (
                    <div key={a.id} className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded ${sc.bg} ${sc.text} truncate font-medium`}>
                      {format(a.date, "HH:mm")} {a.patient.split(" ")[0]}
                    </div>
                  );
                })}
                {dayAppts.length > 3 && (
                  <div className="text-[10px] text-muted-foreground font-medium">+{dayAppts.length - 3} más</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeekView({ currentDate, appointments }: { currentDate: Date; appointments: Appointment[] }) {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: addDays(weekStart, 6) });
  const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8-18

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        {/* Day headers */}
        <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border">
          <div />
          {days.map((day) => {
            const isToday = isSameDay(day, new Date());
            return (
              <div key={day.toISOString()} className={`text-center py-2 ${isToday ? "bg-primary/5" : ""}`}>
                <div className="text-xs text-muted-foreground capitalize">{format(day, "EEE", { locale: es })}</div>
                <div className={`text-sm font-bold ${isToday ? "text-primary" : "text-foreground"}`}>{format(day, "d")}</div>
              </div>
            );
          })}
        </div>
        {/* Time grid */}
        {hours.map((hour) => (
          <div key={hour} className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border/50 min-h-[50px]">
            <div className="text-xs text-muted-foreground pr-2 text-right pt-1">{`${hour}:00`}</div>
            {days.map((day) => {
              const dayAppts = appointments.filter(
                (a) => isSameDay(a.date, day) && a.date.getHours() === hour
              );
              return (
                <div key={day.toISOString()} className="border-l border-border/50 px-0.5 py-0.5">
                  {dayAppts.map((a) => {
                    const sc = statusColors[a.status];
                    return (
                      <div key={a.id} className={`text-[10px] sm:text-xs px-1.5 py-1 rounded ${sc.bg} ${sc.text} font-medium truncate`}>
                        {format(a.date, "HH:mm")} {a.patient.split(" ")[0]}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function DayView({ currentDate, appointments }: { currentDate: Date; appointments: Appointment[] }) {
  const dayAppts = appointments.filter((a) => isSameDay(a.date, currentDate));
  const hours = Array.from({ length: 11 }, (_, i) => i + 8);

  return (
    <div>
      {hours.map((hour) => {
        const hourAppts = dayAppts.filter((a) => a.date.getHours() === hour);
        return (
          <div key={hour} className="flex border-b border-border/50 min-h-[60px]">
            <div className="w-16 shrink-0 text-xs text-muted-foreground text-right pr-3 pt-2">{`${hour}:00`}</div>
            <div className="flex-1 px-2 py-1 space-y-1">
              {hourAppts.map((a) => {
                const sc = statusColors[a.status];
                return (
                  <div key={a.id} className={`px-3 py-2 rounded-lg ${sc.bg} ${sc.text} font-medium`}>
                    <div className="text-sm font-bold">{format(a.date, "HH:mm")} – {a.patient}</div>
                    <div className="text-xs opacity-80">{a.treatment} · {a.doctor}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
