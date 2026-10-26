import { Actions } from '@/components/Actions';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import {
  Faq,
  Frames,
  Gallery,
  Investment,
  Manifesto,
  Process,
  Testimonials,
} from '@/components/Sections';

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Manifesto />
        <Process />
        <Gallery />
        <Frames />
        <Investment />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Actions />
    </>
  );
}
