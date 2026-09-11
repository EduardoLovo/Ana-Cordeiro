/**
 * CARD DE PROJETO (estilo minimalista P&B)
 * ----------------------------------------
 * Miniatura clicável com as animações do design antigo:
 *  - imagem em preto & branco que ganha cor no hover (desktop) + zoom;
 *  - overlay escuro que surge, com categoria e título "subindo";
 *  - uma linha branca que cresce.
 */
import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import type { ProjectCard as ProjectCardType } from "@/sanity/lib/types";

export function ProjectCard({
  project,
  priority,
}: {
  project: ProjectCardType;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/projetos/${project.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden bg-gray-100"
    >
      <SmartImage
        image={project.coverImage}
        alt={project.title}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-110 md:grayscale md:group-hover:grayscale-0"
      />

      {/* Overlay de informações */}
      <div className="absolute inset-0 flex flex-col justify-end bg-black/40 p-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        {project.categoryTitle && (
          <span className="mb-2 translate-y-4 text-[10px] uppercase tracking-[0.3em] text-gray-200 transition-transform duration-500 group-hover:translate-y-0">
            {project.categoryTitle}
          </span>
        )}
        <h3 className="translate-y-4 text-2xl font-light tracking-tighter text-white transition-transform delay-75 duration-700 group-hover:translate-y-0">
          {project.title}
        </h3>
        <div className="mt-4 h-1 w-0 bg-white transition-all delay-150 duration-700 group-hover:w-12" />
      </div>
    </Link>
  );
}
