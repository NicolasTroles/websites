import { MobileContactBar } from '@/components/Actions';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import {
  About,
  BeardBand,
  Differentiators,
  Gallery,
  ServiceRibbon,
  Services,
  Testimonials,
} from '@/components/Sections';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <BeardBand />
        <ServiceRibbon />
        <Services />
        <Differentiators />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      {/* Reserved space so the fixed mobile bar never covers the footer. */}
      <div className="h-20 md:hidden" aria-hidden="true" />
      <MobileContactBar />
    </>
  );
}
