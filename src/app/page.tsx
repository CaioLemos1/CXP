import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AboutSection } from "@/components/sections/AboutSection";
import { DifferentialsSection } from "@/components/sections/DifferentialsSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { HeroSection } from "@/components/sections/HeroSection";
import { PressSection } from "@/components/sections/PressSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { MotionProvider } from "@/components/ui/MotionProvider";

export default function HomePage() {
  return (
    <MotionProvider>
      <Header />
      <main id="conteudo">
        <HeroSection />
        <SolutionsSection />
        <AboutSection />
        <DifferentialsSection />
        <PressSection />
        <FinalCTA />
      </main>
      <Footer />
    </MotionProvider>
  );
}
