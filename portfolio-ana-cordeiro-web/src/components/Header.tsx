import { useState } from "react";
// Importamos Link para a logo e NavLink para o menu
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { name: "Início", path: "/" },
  { name: "Projetos", path: "/projetos" },
  { name: "Sobre", path: "/sobre" },
  { name: "Contato", path: "/contato" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // NavLink nos permite usar essa função para estilizar o link ativo automaticamente
  const linkStyles = ({ isActive }: { isActive: boolean }) =>
    `transition-all duration-300 hover:text-black tracking-widest uppercase ${
      isActive
        ? "text-black font-semibold border-b-2 border-black"
        : "text-gray-500 font-light"
    }`;

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO: Usamos Link aqui porque a logo apenas redireciona, sem precisar de estilo "active" */}
        <Link to="/" className="flex flex-col group">
          <span className="text-xl font-bold tracking-tighter text-gray-900 uppercase">
            Ana Cordeiro
          </span>
          <span className="text-[10px] tracking-[0.3em] text-gray-400 uppercase -mt-1 group-hover:text-black transition-colors">
            Arquitetura & Urbanismo
          </span>
        </Link>

        {/* DESKTOP NAV: NavLink para identificar a página atual */}
        <div className="hidden md:flex gap-10 text-xs">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkStyles}>
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menu"
        >
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1" : "-translate-y-1"}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"}`}
          ></span>
        </button>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-400 opacity-100 py-8" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-8 text-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-lg tracking-[0.2em] uppercase transition-all ${
                  isActive ? "text-black font-bold" : "text-gray-400"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
