import { Actions } from '@/components/Actions';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Process, Results, Reviews, Services } from '@/components/Sections';

// Flow: who they are → what they do → how (the scene) → proof → conversion.
export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Services />
        <Process />
        <Results />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <Actions />
    </>
  );
}
