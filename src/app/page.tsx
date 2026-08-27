import { MobileContactBar } from '@/components/Actions';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { BrandMarquee } from '@/components/Marquee';
import {
  About,
  BarrelBand,
  Catalog,
  Events,
  HowItWorks,
  Partnerships,
  Testimonials,
} from '@/components/Sections';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BrandMarquee />
        <About />
        <BarrelBand />
        <Catalog />
        <HowItWorks />
        <Events />
        <Partnerships />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      {/* Espaço reservado para a barra fixa não cobrir o rodapé no mobile. */}
      <div className="h-20 md:hidden" aria-hidden="true" />
      <MobileContactBar />
    </>
  );
}
