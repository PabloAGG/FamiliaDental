import { Clock, Mail, MapPin, Phone } from "lucide-react";

export function LocationSection() {
  return (
    <section id="ubicacion" className="bg-background px-4 py-20" aria-labelledby="location-title">
      <div className="mx-auto max-w-6xl">
        <h2
          id="location-title"
          className="mb-12 text-center font-heading text-3xl font-extrabold text-foreground md:text-4xl"
        >
          Ubicación y contacto
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="h-80 overflow-hidden rounded-2xl border border-border shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.8669609970784!2d-100.26837222458323!3d25.774957508057213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x866293a642ad1f37%3A0xc14046d4d6b2b096!2sFamilia%20Dental!5e0!3m2!1ses!2smx!4v1785948055436!5m2!1ses!2smx"
              className="h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Mapa de Familia Dental"
            />
          </div>

          <div className="flex flex-col justify-center gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                <MapPin className="h-[22px] w-[22px]" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Dirección</h3>
                <p className="text-muted-foreground">
                  Higuerilla 442, Hacienda Las Palmas II, 66635 Cdad. Apodaca, N.L.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                <Phone className="h-[22px] w-[22px]" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Teléfono</h3>
                <p className="text-muted-foreground">(55) 811111111</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
                <Mail className="h-[22px] w-[22px]" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Correo</h3>
                <a
                  href="mailto:contacto@familiadental.mx"
                  className="text-muted-foreground transition-colors hover:text-brand-blue"
                >
                  contacto@familiadental.mx
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple">
                <Clock className="h-[22px] w-[22px]" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Horario</h3>
                <p className="text-muted-foreground">
                  Lun – Vie: 9:00 – 19:00
                  <br />
                  Sáb: 9:00 – 14:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
