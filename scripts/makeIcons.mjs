/**
 * Gera os ícones do site a partir da logo (public/logo.png):
 *  - src/app/icon.png       (favicon usado pelo navegador e pelo Google)
 *  - src/app/apple-icon.png (ícone ao salvar na tela inicial do iPhone)
 *
 * A logo é preta com fundo transparente; aqui compomos sobre um FUNDO BRANCO
 * sólido, para o ícone ficar visível em qualquer tema (inclusive no modo
 * escuro da busca do Google) e legível em tamanho pequeno.
 *
 * Rodar: node scripts/makeIcons.mjs
 */
import sharp from "sharp";

const SIZE = 512; // tamanho do ícone
const INNER = 404; // área da logo dentro do quadrado (deixa uma margem)

const run = async () => {
  // Redimensiona a logo mantendo proporção, sobre fundo transparente.
  const logo = await sharp("public/logo.png")
    .resize(INNER, INNER, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toBuffer();

  // Quadrado branco + logo centralizada.
  const icon = await sharp({
    create: {
      width: SIZE,
      height: SIZE,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toBuffer();

  await sharp(icon).toFile("src/app/icon.png");
  await sharp(icon).resize(180, 180).toFile("src/app/apple-icon.png");

  console.log("✓ Ícones gerados: src/app/icon.png e src/app/apple-icon.png");
};

run().catch((e) => {
  console.error("Erro:", e.message);
  process.exit(1);
});
