import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import projeto1 from "../assets/projeto1.png";
import projeto1imagem2 from "../assets/projeto12.png";
import projeto1imagem3 from "../assets/projeto13.png";
import projeto2 from "../assets/projeto2.png";
import projeto2imagem2 from "../assets/projeto22.png";
import projeto2imagem3 from "../assets/projeto23.png";
import projeto3 from "../assets/projeto3.png";
import projeto3imagem2 from "../assets/projeto32.png";
import projeto3imagem3 from "../assets/projeto33.png";

// Mock de dados detalhados para teste
const projectsDetailsData: Record<string, any> = {
  "1": {
    title: "Cozinha",
    category: "Residencial",
    description:
      "A Cozinha Éter foi concebida para ser o coração social da residência, eliminando as barreiras entre o ato de cozinhar e o de conviver. O design preza pela limpeza visual, utilizando frentes de armários sem puxadores (sistema de cava) e eletrodomésticos embutidos que se camuflam na marcenaria de carvalho natural.",
    mainImage: projeto1,
    images: [projeto1, projeto1imagem2, projeto1imagem3],
  },
  "2": {
    title: "Banheiro",
    category: "Residencial",
    description:
      "Este projeto transforma o banheiro master em um santuário de bem-estar. O layout foi reorganizado para privilegiar a entrada de luz natural através de uma abertura zenital sobre a área de banho, criando uma conexão direta com o céu e reduzindo a necessidade de iluminação artificial durante o dia.",
    mainImage: projeto2,
    images: [projeto2, projeto2imagem2, projeto2imagem3],
  },
  "3": {
    title: "Escada",
    category: "Residencial",
    description:
      "A Casa do Bosque é um exercício de mimetismo arquitetônico. Situada em um terreno densamente arborizado, a residência se organiza em torno das árvores existentes, sem a necessidade de supressão vegetal.\n\nA utilização de madeira engenheirada e pedra local reforça a conexão com a terra, enquanto os grandes vãos de vidro eliminam as barreiras entre o interior e a floresta.",
    mainImage: projeto3,
    images: [projeto3, projeto3imagem2, projeto3imagem3],
  },
  // Você pode adicionar os outros IDs (4, 5, 6) aqui seguindo o mesmo padrão
};

export function ProjectDetails() {
  const { id } = useParams();

  // Rola para o topo da página ao abrir um novo projeto
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const project = id ? projectsDetailsData[id] : null;

  if (!project) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-2xl font-light">Projeto não encontrado</h2>
        <Link
          to="/projetos"
          className="mt-4 text-gray-500 hover:text-black inline-block"
        >
          Voltar para a lista
        </Link>
      </div>
    );
  }

  return (
    <main className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navegação e Título */}
        <div className="mb-12">
          <Link
            to="/projetos"
            className="text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors"
          >
            ← Voltar ao Portfólio
          </Link>
          <div className="mt-8">
            <span className="text-xs tracking-[0.5em] text-gray-400 uppercase">
              {project.category}
            </span>
            <h1 className="mt-4 text-5xl md:text-7xl font-light text-gray-900 tracking-tighter italic font-serif">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Imagem Principal */}
        <div className="aspect-video w-full overflow-hidden bg-gray-100 mb-16">
          <img
            src={project.mainImage}
            alt={project.title}
            className="w-full h-full object-cover grayscale-0"
          />
        </div>

        {/* Informações e Descrição */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-4">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-900 mb-6 border-b pb-4">
              Sobre o Projeto
            </h2>
            <div className="space-y-4 text-sm text-gray-500">
              <p>
                <span className="text-gray-900 font-medium">Ano:</span> 2023
              </p>
              <p>
                <span className="text-gray-900 font-medium">Local:</span> São
                Paulo, SP
              </p>
              <p>
                <span className="text-gray-900 font-medium">Status:</span>{" "}
                Concluído
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <p className="text-xl text-gray-600 leading-relaxed font-light whitespace-pre-line">
              {project.description}
            </p>
          </div>
        </div>

        {/* Galeria de Imagens Adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.images.map((img: string, index: number) => (
            <div
              key={index}
              className="aspect-square overflow-hidden bg-gray-100 group"
            >
              <img
                src={img}
                alt={`Detalhe ${index + 1}`}
                className="w-full h-full object-cover grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
