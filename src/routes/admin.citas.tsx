import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppointmentsTable } from "@/components/admin/AppointmentsTable";
import { mockAppointments, type Appointment } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/citas")({
  component: AdminAppointmentsPage,
});

function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  const handleUpdate = (id: string, updates: Partial<Appointment>) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Gestión de Citas</h1>
        <p className="text-sm text-muted-foreground">Administra las citas del día y estados de pago</p>
      </div>
      <AppointmentsTable appointments={appointments} onUpdate={handleUpdate} />
    </div>
  );
}
