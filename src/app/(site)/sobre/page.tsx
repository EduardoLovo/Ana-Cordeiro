/**
 * PÁGINA SOBRE — /sobre
 * ---------------------
 * Perfil da arquiteta (foto com moldura que reage ao hover + bio) e a grade de
 * especialidades. Fiel ao design antigo; todo o conteúdo vem do painel.
 */
import type { Metadata } from "next";
import { SmartImage } from "@/components/ui/SmartImage";
import { PortableText } from "@/components/portable/PortableText";
import { getAboutPage } from "@/sanity/lib/api";
import { urlForImage } from "@/sanity/lib/image";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage();
  return {
    title: about?.seo?.metaTitle || "Sobre",
    description:
      about?.seo?.metaDescription ||
      about?.intro ||
      "Conheça a trajetória e a abordagem de Ana Cordeiro.",
    alternates: { canonical: "/sobre" },
    openGraph: about?.seo?.shareImage
      ? { images: [urlForImage(about.seo.shareImage).width(1200).height(630).url()] }
      : undefined,
  };
}

export default async function SobrePage() {
  const about = await getAboutPage();

  const kicker = about?.kicker ?? "A Arquiteta";
  const nameLine = about?.nameLine ?? "Ana";
  const nameAccent = about?.nameAccent ?? "Cordeiro";
  const intro =
    about?.intro ??
    "Formada em Arquitetura e Urbanismo, acredito que a cidade é um organismo vivo que exige sensibilidade e técnica para florescer.";

  const specialties =
    about?.specialties && about.specialties.length > 0
      ? about.specialties
      : [
          {
            title: "Urbanismo",
            text: "Desenho de cidades, loteamentos e espaços públicos focados em mobilidade e sustentabilidade.",
          },
          {
            title: "Residencial",
            text: "Projetos únicos que traduzem a personalidade dos moradores em formas funcionais.",
          },
          {
            title: "Consultoria",
            text: "Análise de viabilidade técnica e estética para novos empreendimentos e reformas.",
          },
        ];

  return (
    <main className="bg-white pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Perfil */}
        <div className="mb-32 grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          {/* Foto com moldura minimalista */}
          <div className="group relative">
            <div className="absolute -inset-4 -z-10 border border-gray-100 transition-all duration-500 group-hover:inset-0" />
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
              <SmartImage
                image={about?.portrait}
                alt={`${nameLine} ${nameAccent}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.5em] text-gray-400">
                {kicker}
              </span>
              <h1 className="mt-4 text-5xl font-light tracking-tighter text-gray-900">
                {nameLine}{" "}
                {nameAccent && (
                  <span className="font-serif italic text-gray-400">
                    {nameAccent}
                  </span>
                )}
              </h1>
            </div>

            <p className="text-xl font-light leading-relaxed text-gray-600">
              {intro}
            </p>

            {about?.body && about.body.length > 0 ? (
              <PortableText value={about.body} />
            ) : (
              <div className="space-y-6 leading-relaxed text-gray-500">
                <p>
                  Este é um espaço para a Ana contar a própria história:
                  trajetória, abordagem e valores. Todo este texto é editável
                  pelo painel, na seção <strong>Página Sobre</strong>.
                </p>
              </div>
            )}

            {about?.cau && (
              <div className="flex flex-nowrap items-center gap-3 pt-8 md:gap-4">
                <div className="h-px w-8 shrink-0 bg-gray-200 md:w-12" />
                <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.2em] text-gray-400 md:text-[10px] md:tracking-[0.3em]">
                  {about.cau}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Especialidades */}
        <div className="grid grid-cols-1 gap-12 border-t border-gray-100 pt-24 md:grid-cols-3">
          {specialties.map((item, index) => (
            <div key={item.title + index}>
              <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-900">
                {String(index + 1).padStart(2, "0")}. {item.title}
              </h3>
              {item.text && (
                <p className="text-sm italic leading-relaxed text-gray-500">
                  {item.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
