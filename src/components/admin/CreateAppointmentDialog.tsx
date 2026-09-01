import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { doctors, treatments } from "@/lib/mock-data";
import { toast } from "sonner";

const timeSlots = Array.from({ length: 20 }, (_, i) => {
  const hour = Math.floor(i / 2) + 9;
  const min = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, "0")}:${min}`;
});

interface CreateAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateAppointmentDialog({ open, onOpenChange }: CreateAppointmentDialogProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [doctor, setDoctor] = useState("");
  const [treatment, setTreatment] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !doctor || !treatment || !date || !time) {
      toast.error("Todos los campos son obligatorios");
      return;
    }
    toast.success(`Cita creada para ${name}`);
    onOpenChange(false);
    setName(""); setPhone(""); setDoctor(""); setTreatment(""); setDate(undefined); setTime("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Crear Cita Manualmente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="c-name">Nombre del paciente</Label>
            <Input id="c-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre completo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-phone">Teléfono</Label>
            <Input id="c-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(55) 1234-5678" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Doctor</Label>
              <Select value={doctor} onValueChange={setDoctor}>
                <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                <SelectContent>
                  {doctors.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tratamiento</Label>
              <Select value={treatment} onValueChange={setTreatment}>
                <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                <SelectContent>
                  {treatments.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fecha</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: es }) : "Seleccionar"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date()} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Hora</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                <SelectContent>
                  {timeSlots.map((t) => <SelectItem key={t} value={t}>{t} hrs</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="w-full">Crear Cita</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
