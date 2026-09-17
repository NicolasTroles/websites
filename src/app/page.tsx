import { MobileContactBar } from '@/components/Actions';
import { ComplianceField } from '@/components/ComplianceField';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About, Audiences, Monitored, Owner, Services, SG3, WorkBand } from '@/components/Sections';
import { whatsappUrlWith } from '@/config/site.config';

// Pre-composed so the SG3 button opens a conversation already about SG3,
// instead of the generic greeting.
const sg3WhatsAppUrl = whatsappUrlWith(
  'Gostaria de falar sobre apoio nas rotinas do Sistema SG3 na gestão de terceiros.',
);

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <Services />
        <SG3 whatsappSg3Url={sg3WhatsAppUrl} />
        <ComplianceField />
        <Monitored />
        <WorkBand />
        <Audiences />
        <Owner />
        <Contact />
      </main>
      <Footer />
      <MobileContactBar />
    </>
  );
}
