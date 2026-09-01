import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "María García",
    date: "Hace 2 semanas",
    rating: 5,
    text: "Excelente atención, el doctor fue muy amable y profesional. Mi hija ya no tiene miedo de ir al dentista. Los precios son muy accesibles y el lugar está impecable.",
  },
  {
    name: "Juan López",
    date: "Hace 1 mes",
    rating: 5,
    text: "Muy buen servicio, me hicieron una limpieza dental y quedé encantado con el resultado. Sin duda volveré para mi blanqueamiento. 100% recomendado.",
  },
  {
    name: "Ana Martínez",
    date: "Hace 2 meses",
    rating: 5,
    text: "Llevé a mi hijo de 5 años y fue una experiencia maravillosa. La doctora tiene mucha paciencia con los niños. ¡Familia Dental es la mejor opción!",
  },
  {
    name: "Carlos Hernández",
    date: "Hace 3 meses",
    rating: 4,
    text: "Me realicé un tratamiento de ortodoncia y los resultados han sido increíbles. El seguimiento es constante y los costos son justos. Muy contento.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={rating + " de 5 estrellas"}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={
            "h-4 w-4 " +
            (index < rating ? "fill-brand-yellow text-brand-yellow" : "text-muted-foreground/30")
          }
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section
      id="resenas"
      className="relative overflow-hidden bg-background px-4 py-24"
      aria-labelledby="reviews-title"
    >
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-blue/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-brand-purple/5 blur-3xl"
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
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-teal/20 bg-brand-teal/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-teal">
            <Star className="h-3.5 w-3.5" />
            Reseñas de Google
          </span>
          <h2
            id="reviews-title"
            className="mt-4 mb-4 font-heading text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            Lo que dicen nuestros pacientes
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground">
            Miles de familias confían en nosotros. Estas son algunas de sus experiencias reales.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                alt="Google"
                className="h-6 w-6"
                width="24"
                height="24"
                loading="lazy"
              />
              <span className="text-sm font-semibold text-muted-foreground">
                <span className="font-extrabold text-foreground">4.9</span> · 250+ reseñas
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, index) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex flex-col rounded-3xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-blue/5"
            >
              <Quote className="mb-3 h-6 w-6 text-brand-blue/20" aria-hidden="true" />
              <p className="mb-4 line-clamp-5 text-sm leading-relaxed text-muted-foreground">
                {review.text}
              </p>
              <div className="mt-auto">
                <StarRating rating={review.rating} />
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-foreground">{review.name}</p>
                  <p className="text-right text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="https://maps.google.com/?q=Familia+Dental"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3 text-sm font-bold text-foreground backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/30 hover:text-brand-blue"
          >
            Ver todas las reseñas en Google
            <Star className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
