"use client";

/**
 * CABEÇALHO DO SITE (estilo minimalista P&B)
 * ------------------------------------------
 * Barra fixa no topo, fundo branco translúcido com desfoque. Logo em duas
 * linhas (nome + assinatura), navegação em maiúsculas com o item ativo
 * sublinhado, e menu mobile animado. Recebe nome e assinatura por props.
 */

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/projetos", label: "Projetos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Header({
  siteName,
  tagline,
}: {
  siteName: string;
  tagline?: string;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Fecha o menu mobile ao mudar de página.
  useEffect(() => setIsOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Marca: logo à esquerda + nome/assinatura */}
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            priority
            className="h-9 w-auto md:h-10"
          />
          <span className="flex flex-col">
            <span className="text-xl font-bold uppercase tracking-tighter text-gray-900">
              {siteName}
            </span>
            {tagline && (
              <span className="-mt-1 text-[10px] uppercase tracking-[0.3em] text-gray-400 transition-colors group-hover:text-black">
                {tagline}
              </span>
            )}
          </span>
        </Link>

        {/* Navegação — desktop */}
        <div className="hidden gap-10 text-xs md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`uppercase tracking-widest transition-all duration-300 hover:text-black ${
                isActive(link.href)
                  ? "border-b-2 border-black pb-1 font-semibold text-black"
                  : "font-light text-gray-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Botão do menu — mobile */}
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="relative flex h-8 w-8 flex-col items-center justify-center md:hidden"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
              isOpen ? "translate-y-1 rotate-45" : "-translate-y-1"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
              isOpen ? "-translate-y-1 -rotate-45" : "translate-y-1"
            }`}
          />
        </button>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-gray-100 bg-white md:hidden"
          >
            <div className="flex flex-col gap-8 py-8 text-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg uppercase tracking-[0.2em] transition-all ${
                    isActive(link.href)
                      ? "font-bold text-black"
                      : "text-gray-400"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
