import { useState } from "react";

// Mock de dados (Depois buscaremos isso do NestJS)
const projectsData = [
  {
    id: 1,
    title: "Edifício Horizonte",
    category: "Residencial",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000",
  },
  {
    id: 2,
    title: "Parque Linear Sul",
    category: "Urbanismo",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000",
  },
  {
    id: 3,
    title: "Casa do Bosque",
    category: "Residencial",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000",
  },
  {
    id: 4,
    title: "Reurbanização Centro",
    category: "Urbanismo",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000",
  },
  {
    id: 5,
    title: "Pavilhão de Vidro",
    category: "Comercial",
    image:
      "https://images.unsplash.com/photo-1503387762-592dee58c460?q=80&w=1000",
  },
  {
    id: 6,
    title: "Praça da Liberdade",
    category: "Urbanismo",
    image:
      "https://images.unsplash.com/photo-1518005020251-58296d8412ff?q=80&w=1000",
  },
];

const categories = ["Todos", "Residencial", "Urbanismo", "Comercial"];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProjects =
    activeCategory === "Todos"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <main className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Cabeçalho da Página */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <span className="text-xs tracking-[0.5em] text-gray-400 uppercase">
              Portfólio
            </span>
            <h1 className="mt-4 text-5xl font-light text-gray-900 tracking-tighter italic font-serif">
              Projetos{" "}
              <span className="text-gray-300 not-italic font-sans">
                Selecionados
              </span>
            </h1>
          </div>

          {/* Filtros Minimalistas */}
          <div className="flex flex-wrap gap-6 text-[10px] uppercase tracking-[0.2em] font-bold">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`transition-all duration-300 border-b-2 pb-1 ${
                  activeCategory === cat
                    ? "border-black text-black"
                    : "border-transparent text-gray-400 hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative aspect-4/5 overflow-hidden bg-gray-100 cursor-pointer"
            >
              {/* Imagem com Zoom e Grayscale Progressivo */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-in-out"
              />

              {/* Overlay de Informações */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-200 mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {project.category}
                </span>
                <h3 className="text-2xl font-light text-white tracking-tighter translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-75">
                  {project.title}
                </h3>

                {/* Linha Decorativa que "cresce" no hover */}
                <div className="mt-4 w-0 group-hover:w-12 h-1 bg-white transition-all duration-700 delay-150"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
