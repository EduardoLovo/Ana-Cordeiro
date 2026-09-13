/**
 * LISTAGEM DE PROJETOS — /projetos
 * --------------------------------
 * Grade de projetos com filtro por categoria no topo (via link ?categoria=…,
 * ótimo para SEO). Mesmo visual e animações do site antigo.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getProjects, getCategories } from "@/sanity/lib/api";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Portfólio de projetos de arquitetura e urbanismo: residenciais, urbanos e comerciais.",
  alternates: { canonical: "/projetos" },
};

export default async function ProjetosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const [projects, categories] = await Promise.all([
    getProjects(),
    getCategories(),
  ]);

  const filtered = categoria
    ? projects.filter((p) => p.categorySlug === categoria)
    : projects;

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Cabeçalho + filtros */}
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.5em] text-gray-400">
              Portfólio
            </span>
            <h1 className="mt-4 font-serif text-5xl font-light italic tracking-tighter text-gray-900">
              Projetos{" "}
              <span className="font-sans not-italic text-gray-300">
                Selecionados
              </span>
            </h1>
          </div>

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-6 text-[10px] font-bold uppercase tracking-[0.2em]">
              <FilterChip href="/projetos" active={!categoria}>
                Todos
              </FilterChip>
              {categories.map((cat) => (
                <FilterChip
                  key={cat._id}
                  href={`/projetos?categoria=${cat.slug}`}
                  active={categoria === cat.slug}
                >
                  {cat.title}
                </FilterChip>
              ))}
            </div>
          )}
        </div>

        {/* Grade */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, index) => (
              <ProjectCard
                key={project._id}
                project={project}
                priority={index < 3}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title={
              categoria
                ? "Nenhum projeto nesta categoria"
                : "Em breve, os projetos"
            }
            description={
              categoria
                ? "Experimente outra categoria ou volte para todos os projetos."
                : "Os projetos cadastrados no painel aparecerão aqui."
            }
          />
        )}
      </div>
    </main>
  );
}

/** Filtro (chip) em formato de link, no estilo do site antigo. */
function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`border-b-2 pb-1 transition-all duration-300 ${
        active
          ? "border-black text-black"
          : "border-transparent text-gray-400 hover:text-black"
      }`}
    >
      {children}
    </Link>
  );
}
