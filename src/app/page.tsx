import { ConversionJourneySection } from "@/components/sections/conversion-journey-section";
import { AntiWasteSection } from "@/components/sections/anti-waste-section";
import { SaasExpertiseSection } from "@/components/sections/saas-expertise-section";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TrustSection } from "@/components/sections/trust-section";
import { FaqSection } from "@/components/sections/channels-faq-section";
import { PlaygroundHeroSection } from "@/components/sections/playground-hero-section";
import { StatsStripSection } from "@/components/sections/stats-strip-section";
import { KlientBoostCtaSection } from "@/components/sections/klientboost-cta-section";
import { AuditTeaserSection } from "@/components/sections/audit-teaser-section";

export default function HomePage() {
  return (
    <>
      <PlaygroundHeroSection />
      <StatsStripSection />
      <ConversionJourneySection />
      <AntiWasteSection />
      <SaasExpertiseSection />
      <ProcessSection />
      <TestimonialsSection />
      <TrustSection />
      <AuditTeaserSection />
      <FaqSection />
      <KlientBoostCtaSection />
    </>
  );
}
