/**
 * PÁGINA DO PROJETO — /projetos/[slug]
 * ------------------------------------
 * Capa, ficha técnica (ano/local/status), descrição e galeria — no visual
 * minimalista do site antigo (imagens em P&B que ganham cor no hover).
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SmartImage } from "@/components/ui/SmartImage";
import { PortableText } from "@/components/portable/PortableText";
import { getProjectBySlug, getProjectSlugs } from "@/sanity/lib/api";
import { urlForImage } from "@/sanity/lib/image";

type PageParams = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Projeto não encontrado" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: project.coverImage
      ? { images: [urlForImage(project.coverImage).width(1200).height(630).url()] }
      : undefined,
  };
}

export default async function ProjetoPage({ params }: PageParams) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Navegação + título */}
        <div className="mb-12">
          <Link
            href="/projetos"
            className="text-[10px] uppercase tracking-[0.3em] text-gray-400 transition-colors hover:text-black"
          >
            ← Voltar ao Portfólio
          </Link>
          <div className="mt-8">
            {project.categoryTitle && (
              <span className="text-xs uppercase tracking-[0.5em] text-gray-400">
                {project.categoryTitle}
              </span>
            )}
            <h1 className="mt-4 font-serif text-5xl font-light italic tracking-tighter text-gray-900 md:text-7xl">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Imagem principal */}
        <div className="relative mb-16 aspect-video w-full overflow-hidden bg-gray-100">
          <SmartImage
            image={project.coverImage}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1216px"
            className="object-cover"
          />
        </div>

        {/* Ficha técnica + descrição */}
        <div className="mb-24 grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="mb-6 border-b pb-4 text-xs font-bold uppercase tracking-[0.3em] text-gray-900">
              Sobre o Projeto
            </h2>
            <div className="space-y-4 text-sm text-gray-500">
              {project.year && (
                <p>
                  <span className="font-medium text-gray-900">Ano:</span>{" "}
                  {project.year}
                </p>
              )}
              {project.location && (
                <p>
                  <span className="font-medium text-gray-900">Local:</span>{" "}
                  {project.location}
                </p>
              )}
              {project.status && (
                <p>
                  <span className="font-medium text-gray-900">Status:</span>{" "}
                  {project.status}
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-8">
            {project.description && project.description.length > 0 ? (
              <PortableText value={project.description} />
            ) : (
              project.summary && (
                <p className="text-xl font-light leading-relaxed text-gray-600">
                  {project.summary}
                </p>
              )
            )}
          </div>
        </div>

        {/* Galeria */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {project.gallery.map((photo, index) => (
              <figure
                key={photo.asset?._ref ?? index}
                className="group relative aspect-square overflow-hidden bg-gray-100"
              >
                <SmartImage
                  image={photo}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-all duration-700 grayscale-0 md:grayscale md:group-hover:grayscale-0"
                />
              </figure>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
