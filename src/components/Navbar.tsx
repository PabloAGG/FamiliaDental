import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Menu, Sparkles, X } from "lucide-react";

const links = [
  { label: "Tratamientos", href: "#tratamientos" },
  { label: "Ubicación", href: "#ubicacion" },
  { label: "Reseñas", href: "#resenas" },
];

function scrollToSection(selector: string, closeMenu?: () => void) {
  closeMenu?.();
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl"
      aria-label="Navegación principal"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => scrollToSection("#inicio", () => setOpen(false))}
          className="flex items-center gap-2 font-heading text-lg font-extrabold tracking-tight text-foreground"
          aria-label="Ir al inicio de Familia Dental"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-teal text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          Familia <span className="text-primary">Dental</span>
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="group relative py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 origin-left scale-x-0 rounded-full bg-brand-blue transition-transform group-hover:scale-x-100" />
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollToSection("#cita")}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/30"
          >
            <CalendarCheck className="h-4 w-4" />
            Agendar cita
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted/50 md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 px-6 py-5">
              {links.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => scrollToSection(link.href, () => setOpen(false))}
                  className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted/50 hover:text-primary"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => scrollToSection("#cita", () => setOpen(false))}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-md shadow-primary/25"
              >
                <CalendarCheck className="h-4 w-4" />
                Agendar cita
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
