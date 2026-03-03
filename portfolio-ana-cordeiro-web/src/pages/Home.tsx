import { NavLink } from "react-router-dom";
import heroImage from "../assets/home2.png";
export function Home() {
  return (
    <main className="pt-28 md:pt-20">
      {" "}
      {/* Hero Section */}
      <section className="relative min-h-[80vh] lg:h-[90vh] flex items-start lg:items-center overflow-hidden  lg:pt-0">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            {/* Reduzimos um pouco o tamanho do texto no mobile (text-5xl) para caber melhor */}
            <h1 className="text-5xl md:text-8xl font-light leading-tight text-gray-900 tracking-tighter">
              Projetando <br />
              <span className="font-serif italic text-gray-400">
                o futuro das
              </span>{" "}
              <br />
              cidades.
            </h1>
            <p className="mt-8 text-gray-500 max-w-md text-lg leading-relaxed">
              Equilíbrio entre estética, sustentabilidade e funcionalidade.
              Transformando espaços urbanos em experiências humanas memoráveis.
            </p>
            <NavLink to="/projetos">
              <button className="cursor-pointer mt-10 px-8 py-4 bg-black text-white text-sm uppercase tracking-[0.2em] hover:bg-gray-800 transition-all">
                Ver Projetos
              </button>
            </NavLink>
          </div>

          {/* Imagem de Destaque (Placeholder de Luxo) */}
          <div className="relative h-150 w-full bg-gray-100 group overflow-hidden">
            {/* Aqui entrará uma imagem de alta qualidade do portfólio */}
            <div
              style={{ backgroundImage: `url(${heroImage})` }}
              className="absolute inset-0 bg-cover bg-center grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            />
          </div>
        </div>

        {/* Detalhe Decorativo (Linha Urbanista) */}
        <div className="absolute bottom-10 left-0 w-1/3 h-1 bg-gray-200"></div>
      </section>
      {/* Seção Breve: O conceito */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs tracking-[0.5em] text-gray-400 uppercase">
            Filosofia
          </span>
          <h2 className="mt-4 text-3xl font-light text-gray-800 italic">
            "Arquitetura é o jogo sábio, correto e magnífico dos volumes sob a
            luz."
          </h2>
        </div>
      </section>
    </main>
  );
}
