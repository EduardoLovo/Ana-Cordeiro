import fotoAna from "../assets/foto.jpg";
export function About() {
  return (
    <main className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Seção 01: Perfil e Filosofia */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
          {/* Imagem de Perfil com moldura minimalista */}
          <div className="relative group">
            <div className="absolute -inset-4 border border-gray-100 -z-10 group-hover:inset-0 transition-all duration-500"></div>
            <img
              src={fotoAna}
              alt="Ana Cordeiro"
              className="w-full grayscale hover:grayscale-0 transition-all duration-700 aspect-3/4 object-cover"
            />
          </div>

          {/* Texto Biográfico */}
          <div className="space-y-8">
            <div>
              <span className="text-xs tracking-[0.5em] text-gray-400 uppercase">
                A Arquiteta
              </span>
              <h1 className="mt-4 text-5xl font-light text-gray-900 tracking-tighter">
                Ana{" "}
                <span className="font-serif italic text-gray-400">
                  Cordeiro
                </span>
              </h1>
            </div>

            <p className="text-xl text-gray-600 leading-relaxed font-light">
              Formada em Arquitetura e Urbanismo, acredito que a cidade é um
              organismo vivo que exige sensibilidade e técnica para florescer.
            </p>

            <div className="space-y-6 text-gray-500 leading-relaxed">
              <p>
                Com mais de 10 anos de experiência em projetos residenciais e
                planejamento urbano, meu foco é integrar o ambiente construído
                ao contexto social e geográfico. Cada linha traçada busca o
                equilíbrio entre a estética contemporânea e a viabilidade
                técnica.
              </p>
              <p>
                Minha abordagem prioriza a luz natural, o uso de materiais
                autênticos e a criação de espaços que convidam à permanência e
                ao bem-estar.
              </p>
            </div>

            {/* Selo de Registro Profissional */}
            <div className="pt-8 flex items-center gap-3 md:gap-4 flex-nowrap">
              {/* A classe 'shrink-0' impede que a linha diminua ou desapareça em telas pequenas */}
              <div className="h-px w-8 md:w-12 bg-gray-200 shrink-0"></div>

              {/* 'whitespace-nowrap' garante que o texto fique em uma única linha */}
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-400 whitespace-nowrap">
                Registro Profissional CAU A00000-0
              </span>
            </div>
          </div>
        </div>

        {/* Seção 02: Especialidades (Grid de "Zonas") */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-100 pt-24">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6">
              01. Urbanismo
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed italic">
              Desenho de cidades, loteamentos e espaços públicos focados em
              mobilidade e sustentabilidade urbana.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6">
              02. Residencial
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed italic">
              Projetos únicos que traduzem a personalidade dos moradores em
              formas arquitetônicas funcionais.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6">
              03. Consultoria
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed italic">
              Análise de viabilidade técnica e estética para novos
              empreendimentos e reformas complexas.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
