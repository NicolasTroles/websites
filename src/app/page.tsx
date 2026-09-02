import { MobileContactBar } from '@/components/Actions';
import { CircuitDivider } from '@/components/Brand';
import { CTAFinal } from '@/components/CTAFinal';
import { Contact } from '@/components/Contact';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import {
  Authority,
  DiagnoseCTA,
  Differentiators,
  HowItWorks,
  Problems,
  ProblemTicker,
  Services,
  TrustBar,
} from '@/components/Sections';
import { Testimonials } from '@/components/Testimonials';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Problems />
        <Services />
        <ProblemTicker />
        <DiagnoseCTA />
        <HowItWorks />
        <div className="bg-floor py-2">
          <CircuitDivider tone="light" />
        </div>
        <Differentiators />
        <Testimonials />
        <Authority />
        <FAQ />
        <div className="bg-floor py-2">
          <CircuitDivider tone="light" />
        </div>
        <Contact />
        <CTAFinal />
      </main>
      <Footer />
      {/* Reserved space so the fixed mobile bar never covers the footer. */}
      <div className="h-20 md:hidden" aria-hidden="true" />
      <MobileContactBar />
    </>
  );
}
