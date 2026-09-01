import {
  DollarSign,
  CalendarCheck,
  XCircle,
  UserPlus,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { mockAppointments } from "@/lib/mock-data";
import { format } from "date-fns";
import { es } from "date-fns/locale";

/* ── KPI data ── */
const kpis = [
  {
    title: "Ingresos Mensuales",
    value: "$45,000 MXN",
    change: "+12.5%",
    positive: true,
    icon: DollarSign,
    color: "text-emerald-600 bg-emerald-100",
  },
  {
    title: "Citas Atendidas",
    value: "128",
    change: "+8.2%",
    positive: true,
    icon: CalendarCheck,
    color: "text-blue-600 bg-blue-100",
  },
  {
    title: "Tasa de Cancelación",
    value: "6.3%",
    change: "-2.1%",
    positive: true,
    icon: XCircle,
    color: "text-amber-600 bg-amber-100",
  },
  {
    title: "Nuevos Pacientes",
    value: "34",
    change: "+15.0%",
    positive: true,
    icon: UserPlus,
    color: "text-violet-600 bg-violet-100",
  },
];

/* ── Treatments doughnut ── */
const treatmentData = [
  { name: "Limpiezas", value: 40, fill: "var(--color-brand-teal)" },
  { name: "Ortodoncia", value: 30, fill: "var(--color-brand-purple)" },
  { name: "Extracciones", value: 20, fill: "var(--color-brand-orange)" },
  { name: "Blanqueamientos", value: 10, fill: "var(--color-brand-blue)" },
];

const treatmentConfig: ChartConfig = {
  Limpiezas: { label: "Limpiezas", color: "var(--color-brand-teal)" },
  Ortodoncia: { label: "Ortodoncia", color: "var(--color-brand-purple)" },
  Extracciones: { label: "Extracciones", color: "var(--color-brand-orange)" },
  Blanqueamientos: { label: "Blanqueamientos", color: "var(--color-brand-blue)" },
};

/* ── Revenue bar chart ── */
const revenueData = [
  { month: "Nov", ingresos: 32000 },
  { month: "Dic", ingresos: 38000 },
  { month: "Ene", ingresos: 35000 },
  { month: "Feb", ingresos: 40000 },
  { month: "Mar", ingresos: 42000 },
  { month: "Abr", ingresos: 45000 },
];

const revenueConfig: ChartConfig = {
  ingresos: { label: "Ingresos", color: "var(--color-brand-purple)" },
};

/* ── Doctor activity ── */
const doctorActivity = [
  { name: "Dr. Ramírez", patients: 68, revenue: "$24,500 MXN" },
  { name: "Dra. Hernández", patients: 60, revenue: "$20,500 MXN" },
];

/* ── Next appointment ── */
function getNextAppointment() {
  const now = new Date();
  const upcoming = mockAppointments
    .filter((a) => a.date >= now && a.status !== "cancelada" && a.status !== "completada")
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  return upcoming[0] ?? null;
}

export function AnalyticsDashboard() {
  const next = getNextAppointment();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Analíticas y Reportes</h1>
        <p className="text-sm text-muted-foreground">
          Resumen operativo y financiero de la clínica
        </p>
      </div>

      {/* KPI row + next appointment */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className={`rounded-xl p-2.5 ${kpi.color}`}>
                  <kpi.icon className="h-5 w-5" />
                </div>
                <span
                  className={`flex items-center gap-0.5 text-xs font-semibold ${kpi.positive ? "text-emerald-600" : "text-red-600"}`}
                >
                  {kpi.positive ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  )}
                  {kpi.change}
                </span>
              </div>
              <p className="mt-3 text-2xl font-extrabold text-foreground">{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.title}</p>
            </CardContent>
          </Card>
        ))}

        {/* Next appointment widget */}
        {next && (
          <Card className="sm:col-span-2 lg:col-span-4 xl:col-span-1 border-primary/30 bg-primary/5">
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Próxima Cita</span>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-foreground text-sm leading-tight">{next.patient}</p>
                <p className="text-xs text-muted-foreground">{next.treatment}</p>
                <p className="text-xs text-muted-foreground">{next.doctor}</p>
                <p className="text-xs font-semibold text-foreground">
                  {format(next.date, "hh:mm a", { locale: es })}
                </p>
              </div>
              <Button size="sm" variant="outline" className="mt-3 w-full text-xs">
                Ver detalles
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Charts grid */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Doughnut – treatments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tratamientos Más Pedidos</CardTitle>
            <CardDescription>Distribución porcentual del mes actual</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={treatmentConfig} className="aspect-square max-h-[280px] mx-auto">
              <PieChart>
                <Pie
                  data={treatmentData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="80%"
                  paddingAngle={3}
                  strokeWidth={2}
                  stroke="var(--color-background)"
                >
                  {treatmentData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="name" />}
                />
              </PieChart>
            </ChartContainer>
            {/* Legend */}
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {treatmentData.map((t) => (
                <div key={t.name} className="flex items-center gap-1.5 text-xs">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: t.fill }}
                  />
                  {t.name} ({t.value}%)
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bar chart – revenue */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Ingresos vs. Tiempo</CardTitle>
                <CardDescription>Últimos 6 meses (MXN)</CardDescription>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <TrendingUp className="h-4 w-4" />
                +12.5%
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={revenueConfig} className="aspect-[4/3] max-h-[280px]">
              <BarChart data={revenueData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) =>
                        `$${Number(value).toLocaleString("es-MX")} MXN`
                      }
                    />
                  }
                />
                <Bar
                  dataKey="ingresos"
                  fill="var(--color-brand-purple)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Doctor activity table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Actividad por Doctor</CardTitle>
          <CardDescription>Pacientes atendidos e ingresos generados este mes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Doctor</th>
                  <th className="py-2 pr-4 font-medium text-center">Pacientes</th>
                  <th className="py-2 font-medium text-right">Ingresos</th>
                </tr>
              </thead>
              <tbody>
                {doctorActivity.map((doc) => (
                  <tr key={doc.name} className="border-b border-border/50 last:border-0">
                    <td className="py-3 pr-4 font-semibold text-foreground">{doc.name}</td>
                    <td className="py-3 pr-4 text-center text-foreground">{doc.patients}</td>
                    <td className="py-3 text-right font-semibold text-foreground">{doc.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
