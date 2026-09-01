import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarView } from "@/components/admin/CalendarView";
import { mockAppointments, type Appointment } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({
  component: AdminCalendarPage,
});

function AdminCalendarPage() {
  const [appointments] = useState<Appointment[]>(mockAppointments);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Calendario</h1>
        <p className="text-sm text-muted-foreground">Vista general de citas de la clínica</p>
      </div>
      <CalendarView appointments={appointments} />
    </div>
  );
}
