import { createFileRoute } from "@tanstack/react-router";
import { AppointmentForm } from "@/components/AppointmentForm";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { LocationSection } from "@/components/LocationSection";
import { Navbar } from "@/components/Navbar";
import { ReviewsSection } from "@/components/ReviewsSection";
import { TreatmentsSection } from "@/components/TreatmentsSection";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Familia Dental – Dentista para niños y adultos" },
      {
        name: "description",
        content:
          "Clínica odontológica Familia Dental. Cuidado dental profesional, precios accesibles y atención para toda la familia. Agenda tu cita hoy.",
      },
      { property: "og:title", content: "Familia Dental – Dentista para niños y adultos" },
      {
        property: "og:description",
        content: "Clínica odontológica con atención para toda la familia. Agenda tu cita en línea.",
      },
    ],
  }),
});

function Index() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TreatmentsSection />
      <ReviewsSection />
      <LocationSection />
      <AppointmentForm />
      <Footer />
    </>
  );
}
