import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const treatments = [
  "Limpieza Dental",
  "Blanqueamiento",
  "Ortodoncia",
  "Extracción Simple",
  "Resinas / Rellenos",
  "Endodoncia",
  "Coronas y Puentes",
  "Odontopediatría",
];

const timeSlots = Array.from({ length: 20 }, (_, i) => {
  const hour = Math.floor(i / 2) + 9;
  const min = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, "0")}:${min}`;
});

export function AppointmentForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [treatment, setTreatment] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "El nombre es obligatorio";
    if (!phone.trim() && !email.trim()) e.phone = "Ingresa teléfono o correo";
    if (!treatment) e.treatment = "Selecciona un tratamiento";
    if (!date) e.date = "Selecciona una fecha";
    if (!time) e.time = "Selecciona una hora";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Simulate availability check
    setTimeout(() => setSubmitted(true), 600);
  };

  if (submitted) {
    return (
      <section id="cita" className="py-20 px-4 bg-muted/40">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-brand-teal/15 flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-teal"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-foreground mb-3">¡Solicitud enviada!</h2>
          <p className="text-muted-foreground text-lg mb-2">
            Tu cita está en <span className="font-bold text-brand-orange">estado pendiente de confirmación</span>.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Nos comunicaremos contigo pronto para confirmar tu cita el{" "}
            <strong>{date ? format(date, "PPP", { locale: es }) : ""}</strong> a las <strong>{time}</strong>.
          </p>
          <Button onClick={() => { setSubmitted(false); setName(""); setPhone(""); setEmail(""); setTreatment(""); setDate(undefined); setTime(""); }}>
            Agendar otra cita
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="cita" className="py-20 px-4 bg-muted/40">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-3">
          Agenda tu Cita
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Completa el formulario y te confirmaremos la disponibilidad.
        </p>
        <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-md border border-border p-6 md:p-10 space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo *</Label>
            <Input id="name" placeholder="Ej. María López García" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          {/* Phone + Email */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono *</Label>
              <Input id="phone" type="tel" placeholder="(55) 1234-5678" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" placeholder="correo@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          {errors.phone && <p className="text-sm text-destructive -mt-4">{errors.phone}</p>}

          {/* Treatment */}
          <div className="space-y-2">
            <Label>Tratamiento deseado *</Label>
            <Select value={treatment} onValueChange={setTreatment}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un tratamiento" />
              </SelectTrigger>
              <SelectContent>
                {treatments.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.treatment && <p className="text-sm text-destructive">{errors.treatment}</p>}
          </div>

          {/* Date + Time */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fecha *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: es }) : "Selecciona fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date() || d.getDay() === 0}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
            </div>
            <div className="space-y-2">
              <Label>Hora sugerida *</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona hora" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((t) => (
                    <SelectItem key={t} value={t}>{t} hrs</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.time && <p className="text-sm text-destructive">{errors.time}</p>}
            </div>
          </div>

          <Button type="submit" className="w-full py-6 text-lg font-bold rounded-xl">
            Solicitar Cita
          </Button>
        </form>
      </div>
    </section>
  );
}
