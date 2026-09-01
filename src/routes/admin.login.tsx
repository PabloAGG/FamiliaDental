import { useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { signIn } from "@/lib/auth";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
  head: () => ({
    meta: [
      { title: "Acceso administrativo · Familia Dental" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await signIn(email, password);

    if (result.ok) {
      await navigate({ to: "/admin" });
      return;
    }

    setError(
      result.reason === "not-configured"
        ? "El acceso administrativo todavía no está configurado. Conecta la base de datos y el servicio de sesiones para habilitarlo."
        : "El correo o la contraseña no son válidos.",
    );
    setIsSubmitting(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-primary/5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden bg-gradient-to-br from-brand-blue to-brand-teal p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex items-center gap-2 font-heading text-xl font-extrabold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                <ShieldCheck className="h-5 w-5" />
              </span>
              Familia Dental
            </div>
            <h1 className="mt-16 font-heading text-4xl font-extrabold leading-tight">
              Administra tu clínica con tranquilidad.
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/80">
              El panel privado te permitirá gestionar citas, pacientes y reportes desde un solo
              lugar.
            </p>
          </div>
          <p className="text-xs text-white/60">Área exclusiva para el equipo de Familia Dental</p>
        </div>

        <div className="p-6 sm:p-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al sitio público
          </Link>

          <div className="mx-auto mt-12 max-w-md">
            <div className="mb-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary lg:hidden">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <p className="text-sm font-bold uppercase tracking-wider text-primary">
                Panel administrativo
              </p>
              <h2 className="mt-2 font-heading text-3xl font-extrabold text-foreground">
                Iniciar sesión
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Accede con las credenciales de tu equipo para continuar.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="admin-email" className="text-sm font-semibold text-foreground">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="admin@familiadental.mx"
                    autoComplete="username"
                    required
                    className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="admin-password" className="text-sm font-semibold text-foreground">
                  Contraseña
                </label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Tu contraseña"
                    autoComplete="current-password"
                    required
                    className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Verificando…" : "Entrar al panel"}
              </button>
            </form>

            <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground">
              La autenticación se habilitará cuando conectemos la base de datos y la sesión segura
              del servidor.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
