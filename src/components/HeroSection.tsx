import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Atención profesional",
    description: "Tratamientos seguros y personalizados.",
  },
  {
    icon: UsersRound,
    title: "Para toda la familia",
    description: "Cuidamos sonrisas de todas las edades.",
  },
];

function scrollToSection(selector: string) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
}

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden px-4 pb-24 pt-20 sm:pt-24 lg:pb-28 lg:pt-28"
    >
      <div
        className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-brand-purple/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-brand-teal/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-teal/20 bg-brand-teal/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-teal">
            <Sparkles className="h-3.5 w-3.5" />
            Tu salud empieza con una sonrisa
          </span>

          <h1 className="mt-6 max-w-3xl font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Sonrisas saludables para <span className="text-gradient-brand">toda la familia</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Atención dental cercana, profesional y accesible para niños y adultos. En Familia Dental
            cuidamos tu sonrisa con tratamientos pensados para ti.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollToSection("#cita")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl"
            >
              <CalendarCheck className="h-4 w-4" />
              Agenda tu cita
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("#tratamientos")}
              className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3.5 text-sm font-bold text-foreground transition-colors hover:border-brand-blue/30 hover:text-brand-blue"
            >
              Conoce nuestros tratamientos
            </button>
          </div>

          <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div
            className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-brand-purple/15 via-brand-blue/10 to-brand-teal/15 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card p-6 shadow-2xl shadow-brand-blue/10 sm:p-8">
            <div
              className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-yellow/20 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-brand-blue">
                  Familia Dental
                </p>
                <p className="mt-2 max-w-xs font-heading text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">
                  Tu sonrisa, nuestra prioridad
                </p>
              </div>
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-teal text-white shadow-lg shadow-brand-blue/20">
                <Sparkles className="h-8 w-8" />
              </div>
            </div>

            <div className="relative mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-brand-blue/10 p-5">
                <p className="font-heading text-3xl font-extrabold text-brand-blue">100%</p>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">
                  Atención personalizada
                </p>
              </div>
              <div className="rounded-2xl bg-brand-teal/10 p-5">
                <p className="font-heading text-3xl font-extrabold text-brand-teal">8+</p>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">
                  Tratamientos disponibles
                </p>
              </div>
            </div>

            <div className="relative mt-4 flex items-center gap-3 rounded-2xl border border-border/70 bg-background/70 p-4">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-teal" />
              <p className="text-sm font-semibold text-foreground">
                Agenda tu valoración y empieza a cuidar tu sonrisa.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
