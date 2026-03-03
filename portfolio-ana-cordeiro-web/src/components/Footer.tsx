export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Coluna 1: Branding */}
          <div className="md:col-span-2">
            <span className="text-lg font-bold tracking-tighter uppercase">
              Ana Cordeiro
            </span>
            <p className="mt-4 text-sm text-gray-500 max-w-xs leading-relaxed">
              Transformando a complexidade urbana em espaços de respiro e
              significado. Projetos que respeitam o tempo e a escala humana.
            </p>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-900">
              Navegação
            </h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <a
                  href="#projetos"
                  className="hover:text-black transition-colors"
                >
                  Projetos Selecionados
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-black transition-colors">
                  A Arquiteta
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className="hover:text-black transition-colors"
                >
                  Fale Conosco
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Redes / Social */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-900">
              Social
            </h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <a
                  href="https://www.instagram.com/anacordeiro_interiores/"
                  className="hover:text-black transition-colors italic font-serif"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ana-carolina-cordeiro-48778133/"
                  className="hover:text-black transition-colors italic font-serif"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-black transition-colors italic font-serif"
                >
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Final: Créditos e CAU */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest">
            © {currentYear} Ana Cordeiro — CAU A00000-0
          </div>
          <div className="text-[10px] text-gray-400 uppercase tracking-widest">
            Desenvolvido com <span className="text-black">♥</span> para impacto
            urbano
          </div>
        </div>
      </div>
    </footer>
  );
}
