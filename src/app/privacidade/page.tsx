import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { emailUrl, site } from '@/config/site.config';

export const metadata: Metadata = {
  title: `Política de privacidade | ${site.brandFull}`,
  description:
    'Como a Rodrigues Rangel Consultoria trata os dados enviados pelo site, em conformidade com a LGPD.',
  alternates: { canonical: '/privacidade' },
};

/**
 * Deliberately short, because the site really does almost nothing with data:
 * the contact form composes a WhatsApp message in the visitor's own browser and
 * stores nothing. Do not pad this with boilerplate about data we never collect.
 */
export default function PrivacyPage() {
  return (
    <>
      <main id="conteudo" className="bg-paper pb-20 pt-28 sm:pt-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-label text-emeraldDeep"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Voltar ao site
          </Link>

          <h1 className="mt-8 font-display text-3xl font-semibold leading-[1.12] tracking-[-0.015em] text-ink sm:text-4xl">
            Política de privacidade
          </h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-label text-inkSoft">
            Atualizada em {new Date(site.seo.lastModified).toLocaleDateString('pt-BR')}
          </p>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-inkSoft">
            <section>
              <h2 className="font-display text-xl font-semibold text-ink">Dados coletados</h2>
              <p className="mt-3">
                Este site não possui cadastro, login nem banco de dados. O formulário de contato
                não envia informações para nenhum servidor: os campos preenchidos são usados
                apenas para montar, no próprio navegador, uma mensagem de WhatsApp que você
                confere e envia manualmente.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink">
                Dados enviados por você
              </h2>
              <p className="mt-3">
                Ao entrar em contato por WhatsApp, telefone ou e-mail, os dados informados
                (nome, empresa, contato e a descrição da necessidade) são utilizados
                exclusivamente para responder à solicitação e avaliar o escopo do atendimento.
                Não são compartilhados com terceiros nem usados para outra finalidade.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink">
                Medição de audiência
              </h2>
              <p className="mt-3">
                Quando ativado, o site utiliza o Google Analytics para medir o volume de
                visitas e quais seções são mais acessadas. Essa ferramenta registra dados de
                navegação de forma agregada e pode utilizar cookies. Você pode bloquear cookies
                nas configurações do seu navegador sem prejuízo ao uso do site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink">Seus direitos</h2>
              <p className="mt-3">
                Conforme a Lei nº 13.709/2018 (LGPD), você pode solicitar a confirmação, o
                acesso, a correção ou a exclusão dos dados que tenha enviado. Para isso, escreva
                para{' '}
                <a href={emailUrl} className="text-emeraldDeep underline underline-offset-4">
                  {site.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
