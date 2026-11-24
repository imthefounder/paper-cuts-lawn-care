import { AreaSection } from "./components/area-section";
import { FaqSection } from "./components/faq-section";
import { FinalCta } from "./components/final-cta";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { HowItWorks } from "./components/how-it-works";
import { MobileActionBar } from "./components/mobile-action-bar";
import { PromoBar } from "./components/promo-bar";
import { QuoteSection } from "./components/quote-section";
import { ServicesSection } from "./components/services-section";

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-ink-950">
      <PromoBar />
      <Header />
      <main className="pb-24 md:pb-0">
        <Hero />
        <ServicesSection />
        <QuoteSection />
        <HowItWorks />
        <AreaSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  );
}
