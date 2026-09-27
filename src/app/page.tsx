import { CraftSection } from "@/components/CraftSection";
import { HeroSection } from "@/components/HeroSection";
import { InstagramSection } from "@/components/InstagramSection";
import { LookbookSection } from "@/components/LookbookSection";
import { NewArrivalsSection } from "@/components/NewArrivalsSection";
import { OccasionsSection } from "@/components/OccasionsSection";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { MotionScope } from "@/components/MotionScope";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CommerceProvider } from "@/components/CommerceProvider";
import { CommerceOverlays } from "@/components/CommerceOverlays";

export default function HomePage() {
  return (
    <CommerceProvider>
      <MotionScope>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">
          <HeroSection />
          <ShowcaseSection />
          <NewArrivalsSection />
          <OccasionsSection />
          <CraftSection />
          <LookbookSection />
          <TestimonialsSection />
          <InstagramSection />
        </main>
        <SiteFooter />
        <ScrollProgress />
      </MotionScope>
      <CommerceOverlays />
    </CommerceProvider>
  );
}
