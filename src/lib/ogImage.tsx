import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const ogImageSize = { width: 1200, height: 630 };

/**
 * Cartão de compartilhamento (Open Graph / Twitter): a logo real do cliente
 * centralizada sobre o fundo escuro da marca, no tamanho que Facebook e
 * WhatsApp esperam para o preview de link (1200x630).
 */
export async function renderOgImage() {
  const logo = await readFile(join(process.cwd(), 'public/logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#14100C',
      }}
    >
      {/* Proporção original da logo (1362x1155) preservada, escala 520px de largura.
            ImageResponse (Satori) não roda em um DOM real: next/image não funciona aqui,
            <img> é a própria API recomendada pelo Next para este caso. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logoSrc} width={520} height={441} alt="" />
    </div>,
    { ...ogImageSize },
  );
}
