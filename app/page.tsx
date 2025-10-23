import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/Hero";
import { MetricsSection } from "@/components/sections/MetricsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MetricsSection />
        <ServicesSection />
        <ProcessSection />
        <ProjectsShowcase />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
