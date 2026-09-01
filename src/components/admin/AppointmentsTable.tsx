import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Check, X, CalendarClock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type Appointment,
  type AppointmentStatus,
  type PaymentStatus,
  statusColors,
  paymentColors,
} from "@/lib/mock-data";
import { CreateAppointmentDialog } from "./CreateAppointmentDialog";
import { toast } from "sonner";

interface AppointmentsTableProps {
  appointments: Appointment[];
  onUpdate: (id: string, updates: Partial<Appointment>) => void;
}

export function AppointmentsTable({ appointments, onUpdate }: AppointmentsTableProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const todayAppts = appointments.filter(() => true); // show all for demo
  const filtered = filterStatus === "all" ? todayAppts : todayAppts.filter((a) => a.status === filterStatus);

  const handleApprove = (id: string) => {
    onUpdate(id, { status: "confirmada" });
    toast.success("Cita confirmada exitosamente");
  };

  const handleReject = (id: string) => {
    onUpdate(id, { status: "cancelada" });
    toast.error("Cita cancelada");
  };

  const handleReschedule = (id: string) => {
    toast.info("Función de reprogramación próximamente");
  };

  const handlePaymentChange = (id: string, val: PaymentStatus) => {
    onUpdate(id, { paymentStatus: val });
    toast.success(val === "pagado" ? "Pago registrado" : "Estado de pago actualizado");
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-border">
        <div>
          <h2 className="text-lg font-bold text-foreground">Gestión de Citas</h2>
          <p className="text-sm text-muted-foreground">{filtered.length} citas</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pendiente">Pendientes</SelectItem>
              <SelectItem value="confirmada">Confirmadas</SelectItem>
              <SelectItem value="completada">Completadas</SelectItem>
              <SelectItem value="cancelada">Canceladas</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setCreateOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Crear Cita</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Paciente</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden md:table-cell">Doctor</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden lg:table-cell">Tratamiento</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Hora</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Estado</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden sm:table-cell">Pago</th>
              <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => {
              const sc = statusColors[a.status];
              const pc = paymentColors[a.paymentStatus];
              return (
                <tr key={a.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{a.patient}</div>
                    <div className="text-xs text-muted-foreground md:hidden">{a.doctor}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{a.doctor}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{a.treatment}</td>
                  <td className="px-4 py-3 text-foreground font-medium">
                    <div>{format(a.date, "HH:mm")}</div>
                    <div className="text-xs text-muted-foreground">{format(a.date, "d MMM", { locale: es })}</div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={`${sc.bg} ${sc.text} border-0 font-medium`}>
                      {sc.label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <Select
                      value={a.paymentStatus}
                      onValueChange={(val) => handlePaymentChange(a.id, val as PaymentStatus)}
                    >
                      <SelectTrigger className="h-8 w-[170px] text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                        <SelectItem value="pagado">Pagado en sucursal</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {a.status === "pendiente" && (
                        <>
                          <Button variant="ghost" size="icon" onClick={() => handleApprove(a.id)} title="Aprobar" className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleReject(a.id)} title="Rechazar" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => handleReschedule(a.id)} title="Reprogramar" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        <CalendarClock className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No hay citas para mostrar.</div>
        )}
      </div>

      <CreateAppointmentDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}
