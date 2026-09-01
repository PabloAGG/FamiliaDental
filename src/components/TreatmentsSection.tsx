import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Sparkles } from "lucide-react";

const treatments = [
  {
    name: "Limpieza dental",
    price: "$350",
    icon: "✨",
    color: "bg-brand-teal/10 text-brand-teal",
    desc: "Profilaxis completa con ultrasonido",
  },
  {
    name: "Blanqueamiento",
    price: "$2,500",
    icon: "💎",
    color: "bg-brand-blue/10 text-brand-blue",
    desc: "Sonrisa más blanca en una sesión",
  },
  {
    name: "Ortodoncia",
    price: "Desde $15,000",
    icon: "🦷",
    color: "bg-brand-purple/10 text-brand-purple",
    desc: "Brackets metálicos y estéticos",
  },
  {
    name: "Extracción simple",
    price: "$800",
    icon: "🔧",
    color: "bg-brand-orange/10 text-brand-orange",
    desc: "Procedimiento rápido y seguro",
  },
  {
    name: "Resinas / rellenos",
    price: "$600",
    icon: "🪥",
    color: "bg-brand-pink/10 text-brand-pink",
    desc: "Restauraciones del color del diente",
  },
  {
    name: "Endodoncia",
    price: "$3,500",
    icon: "🩺",
    color: "bg-brand-red/10 text-brand-red",
    desc: "Tratamiento de conductos",
  },
  {
    name: "Coronas y puentes",
    price: "Desde $4,000",
    icon: "👑",
    color: "bg-brand-yellow/10 text-brand-navy",
    desc: "Prótesis fija de alta calidad",
  },
  {
    name: "Odontopediatría",
    price: "$400",
    icon: "👶",
    color: "bg-brand-lime/10 text-brand-teal",
    desc: "Atención especializada para niños",
  },
];

export function TreatmentsSection() {
  return (
    <section
      id="tratamientos"
      className="relative overflow-hidden bg-muted/40 px-4 py-24"
      aria-labelledby="treatments-title"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-purple/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-brand-teal/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue">
            <Sparkles className="h-3.5 w-3.5" />
            Servicios dentales
          </span>
          <h2
            id="treatments-title"
            className="mt-4 mb-4 font-heading text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            Nuestros tratamientos
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground">
            Ofrecemos una amplia gama de servicios dentales con precios accesibles para cuidar la
            sonrisa de toda tu familia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {treatments.map((treatment) => (
            <div
              key={treatment.name}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-blue/5"
            >
              <div
                className={
                  "mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-transform duration-300 group-hover:scale-110 " +
                  treatment.color
                }
                aria-hidden="true"
              >
                {treatment.icon}
              </div>
              <h3 className="mb-1 font-heading text-lg font-bold text-foreground">
                {treatment.name}
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{treatment.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-extrabold text-primary">{treatment.price}</span>
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 text-muted-foreground opacity-0 transition-all duration-300 group-hover:bg-brand-blue/10 group-hover:text-brand-blue group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-2 text-center text-xs text-muted-foreground sm:flex-row"
        >
          <span>* Precios de referencia. El costo final puede variar según diagnóstico.</span>
          <span className="inline-flex items-center gap-1 font-medium text-brand-teal">
            <Clock className="h-3 w-3" />
            Consulta de valoración disponible
          </span>
        </motion.div>
      </div>
    </section>
  );
}
