import {
  addDays,
  setHours,
  setMinutes,
  startOfToday,
  subDays,
} from "date-fns";

export type AppointmentStatus = "pendiente" | "confirmada" | "completada" | "cancelada";
export type PaymentStatus = "pendiente" | "pagado";

export interface Appointment {
  id: string;
  patient: string;
  phone: string;
  doctor: string;
  treatment: string;
  date: Date;
  duration: number; // minutes
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
}

export interface Notification {
  id: string;
  message: string;
  time: Date;
  read: boolean;
}

const today = startOfToday();

function makeDate(dayOffset: number, hour: number, minute: number) {
  return setMinutes(setHours(addDays(today, dayOffset), hour), minute);
}

export const mockAppointments: Appointment[] = [
  { id: "1", patient: "María López García", phone: "5512345678", doctor: "Dr. Ramírez", treatment: "Limpieza Dental", date: makeDate(0, 9, 0), duration: 30, status: "pendiente", paymentStatus: "pendiente" },
  { id: "2", patient: "Juan Pérez Martínez", phone: "5587654321", doctor: "Dra. Hernández", treatment: "Blanqueamiento", date: makeDate(0, 9, 30), duration: 60, status: "confirmada", paymentStatus: "pendiente" },
  { id: "3", patient: "Ana Torres Ruiz", phone: "5511223344", doctor: "Dr. Ramírez", treatment: "Ortodoncia", date: makeDate(0, 10, 30), duration: 45, status: "completada", paymentStatus: "pagado" },
  { id: "4", patient: "Carlos Sánchez Díaz", phone: "5533445566", doctor: "Dra. Hernández", treatment: "Extracción Simple", date: makeDate(0, 11, 0), duration: 30, status: "cancelada", paymentStatus: "pendiente" },
  { id: "5", patient: "Laura Mendoza Ríos", phone: "5577889900", doctor: "Dr. Ramírez", treatment: "Resinas / Rellenos", date: makeDate(0, 12, 0), duration: 30, status: "pendiente", paymentStatus: "pendiente" },
  { id: "6", patient: "Pedro Flores Cruz", phone: "5544332211", doctor: "Dra. Hernández", treatment: "Endodoncia", date: makeDate(0, 14, 0), duration: 60, status: "confirmada", paymentStatus: "pendiente" },
  { id: "7", patient: "Sofía Vargas Luna", phone: "5566778899", doctor: "Dr. Ramírez", treatment: "Coronas y Puentes", date: makeDate(0, 15, 0), duration: 60, status: "pendiente", paymentStatus: "pendiente" },
  { id: "8", patient: "Roberto Gómez Nava", phone: "5599001122", doctor: "Dra. Hernández", treatment: "Odontopediatría", date: makeDate(0, 16, 0), duration: 30, status: "confirmada", paymentStatus: "pendiente" },
  { id: "9", patient: "Elena Castillo", phone: "5512340001", doctor: "Dr. Ramírez", treatment: "Limpieza Dental", date: makeDate(1, 10, 0), duration: 30, status: "pendiente", paymentStatus: "pendiente" },
  { id: "10", patient: "Miguel Ángel Reyes", phone: "5512340002", doctor: "Dra. Hernández", treatment: "Blanqueamiento", date: makeDate(1, 11, 0), duration: 60, status: "confirmada", paymentStatus: "pendiente" },
  { id: "11", patient: "Paola Jiménez", phone: "5512340003", doctor: "Dr. Ramírez", treatment: "Ortodoncia", date: makeDate(2, 9, 30), duration: 45, status: "pendiente", paymentStatus: "pendiente" },
  { id: "12", patient: "Fernando Morales", phone: "5512340004", doctor: "Dra. Hernández", treatment: "Extracción Simple", date: makeDate(-1, 14, 0), duration: 30, status: "completada", paymentStatus: "pagado" },
  { id: "13", patient: "Daniela Rojas", phone: "5512340005", doctor: "Dr. Ramírez", treatment: "Resinas / Rellenos", date: makeDate(-1, 15, 30), duration: 30, status: "completada", paymentStatus: "pagado" },
  { id: "14", patient: "Andrés Salazar", phone: "5512340006", doctor: "Dra. Hernández", treatment: "Endodoncia", date: makeDate(3, 10, 0), duration: 60, status: "pendiente", paymentStatus: "pendiente" },
  { id: "15", patient: "Gabriela Ortiz", phone: "5512340007", doctor: "Dr. Ramírez", treatment: "Limpieza Dental", date: makeDate(4, 9, 0), duration: 30, status: "confirmada", paymentStatus: "pendiente" },
];

export const mockNotifications: Notification[] = [
  { id: "n1", message: "Nueva cita agendada por Juan Pérez", time: makeDate(0, 8, 45), read: false },
  { id: "n2", message: "Cita reprogramada: Ana Torres → Jueves 11:00", time: makeDate(0, 8, 30), read: false },
  { id: "n3", message: "Cita cancelada por Carlos Sánchez", time: makeDate(0, 8, 15), read: false },
  { id: "n4", message: "Pago confirmado: Ana Torres - Ortodoncia", time: makeDate(0, 7, 50), read: true },
  { id: "n5", message: "Nueva cita agendada por Laura Mendoza", time: makeDate(0, 7, 30), read: true },
];

export const doctors = ["Dr. Ramírez", "Dra. Hernández"];
export const treatments = [
  "Limpieza Dental",
  "Blanqueamiento",
  "Ortodoncia",
  "Extracción Simple",
  "Resinas / Rellenos",
  "Endodoncia",
  "Coronas y Puentes",
  "Odontopediatría",
];

export const statusColors: Record<AppointmentStatus, { bg: string; text: string; label: string }> = {
  pendiente: { bg: "bg-amber-100", text: "text-amber-800", label: "Pendiente" },
  confirmada: { bg: "bg-blue-100", text: "text-blue-800", label: "Confirmada" },
  completada: { bg: "bg-emerald-100", text: "text-emerald-800", label: "Completada" },
  cancelada: { bg: "bg-red-100", text: "text-red-800", label: "Cancelada" },
};

export const paymentColors: Record<PaymentStatus, { bg: string; text: string; label: string }> = {
  pendiente: { bg: "bg-orange-100", text: "text-orange-800", label: "Pendiente" },
  pagado: { bg: "bg-emerald-100", text: "text-emerald-800", label: "Pagado en sucursal" },
};
