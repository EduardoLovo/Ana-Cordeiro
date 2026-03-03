export function Contact() {
  return (
    <main className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Título da Seção */}
        <div className="mb-20">
          <span className="text-xs tracking-[0.5em] text-gray-400 uppercase">
            Contato
          </span>
          <h1 className="mt-4 text-5xl md:text-7xl font-light text-gray-900 tracking-tighter">
            Vamos{" "}
            <span className="font-serif italic text-gray-400">transformar</span>{" "}
            <br />
            sua ideia em espaço.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Lado Esquerdo: Informações de Contato */}
          <div className="space-y-12">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6">
                Onde estamos
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Av. Paulista, 1000 — Sala 120
                <br />
                Bela Vista, São Paulo — SP
                <br />
                Brasil
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6">
                Fale Direto
              </h3>
              <p className="text-gray-500 leading-relaxed">
                contato@anacordeiro.com.br
                <br />
                +55 11 99999-9999
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6">
                Horário
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Segunda a Sexta
                <br />
                09:00 — 18:00
              </p>
            </div>

            {/* Elemento Visual: Uma linha guia que remete a plantas baixas */}
            <div className="hidden lg:block w-px h-32 bg-gray-100 ml-2"></div>
          </div>

          {/* Lado Direito: Formulário Moderno */}
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  Nome
                </label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  className="border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent placeholder:text-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="exemplo@email.com"
                  className="border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                Assunto
              </label>
              <select className="border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-gray-500">
                <option>Projeto Residencial</option>
                <option>Urbanismo / Loteamento</option>
                <option>Design de Interiores</option>
                <option>Consultoria</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                Mensagem
              </label>
              <textarea
                rows={4}
                placeholder="Conte-nos um pouco sobre seu sonho..."
                className="border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent resize-none placeholder:text-gray-300"
              />
            </div>

            <button className="w-full md:w-auto px-12 py-5 bg-black text-white text-xs uppercase tracking-[0.3em] hover:bg-gray-800 transition-all">
              Enviar Proposta
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
