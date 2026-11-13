import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AboutSection } from "@/components/sections/AboutSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { HeroSection } from "@/components/sections/HeroSection";
import { InvestmentEducation } from "@/components/sections/InvestmentEducation";
import { PressSection } from "@/components/sections/PressSection";
import { PurposeSection } from "@/components/sections/PurposeSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { MotionProvider } from "@/components/ui/MotionProvider";

/** Jornada: Atenção → Interesse → Confiança → Educação → Autoridade → Conversão. */
export default function HomePage() {
  return (
    <MotionProvider>
      <Header />
      <main id="conteudo">
        <HeroSection />
        <AboutSection />
        <PurposeSection />
        <SolutionsSection />
        <InvestmentEducation />
        <PressSection />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </MotionProvider>
  );
}
