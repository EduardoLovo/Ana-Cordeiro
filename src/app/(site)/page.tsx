/**
 * PÁGINA INICIAL (HOME) — estilo minimalista P&B
 * ----------------------------------------------
 * Reproduz o topo do site antigo: título grande com palavra de acento em
 * itálico serifado, imagem em preto & branco que ganha cor no hover, e a
 * seção de filosofia. Todo o conteúdo vem do painel, com textos de reserva.
 */
import type { Metadata } from "next";
import { SmartImage } from "@/components/ui/SmartImage";
import { getHomePage } from "@/sanity/lib/api";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const home = await getHomePage();

  const line1 = home?.heroLine1 ?? "Projetando";
  const accent = home?.heroAccent ?? "o futuro das";
  const line2 = home?.heroLine2 ?? "cidades.";
  const subtitle =
    home?.heroSubtitle ??
    "Equilíbrio entre estética, sustentabilidade e funcionalidade. Transformando espaços urbanos em experiências humanas memoráveis.";
  const ctaLabel = home?.heroCtaLabel ?? "Ver Projetos";
  const ctaHref = home?.heroCtaHref ?? "/projetos";
  const philosophyKicker = home?.philosophyKicker ?? "Filosofia";
  const philosophyQuote =
    home?.philosophyQuote ??
    "“Arquitetura é o jogo sábio, correto e magnífico dos volumes sob a luz.”";

  return (
    <div className="pt-28 md:pt-20">
      {/* HERO */}
      <section className="relative flex min-h-[80vh] items-start overflow-hidden lg:h-[90vh] lg:items-center">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
          <div className="z-10">
            <h1 className="text-5xl font-light leading-tight tracking-tighter text-gray-900 md:text-8xl">
              {line1} <br />
              {accent && (
                <>
                  <span className="font-serif italic text-gray-400">
                    {accent}
                  </span>{" "}
                  <br />
                </>
              )}
              {line2}
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-gray-500">
              {subtitle}
            </p>
            <a
              href={ctaHref}
              className="mt-10 inline-block bg-black px-8 py-4 text-sm uppercase tracking-[0.2em] text-white transition-all hover:bg-gray-800"
            >
              {ctaLabel}
            </a>
          </div>

          {/* Imagem de destaque (P&B → cor no hover, com leve zoom) */}
          <div className="group relative h-[420px] w-full overflow-hidden bg-gray-100 lg:h-[600px]">
            <SmartImage
              image={home?.heroImage}
              alt={`${line1} ${accent} ${line2}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="scale-105 object-cover transition-all duration-700 grayscale-0 group-hover:scale-100 md:grayscale md:group-hover:grayscale-0"
            />
          </div>
        </div>

        {/* Detalhe decorativo (linha) */}
        <div className="absolute bottom-10 left-0 h-1 w-1/3 bg-gray-200" />
      </section>

      {/* FILOSOFIA */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="text-xs uppercase tracking-[0.5em] text-gray-400">
            {philosophyKicker}
          </span>
          <h2 className="mt-4 font-serif text-3xl font-light italic text-gray-800">
            {philosophyQuote}
          </h2>
        </div>
      </section>
    </div>
  );
}
