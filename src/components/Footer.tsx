export function Footer() {
  return (
    <footer className="bg-foreground text-background/70 py-10 px-4">
      <div className="max-w-6xl mx-auto text-center space-y-2">
        <p className="font-heading font-bold text-lg text-background">Familia Dental</p>
        <p className="text-sm">Dentista para niños y adultos · CDMX</p>
        <p className="text-xs text-background/40">© {new Date().getFullYear()} Familia Dental. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
